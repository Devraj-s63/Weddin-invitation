import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalDivider, JharokhaCrown } from '../components/common/OrnateMotif';
import { triggerPetalShower } from '../components/common/PetalShower';
import { useLanguage } from '../context/LanguageContext';

interface Scene2Props {
  onEnterFestivities: () => void;
}

export const Scene2InvitationCard: React.FC<Scene2Props> = ({ onEnterFestivities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, language } = useLanguage();

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
                {language === 'hi' ? 'राजपूताना शाही निमंत्रण' : 'Royal Rajputana Invitation'}
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
                  className="p-6 sm:p-8 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFDF9] via-[#F7F0E2] to-[#EFE5D3] min-h-[470px] justify-between relative"
                >
                  {/* Decorative corner flourishes */}
                  <div className="absolute top-3 left-3 text-royal-maroon opacity-70 text-base">❧</div>
                  <div className="absolute top-3 right-3 text-royal-maroon opacity-70 text-base">☙</div>
                  <div className="absolute bottom-3 left-3 text-royal-maroon opacity-70 text-base">❧</div>
                  <div className="absolute bottom-3 right-3 text-royal-maroon opacity-70 text-base">☙</div>

                  {/* Inner hairline border */}
                  <div className="absolute inset-4 rounded-xl border border-royal-maroon/20 pointer-events-none" />

                  {/* Auspicious Ganesha Artwork */}
                  <div className="my-1 flex flex-col items-center">
                    <img
                      src="/images/ganesha-divine-clean.png"
                      alt="Shree Ganesh"
                      className="w-16 h-16 object-contain drop-shadow animate-pulse-subtle"
                    />
                    <p className="font-royal text-xs sm:text-sm text-royal-maroon font-bold tracking-widest mt-1">
                      {data.curtainIntro.om}
                    </p>
                  </div>

                  {/* Center Sealed Monogram / Wedding Title */}
                  <div className="my-2 py-2 w-full flex flex-col items-center">
                    {/* New User-Provided English DM Monogram */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-antique-gold shadow-xl mb-2.5 p-0.5 bg-[#4A0A14]">
                      <img
                        src="/images/royal-dm-monogram.webp"
                        alt="Devraj & Madhu Royal Monogram"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <h2 className="font-royal text-2xl sm:text-3xl font-bold text-royal-maroon tracking-wider">
                      {language === 'hi' ? 'शुभ विवाह' : 'Royal Wedding'}
                    </h2>

                    <div className="mt-2.5 space-y-1">
                      <p className="font-royal text-base sm:text-lg font-bold text-royal-maroon-dark">
                        {data.couple.groom.name}
                      </p>
                      <p className="font-royal text-xs text-antique-gold-dark font-semibold italic">
                        — {data.cardReveal.sangText} —
                      </p>
                      <p className="font-royal text-base sm:text-lg font-bold text-royal-maroon-dark">
                        {data.couple.bride.name}
                      </p>
                    </div>

                    <p className="mt-3 font-hindi text-xs sm:text-sm text-charcoal/80 font-medium">
                      {data.meta.dateFormatted}
                    </p>
                  </div>

                  {/* Ceremonial Breathing Tap-to-Open Cue */}
                  <div className="mt-1 flex flex-col items-center">
                    <div className="px-6 py-2.5 rounded-full border-2 border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-[#FFF4D0] text-xs font-hindi tracking-wider font-bold shadow-royal-glow animate-pulse-subtle hover:scale-105 active:scale-95 transition-all duration-300">
                      {data.cardReveal.tapToOpen}
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
                  className="p-5 sm:p-8 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F2E5D0] relative min-h-[530px]"
                >
                  {/* Inner hairline border */}
                  <div className="absolute inset-3 rounded-xl border border-royal-maroon/25 pointer-events-none" />

                  {/* Inner gold corner motifs */}
                  <div className="absolute top-2 left-2 text-antique-gold text-xs">❖</div>
                  <div className="absolute top-2 right-2 text-antique-gold text-xs">❖</div>
                  <div className="absolute bottom-2 left-2 text-antique-gold text-xs">❖</div>
                  <div className="absolute bottom-2 right-2 text-antique-gold text-xs">❖</div>

                  {/* Sacred Invocations & Ganesha icon */}
                  <div className="flex items-center space-x-2 mb-1">
                    <img
                      src="/images/ganesha-divine-clean.png"
                      alt="Shree Ganesh"
                      className="w-8 h-8 object-contain"
                    />
                    <div className="text-left">
                      <p className="font-royal text-xs text-royal-maroon font-bold tracking-widest">
                        {data.curtainIntro.om}
                      </p>
                      <p className="font-hindi text-[11px] text-sandstone-dark font-semibold tracking-wide">
                        {data.cardReveal.kuldeviBlessing}
                      </p>
                    </div>
                  </div>

                  {/* Central Shubh Vivah Calligraphy */}
                  <div className="my-1.5">
                    <span className="inline-block px-4 py-0.5 rounded-full bg-royal-maroon/10 border border-royal-maroon/20 text-royal-maroon font-royal text-xs sm:text-sm tracking-wider font-bold">
                      {language === 'hi' ? '॥ शुभ विवाह ॥' : '॥ Royal Wedding ॥'}
                    </span>
                  </div>

                  {/* Groom & Bride Details */}
                  <div className="my-2.5 space-y-2.5 w-full">
                    {/* Groom Details */}
                    <div className="bg-white/70 p-3 rounded-lg border border-antique-gold/40 shadow-sm text-center">
                      <p className="text-[10px] font-hindi text-royal-maroon font-bold uppercase tracking-wider">
                        {data.cardReveal.groomLabel}
                      </p>
                      <h3 className="font-royal text-base sm:text-lg font-bold text-royal-maroon">
                        {data.couple.groom.name}
                      </h3>
                      <p className="text-xs text-charcoal font-hindi font-medium mt-0.5">
                        {data.cardReveal.sonOf} {data.couple.groom.father}
                      </p>
                      <p className="text-[11px] text-charcoal/80 font-hindi mt-0.5">
                        {data.couple.groom.grandparents} ({data.couple.groom.Thi.})
                      </p>
                    </div>

                    {/* Royal Sang Divider */}
                    <div className="flex items-center justify-center space-x-2 my-0.5">
                      <div className="h-[1px] w-8 bg-antique-gold" />
                      <span className="font-royal text-xs font-bold text-royal-maroon italic">
                        {data.cardReveal.sangText}
                      </span>
                      <div className="h-[1px] w-8 bg-antique-gold" />
                    </div>

                    {/* Bride Details */}
                    <div className="bg-white/70 p-3 rounded-lg border border-antique-gold/40 shadow-sm text-center">
                      <p className="text-[10px] font-hindi text-royal-maroon font-bold uppercase tracking-wider">
                        {data.cardReveal.brideLabel}
                      </p>
                      <h3 className="font-royal text-base sm:text-lg font-bold text-royal-maroon">
                        {data.couple.bride.name}
                      </h3>
                      <p className="text-xs text-charcoal font-hindi font-medium mt-0.5">
                        {data.cardReveal.daughterOf} {data.couple.bride.father}
                      </p>
                      <p className="text-[11px] text-charcoal/80 font-hindi mt-0.5">
                        {data.couple.bride.grandparents} ({data.couple.bride.Thi.})
                      </p>
                    </div>
                  </div>

                  {/* Date & Muhurat */}
                  <div className="my-1.5 py-1.5 px-3 rounded-md bg-royal-maroon/5 border border-royal-maroon/15 w-full">
                    <p className="font-royal text-xs sm:text-sm font-bold text-royal-maroon">
                      {data.meta.dateFormatted}
                    </p>
                    <p className="text-[11px] text-charcoal/75 font-hindi mt-0.5">
                      {data.meta.samvat}
                    </p>
                  </div>

                  <p className="text-[11px] sm:text-xs font-hindi text-charcoal/85 italic my-1.5 max-w-xs">
                    {data.cardReveal.invitationNote}
                  </p>

                  <RoyalDivider className="my-1.5" />

                  {/* Button to proceed to main website experience */}
                  <div className="mt-1.5 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnterFestivities();
                      }}
                      className="w-full py-2.5 px-6 rounded-full border border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-antique-gold-lighter font-royal text-xs sm:text-sm font-semibold shadow-royal-glow active:scale-95 transition-all duration-300"
                    >
                      {data.cardReveal.buttonText} →
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
