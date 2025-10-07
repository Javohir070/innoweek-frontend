"use client";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { FiX, FiMic, FiSend, FiUser, FiMessageCircle } from "react-icons/fi";
import axios from "axios";
import img from "@/assets/img/png-clipart-virtual-assistant.png"

interface Message {
    role: "user" | "bot";
    text: string;
    audio_url?: string | null;
}

interface ChatRecord {
    id: number;
    chat_id: string;
    user_text: string;
    reply_text: string;
    user_audio_path: string | null;
    reply_audio_path: string | null;
    created_at: string;
}

const chatbotUrl = "https://chat_innoweek2.ilmiy1.uz";

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
    const [chatId] = useState(() => Date.now().toString()); // Yangi chat ID yaratish
    const [token, setToken] = useState<string | null>(null);

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

    // Login function
    const login = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', 'jamshid'); // O'z username ingizni qo'ying
            formData.append('password', '123@devops'); // O'z password ingizni qo'ying
            formData.append('grant_type', 'password');

            const response = await axios.post(`${chatbotUrl}/auth/login`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.data.access_token) {
                setToken(response.data.access_token);
                localStorage.setItem('chat_token', response.data.access_token);
                return response.data.access_token;
            }
        } catch (error) {
            console.error('Login error:', error);
        }
        return null;
    };

    // Get token from localStorage or login
    const getToken = async () => {
        let authToken = token || localStorage.getItem('chat_token');
        if (!authToken) {
            authToken = await login();
        }
        return authToken;
    };

    // Load chat history
    const loadChatHistory = async () => {
        try {
            const authToken = await getToken();
            if (!authToken) return;

            const response = await axios.get(`${chatbotUrl}/chats/${chatId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (response.data && Array.isArray(response.data)) {
                const historyMessages: Message[] = response.data.map((record: ChatRecord) => [
                    { role: "user" as const, text: record.user_text },
                    {
                        role: "bot" as const,
                        text: record.reply_text,
                        audio_url: record.reply_audio_path
                            ? `${chatbotUrl}/audio/${record.reply_audio_path.split('/').pop()}`
                            : null
                    }
                ]).flat();

                setMessages(prev => [
                    prev[0], // Keep welcome message
                    ...historyMessages
                ]);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    };

    useEffect(() => {
        if (open) {
            loadChatHistory();
        }
    }, [open]);

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
            const authToken = await getToken();
            if (!authToken) {
                throw new Error('Authentication failed');
            }

            const formData = new URLSearchParams();
            formData.append('chat_id', chatId);
            formData.append('text', userText);

            const res = await axios.post(
                `${chatbotUrl}/chat/text`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authToken}`
                    },
                    timeout: 30000,
                }
            );

            const responseData = res.data;
            console.log("Text chat response:", responseData);

            // Javobni darhol ko'rsatish (audio kutmasdan)
            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: responseData.reply_text,
                    audio_url: null // Hozircha audio yo'q
                },
            ]);
            setIsTyping(false);
            setLoading(false);

            // Generate TTS for the response (background da)
            try {
                const ttsFormData = new URLSearchParams();
                ttsFormData.append('chat_id', chatId);
                ttsFormData.append('chat_record_id', responseData.chat_record_id.toString());
                ttsFormData.append('reply_text', responseData.reply_text);
                ttsFormData.append('lang', 'uz'); // Uzbek language

                const ttsResponse = await axios.post(
                    `${chatbotUrl}/tts`,
                    ttsFormData,
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": `Bearer ${authToken}`
                        },
                    }
                );

                console.log("TTS response (text):", ttsResponse.data);

                // Audio URL ni to'g'ri olish
                let audioUrl = null;
                if (ttsResponse.data?.reply_audio_url) {
                    audioUrl = ttsResponse.data.reply_audio_url;
                } else if (typeof ttsResponse.data === 'string') {
                    audioUrl = `${chatbotUrl}/audio/${ttsResponse.data}`;
                }

                console.log("TTS audio URL (text):", audioUrl);

                if (audioUrl) {
                    // Oxirgi xabarni audio bilan yangilash
                    setMessages(prev => {
                        const newMessages = [...prev];
                        if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'bot') {
                            newMessages[newMessages.length - 1].audio_url = audioUrl;
                        }
                        return newMessages;
                    });
                }
            } catch (ttsError) {
                console.warn('TTS generation failed:', ttsError);
            }

        } catch (error: any) {
            console.error("Error sending message:", error);
            let errorMessage = "❌ Xatolik yuz berdi. Qayta urinib ko'ring.";

            if (error.response) {
                if (error.response.status === 401) {
                    // Token expired, try to login again
                    localStorage.removeItem('chat_token');
                    setToken(null);
                    errorMessage = "❌ Avtorizatsiya amal muddati tugagan. Qayta urinib ko'ring.";
                } else {
                    errorMessage += ` (${error.response.status})`;
                }
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
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
                sampleRate: 16000 // STT uchun 16kHz
            });
            const fileReader = new FileReader();

            fileReader.onload = async function () {
                try {
                    const arrayBuffer = this.result as ArrayBuffer;

                    // AudioContext ni resume qilish
                    if (audioContext.state === 'suspended') {
                        await audioContext.resume();
                    }

                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    
                    console.log("Audio decoded successfully:", {
                        duration: audioBuffer.duration,
                        sampleRate: audioBuffer.sampleRate,
                        numberOfChannels: audioBuffer.numberOfChannels,
                        length: audioBuffer.length
                    });

                    // WAV encoding
                    const numberOfChannels = Math.min(audioBuffer.numberOfChannels, 1); // Mono uchun
                    const sampleRate = audioBuffer.sampleRate;
                    const length = audioBuffer.length * numberOfChannels * 2 + 44;
                    const buffer = new ArrayBuffer(length);
                    const view = new DataView(buffer);

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

                    // Audio data yozish (mono)
                    const channelData = audioBuffer.getChannelData(0); // Faqat birinchi kanalni olamiz
                    for (let i = 0; i < audioBuffer.length; i++) {
                        const sample = channelData[i];
                        const int16Sample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
                        view.setInt16(offset, int16Sample, true);
                        offset += 2;
                    }

                    const wavBlob = new Blob([buffer], { type: 'audio/wav' });
                    
                    console.log("WAV created successfully:", {
                        size: wavBlob.size,
                        duration: audioBuffer.duration,
                        estimatedBitrate: Math.round(wavBlob.size * 8 / audioBuffer.duration / 1000) + ' kbps'
                    });
                    
                    audioContext.close();
                    resolve(wavBlob);

                } catch (error) {
                    console.error('Error converting WebM to WAV:', error);
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

    // STT (Speech-to-Text) orqali audio yuborish
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
                    autoGainControl: true,
                    sampleRate: 16000,
                    channelCount: 1,
                    sampleSize: 16
                }
            });

            console.log("Audio stream started:", {
                tracks: stream.getTracks().length,
                audioTrack: stream.getAudioTracks()[0]?.getSettings()
            });

            streamRef.current = stream;

            // MediaRecorder options
            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
                ? 'audio/webm;codecs=opus'
                : 'audio/webm';
            
            console.log("Using mimeType:", mimeType);
            
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: mimeType,
                audioBitsPerSecond: 128000
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

                    const authToken = await getToken();
                    if (!authToken) {
                        throw new Error('Authentication failed');
                    }

                    console.log("Original WebM blob:", {
                        size: webmBlob.size,
                        type: webmBlob.type
                    });

                    // WebM ni WAV ga o'girish
                    const wavBlob = await webmToWav(webmBlob);
                    console.log("Converted WAV blob:", {
                        size: wavBlob.size,
                        type: wavBlob.type,
                        sizeInKB: Math.round(wavBlob.size / 1024)
                    });

                    // Fayl nomini yaratish
                    const fileName = `voice_${Date.now()}.wav`;

                    const formData = new FormData();
                    formData.append("chat_id", chatId);
                    formData.append("lang", "uz");
                    formData.append("audio", wavBlob, fileName);
                    
                    // FormData ni debug qilish
                    console.log("FormData prepared:", {
                        chat_id: chatId,
                        lang: "uz",
                        fileName: fileName,
                        audioSize: wavBlob.size
                    });

                    console.log("Sending audio to STT...");

                    // STT endpointiga audio yuborish
                    const sttResponse = await axios.post(
                        `${chatbotUrl}/stt`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "Authorization": `Bearer ${authToken}`
                            },
                            timeout: 45000, // Timeoutni oshiramiz
                        }
                    );

                    console.log("STT Response:", sttResponse.data);

                    // STT API'dan user_text maydonini olish
                    const userText = sttResponse.data.user_text || sttResponse.data.userText || sttResponse.data.text || '';
                    console.log("Extracted userText:", userText);

                    if (!userText || userText.trim() === '') {
                        console.error("STT response full data:", sttResponse.data);
                        throw new Error('STT hech narsa qaytarmadi yoki text bo\'sh');
                    }

                    // User xabarini UI ga qo'shish
                    setMessages(prev => [...prev, { role: "user", text: userText.trim() }]);

                    // Endi text chat orqali javob olish
                    const chatFormData = new URLSearchParams();
                    chatFormData.append('chat_id', chatId);
                    chatFormData.append('text', userText.trim());

                    console.log("Sending text to chat:", userText.trim());

                    const chatResponse = await axios.post(
                        `${chatbotUrl}/chat/text`,
                        chatFormData,
                        {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Authorization": `Bearer ${authToken}`
                            },
                            timeout: 30000,
                        }
                    );

                    const responseData = chatResponse.data;
                    console.log("Chat response:", responseData);

                    // Javobni darhol ko'rsatish (audio kutmasdan)
                    setMessages(prev => [
                        ...prev,
                        {
                            role: "bot",
                            text: responseData.reply_text,
                            audio_url: null // Hozircha audio yo'q
                        },
                    ]);
                    setIsTyping(false);
                    setLoading(false);

                    // TTS generatsiya qilish (background da)
                    try {
                        const ttsFormData = new URLSearchParams();
                        ttsFormData.append('chat_id', chatId);
                        ttsFormData.append('chat_record_id', responseData.chat_record_id.toString());
                        ttsFormData.append('reply_text', responseData.reply_text);
                        ttsFormData.append('lang', 'uz');

                        const ttsResponse = await axios.post(
                            `${chatbotUrl}/tts`,
                            ttsFormData,
                            {
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Authorization": `Bearer ${authToken}`
                                },
                                timeout: 30000,
                            }
                        );

                        console.log("TTS response:", ttsResponse.data);

                        // Audio URL ni to'g'ri olish
                        let audioUrl = null;
                        if (ttsResponse.data?.reply_audio_url) {
                            audioUrl = ttsResponse.data.reply_audio_url;
                        } else if (typeof ttsResponse.data === 'string') {
                            audioUrl = `${chatbotUrl}/audio/${ttsResponse.data}`;
                        }

                        console.log("TTS audio URL:", audioUrl);

                        if (audioUrl) {
                            // Oxirgi xabarni audio bilan yangilash
                            setMessages(prev => {
                                const newMessages = [...prev];
                                if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'bot') {
                                    newMessages[newMessages.length - 1].audio_url = audioUrl;
                                }
                                return newMessages;
                            });
                        }
                    } catch (ttsError) {
                        console.warn('TTS generation failed:', ttsError);
                    }

                } catch (error: any) {
                    console.error("Error processing audio:", error);
                    let errorMessage = "❌ Ovozli xabar yuborishda xatolik";

                    if (error.response) {
                        console.error("Error response:", error.response);
                        if (error.response.status === 401) {
                            localStorage.removeItem('chat_token');
                            setToken(null);
                            errorMessage = "❌ Avtorizatsiya amal muddati tugagan. Qayta urinib ko'ring.";
                        } else if (error.response.data?.detail) {
                            errorMessage += `: ${error.response.data.detail}`;
                        } else {
                            errorMessage += `: Server xatosi (${error.response.status})`;
                        }
                    } else if (error.request) {
                        console.error("Error request:", error.request);
                        errorMessage += ": Serverga ulanib bo'lmadi";
                    } else {
                        console.error("Error details:", error);
                        errorMessage += `: ${error.message}`;
                    }

                    setMessages(prev => [
                        ...prev,
                        { role: "user", text: "🎤 Ovozli xabar" },
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
            mediaRecorder.start(100); // 100ms timeslice for smoother chunks
            setRecording(true);
            console.log("Recording started");

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
    }, [recording, stopRecording, chatId]);

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
                        className="cursor-pointer absolute right-2 bottom-2 !rounded-full shadow-lg p-2 hover:scale-105 transition"
                        aria-label="Open chat"
                    >
                        <Image
                            src={img}
                            alt="Chat"
                            className="w-12 h-12 !rounded-full"
                            width={48}
                            // height={48}
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
                                        className="w-10 h-10 bg-white/90 !rounded-full border-2 border-white"
                                        src={img}
                                        alt="Chatbot"
                                        width={40}
                                        height={40}
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 !rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <div className="font-semibold block ">Virtual Assistant</div>
                                    <div className="text-blue-100 text-xs -">
                                        {isTyping ? "Javob yozmoqda..." : "Online"}
                                    </div>
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
                                    <div className="flex-shrink-0 w-8 h-6 !rounded-full bg-blue-100 flex items-center justify-center">
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBot;