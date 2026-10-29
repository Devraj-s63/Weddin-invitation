import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useLanguage, type Language } from '../../context/LanguageContext';
import { triggerPetalShower } from './PetalShower';

export const LanguageSelectorModal: React.FC = () => {
  const { language, selectLanguage, showLanguageDialog } = useLanguage();

  if (!showLanguageDialog) return null;

  const handleSelect = (lang: Language) => {
    selectLanguage(lang);
    triggerPetalShower();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full max-w-sm rounded-3xl border-2 border-antique-gold/70 bg-gradient-to-b from-[#2E070F] via-[#1F040A] to-[#120206] p-6 text-center shadow-[0_15px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Filigree Corner Accents */}
          <div className="absolute top-3 left-3 text-antique-gold/40 text-xs">❖</div>
          <div className="absolute top-3 right-3 text-antique-gold/40 text-xs">❖</div>
          <div className="absolute bottom-3 left-3 text-antique-gold/40 text-xs">❖</div>
          <div className="absolute bottom-3 right-3 text-antique-gold/40 text-xs">❖</div>

          {/* Divine Ganesh Icon */}
          <div className="flex justify-center mb-2">
            <img
              src="/images/ganesha-divine-clean.png"
              alt="Shree Ganesh"
              className="w-14 h-14 object-contain drop-shadow-[0_2px_10px_rgba(230,201,138,0.5)]"
            />
          </div>

          {/* Sacred Sanskrit Invocation */}
          <p className="font-royal text-[11px] text-antique-gold tracking-widest uppercase mb-1">
            || श्री गणेशाय नमः ||
          </p>

          <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#FFF4D0] tracking-wide mt-1">
            भाषा का चयन करें
          </h3>
          <p className="font-royal text-xs text-antique-gold-lighter/90 tracking-wider">
            Choose Your Language
          </p>

          <p className="font-hindi text-xs text-sandstone/80 my-3 leading-relaxed">
            शाही विवाह उत्सव निमंत्रण में आपका स्वागत है। कृपया अपनी पसंदीदा भाषा चुनें:
          </p>

          {/* Language Options Row */}
          <div className="space-y-3 my-4">
            {/* Hindi Button */}
            <button
              onClick={() => handleSelect('hi')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all active:scale-95 ${
                language === 'hi'
                  ? 'border-antique-gold bg-gradient-to-r from-royal-maroon via-royal-maroon-light to-royal-maroon shadow-lg text-[#FFF4D0]'
                  : 'border-antique-gold/40 bg-black/40 hover:border-antique-gold/80 text-sandstone-light'
              }`}
            >
              <div className="text-left">
                <p className="font-royal text-base sm:text-lg font-bold text-[#FFF4D0]">
                  हिन्दी (Hindi)
                </p>
                <p className="text-[11px] font-hindi text-antique-gold-lighter/80">
                  सम्पूर्ण पारम्परिक राजपूती संस्करण
                </p>
              </div>
              <div className="w-7 h-7 rounded-full border border-antique-gold/50 flex items-center justify-center bg-black/40">
                {language === 'hi' ? (
                  <Check className="w-4 h-4 text-antique-gold" />
                ) : (
                  <span className="text-[10px] text-antique-gold">अ</span>
                )}
              </div>
            </button>

            {/* English Button */}
            <button
              onClick={() => handleSelect('en')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all active:scale-95 ${
                language === 'en'
                  ? 'border-antique-gold bg-gradient-to-r from-royal-maroon via-royal-maroon-light to-royal-maroon shadow-lg text-[#FFF4D0]'
                  : 'border-antique-gold/40 bg-black/40 hover:border-antique-gold/80 text-sandstone-light'
              }`}
            >
              <div className="text-left">
                <p className="font-royal text-base sm:text-lg font-bold text-[#FFF4D0]">
                  English
                </p>
                <p className="text-[11px] font-royal text-antique-gold-lighter/80">
                  Royal Rajputana English Edition
                </p>
              </div>
              <div className="w-7 h-7 rounded-full border border-antique-gold/50 flex items-center justify-center bg-black/40">
                {language === 'en' ? (
                  <Check className="w-4 h-4 text-antique-gold" />
                ) : (
                  <span className="text-[10px] text-antique-gold">A</span>
                )}
              </div>
            </button>
          </div>

          <div className="pt-2 text-[10px] text-sandstone/60 font-hindi flex items-center justify-center space-x-1">
            <Sparkles className="w-3 h-3 text-antique-gold/70" />
            <span>वेबसाइट में कभी भी भाषा बदली जा सकती है</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
