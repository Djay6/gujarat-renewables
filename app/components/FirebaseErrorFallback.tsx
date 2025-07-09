'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

interface FirebaseErrorFallbackProps {
  onRetry?: () => void;
}

export default function FirebaseErrorFallback({ onRetry }: FirebaseErrorFallbackProps) {
  const { language } = useLanguage();
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Content translations
  const content = {
    gu: {
      title: "માફ કરશો, અમે કનેક્શન સમસ્યાઓનો અનુભવ કરી રહ્યા છીએ",
      message: "અમે આ સમસ્યા પર કામ કરી રહ્યા છીએ. કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો.",
      retry: "ફરી પ્રયાસ કરો",
      backToHome: "હોમ પેજ પર પાછા જાઓ",
      retryingIn: "ફરી પ્રયાસ કરી રહ્યા છીએ..."
    },
    en: {
      title: "Sorry, we're experiencing connection issues",
      message: "We're working on fixing this issue. Please try again later.",
      retry: "Retry Now",
      backToHome: "Back to Home",
      retryingIn: "Retrying..."
    }
  };

  // Get content for current language
  const t = content[language];

  const handleRetry = () => {
    if (onRetry && !isLoading) {
      setIsLoading(true);
      setRetryCount(prev => prev + 1);
      
      // Add a small delay to show loading state
      setTimeout(() => {
        onRetry();
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
          <p className="text-gray-600 mb-6">{t.message}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 disabled:opacity-50"
            >
              {isLoading ? t.retryingIn : t.retry}
            </button>
            <Link href="/" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md transition duration-300">
              {t.backToHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 