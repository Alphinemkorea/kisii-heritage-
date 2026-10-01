import React from 'react';

export const BrandLogo = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const isSm = size === 'sm';
  const isHero = size === 'hero';

  return (
    <div id="brand-logo-container" className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Visual Emblem Badge - Artistic Flair Monogram */}
      <div
        id="brand-emblem-badge"
        className={`relative flex items-center justify-center rounded-full border border-[#1A1A1A] bg-[#FDFBF7] text-[#1A1A1A] font-serif italic shadow-xs transition-transform hover:scale-105 ${
          isSm ? 'w-9 h-9 text-xs' : isHero ? 'w-16 h-16 text-2xl' : 'w-11 h-11 text-base'
        }`}
      >
        <span className="font-serif font-black tracking-tighter">KH</span>
      </div>

      {/* Brand Typography & Subtitle */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 font-bold hidden sm:inline">
            System Intelligence
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-serif italic tracking-tight font-bold text-[#1A1A1A] leading-tight ${
              isSm ? 'text-base' : isHero ? 'text-3xl' : 'text-xl'
            }`}
          >
            Kisii Heritage
          </span>
          <span className="font-serif not-italic opacity-30 text-sm px-0.5">/</span>
          <span className={`font-serif font-normal text-stone-600 ${isSm ? 'text-xs' : 'text-sm'}`}>
            LifeHub AI
          </span>
        </div>

        {showTagline && (
          <p
            className={`text-stone-500 font-medium tracking-[0.2em] uppercase ${
              isSm ? 'text-[8px]' : 'text-[9px]'
            }`}
          >
            Tabaka Soapstone • Cultural Living • Action Engine
          </p>
        )}
      </div>
    </div>
  );
};
