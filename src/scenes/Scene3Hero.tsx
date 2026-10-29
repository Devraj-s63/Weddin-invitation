import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, FileText, Clock } from 'lucide-react';
import { RoyalDivider, GaneshaMotif, JharokhaCrown } from '../components/common/OrnateMotif';
import { ChauhanCrest } from '../components/common/ChauhanCrest';
import { PetalShowerButton } from '../components/common/PetalShower';
import { VisitorCounter } from '../components/common/VisitorCounter';
import { WEDDING_DATA } from '../data/weddingData';

interface Scene3Props {
  onNavigateSection: (sectionId: string) => void;
}

export const Scene3Hero: React.FC<Scene3Props> = ({ onNavigateSection }) => {
  // Countdown Timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(WEDDING_DATA.meta.targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 pt-16 pb-24 overflow-hidden bg-gradient-to-b from-[#1C060A] via-[#340A13] to-[#1C060A]">
      {/* Decorative Jharokha top arch */}
      <div className="absolute top-0 inset-x-0 pointer-events-none opacity-40">
        <JharokhaCrown className="w-full text-antique-gold" />
      </div>

      {/* Floating Petal Shower Button in corner */}
      <div className="absolute top-4 left-4 z-30">
        <PetalShowerButton />
      </div>

      {/* Hero Header Content */}
      <div className="w-full max-w-xl mx-auto text-center z-10 flex flex-col items-center mt-4">
        {/* Sacred Mangalacharan */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-3"
        >
          <GaneshaMotif size={52} className="text-[#FCE8B2] mb-1 drop-shadow" />
          <p className="font-royal text-sm sm:text-base tracking-widest text-[#FCE8B2] font-bold uppercase drop-shadow-sm">
            {WEDDING_DATA.curtainIntro.om}
          </p>
          <p className="font-hindi text-xs text-[#EAD7BE] tracking-wide mt-0.5">
            माँ कुलदेवी आशापुरा की असीम अनुकम्पा से
          </p>
        </motion.div>

        {/* Authentic Chauhan Royal Crest */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="my-1"
        >
          <ChauhanCrest size="sm" showCaption={false} />
        </motion.div>

        {/* Shubh Vivah Calligraphy Banner */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="my-2"
        >
          <div className="inline-block px-7 py-1.5 rounded-full border-2 border-[#E6C98A] bg-gradient-to-r from-[#4A0B14] via-[#751221] to-[#4A0B14] shadow-[0_0_20px_rgba(230,201,138,0.4)]">
            <span className="font-royal text-lg sm:text-xl text-[#FFF4D0] tracking-widest font-bold">
              ॥ शुभ विवाह ॥
            </span>
          </div>
        </motion.div>

        {/* Royal Couple Names */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="my-3 space-y-1"
        >
          <h1 className="font-royal text-3xl sm:text-4xl text-[#FFF4D0] font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {WEDDING_DATA.couple.groom.name}
          </h1>
          <p className="font-royal text-sm text-[#EAD7BE] tracking-widest uppercase font-semibold">
            ({WEDDING_DATA.couple.groom.nickname})
          </p>

          <div className="flex items-center justify-center space-x-3 my-2">
            <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#E6C98A]" />
            <span className="font-royal text-base text-[#FCE8B2] font-bold italic">संग</span>
            <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#E6C98A]" />
          </div>

          <h2 className="font-royal text-3xl sm:text-4xl text-[#FFF4D0] font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {WEDDING_DATA.couple.bride.name}
          </h2>
          <p className="font-royal text-sm text-[#EAD7BE] tracking-widest uppercase font-semibold">
            ({WEDDING_DATA.couple.bride.nickname})
          </p>
        </motion.div>

        {/* Date and City */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="my-3"
        >
          <p className="font-royal text-lg sm:text-xl text-[#FFFDF9] font-bold tracking-wide">
            {WEDDING_DATA.meta.dateFormatted}
          </p>
          <p className="font-hindi text-sm sm:text-base text-[#EAD7BE] mt-0.5 font-medium">
            {WEDDING_DATA.meta.locationCity}
          </p>
          <p className="font-royal text-xs text-[#EAD7BE]/80 tracking-wider mt-1">
            {WEDDING_DATA.meta.samvat}
          </p>
        </motion.div>

        <RoyalDivider className="my-3" text="पधारो सा" />

        {/* Traditional Welcome Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-hindi text-sm sm:text-base text-ivory italic max-w-md px-4 leading-relaxed font-medium"
        >
          "पधारो सा, हमारे यहाँ आयोजित इस पावन एवं शाही विवाह उत्सव में आपका सपरिवार हार्दिक स्वागत एवं अभिनंदन है।"
        </motion.p>

        {/* LIVE WEDDING COUNTDOWN TIMER */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-full my-6 px-2"
        >
          <div className="p-4 rounded-2xl border-2 border-antique-gold/50 bg-[#340A13]/85 backdrop-blur-md shadow-royal-glow">
            <div className="flex items-center justify-center space-x-2 mb-3 text-[#FCE8B2]">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
              <span className="font-royal text-xs sm:text-sm tracking-widest uppercase font-bold">
                शुभ विवाह मुहुर्त की उल्टी गिनती
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm mx-auto text-center">
              {[
                { label: 'दिन', value: timeLeft.days },
                { label: 'घंटे', value: timeLeft.hours },
                { label: 'मिनट', value: timeLeft.minutes },
                { label: 'सेकंड', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:p-3 rounded-xl border border-antique-gold/40 bg-black/50 flex flex-col items-center"
                >
                  <span className="font-royal text-2xl sm:text-3xl font-bold text-[#FCE8B2] drop-shadow">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="font-hindi text-xs text-[#EAD7BE] mt-1 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Real-time Auspicious Visitor Counter Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mb-5"
        >
          <VisitorCounter
            variant="pill"
            onNavigateToLedger={() => onNavigateSection('visitor-ledger')}
          />
        </motion.div>

        {/* QUICK NAVIGATION ACTION PILLS */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-md px-2"
        >
          <button
            onClick={() => onNavigateSection('events-section')}
            className="flex-1 min-w-[130px] flex items-center justify-center space-x-2 py-2.5 px-3 rounded-full border border-antique-gold/70 bg-royal-maroon/90 hover:bg-royal-maroon text-[#FFF4D0] text-xs font-hindi font-semibold active:scale-95 transition-all shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 text-[#FCE8B2]" />
            <span>कार्यक्रम सूची</span>
          </button>

          <button
            onClick={() => onNavigateSection('venue-section')}
            className="flex-1 min-w-[130px] flex items-center justify-center space-x-2 py-2.5 px-3 rounded-full border border-antique-gold/70 bg-royal-maroon/90 hover:bg-royal-maroon text-[#FFF4D0] text-xs font-hindi font-semibold active:scale-95 transition-all shadow-md"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FCE8B2]" />
            <span>शुभ स्थल व मार्ग</span>
          </button>

          <button
            onClick={() => onNavigateSection('rsvp-section')}
            className="flex-1 min-w-[130px] flex items-center justify-center space-x-2 py-2.5 px-3 rounded-full border border-antique-gold/70 bg-royal-maroon/90 hover:bg-royal-maroon text-[#FFF4D0] text-xs font-hindi font-semibold active:scale-95 transition-all shadow-md"
          >
            <Heart className="w-3.5 h-3.5 text-[#FCE8B2]" />
            <span>आदर सहित RSVP</span>
          </button>

          <a
            href={WEDDING_DATA.meta.pdfDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[130px] flex items-center justify-center space-x-2 py-2.5 px-3 rounded-full border border-antique-gold/50 bg-black/60 hover:bg-black/80 text-[#EAD7BE] text-xs font-hindi font-semibold active:scale-95 transition-all shadow-md"
          >
            <FileText className="w-3.5 h-3.5 text-[#FCE8B2]" />
            <span>मूल पत्रिका (PDF)</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
