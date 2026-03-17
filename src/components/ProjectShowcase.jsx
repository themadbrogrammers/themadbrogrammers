import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Database, Binary, Target, BotMessageSquare, Github, ExternalLink, ShieldAlert } from "lucide-react";

const projects = [
  {
    id: "EXP-01",
    status: "STABLE",
    icon: Brain,
    title: "AI Neural Net from Scratch",
    desc: "Built a mini neural network in JS to understand the math behind AI. No libraries, just pure code.",
    tech: ["JavaScript", "Math", "AI", "Numpy"],
    metrics: "Acc: 94.2% // Latency: 12ms",
    link: "#",
    github: "#",
    // Added Tech/Abstract placeholder images
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "EXP-02",
    status: "ACTIVE",
    icon: Cpu,
    title: "Real-Time Sensor Dashboard",
    desc: "Streaming IoT sensor data using WebSockets, node.js, and D3.js visualization.",
    tech: ["WebSockets", "D3.js", "Node.js", "IoT"],
    metrics: "15.2k packets/sec",
    link: "#",
    github: "#",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "EXP-03",
    status: "VOLATILE",
    icon: Binary,
    title: "Quantum Simulation",
    desc: "Exploring quantum entanglement concepts with a Qiskit-powered Python simulator.",
    tech: ["Python", "Qiskit", "Quantum", "Math"],
    metrics: "Qubits: 8 // State: Entangled",
    link: "#",
    github: "#",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "EXP-04",
    status: "LEARNING",
    icon: BotMessageSquare,
    title: "Mech Psychology Decoder",
    desc: "An AI agent trained on YouTube transcripts to provide lab discoveries. Powered by Gemini.",
    tech: ["Gemini AI", "React", "NLP", "API"],
    metrics: "Tokens: 8.5M // Mood: Witty",
    link: "#",
    github: "#",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ProjectShowcase() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto text-white relative">

      {/* SECTION HEADER */}
      <div className="mb-16 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-3 mb-4 text-[#00ffe7] font-mono text-xs tracking-[0.3em] border border-[#00ffe7]/30 px-4 py-1 bg-[#00ffe7]/5">
          <Target className="w-4 h-4 animate-spin-slow" />
          <span>ARCHIVE ACCESS GRANTED</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold font-['Cormorant_Garamond'] tracking-tighter">
          The <span className="text-[#FC5185] italic">Lab</span> Experiments
        </h2>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent mt-6"></div>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="group relative bg-[#050608] border border-white/10 overflow-hidden hover:border-[#00ffe7]/50 transition-colors duration-300 flex flex-col"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20 group-hover:border-[#00ffe7] transition-colors z-20"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20 group-hover:border-[#FC5185] transition-colors z-20"></div>

            {/* 📸 NEW: ENCRYPTED HOLOGRAPHIC IMAGE CONTAINER */}
            <div className="relative w-full h-48 sm:h-64 bg-black border-b border-white/10 overflow-hidden">

              {/* Scanline Overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30"
                style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8) 50%)', backgroundSize: '100% 4px' }}>
              </div>

              {/* Laser Scanner Effect (Activates on Hover) */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#00ffe7] shadow-[0_0_15px_#00ffe7] z-20 opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity duration-300"></div>

              {/* Data Overlays */}
              <div className="absolute bottom-2 right-2 z-20 font-mono text-[9px] text-[#00ffe7] tracking-widest opacity-60">
                IMG_SYS // {project.id}
              </div>

              {/* The Actual Image - Starts grayscale, turns color on hover */}
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 scale-100 group-hover:scale-105"
              />
            </div>

            {/* CONTENT AREA */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col">
              {/* TOP BAR: File ID & Status */}
              <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                <div className="font-mono text-xs text-gray-500 tracking-widest flex items-center gap-2">
                  <project.icon className="w-4 h-4 text-[#FC5185]" />
                  FILE: <span className="text-white">{project.id}</span>
                </div>
                <div className={`font-mono text-[10px] px-2 py-1 tracking-widest border flex items-center gap-2
                  ${project.status === 'VOLATILE' ? 'text-[#FC5185] border-[#FC5185]/30 bg-[#FC5185]/5' :
                    project.status === 'ACTIVE' ? 'text-[#00ffe7] border-[#00ffe7]/30 bg-[#00ffe7]/5' :
                      'text-gray-400 border-gray-600 bg-white/5'}`}>
                  {project.status === 'VOLATILE' && <ShieldAlert className="w-3 h-3 animate-pulse" />}
                  {project.status}
                </div>
              </div>

              {/* TITLE & DESC */}
              <h3 className="text-xl md:text-2xl font-bold mb-3 font-['Share_Tech_Mono'] tracking-tight group-hover:text-[#00ffe7] transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-6 flex-1">
                {project.desc}
              </p>

              {/* Tech Tags - Terminal Style */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, index) => (
                  <span key={index} className="text-[10px] uppercase font-mono tracking-widest text-[#00ffe7] bg-[#00ffe7]/5 border border-[#00ffe7]/20 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer: Metrics & Links */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                <span className="font-mono text-xs text-gray-500 tracking-widest">
                  <span className="text-[#FC5185]">SYS_DATA:</span> {project.metrics}
                </span>

                <div className="flex gap-3">
                  <a href={project.github} className="p-2 border border-white/10 hover:border-[#00ffe7] hover:bg-[#00ffe7]/10 hover:text-[#00ffe7] transition-all bg-black">
                    <Github size={16} />
                  </a>
                  <a href={project.link} className="p-2 border border-white/10 hover:border-[#FC5185] hover:bg-[#FC5185]/10 hover:text-[#FC5185] transition-all bg-black">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}