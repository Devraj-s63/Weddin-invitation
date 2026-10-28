import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronDown, Bell, Sparkles } from 'lucide-react';
import {
  GaneshaMotif,
  KalashMotif,
  ThambMotif,
  MayraMotif,
  HaldiMotif,
  SangeetMotif,
  NikasiMotif,
  PanigrahanMotif,
  RoyalDivider
} from '../components/common/OrnateMotif';
import { RoyalBorder } from '../components/common/RoyalBorder';
import { WEDDING_DATA, type WeddingEvent } from '../data/weddingData';

export const Scene4Events: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const getEventIcon = (type: WeddingEvent['iconType']) => {
    switch (type) {
      case 'vinayak':
        return <GaneshaMotif size={44} className="text-antique-gold" />;
      case 'kalash':
        return <KalashMotif size={44} className="text-antique-gold" />;
      case 'thamb':
        return <ThambMotif size={44} className="text-antique-gold" />;
      case 'mayra':
        return <MayraMotif size={44} className="text-antique-gold" />;
      case 'haldi':
        return <HaldiMotif size={44} className="text-antique-gold" />;
      case 'sangeet':
        return <SangeetMotif size={44} className="text-antique-gold" />;
      case 'nikasi':
        return <NikasiMotif size={44} className="text-antique-gold" />;
      case 'panigrahan':
        return <PanigrahanMotif size={44} className="text-antique-gold" />;
      default:
        return <Sparkles className="w-8 h-8 text-antique-gold" />;
    }
  };

  const createGoogleCalendarUrl = (event: WeddingEvent) => {
    const title = encodeURIComponent(`${event.name} — देवराज सिंह संग मधु कंवर शाही विवाह`);
    const details = encodeURIComponent(`${event.description}\nस्थान: पायल रिसोर्ट, भीलवाड़ा\nशुभ विवाह: देवराज सिंह चौहान संग मधु कंवर`);
    const location = encodeURIComponent('पायल रिसोर्ट, सरस डेयरी के पास, भीलवाड़ा, राजस्थान');
    
    // Parse ISO date
    const startIso = event.isoDate.replace(/-|:/g, '');
    const startTime = `${startIso}00`;
    // default 3 hour duration
    const endTime = `${startIso}00`;
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startTime}/${endTime}`;
  };

  const toggleEvent = (id: string) => {
    setSelectedEventId(prev => (prev === id ? null : id));
  };

  return (
    <section id="events-section" className="relative w-full py-16 px-4 bg-gradient-to-b from-[#211B19] via-royal-maroon-deep to-[#211B19]">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <p className="font-royal text-xs sm:text-sm text-antique-gold tracking-widest uppercase font-semibold">
            शगुन कुंकुम पत्रिका
          </p>
          <h2 className="font-royal text-2xl sm:text-3xl text-antique-gold-lighter font-bold tracking-wide mt-1">
            मांगलिक कार्यक्रम
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-sandstone/80 mt-1 max-w-md mx-auto">
            वैदिक विधि-विधान एवं राजपूती परम्परा अनुसार आयोजित होने वाले पावन रस्मों की समय-सारिणी
          </p>
          <RoyalDivider className="my-4" />
        </div>

        {/* Chronological Event Cards List */}
        <div className="space-y-4">
          {WEDDING_DATA.events.map((event: WeddingEvent, index: number) => {
            const isExpanded = selectedEventId === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div
                  onClick={() => toggleEvent(event.id)}
                  className={`w-full rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isExpanded
                      ? 'border-antique-gold bg-gradient-to-b from-royal-maroon/90 to-charcoal shadow-royal-glow'
                      : 'border-antique-gold/30 bg-charcoal/80 hover:border-antique-gold/60 hover:bg-charcoal'
                  } p-4 sm:p-5 backdrop-blur-md`}
                >
                  <div className="flex items-start justify-between">
                    {/* Event Traditional Illustration Motif */}
                    <div className="p-2.5 rounded-xl border border-antique-gold/40 bg-royal-maroon-deep/80 shadow-md flex-shrink-0">
                      {getEventIcon(event.iconType)}
                    </div>

                    {/* Event Core Info */}
                    <div className="flex-1 ml-3 sm:ml-4 text-left">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-hindi font-semibold px-2 py-0.5 rounded-full bg-antique-gold/20 text-antique-gold border border-antique-gold/30">
                          {event.tithi}
                        </span>
                        <span className="text-[10px] font-hindi text-sandstone/80">
                          {event.day}
                        </span>
                      </div>

                      <h3 className="font-royal text-base sm:text-lg text-antique-gold-lighter font-bold tracking-wide">
                        {event.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-sandstone/90 font-hindi">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-antique-gold" />
                          <span>{event.date}</span>
                        </span>
                        <span className="flex items-center space-x-1 font-semibold text-antique-gold-light">
                          <Clock className="w-3.5 h-3.5 text-antique-gold" />
                          <span>{event.time}</span>
                        </span>
                      </div>
                    </div>

                    {/* Expand/Collapse Chevron */}
                    <div className="ml-2 pt-1 flex-shrink-0">
                      <ChevronDown
                        className={`w-5 h-5 text-antique-gold transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* EXPANDED DETAILS */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-antique-gold/30 space-y-3 text-left">
                          {/* Cultural Significance Description */}
                          <div className="bg-charcoal-dark/60 p-3 rounded-lg border border-antique-gold/20">
                            <p className="font-hindi text-xs sm:text-sm text-ivory/90 leading-relaxed">
                              {event.description}
                            </p>
                          </div>

                          {/* Attire suggestion */}
                          {event.dressCodeSuggestion && (
                            <div className="flex items-center space-x-2 text-xs font-hindi text-sandstone">
                              <span className="text-antique-gold font-semibold">वेशभूषा:</span>
                              <span>{event.dressCodeSuggestion}</span>
                            </div>
                          )}

                          {/* Calendar Action Button */}
                          <div className="pt-1 flex items-center justify-end">
                            <a
                              href={createGoogleCalendarUrl(event)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-antique-gold/50 bg-royal-maroon text-antique-gold-light hover:bg-royal-maroon-dark text-xs font-hindi font-medium active:scale-95 transition-all shadow-sm"
                            >
                              <Bell className="w-3 h-3 text-antique-gold" />
                              <span>गूगल कैलेंडर में जोड़ें</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Preetibhoj Special Card Highlight */}
        <div className="mt-8">
          <RoyalBorder variant="maroon" padding="p-5 sm:p-6">
            <div className="text-center space-y-2">
              <span className="inline-block px-3 py-0.5 rounded-full bg-antique-gold/20 border border-antique-gold/40 text-antique-gold font-royal text-xs tracking-wider">
                राजकीय भोज
              </span>
              <h3 className="font-royal text-xl sm:text-2xl text-antique-gold-lighter font-bold">
                {WEDDING_DATA.reception.title}
              </h3>
              <p className="font-royal text-sm sm:text-base text-ivory font-semibold">
                {WEDDING_DATA.reception.day}, {WEDDING_DATA.reception.date}
              </p>
              <p className="font-hindi text-xs sm:text-sm text-antique-gold-light font-medium">
                {WEDDING_DATA.reception.time}
              </p>
              <div className="h-[1px] w-24 bg-antique-gold/40 mx-auto my-2" />
              <p className="font-hindi text-xs sm:text-sm text-sandstone">
                स्थल: <span className="font-semibold text-ivory">{WEDDING_DATA.reception.venue}</span>, {WEDDING_DATA.reception.address}
              </p>
            </div>
          </RoyalBorder>
        </div>

        {/* Barat Departure Note */}
        <div className="mt-4 p-4 rounded-xl border border-antique-gold/30 bg-charcoal/70 text-center">
          <p className="font-royal text-xs text-antique-gold tracking-wider uppercase font-semibold">
            बारात प्रस्थान सूचना
          </p>
          <p className="font-hindi text-xs sm:text-sm text-ivory/90 mt-1">
            {WEDDING_DATA.baratNotes.time}
          </p>
          <p className="font-hindi text-xs text-sandstone/80 mt-0.5">
            {WEDDING_DATA.baratNotes.destination}
          </p>
        </div>
      </div>
    </section>
  );
};
