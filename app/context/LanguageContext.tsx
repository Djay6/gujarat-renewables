"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type Language = 'gu' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved language preference on mount
  useEffect(() => {
    try {
      // Clear any previously saved language to ensure we start with English
      localStorage.removeItem('language');
      
      // Only use saved language if explicitly set by user after this change
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'gu')) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      // Handle case where localStorage is not available
      console.error('Error accessing localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save language preference whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
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