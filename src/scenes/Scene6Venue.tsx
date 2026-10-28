import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Phone, Compass } from 'lucide-react';
import { RoyalDivider } from '../components/common/OrnateMotif';
import { RoyalBorder } from '../components/common/RoyalBorder';
import { WEDDING_DATA } from '../data/weddingData';

export const Scene6Venue: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${WEDDING_DATA.meta.venueName}, ${WEDDING_DATA.meta.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="venue-section" className="relative w-full py-16 px-4 bg-gradient-to-b from-[#211B19] via-royal-maroon-deep to-[#211B19]">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <p className="font-royal text-xs sm:text-sm text-antique-gold tracking-widest uppercase font-semibold">
            विवाह उत्सव एवं प्रीतिभोज स्थल
          </p>
          <h2 className="font-royal text-2xl sm:text-3xl text-antique-gold-lighter font-bold tracking-wide mt-1">
            शुभ स्थल व मार्ग
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-sandstone/80 mt-1 max-w-md mx-auto">
            भीलवाड़ा, राजस्थान स्थित शाही उत्सव प्रांगण
          </p>
          <RoyalDivider className="my-4" />
        </div>

        {/* MAIN VENUE CARD */}
        <RoyalBorder variant="parchment" padding="p-6 sm:p-8">
          <div className="text-center flex flex-col items-center">
            {/* Location Icon Medallion */}
            <div className="w-16 h-16 rounded-full border-2 border-royal-maroon/30 bg-royal-maroon/10 flex items-center justify-center text-royal-maroon mb-3 shadow-inner">
              <MapPin className="w-8 h-8 text-royal-maroon" />
            </div>

            <span className="font-royal text-xs tracking-widest text-royal-maroon uppercase font-bold">
              मुख्य मांगलिक स्थल
            </span>

            {/* Venue Name */}
            <h3 className="font-royal text-2xl sm:text-3xl font-bold text-royal-maroon-dark mt-1">
              {WEDDING_DATA.meta.venueName}
            </h3>

            {/* Venue Address */}
            <p className="font-hindi text-sm sm:text-base text-charcoal/85 mt-2 max-w-sm leading-relaxed">
              {WEDDING_DATA.meta.venueAddress}
            </p>

            {/* Copy Address Button */}
            <button
              onClick={handleCopyAddress}
              className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-royal-maroon/30 bg-royal-maroon/5 hover:bg-royal-maroon/10 text-royal-maroon text-xs font-hindi transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-700" />
                  <span className="text-green-700 font-medium">पता कॉपी हो गया</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-royal-maroon" />
                  <span>पता कॉपी करें</span>
                </>
              )}
            </button>

            <div className="h-[1px] w-full max-w-xs bg-royal-maroon/20 my-5" />

            {/* PREETIBHOJ HIGHLIGHT */}
            <div className="w-full bg-white/70 p-4 rounded-xl border border-antique-gold/40 shadow-sm text-left mb-4">
              <div className="flex items-center space-x-2 text-royal-maroon mb-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-royal-maroon">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" strokeDasharray="2 2" />
                  <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                </svg>
                <span className="font-royal text-xs font-bold uppercase tracking-wider">
                  राजकीय प्रीतिभोज (स्वागत भोज)
                </span>
              </div>
              <p className="font-hindi text-sm font-semibold text-charcoal">
                {WEDDING_DATA.reception.day}, {WEDDING_DATA.reception.date}
              </p>
              <p className="font-hindi text-xs text-sandstone-dark font-medium mt-0.5">
                समय: {WEDDING_DATA.reception.time}
              </p>
            </div>

            {/* BARAT DEPARTURE NOTE */}
            <div className="w-full bg-white/70 p-4 rounded-xl border border-antique-gold/40 shadow-sm text-left mb-6">
              <div className="flex items-center space-x-2 text-royal-maroon mb-1">
                <Compass className="w-4 h-4 text-royal-maroon" />
                <span className="font-royal text-xs font-bold uppercase tracking-wider">
                  बारात प्रस्थान (ठि. चन्देरिया की ओर)
                </span>
              </div>
              <p className="font-hindi text-sm font-semibold text-charcoal">
                {WEDDING_DATA.baratNotes.time}
              </p>
              <p className="font-hindi text-xs text-charcoal/75 mt-0.5">
                {WEDDING_DATA.baratNotes.destination}
              </p>
            </div>

            {/* OUTSTATION GUEST TRANSIT ASSISTANCE */}
            <div className="w-full mt-4 pt-4 border-t border-royal-maroon/15 text-left">
              <span className="text-xs font-royal text-royal-maroon uppercase font-bold tracking-wider">
                दूरस्थ अतिथियों हेतु यात्रा मार्गदर्शन:
              </span>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-hindi text-charcoal/80">
                <div className="p-2 rounded bg-white/50 border border-royal-maroon/10">
                  <span className="font-semibold text-royal-maroon-dark">🚆 निकटतम रेलवे स्टेशन:</span>
                  <p className="mt-0.5">भीलवाड़ा जंक्शन (BHL) — मात्र 4.5 किमी</p>
                </div>
                <div className="p-2 rounded bg-white/50 border border-royal-maroon/10">
                  <span className="font-semibold text-royal-maroon-dark">✈️ निकटतम हवाई अड्डे:</span>
                  <p className="mt-0.5">डबोक/उदयपुर (UDR) 135 किमी • जयपुर (JAI) 240 किमी</p>
                </div>
              </div>
            </div>

            {/* PRIMARY GOOGLE MAPS NAVIGATION BUTTON (Using exact URL) */}
            <a
              href={WEDDING_DATA.meta.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm mt-5 py-3.5 px-6 rounded-full border border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-antique-gold-lighter font-royal text-sm sm:text-base font-bold shadow-royal-glow hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <Navigation className="w-4 h-4 text-antique-gold" />
              <span>Google Maps पर रास्ता देखें</span>
            </a>

            <p className="mt-2 text-[11px] text-charcoal/60 font-hindi">
              (टैप करने पर सीधे आपके फ़ोन के Google Maps में नेविगेशन खुलेगा)
            </p>
          </div>
        </RoyalBorder>

        {/* ASSISTANCE & HELP CALL BUTTONS */}
        <div className="mt-6 p-4 rounded-xl border border-antique-gold/30 bg-charcoal/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="text-xs font-royal text-antique-gold uppercase tracking-wider font-semibold">
              मार्ग दर्शन एवं सहायता हेतु सम्पर्क
            </p>
            <p className="text-xs font-hindi text-sandstone/80 mt-0.5">
              पहुँचने में किसी भी प्रकार की असुविधा होने पर सम्पर्क करें
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {WEDDING_DATA.meta.contactPhones.map((phone: string, i: number) => (
              <a
                key={i}
                href={`tel:+91${phone}`}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-antique-gold/40 bg-royal-maroon-deep hover:bg-royal-maroon text-antique-gold text-xs font-hindi transition-all active:scale-95"
              >
                <Phone className="w-3 h-3 text-antique-gold" />
                <span>+91 {phone}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
