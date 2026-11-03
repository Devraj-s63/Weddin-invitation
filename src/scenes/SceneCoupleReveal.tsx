import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { JharokhaCrown } from '../components/common/OrnateMotif';
import { triggerPetalShower } from '../components/common/PetalShower';

interface SceneCoupleRevealProps {
  onOpenBook: () => void;
}

export const SceneCoupleReveal: React.FC<SceneCoupleRevealProps> = ({ onOpenBook }) => {
  const { data, language } = useLanguage();

  const handleOpen = () => {
    triggerPetalShower();
    onOpenBook();
  };

  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-between px-3 pt-14 pb-4 overflow-hidden bg-gradient-to-b from-[#1C060A] via-[#350A14] to-[#120205] select-none">
      {/* Background Palace Architecture Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(199,161,90,0.22)_0%,_transparent_75%)] pointer-events-none" />

      {/* Top Auspicious Header */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center z-20 text-center">
        <p className="font-royal text-[10px] sm:text-xs text-antique-gold-lighter tracking-widest uppercase font-semibold">
          {data.curtainIntro.om}
        </p>
        <h2 className="font-royal text-lg sm:text-xl text-antique-gold-lighter font-bold tracking-wider mt-0.5 drop-shadow">
          {language === 'hi' ? 'परम पावन शुभ विवाह' : 'The Royal Wedding'}
        </h2>
      </div>

      {/* Center Grand Royal Arch with Couple Portrait */}
      <div className="relative w-full max-w-sm flex-1 flex flex-col items-center justify-center my-1 z-10">
        {/* Mewari Arch Accent behind portrait */}
        <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2 pointer-events-none opacity-80">
          <JharokhaCrown className="w-44 text-antique-gold drop-shadow" />
        </div>

        {/* Royal Couple Portrait in Authentic Rajput Wedding Attire */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-10 max-h-[46vh] sm:max-h-[50vh] flex items-center justify-center"
        >
          <div className="relative rounded-2xl overflow-hidden border-2 border-antique-gold/80 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(199,161,90,0.35)] bg-black/40">
            <img
              src="/images/couple-royal.jpg"
              alt="देवराज सिंह चौहान एवं मधु कंवर"
              className="max-h-[44vh] sm:max-h-[48vh] w-auto aspect-[3/4] object-contain"
            />
          </div>

          {/* Golden base spotlight aura */}
          <div className="absolute -bottom-3 w-4/5 h-14 bg-gradient-to-t from-antique-gold/30 to-transparent rounded-full blur-2xl pointer-events-none" />
        </motion.div>
      </div>

      {/* Bottom Ceremonial Information & Action Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="w-full max-w-sm mx-auto text-center z-20 pb-safe"
      >
        <div className="p-3 sm:p-3.5 rounded-xl border-2 border-antique-gold/60 bg-gradient-to-b from-[#2B070F]/95 via-[#1F040A]/95 to-[#140205]/95 shadow-royal-glow backdrop-blur-md">
          {/* Couple Names */}
          <div className="space-y-0.5">
            <h3 className="font-royal text-lg sm:text-xl text-antique-gold-lighter font-bold tracking-wide">
              {data.couple.groom.name}
            </h3>

            <div className="flex items-center justify-center space-x-2 my-0.5">
              <div className="h-[1px] w-8 bg-antique-gold/50" />
              <span className="font-royal text-xs text-antique-gold font-bold italic">
                — {data.cardReveal.sangText} —
              </span>
              <div className="h-[1px] w-8 bg-antique-gold/50" />
            </div>

            <h3 className="font-royal text-lg sm:text-xl text-antique-gold-lighter font-bold tracking-wide">
              {data.couple.bride.name}
            </h3>
          </div>

          {/* Date & Muhurat */}
          <div className="mt-1.5 pt-1.5 border-t border-antique-gold/25 flex items-center justify-center space-x-2 text-[11px] font-hindi text-sandstone">
            <span className="font-semibold text-ivory">{data.meta.dateFormatted}</span>
            <span>•</span>
            <span>{data.meta.locationCity}</span>
          </div>
        </div>

        {/* Main CTA Button: Enter Royal Card & 3D Book */}
        <div className="mt-2.5 flex flex-col items-center">
          <button
            onClick={handleOpen}
            className="group inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border-2 border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-[#FFF4D0] font-hindi text-xs sm:text-sm font-bold shadow-royal-glow hover:border-white active:scale-95 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 text-antique-gold group-hover:scale-110 transition-transform" />
            <span>{language === 'hi' ? 'शुभ निमंत्रण पत्रिका खोलें' : 'Open Royal Invitation Book'}</span>
            <span className="text-antique-gold">❖</span>
          </button>

          <p className="mt-1.5 text-[10px] text-sandstone/80 font-hindi">
            {language === 'hi'
              ? '(स्पर्श करें एवं शाही 3D पत्रिका के पन्ने पलटें)'
              : '(Tap to open and flip pages in the royal 3D book)'}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
