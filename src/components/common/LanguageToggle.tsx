import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { triggerPetalShower } from './PetalShower';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    const nextLang = language === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
    triggerPetalShower();
  };

  return (
    <button
      onClick={handleToggle}
      title={language === 'hi' ? 'Switch to English' : 'हिन्दी में देखें'}
      className={`fixed top-4 left-4 z-40 flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-antique-gold/60 bg-royal-maroon-dark/90 hover:bg-royal-maroon text-[#FFF4D0] backdrop-blur-md shadow-royal-glow active:scale-95 transition-all duration-300 text-xs font-royal ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-antique-gold" />
      <span className="font-bold tracking-wider">
        {language === 'hi' ? 'EN' : 'हिन्दी'}
      </span>
    </button>
  );
};
