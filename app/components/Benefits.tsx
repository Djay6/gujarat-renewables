"use client";

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import Image from 'next/image';

export default function Benefits() {
  const { language } = useLanguage();
  const t = translations[language];

  // Solar-themed icons for benefits with enhanced visuals
  const solarIcons = {
    income: (
      <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-full shadow-inner flex items-center justify-center">
        <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,15V14H7V12H12V11H9V9H12V8H7V6H12V5H5V19H12V18H7V16H12V15M14,5H22V19H14V5M20,9H16V7H20V9M20,13H16V11H20V13M20,17H16V15H20V17Z" />
        </svg>
      </div>
    ),
    land: (
      <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-full shadow-inner flex items-center justify-center">
        <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8,18H16V20H8V18M12,2C9.3,2 7.1,4.3 7.1,7H5V9H7V14L5,16V19H7V18H17V19H19V16L17,14V9H19V7H16.9C16.9,4.3 14.7,2 12,2M12,4C13.5,4 14.7,5.2 14.8,6.7C14.3,6.9 13.8,7 13.2,7C11.9,7 10.7,6.4 9.9,5.5C10.6,4.6 11.3,4 12,4M14,9H16V12.4L17,13.5V16H7V13.5L8,12.4V9H10V12H12V9H14V12Z" />
        </svg>
      </div>
    ),
    investment: (
      <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-full shadow-inner flex items-center justify-center">
        <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
        </svg>
      </div>
    ),
    environmental: (
      <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-full shadow-inner flex items-center justify-center">
        <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.5L17.24 5.29L18.66 6.71M13 1H11V4H13M6.76 5.29L4.96 3.5L3.55 4.91L5.34 6.71M1 13H4V11H1M13 20H11V23H13" />
        </svg>
      </div>
    ),
    valueIncrease: (
      <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-full shadow-inner flex items-center justify-center">
        <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.5,18.5L9.5,12.5L13.5,16.5L22,6.92L20.59,5.5L13.5,13.5L9.5,9.5L2,17L3.5,18.5Z" />
        </svg>
      </div>
    ),
    agreement: (
      <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-full shadow-inner flex items-center justify-center">
        <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H14.82C14.25 1.44 12.53 0.64 11 1.2C10.14 1.5 9.5 2.16 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M12 3C12.55 3 13 3.45 13 4S12.55 5 12 5 11 4.55 11 4 11.45 3 12 3M7 7H17V5H19V19H5V5H7V7Z" />
        </svg>
      </div>
    )
  };

  // Define benefits in both languages with solar icons
  const benefitsData = {
    gu: [
      {
        title: 'સ્થિર આવક',
        description: 'જમીન ભાડે આપવાથી 25-30 વર્ષ સુધી નિયમિત અને સ્થિર આવક મળે છે.',
        icon: solarIcons.income
      },
      {
        title: 'જમીન ઉપયોગ',
        description: 'તમારી બિનઉપયોગી અથવા ઓછી ઉપજાઉ જમીનનો અસરકારક ઉપયોગ.',
        icon: solarIcons.land
      },
      {
        title: 'કોઈ રોકાણ નહીં',
        description: 'તમારે કોઈ રોકાણ કરવું પડશે નહીં, બધા ખર્ચ અમે ઉઠાવીએ છીએ.',
        icon: solarIcons.investment
      },
      {
        title: 'પર્યાવરણ સંરક્ષણ',
        description: 'તમે સ્વચ્છ ઊર્જા ઉત્પાદનમાં યોગદાન આપી રહ્યા છો.',
        icon: solarIcons.environmental
      },
      {
        title: 'જમીન મૂલ્યમાં વધારો',
        description: 'ઇન્ફ્રાસ્ટ્રક્ચર વિકાસને કારણે તમારી આસપાસની જમીનનું મૂલ્ય વધી શકે છે.',
        icon: solarIcons.valueIncrease
      },
      {
        title: 'સુરક્ષિત કરાર',
        description: 'અમે કાયદેસર, પારદર્શક અને લાંબા ગાળાના કરાર કરીએ છીએ.',
        icon: solarIcons.agreement
      }
    ],
    en: [
      {
        title: 'Stable Income',
        description: 'Leasing your land provides regular and stable income for 25-30 years.',
        icon: solarIcons.income
      },
      {
        title: 'Land Utilization',
        description: 'Effective use of your unused or less productive land.',
        icon: solarIcons.land
      },
      {
        title: 'No Investment',
        description: 'You don\'t need to make any investment, we cover all costs.',
        icon: solarIcons.investment
      },
      {
        title: 'Environmental Protection',
        description: 'You are contributing to clean energy production.',
        icon: solarIcons.environmental
      },
      {
        title: 'Land Value Increase',
        description: 'Infrastructure development may increase the value of your surrounding land.',
        icon: solarIcons.valueIncrease
      },
      {
        title: 'Secure Agreements',
        description: 'We make legal, transparent, and long-term agreements.',
        icon: solarIcons.agreement
      }
    ]
  };

  // Choose benefits based on current language
  const benefits = benefitsData[language];
  
  // Title translations
  const benefitsTitle = {
    gu: "સોલાર પ્રોજેક્ટ માટે તમારી જમીન આપવાના ફાયદા",
    en: "Benefits of Providing Your Land for Solar Projects"
  };

  return (
    <div className="relative py-20 px-4" id="benefits">
      {/* Solar panel background with enhanced overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent opacity-90"></div>
        <Image 
          src="/solar_image_02.jpg" 
          alt="Solar panel field" 
          fill 
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="opacity-30"
        />
        
        {/* Solar-themed decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-green-50 to-transparent"></div>
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/3 -right-10 w-72 h-72 bg-green-500 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header with Solar Icon */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg mb-6 p-5 border-4 border-white">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.5L17.24 5.29L18.66 6.71M13 1H11V4H13M6.76 5.29L4.96 3.5L3.55 4.91L5.34 6.71M1 13H4V11H1M13 20H11V23H13" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center text-green-800 mb-4">
            {benefitsTitle[language]}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center group relative overflow-hidden"
            >
              {/* Solar ray decorative element */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400 opacity-0 group-hover:opacity-10 rounded-full transition-all duration-500 transform group-hover:scale-150"></div>
              
              <div className="mb-6 transform transition-transform duration-500 group-hover:scale-110">{benefit.icon}</div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">{benefit.title}</h3>
              <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
              
              {/* Solar panel decorative element at bottom */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
} 