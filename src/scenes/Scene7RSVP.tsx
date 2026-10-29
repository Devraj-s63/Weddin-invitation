import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCircle2, User, Users } from 'lucide-react';
import { RoyalDivider } from '../components/common/OrnateMotif';
import { RoyalBorder } from '../components/common/RoyalBorder';
import { useLanguage } from '../context/LanguageContext';

export const Scene7RSVP: React.FC = () => {
  const { data, language } = useLanguage();
  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [blessingMessage, setBlessingMessage] = useState('');
  const [error, setError] = useState('');
  const [isPrepared, setIsPrepared] = useState(false);

  const handleSendRSVP = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      setError(language === 'hi' ? 'कृपया अपना शुभ नाम दर्ज करें।' : 'Please enter your honorable name.');
      return;
    }
    setError('');

    let messageText = '';

    if (language === 'hi') {
      const attendanceHindi =
        attendance === 'attending'
          ? '✅ सहर्ष उपस्थिति — हम अवश्य पधारेंगे।'
          : '🙏 आने में असमर्थ — हार्दिक शुभकामनाएं व शुभाशीर्वाद प्रेषित करते हैं।';

      const guestCountText = attendance === 'attending' ? `\n👥 कुल सदस्य संख्या: ${guestCount} व्यक्ति` : '';

      messageText = `*शाही विवाह उत्सव उपस्थिति सूचना (RSVP)*\n\n` +
        `श्रीमान/श्रीमती ठा. राम सिंह जी चौहान एवं समस्त चौहान परिवार,\n\n` +
        `आयुष्मान देवराज सिंह चौहान संग आयुष्मति मधु कंवर के शुभ विवाह के पावन अवसर पर:\n\n` +
        `👤 *अतिथि का नाम:* ${guestName.trim()}\n` +
        `📋 *उपस्थिति स्थिति:* ${attendanceHindi}${guestCountText}\n` +
        (blessingMessage.trim() ? `\n💬 *वर-वधू हेतु शुभाशीर्वाद/संदेश:*\n"${blessingMessage.trim()}"\n` : '\n') +
        `\nस्थान: ${data.meta.venueName}, ${data.meta.locationCity}\n` +
        `सादर प्रेषित।`;
    } else {
      const attendanceEn =
        attendance === 'attending'
          ? '✅ Attending with joy — We will surely grace the wedding.'
          : '🙏 Unable to attend — Sending our heartfelt blessings to the couple.';

      const guestCountText = attendance === 'attending' ? `\n👥 Estimated Family Members: ${guestCount}` : '';

      messageText = `*Royal Rajputana Wedding RSVP*\n\n` +
        `To Thakur Ram Singh Ji Chauhan & The Entire Chauhan Family,\n\n` +
        `On the auspicious royal wedding of Devraj Singh Chauhan & Madhu Kanwar:\n\n` +
        `👤 *Guest / Family Head:* ${guestName.trim()}\n` +
        `📋 *Attendance Status:* ${attendanceEn}${guestCountText}\n` +
        (blessingMessage.trim() ? `\n💬 *Blessings & Wishes:*\n"${blessingMessage.trim()}"\n` : '\n') +
        `\nVenue: ${data.meta.venueName}, ${data.meta.locationCity}\n` +
        `Warm regards.`;
    }

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${data.meta.rsvpPhone}?text=${encodedMessage}`;

    setIsPrepared(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="rsvp-section" className="relative w-full py-16 px-4 bg-gradient-to-b from-[#211B19] via-[#340A13] to-[#211B19]">
      <div className="max-w-xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <p className="font-royal text-xs sm:text-sm text-antique-gold tracking-widest uppercase font-semibold">
            {language === 'hi' ? 'आदर सहित उपस्थिति सूचना' : 'Cordially Awaiting Your Presence'}
          </p>
          <h2 className="font-royal text-2xl sm:text-3xl text-antique-gold-lighter font-bold tracking-wide mt-1">
            {language === 'hi' ? '"आपका आगमन हमारे लिए सौभाग्य होगा"' : '"Your Gracious Presence is Our Honor"'}
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-sandstone/80 mt-1 max-w-md mx-auto">
            {language === 'hi'
              ? 'कृपया अपनी उपस्थिति की सूचना प्रेषित कर हमें अनुग्रहित करें'
              : 'Please confirm your attendance to help us extend a royal welcome'}
          </p>
          <RoyalDivider className="my-4" />
        </div>

        {/* RSVP FORM CARD */}
        <RoyalBorder variant="maroon" padding="p-6 sm:p-8">
          <form onSubmit={handleSendRSVP} className="space-y-5 text-left">
            {/* Guest Name Field */}
            <div>
              <label className="block text-xs font-hindi text-antique-gold-light font-semibold mb-1.5">
                {language === 'hi' ? 'आपका शुभ नाम (अतिथि / परिवार प्रमुख) *' : 'Your Honorable Name (Guest / Family Head) *'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={language === 'hi' ? 'उदा. ठा. वीरेन्द्र सिंह जी' : 'e.g. Thakur Virendra Singh Ji'}
                  className="w-full px-4 py-3 rounded-xl border border-antique-gold/40 bg-charcoal-dark/70 text-ivory placeholder-sandstone/40 text-sm font-hindi focus:outline-none focus:border-antique-gold focus:ring-1 focus:ring-antique-gold"
                />
                <User className="absolute right-3.5 top-3.5 w-4 h-4 text-sandstone/50 pointer-events-none" />
              </div>
              {error && (
                <p className="text-xs text-red-400 font-hindi mt-1">
                  {error}
                </p>
              )}
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block text-xs font-hindi text-antique-gold-light font-semibold mb-2">
                {language === 'hi' ? 'क्या आप विवाह उत्सव में पधारेंगे? *' : 'Will you grace the royal wedding? *'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-hindi font-medium flex items-center justify-center space-x-2 transition-all ${
                    attendance === 'attending'
                      ? 'bg-antique-gold text-charcoal-dark border-antique-gold font-bold shadow-md'
                      : 'bg-charcoal/60 text-sandstone border-antique-gold/30 hover:border-antique-gold/60'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'hi' ? 'अवश्य पधारेंगे' : 'Joyfully Attending'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('not_attending')}
                  className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-hindi font-medium flex items-center justify-center space-x-2 transition-all ${
                    attendance === 'not_attending'
                      ? 'bg-antique-gold text-charcoal-dark border-antique-gold font-bold shadow-md'
                      : 'bg-charcoal/60 text-sandstone border-antique-gold/30 hover:border-antique-gold/60'
                  }`}
                >
                  <span>{language === 'hi' ? 'आने में असमर्थ (शुभकामनाएं)' : 'Unable to Attend (Wishes)'}</span>
                </button>
              </div>
            </div>

            {/* Number of Guests (if attending) */}
            {attendance === 'attending' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-xs font-hindi text-antique-gold-light font-semibold mb-1.5">
                  {language === 'hi' ? 'सपरिवार कुल सदस्यों की अनुमानित संख्या' : 'Estimated Number of Family Members'}
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-antique-gold/40 rounded-xl bg-charcoal-dark/70 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="px-3.5 py-2 text-antique-gold hover:bg-royal-maroon font-bold text-base transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-royal font-bold text-antique-gold-lighter min-w-[40px] text-center">
                      {guestCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(guestCount + 1)}
                      className="px-3.5 py-2 text-antique-gold hover:bg-royal-maroon font-bold text-base transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-sandstone font-hindi flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-antique-gold" />
                    <span>{language === 'hi' ? `${guestCount} सदस्य` : `${guestCount} Member(s)`}</span>
                  </span>
                </div>
              </motion.div>
            )}

            {/* Blessing Message Field */}
            <div>
              <label className="block text-xs font-hindi text-antique-gold-light font-semibold mb-1.5">
                {language === 'hi' ? 'वर-वधू हेतु शुभाशीर्वाद / स्नेह सन्देश (ऐच्छिक)' : 'Blessings / Wishes for the Royal Couple (Optional)'}
              </label>
              <textarea
                value={blessingMessage}
                onChange={(e) => setBlessingMessage(e.target.value)}
                rows={2}
                placeholder={
                  language === 'hi'
                    ? 'वर-वधू के सुखद एवं मंगलमय दांपत्य जीवन हेतु अपनी शुभकामना लिखें...'
                    : 'Write your warmest prayers and wishes for the newlywed couple...'
                }
                className="w-full px-4 py-2.5 rounded-xl border border-antique-gold/40 bg-charcoal-dark/70 text-ivory placeholder-sandstone/40 text-xs sm:text-sm font-hindi focus:outline-none focus:border-antique-gold focus:ring-1 focus:ring-antique-gold resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full border border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark text-antique-gold-lighter font-royal text-sm sm:text-base font-bold shadow-royal-glow hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'WhatsApp पर RSVP प्रेषित करें' : 'Send RSVP via WhatsApp'}</span>
              <Send className="w-3.5 h-3.5 text-antique-gold" />
            </button>

            {isPrepared && (
              <p className="text-center text-xs text-emerald-300 font-hindi mt-2">
                {language === 'hi'
                  ? '✓ संदेश तैयार होकर WhatsApp में खुल गया है।'
                  : '✓ RSVP formatted and opened in WhatsApp.'}
              </p>
            )}
          </form>
        </RoyalBorder>
      </div>
    </section>
  );
};
