import React from 'react';
import { Cpu, Monitor, Keyboard, Terminal } from 'lucide-react';

const gear = [
  { id: "HW-01", name: "Keychron K2 Mech", spec: "TACTILE_INTERFACE // 75% LAYOUT", icon: Keyboard, link: "#" },
  { id: "HW-02", name: "LG 34-Inch Ultrawide", spec: "CODE_CANVAS // 21:9 RATIO", icon: Monitor, link: "#" },
  { id: "HW-03", name: "M2 Mac Mini (16GB)", spec: "CORE_PROCESSOR // SILICON_ARCH", icon: Cpu, link: "#" }
];

export default function LabGear() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full text-white relative">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <div className="w-12 h-1 bg-[#FC5185] mb-6"></div>
        <h2 className="text-3xl md:text-5xl font-bold font-['Orbitron'] tracking-widest text-white mb-4">
          HARDWARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC5185] to-[#00ffe7]">SCHEMATICS</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs tracking-widest max-w-2xl uppercase">
          Authorized specifications required to run this facility. <br />
          Procurement links established below.
        </p>
      </div>

      {/* SCHEMATIC GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {gear.map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noreferrer" className="group block relative bg-[#050608] border border-white/10 p-1 hover:border-[#00ffe7]/50 transition-colors">

            {/* Blueprint Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,231,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,231,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <div className="relative bg-black/50 p-6 h-full flex flex-col border border-white/5 backdrop-blur-sm">
              {/* Top Bar Data */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                <span className="font-mono text-[10px] text-[#00ffe7] tracking-widest">{item.id}</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 border border-[#00ffe7]/30 bg-[#00ffe7]/10">
                  <div className="w-1.5 h-1.5 bg-[#00ffe7] animate-pulse"></div>
                  <span className="font-mono text-[8px] text-[#00ffe7] tracking-widest uppercase">Online</span>
                </div>
              </div>

              {/* Icon & Title */}
              <div className="flex flex-col items-center text-center mb-8 flex-1">
                <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#FC5185]/50 group-hover:bg-[#FC5185]/10 transition-colors">
                  <item.icon className="w-8 h-8 text-gray-400 group-hover:text-[#FC5185] transition-colors" />
                </div>
                <h3 className="text-xl font-bold font-['Share_Tech_Mono'] mb-2 text-white group-hover:text-[#00ffe7] transition-colors uppercase tracking-tight">{item.name}</h3>
                <p className="font-mono text-[10px] text-gray-500 tracking-widest">{item.spec}</p>
              </div>

              {/* Action Button */}
              <div className="mt-auto border-t border-white/10 pt-4 flex items-center justify-between text-gray-500 group-hover:text-[#00ffe7] transition-colors">
                <Terminal size={14} />
                <span className="font-mono text-[10px] tracking-[0.2em] font-bold">INITIATE_PROCUREMENT</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}