import React, { createContext, useContext, useState, ReactNode } from 'react';

import PageLayoutTranslation from './PageLayoutTranslation';
import MainTranslation from './MainTranslation';
import CalendarTranslation from './CalendarTranslation';
import ProjectDetailTranslation from './ProjectDetailTranslation';
import ProjectsTranslation from './ProjectsTranslation';
import SettingsTranslation from './SettingsTranslation';
import AccountTranslation from './AccountTranslation';
import WikiTranslation from './WikiTranslation';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    ...MainTranslation.en,
    ...PageLayoutTranslation.en,
    ...CalendarTranslation.en,
    ...ProjectDetailTranslation.en,
    ...ProjectsTranslation.en,
    ...SettingsTranslation.en,
    ...AccountTranslation.en,
    ...WikiTranslation.en,
  },
  de: {
    ...MainTranslation.de,
    ...PageLayoutTranslation.de,
    ...CalendarTranslation.de,
    ...ProjectDetailTranslation.de,
    ...ProjectsTranslation.de,
    ...SettingsTranslation.de,
    ...AccountTranslation.de,
    ...WikiTranslation.de,
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}