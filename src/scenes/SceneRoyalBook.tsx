import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Heart,
  FileText,
  Phone,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Copy,
  Check,
  MessageCircle,
  RotateCcw,
  BookOpen,
  Compass,
  Shield,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ChauhanCrest } from '../components/common/ChauhanCrest';
import { PetalShowerButton, triggerPetalShower } from '../components/common/PetalShower';
import { VisitorCounter } from '../components/common/VisitorCounter';

interface SceneRoyalBookProps {
  onReplay: () => void;
  initialPage?: number;
}

export const SceneRoyalBook: React.FC<SceneRoyalBookProps> = ({ onReplay, initialPage = 0 }) => {
  const { data, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [showTOC, setShowTOC] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [activeRelationTab, setActiveRelationTab] = useState<'nanihal' | 'sadu' | 'javai' | 'vishesh'>('nanihal');

  // Countdown State for Page 2
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // RSVP Form State for Page 9
  const [rsvpName, setRsvpName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [blessingText, setBlessingText] = useState('');
  const [rsvpError, setRsvpError] = useState('');
  const [hasBlessed, setHasBlessed] = useState(false);
  const [blessingsCount, setBlessingsCount] = useState(108);

  // Touch & Scroll references
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);
  const totalPages = 11; // Pages 0 to 10

  // Countdown timer effect
  useEffect(() => {
    const target = new Date(data.meta.targetDate).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60 * 60)) % 24),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data.meta.targetDate]);

  // Page Flip Navigation
  const turnNext = useCallback(() => {
    if (isFlipping || currentPage >= totalPages - 1) return;
    setIsFlipping(true);
    setFlipDirection('next');
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
      setIsFlipping(false);
    }, 650);
  }, [currentPage, isFlipping, totalPages]);

  const turnPrev = useCallback(() => {
    if (isFlipping || currentPage <= 0) return;
    setIsFlipping(true);
    setFlipDirection('prev');
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(0, prev - 1));
      setIsFlipping(false);
    }, 650);
  }, [currentPage, isFlipping]);

  const jumpToPage = (pageIndex: number) => {
    if (isFlipping || pageIndex === currentPage) return;
    setShowTOC(false);
    setIsFlipping(true);
    setFlipDirection(pageIndex > currentPage ? 'next' : 'prev');
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setIsFlipping(false);
    }, 600);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        turnNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        turnPrev();
      } else if (e.key === 'Escape') {
        setShowTOC(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [turnNext, turnPrev]);

  // Wheel Gesture Controller (Scroll Down = Next Page, Scroll Up = Prev Page)
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 700) return; // Debounce lock

    // Check if target is inside an inner scrollable container that hasn't reached bounds
    const target = e.target as HTMLElement;
    const scrollContainer = target.closest('.allow-inner-scroll');
    if (scrollContainer) {
      const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 8;
      const isAtTop = scrollContainer.scrollTop <= 8;
      if (e.deltaY > 0 && !isAtBottom) return;
      if (e.deltaY < 0 && !isAtTop) return;
    }

    if (e.deltaY > 30) {
      lastScrollTime.current = now;
      turnNext();
    } else if (e.deltaY < -30) {
      lastScrollTime.current = now;
      turnPrev();
    }
  };

  // Touch Swipe Controller (Swipe Up/Left = Next Page, Swipe Down/Right = Prev Page)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;

    // Check inner scroll bounds
    const target = e.target as HTMLElement;
    const scrollContainer = target.closest('.allow-inner-scroll');
    if (scrollContainer) {
      const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 10;
      const isAtTop = scrollContainer.scrollTop <= 10;
      if (diffY > 0 && !isAtBottom) return;
      if (diffY < 0 && !isAtTop) return;
    }

    // Vertical swipe or horizontal swipe thresholds
    if (diffY > 50 || diffX > 50) {
      turnNext();
    } else if (diffY < -50 || diffX < -50) {
      turnPrev();
    }
  };

  // Copy Address Handler
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${data.meta.venueName}, ${data.meta.venueAddress}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  // WhatsApp RSVP Handler
  const handleSendRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      setRsvpError(language === 'hi' ? 'कृपया अपना शुभ नाम दर्ज करें।' : 'Please enter your honorable name.');
      return;
    }
    setRsvpError('');

    let messageText = '';
    if (language === 'hi') {
      const attText = attendance === 'attending'
        ? 'सकुटुंब अवश्य पधारेंगे (शुभ विवाह में सम्मिलित होंगे)'
        : 'सस्नेह क्षमा — हम उपस्थित होने में असमर्थ हैं, वर-वधू को हार्दिक आशीष।';
      const countText = attendance === 'attending' ? `\n👥 कुल सदस्य: ${guestCount} महानुभाव` : '';
      messageText = `*शाही विवाह निमंत्रण प्रत्युत्तर (RSVP)*\n\n` +
        `परम आदरणीय ठा. राम सिंह जी चौहान एवं समस्त चौहान परिवार,\n\n` +
        `आयुष्मान देवराज सिंह चौहान संग आयुष्मति मधु कंवर के शुभ विवाह अवसर पर:\n\n` +
        `👤 *अतिथि / परिवार प्रमुख:* ${rsvpName.trim()}\n` +
        `✨ *उपस्थिति स्थिति:* ${attText}${countText}\n` +
        (blessingText.trim() ? `\n💖 *शुभाशीर्वाद:* "${blessingText.trim()}"\n` : '\n') +
        `स्थान: ${data.meta.venueName}, ${data.meta.locationCity}`;
    } else {
      const attText = attendance === 'attending'
        ? 'Attending with joy — We will surely grace the royal wedding.'
        : 'Regret unable to attend — Heartfelt blessings to the couple.';
      const countText = attendance === 'attending' ? `\n👥 Family Members: ${guestCount}` : '';
      messageText = `*Royal Rajputana Wedding RSVP*\n\n` +
        `To Thakur Ram Singh Ji Chauhan & The Entire Chauhan Family,\n\n` +
        `On the auspicious wedding of Devraj Singh Chauhan & Madhu Kanwar:\n\n` +
        `👤 *Guest / Family Head:* ${rsvpName.trim()}\n` +
        `✨ *Attendance Status:* ${attText}${countText}\n` +
        (blessingText.trim() ? `\n💖 *Blessings:* "${blessingText.trim()}"\n` : '\n') +
        `Venue: ${data.meta.venueName}, ${data.meta.locationCity}`;
    }

    const whatsappUrl = `https://wa.me/${data.meta.rsvpPhone}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstantBlessing = () => {
    if (!hasBlessed) {
      setHasBlessed(true);
      setBlessingsCount((prev) => prev + 1);
      triggerPetalShower();
    }
  };

  // Table of Contents Items
  const tocItems = [
    { page: 0, titleHi: 'मुखपृष्ठ (शाही कवर)', titleEn: 'Front Cover' },
    { page: 1, titleHi: 'मंगलाचरण एवं श्रीगणेश स्तुति', titleEn: 'Mangalacharan & Invocations' },
    { page: 2, titleHi: 'शुभ विवाह एवं शुभ लग्न मुहूर्त', titleEn: 'Royal Wedding & Muhurat' },
    { page: 3, titleHi: 'परिवार परिचय एवं कुल गौरव', titleEn: 'Family Heritage' },
    { page: 4, titleHi: 'मांगलिक कार्यक्रम (प्रथम चरण)', titleEn: 'Ceremonies — Part 1' },
    { page: 5, titleHi: 'मांगलिक कार्यक्रम (द्वितीय चरण व बारात)', titleEn: 'Ceremonies — Part 2 & Baraat' },
    { page: 6, titleHi: 'विवाह स्थल एवं मार्ग-दर्शन', titleEn: 'Venue & Directions' },
    { page: 7, titleHi: 'प्रेषक, स्वागतकर्ता एवं बाल मनुहार', titleEn: 'Chief Hosts & Inviters' },
    { page: 8, titleHi: 'ननिहाल, साढ़ू जी एवं जावई पक्ष', titleEn: 'Maternal Family & Relations' },
    { page: 9, titleHi: 'मंगल आशीष एवं WhatsApp RSVP', titleEn: 'Blessings & RSVP' },
    { page: 10, titleHi: 'शाही विदाई एवं कुलचिह्न', titleEn: 'Royal Farewell & Colophon' },
  ];

  /* ========================================================
     PAGE RENDERING FUNCTIONS (AUTENTIC RAJPUTANA STYLING)
     ======================================================== */

  // PAGE 0: FRONT COVER
  const renderPage0Cover = () => (
    <div className="w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-gradient-to-b from-[#2E050D] via-[#4F0B17] to-[#1E0308] text-ivory relative select-none">
      {/* Ornate Gold Border Frame */}
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/80 shadow-[inset_0_0_20px_rgba(199,161,90,0.3)] pointer-events-none" />
      <div className="absolute inset-5 rounded-xl border border-dashed border-antique-gold/40 pointer-events-none" />
      <div className="absolute top-2 left-2 text-antique-gold text-xs">❖</div>
      <div className="absolute top-2 right-2 text-antique-gold text-xs">❖</div>
      <div className="absolute bottom-2 left-2 text-antique-gold text-xs">❖</div>
      <div className="absolute bottom-2 right-2 text-antique-gold text-xs">❖</div>

      {/* Top Auspicious Invocation */}
      <div className="relative z-10 pt-2">
        <p className="font-royal text-xs sm:text-sm text-antique-gold-lighter tracking-widest font-bold uppercase drop-shadow">
          {data.curtainIntro.om}
        </p>
        <p className="font-hindi text-[11px] text-sandstone/90 mt-0.5">
          {data.cardReveal.kuldeviBlessing}
        </p>
      </div>

      {/* Center Royal Monogram & Chauhan Crest */}
      <div className="relative z-10 flex flex-col items-center my-auto py-2">
        {/* User-provided English DM Monogram */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-b from-antique-gold via-antique-gold-dark to-royal-maroon-dark shadow-2xl mb-3">
          <img
            src="/images/royal-dm-monogram.webp"
            alt="DM Royal Monogram"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h1 className="font-royal text-2xl sm:text-3xl font-bold text-antique-gold-lighter tracking-wider drop-shadow-lg">
          {language === 'hi' ? 'शाही विवाह निमंत्रण' : 'Royal Rajput Wedding'}
        </h1>

        <div className="flex items-center justify-center space-x-2 my-2">
          <div className="h-[1px] w-12 bg-antique-gold/60" />
          <span className="text-antique-gold text-xs">❖</span>
          <div className="h-[1px] w-12 bg-antique-gold/60" />
        </div>

        <div className="space-y-1">
          <p className="font-royal text-lg sm:text-xl font-bold text-white drop-shadow">
            {data.couple.groom.name}
          </p>
          <p className="font-royal text-xs text-antique-gold font-semibold italic">
            — {data.cardReveal.sangText} —
          </p>
          <p className="font-royal text-lg sm:text-xl font-bold text-white drop-shadow">
            {data.couple.bride.name}
          </p>
        </div>

        <p className="mt-3 font-hindi text-xs sm:text-sm text-sandstone font-medium">
          {data.meta.dateFormatted} • {data.meta.locationCity}
        </p>
      </div>

      {/* Bottom Cue to Turn Page */}
      <div className="relative z-10 pb-2 flex flex-col items-center">
        <button
          onClick={turnNext}
          className="group px-6 py-2 rounded-full border border-antique-gold/60 bg-royal-maroon-dark/80 text-antique-gold-lighter text-xs font-hindi tracking-wider font-semibold shadow-royal-glow hover:border-white active:scale-95 transition-all flex items-center space-x-2"
        >
          <span>{language === 'hi' ? 'पत्रिका खोलें' : 'Open Invitation'}</span>
          <ChevronRight className="w-4 h-4 text-antique-gold group-hover:translate-x-1 transition-transform" />
        </button>
        <span className="text-[10px] text-sandstone/70 font-hindi mt-1.5 animate-pulse-subtle">
          {language === 'hi' ? '↓ नीचे स्क्रॉल करें या स्वाइप करें' : '↓ Scroll down or swipe up to turn page'}
        </span>
      </div>
    </div>
  );

  // PAGE 1: MANGALACHARAN
  const renderPage1Mangalacharan = () => (
    <div className="w-full h-full flex flex-col items-center justify-between p-5 sm:p-6 text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F3E7D3] text-charcoal relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/70 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-dashed border-royal-maroon/20 pointer-events-none" />
      <div className="absolute top-2 left-2 text-antique-gold text-xs">❖</div>
      <div className="absolute top-2 right-2 text-antique-gold text-xs">❖</div>

      {/* Sacred Header */}
      <div className="relative z-10 pt-2">
        <span className="text-[11px] font-royal tracking-widest text-royal-maroon uppercase font-bold">
          {language === 'hi' ? '॥ मंगलाचरण ॥' : '॥ INVOCATION ॥'}
        </span>
        <div className="flex flex-wrap justify-center gap-1.5 mt-1.5">
          {data.invocations.map((inv, idx) => (
            <span key={idx} className="font-royal text-[11px] sm:text-xs text-royal-maroon-dark font-bold px-2 py-0.5 rounded bg-royal-maroon/5 border border-royal-maroon/15 shadow-xs">
              {inv}
            </span>
          ))}
        </div>
      </div>

      {/* Divine Ganesha Artwork & Shloka */}
      <div className="relative z-10 my-auto py-1 flex flex-col items-center max-w-sm">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2">
          <img
            src="/images/ganesha-divine-clean.png"
            alt="Shree Ganesha"
            className="w-full h-full object-contain drop-shadow"
          />
        </div>

        <div className="p-3.5 rounded-xl border-2 border-antique-gold/60 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] shadow-[0_4px_12px_rgba(133,94,36,0.1)] w-full">
          <p className="font-royal text-sm sm:text-base font-bold text-royal-maroon leading-relaxed">
            {data.shloka.sanskrit}
          </p>
          <div className="h-[1px] w-20 bg-antique-gold/50 mx-auto my-2" />
          <p className="font-hindi text-[11px] sm:text-xs text-charcoal/80 italic leading-relaxed">
            "{data.shloka.meaning}"
          </p>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-gradient-to-b from-royal-maroon-dark/95 to-royal-maroon/95 text-[#FFF4D0] border border-antique-gold/50 shadow-md text-center">
          <p className="font-royal text-xs font-bold text-antique-gold-lighter">
            {data.cardReveal.kuldeviBlessing}
          </p>
          <p className="font-hindi text-xs text-sandstone-light mt-1 leading-relaxed">
            {data.cardReveal.invitationNote}
          </p>
        </div>
      </div>

      {/* Footer Page Number */}
      <div className="relative z-10 text-[11px] font-hindi text-charcoal/60">
        {language === 'hi' ? '— पृष्ठ १ —' : '— Page 1 —'}
      </div>
    </div>
  );

  // PAGE 2: SHUBH VIVAH & MUHURAT COUNTDOWN
  const renderPage2ShubhVivah = () => (
    <div className="w-full h-full flex flex-col items-center justify-between p-4 sm:p-5 text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F3E7D3] text-charcoal relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/70 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-dashed border-royal-maroon/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-1">
        <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
          {language === 'hi' ? '॥ श्री गणेशाय नमः ॥' : '॥ SHREE GANESHAY NAMAH ॥'}
        </span>
        <h2 className="font-royal text-xl sm:text-2xl font-bold text-royal-maroon mt-0.5">
          {language === 'hi' ? 'शुभ विवाह' : 'Royal Wedding'}
        </h2>
      </div>

      {/* Couple Formal Details */}
      <div className="relative z-10 my-auto w-full max-w-sm space-y-2">
        {/* Groom Box */}
        <div className="rounded-xl border-2 border-antique-gold/70 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] shadow-[0_4px_12px_rgba(133,94,36,0.1)] overflow-hidden text-center">
          <div className="bg-gradient-to-r from-[#4A0A14] via-[#6B0D1E] to-[#4A0A14] text-[#F9EFCF] py-1 px-3 border-b border-antique-gold/60 flex items-center justify-between">
            <span className="text-[10px] font-royal font-bold uppercase tracking-wider">
              {data.cardReveal.groomLabel}
            </span>
            <span className="text-[9px] font-royal text-antique-gold tracking-widest">
              {language === 'hi' ? 'चौहान राजवंश' : 'Chauhan Dynasty'}
            </span>
          </div>
          <div className="p-2.5">
            <h3 className="font-royal text-base sm:text-lg font-bold text-royal-maroon-dark">
              {data.couple.groom.name}
            </h3>
            <p className="font-hindi text-xs text-charcoal/85 font-medium mt-0.5">
              {data.cardReveal.sonOf} <span className="font-semibold text-royal-maroon">{data.couple.groom.father}</span>
            </p>
            <p className="font-hindi text-[11px] text-charcoal/70">
              {data.couple.groom.grandparents}
            </p>
            <p className="font-hindi text-[11px] text-royal-maroon font-semibold mt-0.5">
              {data.couple.groom.thikana}
            </p>
          </div>
        </div>

        {/* Sang Divider */}
        <div className="flex items-center justify-center space-x-2 my-0.5">
          <div className="h-[1px] w-12 bg-antique-gold/60" />
          <span className="font-royal text-xs font-bold text-royal-maroon italic">
            — {data.cardReveal.sangText} —
          </span>
          <div className="h-[1px] w-12 bg-antique-gold/60" />
        </div>

        {/* Bride Box */}
        <div className="rounded-xl border-2 border-antique-gold/70 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] shadow-[0_4px_12px_rgba(133,94,36,0.1)] overflow-hidden text-center">
          <div className="bg-gradient-to-r from-[#4A0A14] via-[#6B0D1E] to-[#4A0A14] text-[#F9EFCF] py-1 px-3 border-b border-antique-gold/60 flex items-center justify-between">
            <span className="text-[10px] font-royal font-bold uppercase tracking-wider">
              {data.cardReveal.brideLabel}
            </span>
            <span className="text-[9px] font-royal text-antique-gold tracking-widest">
              {language === 'hi' ? 'राणावत राजवंश' : 'Ranawat Dynasty'}
            </span>
          </div>
          <div className="p-2.5">
            <h3 className="font-royal text-base sm:text-lg font-bold text-royal-maroon-dark">
              {data.couple.bride.name}
            </h3>
            <p className="font-hindi text-xs text-charcoal/85 font-medium mt-0.5">
              {data.cardReveal.daughterOf} <span className="font-semibold text-royal-maroon">{data.couple.bride.father}</span>
            </p>
            <p className="font-hindi text-[11px] text-charcoal/70">
              {data.couple.bride.grandparents}
            </p>
            <p className="font-hindi text-[11px] text-royal-maroon font-semibold mt-0.5">
              {data.couple.bride.thikana}
            </p>
          </div>
        </div>

        {/* Date, Muhurat & Vikram Samvat */}
        <div className="p-2 rounded-lg bg-royal-maroon/8 border border-royal-maroon/20 text-center">
          <p className="font-royal text-xs sm:text-sm font-bold text-royal-maroon">
            {data.meta.dateFormatted}
          </p>
          <p className="font-hindi text-[11px] text-charcoal/80 mt-0.5">
            {data.meta.samvat}
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center justify-center space-x-2 pt-0.5">
          {[
            { label: language === 'hi' ? 'दिन' : 'Days', val: timeLeft.days },
            { label: language === 'hi' ? 'घंटे' : 'Hrs', val: timeLeft.hours },
            { label: language === 'hi' ? 'मिनट' : 'Min', val: timeLeft.minutes },
            { label: language === 'hi' ? 'सेकंड' : 'Sec', val: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center px-2 py-1 rounded-lg bg-gradient-to-b from-[#FFFDF8] to-[#FAF3E7] border border-antique-gold/60 shadow-xs min-w-[50px]">
              <span className="font-royal text-sm font-bold text-royal-maroon">{item.val}</span>
              <span className="text-[9px] font-hindi text-charcoal/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-[11px] font-hindi text-charcoal/60">
        {language === 'hi' ? '— पृष्ठ २ —' : '— Page 2 —'}
      </div>
    </div>
  );

  // PAGE 3: FAMILY HERITAGE & LINEAGE (CRITICAL REDESIGN: NO EMPTY GAPS, RICH HERALDIC PANELS)
  const renderPage3FamilyHeritage = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F3E7D3] text-charcoal relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/75 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-dashed border-royal-maroon/20 pointer-events-none" />
      <div className="absolute top-2 left-2 text-antique-gold text-xs">❖</div>
      <div className="absolute top-2 right-2 text-antique-gold text-xs">❖</div>

      {/* Header (Anchored without empty gap) */}
      <div className="relative z-10 pt-1">
        <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
          {language === 'hi' ? '॥ कुल एवं वंश गौरव ॥' : '॥ ROYAL LINEAGE ॥'}
        </span>
        <h2 className="font-royal text-xl sm:text-2xl font-bold text-royal-maroon mt-0.5">
          {language === 'hi' ? 'परिवार परिचय' : 'Family Heritage'}
        </h2>
        <div className="flex items-center justify-center space-x-2 my-1">
          <div className="h-[1px] w-12 bg-antique-gold/60" />
          <span className="text-antique-gold text-xs">❖</span>
          <div className="h-[1px] w-12 bg-antique-gold/60" />
        </div>
      </div>

      {/* Lineage Details: Rich Rajputana Heraldic Panels */}
      <div className="relative z-10 my-auto w-full max-w-sm space-y-2.5 text-left allow-inner-scroll overflow-y-auto max-h-[calc(78vh-115px)] pr-0.5">
        {/* Var Paksh — Chauhan Dynasty */}
        <div className="rounded-xl border-2 border-antique-gold/75 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] shadow-[0_4px_14px_rgba(133,94,36,0.12)] overflow-hidden">
          <div className="bg-gradient-to-r from-[#420610] via-[#660C1D] to-[#420610] text-[#F9EFCF] px-3.5 py-1.5 border-b border-antique-gold flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-3.5 h-3.5 text-antique-gold" />
              <span className="font-royal text-xs font-bold tracking-wider uppercase">
                {language === 'hi' ? 'वर पक्ष — चौहान राजवंश (सूर्यवंशी)' : "Groom's Lineage — Chauhan"}
              </span>
            </div>
            <span className="text-[10px] text-antique-gold font-royal font-semibold tracking-wider px-2 py-0.5 rounded bg-black/25 border border-antique-gold/30">
              {language === 'hi' ? 'ठि. फलीचड़ा' : 'Thi. Falichada'}
            </span>
          </div>

          <div className="p-3 text-xs font-hindi space-y-1.5 text-charcoal/90">
            <div className="flex items-start justify-between border-b border-royal-maroon/10 pb-1">
              <span className="font-semibold text-royal-maroon">{language === 'hi' ? 'वर:' : 'Groom:'}</span>
              <span className="font-bold text-royal-maroon-dark text-right">{data.couple.groom.name} <span className="text-antique-gold-dark font-medium">({data.couple.groom.nickname})</span></span>
            </div>
            <div className="flex items-start justify-between border-b border-royal-maroon/10 pb-1">
              <span className="font-semibold text-charcoal/80">{language === 'hi' ? 'पिता:' : 'Father:'}</span>
              <span className="font-medium text-charcoal text-right">{data.couple.groom.father}</span>
            </div>
            <div className="flex items-start justify-between border-b border-royal-maroon/10 pb-1">
              <span className="font-semibold text-charcoal/80">{language === 'hi' ? 'माता:' : 'Mother:'}</span>
              <span className="font-medium text-charcoal text-right">{data.couple.groom.mother || 'श्रीमती संतोष कंवर चौहान'}</span>
            </div>
            <div className="flex items-start justify-between border-b border-royal-maroon/10 pb-1">
              <span className="font-semibold text-charcoal/80">{language === 'hi' ? 'दादाजी:' : 'Grandfather:'}</span>
              <span className="font-medium text-charcoal text-right">{data.couple.groom.grandparents}</span>
            </div>
            <div className="flex items-start justify-between pt-0.5">
              <span className="font-semibold text-royal-maroon">{language === 'hi' ? 'मूल ठिकाना:' : 'Thikana:'}</span>
              <span className="font-bold text-royal-maroon text-right">{data.couple.groom.thikana} <span className="block text-[10px] font-normal text-charcoal/60">({data.couple.groom.presentAddress})</span></span>
            </div>
          </div>
        </div>

        {/* Vadhu Paksh — Ranawat Dynasty */}
        <div className="rounded-xl border-2 border-antique-gold/75 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] shadow-[0_4px_14px_rgba(133,94,36,0.12)] overflow-hidden">
          <div className="bg-gradient-to-r from-[#420610] via-[#660C1D] to-[#420610] text-[#F9EFCF] px-3.5 py-1.5 border-b border-antique-gold flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-3.5 h-3.5 text-antique-gold" />
              <span className="font-royal text-xs font-bold tracking-wider uppercase">
                {language === 'hi' ? 'वधू पक्ष — राणावत राजवंश (मेवाड़)' : "Bride's Lineage — Ranawat"}
              </span>
            </div>
            <span className="text-[10px] text-antique-gold font-royal font-semibold tracking-wider px-2 py-0.5 rounded bg-black/25 border border-antique-gold/30">
              {language === 'hi' ? 'ठि. लागच' : 'Thi. Lagach'}
            </span>
          </div>

          <div className="p-3 text-xs font-hindi space-y-1.5 text-charcoal/90">
            <div className="flex items-start justify-between border-b border-royal-maroon/10 pb-1">
              <span className="font-semibold text-royal-maroon">{language === 'hi' ? 'वधू:' : 'Bride:'}</span>
              <span className="font-bold text-royal-maroon-dark text-right">{data.couple.bride.name} <span className="text-antique-gold-dark font-medium">({data.couple.bride.nickname})</span></span>
            </div>
            <div className="flex items-start justify-between border-b border-royal-maroon/10 pb-1">
              <span className="font-semibold text-charcoal/80">{language === 'hi' ? 'पिता:' : 'Father:'}</span>
              <span className="font-medium text-charcoal text-right">{data.couple.bride.father}</span>
            </div>
            <div className="flex items-start justify-between border-b border-royal-maroon/10 pb-1">
              <span className="font-semibold text-charcoal/80">{language === 'hi' ? 'दादाजी:' : 'Grandfather:'}</span>
              <span className="font-medium text-charcoal text-right">{data.couple.bride.grandparents}</span>
            </div>
            <div className="flex items-start justify-between pt-0.5">
              <span className="font-semibold text-royal-maroon">{language === 'hi' ? 'मूल ठिकाना:' : 'Thikana:'}</span>
              <span className="font-bold text-royal-maroon text-right">{data.couple.bride.thikana}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-[11px] font-hindi text-charcoal/60 pt-1">
        {language === 'hi' ? '— पृष्ठ ३ —' : '— Page 3 —'}
      </div>
    </div>
  );

  // PAGE 4: CEREMONIES PART 1 (EVENTS 1 TO 4 WITH FULL TITHI, DRESS CODE, & DESCRIPTIONS)
  const renderPage4EventsPart1 = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F3E7D3] text-charcoal relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/75 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-dashed border-royal-maroon/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-1">
        <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
          {language === 'hi' ? '॥ मांगलिक कार्यक्रम ॥' : '॥ CEREMONIAL SCHEDULE ॥'}
        </span>
        <h2 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon mt-0.5">
          {language === 'hi' ? 'शुभ विवाह कार्यक्रम (प्रथम चरण)' : 'Wedding Ceremonies (Part 1)'}
        </h2>
        <div className="flex items-center justify-center space-x-2 my-1">
          <div className="h-[1px] w-12 bg-antique-gold/60" />
          <span className="text-antique-gold text-xs">❖</span>
          <div className="h-[1px] w-12 bg-antique-gold/60" />
        </div>
      </div>

      {/* Ceremonies List 1 to 4 with complete restored info */}
      <div className="relative z-10 my-auto w-full max-w-sm space-y-2.5 text-left allow-inner-scroll overflow-y-auto max-h-[calc(78vh-115px)] pr-0.5">
        {data.events.slice(0, 4).map((evt, idx) => (
          <div
            key={evt.id}
            className="rounded-xl border-2 border-antique-gold/60 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] shadow-[0_3px_10px_rgba(133,94,36,0.1)] p-2.5 sm:p-3"
          >
            {/* Header: Number, Name, and Badges */}
            <div className="flex items-start justify-between gap-2 border-b border-royal-maroon/10 pb-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-royal-maroon text-antique-gold-lighter flex items-center justify-center font-royal text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <h4 className="font-royal text-xs sm:text-sm font-bold text-royal-maroon">
                  {evt.name}
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-royal-maroon text-[#FFF4D0] font-royal text-[10px] font-bold shrink-0 shadow-xs">
                {evt.time}
              </span>
            </div>

            {/* Subline: Date, Day & Hindu Lunar Tithi */}
            <div className="flex items-center justify-between text-[11px] font-hindi text-charcoal/80 mt-1">
              <span className="font-semibold text-royal-maroon-dark">{evt.day}, {evt.date}</span>
              <span className="px-1.5 py-0.2 rounded bg-antique-gold/20 text-royal-maroon text-[10px] font-royal font-semibold">
                {evt.tithi}
              </span>
            </div>

            {/* Description */}
            <p className="font-hindi text-[11px] text-charcoal/80 mt-1 leading-relaxed">
              {evt.description}
            </p>

            {/* Dress Code Pill */}
            {evt.dressCodeSuggestion && (
              <div className="mt-1.5 pt-1 border-t border-antique-gold/25 flex items-center space-x-1.5 text-[10px] font-hindi text-antique-gold-dark font-medium">
                <Sparkles className="w-3 h-3 text-antique-gold" />
                <span>{evt.dressCodeSuggestion}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-[11px] font-hindi text-charcoal/60 pt-1">
        {language === 'hi' ? '— पृष्ठ ४ —' : '— Page 4 —'}
      </div>
    </div>
  );

  // PAGE 5: CEREMONIES PART 2 & GRAND WEDDING DAY
  const renderPage5EventsPart2 = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F3E7D3] text-charcoal relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/75 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-dashed border-royal-maroon/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-1">
        <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
          {language === 'hi' ? '॥ मांगलिक कार्यक्रम ॥' : '॥ CEREMONIAL SCHEDULE ॥'}
        </span>
        <h2 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon mt-0.5">
          {language === 'hi' ? 'शुभ विवाह कार्यक्रम (द्वितीय चरण)' : 'Wedding Ceremonies (Part 2)'}
        </h2>
        <div className="flex items-center justify-center space-x-2 my-1">
          <div className="h-[1px] w-12 bg-antique-gold/60" />
          <span className="text-antique-gold text-xs">❖</span>
          <div className="h-[1px] w-12 bg-antique-gold/60" />
        </div>
      </div>

      {/* Ceremonies List 5 to 8 & Baraat with complete restored info */}
      <div className="relative z-10 my-auto w-full max-w-sm space-y-2.5 text-left allow-inner-scroll overflow-y-auto max-h-[calc(78vh-115px)] pr-0.5">
        {data.events.slice(4, 8).map((evt, idx) => (
          <div
            key={evt.id}
            className="rounded-xl border-2 border-antique-gold/60 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] shadow-[0_3px_10px_rgba(133,94,36,0.1)] p-2.5 sm:p-3"
          >
            {/* Header: Number, Name, and Badges */}
            <div className="flex items-start justify-between gap-2 border-b border-royal-maroon/10 pb-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-royal-maroon text-antique-gold-lighter flex items-center justify-center font-royal text-xs font-bold shrink-0">
                  {idx + 5}
                </span>
                <h4 className="font-royal text-xs sm:text-sm font-bold text-royal-maroon">
                  {evt.name}
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-royal-maroon text-[#FFF4D0] font-royal text-[10px] font-bold shrink-0 shadow-xs">
                {evt.time}
              </span>
            </div>

            {/* Subline: Date, Day & Hindu Lunar Tithi */}
            <div className="flex items-center justify-between text-[11px] font-hindi text-charcoal/80 mt-1">
              <span className="font-semibold text-royal-maroon-dark">{evt.day}, {evt.date}</span>
              <span className="px-1.5 py-0.2 rounded bg-antique-gold/20 text-royal-maroon text-[10px] font-royal font-semibold">
                {evt.tithi}
              </span>
            </div>

            {/* Description */}
            <p className="font-hindi text-[11px] text-charcoal/80 mt-1 leading-relaxed">
              {evt.description}
            </p>

            {/* Dress Code Pill */}
            {evt.dressCodeSuggestion && (
              <div className="mt-1.5 pt-1 border-t border-antique-gold/25 flex items-center space-x-1.5 text-[10px] font-hindi text-antique-gold-dark font-medium">
                <Sparkles className="w-3 h-3 text-antique-gold" />
                <span>{evt.dressCodeSuggestion}</span>
              </div>
            )}
          </div>
        ))}

        {/* Preeti Bhoj & Baraat Highlight Box */}
        <div className="rounded-xl border-2 border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-[#FFF4D0] p-3 shadow-md space-y-1.5 text-center">
          <div className="flex items-center justify-center space-x-1.5 text-antique-gold text-xs font-royal font-bold">
            <span>👑</span>
            <span>{language === 'hi' ? 'शाही बारात प्रस्थान एवं प्रीतिभोज' : 'Royal Baraat & Reception'}</span>
            <span>👑</span>
          </div>
          <p className="font-hindi text-xs font-semibold text-white">
            {language === 'hi' ? 'बारात प्रस्थान: शनिवार, 21 नवम्बर 2026 • प्रातः 05:30 बजे (ठि. चन्देरिया की ओर)' : 'Baraat Departure: Sat, 21 Nov 2026 • 5:30 AM (Towards Thi. Chanderiya)'}
          </p>
          <div className="h-[1px] w-24 bg-antique-gold/50 mx-auto" />
          <p className="font-royal text-xs text-antique-gold-lighter font-bold">
            {language === 'hi' ? 'प्रीतिभोज:' : 'Preeti Bhoj:'} {data.reception.day}, {data.reception.date} ({data.reception.time})
          </p>
          <p className="font-hindi text-[11px] text-sandstone">
            {data.meta.venueName}, {data.meta.locationCity}
          </p>
        </div>
      </div>

      <div className="relative z-10 text-[11px] font-hindi text-charcoal/60 pt-1">
        {language === 'hi' ? '— पृष्ठ ५ —' : '— Page 5 —'}
      </div>
    </div>
  );

  // PAGE 6: VENUE & DIRECTIONS
  const renderPage6Venue = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F3E7D3] text-charcoal relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/75 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-dashed border-royal-maroon/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-1">
        <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
          {language === 'hi' ? '॥ विवाह स्थल ॥' : '॥ WEDDING VENUE ॥'}
        </span>
        <h2 className="font-royal text-xl sm:text-2xl font-bold text-royal-maroon mt-0.5">
          {data.meta.venueName}
        </h2>
        <div className="flex items-center justify-center space-x-2 my-1">
          <div className="h-[1px] w-12 bg-antique-gold/60" />
          <span className="text-antique-gold text-xs">❖</span>
          <div className="h-[1px] w-12 bg-antique-gold/60" />
        </div>
      </div>

      {/* Venue Content & Actions */}
      <div className="relative z-10 my-auto w-full max-w-sm space-y-3">
        <div className="rounded-xl border-2 border-antique-gold/70 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] shadow-[0_4px_14px_rgba(133,94,36,0.12)] p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-royal-maroon text-antique-gold flex items-center justify-center mx-auto mb-2.5 shadow-md">
            <MapPin className="w-6 h-6 text-antique-gold" />
          </div>
          <h3 className="font-royal text-base sm:text-lg font-bold text-royal-maroon">
            {data.meta.venueName}
          </h3>
          <p className="font-hindi text-xs sm:text-sm text-charcoal/85 mt-1 leading-relaxed">
            {data.meta.venueAddress}
          </p>
          <div className="mt-2.5 pt-2 border-t border-antique-gold/30">
            <span className="px-2.5 py-0.5 rounded-full bg-royal-maroon/10 text-royal-maroon font-hindi text-xs font-semibold">
              {language === 'hi' ? 'भीलवाड़ा, राजस्थान' : 'Bhilwara, Rajasthan'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Google Maps Button */}
          <a
            href={data.meta.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl border-2 border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-[#FFF4D0] font-hindi text-xs sm:text-sm font-semibold shadow-md hover:border-white active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4 text-antique-gold" />
            <span>{language === 'hi' ? 'Google Maps पर दिशा-निर्देश देखें' : 'Open in Google Maps'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Copy Address Button */}
          <button
            onClick={handleCopyAddress}
            className="w-full py-2 px-4 rounded-xl border border-royal-maroon/30 bg-white/95 text-royal-maroon font-hindi text-xs font-semibold hover:bg-white active:scale-95 transition-all flex items-center justify-center space-x-1.5 shadow-xs"
          >
            {copiedAddress ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAddress ? (language === 'hi' ? 'पता कॉपी हो गया!' : 'Address Copied!') : (language === 'hi' ? 'पता कॉपी करें' : 'Copy Address')}</span>
          </button>

          {/* Contact Phone */}
          <div className="pt-1 flex items-center justify-center space-x-2 text-xs font-hindi text-charcoal/80">
            <Phone className="w-3.5 h-3.5 text-royal-maroon" />
            <span>{language === 'hi' ? 'संपर्क सूत्र:' : 'Contact:'}</span>
            <a href="tel:+916377273385" className="hover:text-royal-maroon font-bold text-royal-maroon underline">
              +91 6377273385
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-[11px] font-hindi text-charcoal/60 pt-1">
        {language === 'hi' ? '— पृष्ठ ६ —' : '— Page 6 —'}
      </div>
    </div>
  );

  // PAGE 7: CHIEF INVITERS & SOLICITATIONS
  const renderPage7ChiefHosts = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F3E7D3] text-charcoal relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/75 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-dashed border-royal-maroon/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-1">
        <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
          {language === 'hi' ? '॥ मुख्य आमंत्रक ॥' : '॥ CHIEF HOSTS ॥'}
        </span>
        <h2 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon mt-0.5">
          {data.family.preshakTitle}
        </h2>
        <div className="flex items-center justify-center space-x-2 my-1">
          <div className="h-[1px] w-12 bg-antique-gold/60" />
          <span className="text-antique-gold text-xs">❖</span>
          <div className="h-[1px] w-12 bg-antique-gold/60" />
        </div>
      </div>

      {/* Hosts & Meethi Manuhar */}
      <div className="relative z-10 my-auto w-full max-w-sm space-y-2 text-left allow-inner-scroll overflow-y-auto max-h-[calc(78vh-115px)] pr-0.5">
        {/* Preshak List */}
        <div className="rounded-xl border-2 border-antique-gold/60 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] p-3 shadow-sm">
          <div className="text-xs font-royal font-bold text-royal-maroon uppercase mb-1.5 pb-1 border-b border-royal-maroon/15">
            {language === 'hi' ? 'प्रेषक परिवार' : 'Preshak (Inviters)'}
          </div>
          <ul className="text-xs font-hindi space-y-1.5 text-charcoal/90">
            {data.family.preshak.map((p, i) => (
              <li key={i} className="flex items-center space-x-2">
                <span className="text-antique-gold text-xs">❖</span>
                <span className="font-semibold">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Meethi Manuhar */}
        <div className="rounded-xl border-2 border-antique-gold/60 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] p-3 shadow-sm space-y-2">
          <div>
            <p className="font-royal text-xs font-bold text-royal-maroon">
              {data.family.meethiManuhar.dadosa.quote}
            </p>
            <p className="font-hindi text-[11px] text-charcoal/80 mt-0.5">
              {data.family.meethiManuhar.dadosa.names.join(', ')}
            </p>
          </div>
          <div className="border-t border-royal-maroon/10 pt-1.5">
            <p className="font-royal text-xs font-bold text-royal-maroon">
              {data.family.meethiManuhar.choteBhai.quote}
            </p>
            <p className="font-hindi text-[11px] text-charcoal/80 mt-0.5">
              {data.family.meethiManuhar.choteBhai.names.join(', ')}
            </p>
          </div>
        </div>

        {/* Swagatakankshi */}
        <div className="rounded-xl border border-antique-gold/40 bg-white/70 p-2.5 text-center">
          <p className="font-royal text-[11px] font-bold text-royal-maroon">
            {data.family.swagatakankshiTitle}: <span className="font-hindi font-normal text-charcoal">{data.family.swagatakankshi}</span>
          </p>
        </div>
      </div>

      <div className="relative z-10 text-[11px] font-hindi text-charcoal/60 pt-1">
        {language === 'hi' ? '— पृष्ठ ७ —' : '— Page 7 —'}
      </div>
    </div>
  );

  // PAGE 8: NANIHAL, SADU JI & RELATIONS
  const renderPage8Relations = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F3E7D3] text-charcoal relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/75 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-dashed border-royal-maroon/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-1">
        <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
          {language === 'hi' ? '॥ पारिवारिक स्नेह ॥' : '॥ FAMILY RELATIONS ॥'}
        </span>
        <h2 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon mt-0.5">
          {language === 'hi' ? 'ननिहाल एवं रिश्तेदार' : 'Maternal Family & Relations'}
        </h2>
        <div className="flex items-center justify-center space-x-2 my-1">
          <div className="h-[1px] w-12 bg-antique-gold/60" />
          <span className="text-antique-gold text-xs">❖</span>
          <div className="h-[1px] w-12 bg-antique-gold/60" />
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 w-full max-w-sm my-auto">
        <div className="flex rounded-xl bg-royal-maroon/10 p-1 mb-2 border border-antique-gold/40">
          {[
            { id: 'nanihal', label: language === 'hi' ? 'ननिहाल' : 'Nanihal' },
            { id: 'sadu', label: language === 'hi' ? 'साढ़ू जी' : 'Sadu Ji' },
            { id: 'javai', label: language === 'hi' ? 'जंवाई' : 'Javai' },
            { id: 'vishesh', label: language === 'hi' ? 'आग्रह' : 'Vishesh' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRelationTab(tab.id as typeof activeRelationTab)}
              className={`flex-1 py-1 text-[11px] font-hindi font-medium rounded-lg transition-all ${
                activeRelationTab === tab.id
                  ? 'bg-royal-maroon text-antique-gold-lighter font-bold shadow-xs'
                  : 'text-charcoal/70 hover:text-royal-maroon'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="rounded-xl border-2 border-antique-gold/60 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] p-3 text-left max-h-[44vh] overflow-y-auto allow-inner-scroll shadow-sm">
          {activeRelationTab === 'nanihal' && (
            <div className="space-y-2 text-xs font-hindi">
              {data.family.nanihal.map((item, i) => (
                <div key={i} className="pb-1.5 border-b border-royal-maroon/10 last:border-none">
                  <p className="font-semibold text-royal-maroon">{item.line}</p>
                  <p className="text-[11px] text-charcoal/70 mt-0.5">{item.thikana}</p>
                </div>
              ))}
            </div>
          )}

          {activeRelationTab === 'sadu' && (
            <div className="space-y-2 text-xs font-hindi">
              {data.family.saduJi.map((item, i) => (
                <div key={i} className="pb-1.5 border-b border-royal-maroon/10 last:border-none">
                  <p className="font-semibold text-royal-maroon">{item.line}</p>
                  <p className="text-[11px] text-charcoal/70 mt-0.5">{item.subline}</p>
                </div>
              ))}
            </div>
          )}

          {activeRelationTab === 'javai' && (
            <ul className="space-y-1.5 text-xs font-hindi">
              {data.family.javaiPaksh.map((m, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <span className="text-antique-gold text-xs mt-0.5">❖</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          )}

          {activeRelationTab === 'vishesh' && (
            <ul className="space-y-1.5 text-xs font-hindi">
              {data.family.visheshAagrah.map((m, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <span className="text-antique-gold text-xs mt-0.5">❖</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="relative z-10 text-[11px] font-hindi text-charcoal/60 pt-1">
        {language === 'hi' ? '— पृष्ठ ८ —' : '— Page 8 —'}
      </div>
    </div>
  );

  // PAGE 9: RSVP & BLESSINGS
  const renderPage9RSVP = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E9] to-[#F3E7D3] text-charcoal relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/75 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-dashed border-royal-maroon/20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-1">
        <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
          {language === 'hi' ? '॥ मंगल आशीष एवं उपस्थिति ॥' : '॥ RSVP & BLESSINGS ॥'}
        </span>
        <h2 className="font-royal text-lg sm:text-xl font-bold text-royal-maroon mt-0.5">
          {language === 'hi' ? 'शुभकामनाएं व WhatsApp RSVP' : 'Send RSVP via WhatsApp'}
        </h2>
        <div className="flex items-center justify-center space-x-2 my-1">
          <div className="h-[1px] w-12 bg-antique-gold/60" />
          <span className="text-antique-gold text-xs">❖</span>
          <div className="h-[1px] w-12 bg-antique-gold/60" />
        </div>
      </div>

      {/* RSVP Mini Form */}
      <div className="relative z-10 my-auto w-full max-w-sm">
        <form onSubmit={handleSendRSVP} className="rounded-xl border-2 border-antique-gold/70 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E7] to-[#F5EAD6] shadow-sm p-3.5 text-left space-y-2">
          <div>
            <label className="block text-[11px] font-hindi font-semibold text-royal-maroon mb-1">
              {language === 'hi' ? 'आपका शुभ नाम *' : 'Your Honorable Name *'}
            </label>
            <input
              type="text"
              value={rsvpName}
              onChange={(e) => setRsvpName(e.target.value)}
              placeholder={language === 'hi' ? 'जैसे: ठा. सा. ...' : 'e.g., Mr. & Mrs. ...'}
              className="w-full px-2.5 py-1.5 text-xs font-hindi rounded-lg border border-royal-maroon/25 bg-white focus:outline-none focus:border-royal-maroon"
            />
            {rsvpError && <p className="text-[10px] text-red-600 mt-0.5">{rsvpError}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-hindi">
            <button
              type="button"
              onClick={() => setAttendance('attending')}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                attendance === 'attending'
                  ? 'border-royal-maroon bg-royal-maroon text-white font-semibold shadow-xs'
                  : 'border-royal-maroon/20 bg-white/70 text-charcoal/80'
              }`}
            >
              {language === 'hi' ? '✅ अवश्य पधारेंगे' : '✅ Attending'}
            </button>
            <button
              type="button"
              onClick={() => setAttendance('not_attending')}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                attendance === 'not_attending'
                  ? 'border-royal-maroon bg-royal-maroon text-white font-semibold shadow-xs'
                  : 'border-royal-maroon/20 bg-white/70 text-charcoal/80'
              }`}
            >
              {language === 'hi' ? '🙏 असमर्थ' : '🙏 Regret'}
            </button>
          </div>

          {attendance === 'attending' && (
            <div className="flex items-center justify-between text-xs font-hindi pt-0.5">
              <span className="text-charcoal/80">{language === 'hi' ? 'सदस्य संख्या:' : 'Guests:'}</span>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3, 4, 5].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setGuestCount(cnt)}
                    className={`w-6 h-6 rounded-md text-xs font-bold transition-all ${
                      guestCount === cnt ? 'bg-royal-maroon text-antique-gold' : 'bg-royal-maroon/10 text-royal-maroon'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-hindi font-semibold text-royal-maroon mb-1">
              {language === 'hi' ? 'वर-वधू हेतु शुभाशीर्वाद (वैकल्पिक)' : 'Blessing for Couple (Optional)'}
            </label>
            <input
              type="text"
              value={blessingText}
              onChange={(e) => setBlessingText(e.target.value)}
              placeholder={language === 'hi' ? 'सदा सुहागन रहो...' : 'Heartiest congratulations...'}
              className="w-full px-2.5 py-1 text-xs font-hindi rounded-lg border border-royal-maroon/25 bg-white focus:outline-none focus:border-royal-maroon"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl border border-antique-gold bg-gradient-to-r from-royal-maroon-dark to-royal-maroon text-white text-xs font-hindi font-bold flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-antique-gold" />
            <span>{language === 'hi' ? 'WhatsApp पर RSVP भेजें' : 'Send via WhatsApp'}</span>
          </button>
        </form>

        {/* Instant Blessing Tap */}
        <div className="mt-2.5 flex items-center justify-between p-2.5 rounded-xl border border-antique-gold/50 bg-gradient-to-b from-[#FFFDF8] to-[#FAF3E7] shadow-xs">
          <span className="text-xs font-hindi text-charcoal/80">
            {language === 'hi' ? 'वर-वधू को पुष्प आशीष दें:' : 'Bless the Couple:'}
          </span>
          <button
            onClick={handleInstantBlessing}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-hindi font-bold transition-all ${
              hasBlessed ? 'bg-red-600 text-white' : 'bg-white border border-antique-gold text-royal-maroon shadow-xs'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${hasBlessed ? 'fill-white' : 'text-red-600'}`} />
            <span>{blessingsCount}</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 text-[11px] font-hindi text-charcoal/60 pt-1">
        {language === 'hi' ? '— पृष्ठ ९ —' : '— Page 9 —'}
      </div>
    </div>
  );

  // PAGE 10: BACK COVER (FAREWELL & COLOPHON)
  const renderPage10BackCover = () => (
    <div className="w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-gradient-to-b from-[#2E050D] via-[#4F0B17] to-[#1E0308] text-ivory relative select-none">
      <div className="absolute inset-3 rounded-2xl border-2 border-antique-gold/80 shadow-[inset_0_0_20px_rgba(199,161,90,0.3)] pointer-events-none" />
      <div className="absolute inset-5 rounded-xl border border-dashed border-antique-gold/40 pointer-events-none" />
      <div className="absolute top-2 left-2 text-antique-gold text-xs">❖</div>
      <div className="absolute top-2 right-2 text-antique-gold text-xs">❖</div>
      <div className="absolute bottom-2 left-2 text-antique-gold text-xs">❖</div>
      <div className="absolute bottom-2 right-2 text-antique-gold text-xs">❖</div>

      {/* Top Blessing Line */}
      <div className="relative z-10 pt-2">
        <p className="font-hindi text-xs text-sandstone/90 italic">
          "{data.farewell.blessingQuote}"
        </p>
      </div>

      {/* Center Chauhan Crest & Farewell */}
      <div className="relative z-10 my-auto py-1 flex flex-col items-center">
        <ChauhanCrest size="sm" showCaption={false} />

        <h3 className="font-royal text-lg sm:text-xl text-antique-gold-lighter font-bold mt-1">
          {data.farewell.familyTitle}
        </h3>
        <p className="font-hindi text-[11px] sm:text-xs text-sandstone-dark mt-0.5">
          {data.farewell.thikanaSubline}
        </p>

        <div className="my-1.5">
          <span className="font-royal text-2xl sm:text-3xl text-antique-gold font-bold tracking-wider drop-shadow-md">
            {data.farewell.padharoSa}
          </span>
        </div>

        <p className="font-royal text-[11px] text-antique-gold-light tracking-widest uppercase">
          ॥ अतिथि देवो भवः ॥
        </p>

        {/* 100% Real Isolated Visitor Counter (Compact Luxury Pill) */}
        <div className="mt-2.5">
          <VisitorCounter variant="pill" />
        </div>
      </div>

      {/* Bottom Actions: Replay & PDF Download */}
      <div className="relative z-10 pb-2 space-y-2 w-full max-w-xs flex flex-col items-center">
        <div className="flex items-center space-x-2 w-full justify-center">
          <a
            href={data.meta.pdfDownloadUrl}
            download
            className="flex-1 py-2 px-3 rounded-full border border-antique-gold/60 bg-royal-maroon-dark/90 text-antique-gold-lighter text-xs font-hindi font-semibold hover:border-white active:scale-95 transition-all flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{data.farewell.downloadPdfButton}</span>
          </a>

          <button
            onClick={onReplay}
            className="flex-1 py-2 px-3 rounded-full border border-antique-gold/60 bg-royal-maroon-dark/90 text-antique-gold-lighter text-xs font-hindi font-semibold hover:border-white active:scale-95 transition-all flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{data.farewell.replayButton}</span>
          </button>
        </div>

        <p className="text-[10px] text-sandstone/60 font-hindi">
          {data.farewell.copyright}
        </p>
      </div>
    </div>
  );

  // Page selector helper
  const renderPageContent = (pageIdx: number) => {
    switch (pageIdx) {
      case 0: return renderPage0Cover();
      case 1: return renderPage1Mangalacharan();
      case 2: return renderPage2ShubhVivah();
      case 3: return renderPage3FamilyHeritage();
      case 4: return renderPage4EventsPart1();
      case 5: return renderPage5EventsPart2();
      case 6: return renderPage6Venue();
      case 7: return renderPage7ChiefHosts();
      case 8: return renderPage8Relations();
      case 9: return renderPage9RSVP();
      case 10: return renderPage10BackCover();
      default: return renderPage0Cover();
    }
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#180306] via-[#2D070F] to-[#120205] select-none"
    >
      {/* Background Palace Ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(199,161,90,0.18)_0%,_transparent_75%)] pointer-events-none" />

      {/* Top Header: Centered Page Pill with ample space from LanguageToggle (left) and MusicController (right) */}
      <header className="w-full max-w-sm mx-auto px-4 py-2 flex items-center justify-center z-30 pt-safe">
        <div className="px-3.5 py-1 rounded-full border border-antique-gold/30 bg-charcoal-dark/75 text-sandstone text-[11px] sm:text-xs font-hindi backdrop-blur-sm shadow-xs">
          {language === 'hi'
            ? `${currentPage === 0 ? 'मुखपृष्ठ' : currentPage === 10 ? 'अंतिम पृष्ठ' : `पृष्ठ ${currentPage}`} / १०`
            : `${currentPage === 0 ? 'Cover' : currentPage === 10 ? 'Back' : `Page ${currentPage}`} of 10`}
        </div>
      </header>

      {/* 3D BOOK MAIN STAGE */}
      <main className="relative w-full flex-1 flex items-center justify-center px-3 sm:px-6 my-auto perspective-1000 z-10">
        {/* Book Container with Authentic Book Spine & 3D Depth */}
        <div
          className="relative w-full max-w-[420px] sm:max-w-[460px] h-[78vh] sm:h-[80vh] max-h-[690px] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(199,161,90,0.25)] preserve-3d"
        >
          {/* Left Book Spine Visual Binding */}
          <div className="absolute top-0 bottom-0 left-0 w-3.5 sm:w-5 bg-gradient-to-r from-[#180306] via-[#4A0A14] to-[#250409] rounded-l-2xl z-30 border-r border-antique-gold/40 shadow-xl flex flex-col justify-around py-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-1 bg-antique-gold/60 my-2" />
            ))}
          </div>

          {/* Right Gold Page Edges (Gilded Rim) */}
          <div className="absolute top-2 bottom-2 right-[-5px] w-2 bg-gradient-to-b from-[#C7A15A] via-[#E8DCBE] to-[#855E24] rounded-r-sm z-0 shadow-md" />

          {/* Current Visible Page */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden z-10 bg-[#F7F0E2]">
            {renderPageContent(currentPage)}
          </div>

          {/* 3D Page Turn Overlay Animation when isFlipping */}
          <AnimatePresence>
            {isFlipping && (
              <motion.div
                key={`flip-${currentPage}-${flipDirection}`}
                className="absolute inset-0 rounded-2xl z-20 origin-left preserve-3d pointer-events-none bg-[#F7F0E2] shadow-2xl overflow-hidden border border-antique-gold/50"
                initial={{
                  rotateY: flipDirection === 'next' ? 0 : -140,
                  opacity: 1,
                  filter: 'brightness(1)',
                }}
                animate={{
                  rotateY: flipDirection === 'next' ? -140 : 0,
                  opacity: [1, 0.9, 0],
                  filter: ['brightness(1)', 'brightness(0.85)', 'brightness(1)'],
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.45, 0.05, 0.25, 0.95],
                }}
              >
                {/* Visual Page Turn Highlight Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lateral Quick-Turn Arrows (Subtle edges) */}
          {currentPage > 0 && (
            <button
              onClick={turnPrev}
              disabled={isFlipping}
              className="absolute left-[-16px] sm:left-[-22px] top-1/2 -translate-y-1/2 z-40 w-8 h-12 sm:w-10 sm:h-14 rounded-r-full bg-royal-maroon-dark/90 border border-antique-gold/60 text-antique-gold flex items-center justify-start pl-1 sm:pl-1.5 shadow-lg hover:bg-royal-maroon hover:text-white transition-all active:scale-95"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {currentPage < totalPages - 1 && (
            <button
              onClick={turnNext}
              disabled={isFlipping}
              className="absolute right-[-16px] sm:right-[-22px] top-1/2 -translate-y-1/2 z-40 w-8 h-12 sm:w-10 sm:h-14 rounded-l-full bg-royal-maroon-dark/90 border border-antique-gold/60 text-antique-gold flex items-center justify-end pr-1 sm:pr-1.5 shadow-lg hover:bg-royal-maroon hover:text-white transition-all active:scale-95"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </main>

      {/* BOTTOM ACTION BAR */}
      <footer className="w-full max-w-sm sm:max-w-md mx-auto px-4 py-2 z-30 flex items-center justify-between pb-safe">
        {/* Left: Previous Page Button */}
        <button
          onClick={turnPrev}
          disabled={currentPage === 0 || isFlipping}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border text-xs font-hindi transition-all ${
            currentPage === 0 ? 'opacity-30 border-gray-600 text-gray-500 cursor-not-allowed' : 'border-antique-gold/40 text-antique-gold hover:border-antique-gold active:scale-95 bg-charcoal-dark/70'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'पिछला' : 'Prev'}</span>
        </button>

        {/* Center: Table of Contents & Petal Shower */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowTOC(!showTOC)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full border border-antique-gold/40 bg-royal-maroon-dark/85 text-antique-gold text-[11px] font-hindi font-semibold hover:border-antique-gold active:scale-95 transition-all shadow-xs"
          >
            <Menu className="w-3 h-3 text-antique-gold" />
            <span>{language === 'hi' ? 'विषय-सूची' : 'Contents'}</span>
          </button>
          <PetalShowerButton />
        </div>

        {/* Right: Next Page Button */}
        <button
          onClick={turnNext}
          disabled={currentPage === totalPages - 1 || isFlipping}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border text-xs font-hindi transition-all ${
            currentPage === totalPages - 1 ? 'opacity-30 border-gray-600 text-gray-500 cursor-not-allowed' : 'border-antique-gold/40 text-antique-gold hover:border-antique-gold active:scale-95 bg-charcoal-dark/70'
          }`}
        >
          <span>{language === 'hi' ? 'अगला' : 'Next'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </footer>

      {/* TABLE OF CONTENTS MODAL */}
      <AnimatePresence>
        {showTOC && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm rounded-2xl border-2 border-antique-gold bg-gradient-to-b from-[#2E050D] via-[#450914] to-[#1E0308] p-5 text-ivory shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-antique-gold/30">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-antique-gold" />
                  <h3 className="font-royal text-sm font-bold text-antique-gold tracking-wider">
                    {language === 'hi' ? 'शाही पत्रिका विषय-सूची' : 'Table of Contents'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowTOC(false)}
                  className="p-1 rounded-full text-sandstone hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 space-y-1.5 max-h-[60vh] overflow-y-auto pr-1 allow-inner-scroll">
                {tocItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => jumpToPage(item.page)}
                    className={`w-full py-2 px-3 rounded-lg text-left text-xs font-hindi transition-all flex items-center justify-between ${
                      currentPage === item.page
                        ? 'bg-antique-gold text-charcoal font-bold shadow-sm'
                        : 'text-sandstone hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{language === 'hi' ? item.titleHi : item.titleEn}</span>
                    <span className="font-royal text-[10px] opacity-70">
                      {item.page === 0 ? 'Cover' : item.page === 10 ? 'Back' : `p. ${item.page}`}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
