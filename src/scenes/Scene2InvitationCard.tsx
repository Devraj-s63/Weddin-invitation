import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GaneshaMotif, RoyalDivider, JharokhaCrown } from '../components/common/OrnateMotif';
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(199,161,90,0.15)_0%,_transparent_70%)] pointer-events-none" />
      
      {/* Subtle Palace Arch watermark */}
      <div className="absolute inset-x-0 top-0 h-40 opacity-20 pointer-events-none">
        <JharokhaCrown className="w-full text-antique-gold" />
      </div>

      <div className="w-full max-w-sm sm:max-w-md perspective-1000 z-10 flex flex-col items-center">
        {/* Interactive 3D Card Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="w-full"
        >
          {/* THE PHYSICAL LUXURY INVITATION CARD */}
          <div
            onClick={handleToggleCard}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 cursor-pointer border-2 border-antique-gold/70 bg-[#F7F0E2]"
            style={{
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(199, 161, 90, 0.35)'
            }}
          >
            {/* Top Ornate Rajput Arch Trim */}
            <div className="bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-antique-gold py-2 px-4 text-center border-b border-antique-gold/50 flex items-center justify-between">
              <span className="text-xs">❖</span>
              <span className="font-royal text-xs sm:text-sm tracking-widest uppercase">
                राजपूताना शाही निमंत्रण
              </span>
              <span className="text-xs">❖</span>
            </div>

            {/* CARD FRONT / COVER (WHEN CLOSED) */}
            <AnimatePresence>
              {!isOpen ? (
                <motion.div
                  key="card-cover"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 sm:p-8 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFDF9] via-[#F7F0E2] to-[#EFE5D3] min-h-[460px] justify-between relative"
                >
                  {/* Decorative corner flourishes */}
                  <div className="absolute top-3 left-3 text-royal-maroon opacity-70 text-base">❧</div>
                  <div className="absolute top-3 right-3 text-royal-maroon opacity-70 text-base">☙</div>
                  <div className="absolute bottom-3 left-3 text-royal-maroon opacity-70 text-base">❧</div>
                  <div className="absolute bottom-3 right-3 text-royal-maroon opacity-70 text-base">☙</div>

                  {/* Inner hairline border */}
                  <div className="absolute inset-4 rounded-xl border border-royal-maroon/20 pointer-events-none" />

                  {/* Auspicious Ganesha Emblem */}
                  <div className="my-2 flex flex-col items-center">
                    <GaneshaMotif size={56} className="text-royal-maroon animate-pulse-subtle" />
                    <p className="font-royal text-sm text-royal-maroon font-semibold tracking-widest mt-1">
                      || श्री गणेशाय नमः ||
                    </p>
                  </div>

                  {/* Center Sealed Monogram / Wedding Title */}
                  <div className="my-4 py-4 w-full flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-antique-gold flex items-center justify-center bg-royal-maroon text-[#FFF4D0] shadow-lg mb-3">
                      <span className="font-royal text-xl font-bold tracking-widest">द • म</span>
                    </div>

                    <h2 className="font-royal text-2xl sm:text-3xl font-bold text-royal-maroon tracking-wider">
                      शुभ विवाह
                    </h2>

                    <div className="mt-3 space-y-1">
                      <p className="font-royal text-lg sm:text-xl font-bold text-royal-maroon-dark">
                        {WEDDING_DATA.couple.groom.name}
                      </p>
                      <p className="font-royal text-sm text-antique-gold-dark font-medium italic">
                        — संग —
                      </p>
                      <p className="font-royal text-lg sm:text-xl font-bold text-royal-maroon-dark">
                        {WEDDING_DATA.couple.bride.name}
                      </p>
                    </div>

                    <p className="mt-4 font-hindi text-xs sm:text-sm text-charcoal/80 font-medium">
                      {WEDDING_DATA.meta.dateFormatted}
                    </p>
                  </div>

                  {/* Ceremonial Ambient Breathing Tap-to-Open Cue (Replacing mechanical bounce) */}
                  <div className="mt-2 flex flex-col items-center">
                    <div className="px-6 py-2.5 rounded-full border-2 border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-[#FFF4D0] text-xs font-hindi tracking-wider font-bold shadow-royal-glow animate-pulse-subtle hover:scale-105 active:scale-95 transition-all duration-300">
                      ✨ स्पर्श कर निमंत्रण खोलें ✨
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* UNFOLDED INNER ROYAL INVITATION CARD */
                <motion.div
                  key="card-inside"
                  initial={{ opacity: 0, rotateX: -20, scale: 0.95 }}
                  animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="p-6 sm:p-8 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F2E5D0] relative min-h-[520px]"
                >
                  {/* Inner hairline border */}
                  <div className="absolute inset-3 rounded-xl border border-royal-maroon/25 pointer-events-none" />
                  
                  {/* Inner gold corner motifs */}
                  <div className="absolute top-2 left-2 text-antique-gold text-xs">❖</div>
                  <div className="absolute top-2 right-2 text-antique-gold text-xs">❖</div>
                  <div className="absolute bottom-2 left-2 text-antique-gold text-xs">❖</div>
                  <div className="absolute bottom-2 right-2 text-antique-gold text-xs">❖</div>

                  {/* Sacred Invocations */}
                  <div className="space-y-1 mb-2">
                    <p className="font-royal text-xs text-royal-maroon font-bold tracking-widest">
                      || श्री गणेशाय नमः ||
                    </p>
                    <p className="font-hindi text-xs text-sandstone-dark font-semibold tracking-wide">
                      {WEDDING_DATA.cardReveal.kuldeviBlessing}
                    </p>
                  </div>

                  {/* Central Shubh Vivah Calligraphy */}
                  <div className="my-2">
                    <span className="inline-block px-4 py-0.5 rounded-full bg-royal-maroon/10 border border-royal-maroon/20 text-royal-maroon font-royal text-sm tracking-wider font-bold">
                      ॥ शुभ विवाह ॥
                    </span>
                  </div>

                  {/* Groom & Bride Details */}
                  <div className="my-3 space-y-3 w-full">
                    {/* Groom Details */}
                    <div className="bg-white/70 p-3.5 rounded-lg border border-antique-gold/40 shadow-sm">
                      <p className="text-xs font-hindi text-royal-maroon font-bold uppercase tracking-wider">वर</p>
                      <h3 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon">
                        {WEDDING_DATA.couple.groom.name}
                      </h3>
                      <p className="text-xs text-charcoal font-hindi font-medium mt-0.5">
                        सुपुत्र: {WEDDING_DATA.couple.groom.father}
                      </p>
                      <p className="text-xs text-charcoal/80 font-hindi mt-0.5">
                        {WEDDING_DATA.couple.groom.grandparents} ({WEDDING_DATA.couple.groom.thikana})
                      </p>
                    </div>

                    {/* Royal Sang Divider */}
                    <div className="flex items-center justify-center space-x-2 my-1">
                      <div className="h-[1px] w-8 bg-antique-gold" />
                      <span className="font-royal text-xs font-bold text-royal-maroon italic">संग</span>
                      <div className="h-[1px] w-8 bg-antique-gold" />
                    </div>

                    {/* Bride Details */}
                    <div className="bg-white/70 p-3.5 rounded-lg border border-antique-gold/40 shadow-sm">
                      <p className="text-xs font-hindi text-royal-maroon font-bold uppercase tracking-wider">वधू</p>
                      <h3 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon">
                        {WEDDING_DATA.couple.bride.name}
                      </h3>
                      <p className="text-xs text-charcoal font-hindi font-medium mt-0.5">
                        सुपुत्री: {WEDDING_DATA.couple.bride.father}
                      </p>
                      <p className="text-xs text-charcoal/80 font-hindi mt-0.5">
                        {WEDDING_DATA.couple.bride.grandparents} ({WEDDING_DATA.couple.bride.thikana})
                      </p>
                    </div>
                  </div>

                  {/* Date & Muhurat */}
                  <div className="my-2 py-2 px-3 rounded-md bg-royal-maroon/5 border border-royal-maroon/15 w-full">
                    <p className="font-royal text-sm font-bold text-royal-maroon">
                      {WEDDING_DATA.meta.dateFormatted}
                    </p>
                    <p className="text-xs text-charcoal/75 font-hindi mt-0.5">
                      {WEDDING_DATA.meta.samvat}
                    </p>
                  </div>

                  <p className="text-xs font-hindi text-charcoal/85 italic my-2 max-w-xs">
                    {WEDDING_DATA.cardReveal.invitationNote}
                  </p>

                  <RoyalDivider className="my-2" />

                  {/* Button to proceed to main website experience */}
                  <div className="mt-2 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnterFestivities();
                      }}
                      className="w-full py-3 px-6 rounded-full border border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-antique-gold-lighter font-royal text-sm sm:text-base font-semibold shadow-royal-glow active:scale-95 transition-all duration-300"
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
