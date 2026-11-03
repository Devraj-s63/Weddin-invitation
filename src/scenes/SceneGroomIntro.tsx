import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, SkipForward } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { JharokhaCrown } from '../components/common/OrnateMotif';

interface SceneGroomIntroProps {
  onNext: () => void;
  onSkip: () => void;
}

export const SceneGroomIntro: React.FC<SceneGroomIntroProps> = ({ onNext, onSkip }) => {
  const { data, language } = useLanguage();
  const [progress, setProgress] = useState(0);

  // Auto-advance after 5 seconds
  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onNext();
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onNext]);

  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-between px-3 pt-14 pb-4 overflow-hidden bg-gradient-to-b from-[#1C060A] via-[#350A14] to-[#140205] select-none">
      {/* Background Palace Architecture Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_rgba(199,161,90,0.22)_0%,_transparent_75%)] pointer-events-none" />

      {/* Top Header with Skip Button (Safe from Language & Audio controls) */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto flex items-center justify-between z-20 px-2">
        <span className="px-3 py-1 rounded-full border border-antique-gold/40 bg-royal-maroon-dark/80 text-[10px] sm:text-xs font-royal tracking-widest text-antique-gold uppercase backdrop-blur-sm shadow-sm">
          {language === 'hi' ? 'राजपूत वर परिचय' : 'Royal Groom'}
        </span>

        <button
          onClick={onSkip}
          className="flex items-center space-x-1 px-3 py-1 rounded-full border border-antique-gold/40 bg-charcoal-dark/70 text-sandstone text-[11px] font-hindi hover:text-antique-gold hover:border-antique-gold transition-all active:scale-95 backdrop-blur-sm"
        >
          <span>{language === 'hi' ? 'छोड़ें' : 'Skip'}</span>
          <SkipForward className="w-3 h-3" />
        </button>
      </div>

      {/* Center Palace Jharokha Frame & Groom Cutout */}
      <div className="relative w-full max-w-sm flex-1 flex flex-col items-center justify-center my-1 z-10">
        {/* Mewari Carved Jharokha Arch Silhouette behind groom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-x-4 top-1 bottom-2 rounded-t-full border-2 border-antique-gold/50 bg-gradient-to-b from-royal-maroon-deep/70 via-royal-maroon/40 to-transparent shadow-[0_0_40px_rgba(199,161,90,0.2)] pointer-events-none"
        >
          <div className="absolute inset-2 rounded-t-full border border-dashed border-antique-gold/30" />
          <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
            <JharokhaCrown className="w-36 sm:w-44 text-antique-gold opacity-90 drop-shadow" />
          </div>
        </motion.div>

        {/* Groom Transparent Cutout Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-10 w-full max-h-[46vh] sm:max-h-[50vh] flex items-end justify-center"
        >
          <img
            src="/images/groom-cutout.png"
            alt="आयुष्मान देवराज सिंह चौहान"
            className="max-h-[44vh] sm:max-h-[48vh] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
          />

          {/* Golden base spotlight aura */}
          <div className="absolute bottom-0 w-3/4 h-12 bg-gradient-to-t from-antique-gold/25 to-transparent rounded-full blur-xl pointer-events-none" />
        </motion.div>
      </div>

      {/* Bottom Name & Lineage Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-sm mx-auto text-center z-20 pb-safe"
      >
        <div className="p-3 sm:p-3.5 rounded-xl border border-antique-gold/50 bg-gradient-to-b from-[#2B070F]/95 via-[#1F040A]/95 to-[#140205]/95 shadow-royal-glow backdrop-blur-md">
          <p className="font-royal text-[10px] sm:text-xs text-antique-gold tracking-widest uppercase font-semibold">
            {language === 'hi' ? '॥ श्री कुलदेवी आशापुरा नमः ॥' : 'With Divine Grace of Maa Ashapura'}
          </p>

          <p className="font-hindi text-[11px] text-sandstone font-medium mt-0.5">
            {data.cardReveal.groomLabel}
          </p>

          <h2 className="font-royal text-xl sm:text-2xl text-antique-gold-lighter font-bold tracking-wide mt-0.5 drop-shadow">
            {data.couple.groom.name}
          </h2>

          <p className="font-royal text-xs text-antique-gold font-semibold mt-0.5">
            ({data.couple.groom.nickname})
          </p>

          <div className="flex items-center justify-center space-x-2 my-1.5">
            <div className="h-[1px] w-8 bg-antique-gold/40" />
            <span className="text-antique-gold text-[10px]">❖</span>
            <div className="h-[1px] w-8 bg-antique-gold/40" />
          </div>

          <p className="font-hindi text-xs text-sandstone-light">
            {language === 'hi' ? 'सुपुत्र:' : 'Son of:'} <span className="font-semibold text-ivory">{data.couple.groom.father}</span>
          </p>
          <p className="font-hindi text-[11px] text-antique-gold/90 mt-0.5">
            {data.couple.groom.thikana}
          </p>
        </div>

        {/* Action Button: Meet Bride */}
        <div className="mt-2.5 flex flex-col items-center">
          <button
            onClick={onNext}
            className="group inline-flex items-center space-x-2 px-6 py-2 rounded-full border-2 border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-white font-hindi text-xs sm:text-sm font-semibold shadow-royal-glow hover:border-white active:scale-95 transition-all"
          >
            <span>{language === 'hi' ? 'वधू परिचय देखें' : 'Meet The Bride'}</span>
            <ChevronRight className="w-4 h-4 text-antique-gold group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Auto-advance progress indicator */}
          <div className="w-28 h-1 bg-antique-gold/20 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-antique-gold transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
