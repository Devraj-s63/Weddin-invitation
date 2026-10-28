import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalDivider } from '../components/common/OrnateMotif';
import { WEDDING_DATA } from '../data/weddingData';
import { triggerPetalShower } from '../components/common/PetalShower';

interface Scene2Props {
  onEnterFestivities: () => void;
}

export const Scene2InvitationCard: React.FC<Scene2Props> = ({ onEnterFestivities }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCard = () => {
    if (!isOpen) {
      setIsOpen(true);
      triggerPetalShower();
    }
  };

  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-gradient-to-b from-[#1C060A] via-royal-maroon-deep to-charcoal">
      {/* Background Palace Courtyard Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(199,161,90,0.18)_0%,_transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-sm sm:max-w-md perspective-1000 z-10 flex flex-col items-center">
        {/* Interactive 3D Card Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="w-full"
        >
          {/* THE PHYSICAL LUXURY INVITATION CARD (MATCHING USER'S REAL CARD) */}
          <div
            onClick={handleToggleCard}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 cursor-pointer border-2 border-[#E6C98A]/80 bg-[#FFFDF9]"
            style={{
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(199, 161, 90, 0.4)'
            }}
          >
            {/* Top Ornate Rajput Arch Trim */}
            <div className="bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-antique-gold-lighter py-2 px-4 text-center border-b border-antique-gold/50 flex items-center justify-between">
              <span className="text-xs text-[#FCE8B2]">❖</span>
              <span className="font-royal text-xs sm:text-sm tracking-widest uppercase font-bold text-[#FFF4D0]">
                राजपूताना शाही निमंत्रण पत्रिका
              </span>
              <span className="text-xs text-[#FCE8B2]">❖</span>
            </div>

            {/* CARD FRONT / COVER (WHEN CLOSED) - EXACT USER CARD JACKET */}
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="card-cover"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F5ECE0] min-h-[500px] justify-between relative overflow-hidden"
                >
                  {/* Real Card Top Hanging Floral Garland */}
                  <div className="w-full h-10 overflow-hidden relative opacity-90 border-b border-pink-200/40">
                    <img
                      src="/images/card-top-garland.png"
                      alt="फूलों की झालर"
                      className="w-full h-full object-cover object-bottom"
                    />
                  </div>

                  {/* Top Invocation & Shubh Vivah */}
                  <div className="pt-2 px-4 space-y-1">
                    <p className="font-royal text-xs text-royal-maroon font-bold tracking-widest uppercase">
                      || श्री गणेशाय नमः ||
                    </p>
                    <h2 className="font-royal text-2xl sm:text-3xl font-bold text-royal-maroon tracking-wider drop-shadow-sm">
                      शुभ विवाह
                    </h2>
                    <p className="font-royal text-base sm:text-lg font-bold text-royal-maroon-dark">
                      {WEDDING_DATA.couple.groom.name}
                    </p>
                    <p className="font-royal text-xs text-sandstone-dark font-semibold italic">
                      — संग —
                    </p>
                    <p className="font-royal text-base sm:text-lg font-bold text-royal-maroon-dark">
                      {WEDDING_DATA.couple.bride.name}
                    </p>
                    <p className="font-hindi text-xs text-charcoal/80 font-medium">
                      {WEDDING_DATA.meta.dateFormatted}
                    </p>
                  </div>

                  {/* Pulsing Tap-to-Open Cue in Center */}
                  <div className="my-2 z-20">
                    <div className="px-5 py-2 rounded-full border-2 border-[#E6C98A] bg-royal-maroon text-[#FFF4D0] text-xs font-hindi tracking-wider font-bold shadow-[0_4px_15px_rgba(101,15,28,0.5)] animate-bounce">
                      ✨ स्पर्श कर निमंत्रण खोलें ✨
                    </div>
                  </div>

                  {/* Real Card Bottom Section: Central Ganesha Mandala + Twin Royal Elephants + Marble Railing */}
                  <div className="w-full relative mt-auto">
                    <img
                      src="/images/card-bottom-artwork.png"
                      alt="शाही हाथी व श्री गणेश मंडप कलाकृति"
                      className="w-full h-auto object-contain block select-none"
                    />
                  </div>
                </motion.div>
              ) : (
                /* UNFOLDED INNER ROYAL INVITATION CARD */
                <motion.div
                  key="card-inside"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="p-5 sm:p-7 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F2E5D0] relative min-h-[520px]"
                >
                  {/* Inner hairline border */}
                  <div className="absolute inset-3 rounded-xl border-2 border-royal-maroon/20 pointer-events-none" />

                  {/* Top corner flourishes */}
                  <div className="absolute top-2 left-2 text-antique-gold text-xs">❖</div>
                  <div className="absolute top-2 right-2 text-antique-gold text-xs">❖</div>
                  <div className="absolute bottom-2 left-2 text-antique-gold text-xs">❖</div>
                  <div className="absolute bottom-2 right-2 text-antique-gold text-xs">❖</div>

                  {/* Auspicious Ganesha Mandala from the Real Card */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 relative flex items-center justify-center">
                    <img
                      src="/images/card-ganesha-mandala.png"
                      alt="श्री गणेश मंडप"
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>

                  {/* Sacred Invocations */}
                  <div className="space-y-0.5 mb-2">
                    <p className="font-royal text-xs text-royal-maroon font-bold tracking-widest">
                      || श्री गणेशाय नमः ||
                    </p>
                    <p className="font-hindi text-[11px] text-sandstone-dark font-semibold tracking-wide">
                      {WEDDING_DATA.cardReveal.kuldeviBlessing}
                    </p>
                  </div>

                  {/* Shubh Vivah Tag */}
                  <div className="my-1">
                    <span className="inline-block px-4 py-0.5 rounded-full bg-royal-maroon/10 border border-royal-maroon/20 text-royal-maroon font-royal text-xs tracking-wider font-bold">
                      ॥ शुभ विवाह ॥
                    </span>
                  </div>

                  {/* Groom & Bride Details with Real Card Twin Elephants Accents */}
                  <div className="my-2 space-y-2.5 w-full">
                    {/* Groom Details */}
                    <div className="bg-white/70 p-3 rounded-xl border border-antique-gold/30 shadow-sm relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 opacity-75 hidden sm:block">
                          <img src="/images/card-left-elephant.png" alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 text-center">
                          <p className="text-[10px] font-hindi text-sandstone-dark font-bold uppercase tracking-wider">वर</p>
                          <h3 className="font-royal text-base sm:text-lg font-bold text-royal-maroon">
                            {WEDDING_DATA.couple.groom.name}
                          </h3>
                          <p className="text-[11px] text-charcoal/85 font-hindi mt-0.5">
                            सुपुत्र: {WEDDING_DATA.couple.groom.father}
                          </p>
                          <p className="text-[10px] text-charcoal/70 font-hindi">
                            {WEDDING_DATA.couple.groom.grandparents} ({WEDDING_DATA.couple.groom.thikana})
                          </p>
                        </div>
                        <div className="w-8 h-8 opacity-0 hidden sm:block" />
                      </div>
                    </div>

                    {/* Royal Sang Divider */}
                    <div className="flex items-center justify-center space-x-2 my-1">
                      <div className="h-[1px] w-10 bg-antique-gold" />
                      <span className="font-royal text-xs font-bold text-royal-maroon italic">संग</span>
                      <div className="h-[1px] w-10 bg-antique-gold" />
                    </div>

                    {/* Bride Details */}
                    <div className="bg-white/70 p-3 rounded-xl border border-antique-gold/30 shadow-sm relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 opacity-0 hidden sm:block" />
                        <div className="flex-1 text-center">
                          <p className="text-[10px] font-hindi text-sandstone-dark font-bold uppercase tracking-wider">वधू</p>
                          <h3 className="font-royal text-base sm:text-lg font-bold text-royal-maroon">
                            {WEDDING_DATA.couple.bride.name}
                          </h3>
                          <p className="text-[11px] text-charcoal/85 font-hindi mt-0.5">
                            सुपुत्री: {WEDDING_DATA.couple.bride.father}
                          </p>
                          <p className="text-[10px] text-charcoal/70 font-hindi">
                            {WEDDING_DATA.couple.bride.grandparents} ({WEDDING_DATA.couple.bride.thikana})
                          </p>
                        </div>
                        <div className="w-8 h-8 opacity-75 hidden sm:block">
                          <img src="/images/card-right-elephant.png" alt="" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date & Muhurat */}
                  <div className="my-1.5 py-1.5 px-3 rounded-lg bg-royal-maroon/5 border border-royal-maroon/15 w-full">
                    <p className="font-royal text-xs sm:text-sm font-bold text-royal-maroon">
                      {WEDDING_DATA.meta.dateFormatted}
                    </p>
                    <p className="text-[11px] text-charcoal/75 font-hindi mt-0.5">
                      {WEDDING_DATA.meta.samvat}
                    </p>
                  </div>

                  <p className="text-[11px] font-hindi text-charcoal/85 italic my-1.5 max-w-xs leading-relaxed">
                    {WEDDING_DATA.cardReveal.invitationNote}
                  </p>

                  <RoyalDivider className="my-2" />

                  {/* Button to proceed to main website experience */}
                  <div className="mt-1 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnterFestivities();
                      }}
                      className="w-full py-3 px-6 rounded-full border-2 border-[#E6C98A] bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-[#FFF4D0] font-royal text-sm sm:text-base font-bold shadow-royal-glow hover:border-white active:scale-95 transition-all duration-300"
                    >
                      {WEDDING_DATA.cardReveal.buttonText} →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
