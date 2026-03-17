import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Youtube, TerminalSquare, CornerDownLeft, Loader2, Github, Activity } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "API_KEY_MISSING");

const botPrompts = [
  "Execute: Explain mech psychology.",
  "Query: Lab tech stack.",
  "Generate: Python data viz snippet."
];

// Inner Server Rack StatCard
const StatCard = ({ label, value, color, icon: Icon }) => (
  <div className="relative bg-[#050608] border border-white/10 group hover:border-white/30 transition-colors p-4 md:p-6 flex flex-col justify-between h-full">
    {/* Blinking server light */}
    <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[${color}] animate-pulse shadow-[0_0_8px_${color}]`}></div>

    <div className="flex items-center gap-3 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
      {Icon && <Icon className={`w-5 h-5 text-[${color}]`} />}
      <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">{label}</p>
    </div>

    <p className={`text-2xl md:text-4xl font-bold font-['Share_Tech_Mono'] tracking-tighter text-[${color}]`}>
      {value}
    </p>
  </div>
);

export default function LabHub() {
  const [botResponse, setBotResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [ytStats, setYtStats] = useState({ subscribers: "...", views: "...", videos: "..." });
  const [ghStats, setGhStats] = useState({ followers: "...", publicRepos: "...", latestRepo: "Scanning...", latestUpdate: "..." });

  // --- Fetch Live Data ---
  useEffect(() => {
    const fetchData = async () => {
      // 1. YouTube Fetch (Uses VITE_YOUTUBE_... variables)
      const ytKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const ytChannel = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
      if (ytKey && ytChannel) {
        try {
          const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${ytChannel}&key=${ytKey}`);
          const ytData = await ytRes.json();
          if (ytData.items?.length > 0) {
            const stats = ytData.items[0].statistics;
            setYtStats({
              subscribers: Number(stats.subscriberCount).toLocaleString(),
              views: Number(stats.viewCount).toLocaleString(),
              videos: Number(stats.videoCount).toLocaleString()
            });
          }
        } catch (e) { console.error("YT Error", e); }
      }

      // 2. GitHub Fetch (Public API for user details)
      const githubUsername = "Harit-21";
      try {
        const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        const userData = await userRes.json();
        const repoRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=1`);
        const repoData = await repoRes.json();

        setGhStats({
          followers: userData.followers,
          publicRepos: userData.public_repos,
          latestRepo: repoData.length > 0 ? repoData[0].name : "No public repos",
          latestUpdate: repoData.length > 0 ? new Date(repoData[0].updated_at).toLocaleDateString() : "N/A"
        });
      } catch (e) { console.error("GitHub Error", e); }
    };
    fetchData();
  }, []);

  // --- Mad Bot Logic (Keeps the v4-ready flash model change) ---
  const askMadBot = async (promptText) => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setBotResponse("ERROR: Missing VITE_GEMINI_API_KEY in .env file. Calibration required.");
      return;
    }
    setIsThinking(true);
    setBotResponse("");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const systemContext = `You are 'Mad Bot', the AI assistant for 'TheMadBrogrammers'. Tone: cyberpunk, technical, concise. Answer concisely. User asks: ${promptText}`;
      const result = await model.generateContent(systemContext);
      setBotResponse(await result.response.text());
    } catch (error) {
      setBotResponse("SYSTEM FAILURE: Neural link disconnected. The API request failed.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    askMadBot(customPrompt);
    setCustomPrompt("");
  };

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

        {/* --- LIVE LAB TELEMETRY (Left Column) --- */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="lg:col-span-7 space-y-8">

          {/* Section Header */}
          <div className="flex items-end gap-4 border-b border-white/10 pb-4 mb-8">
            <Activity className="w-8 h-8 text-[#00ffe7]" />
            <div>
              <h2 className="text-xs font-mono text-[#00ffe7] tracking-[0.3em] mb-1">LIVE SERVER DATA</h2>
              <h3 className="text-3xl font-bold font-['Cormorant_Garamond'] uppercase tracking-tight">Mainframe <span className="text-[#FC5185] italic">Telemetry</span></h3>
            </div>
          </div>

          {/* YouTube Rack */}
          <div className="border border-white/5 bg-[#0a0c10] p-1">
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-500 tracking-widest">NODE_01 // YT_ANALYTICS</span>
              <Youtube className="w-4 h-4 text-[#FF0000]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 bg-black">
              <StatCard label="Subscribers" value={ytStats.subscribers} color="#00ffe7" />
              <StatCard label="Total Views" value={ytStats.views} color="#FC5185" />
              <StatCard label="Videos" value={ytStats.videos} color="#ffffff" className="col-span-2 md:col-span-1" />
            </div>
          </div>

          {/* GitHub Rack */}
          <div className="border border-white/5 bg-[#0a0c10] p-1">
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-500 tracking-widest">NODE_02 // GH_COMMITS</span>
              <Github className="w-4 h-4 text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-black">
              <div className="bg-[#050608] border border-transparent p-6 flex flex-col justify-center">
                <p className="text-[10px] text-gray-500 mb-2 uppercase font-mono tracking-widest">Latest Deployment</p>
                <h4 className="text-lg font-bold text-[#00ffe7] font-['Share_Tech_Mono'] mb-1 truncate">{ghStats.latestRepo}</h4>
                <p className="text-[10px] text-gray-500 font-mono">SYNC: {ghStats.latestUpdate}</p>
              </div>
              <div className="flex gap-1">
                <div className="flex-1"><StatCard label="Repos" value={ghStats.publicRepos} color="#ffffff" /></div>
                <div className="flex-1"><StatCard label="Followers" value={ghStats.followers} color="#ffffff" /></div>
              </div>
            </div>
          </div>

        </motion.div>

        {/* --- THE MAD BOT AI (Right Column CRT Terminal) --- */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-5 h-[600px] flex flex-col" >

          <div className="flex-1 bg-[#050608] border border-[#FC5185]/30 p-1 relative flex flex-col shadow-[0_0_30px_rgba(252,81,133,0.1)]">
            {/* Terminal Header */}
            <div className="bg-[#FC5185]/10 border-b border-[#FC5185]/30 px-4 py-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TerminalSquare className="w-4 h-4 text-[#FC5185]" />
                <span className="font-mono text-[10px] text-[#FC5185] tracking-widest font-bold">MAD_BOT.exe</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-gray-600"></div>
                <div className="w-2 h-2 bg-gray-600"></div>
                <div className="w-2 h-2 bg-[#FC5185] animate-pulse"></div>
              </div>
            </div>

            {/* Terminal Screen (Phosphor styling) */}
            <div className="flex-1 bg-[#020202] p-4 md:p-6 overflow-hidden relative flex flex-col">
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.25) 50%)', backgroundSize: '100% 4px' }}></div>

              <div className="flex flex-col gap-2 mb-4">
                {botPrompts.slice(0, 2).map((prompt, i) => (
                  <button
                    key={i} onClick={() => askMadBot(prompt)} disabled={isThinking}
                    className="text-left font-mono text-[10px] md:text-xs text-gray-500 hover:text-[#00ffe7] hover:bg-[#00ffe7]/5 py-1 px-2 border border-transparent hover:border-[#00ffe7]/30 transition-all flex items-center justify-between"
                  >
                    <span>&gt; {prompt}</span>
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#FC5185]/30 font-mono text-xs md:text-sm">
                {isThinking ? (
                  <div className="text-[#FC5185] animate-pulse">
                    &gt; Processing query...<br />
                    &gt; Accessing neural net...
                  </div>
                ) : botResponse ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#00ffe7] leading-relaxed whitespace-pre-wrap drop-shadow-[0_0_5px_rgba(0,255,231,0.5)]">
                    &gt; {botResponse}
                  </motion.div>
                ) : (
                  <div className="text-gray-600">
                    &gt; System ready.<br />
                    &gt; Awaiting command...<span className="animate-pulse">_</span>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleCustomSubmit} className="bg-black border-t border-[#FC5185]/30 p-2 flex gap-2">
              <span className="text-[#FC5185] font-mono text-sm py-2 pl-2">&gt;</span>
              <input
                type="text" value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} disabled={isThinking}
                className="flex-1 bg-transparent border-none outline-none text-[#FC5185] font-mono text-sm placeholder-[#FC5185]/30 focus:ring-0"
                placeholder="Type command..."
              />
              <button type="submit" disabled={isThinking || !customPrompt.trim()} className="bg-[#FC5185]/10 text-[#FC5185] px-4 font-mono text-xs border border-[#FC5185]/30 hover:bg-[#FC5185] hover:text-black transition-colors disabled:opacity-50">
                EXEC
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}