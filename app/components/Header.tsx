"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [
    '/solar_image_01.jpg',
    '/solar_image_02.jpg',
    '/solar_image_03.jpg'
  ];

  // Image rotation effect every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative text-white py-16 px-4 overflow-hidden shadow-xl" style={{ minHeight: '650px' }}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        <Image 
          src={backgroundImages[currentImageIndex]} 
          alt="Solar panel field" 
          fill 
          priority
          quality={90}
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-10000 transform scale-105 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/60 to-green-700/40"></div>
      </div>
      
      {/* Animated solar rays in background */}
      <div className="absolute inset-0 z-1 opacity-20">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1/3 bg-gradient-to-b from-yellow-300 to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-30 w-1 h-1/3 bg-gradient-to-b from-yellow-300 to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-60 w-1 h-1/3 bg-gradient-to-b from-yellow-300 to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-90 w-1 h-1/3 bg-gradient-to-b from-yellow-300 to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-120 w-1 h-1/3 bg-gradient-to-b from-yellow-300 to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-150 w-1 h-1/3 bg-gradient-to-b from-yellow-300 to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-180 w-1 h-1/3 bg-gradient-to-b from-yellow-300 to-transparent"></div>
        </div>
      </div>
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>
      
      <div className="container-content flex flex-col items-center text-center">
        <div className="mb-8 bg-yellow-400/20 p-5 rounded-full inline-block backdrop-blur-sm border border-yellow-400/30 shadow-lg shadow-yellow-500/10">
          {/* Solar panel icon with sun rays */}
          <svg className="w-16 h-16 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.5L17.24 5.29L18.66 6.71M13 1H11V4H13M6.76 5.29L4.96 3.5L3.55 4.91L5.34 6.71M1 13H4V11H1M13 20H11V23H13" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{t.header.title}</h1>
        
        <div className="bg-black/40 backdrop-blur-sm py-4 px-8 rounded-xl mb-10 max-w-3xl border border-white/10 shadow-xl">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            {t.header.subtitle}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a 
            href="#form" 
            className="bg-white text-green-700 hover:bg-yellow-50 font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center border-b-4 border-green-500"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
            {t.buttons.submitLandDetails}
          </a>
          <a 
            href="#benefits" 
            className="bg-green-600 hover:bg-green-500 text-white border-2 border-white/30 font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
          >
            {/* Solar panel icon */}
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4,2H20A2,2 0 0,1 22,4V14A2,2 0 0,1 20,16H4A2,2 0 0,1 2,14V4A2,2 0 0,1 4,2M4,4V14H20V4H4M8,6H16V8H8V6M4,18H20A2,2 0 0,1 22,20V22H2V20A2,2 0 0,1 4,18Z" />
            </svg>
            {t.buttons.knowBenefits}
          </a>
        </div>
        
        <div className="mt-12 py-4 px-8 bg-yellow-500/20 backdrop-blur-sm rounded-xl inline-flex items-center border border-yellow-500/40 shadow-lg">
          {/* Rotating sun/solar energy icon */}
          <svg className="w-6 h-6 mr-3 text-yellow-300 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.5L17.24 5.29L18.66 6.71M13 1H11V4H13M6.76 5.29L4.96 3.5L3.55 4.91L5.34 6.71M1 13H4V11H1M13 20H11V23H13" />
          </svg>
          <span className="text-yellow-200 font-medium text-lg">{t.header.tagline}</span>
        </div>
      </div>
    </header>
  );
} 