"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type Language = 'gu' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('gu');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'gu')) {
      setLanguage(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  // Save language preference whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    }
  }, [language, isLoaded]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 