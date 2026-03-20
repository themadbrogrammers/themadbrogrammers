import { useEffect, useState, useRef } from 'react';
import { Github, Youtube, Instagram } from 'lucide-react';

const FloatingSocials = ({ footerRef, isGlitched }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isIdle, setIsIdle] = useState(false);

  const containerRef = useRef(null);
  const iconsRef = useRef([]);

  const mouse = useRef({ x: 0, y: 0 });
  const lastMove = useRef(Date.now());

  // 🧠 Hide on footer
  useEffect(() => {
    if (!footerRef?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [footerRef]);

  // 🧠 Mouse tracking + idle detection
  useEffect(() => {
    const handleMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      lastMove.current = Date.now();
      setIsIdle(false);
    };

    window.addEventListener('mousemove', handleMove);
    const idleInterval = setInterval(() => {
      if (Date.now() - lastMove.current > 2000) {
        setIsIdle(true);
      }
    }, 500);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      clearInterval(idleInterval);
    };
  }, []);

  // 🧲 Physics loop
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      iconsRef.current.forEach((el, i) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const dx = mouse.current.x - (rect.left + rect.width / 2);
        const dy = mouse.current.y - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 🧠 Proximity effect
        const strength = Math.max(0, 1 - distance / 150); // Tightened the radius
        const moveX = dx * 0.1 * strength;
        const moveY = dy * 0.1 * strength;

        // 💤 Idle floating
        const idleOffset = isIdle ? Math.sin(Date.now() * 0.002 + i) * 4 : 0;

        // ⚡ Lerp smoothing
        const current = el.style.transform.match(/-?\d+\.?\d*/g) || [0, 0];
        const lerp = (a, b, n) => a + (b - a) * n;

        const x = lerp(parseFloat(current[0]) || 0, moveX, 0.1);
        const y = lerp(parseFloat(current[1]) || 0, moveY + idleOffset, 0.1);

        el.style.transform = `translate(${x}px, ${y}px) scale(${1 + strength * 0.1})`;

        // Glow on hover
        el.style.boxShadow = strength > 0.1
          ? `0 0 ${15 + strength * 20}px rgba(0,255,231,${0.2 + strength})`
          : 'none';
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isIdle]);

  const socials = [
    { icon: Github, label: 'GH_NODE' },
    { icon: Youtube, label: 'YT_FEED' },
    { icon: Instagram, label: 'IG_LOGS' },
  ];

  return (
    <div
      ref={containerRef}
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
        } ${isGlitched ? 'animate-shake scale-95 blur-[2px]' : ''}`}
    >
      {socials.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className="flex flex-col items-center">
            {/* The Node */}
            <div className="relative group">
              {/* Tooltip */}
              <div className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 pointer-events-none">
                <div className="bg-[#050608] border border-[#00ffe7]/50 px-3 py-1 font-mono text-[10px] text-[#00ffe7] tracking-widest whitespace-nowrap shadow-[0_0_10px_rgba(0,255,231,0.2)]">
                  {item.label}
                </div>
              </div>

              {/* Icon Box */}
              <a
                href="#"
                ref={(el) => (iconsRef.current[i] = el)}
                className="w-12 h-12 flex items-center justify-center bg-[#0a0c10] border border-white/10 hover:border-[#00ffe7] hover:bg-[#00ffe7]/10 transition-colors duration-300 relative z-10"
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/50 group-hover:border-[#00ffe7]"></div>
                <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/50 group-hover:border-[#00ffe7]"></div>

                <Icon className="w-5 h-5 text-gray-500 group-hover:text-[#00ffe7] transition-colors" />
              </a>
            </div>

            {/* Circuit Connecting Line (don't render after the last item) */}
            {i !== socials.length - 1 && (
              <div className="w-px h-6 bg-gradient-to-b from-white/20 via-[#00ffe7]/50 to-white/20 my-1"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingSocials;