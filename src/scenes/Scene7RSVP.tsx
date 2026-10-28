import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCircle2, User, Users } from 'lucide-react';
import { RoyalDivider } from '../components/common/OrnateMotif';
import { RoyalBorder } from '../components/common/RoyalBorder';
import { WEDDING_DATA } from '../data/weddingData';

export const Scene7RSVP: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [blessingMessage, setBlessingMessage] = useState('');
  const [error, setError] = useState('');
  const [isPrepared, setIsPrepared] = useState(false);

  const handleSendRSVP = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      setError('कृपया अपना शुभ नाम दर्ज करें।');
      return;
    }
    setError('');

    // Format formal Hindi WhatsApp message
    const attendanceHindi =
      attendance === 'attending'
        ? '✅ सहर्ष उपस्थिति — हम अवश्य पधारेंगे।'
        : '🙏 आने में असमर्थ — हार्दिक शुभकामनाएं व शुभाशीर्वाद प्रेषित करते हैं।';

    const guestCountText = attendance === 'attending' ? `\n👥 कुल सदस्य संख्या: ${guestCount} व्यक्ति` : '';

    const messageText = `*शाही विवाह उत्सव उपस्थिति सूचना (RSVP)*\n\n` +
      `श्रीमान/श्रीमती ठा. राम सिंह जी चौहान एवं समस्त चौहान परिवार,\n\n` +
      `आयुष्मान देवराज सिंह चौहान संग आयुष्मति मधु कंवर के शुभ विवाह के पावन अवसर पर:\n\n` +
      `👤 *अतिथि का नाम:* ${guestName.trim()}\n` +
      `📋 *उपस्थिति स्थिति:* ${attendanceHindi}${guestCountText}\n` +
      (blessingMessage.trim() ? `\n💬 *वर-वधू हेतु शुभाशीर्वाद/संदेश:*\n"${blessingMessage.trim()}"\n` : '\n') +
      `\nस्थान: पायल रिसोर्ट, भीलवाड़ा\n` +
      `सादर प्रेषित।`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WEDDING_DATA.meta.rsvpPhone}?text=${encodedMessage}`;

    setIsPrepared(true);

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="rsvp-section" className="relative w-full py-16 px-4 bg-gradient-to-b from-[#211B19] via-[#340A13] to-[#211B19]">
      <div className="max-w-xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <p className="font-royal text-xs sm:text-sm text-antique-gold tracking-widest uppercase font-semibold">
            आदर सहित उपस्थिति सूचना
          </p>
          <h2 className="font-royal text-2xl sm:text-3xl text-antique-gold-lighter font-bold tracking-wide mt-1">
            "आपका आगमन हमारे लिए सौभाग्य होगा"
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-sandstone/80 mt-1 max-w-md mx-auto">
            कृपया अपनी उपस्थिति की सूचना प्रेषित कर हमें अनुग्रहित करें
          </p>
          <RoyalDivider className="my-4" />
        </div>

        {/* RSVP FORM CARD */}
        <RoyalBorder variant="maroon" padding="p-6 sm:p-8">
          <form onSubmit={handleSendRSVP} className="space-y-5 text-left">
            {/* Guest Name Field */}
            <div>
              <label className="block text-xs font-hindi text-antique-gold-light font-semibold mb-1.5">
                आपका शुभ नाम (अतिथि / परिवार प्रमुख) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="उदा. ठा. वीरेन्द्र सिंह जी"
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
                क्या आप विवाह उत्सव में पधारेंगे? *
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
                  <span>अवश्य पधारेंगे</span>
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
                  <span>आने में असमर्थ (शुभकामनाएं)</span>
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
                  सपरिवार कुल सदस्यों की अनुमानित संख्या
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
                  <span className="text-xs font-hindi text-sandstone flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-antique-gold" />
                    <span>व्यक्ति / सदस्य</span>
                  </span>
                </div>
              </motion.div>
            )}

            {/* Optional Blessing / Message */}
            <div>
              <label className="block text-xs font-hindi text-antique-gold-light font-semibold mb-1.5">
                वर-वधू हेतु शुभाशीर्वाद एवं मंगलकामनाएं (वैकल्पिक)
              </label>
              <textarea
                value={blessingMessage}
                onChange={(e) => setBlessingMessage(e.target.value)}
                rows={3}
                placeholder="उदा. वर-वधू को जीवन की नई यात्रा की हार्दिक बधाई व अनंत शुभाशीर्वाद..."
                className="w-full px-4 py-2.5 rounded-xl border border-antique-gold/40 bg-charcoal-dark/70 text-ivory placeholder-sandstone/40 text-xs sm:text-sm font-hindi focus:outline-none focus:border-antique-gold focus:ring-1 focus:ring-antique-gold"
              />
            </div>

            {/* SUBMIT BUTTON VIA WHATSAPP (+91 6377273385) */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full border border-green-500 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white font-royal text-sm sm:text-base font-bold shadow-lg hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>व्हाट्सएप पर RSVP संदेश भेजें</span>
                <Send className="w-4 h-4 ml-1" />
              </button>

              <p className="mt-2 text-[11px] text-sandstone/80 text-center font-hindi">
                (बटन दबाने पर व्हाट्सएप में +91 6377273385 हेतु संदेश तैयार हो जाएगा, जिसे आप तुरंत भेज सकते हैं)
              </p>
            </div>

            {/* Preparation Feedback Notice */}
            {isPrepared && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-green-950/70 border border-green-600/40 text-center"
              >
                <p className="text-xs font-hindi text-green-200">
                  ✨ आपका संदेश व्हाट्सएप पर तैयार हो गया है! कृपया व्हाट्सएप में 'Send' बटन दबाकर परिवार तक संदेश अवश्य पहुँचाएं।
                </p>
              </motion.div>
            )}
          </form>
        </RoyalBorder>
      </div>
    </section>
  );
};
