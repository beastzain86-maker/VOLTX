import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  light = true,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Original Geometric SVG Mark */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(34,156,50,0.35)]"
        >
          {/* Outer faceted tech hexagon */}
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            fill="#18191D"
            stroke="#25272B"
            strokeWidth="2"
          />
          {/* Inner futuristic angled V */}
          <path
            d="M11 12L20 28L29 12H24.5L20 20.5L15.5 12H11Z"
            fill="#FFFFFF"
          />
          {/* Neon energy core dot and green accent */}
          <circle cx="20" cy="11" r="2.5" fill="#229C32" />
          <path
            d="M17 22.5L20 28L23 22.5"
            stroke="#229C32"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-bold tracking-tight leading-none">
          <span
            className={`font-['Space_Grotesk'] tracking-wider ${textSizes[size]} ${
              light ? 'text-white' : 'text-[#101114]'
            }`}
          >
            VOLTX
          </span>
          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-widest bg-[#229C32] text-white">
            GEAR
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-medium tracking-widest text-[#777777] uppercase mt-0.5">
            Engineered Gadgets
          </span>
        )}
      </div>
    </div>
  );
};
