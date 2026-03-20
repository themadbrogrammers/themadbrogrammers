import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Fingerprint, Zap, Network } from 'lucide-react';

export default function AboutCore() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full relative z-10 border-t border-white/5">
      
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,231,0.03)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* --- LEFT: THE NEURAL LOGO --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex justify-center items-center group"
        >
          {/* Ambient Glow behind the brain */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-[#FC5185] to-[#00ffe7] opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity duration-700 rounded-full mix-blend-screen"></div>
          
          {/* Scanning Line Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-20 mask-image:radial-gradient(circle,black,transparent)]">
            <div className="w-full h-1 bg-[#00ffe7]/50 shadow-[0_0_20px_#00ffe7] absolute top-0 animate-[scan_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <motion.img 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            // Replace this src with the actual path to your uploaded image file
            src="/TheMadBrogrammers.png" 
            alt="The Mad Brogrammers Neural Core" 
            className="w-full max-w-md relative z-10 drop-shadow-[0_0_30px_rgba(252,81,133,0.3)] mix-blend-screen"
          />
        </motion.div>

        {/* --- RIGHT: THE MANIFESTO --- */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="flex items-center gap-3 mb-6">
            <Fingerprint className="w-6 h-6 text-[#FC5185] animate-pulse" />
            <span className="font-mono text-[10px] text-[#FC5185] tracking-[0.3em] uppercase">IDENTITY // ESTABLISHED</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-['Cormorant_Garamond'] text-white mb-8 leading-tight">
            The Architecture <br /> of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffe7] to-[#FC5185] italic">Beautiful Chaos</span>
          </h2>

          <div className="space-y-6 text-gray-400 font-light text-base md:text-lg leading-relaxed font-['Share_Tech_Mono']">
            <p>
              Tutorials lie. They show you the "happy path"—a sanitized, frictionless illusion of software engineering. The modern web isn't built on happy paths. It is forged in the dark, stitched together by frantic console logs, deprecated APIs, and brilliant, unhinged workarounds.
            </p>
            <p className="border-l-2 border-[#00ffe7] pl-4 text-gray-300">
              <strong className="text-white">TheMadBrogrammers</strong> is an anomaly. We are not instructors; we are architects of the absurd. We operate where the compiler fails and the actual engineering begins.
            </p>
          </div>

          {/* Core Directives */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0a0c10] border border-white/5 p-4 group hover:border-[#FC5185]/50 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-[#FC5185]">
                <Zap className="w-4 h-4" />
                <h4 className="font-mono text-xs tracking-widest font-bold">LEFT HEMISPHERE</h4>
              </div>
              <p className="font-mono text-[10px] text-gray-500 uppercase">Brutal, unforgiving logic. We write code that scales, secures, and dominates the runtime.</p>
            </div>

            <div className="bg-[#0a0c10] border border-white/5 p-4 group hover:border-[#00ffe7]/50 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-[#00ffe7]">
                <Network className="w-4 h-4" />
                <h4 className="font-mono text-xs tracking-widest font-bold">RIGHT HEMISPHERE</h4>
              </div>
              <p className="font-mono text-[10px] text-gray-500 uppercase">Architected madness. Breaking boundaries, bending frameworks, and building the impossible.</p>
            </div>
          </div>

          {/* Terminal Signature */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-4">
            <Terminal className="w-5 h-5 text-gray-600" />
            <span className="font-mono text-xs text-gray-600 tracking-widest">
              &gt; EXECUTE: STAY_MAD.sh
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}