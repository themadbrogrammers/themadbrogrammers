import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { UsersRound, MessageSquareText, Send, TerminalSquare, LogIn, LogOut, ShieldCheck, RadioTower } from "lucide-react";

import { db, auth, provider } from "../firebase";
import { ref, onValue, push, serverTimestamp } from "firebase/database";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function HackerChat() {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);

    // 1. Add this new ref for the container
    const chatContainerRef = useRef(null);
    const messagesEndRef = useRef(null);

    // 2. Change your scrollToBottom function to this:
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    /* AUTH LISTENER */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    /* REALTIME CHAT LISTENER */
    useEffect(() => {
        const messagesRef = ref(db, "messages");
        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedMessages = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }));
                setMessages(loadedMessages);
            } else {
                setMessages([]);
            }
        });
        return () => unsubscribe();
    }, []);

    /* AUTH ACTIONS */
    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSignOut = () => {
        signOut(auth);
    };

    /* SEND MESSAGE */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || !user) return;

        const messagesRef = ref(db, "messages");
        await push(messagesRef, {
            text: chatInput,
            user: user.displayName || "Dev",
            avatar: user.photoURL || "👨‍💻",
            color: "#00ffe7",
            timestamp: serverTimestamp()
        });
        setChatInput("");
    };

    /* TIME FORMAT */
    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    };

    return (
        <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto text-white relative group">

            {/* TOP GLOW LINE */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px bg-gradient-to-r from-transparent via-[#FC5185] to-transparent shadow-[0_0_20px_#FC5185] group-hover:via-[#00ffe7] group-hover:shadow-[0_0_30px_#00ffe7] transition-all duration-700"></div>

            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6 pt-6 md:pt-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#FC5185]/10 border border-[#FC5185]/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#FC5185] opacity-20 animate-pulse"></div>
                        <RadioTower className="w-6 h-6 text-[#FC5185] relative z-10" />
                    </div>
                    <div>
                        <h2 className="text-xs font-mono text-[#FC5185] tracking-[0.3em] mb-1">SECURE COMMS LINK</h2>
                        <h3 className="text-3xl md:text-5xl font-bold font-['Cormorant_Garamond'] tracking-tight uppercase">
                            Synapse <span className="text-white italic">Uplink</span>
                        </h3>
                    </div>
                </div>

                {/* AUTH TERMINAL BLOCK */}
                <div className="w-full md:w-auto p-1 bg-[#050608] border border-white/10">
                    {user ? (
                        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 border border-transparent hover:border-white/10 transition-colors">
                            <img src={user.photoURL} alt="avatar" className="w-8 h-8 grayscale contrast-125 border border-[#00ffe7]" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">ID: {user.displayName}</span>
                                <button onClick={handleSignOut} className="text-left flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#FC5185] transition-colors mt-1">
                                    <LogOut size={12} /> DISCONNECT
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={handleSignIn} className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#00ffe7]/10 hover:bg-[#00ffe7] hover:text-black border border-[#00ffe7]/30 px-6 py-3 font-mono text-xs text-[#00ffe7] tracking-[0.2em] transition-all">
                            <LogIn size={14} /> INITIATE_NEURAL_LINK
                        </button>
                    )}
                </div>
            </div>

            {/* CHAT WINDOW (Terminal UI) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[#0a0c10] border border-white/10 relative p-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.25) 50%)', backgroundSize: '100% 4px' }}></div>

                <div className="bg-[#050608] relative flex flex-col h-[600px] border border-white/5">

                    {/* STATUS BAR */}
                    <div className="bg-[#00ffe7]/5 border-b border-[#00ffe7]/20 px-4 py-2 flex items-center justify-between z-10">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-4 h-4 text-[#00ffe7]" />
                            <span className="text-[#00ffe7] text-[10px] font-mono tracking-[0.2em] uppercase">
                                GLOBAL_NET // RSA-4096_ENCRYPTED
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#00ffe7] animate-pulse"></div>
                            <span className="text-gray-500 text-[9px] font-mono tracking-widest uppercase">SYS_ONLINE</span>
                        </div>
                    </div>

                    {/* MESSAGE LIST */}
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#00ffe7]/30 scrollbar-track-transparent z-10 relative"
                    >

                        {/* Fake system boot message */}
                        <div className="mb-8 text-center border-b border-dashed border-white/10 pb-4">
                            <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase block mb-1">/// SECURE CHANNEL ESTABLISHED ///</span>
                            <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">AWAITING_TRANSMISSIONS...</span>
                        </div>

                        {messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-gray-500 font-mono text-xs tracking-widest">
                                &gt; NO_DATA_IN_BUFFER
                            </div>
                        ) : (
                            messages.map((msg) => {
                                const isMe = user && msg.user === user.displayName;
                                return (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: isMe ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex flex-col ${isMe ? "items-end" : "items-start"} w-full group`}
                                    >
                                        <div className="flex items-center gap-2 mb-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                            {!isMe && <span className="font-mono text-[9px] text-[#FC5185] tracking-widest">[{msg.user.toUpperCase()}]</span>}
                                            <span className="font-mono text-[9px] text-gray-500">{formatTime(msg.timestamp)}</span>
                                            {isMe && <span className="font-mono text-[9px] text-[#00ffe7] tracking-widest">[YOU]</span>}
                                        </div>

                                        <div className={`flex items-start gap-3 max-w-[85%] md:max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                                            {/* Minimalist Avatar Box */}
                                            <div className="shrink-0 w-8 h-8 bg-black border border-white/10 flex items-center justify-center overflow-hidden grayscale contrast-125">
                                                {msg.avatar?.startsWith("http") ? (
                                                    <img src={msg.avatar} alt="avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-xs">{msg.avatar || "SYS"}</span>
                                                )}
                                            </div>

                                            {/* Sharp Terminal Text Block */}
                                            <div className={`p-3 font-mono text-xs md:text-sm tracking-tight leading-relaxed ${isMe
                                                ? "bg-[#00ffe7]/5 border-r-2 border-[#00ffe7] text-[#00ffe7] shadow-[-20px_0_30px_-15px_rgba(0,255,231,0.05)_inset]"
                                                : "bg-white/5 border-l-2 border-[#FC5185] text-gray-300 shadow-[20px_0_30px_-15px_rgba(252,81,133,0.05)_inset]"
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* TERMINAL INPUT */}
                    <form onSubmit={handleSubmit} className="bg-black border-t border-[#FC5185]/20 p-2 md:p-3 flex gap-2 relative z-10">
                        <div className="flex items-center justify-center px-2 text-[#00ffe7]">
                            <span className="font-mono text-sm font-bold">&gt;</span>
                        </div>

                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            disabled={!user}
                            placeholder={user ? "Execute transmission..." : "Auth required to transmit"}
                            className="flex-1 bg-transparent border-none text-white font-mono text-xs md:text-sm focus:ring-0 outline-none placeholder-gray-600 disabled:opacity-50"
                        />

                        <button
                            type="submit"
                            disabled={!user || !chatInput.trim()}
                            className="bg-[#FC5185]/10 border border-[#FC5185]/30 text-[#FC5185] px-4 md:px-6 py-2 font-mono text-xs tracking-widest hover:bg-[#FC5185] hover:text-black transition-colors disabled:opacity-30 disabled:hover:bg-[#FC5185]/10 disabled:hover:text-[#FC5185] flex items-center gap-2"
                        >
                            <span className="hidden sm:inline">SEND</span>
                            <Send size={14} />
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}