import React from 'react';

interface RoyalBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'parchment' | 'maroon' | 'gold-outline';
  padding?: string;
}

export const RoyalBorder: React.FC<RoyalBorderProps> = ({
  children,
  className = '',
  variant = 'parchment',
  padding = 'p-6 md:p-8'
}) => {
  const bgStyles = {
    parchment: 'bg-ivory-card text-charcoal shadow-card-3d border-2 border-antique-gold/60',
    maroon: 'bg-gradient-to-b from-royal-maroon-deep via-royal-maroon to-charcoal text-ivory shadow-card-3d border-2 border-antique-gold/60',
    'gold-outline': 'bg-charcoal/70 backdrop-blur-md text-ivory border-2 border-antique-gold/50 shadow-royal-glow'
  }[variant];

  const innerLineColor = variant === 'parchment' ? 'border-royal-maroon/25' : 'border-antique-gold/30';
  const cornerColor = variant === 'parchment' ? 'text-royal-maroon' : 'text-antique-gold';

  return (
    <div className={`relative rounded-xl overflow-hidden ${bgStyles} ${className}`}>
      {/* Outer corner ornaments */}
      <div className={`absolute top-2 left-2 ${cornerColor} select-none pointer-events-none text-xs md:text-sm leading-none`}>
        ╔❖
      </div>
      <div className={`absolute top-2 right-2 ${cornerColor} select-none pointer-events-none text-xs md:text-sm leading-none`}>
        ❖╗
      </div>
      <div className={`absolute bottom-2 left-2 ${cornerColor} select-none pointer-events-none text-xs md:text-sm leading-none`}>
        ╚❖
      </div>
      <div className={`absolute bottom-2 right-2 ${cornerColor} select-none pointer-events-none text-xs md:text-sm leading-none`}>
        ❖╝
      </div>

      {/* Decorative inner hairline border */}
      <div className={`absolute inset-3 rounded-lg border ${innerLineColor} pointer-events-none`} />

      {/* Actual Content Container */}
      <div className={`relative z-10 ${padding}`}>
        {children}
      </div>
    </div>
  );
};

