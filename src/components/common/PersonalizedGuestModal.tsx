import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Check, ExternalLink, Sparkles, UserCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { buildGuestInvitationUrl, buildGuestWhatsAppShareText } from '../../utils/guestManager';

interface PersonalizedGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalizedGuestModal: React.FC<PersonalizedGuestModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [guestName, setGuestName] = useState('');
  const [salutation, setSalutation] = useState('परम आदरणीय');
  const [copied, setCopied] = useState(false);

  const quickSalutationsHi = ['परम आदरणीय', 'स्नेही स्वजन', 'प्रिय मित्र', 'पूजनीय सा', 'मान्यवर'];
  const quickSalutationsEn = ['Honorable', 'Respected', 'Dear Friend', 'Esteemed', 'Beloved'];

  const generatedUrl = buildGuestInvitationUrl(guestName || 'अतिथि_महानुभाव', salutation);

  const handleCopyLink = () => {
    if (!guestName.trim()) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!guestName.trim()) return;
    const message = buildGuestWhatsAppShareText(guestName.trim(), salutation, language);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePreview = () => {
    if (!guestName.trim()) return;
    window.location.search = `?guest=${encodeURIComponent(guestName.trim().replace(/\s+/g, '_'))}&salutation=${encodeURIComponent(salutation.trim().replace(/\s+/g, '_'))}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            className="relative w-full max-w-md rounded-2xl border-2 border-antique-gold bg-gradient-to-b from-[#2E050D] via-[#480A16] to-[#1E0308] p-4 sm:p-6 text-ivory shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-antique-gold/30">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-antique-gold" />
                <h3 className="font-royal text-base sm:text-lg font-bold text-antique-gold-lighter tracking-wide">
                  {language === 'hi' ? 'व्यक्तिगत अतिथि निमंत्रण लिंक' : 'Personalized Guest Invitation Link'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-sandstone hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="mt-2.5 text-xs font-hindi text-sandstone/90 leading-relaxed">
              {language === 'hi'
                ? 'अपने सम्मानित अतिथि का नाम दर्ज करें। उनके नाम से व्यक्तिगत निमंत्रण लिंक तैयार हो जाएगा, जिसे आप सीधे WhatsApp पर सस्नेह साझा कर सकते हैं।'
                : 'Enter your esteemed guest name. A personalized royal invitation link will be created which you can share directly via WhatsApp.'}
            </p>

            {/* Input Form */}
            <div className="mt-4 space-y-3 text-left">
              {/* Salutation Selector */}
              <div>
                <label className="block text-[11px] font-royal font-semibold text-antique-gold mb-1">
                  {language === 'hi' ? 'आदरसूचक सम्बोधन (Salutation)' : 'Honorific / Salutation'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(language === 'hi' ? quickSalutationsHi : quickSalutationsEn).map((sal) => (
                    <button
                      key={sal}
                      type="button"
                      onClick={() => setSalutation(sal)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-hindi transition-all ${
                        salutation === sal
                          ? 'bg-antique-gold text-charcoal font-bold shadow-xs'
                          : 'bg-white/10 text-sandstone hover:bg-white/20'
                      }`}
                    >
                      {sal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Name Input */}
              <div>
                <label className="block text-[11px] font-royal font-semibold text-antique-gold mb-1">
                  {language === 'hi' ? 'अतिथि का शुभ नाम *' : "Guest's Honorable Name *"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={language === 'hi' ? 'जैसे: ठा. सा. भंवर सिंह जी' : 'e.g., Thakur Saheb Bhanwar Singh Ji'}
                    className="w-full px-3 py-2 rounded-xl border border-antique-gold/60 bg-black/40 text-sm font-hindi text-ivory placeholder-sandstone/50 focus:outline-none focus:border-antique-gold focus:ring-1 focus:ring-antique-gold"
                  />
                  {guestName && (
                    <UserCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-antique-gold" />
                  )}
                </div>
              </div>

              {/* Live Preview Card */}
              {guestName.trim() && (
                <div className="mt-2 p-3 rounded-xl border border-antique-gold/40 bg-gradient-to-r from-royal-maroon-dark/90 to-[#3C0812]/90 shadow-inner">
                  <p className="text-[10px] font-royal text-antique-gold uppercase tracking-widest font-bold">
                    {language === 'hi' ? 'कार्ड पर ऐसे प्रदर्शित होगा:' : 'Will appear on card as:'}
                  </p>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-antique-gold">⚜</span>
                    <span className="font-royal text-sm font-bold text-white">
                      {salutation} {guestName.trim()} सा
                    </span>
                  </div>
                  <p className="text-[10px] font-hindi text-sandstone/80 mt-0.5">
                    {language === 'hi'
                      ? '« चौहान परिवार आपका हार्दिक स्वागत करता है »'
                      : '« The Chauhan Family cordially welcomes you »'}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                {/* Share on WhatsApp */}
                <button
                  onClick={handleShareWhatsApp}
                  disabled={!guestName.trim()}
                  className={`w-full py-2.5 px-4 rounded-xl border-2 font-hindi text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-md ${
                    guestName.trim()
                      ? 'border-antique-gold bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:brightness-110 active:scale-95'
                      : 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>{language === 'hi' ? 'WhatsApp पर व्यक्तिगत निमंत्रण भेजें' : 'Share Invitation on WhatsApp'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    disabled={!guestName.trim()}
                    className={`py-2 px-3 rounded-xl border font-hindi text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      guestName.trim()
                        ? 'border-antique-gold/60 bg-white/10 text-antique-gold-lighter hover:bg-white/20 active:scale-95'
                        : 'border-gray-700 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (language === 'hi' ? 'कॉपी हो गया!' : 'Copied!') : (language === 'hi' ? 'लिंक कॉपी करें' : 'Copy Link')}</span>
                  </button>

                  {/* Preview Button */}
                  <button
                    onClick={handlePreview}
                    disabled={!guestName.trim()}
                    className={`py-2 px-3 rounded-xl border font-hindi text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      guestName.trim()
                        ? 'border-antique-gold/60 bg-white/10 text-antique-gold-lighter hover:bg-white/20 active:scale-95'
                        : 'border-gray-700 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'यह निमंत्रण देखें' : 'Preview Live'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
