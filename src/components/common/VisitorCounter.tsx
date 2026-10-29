import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useVisitorCounter } from '../../hooks/useVisitorCounter';
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
    sendBlessing,
  } = useVisitorCounter();

  const [blessingSent, setBlessingSent] = useState(false);

  const handleBlessingClick = () => {
    sendBlessing();
    triggerPetalShower();
    setBlessingSent(true);
    setTimeout(() => {
      setBlessingSent(false);
    }, 4000);
  };

  // COMPACT HERO PILL (Refined, minimal, luxury badge)
  if (variant === 'pill') {
    return (
      <button
        onClick={onNavigateToLedger}
        title="शाही अतिथि दर्शन पंजिका देखें"
        className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-antique-gold/40 bg-gradient-to-r from-[#2B080F]/90 via-[#3D0A15]/90 to-[#2B080F]/90 hover:border-antique-gold text-antique-gold-lighter text-xs font-hindi transition-all active:scale-95 shadow-md group ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#E6C98A] animate-pulse" />
        <span className="text-sandstone-light font-medium">कुल दर्शनार्थी:</span>
        <span className="font-royal font-bold text-[#FFF4D0] tracking-wider text-sm">
          {isLoading ? '...' : formattedStandard}
        </span>
        <span className="text-[11px] text-antique-gold/80 font-royal">
          ({isLoading ? '...' : formattedDevanagari})
        </span>
        <span className="text-[10px] text-sandstone/60">अतिथि</span>
      </button>
    );
  }

  // ROYAL COURT GUEST REGISTER PLAQUE (Scene 8 Farewell)
  return (
    <div
      id="visitor-ledger"
      className={`relative w-full max-w-md mx-auto my-8 p-6 rounded-2xl border border-antique-gold/50 bg-gradient-to-b from-[#25060D] via-[#1A0308] to-[#100104] shadow-[0_10px_35px_rgba(0,0,0,0.8)] text-center overflow-hidden ${className}`}
    >
      {/* Corner ornamental accents */}
      <div className="absolute top-2.5 left-3 text-antique-gold/40 text-[10px] select-none">❖</div>
      <div className="absolute top-2.5 right-3 text-antique-gold/40 text-[10px] select-none">❖</div>
      <div className="absolute bottom-2.5 left-3 text-antique-gold/40 text-[10px] select-none">❖</div>
      <div className="absolute bottom-2.5 right-3 text-antique-gold/40 text-[10px] select-none">❖</div>

      {/* Auspicious Kalash motif */}
      <div className="flex justify-center mb-2">
        <KalashMotif size={34} className="text-antique-gold" />
      </div>

      {/* Sanskrit Invocation */}
      <p className="font-royal text-[11px] text-antique-gold-light tracking-widest uppercase mb-1">
        ॥ अतिथि देवो भवः ॥
      </p>

      {/* Heading */}
      <h4 className="font-royal text-base sm:text-lg text-[#FFF4D0] font-bold tracking-wide">
        शाही अतिथि दर्शन पंजिका
      </h4>

      <p className="font-hindi text-xs text-sandstone/80 max-w-xs mx-auto mt-1 leading-relaxed">
        इस शाही विवाह पत्रिका का दर्शन करने वाले कुल सम्मानीय अतिथि
      </p>

      {/* Real Counter Number Display */}
      <div className="my-5 py-3 px-4 rounded-xl border border-antique-gold/30 bg-black/40 backdrop-blur-sm max-w-[260px] mx-auto shadow-inner">
        <div className="flex items-baseline justify-center space-x-2">
          <span className="font-royal text-4xl sm:text-5xl font-extrabold text-[#FFF4D0] tracking-wider drop-shadow-[0_2px_10px_rgba(230,201,138,0.5)]">
            {isLoading ? '...' : formattedStandard}
          </span>
          <span className="font-royal text-xl sm:text-2xl text-antique-gold font-bold">
            ({isLoading ? '...' : formattedDevanagari})
          </span>
        </div>

        <div className="flex items-center justify-center space-x-1.5 mt-2 text-[10px] text-sandstone/70">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-hindi text-emerald-300 font-medium">लाइव वास्तविक गणना</span>
        </div>
      </div>

      {/* Auspicious Blessing Button */}
      <div className="pt-2 flex flex-col items-center">
        <button
          onClick={handleBlessingClick}
          className="w-full max-w-[260px] flex items-center justify-center space-x-2 py-2 px-4 rounded-full border border-antique-gold/60 bg-gradient-to-r from-[#5A0F1D] via-[#781527] to-[#5A0F1D] text-[#FFF4D0] text-xs font-hindi font-medium hover:border-antique-gold hover:brightness-110 active:scale-95 transition-all shadow-md group"
        >
          <Heart className="w-3.5 h-3.5 text-rose-300 group-hover:scale-125 transition-transform" />
          <span>वर-वधू को मंगल आशीर्वाद दें</span>
          <Sparkles className="w-3 h-3 text-antique-gold" />
        </button>

        {blessingSent && (
          <p className="animate-fade-in text-[11px] font-hindi text-emerald-300 mt-2 bg-emerald-950/60 border border-emerald-500/30 rounded-full px-3 py-0.5">
            🌸 पधारो सा! आपका मंगल शुभाशीर्वाद वर-वधू तक पहुँचा।
          </p>
        )}
      </div>
    </div>
  );
};
