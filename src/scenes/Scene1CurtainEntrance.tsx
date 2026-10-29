import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChauhanCrest } from '../components/common/ChauhanCrest';
import { audioManager } from '../utils/audioManager';
import { triggerPetalShower } from '../components/common/PetalShower';
import { useLanguage } from '../context/LanguageContext';

interface Scene1Props {
  onOpenComplete: () => void;
}

export const Scene1CurtainEntrance: React.FC<Scene1Props> = ({ onOpenComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const { data } = useLanguage();

  const handleOpenCurtains = async () => {
    if (isOpening) return;
    setIsOpening(true);

    // 1. Play ceremonial sound & start background wedding music on deliberate interaction
    audioManager.startMusic();

    // 2. Trigger celebratory royal petal shower
    triggerPetalShower();

    // 3. Realistic curtain opening duration (2.4s) then notify parent
    setTimeout(() => {
      onOpenComplete();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-charcoal-dark select-none flex items-center justify-center">
      {/* Background Palace Environment revealed behind curtains */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E050A] via-[#340A13] to-[#120306] flex items-center justify-center">
        {/* Warm Golden Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl h-[80vh] bg-gradient-to-b from-antique-gold/30 via-antique-gold/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Ambient floating golden particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-antique-gold-light animate-float" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-antique-gold animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-antique-gold-lighter animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-antique-gold animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      {/* Top Valance - Palace Scalloped Velvet Pelmet */}
      <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <div className="h-16 sm:h-20 w-full valance-scallop shadow-2xl relative border-b-2 border-antique-gold/70">
          {/* Golden fringe trim */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-antique-gold-dark via-antique-gold-light to-antique-gold-dark opacity-95 shadow-md" />
          {/* Golden ornamental tassels hanging from valance */}
          <div className="absolute bottom-[-14px] left-0 right-0 flex justify-around px-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-antique-gold shadow-md" />
                <div className="w-0.5 h-3 bg-antique-gold/80" />
                <div className="w-2 h-3.5 bg-gradient-to-b from-antique-gold to-muted-gold rounded-b-sm shadow-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEFT CURTAIN PANEL */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-1/2 z-20 velvet-left origin-left flex flex-col justify-between"
        initial={{ x: 0, scaleX: 1 }}
        animate={isOpening ? { x: '-92%', scaleX: 0.88, skewY: -1 } : { x: 0, scaleX: 1 }}
        transition={{ duration: 2.3, ease: [0.65, 0, 0.35, 1] }}
      >
        {/* Right edge golden embroidery band */}
        <div className="absolute top-0 right-0 bottom-0 w-3.5 sm:w-5 bg-gradient-to-b from-antique-gold via-antique-gold-light to-muted-gold shadow-xl flex flex-col items-center justify-around py-4 opacity-95">
          <div className="w-full h-full border-r border-l border-royal-maroon/50" />
        </div>
        {/* Outer Shadow on center parting */}
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-black/85 to-transparent pointer-events-none" />
      </motion.div>

      {/* RIGHT CURTAIN PANEL */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-1/2 z-20 velvet-right origin-right flex flex-col justify-between"
        initial={{ x: 0, scaleX: 1 }}
        animate={isOpening ? { x: '92%', scaleX: 0.88, skewY: 1 } : { x: 0, scaleX: 1 }}
        transition={{ duration: 2.3, ease: [0.65, 0, 0.35, 1] }}
      >
        {/* Left edge golden embroidery band */}
        <div className="absolute top-0 left-0 bottom-0 w-3.5 sm:w-5 bg-gradient-to-b from-antique-gold via-antique-gold-light to-muted-gold shadow-xl flex flex-col items-center justify-around py-4 opacity-95">
          <div className="w-full h-full border-r border-l border-royal-maroon/50" />
        </div>
        {/* Outer Shadow on center parting */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-black/85 to-transparent pointer-events-none" />
      </motion.div>

      {/* CENTER MEDALLION & INVITATION CALL TO ACTION */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Top Invocation */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-3"
            >
              <span className="font-royal text-sm sm:text-base tracking-widest text-[#FCE8B2] drop-shadow-md font-bold">
                {data.curtainIntro.om}
              </span>
            </motion.div>

            {/* Authentic Chauhan Royal Crest Medallion */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.9, type: 'spring' }}
              className="my-2"
            >
              <ChauhanCrest size="lg" showCaption={true} />
            </motion.div>

            {/* Royal Welcome Lines */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-xs sm:max-w-md mx-auto my-3 space-y-2"
            >
              <h1 className="font-royal text-3xl sm:text-4xl text-[#FCE8B2] font-bold tracking-wider drop-shadow-lg">
                {data.curtainIntro.welcome}
              </h1>
              <p className="font-hindi text-sm sm:text-base text-ivory leading-relaxed font-medium drop-shadow-sm">
                {data.curtainIntro.subtext}
              </p>
            </motion.div>

            {/* Main Interactive Button */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-4"
            >
              <button
                onClick={handleOpenCurtains}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full overflow-hidden border-2 border-[#E6C98A] bg-gradient-to-r from-[#4A0A14] via-[#751221] to-[#4A0A14] text-[#FFF4D0] font-royal text-base sm:text-lg tracking-widest font-bold shadow-[0_0_25px_rgba(230,201,138,0.5)] active:scale-95 hover:border-white transition-all duration-300"
              >
                {/* Gold Shimmer effect across button */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFF1C5]/30 to-transparent skew-x-12 animate-shimmer" />
                
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="text-[#FCE8B2]">⚜</span>
                  <span className="font-hindi font-bold text-lg text-white drop-shadow-sm">
                    {data.curtainIntro.buttonText}
                  </span>
                  <span className="text-[#FCE8B2]">⚜</span>
                </span>
              </button>

              <p className="mt-2.5 text-xs text-[#EAD7BE] font-hindi tracking-wide font-medium drop-shadow-sm">
                {data.curtainIntro.touchHint}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
