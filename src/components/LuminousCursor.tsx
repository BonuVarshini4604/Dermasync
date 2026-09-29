import React, { useEffect, useState } from 'react';

export const LuminousCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: 0,
        top: 0
      }}
    >
      {/* Outer ambient apricot & pearl glow */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-all duration-300 ease-out ${
          isHovered
            ? 'w-24 h-24 bg-gradient-to-tr from-[#FFD5B9]/60 via-[#FFDBDB]/70 to-[#D49B86]/40 scale-125'
            : 'w-14 h-14 bg-gradient-to-tr from-[#FFD5B9]/35 via-[#FFDBDB]/40 to-transparent'
        }`}
      />

      {/* Inner tactile nectar chrome core */}
      <div
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out ${
          isHovered
            ? 'w-7 h-7 bg-white/40 border-[#D49B86]/80 shadow-[0_0_15px_rgba(212,155,134,0.6)] backdrop-blur-sm'
            : 'w-2.5 h-2.5 bg-[#D49B86]/80 border-white/80 shadow-[0_0_8px_rgba(212,155,134,0.4)]'
        }`}
      />
    </div>
  );
};
