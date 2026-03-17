import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CyberBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  // Parallax and depth effects
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  return (
    <div ref={ref} className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050608] overflow-hidden">
      {/* THE GRID - Perspective floor effect */}
      <motion.div
        style={{ y: gridY, opacity }}
        className="absolute inset-0 transition-opacity duration-1000"
      >
        <div className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,255,231,0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(0,255,231,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }}
        />
      </motion.div>

      {/* AMBIENT VOLUMETRIC GLOW */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00ffe7] opacity-[0.07] blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FC5185] opacity-[0.07] blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* FLOATING DATA BITS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-[10px] text-[#00ffe7]/20 whitespace-nowrap"
            initial={{ y: "110vh", x: `${Math.random() * 100}%` }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            {Math.random() > 0.5 ? "01011001" : "SYSTEM_INIT_DECODING..."}
          </motion.div>
        ))}
      </div>

      {/* VIGNETTE & SCANLINES */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050608_90%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />
    </div>
  );
}