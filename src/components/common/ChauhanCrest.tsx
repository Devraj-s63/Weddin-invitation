import React from 'react';

interface ChauhanCrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCaption?: boolean;
}

export const ChauhanCrest: React.FC<ChauhanCrestProps> = ({
  className = '',
  size = 'md',
  showCaption = true
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48',
    xl: 'w-60 h-60'
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Decorative Ornate Medallion Frame */}
      <div className="relative p-2 rounded-full border border-antique-gold/40 shadow-royal-glow bg-gradient-to-b from-royal-maroon-deep/90 via-royal-maroon/80 to-charcoal-dark/95 backdrop-blur-sm">
        {/* Subtle spinning golden ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-antique-gold/30 animate-[spin_60s_linear_infinite]" />
        
        {/* Emblem Image with Screen blend mode */}
        <div className={`relative overflow-hidden rounded-full flex items-center justify-center bg-black/60 ${sizeClasses}`}>
          <img
            src="/images/chauhan-crest.jpg"
            alt="शाही चौहान राजवंश राजचिह्न - चहुदिशाण चक्रवर्ती चवहाण"
            className="w-full h-full object-contain filter contrast-125 brightness-110 mix-blend-screen transition-transform duration-700 hover:scale-105"
            loading="eager"
          />
        </div>
      </div>

      {showCaption && (
        <div className="mt-3">
          <p className="font-royal text-sm md:text-base tracking-widest text-antique-gold font-semibold uppercase">
            चहुदिशाण चक्रवर्ती चवहाण
          </p>
          <p className="text-xs text-sandstone/80 tracking-wider font-hindi mt-0.5">
            माँ कुलदेवी आशापुरा सहाय विच्छय
          </p>
        </div>
      )}
    </div>
  );
};

