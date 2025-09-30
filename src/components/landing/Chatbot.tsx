"use client";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { FiX, FiMic, FiSend } from "react-icons/fi";
import axios from "axios";
import img from "@/assets/img/chatbot.avif"

interface Message {
    role: "user" | "bot";
    text: string;
    audio_url?: string | null;
}

const chatbotUrl = "https://chat_innoweek.ilmiy1.uz";

const ChatBot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "bot",
            text: "Assalomu-alaykum! Sizga qanday yordam bera olaman?",
            audio_url: null
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    // const audioContextRef = useRef<AudioContext | null>(null);

    // Text message sending
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;
        setMessages(prev => [...prev, { role: "user", text: userText }]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(
                `${chatbotUrl}/chat/text`,
                new URLSearchParams({ text: userText }),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );

            const responseData = res.data;
            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: responseData.reply_text,
                    audio_url: responseData.audio_url
                },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [
                ...prev,
                { role: "bot", text: "❌ Xatolik yuz berdi. Qayta urinib ko'ring." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage();
    };

    // WebM ni WAV formatiga o'girish funksiyasi
    const webmToWav = async (webmBlob: Blob): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const fileReader = new FileReader();

            fileReader.onload = async function () {
                try {
                    const arrayBuffer = this.result as ArrayBuffer;
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                    // AudioBuffer ni WAV formatiga o'girish
                    const wavBuffer = encodeWAV(audioBuffer);
                    const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });

                    resolve(wavBlob);
                } catch (error) {
                    reject(error);
                }
            };

            fileReader.onerror = reject;
            fileReader.readAsArrayBuffer(webmBlob);
        });
    };

    // AudioBuffer ni WAV formatiga encode qilish
    const encodeWAV = (audioBuffer: AudioBuffer): ArrayBuffer => {
        const numberOfChannels = audioBuffer.numberOfChannels;
        const length = audioBuffer.length * numberOfChannels * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);
        const sampleRate = audioBuffer.sampleRate;

        // WAV header yozish
        const writeString = (offset: number, string: string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        let offset = 0;

        // RIFF header
        writeString(offset, 'RIFF'); offset += 4;
        view.setUint32(offset, length - 8, true); offset += 4;
        writeString(offset, 'WAVE'); offset += 4;

        // fmt chunk
        writeString(offset, 'fmt '); offset += 4;
        view.setUint32(offset, 16, true); offset += 4; // chunk size
        view.setUint16(offset, 1, true); offset += 2; // PCM format
        view.setUint16(offset, numberOfChannels, true); offset += 2;
        view.setUint32(offset, sampleRate, true); offset += 4;
        view.setUint32(offset, sampleRate * numberOfChannels * 2, true); offset += 4; // byte rate
        view.setUint16(offset, numberOfChannels * 2, true); offset += 2; // block align
        view.setUint16(offset, 16, true); offset += 2; // bits per sample

        // data chunk
        writeString(offset, 'data'); offset += 4;
        view.setUint32(offset, length - offset - 4, true); offset += 4;

        // Audio ma'lumotlarini yozish
        const channels = [];
        for (let i = 0; i < numberOfChannels; i++) {
            channels.push(audioBuffer.getChannelData(i));
        }

        for (let i = 0; i < audioBuffer.length; i++) {
            for (let channel = 0; channel < numberOfChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, channels[channel][i]));
                view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
                offset += 2;
            }
        }

        return buffer;
    };

    // WAV formatida audio yozish
    const handleRecord = useCallback(async () => {
        if (!recording) {
            try {
                // Request microphone access
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 16000,
                        channelCount: 1,
                    }
                });

                streamRef.current = stream;

                // WebM formatida yozish (eng keng qo'llab-quvvatlanadi)
                const mediaRecorder = new MediaRecorder(stream, {
                    mimeType: 'audio/webm;codecs=opus'
                });

                mediaRecorderRef.current = mediaRecorder;
                audioChunksRef.current = [];

                // Handle data available event
                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                // Handle recording stop
                mediaRecorder.onstop = async () => {
                    const webmBlob = new Blob(audioChunksRef.current, {
                        type: 'audio/webm;codecs=opus'
                    });

                    try {
                        setLoading(true);

                        // WebM ni WAV ga o'girish
                        const wavBlob = await webmToWav(webmBlob);

                        const formData = new FormData();
                        formData.append("audio", wavBlob, "voice.wav");

                        const res = await axios.post(
                            `${chatbotUrl}/chat/audio`,
                            formData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                                timeout: 30000,
                            }
                        );

                        const { user_text, reply_text, audio_url } = res.data;
                        setMessages(prev => [
                            ...prev,
                            { role: "user", text: user_text },
                            { role: "bot", text: reply_text, audio_url: audio_url },
                        ]);
                    } catch (error: any) {
                        console.error("Error sending audio:", error);
                        let errorMessage = "❌ Audio yuborishda xatolik";

                        if (error.response) {
                            errorMessage += `: ${error.response.data?.message || error.response.status}`;
                        } else if (error.request) {
                            errorMessage += ": Serverga ulanib bo'lmadi";
                        } else {
                            errorMessage += `: ${error.message}`;
                        }

                        setMessages(prev => [
                            ...prev,
                            { role: "bot", text: errorMessage },
                        ]);
                    } finally {
                        setLoading(false);

                        // Stop all tracks
                        if (streamRef.current) {
                            streamRef.current.getTracks().forEach(track => track.stop());
                            streamRef.current = null;
                        }
                    }
                };

                // Start recording
                mediaRecorder.start();
                setRecording(true);

            } catch (error) {
                console.error("Error starting recording:", error);
                setMessages(prev => [
                    ...prev,
                    {
                        role: "bot",
                        text: "❌ Mikrofonga ruxsat berilmagan yoki xatolik yuz berdi. Iltimos, brauzeringiz mikfon ruxsatini tekshiring."
                    },
                ]);
            }
        } else {
            // Stop recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                mediaRecorderRef.current.stop();
                setRecording(false);
            }
        }
    }, [recording]);

    // Simple image component
    // const Image = ({ src, alt, className, width, height }: {
    //     src: string;
    //     alt: string;
    //     className?: string;
    //     width?: number;
    //     height?: number;
    // }) => {
    //     return (
    //         <img
    //             src={src}
    //             alt={alt}
    //             className={className}
    //             width={width}
    //             height={height}
    //             style={{ width, height }}
    //             onError={(e) => {
    //                 // Fallback if image fails to load
    //                 (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
    //             }}
    //         />
    //     );
    // };

    return (
        <div>
            <div className="fixed bottom-4 max-w-[450px] right-4 z-50 w-full">
                {!open && (
                    <button
                        onClick={() => setOpen(true)}
                        className=" cursor-pointer absolute right-2 bottom-2 !rounded-full shadow-lg border border-gray-200 p-2 hover:scale-105 transition"
                        aria-label="Open chat"
                    >
                        <Image
                            src={img}
                            alt="Chat"
                            className="w-12 h-12 rounded-full"
                            width={48}
                            height={48}
                        />
                    </button>
                )}

                {open && (
                    <div className="w-full h-[70vh] rounded-xl shadow-lg flex flex-col">
                        {/* Header */}
                        <div className="bg-blue-600 text-white p-3 rounded-t-2xl flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Image
                                    className="w-8 h-8 rounded-full"
                                    src={img}
                                    alt="Chatbot"
                                    width={32}
                                    height={32}
                                />
                                <span className="font-semibold">Virtual Assistant</span>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                aria-label="Close chat"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-3 bg-gray-50 space-y-2 overflow-y-auto">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`text-sm px-3 py-2 rounded-2xl max-w-[80%] whitespace-pre-line ${msg.role === "bot"
                                            ? "bg-gray-200 rounded-tl-none"
                                            : "bg-blue-500 text-white rounded-tr-none"
                                            }`}
                                    >
                                        {msg.audio_url && (
                                            <audio
                                                controls
                                                src={msg.audio_url}
                                                style={{ width: 220, marginBottom: 4 }}
                                                preload="none"
                                            />
                                        )}
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-center">
                                    <div className="text-sm text-gray-500 italic">
                                        Yuklanmoqda...
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-gray-300  flex items-center gap-2">
                            {recording ? (
                                <div className="flex-1 flex items-center justify-center gap-2">
                                    <div className="relative flex items-center justify-center">
                                        <div className="absolute w-6 h-6 bg-red-500 rounded-full opacity-75 animate-ping"></div>
                                        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                                            <FiMic size={12} className="text-white" />
                                        </div>
                                    </div>
                                    <span className="text-gray-600 text-sm italic">
                                        Yozib olinmoqda... To'xtatish uchun yana bosing
                                    </span>
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Xabar yozing..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 border border-gray-300  rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={loading}
                                />
                            )}

                            <button
                                onClick={sendMessage}
                                className="text-blue-600 hover:text-blue-800 disabled:opacity-30 transition-colors"
                                disabled={recording || !input.trim() || loading}
                                aria-label="Send message"
                            >
                                <FiSend size={20} />
                            </button>

                            <button
                                onClick={handleRecord}
                                className={`!rounded-full p-1.5 transition-all ${recording
                                    ? "bg-red-500 animate-pulse"
                                    : "bg-green-500 hover:bg-green-600"
                                    } ${loading ? 'opacity-50' : ''}`}
                                disabled={loading}
                                title={recording ? "Yozib olinmoqda..." : "Ovozli xabar"}
                                aria-label={recording ? "Stop recording" : "Start recording"}
                            >
                                <FiMic size={18} className="text-white" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBot;