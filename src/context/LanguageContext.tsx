import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  type WeddingDataStructure,
  WEDDING_DATA_HI,
  getWeddingData
} from '../data/weddingData';

export type Language = 'hi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  selectLanguage: (lang: Language) => void;
  data: WeddingDataStructure;
  showLanguageDialog: boolean;
  setShowLanguageDialog: (show: boolean) => void;
}

const STORAGE_LANG_KEY = 'rj_wedding_chosen_lang_v1';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('hi');
  const [showLanguageDialog, setShowLanguageDialog] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_LANG_KEY) as Language | null;
      if (savedLang === 'hi' || savedLang === 'en') {
        setLanguageState(savedLang);
        setShowLanguageDialog(false);
      } else {
        // Prompt first-time visitor to choose language
        setShowLanguageDialog(true);
      }
    } catch {
      // Default to Hindi if storage blocked
      setLanguageState('hi');
    }
  }, []);

  const selectLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setShowLanguageDialog(false);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  const data = getWeddingData(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        selectLanguage,
        data,
        showLanguageDialog,
        setShowLanguageDialog
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback outside provider
    return {
      language: 'hi',
      setLanguage: () => {},
      selectLanguage: () => {},
      data: WEDDING_DATA_HI,
      showLanguageDialog: false,
      setShowLanguageDialog: () => {}
    };
  }
  return context;
}
