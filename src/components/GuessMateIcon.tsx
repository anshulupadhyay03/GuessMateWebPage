import React from 'react';

interface GuessMachaIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

export const GuessMachaIcon: React.FC<GuessMachaIconProps> = ({
  size = 'md',
  className = '',
}) => {
  const dimensions = {
    xs: { box: 'w-6 h-6', rounded: 'rounded-lg' },
    sm: { box: 'w-8 h-8', rounded: 'rounded-xl' },
    md: { box: 'w-10 h-10', rounded: 'rounded-xl' },
    lg: { box: 'w-14 h-14', rounded: 'rounded-2xl' },
    xl: { box: 'w-20 h-20', rounded: 'rounded-3xl' },
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Container - Deep Tertiary Navy with primary crisp border */}
      <div className={`relative ${dimensions.box} ${dimensions.rounded} bg-[#003A5D] border border-[#CA4D4E]/60 p-2 shadow-md flex items-center justify-center overflow-hidden transition-all duration-200 hover:border-[#CA4D4E]`}>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#E8E61A_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />

        {/* Crisp Strategy Vector Graphic (Clean Interlocking Strategy Node + G) */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            <linearGradient id="gm-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CA4D4E" />
              <stop offset="100%" stopColor="#e26162" />
            </linearGradient>
            <linearGradient id="gm-secondary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8E61A" />
              <stop offset="100%" stopColor="#f3f15c" />
            </linearGradient>
          </defs>

          {/* Strategy Network Nodes */}
          <path
            d="M10 20 L20 10 L30 20 L20 30 Z"
            stroke="url(#gm-primary-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="3" fill="#E8E61A" />
          <line x1="20" y1="10" x2="20" y2="30" stroke="url(#gm-secondary-grad)" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="10" cy="20" r="2" fill="#FFFFFF" />
          <circle cx="30" cy="20" r="2" fill="#FFFFFF" />
          <circle cx="20" cy="10" r="2" fill="#CA4D4E" />
          <circle cx="20" cy="30" r="2" fill="#E8E61A" />
        </svg>
      </div>
    </div>
  );
};

export const GuessMateIcon = GuessMachaIcon;

