"use client";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { FiX, FiMic, FiSend, FiUser, FiMessageCircle } from "react-icons/fi";
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
    const [isTyping, setIsTyping] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Cleanup function for recording
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Text message sending
    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userText = input;
        setMessages(prev => [...prev, { role: "user", text: userText }]);
        setInput("");
        setLoading(true);
        setIsTyping(true);

        try {
            const res = await axios.post(
                `${chatbotUrl}/chat/text`,
                new URLSearchParams({ text: userText }),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    timeout: 30000,
                }
            );

            const responseData = res.data;

            // Simulate typing delay for better UX
            setTimeout(() => {
                setMessages(prev => [
                    ...prev,
                    {
                        role: "bot",
                        text: responseData.reply_text,
                        audio_url: responseData.audio_url
                    },
                ]);
                setIsTyping(false);
                setLoading(false);
            }, 1000);

        } catch (error: any) {
            console.error("Error sending message:", error);
            let errorMessage = "❌ Xatolik yuz berdi. Qayta urinib ko'ring.";

            if (error.response) {
                errorMessage += ` (${error.response.status})`;
            } else if (error.request) {
                errorMessage = "❌ Serverga ulanib bo'lmadi. Internet aloqasini tekshiring.";
            }

            setMessages(prev => [
                ...prev,
                { role: "bot", text: errorMessage },
            ]);
            setIsTyping(false);
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !loading) sendMessage();
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

        const writeString = (offset: number, string: string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        let offset = 0;

        writeString(offset, 'RIFF'); offset += 4;
        view.setUint32(offset, length - 8, true); offset += 4;
        writeString(offset, 'WAVE'); offset += 4;
        writeString(offset, 'fmt '); offset += 4;
        view.setUint32(offset, 16, true); offset += 4;
        view.setUint16(offset, 1, true); offset += 2;
        view.setUint16(offset, numberOfChannels, true); offset += 2;
        view.setUint32(offset, sampleRate, true); offset += 4;
        view.setUint32(offset, sampleRate * numberOfChannels * 2, true); offset += 4;
        view.setUint16(offset, numberOfChannels * 2, true); offset += 2;
        view.setUint16(offset, 16, true); offset += 2;
        writeString(offset, 'data'); offset += 4;
        view.setUint32(offset, length - offset - 4, true); offset += 4;

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

    // Stop recording function
    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }

        // Stop all tracks
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                track.stop();
            });
            streamRef.current = null;
        }
    }, []);

    // WAV formatida audio yozish
    const handleRecord = useCallback(async () => {
        if (recording) {
            // Stop recording
            stopRecording();
            return;
        }

        // Start recording
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 16000,
                    channelCount: 1,
                }
            });

            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                if (audioChunksRef.current.length === 0) {
                    console.log("No audio data recorded");
                    setLoading(false);
                    return;
                }

                const webmBlob = new Blob(audioChunksRef.current, {
                    type: 'audio/webm;codecs=opus'
                });

                try {
                    setLoading(true);
                    setIsTyping(true);

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

                    setTimeout(() => {
                        setMessages(prev => [
                            ...prev,
                            { role: "user", text: user_text },
                            { role: "bot", text: reply_text, audio_url: audio_url },
                        ]);
                        setIsTyping(false);
                        setLoading(false);
                    }, 1000);

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
                    setIsTyping(false);
                    setLoading(false);
                } finally {
                    // Cleanup
                    audioChunksRef.current = [];
                    mediaRecorderRef.current = null;
                }
            };

            // Start recording with timeslice to ensure data is available
            mediaRecorder.start(1000); // 1 second timeslice
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
    }, [recording, stopRecording]);

    // Auto-stop recording when component unmounts or chat closes
    useEffect(() => {
        return () => {
            if (recording) {
                stopRecording();
            }
        };
    }, [recording, stopRecording]);

    return (
        <div>
            <div className="fixed bottom-4 max-w-[450px] right-4 z-50 w-full">
                {!open && (
                    <button
                        onClick={() => setOpen(true)}
                        className="cursor-pointer absolute right-2 bottom-2 !rounded-full shadow-lg border border-gray-200 p-2 hover:scale-105 transition bg-white"
                        aria-label="Open chat"
                    >
                        <Image
                            src={img}
                            alt="Chat"
                            className="w-12 h-12 !rounded-full"
                            width={48}
                            height={48}
                        />
                    </button>
                )}

                {open && (
                    <div className="w-full h-[70vh] rounded-xl shadow-lg flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white !px-2 !py-2 rounded-t-xl flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Image
                                        className="w-10 h-10 !rounded-full border-2 border-white"
                                        src={img}
                                        alt="Chatbot"
                                        width={40}
                                        height={40}
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 !rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <span className="font-semibold block">Virtual Assistant</span>
                                    <span className="text-blue-100 text-xs">
                                        {isTyping ? "Javob yozmoqda..." : "Online"}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (recording) {
                                        stopRecording();
                                    }
                                    setOpen(false);
                                }}
                                className="hover:bg-blue-500 !rounded-full p-1 transition"
                                aria-label="Close chat"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-4 bg-gray-50 space-y-4 overflow-y-auto">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"} items-start gap-2`}
                                >
                                    {msg.role === "bot" && (
                                        <div className="flex-shrink-0 w-8 h-8 !rounded-full bg-blue-100 flex items-center justify-center">
                                            <FiMessageCircle className="text-blue-600" size={16} />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[80%] ${msg.role === "bot" ? "order-2" : "order-1"}`}
                                    >
                                        {msg.audio_url && (
                                            <div className="mb-1">
                                                <audio
                                                    controls
                                                    src={msg.audio_url}
                                                    className="w-48 h-8"
                                                    preload="none"
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={`px-4 py-2.5 rounded-2xl ${msg.role === "bot"
                                                ? "bg-white border border-gray-200 rounded-tl-none text-gray-800 shadow-sm"
                                                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none"
                                                }`}
                                        >
                                            <div className="whitespace-pre-line text-sm leading-relaxed">
                                                {msg.text}
                                            </div>
                                        </div>
                                        {/* <div className={`text-xs mt-1 px-2 ${msg.role === "bot" ? "text-gray-500" : "text-blue-500 text-right"}`}>
                                            {msg.role === "user" ? "Siz" : "Assistant"}
                                        </div> */}
                                    </div>

                                    {msg.role === "user" && (
                                        <div className="flex-shrink-0 w-8 h-8 !rounded-full bg-blue-500 flex items-center justify-center order-2">
                                            <FiUser className="text-white" size={16} />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start items-start gap-2">
                                    <div className="flex-shrink-0 w-8 h-6    !rounded-full bg-blue-100 flex items-center justify-center">
                                        <FiMessageCircle className="text-blue-600" size={16} />
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 !rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 !rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                            <div className="w-2 h-2 bg-gray-400 !rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
                            {recording ? (
                                <div className="flex items-center justify-between gap-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex items-center justify-center">
                                            <div className="absolute w-5 h-5 bg-red-500 !rounded-full opacity-75 animate-ping"></div>
                                            <div className="w-4 h-4 bg-red-600 !rounded-full flex items-center justify-center">
                                                <FiMic size={10} className="text-white" />
                                            </div>
                                        </div>
                                        <span className="text-red-700 ml-4 text-sm font-medium">
                                            Yozib olinmoqda...
                                        </span>
                                    </div>
                                    <button
                                        onClick={stopRecording}
                                        className="!text-red-600 text-sm  hover:!text-red-800"
                                    >
                                        To'xtatish
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Xabaringizni yozing..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="w-full border border-gray-300 !rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition"
                                            disabled={loading}
                                        />
                                        {loading && (
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent !rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={sendMessage}
                                            className={`p-2.5 !rounded-full transition-all ${input.trim() && !loading
                                                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                }`}
                                            disabled={!input.trim() || loading}
                                            aria-label="Send message"
                                        >
                                            <FiSend size={18} />
                                        </button>

                                        <button
                                            onClick={handleRecord}
                                            className={`p-2.5 !rounded-full transition-all ${recording
                                                ? "bg-red-500 animate-pulse text-white"
                                                : "bg-green-500 hover:bg-green-600 text-white shadow-md"
                                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={loading}
                                            title={recording ? "" : "Ovozli xabar"}
                                            aria-label={recording ? "Stop recording" : "Start recording"}
                                        >
                                            <FiMic size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Helper text */}
                            {/* <div className="text-center mt-2">
                                <span className="text-xs text-gray-500">
                                    {recording
                                        ? "Ovozli xabar yozishni to'xtatish uchun mikfon tugmasini yoki 'To'xtatish' tugmasini bosing"
                                        : "Enter tugmasini bosing yoki ovozli xabar uchun mikrofondan foydalaning"
                                    }
                                </span>
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBot;