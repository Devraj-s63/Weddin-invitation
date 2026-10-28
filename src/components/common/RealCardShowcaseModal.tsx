import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Image as ImageIcon } from 'lucide-react';

interface RealCardShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RealCardShowcaseModal: React.FC<RealCardShowcaseModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeMedia, setActiveMedia] = useState<'photo' | 'video'>('photo');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-lg bg-[#2A080F] border-2 border-[#E6C98A] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-royal-maroon-dark via-royal-maroon to-royal-maroon-dark border-b border-antique-gold/40 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-royal tracking-widest text-[#FCE8B2] uppercase font-bold">
                मेवाड़ राजपूताना
              </span>
              <h3 className="font-royal text-base sm:text-lg font-bold text-[#FFF4D0]">
                वास्तविक मुद्रित पत्रिका
              </h3>
            </div>

            <button
              onClick={onClose}
              aria-label="बंद करें"
              className="p-1.5 rounded-full bg-black/40 text-sandstone hover:text-white border border-antique-gold/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Switcher Tabs */}
          <div className="flex border-b border-antique-gold/20 bg-charcoal-dark/60 p-2 gap-2">
            <button
              onClick={() => setActiveMedia('photo')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-hindi font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                activeMedia === 'photo'
                  ? 'bg-antique-gold text-charcoal-dark font-bold shadow-md'
                  : 'text-sandstone hover:text-ivory bg-charcoal/40'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>पत्रिका चित्र (Photo)</span>
            </button>

            <button
              onClick={() => setActiveMedia('video')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-hindi font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                activeMedia === 'video'
                  ? 'bg-antique-gold text-charcoal-dark font-bold shadow-md'
                  : 'text-sandstone hover:text-ivory bg-charcoal/40'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>पत्रिका वीडियो (Video)</span>
            </button>
          </div>

          {/* Media Body */}
          <div className="p-3 sm:p-4 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-[#1F050A]">
            {activeMedia === 'photo' ? (
              <div className="relative w-full rounded-xl overflow-hidden border border-antique-gold/30 bg-black/40 shadow-inner max-h-[60vh] flex items-center justify-center">
                <img
                  src="/images/user-wedding-card.jpg"
                  alt="देवराज सिंह एवं मधु कंवर की वास्तविक मुद्रित शादी पत्रिका"
                  className="w-full h-auto max-h-[58vh] object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full rounded-xl overflow-hidden border border-antique-gold/30 bg-black max-h-[60vh] flex items-center justify-center">
                <video
                  src="/video/user-wedding-video.mp4"
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-auto max-h-[58vh] object-contain"
                />
              </div>
            )}

            <p className="font-hindi text-xs text-[#EAD7BE] mt-3 text-center leading-relaxed">
              पारंपरिक हाथी, जाली झरोखा एवं श्री गणेश मंडप कलाकृति से सुसज्जित पावन पत्रिका
            </p>
          </div>

          {/* Footer */}
          <div className="p-3 bg-charcoal-dark/90 border-t border-antique-gold/20 flex items-center justify-between text-xs text-sandstone font-hindi">
            <span>भीलवाड़ा, राजस्थान</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full border border-antique-gold/50 bg-royal-maroon text-[#FFF4D0] font-semibold hover:bg-royal-maroon-dark active:scale-95 transition-all"
            >
              वापस जाएँ
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
