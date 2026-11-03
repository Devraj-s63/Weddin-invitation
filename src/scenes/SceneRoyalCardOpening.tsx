import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { JharokhaCrown } from '../components/common/OrnateMotif';
import { triggerPetalShower } from '../components/common/PetalShower';

interface SceneRoyalCardOpeningProps {
  onOpenBook: () => void;
}

export const SceneRoyalCardOpening: React.FC<SceneRoyalCardOpeningProps> = ({ onOpenBook }) => {
  const [isOpeningCard, setIsOpeningCard] = useState(false);
  const { data, language } = useLanguage();

  const handleOpen = () => {
    if (isOpeningCard) return;
    setIsOpeningCard(true);
    triggerPetalShower();
    setTimeout(() => {
      onOpenBook();
    }, 1200);
  };

  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-gradient-to-b from-[#1C060A] via-[#320812] to-[#120205] select-none">
      {/* Background Palace Courtyard Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(199,161,90,0.2)_0%,_transparent_75%)] pointer-events-none" />

      {/* Subtle Palace Arch Crown at top */}
      <div className="absolute inset-x-0 top-0 h-40 opacity-25 pointer-events-none">
        <JharokhaCrown className="w-full text-antique-gold" />
      </div>

      <div className="w-full max-w-sm sm:max-w-md perspective-1000 z-10 flex flex-col items-center">
        {/* Animated 3D Physical Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative w-full max-w-[390px] h-[550px] sm:h-[580px] rounded-2xl preserve-3d cursor-pointer"
          onClick={handleOpen}
        >
          {/* Card Base Layer (Parchment Interior Inside Book) */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F2E5D0] border-2 border-antique-gold/70 shadow-2xl p-6 flex flex-col items-center justify-between text-center overflow-hidden">
            <div className="absolute inset-3 rounded-xl border border-royal-maroon/20 pointer-events-none" />

            <div className="pt-2">
              <span className="font-royal text-xs text-royal-maroon tracking-widest uppercase font-bold">
                {data.curtainIntro.om}
              </span>
              <p className="font-hindi text-[11px] text-charcoal/70 mt-0.5">
                {data.cardReveal.kuldeviBlessing}
              </p>
            </div>

            <div className="my-auto flex flex-col items-center">
              <img
                src="/images/ganesha-divine-clean.png"
                alt="Shree Ganesha"
                className="w-16 h-16 object-contain mb-2 drop-shadow"
              />
              <h3 className="font-royal text-2xl font-bold text-royal-maroon">
                {language === 'hi' ? 'शुभ विवाह' : 'Royal Wedding'}
              </h3>
              <p className="font-royal text-base font-bold text-royal-maroon-dark mt-1">
                {data.couple.groom.name}
              </p>
              <p className="font-royal text-xs text-antique-gold font-bold italic">
                — {data.cardReveal.sangText} —
              </p>
              <p className="font-royal text-base font-bold text-royal-maroon-dark">
                {data.couple.bride.name}
              </p>
              <p className="font-hindi text-xs text-charcoal/80 mt-2">
                {data.meta.dateFormatted}
              </p>
            </div>

            <div className="pb-2">
              <span className="font-royal text-xs text-royal-maroon font-bold tracking-wider">
                {language === 'hi' ? '॥ पधारो सा ॥' : '॥ PADHARO SA ॥'}
              </span>
            </div>
          </div>

          {/* FRONT COVER (FLIPS OPEN IN 3D TO THE LEFT) */}
          <motion.div
            className="absolute inset-0 rounded-2xl origin-left preserve-3d overflow-hidden border-2 border-antique-gold/80 bg-gradient-to-b from-[#2E050D] via-[#4F0B17] to-[#1E0308] p-6 flex flex-col items-center justify-between text-center shadow-[0_25px_50px_rgba(0,0,0,0.85)] z-20"
            initial={{ rotateY: 0 }}
            animate={isOpeningCard ? { rotateY: -160, opacity: 0.15 } : { rotateY: 0 }}
            transition={{ duration: 1.15, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Outer Gold Embellishments */}
            <div className="absolute inset-3 rounded-xl border border-antique-gold/40 pointer-events-none" />
            <div className="absolute top-2 left-2 text-antique-gold text-xs">❖</div>
            <div className="absolute top-2 right-2 text-antique-gold text-xs">❖</div>
            <div className="absolute bottom-2 left-2 text-antique-gold text-xs">❖</div>
            <div className="absolute bottom-2 right-2 text-antique-gold text-xs">❖</div>

            {/* Top Invocation */}
            <div className="relative z-10 pt-2">
              <p className="font-royal text-xs text-antique-gold-lighter tracking-widest font-bold uppercase drop-shadow">
                {data.curtainIntro.om}
              </p>
              <p className="font-royal text-[10px] text-antique-gold/90 uppercase tracking-widest mt-0.5">
                {language === 'hi' ? 'राजपूताना शाही निमंत्रण' : 'Royal Rajputana Invitation'}
              </p>
            </div>

            {/* Center Royal Monogram & Title */}
            <div className="relative z-10 my-auto flex flex-col items-center py-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-b from-antique-gold via-antique-gold-dark to-royal-maroon-dark shadow-2xl mb-2.5">
                <img
                  src="/images/royal-dm-monogram.webp"
                  alt="Devraj & Madhu Royal Monogram"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h2 className="font-royal text-2xl sm:text-3xl font-bold text-antique-gold-lighter tracking-wider drop-shadow">
                {language === 'hi' ? 'शुभ विवाह' : 'Royal Wedding'}
              </h2>

              <div className="flex items-center justify-center space-x-2 my-1.5">
                <div className="h-[1px] w-10 bg-antique-gold/50" />
                <span className="text-antique-gold text-xs">❖</span>
                <div className="h-[1px] w-10 bg-antique-gold/50" />
              </div>

              <div className="space-y-0.5">
                <p className="font-royal text-base sm:text-lg font-bold text-white drop-shadow">
                  {data.couple.groom.name}
                </p>
                <p className="font-royal text-xs text-antique-gold font-semibold italic">
                  — {data.cardReveal.sangText} —
                </p>
                <p className="font-royal text-base sm:text-lg font-bold text-white drop-shadow">
                  {data.couple.bride.name}
                </p>
              </div>

              <p className="mt-2.5 font-hindi text-xs text-sandstone font-medium">
                {data.meta.dateFormatted}
              </p>
            </div>

            {/* Tap to Open Cue */}
            <div className="relative z-10 pb-2">
              <div className="px-6 py-2 rounded-full border border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-white text-xs font-hindi font-bold shadow-royal-glow hover:border-white active:scale-95 transition-all">
                {data.cardReveal.tapToOpen}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Supporting Hint */}
        <p className="mt-4 text-xs text-sandstone/80 font-hindi text-center">
          {language === 'hi' ? 'निमंत्रण पत्र को स्पर्श कर 3D पुस्तक रूप में खोलें' : 'Tap the card to open the 3D wedding book'}
        </p>
      </div>
    </section>
  );
};
