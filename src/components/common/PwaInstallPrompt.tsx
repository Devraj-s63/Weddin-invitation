import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share, PlusSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePwaInstall } from '../../utils/pwaManager';
import { useLanguage } from '../../context/LanguageContext';

export const PwaInstallPrompt: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();
  const { isInstallable, isStandalone, isIOS, triggerInstall } = usePwaInstall();
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleInstallClick = async () => {
    const accepted = await triggerInstall();
    if (accepted) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm rounded-2xl border-2 border-antique-gold bg-gradient-to-b from-[#2E050D] via-[#450914] to-[#1E0308] p-5 text-ivory shadow-2xl text-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full text-sandstone hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* App Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto p-1 bg-gradient-to-b from-antique-gold via-antique-gold-dark to-royal-maroon shadow-lg mb-3">
            <img
              src="/icons/icon-192.png"
              alt="Chouhan Royal Wedding App"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <p className="font-royal text-[11px] text-antique-gold tracking-widest uppercase font-bold">
            ॥ राजपूताना डिजिटल निमंत्रण ॥
          </p>

          <h3 className="font-royal text-lg sm:text-xl font-bold text-white mt-1">
            {language === 'hi' ? 'शाही विवाह ऐप इंस्टॉल करें' : 'Install Wedding Invitation App'}
          </h3>

          <p className="font-hindi text-xs text-sandstone/85 my-2.5 leading-relaxed">
            {language === 'hi'
              ? 'वेडिंग कार्ड को अपने फोन की होम स्क्रीन पर एक ऐप की तरह सुरक्षित रखें। यह बिना इंटरनेट (ऑफ़लाइन) भी तुरंत खुलता है।'
              : 'Save the wedding invitation on your phone’s home screen as an app. Access ceremonies, map directions, and muhurat even without internet.'}
          </p>

          {/* Content based on state */}
          {installSuccess ? (
            <div className="p-3 rounded-xl bg-green-900/40 border border-green-500/60 text-green-200 text-xs font-hindi flex items-center justify-center space-x-2 my-3">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>{language === 'hi' ? 'ऐप सफलतापूर्वक इंस्टॉल हो गया!' : 'App installed successfully!'}</span>
            </div>
          ) : isStandalone ? (
            <div className="p-3 rounded-xl bg-antique-gold/20 border border-antique-gold/50 text-[#FFE9B8] text-xs font-hindi flex items-center justify-center space-x-2 my-3">
              <Sparkles className="w-4 h-4 text-antique-gold" />
              <span>{language === 'hi' ? 'यह ऐप आपके फोन पर पहले से स्थापित है।' : 'App is already running in standalone mode.'}</span>
            </div>
          ) : isInstallable ? (
            /* Direct 1-tap Android / Chrome Install */
            <div className="mt-4 space-y-2">
              <button
                onClick={handleInstallClick}
                className="w-full py-2.5 px-4 rounded-full border-2 border-antique-gold bg-gradient-to-r from-royal-maroon-dark via-[#751221] to-royal-maroon-dark text-[#FFF4D0] font-royal text-xs sm:text-sm font-bold shadow-royal-glow hover:border-white active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-antique-gold" />
                <span>{language === 'hi' ? '📲 अभी होम स्क्रीन पर जोड़ें' : '📲 Add to Home Screen'}</span>
              </button>
            </div>
          ) : isIOS ? (
            /* iOS Safari Instructions */
            <div className="mt-3 p-3 rounded-xl bg-black/40 border border-antique-gold/40 text-left space-y-2 text-xs font-hindi">
              <p className="font-semibold text-antique-gold text-[11px] text-center">
                {language === 'hi' ? 'iPhone / Safari पर इंस्टॉल करने के सरल चरण:' : 'Simple steps for iPhone / Safari:'}
              </p>
              <div className="flex items-center space-x-2 text-sandstone">
                <span className="w-5 h-5 rounded-full bg-royal-maroon text-antique-gold flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span>Safari के नीचे <Share className="inline w-3.5 h-3.5 text-blue-400 mx-1" /> <strong>Share (शेयर)</strong> बटन दबाएं।</span>
              </div>
              <div className="flex items-center space-x-2 text-sandstone">
                <span className="w-5 h-5 rounded-full bg-royal-maroon text-antique-gold flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <span>नीचे स्क्रॉल कर <PlusSquare className="inline w-3.5 h-3.5 text-antique-gold mx-1" /> <strong>Add to Home Screen (होम स्क्रीन पर जोड़ें)</strong> चुनें।</span>
              </div>
            </div>
          ) : (
            /* Desktop or fallback */
            <div className="mt-3 p-2.5 rounded-xl bg-black/30 border border-antique-gold/30 text-sandstone text-xs font-hindi">
              {language === 'hi'
                ? 'ब्राउज़र मेनू (⋮) से "ऐप इंस्टॉल करें" या "Add to Home Screen" पर क्लिक करें।'
                : 'Use your browser menu (⋮) to select "Install app" or "Add to Home Screen".'}
            </div>
          )}

          <div className="mt-4 pt-2 border-t border-antique-gold/25 text-[10px] text-sandstone/60 font-hindi">
            {language === 'hi'
              ? 'चौहान परिवार • देवराज सिंह एवं मधु कंवर विवाह'
              : 'Chauhan Family • Devraj Singh & Madhu Kanwar'}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
