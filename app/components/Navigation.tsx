"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Navigation() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-green-800 text-white py-4 px-4 shadow-md sticky top-0 z-50">
      <div className="container-content flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center">
          <svg className="w-8 h-8 mr-2 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.5L17.24 5.29L18.66 6.71M13 1H11V4H13M6.76 5.29L4.96 3.5L3.55 4.91L5.34 6.71M1 13H4V11H1M13 20H11V23H13" />
          </svg>
          Gujarat Renewables
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-yellow-300 transition-colors">
            {t.navigation.home}
          </Link>
          <Link href="/#about" className="hover:text-yellow-300 transition-colors">
            {t.navigation.about}
          </Link>
          <Link href="/blog" className="hover:text-yellow-300 transition-colors">
            {t.navigation.blog}
          </Link>
          <Link href="#form" className="hover:text-yellow-300 transition-colors">
            {t.navigation.contact}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-green-700 rounded-lg p-4">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="hover:text-yellow-300 transition-colors py-2 px-4 hover:bg-green-600 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.navigation.home}
            </Link>
            <Link 
              href="/#about" 
              className="hover:text-yellow-300 transition-colors py-2 px-4 hover:bg-green-600 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.navigation.about}
            </Link>
            <Link 
              href="/blog" 
              className="hover:text-yellow-300 transition-colors py-2 px-4 hover:bg-green-600 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.navigation.blog}
            </Link>
            <Link 
              href="#form" 
              className="hover:text-yellow-300 transition-colors py-2 px-4 hover:bg-green-600 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.navigation.contact}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 