import React, { useState } from 'react';
import { Eye, Users, Sparkles, Heart, Languages, Check } from 'lucide-react';
import { useVisitorCounter } from '../../hooks/useVisitorCounter';
import { WEDDING_DATA } from '../../data/weddingData';
import { triggerPetalShower } from './PetalShower';
import { KalashMotif } from './OrnateMotif';

interface VisitorCounterProps {
  variant?: 'plaque' | 'pill';
  className?: string;
  onNavigateToLedger?: () => void;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  variant = 'plaque',
  className = '',
  onNavigateToLedger,
}) => {
  const {
    formattedStandard,
    formattedDevanagari,
    isLoading,
    numeralMode,
    toggleNumeralMode,
    blessingCount,
    handleSendBlessing,
    hasBlessed,
  } = useVisitorCounter();

  const [blessingJustSent, setBlessingJustSent] = useState(false);

  const onBlessClick = () => {
    handleSendBlessing();
    triggerPetalShower();
    setBlessingJustSent(true);
    setTimeout(() => {
      setBlessingJustSent(false);
    }, 4500);
  };

  const currentDisplay = numeralMode === 'devanagari' ? formattedDevanagari : formattedStandard;

  // COMPACT PILL VARIANT (Hero / Header placement)
  if (variant === 'pill') {
    return (
      <button
        onClick={onNavigateToLedger}
        title="शुभ आगंतुक पंजिका देखें"
        className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-antique-gold/50 bg-[#25080E]/90 hover:bg-[#340A13] text-antique-gold-lighter text-xs font-hindi transition-all active:scale-95 shadow-md group ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Eye className="w-3.5 h-3.5 text-antique-gold group-hover:scale-110 transition-transform" />
        <span className="font-medium text-sandstone-light">
          शुभ आगंतुक:
        </span>
        <span className="font-royal font-bold text-antique-gold tracking-wide">
          {isLoading ? '...' : currentDisplay}
        </span>
        <span className="text-[10px] text-sandstone/70">अतिथि</span>
      </button>
    );
  }

  // GRAND ROYAL PLAQUE VARIANT (Farewell / Colophon placement)
  return (
    <div
      id="visitor-ledger"
      className={`relative w-full max-w-lg mx-auto my-8 p-5 sm:p-7 rounded-2xl border-2 border-antique-gold/60 bg-gradient-to-b from-[#2B0910] via-[#1F050B] to-[#140206] shadow-[0_4px_30px_rgba(0,0,0,0.7)] text-center overflow-hidden ${className}`}
    >
      {/* Decorative Corner Filigree Highlights */}
      <div className="absolute top-2 left-2 text-antique-gold/40 text-xs pointer-events-none">❖</div>
      <div className="absolute top-2 right-2 text-antique-gold/40 text-xs pointer-events-none">❖</div>
      <div className="absolute bottom-2 left-2 text-antique-gold/40 text-xs pointer-events-none">❖</div>
      <div className="absolute bottom-2 right-2 text-antique-gold/40 text-xs pointer-events-none">❖</div>

      {/* Decorative Kalash Motif */}
      <div className="flex justify-center mb-1">
        <KalashMotif size={36} className="text-antique-gold/80" />
      </div>

      {/* Royal Header */}
      <div className="space-y-1 mb-4">
        <span className="inline-block px-3 py-0.5 rounded-full border border-antique-gold/30 bg-black/40 text-[10px] sm:text-xs font-royal text-antique-gold-lighter uppercase tracking-widest">
          {WEDDING_DATA.visitorCounter?.titleHindi || 'शुभ आगंतुक पंजिका'}
        </span>
        <h4 className="font-royal text-base sm:text-lg text-[#FFF4D0] font-bold tracking-wide">
          {WEDDING_DATA.visitorCounter?.subtitleHindi || 'शाही विवाह आमंत्रण दर्शनार्थी संख्या'}
        </h4>
        <p className="font-hindi text-xs text-sandstone/80 max-w-sm mx-auto leading-relaxed">
          {WEDDING_DATA.visitorCounter?.descriptionHindi ||
            'इस पावन मांगलिक अवसर पर अब तक पधारे एवं पत्रिका का दर्शन करने वाले आदरणीय अतिथियों की संख्या।'}
        </p>
      </div>

      {/* Main Counter Display Box */}
      <div className="relative my-4 p-4 rounded-xl border border-antique-gold/40 bg-gradient-to-r from-black/60 via-[#1A0408]/80 to-black/60 backdrop-blur-sm shadow-inner">
        {/* Live indicator dot */}
        <div className="flex items-center justify-between text-[11px] text-sandstone/70 mb-2 px-1">
          <div className="flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-hindi text-emerald-400 font-medium">लाइव उपस्थिति</span>
          </div>

          {/* Numeral Mode Switcher (Devanagari / English) */}
          <button
            onClick={toggleNumeralMode}
            className="flex items-center space-x-1 px-2 py-0.5 rounded-full border border-antique-gold/30 bg-white/5 hover:bg-white/10 text-antique-gold text-[10px] font-hindi transition-colors active:scale-95"
            title="अंक स्वरूप बदलें"
          >
            <Languages className="w-2.5 h-2.5" />
            <span>{numeralMode === 'devanagari' ? 'English अंक' : 'देवनागरी अंक'}</span>
          </button>
        </div>

        {/* Large Counter Numbers */}
        <div className="py-2 flex items-center justify-center space-x-3">
          <Users className="w-6 h-6 text-antique-gold/70" />
          <span className="font-royal text-4xl sm:text-5xl font-extrabold text-[#FFF4D0] tracking-wider drop-shadow-[0_2px_12px_rgba(230,201,138,0.45)]">
            {isLoading ? '...' : currentDisplay}
          </span>
        </div>

        {/* Caption */}
        <p className="text-xs font-hindi text-sandstone-light mt-1 font-medium">
          विशिष्ट सम्मानीय अतिथि दर्शन
        </p>
      </div>

      {/* Digital Blessing Action Button */}
      <div className="mt-4 pt-3 border-t border-antique-gold/20 flex flex-col items-center space-y-2">
        <button
          onClick={onBlessClick}
          className="w-full max-w-xs flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full border-2 border-antique-gold bg-gradient-to-r from-royal-maroon via-royal-maroon-light to-royal-maroon text-[#FFF4D0] text-xs sm:text-sm font-hindi font-semibold hover:brightness-110 active:scale-95 transition-all shadow-md group"
        >
          {hasBlessed ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Heart className="w-4 h-4 text-rose-300 group-hover:scale-125 transition-transform" />
          )}
          <span>वर-वधू को शुभाशीर्वाद अर्पित करें</span>
          <Sparkles className="w-3.5 h-3.5 text-antique-gold" />
        </button>

        {/* Blessing Toast / Confirmation */}
        {blessingJustSent && (
          <div className="animate-fade-in text-xs font-hindi text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 rounded-lg py-1.5 px-3 max-w-xs">
            🌸 पधारो सा! आपका शुभाशीर्वाद वर-वधू तक पहुँचा।
          </div>
        )}

        {blessingCount > 0 && !blessingJustSent && (
          <p className="text-[11px] font-hindi text-sandstone/60">
            आपके द्वारा {blessingCount} बार शुभाशीर्वाद पुष्प अर्पित किए गए।
          </p>
        )}
      </div>
    </div>
  );
};
