import { useState } from 'react';
import { History, ShieldAlert } from 'lucide-react';

const TimePortal = ({ triggerGlobalGlitch }) => {
  const [isActivating, setIsActivating] = useState(false);

  const handleTravel = () => {
    setIsActivating(true);

    // Trigger the app-wide shake/chaos
    if (triggerGlobalGlitch) triggerGlobalGlitch();

    // Delay for cinematic effect before sending them to the old site
    setTimeout(() => {
      window.location.href = 'https://themadbrogrammers.web.app/';
    }, 1200);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 group flex items-center gap-4">

      {/* 🌀 Core Button Container */}
      <div className="relative">
        {/* Spinning Danger Border */}
        <div className={`absolute -inset-2 rounded-full border border-dashed transition-all duration-1000 ${isActivating
            ? 'border-[#FC5185] animate-[spin_1s_linear_infinite] scale-125 opacity-100'
            : 'border-[#00ffe7]/30 animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100'
          }`}></div>

        {/* Ambient Glow */}
        <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${isActivating ? 'bg-[#FC5185] opacity-80 scale-150' : 'bg-[#00ffe7] opacity-20 group-hover:opacity-40'
          }`}></div>

        {/* The Physical Switch */}
        <button
          onClick={handleTravel}
          disabled={isActivating}
          className={`relative w-14 h-14 flex items-center justify-center bg-[#050608] border transition-all duration-300 z-10 ${isActivating
              ? 'border-[#FC5185] scale-90'
              : 'border-white/20 group-hover:border-[#00ffe7] group-hover:bg-[#00ffe7]/10'
            }`}
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} // Hexagon shape
        >
          {isActivating ? (
            <ShieldAlert className="w-6 h-6 text-[#FC5185] animate-pulse" />
          ) : (
            <History className="w-6 h-6 text-gray-400 group-hover:text-[#00ffe7] transition-colors" />
          )}
        </button>
      </div>

      {/* 🧠 HUD Tooltip */}
      <div className={`overflow-hidden transition-all duration-300 ${isActivating ? 'w-48 opacity-100' : 'w-0 opacity-0 group-hover:w-48 group-hover:opacity-100'}`}>
        <div className="bg-[#050608]/90 backdrop-blur-sm border-l-2 border-[#FC5185] pl-3 py-1">
          <p className={`font-mono text-[10px] font-bold tracking-widest ${isActivating ? 'text-[#FC5185] animate-pulse' : 'text-[#00ffe7]'}`}>
            {isActivating ? 'WARNING: REVERTING...' : 'LEGACY_OVERRIDE'}
          </p>
          <p className="font-mono text-[8px] text-gray-500 tracking-wider">
            {isActivating ? 'INITIATING TIME JUMP' : 'ACCESS ARCHIVED BUILD'}
          </p>
        </div>
      </div>

    </div>
  );
};

export default TimePortal;