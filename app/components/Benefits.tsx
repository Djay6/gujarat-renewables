"use client";

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Benefits() {
  const { language } = useLanguage();
  const t = translations[language];

  // Define benefits in both languages
  const benefitsData = {
    gu: [
      {
        title: 'સ્થિર આવક',
        description: 'જમીન ભાડે આપવાથી 25-30 વર્ષ સુધી નિયમિત અને સ્થિર આવક મળે છે.',
        icon: '💰'
      },
      {
        title: 'જમીન ઉપયોગ',
        description: 'તમારી બિનઉપયોગી અથવા ઓછી ઉપજાઉ જમીનનો અસરકારક ઉપયોગ.',
        icon: '🌱'
      },
      {
        title: 'કોઈ રોકાણ નહીં',
        description: 'તમારે કોઈ રોકાણ કરવું પડશે નહીં, બધા ખર્ચ અમે ઉઠાવીએ છીએ.',
        icon: '💸'
      },
      {
        title: 'પર્યાવરણ સંરક્ષણ',
        description: 'તમે સ્વચ્છ ઊર્જા ઉત્પાદનમાં યોગદાન આપી રહ્યા છો.',
        icon: '🌞'
      },
      {
        title: 'જમીન મૂલ્યમાં વધારો',
        description: 'ઇન્ફ્રાસ્ટ્રક્ચર વિકાસને કારણે તમારી આસપાસની જમીનનું મૂલ્ય વધી શકે છે.',
        icon: '📈'
      },
      {
        title: 'સુરક્ષિત કરાર',
        description: 'અમે કાયદેસર, પારદર્શક અને લાંબા ગાળાના કરાર કરીએ છીએ.',
        icon: '📝'
      }
    ],
    en: [
      {
        title: 'Stable Income',
        description: 'Leasing your land provides regular and stable income for 25-30 years.',
        icon: '💰'
      },
      {
        title: 'Land Utilization',
        description: 'Effective use of your unused or less productive land.',
        icon: '🌱'
      },
      {
        title: 'No Investment',
        description: 'You don\'t need to make any investment, we cover all costs.',
        icon: '💸'
      },
      {
        title: 'Environmental Protection',
        description: 'You are contributing to clean energy production.',
        icon: '🌞'
      },
      {
        title: 'Land Value Increase',
        description: 'Infrastructure development may increase the value of your surrounding land.',
        icon: '📈'
      },
      {
        title: 'Secure Agreements',
        description: 'We make legal, transparent, and long-term agreements.',
        icon: '📝'
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
    <div className="bg-green-50 py-12 px-4 rounded-lg" id="benefits">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">{benefitsTitle[language]}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">{benefit.icon}</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">{benefit.title}</h3>
            <p className="text-gray-700">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 