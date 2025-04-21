"use client";

import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white py-12 px-4 relative overflow-hidden shadow-lg">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiAwSDJ2LTRoMnY0em0wIDZIMnYtNGgydjR6bTYtMTJoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNGgydjR6Ii8+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="mb-6 bg-white/10 p-4 rounded-full inline-block">
          <div className="text-5xl">🌞</div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">{t.header.title}</h1>
        
        <div className="bg-white/10 backdrop-blur-sm py-3 px-6 rounded-lg mb-8 max-w-3xl">
          <p className="text-xl md:text-2xl text-white/90">
            {t.header.subtitle}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a 
            href="#form" 
            className="bg-white text-green-700 hover:bg-yellow-50 font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
            {t.buttons.submitLandDetails}
          </a>
          <a 
            href="#benefits" 
            className="bg-green-600 hover:bg-green-500 text-white border-2 border-white/30 font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            {t.buttons.knowBenefits}
          </a>
        </div>
        
        <div className="mt-10 py-3 px-6 bg-white/10 backdrop-blur-sm rounded-lg inline-flex items-center">
          <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd"></path>
          </svg>
          <span className="text-yellow-200 font-medium">{t.header.tagline}</span>
        </div>
      </div>
    </header>
  );
} 