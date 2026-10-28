import React from 'react';

interface MotifProps {
  className?: string;
  size?: number;
  color?: string;
}

// 1. Auspicious Lord Ganesha Medallion
export const GaneshaMotif: React.FC<MotifProps> = ({ className = "w-16 h-16 text-antique-gold", size = 64 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {/* Outer decorative halo */}
    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6" />
    <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1.2" />
    
    {/* Ganesha Crown / Mukut */}
    <path d="M43 22 L50 14 L57 22 L55 28 L45 28 Z" fill="currentColor" />
    <circle cx="50" cy="18" r="1.5" fill="#FFF" />
    
    {/* Tilak */}
    <path d="M48 29 Q50 25 52 29 L51 35 Q50 36 49 35 Z" fill="#650F1C" />
    <circle cx="50" cy="32" r="1" fill="#FFF" />
    
    {/* Ganesha Face & Trunk */}
    <path
      d="M45 30 C38 30 35 36 35 44 C35 50 39 53 43 54 C46 55 48 58 48 64 C48 70 54 72 56 68 C57 65 54 62 52 61 C49 60 48 56 48 52 C52 52 57 48 57 41 C57 34 52 30 45 30 Z"
      fill="currentColor"
    />
    
    {/* Big Ear Left */}
    <path d="M36 35 C28 35 24 43 27 50 C29 55 35 53 36 47 Z" fill="currentColor" opacity="0.9" />
    
    {/* Big Ear Right */}
    <path d="M56 35 C64 35 68 43 65 50 C63 55 57 53 56 47 Z" fill="currentColor" opacity="0.9" />
    
    {/* Modak in Hand */}
    <circle cx="60" cy="62" r="4" fill="currentColor" />
    <circle cx="60" cy="62" r="2.5" fill="#E6C98A" />
    
    {/* Sacred Swastika / Om Accents */}
    <path d="M44 78 Q50 75 56 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 2. Mangal Kalash (with coconut, mango leaves & swastika)
export const KalashMotif: React.FC<MotifProps> = ({ className = "w-14 h-14 text-antique-gold", size = 56 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {/* Coconut on Top */}
    <ellipse cx="50" cy="24" rx="8" ry="11" fill="currentColor" />
    
    {/* Mango Leaves (Aam Patta) */}
    <path d="M50 26 C42 16 32 20 28 26 C36 29 46 29 50 26 Z" fill="currentColor" opacity="0.85" />
    <path d="M50 26 C58 16 68 20 72 26 C64 29 54 29 50 26 Z" fill="currentColor" opacity="0.85" />
    <path d="M50 26 C46 10 54 10 50 26 Z" fill="currentColor" />
    
    {/* Kalash Neck with Holy Thread (Mauli) */}
    <path d="M38 32 L62 32 L58 39 L42 39 Z" fill="currentColor" />
    <rect x="40" y="34" width="20" height="2" fill="#650F1C" />
    
    {/* Kalash Pot Body */}
    <path
      d="M42 39 C30 46 26 62 34 74 C39 80 61 80 66 74 C74 62 70 46 58 39 Z"
      fill="currentColor"
    />
    
    {/* Swastika Emboss on Pot */}
    <g transform="translate(43, 50) scale(0.65)" stroke="#650F1C" strokeWidth="2.5" strokeLinecap="square" fill="none">
      <path d="M10 0 L10 20 M0 10 L20 10 M10 0 L18 0 M20 10 L20 18 M10 20 L2 20 M0 10 L0 2" />
    </g>
    
    {/* Base Stand */}
    <path d="M38 77 L62 77 L64 82 L36 82 Z" fill="currentColor" />
  </svg>
);

// 3. Sacred Pillar & Toran (Thamb Ropan)
export const ThambMotif: React.FC<MotifProps> = ({ className = "w-14 h-14 text-antique-gold", size = 56 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    {/* Top decorative finial / Kalash */}
    <ellipse cx="50" cy="14" rx="6" ry="8" fill="currentColor" />
    <path d="M40 22 L60 22 L56 26 L44 26 Z" fill="currentColor" />
    {/* Toran Festoon leaves */}
    <path d="M20 26 Q35 34 50 26 Q65 34 80 26" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="35" cy="30" r="2" fill="currentColor" />
    <circle cx="50" cy="26" r="2" fill="currentColor" />
    <circle cx="65" cy="30" r="2" fill="currentColor" />
    {/* Pillars */}
    <rect x="44" y="27" width="12" height="48" rx="2" fill="currentColor" />
    <line x1="50" y1="28" x2="50" y2="74" stroke="#650F1C" strokeWidth="1.5" strokeDasharray="3,3" />
    {/* Carved Pillar Ring Bands */}
    <rect x="42" y="38" width="16" height="3" fill="#650F1C" />
    <rect x="42" y="55" width="16" height="3" fill="#650F1C" />
    {/* Pedestal Base */}
    <path d="M34 75 L66 75 L70 82 L30 82 Z" fill="currentColor" />
    <rect x="25" y="82" width="50" height="4" rx="1" fill="currentColor" />
  </svg>
);

// 4. Mayra Dastoor (Traditional Bandhani / Royal Textile & Chunari)
export const MayraMotif: React.FC<MotifProps> = ({ className = "w-14 h-14 text-antique-gold", size = 56 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    {/* Folded royal chunari cloth / gift platter */}
    <path d="M22 35 C35 25 65 25 78 35 C85 55 85 70 75 78 C55 86 45 86 25 78 C15 70 15 55 22 35 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
    {/* Bandhani Dots Pattern */}
    <circle cx="35" cy="45" r="2" fill="currentColor" />
    <circle cx="50" cy="40" r="2.5" fill="currentColor" />
    <circle cx="65" cy="45" r="2" fill="currentColor" />
    <circle cx="42" cy="55" r="2" fill="currentColor" />
    <circle cx="58" cy="55" r="2" fill="currentColor" />
    <circle cx="50" cy="68" r="2.5" fill="currentColor" />
    {/* Royal Golden Tassels / Gotta Patti Border */}
    <path d="M22 35 Q50 42 78 35" fill="none" stroke="#E6C98A" strokeWidth="3" />
    <path d="M25 78 Q50 82 75 78" fill="none" stroke="#E6C98A" strokeWidth="3" />
    <line x1="26" y1="79" x2="26" y2="87" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="82" x2="50" y2="90" stroke="currentColor" strokeWidth="2" />
    <line x1="74" y1="79" x2="74" y2="87" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// 5. Haldi Dastoor (Turmeric Bowl & Marigold Petals)
export const HaldiMotif: React.FC<MotifProps> = ({ className = "w-14 h-14 text-antique-gold", size = 56 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    {/* Ornate Brass Katori / Bowl */}
    <path d="M24 45 C24 66 40 76 50 76 C60 76 76 66 76 45 Z" fill="currentColor" />
    <ellipse cx="50" cy="45" rx="26" ry="7" fill="#E6C98A" />
    {/* Golden Haldi Paste Mound */}
    <ellipse cx="50" cy="43" rx="19" ry="5" fill="#D8AB4E" />
    <path d="M42 43 Q50 34 58 43 Z" fill="#D8AB4E" />
    {/* Flower Petals floating */}
    <circle cx="36" cy="32" r="3" fill="currentColor" />
    <circle cx="64" cy="30" r="3.5" fill="currentColor" />
    <circle cx="50" cy="24" r="3" fill="currentColor" />
    <circle cx="30" cy="42" r="2.5" fill="currentColor" />
    <circle cx="70" cy="40" r="2.5" fill="currentColor" />
    {/* Base of Bowl */}
    <path d="M42 76 L58 76 L62 82 L38 82 Z" fill="currentColor" />
  </svg>
);

// 6. Mahila Sangeet (Shehnai & Dholak)
export const SangeetMotif: React.FC<MotifProps> = ({ className = "w-14 h-14 text-antique-gold", size = 56 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    {/* Dholak Drum */}
    <ellipse cx="48" cy="58" rx="24" ry="14" transform="rotate(-15 48 58)" fill="currentColor" opacity="0.9" />
    <ellipse cx="28" cy="52" rx="5" ry="12" transform="rotate(-15 28 52)" fill="#340A13" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="68" cy="63" rx="5" ry="12" transform="rotate(-15 68 63)" fill="#340A13" stroke="currentColor" strokeWidth="1.5" />
    {/* Dholak ropes */}
    <path d="M30 45 L66 56 M30 58 L66 69" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
    {/* Royal Shehnai across */}
    <path d="M32 24 L72 36 L76 44 L64 42 L28 26 Z" fill="currentColor" />
    <circle cx="73" cy="41" r="3" fill="#650F1C" />
    <circle cx="44" cy="29" r="1" fill="#FFF" />
    <circle cx="52" cy="31" r="1" fill="#FFF" />
    <circle cx="60" cy="33" r="1" fill="#FFF" />
  </svg>
);

// 7. Nikasi (Royal Rajput Horse & Sword)
export const NikasiMotif: React.FC<MotifProps> = ({ className = "w-14 h-14 text-antique-gold", size = 56 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    {/* Royal Horse Silhouette Head & Neck */}
    <path
      d="M32 75 C30 65 30 55 35 45 C38 40 42 32 40 25 C43 24 47 28 48 30 C52 24 55 24 56 32 C60 38 68 45 70 52 C72 58 68 62 64 62 C58 62 55 56 50 56 C46 64 46 72 44 75 Z"
      fill="currentColor"
    />
    {/* Royal Crown / Kalangi on Horse */}
    <path d="M52 20 Q56 12 60 22 Q54 26 52 20 Z" fill="#E6C98A" />
    {/* Crossed Royal Talwars / Swords below */}
    <path d="M25 80 L75 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M28 76 L28 84 M72 76 L72 84" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="80" r="3" fill="#650F1C" stroke="currentColor" strokeWidth="1" />
  </svg>
);

// 8. Panigrahan Sanskar (Sacred Mandap, Agni Kund & Varmala)
export const PanigrahanMotif: React.FC<MotifProps> = ({ className = "w-14 h-14 text-antique-gold", size = 56 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    {/* Mandap Arch */}
    <path d="M20 78 L20 38 C32 24 68 24 80 38 L80 78" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <path d="M16 38 L84 38" stroke="currentColor" strokeWidth="2" />
    {/* Kalash on Mandap Top */}
    <path d="M46 22 L54 22 L52 26 L48 26 Z" fill="currentColor" />
    <circle cx="50" cy="18" r="4" fill="currentColor" />
    {/* Sacred Agni Kund (Havan) */}
    <path d="M36 68 L64 68 L58 78 L42 78 Z" fill="currentColor" opacity="0.85" />
    {/* Sacred Agni Flames */}
    <path d="M46 66 C42 58 48 52 48 44 C52 50 50 58 56 56 C56 64 50 66 46 66 Z" fill="#D8AB4E" />
    <path d="M50 66 C48 60 52 55 52 50 C54 55 53 60 56 62 Z" fill="#650F1C" />
  </svg>
);

// Traditional Horizontal Royal Divider
export const RoyalDivider: React.FC<{ className?: string; text?: string }> = ({ className = "my-6", text }) => (
  <div className={`flex items-center justify-center space-x-3 ${className}`}>
    <div className="h-[1px] flex-1 max-w-[90px] bg-gradient-to-r from-transparent to-antique-gold/70" />
    <div className="flex items-center space-x-1.5 text-antique-gold">
      <span className="text-[10px]">❖</span>
      {text ? (
        <span className="font-royal text-sm md:text-base tracking-widest px-2 text-antique-gold-light uppercase">
          {text}
        </span>
      ) : (
        <span className="text-base text-antique-gold">❧ ⚜ ☙</span>
      )}
      <span className="text-[10px]">❖</span>
    </div>
    <div className="h-[1px] flex-1 max-w-[90px] bg-gradient-to-l from-transparent to-antique-gold/70" />
  </div>
);

// Jharokha Carved Arch Header Frame
export const JharokhaCrown: React.FC<{ className?: string }> = ({ className = "w-full text-antique-gold" }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <svg viewBox="0 0 300 36" fill="currentColor" className="w-64 max-w-full h-8 opacity-80" aria-hidden="true">
      <path d="M0 36 C50 36 90 28 120 18 C135 12 145 4 150 0 C155 4 165 12 180 18 C210 28 250 36 300 36 L300 32 C250 32 210 24 180 14 C165 8 155 2 150 0 C145 2 135 8 120 14 C90 24 50 32 0 32 Z" />
      <circle cx="150" cy="18" r="4" fill="currentColor" />
      <circle cx="125" cy="24" r="2.5" fill="currentColor" />
      <circle cx="175" cy="24" r="2.5" fill="currentColor" />
    </svg>
  </div>
);

