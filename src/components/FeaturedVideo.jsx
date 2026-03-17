import React, { useState, useEffect } from 'react';
import { Radio, Activity, Terminal, PlaySquare, LockOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// Replace 'videoId' with your actual YouTube video IDs
const topVideos = [
  { id: "FREQ-01", title: "Building a Neural Net in Pure JS", videoId: "YOUR_VID_1", time: "14:20", status: "LIVE" },
  { id: "FREQ-02", title: "Real-Time WebSockets Architecture", videoId: "YOUR_VID_2", time: "08:45", status: "DECRYPTED" },
  { id: "FREQ-03", title: "Python Data Structures Explained", videoId: "YOUR_VID_3", time: "22:10", status: "DECRYPTED" },
  { id: "FREQ-04", title: "Deploying the Mainframe (DevOps)", videoId: "YOUR_VID_4", time: "11:05", status: "ARCHIVED" },
  { id: "FREQ-05", title: "Hacking CSS for Cyberpunk UI", videoId: "YOUR_VID_5", time: "16:30", status: "ARCHIVED" },
];

export default function FeaturedVideo() {
  const [time, setTime] = useState('');
  const [activeVideo, setActiveVideo] = useState(topVideos[0]);
  const [isSwitching, setIsSwitching] = useState(false);

  // Fake system time generator
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(`${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()} UTC // ${Math.floor(Math.random() * 999)}MS`);
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Glitch effect when switching feeds
  const handleVideoSwitch = (video) => {
    if (activeVideo.id === video.id) return;
    setIsSwitching(true);
    setActiveVideo(video);
    setTimeout(() => setIsSwitching(false), 500); // 500ms static glitch
  };

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full relative">

      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 bg-[#FC5185]/10 border border-[#FC5185]/30">
            <Radio className="w-6 h-6 text-[#FC5185] animate-pulse" />
            <div className="absolute inset-0 border border-[#FC5185] animate-ping opacity-20"></div>
          </div>
          <div>
            <h2 className="text-sm font-mono text-[#FC5185] tracking-[0.3em] mb-1">INTERCEPTED FEEDS</h2>
            <h3 className="text-3xl md:text-5xl font-bold font-['Cormorant_Garamond'] text-white uppercase tracking-tight">
              Decrypted <span className="text-[#00ffe7] italic">Transmissions</span>
            </h3>
          </div>
        </div>

        {/* TELEMETRY DATA */}
        <div className="hidden md:flex flex-col items-end font-mono text-[10px] text-gray-500 tracking-widest text-right">
          <span>FREQ: 144.05 MHz // ENCRYPTION: RSA-4096</span>
          <span className="text-[#00ffe7]">{time}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* --- MAIN VIDEO HUD (Left Side - spans 8 cols) --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-8 relative p-1 bg-[#0a0c10] border border-white/10 group flex flex-col"
        >
          {/* HUD Corners */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00ffe7] z-20 transition-colors duration-300"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#00ffe7] z-20"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#00ffe7] z-20"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00ffe7] z-20"></div>

          {/* Top Video Status Bar */}
          <div className="absolute top-0 left-0 w-full h-8 bg-black/80 backdrop-blur-sm border-b border-white/10 z-10 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isSwitching ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`}></div>
              <span className={`font-mono text-[10px] tracking-widest uppercase ${isSwitching ? 'text-yellow-500' : 'text-red-500'}`}>
                {isSwitching ? 'RECALIBRATING...' : `UPLINK // ${activeVideo.id}`}
              </span>
            </div>
            <Activity className="w-4 h-4 text-[#00ffe7]" />
          </div>

          <div className="relative aspect-video bg-black overflow-hidden border border-white/5 flex-1">
            {/* Scanline Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15]"
              style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}>
            </div>

            {/* Simulated Signal Static during switch */}
            {isSwitching && (
              <div className="absolute inset-0 z-20 bg-white/10 mix-blend-overlay flex items-center justify-center backdrop-blur-md">
                <span className="font-mono text-[#00ffe7] text-xl tracking-[0.5em] animate-pulse font-bold">TUNING...</span>
              </div>
            )}

            <iframe
              className={`w-full h-full transition-all duration-300 ${isSwitching ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100 grayscale-[30%] contrast-[1.1] group-hover:grayscale-0'}`}
              src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=0&controls=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Bottom Video Data Bar */}
          <div className="bg-black/80 backdrop-blur-sm border-t border-white/10 z-10 flex items-center gap-4 px-4 py-2 mt-auto">
            <Terminal className="w-3 h-3 text-gray-500" />
            <span className="font-mono text-[9px] text-gray-500 tracking-widest overflow-hidden whitespace-nowrap">
              &gt; DECODING_STREAM_BUFFER... [██████████░░] 82% // CURRENT: {activeVideo.title.toUpperCase()}
            </span>
          </div>
        </motion.div>


        {/* --- FREQUENCY SELECTOR (Right Side - spans 4 cols) --- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 mb-2 px-2">
            <PlaySquare className="w-4 h-4 text-[#00ffe7]" />
            <span className="font-mono text-xs text-[#00ffe7] tracking-widest uppercase font-bold">AVAILABLE_ARCHIVES</span>
          </div>

          <div className="flex-1 flex flex-col gap-3 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {topVideos.map((video) => {
              const isActive = activeVideo.id === video.id;

              return (
                <button
                  key={video.id}
                  onClick={() => handleVideoSwitch(video)}
                  className={`relative flex flex-col p-4 text-left transition-all duration-300 border ${isActive
                      ? 'bg-[#00ffe7]/10 border-[#00ffe7] shadow-[0_0_15px_rgba(0,255,231,0.2)]'
                      : 'bg-[#050608] border-white/5 hover:border-[#FC5185]/50 hover:bg-white/5'
                    }`}
                >
                  {/* Top Bar of button */}
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-mono text-[10px] tracking-widest ${isActive ? 'text-[#00ffe7]' : 'text-gray-500'}`}>
                      {video.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#00ffe7] animate-pulse"></div>}
                      <span className={`font-mono text-[9px] tracking-widest uppercase ${isActive ? 'text-[#00ffe7]' : (video.status === 'ARCHIVED' ? 'text-gray-600' : 'text-[#FC5185]')
                        }`}>
                        {isActive ? 'PLAYING' : video.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex gap-3 items-start">
                    <LockOpen className={`w-4 h-4 mt-1 shrink-0 transition-colors ${isActive ? 'text-[#00ffe7]' : 'text-gray-600'}`} />
                    <div>
                      <h4 className={`font-['Share_Tech_Mono'] text-sm tracking-tight leading-snug mb-2 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {video.title}
                      </h4>
                      <span className="font-mono text-[10px] text-gray-500 bg-black px-2 py-0.5 border border-white/10">
                        T-{video.time}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}