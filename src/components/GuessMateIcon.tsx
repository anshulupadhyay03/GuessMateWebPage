import React from 'react';

interface SiftMatesIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showGlow?: boolean;
}

export const SiftMatesIcon: React.FC<SiftMatesIconProps> = ({
  size = 'md',
  className = '',
  showGlow = false,
}) => {
  const sizeMap = {
    xs: { box: 'w-6 h-6', img: 'w-6 h-6' },
    sm: { box: 'w-8 h-8', img: 'w-8 h-8' },
    md: { box: 'w-10 h-10', img: 'w-10 h-10' },
    lg: { box: 'w-14 h-14', img: 'w-14 h-14' },
    xl: { box: 'w-20 h-20', img: 'w-20 h-20' },
    '2xl': { box: 'w-28 h-28', img: 'w-28 h-28' },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none group/icon ${sizeMap.box} ${className}`}
      style={{ imageRendering: '-webkit-optimize-contrast' }}
    >
      {/* Ambient subtle cyan & gold back-glow matching emblem sides */}
      <div
        className={`absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400/30 via-transparent to-[#E8E61A]/30 blur-sm pointer-events-none transition-opacity duration-300 ${
          showGlow ? 'opacity-100' : 'opacity-70 group-hover/icon:opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* Circle App Icon */}
      <img
        src="/assets/aistudio/app_icons_circle_5ece24c2.png"
        alt="SiftMates Emblem"
        className={`${sizeMap.img} rounded-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-transform duration-200 group-hover/icon:scale-105`}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  );
};

export const GuessMachaIcon = SiftMatesIcon;
export const GuessMateIcon = SiftMatesIcon;



