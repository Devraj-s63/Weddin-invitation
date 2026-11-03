import React from 'react';

// 1. Suryavanshi Sun Shield Motif (Authentic Rajputana Sun Crest)
export const SuryavanshiSunShield: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 40 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    {/* Shield Outer Gold Rim */}
    <path
      d="M20 2C27 2 37 4 37 12C37 28 26 38 20 42C14 38 3 28 3 12C3 4 13 2 20 2Z"
      fill="#4A0A14"
      stroke="#D4AF37"
      strokeWidth="2"
    />
    {/* Inner Gold Inset Line */}
    <path
      d="M20 5C25.5 5 34 6.8 34 13C34 26.5 24.5 35.5 20 39C15.5 35.5 6 26.5 6 13C6 6.8 14.5 5 20 5Z"
      stroke="#F3E5AB"
      strokeWidth="1"
      strokeOpacity="0.65"
    />
    {/* Radiant Central Suryavanshi Sun */}
    <circle cx="20" cy="20" r="5" fill="#FCE8B2" stroke="#D4AF37" strokeWidth="1" />
    {/* 12 Radiant Sun Rays */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const rInner = 6.2;
      const rOuter = i % 2 === 0 ? 9.8 : 8.2;
      return (
        <line
          key={i}
          x1={20 + rInner * Math.cos(rad)}
          y1={20 + rInner * Math.sin(rad)}
          x2={20 + rOuter * Math.cos(rad)}
          y2={20 + rOuter * Math.sin(rad)}
          stroke="#FCE8B2"
          strokeWidth={i % 2 === 0 ? "1.6" : "1.1"}
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

// 2. Palace Jharokha Archway Frame (Frames the top of parchment pages)
export const PalaceTopArch: React.FC<{ className?: string }> = ({ className = "w-full" }) => (
  <div className={`relative w-full flex flex-col items-center pointer-events-none select-none ${className}`}>
    {/* Top Sandstone Carved Arch Curve SVG */}
    <svg
      viewBox="0 0 500 70"
      preserveAspectRatio="none"
      className="w-full h-11 sm:h-14 text-[#C9A364] drop-shadow-xs"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sandstoneGrad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#DFC398" />
          <stop offset="45%" stopColor="#C8A56E" />
          <stop offset="100%" stopColor="#B38D53" />
        </linearGradient>
        <radialGradient id="goldFloralGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6321" />
        </radialGradient>
      </defs>

      {/* Mewari Multi-Cusped Arch Outer Wall */}
      <path
        d="M0 0 H500 V34 C440 34 400 38 360 48 C330 55 305 66 275 66 C262 66 256 60 250 56 C244 60 238 66 225 66 C195 66 170 55 140 48 C100 38 60 34 0 34 Z"
        fill="url(#sandstoneGrad)"
        opacity="0.95"
      />

      {/* Scalloped Cusps Inner Border */}
      <path
        d="M0 28 C60 28 100 32 140 42 C170 49 195 60 225 60 C238 60 244 54 250 50 C256 54 262 60 275 60 C305 60 330 49 360 42 C400 32 440 28 500 28"
        fill="none"
        stroke="#5B0D1B"
        strokeWidth="1.8"
        strokeOpacity="0.45"
      />

      {/* Second Hairline Gold Trim */}
      <path
        d="M0 31 C60 31 100 35 140 45 C170 52 195 63 225 63 C238 63 244 57 250 53 C256 57 262 63 275 63 C305 63 330 52 360 45 C400 35 440 31 500 31"
        fill="none"
        stroke="#FFF2D6"
        strokeWidth="1"
        strokeOpacity="0.8"
      />

      {/* Center Golden Floral Finial / Crest */}
      <g transform="translate(250, 48)">
        {/* Central Crown Petals */}
        <path
          d="M0 -34 C-4 -26 -12 -22 -14 -14 C-14 -6 -6 -2 0 0 C6 -2 14 -6 14 -14 C12 -22 4 -26 0 -34 Z"
          fill="url(#goldFloralGlow)"
          stroke="#4A0A14"
          strokeWidth="0.8"
        />
        {/* Left Side Flourish Leaf */}
        <path
          d="M-4 -14 C-10 -20 -20 -20 -24 -12 C-26 -4 -16 2 -6 -2 Z"
          fill="url(#goldFloralGlow)"
          stroke="#4A0A14"
          strokeWidth="0.6"
        />
        {/* Right Side Flourish Leaf */}
        <path
          d="M4 -14 C10 -20 20 -20 24 -12 C26 -4 16 2 6 -2 Z"
          fill="url(#goldFloralGlow)"
          stroke="#4A0A14"
          strokeWidth="0.6"
        />
        {/* Center Pearl */}
        <circle cx="0" cy="-14" r="3" fill="#FFF8E7" stroke="#8C6321" strokeWidth="0.8" />
        <circle cx="-10" cy="-6" r="1.5" fill="#FFF8E7" />
        <circle cx="10" cy="-6" r="1.5" fill="#FFF8E7" />
      </g>
    </svg>
  </div>
);

// 3. Heraldic Panel Component (Matches exact User Reference Layout)
export interface HeraldicRow {
  label: string;
  value: React.ReactNode;
  subvalue?: string;
  highlight?: boolean;
}

interface HeraldicPanelProps {
  sideTitle: React.ReactNode;
  badge?: string;
  rows: HeraldicRow[];
  className?: string;
  badgeVariant?: 'maroon' | 'gold';
}

export const HeraldicPanel: React.FC<HeraldicPanelProps> = ({
  sideTitle,
  badge,
  rows,
  className = "",
  badgeVariant = 'maroon',
}) => {
  return (
    <div
      className={`rounded-xl border border-[#C7A15A]/70 bg-gradient-to-b from-[#FFFDF8] via-[#FAF4EA] to-[#F5EAD7] shadow-[0_4px_14px_rgba(91,13,27,0.09)] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Royal Maroon Ribbon Header */}
      <div className="bg-gradient-to-r from-[#4A0A14] via-[#660C1D] to-[#4A0A14] text-[#F9EFCF] px-3.5 py-1.5 border-b border-[#C7A15A]/80 flex items-center justify-between">
        <div className="flex items-center space-x-2 min-w-0">
          <SuryavanshiSunShield className="w-4 h-4 sm:w-5 sm:h-5 text-antique-gold shrink-0 drop-shadow-xs" />
          <span className="font-royal text-xs sm:text-[13px] font-bold tracking-wider text-[#FFF4D4] truncate">
            {sideTitle}
          </span>
        </div>

        {badge && (
          <div className="flex items-center space-x-1.5 shrink-0 ml-2">
            <span className="text-[#F9EFCF]/40 text-xs hidden sm:inline">|</span>
            <span
              className={`text-[10px] sm:text-[11px] font-royal font-semibold tracking-wider px-2.5 py-0.5 rounded-full border shadow-xs ${
                badgeVariant === 'gold'
                  ? 'bg-gradient-to-r from-[#C7A15A] to-[#855E24] text-[#180306] border-[#FFE9B8] font-bold'
                  : 'bg-[#30050B] text-[#F9EFCF] border-[#C7A15A]/60'
              }`}
            >
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* 3-Column Colon Aligned Grid Body */}
      <div className="p-3 text-xs font-hindi space-y-1 relative text-[#2D2D2D]">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[68px_14px_1fr] sm:grid-cols-[82px_18px_1fr] items-baseline py-1 leading-relaxed ${
              idx !== rows.length - 1 ? 'border-b border-[#C7A15A]/25' : ''
            }`}
          >
            {/* Column 1: Label */}
            <span className="font-bold text-[#5B0D1B] whitespace-nowrap text-left">
              {row.label}
            </span>

            {/* Column 2: Colon */}
            <span className="font-bold text-[#855E24] text-center select-none">
              :
            </span>

            {/* Column 3: Value */}
            <div className="text-left text-[#1A1A1A] break-words">
              <span className={row.highlight ? "font-bold text-[#5B0D1B]" : "font-semibold text-[#252525]"}>
                {row.value}
              </span>
              {row.subvalue && (
                <span className="block text-[10px] text-[#666] font-normal mt-0.5">
                  {row.subvalue}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Delicate Golden Corner Filigrees */}
        <span className="absolute bottom-1 left-1.5 text-[10px] text-[#C7A15A]/45 select-none pointer-events-none">
          ❧
        </span>
        <span className="absolute bottom-1 right-1.5 text-[10px] text-[#C7A15A]/45 select-none pointer-events-none">
          ☙
        </span>
      </div>
    </div>
  );
};

// 4. Fort & Bougainvillea Page Footer (Anchors the bottom of every parchment book page)
export const FortBougainvilleaFooter: React.FC<{ pageNumberText: string }> = ({ pageNumberText }) => {
  return (
    <div className="relative w-full mt-auto pt-1 pointer-events-none select-none flex flex-col items-center">
      {/* Centered Page Number */}
      <div className="relative z-10 text-[11px] font-hindi text-[#5B0D1B]/80 font-medium mb-1 drop-shadow-xs">
        {pageNumberText}
      </div>

      {/* Sandstone Fortress & Blooming Bougainvillea Watermark Artwork */}
      <div className="relative w-full h-14 sm:h-16 overflow-hidden">
        <img
          src="/images/fort-bougainvillea-footer.png"
          alt="Rajputana Fort & Bougainvillea"
          className="w-full h-full object-cover object-bottom opacity-90"
        />
        {/* Soft bottom vignette into page */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#B38D53]/20 to-transparent" />
      </div>
    </div>
  );
};

