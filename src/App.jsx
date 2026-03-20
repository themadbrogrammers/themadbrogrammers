import React, { useState, useRef, useEffect } from 'react';
import CyberBackground from './components/CyberBackground';
import ProjectShowcase from './components/ProjectShowcase';
import LabHub from './components/LabHub';
import HackerChat from './components/HackerChat';
import FeaturedVideo from './components/FeaturedVideo';
import SynapseGrid from './components/SynapseGrid';
import LabGear from './components/LabGear';
import AboutCore from './components/AboutCore';
import FloatingSocials from './components/FloatingSocials';
import TimePortal from './components/TimePortal';
import { Github, Youtube, Instagram, Terminal, Network } from 'lucide-react';

// Drop this right above function App() { ... }
const GlitchRain = () => {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex justify-evenly mix-blend-screen">
      {[...Array(30)].map((_, i) => {
        // Generate random strings of gibberish code
        const codeText = Math.random().toString(36).substring(2, 15).toUpperCase() +
          Math.random().toString(36).substring(2, 15).toUpperCase();

        return (
          <div
            key={i}
            className="text-[#00ffe7] font-mono text-sm md:text-xl font-bold whitespace-nowrap opacity-80"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              // Randomize speed and starting delay for chaotic feel
              animation: `fall ${Math.random() * 0.4 + 0.2}s linear infinite`,
              animationDelay: `-${Math.random()}s`
            }}
          >
            {codeText}
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const [isGlitched, setIsGlitched] = useState(false);
  const [typedText, setTypedText] = useState('');
  const featuredRef = useRef(null);
  const footerRef = useRef(null);

  const fullText = "Initialize intellectual_rebellion.sh... Architecture of chaos detected. Proceed with caution.";

  useEffect(() => {
    window.scrollTo(0, 0);
    // Optional: If you want to prevent browser scroll restoration entirely
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // TYPEWRITER EFFECT
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 40); // 40ms per character
    return () => clearInterval(typing);
  }, []);

  const handleEnterLab = () => {
    // 1. Trigger visual chaos
    setIsGlitched(true);

    // 2. Brief delay for the "cool factor" effect
    setTimeout(() => {
      setIsGlitched(false);
      // 3. Smooth scroll to the next section
      featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };
  return (
    <main className={`min-h-screen text-white font-['Share_Tech_Mono'] overflow-x-hidden selection:bg-[#00ffe7] selection:text-[#0a0c10] ${isGlitched ? 'animate-shake' : ''}`}>

      {/* Immersive 3D Interactive Background */}
      <CyberBackground glitched={isGlitched} />

      {/* 🟢 THE NEW MATRIX RAIN (Only renders during the 800ms glitch) */}
      {isGlitched && <GlitchRain />}

      <FloatingSocials footerRef={footerRef} isGlitched={isGlitched} />
      <TimePortal triggerGlobalGlitch={() => setIsGlitched(true)} />

      {/* 🚀 CRITICAL OVERHAUL: THE NEON TERMINAL HERO */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">

        {/* TOP DECOR: SYSTEM STATUS BAR */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl flex justify-between px-10 items-center opacity-40 hidden lg:flex">
          <div className="flex gap-4 font-mono text-[10px] tracking-widest">
            <span className="text-[#00ffe7]">CORE_OS_v4.2.0</span>
            <span className="text-white/40">// LATENCY: 14ms</span>
          </div>
          <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="font-mono text-[10px] text-[#FC5185] animate-pulse">
            STATUS: EXPERIMENT_IN_PROGRESS
          </div>
        </div>

        <div className={`relative group transition-all duration-300 ${isGlitched ? 'scale-95 blur-sm' : 'scale-100'}`}>
          {/* Decorative Bracket Shapes */}
          <div className="absolute -top-12 -left-12 text-6xl text-[#00ffe7]/20 font-light hidden md:block">┌</div>
          <div className="absolute -bottom-12 -right-12 text-6xl text-[#FC5185]/20 font-light hidden md:block">┘</div>

          {/* MAIN TITLE WITH GLITCH OVERLAY */}
          <div className="relative mb-4">
            <h1 className={`text-5xl sm:text-7xl md:text-9xl font-bold font-['Cormorant_Garamond'] tracking-tighter leading-none transition-all ${isGlitched ? 'text-[#00ffe7] skew-x-12' : 'text-white'}`}>
              <span className="relative z-10 text-white">The</span>
              <span className="relative z-10 text-[#00ffe7] italic">Mad</span>
              <br />
              <span className="relative z-10 text-white">Brogrammers</span>
              {/* Ghost effect background */}
              <span className="absolute top-1 left-1 w-full h-full text-white/5 -z-10 blur-[2px] hidden md:block">TheMadBrogrammers</span>
            </h1>
          </div>

          {/* SUBTITLE TERMINAL */}
          <div className="max-w-2xl mx-auto mt-8 border border-white/10 bg-black/60 backdrop-blur-xl p-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FC5185]/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00ffe7]/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              </div>
              <span className="text-[10px] font-mono text-gray-500 ml-2 uppercase tracking-tighter">Manifesto.sh</span>
            </div>

            <div className="p-6 md:p-8 text-left space-y-4">
              <p className="font-mono text-sm md:text-base leading-relaxed text-gray-400 min-h-[3rem]">
                <span className="text-[#00ffe7] mr-2">➜</span>
                {typedText}
                <span className="animate-pulse text-[#00ffe7]">_</span>
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleEnterLab}
                  className="group relative px-8 py-3 bg-transparent border border-[#00ffe7] text-[#00ffe7] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#00ffe7] hover:text-[#0a0c10] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,231,0.2)] hover:shadow-[0_0_30px_rgba(0,255,231,0.5)] active:scale-95"
                >
                  <span className="relative z-10">Initialize Lab</span>
                  <div className="absolute inset-0 bg-[#00ffe7] scale-x-0 group-hover:scale-x-100 transition-transform origin-left -z-0"></div>
                </button>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                <span className="font-mono text-[10px] text-[#FC5185] uppercase tracking-widest">v2.0-stable</span>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR - DYNAMIC */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-[#00ffe7] to-transparent animate-bounce"></div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase">Scroll to Initialize</span>
        </div>
      </section>

      {/* 🧠 NEW: THE NEURAL CORE (ABOUT US) */}
      <div className="relative z-10 bg-[#050608]">
        <AboutCore />
      </div>

      {/* NEW: Decrypted Transmission (Featured Video) */}
      <div ref={featuredRef} className="relative z-10 bg-[#0a0c10] border-t border-white/10">
        <FeaturedVideo />
      </div>

      {/* 💻 EXPERIMENTS SECTION */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-[#0a0c10]/95 to-[#0f1115]">
        <ProjectShowcase />
      </div>

      {/* NEW: Synapse Grid (Articles) */}
      <div className="relative z-10 bg-[#050608] border-t border-[#00ffe7]/10">
        <SynapseGrid />
      </div>

      {/* 📡 DYNAMIC DATA HUB */}
      <div className="relative z-10 bg-[#0f1115] border-t border-[#00ffe7]/10">
        <LabHub />
      </div>

      {/* NEW: Lab Gear (Affiliates) */}
      <div className="relative z-10 bg-gradient-to-b from-[#0f1115] to-[#0a0c10] border-t border-white/5">
        <LabGear />
      </div>

      {/* 💬 SYNAPSE HACKER CHAT */}
      <div className="relative z-10 bg-gradient-to-b from-[#0f1115] to-[#0a0c10] border-t border-[#FC5185]/20 relative">
        {/* Cool background glow for chat */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-[#FC5185] to-transparent shadow-[0_0_20px_#FC5185]"></div>
        <HackerChat />
      </div>

      {/* 🏁 FOOTER: SECURE UPLINKS */}
      <footer ref={footerRef} className="relative z-10 bg-[#050608] border-t border-[#FC5185]/20 pt-16 pb-8 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,231,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,231,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-16">

            {/* Left: Branding & Status */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 text-[#00ffe7] mb-4">
                <Network className="w-5 h-5 animate-pulse" />
                <span className="font-mono text-xs tracking-[0.3em] font-bold">SYSTEM_ONLINE</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-['Cormorant_Garamond'] text-white mb-2">
                The <span className="text-[#FC5185] italic">Mad</span> Brogrammers
              </h2>
              <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">
                Timeless is the new corner.
              </p>
            </div>

            {/* Right: The "Cool" Social Uplinks */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

              {/* GitHub Node */}
              <a href="#" className="group relative flex items-center gap-4 p-4 bg-black border border-white/10 hover:border-[#00ffe7] transition-all overflow-hidden w-full sm:w-48">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ffe7]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <Github className="w-6 h-6 text-gray-500 group-hover:text-[#00ffe7] relative z-10 transition-colors" />
                <div className="flex flex-col relative z-10">
                  <span className="font-mono text-xs text-white tracking-widest uppercase">SOURCE_CODE</span>
                  <span className="font-mono text-[9px] text-[#00ffe7] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">PING: 14ms // SECURE</span>
                </div>
              </a>

              {/* YouTube Node */}
              <a href="#" className="group relative flex items-center gap-4 p-4 bg-black border border-white/10 hover:border-[#FC5185] transition-all overflow-hidden w-full sm:w-48">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FC5185]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <Youtube className="w-6 h-6 text-gray-500 group-hover:text-[#FC5185] relative z-10 transition-colors" />
                <div className="flex flex-col relative z-10">
                  <span className="font-mono text-xs text-white tracking-widest uppercase">BROADCASTS</span>
                  <span className="font-mono text-[9px] text-[#FC5185] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">LIVE // 4K_FEED</span>
                </div>
              </a>

              {/* Instagram Node */}
              <a href="#" className="group relative flex items-center gap-4 p-4 bg-black border border-white/10 hover:border-[#00ffe7] transition-all overflow-hidden w-full sm:w-48">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ffe7]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <Instagram className="w-6 h-6 text-gray-500 group-hover:text-[#00ffe7] relative z-10 transition-colors" />
                <div className="flex flex-col relative z-10">
                  <span className="font-mono text-xs text-white tracking-widest uppercase">VISUAL_LOGS</span>
                  <span className="font-mono text-[9px] text-[#00ffe7] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">SYNC: 100% // READY</span>
                </div>
              </a>

            </div>
          </div>

          {/* Bottom Terminal Output */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 gap-4">
            <div className="flex items-center gap-2 text-gray-600 font-mono text-[10px] tracking-widest uppercase">
              <Terminal className="w-3 h-3" />
              <span>SYS.LOG // {new Date().getFullYear()} // ALL_RIGHTS_RESERVED</span>
            </div>
            <div className="text-gray-600 font-mono text-[10px] tracking-widest uppercase flex items-center gap-1">
              <span>END_OF_TRANSMISSION</span>
              <span className="w-2 h-3 bg-[#FC5185] animate-pulse inline-block ml-1"></span>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}

export default App;