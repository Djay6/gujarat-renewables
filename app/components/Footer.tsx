"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  
  // Footer translations
  const content = {
    gu: {
      companyName: "ગુજરાત રિન્યુએબલ્સ",
      companyDescription: "સોલાર કંપનીઓ અને જમીન માલિકો વચ્ચે સંબંધ બાંધનારું પ્લેટફોર્મ. અમે તમારી જમીનને યોગ્ય સોલાર કંપની સાથે જોડવા માટે કામ કરીએ છીએ.",
      trustedIntermediary: "વિશ્વાસનીય ઇન્ટરમીડિયરી",
      contactInfo: "સંપર્ક માહિતી",
      phoneNumber: "+91 9876543210",
      email: "connect@gujaratrenewables.com",
      address: "314, ગ્રીન ટાવર, એસજી હાઈવે, અમદાવાદ, ગુજરાત 380015",
      services: "સેવાઓ",
      servicesList: [
        "જમીન માલિકો માટે સોલાર કંપનીઓની શોધ",
        "સોલાર કંપનીઓ માટે જમીનની શોધ",
        "કાનૂની પ્રક્રિયામાં સહાય"
      ],
      joinUs: "જોડાઓ",
      joinDescription: "સૌર ઊર્જા ક્ષેત્રની નવીનતમ તકો માટે જોડાઓ",
      emailPlaceholder: "તમારું ઇમેઇલ",
      subscribe: "સબસ્ક્રાઇબ",
      footerLinks: {
        aboutUs: "આપણા વિશે",
        landowners: "જમીન માલિકો",
        solarCompanies: "સોલાર કંપનીઓ",
        privacyPolicy: "ગોપનીયતા નીતિ",
        contactUs: "સંપર્ક કરો",
        adminLogin: "એડમિન લોગિન"
      },
      copyright: (year: number) => `&copy; ${year} ગુજરાત રિન્યુએબલ્સ. બધા અધિકારો સુરક્ષિત.`,
      bridgeText: "જમીન માલિકો અને સોલાર કંપનીઓ વચ્ચે સેતુ"
    },
    en: {
      companyName: "Gujarat Renewables",
      companyDescription: "A platform connecting solar companies and landowners. We work to match your land with the right solar company.",
      trustedIntermediary: "Trusted Intermediary",
      contactInfo: "Contact Information",
      phoneNumber: "+91 9876543210",
      email: "connect@gujaratrenewables.com",
      address: "314, Green Tower, SG Highway, Ahmedabad, Gujarat 380015",
      services: "Services",
      servicesList: [
        "Finding solar companies for landowners",
        "Finding land for solar companies",
        "Assistance in legal processes"
      ],
      joinUs: "Join Us",
      joinDescription: "Join us for the latest opportunities in the solar energy sector",
      emailPlaceholder: "Your email",
      subscribe: "Subscribe",
      footerLinks: {
        aboutUs: "About Us",
        landowners: "Landowners",
        solarCompanies: "Solar Companies",
        privacyPolicy: "Privacy Policy",
        contactUs: "Contact Us",
        adminLogin: "Admin Login"
      },
      copyright: (year: number) => `&copy; ${year} Gujarat Renewables. All rights reserved.`,
      bridgeText: "Bridging landowners and solar companies"
    }
  };

  // Get content for current language
  const t = content[language];

  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-900 text-white py-12 px-4 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-yellow-300 to-green-400"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-green-800/50 p-6 rounded-lg border border-green-700/50 shadow-inner">
            <div className="flex items-center mb-4">
              <div className="bg-green-700/50 p-2 rounded-full mr-3">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold">{t.companyName}</h3>
            </div>
            <p className="text-green-100 mb-4">
              {t.companyDescription}
            </p>
            <div className="mt-6 flex items-center justify-start">
              <div className="flex items-center bg-green-700/30 py-1 px-3 rounded-full text-sm">
                <svg className="w-4 h-4 mr-1 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>{t.trustedIntermediary}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-800/50 p-6 rounded-lg border border-green-700/50 shadow-inner">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
              </svg>
              {t.contactInfo}
            </h3>
            <ul className="space-y-4 text-green-50">
              <li className="flex items-center p-2 rounded-lg hover:bg-green-700/30 transition-colors">
                <div className="bg-green-700/50 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-green-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <span className="text-green-50">{t.phoneNumber}</span>
              </li>
              <li className="flex items-center p-2 rounded-lg hover:bg-green-700/30 transition-colors">
                <div className="bg-green-700/50 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-green-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <span className="text-green-50">{t.email}</span>
              </li>
              <li className="flex items-center p-2 rounded-lg hover:bg-green-700/30 transition-colors">
                <div className="bg-green-700/50 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-green-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-green-50">{t.address}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-800/50 p-6 rounded-lg border border-green-700/50 shadow-inner">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
              {t.services}
            </h3>
            <ul className="space-y-3 mt-2">
              {t.servicesList.map((service, index) => (
                <li key={index} className="flex items-start p-2 rounded-lg hover:bg-green-700/30 transition-colors">
                  <div className="bg-green-700/50 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-green-50">{service}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-green-700/30 p-3 rounded-lg mt-5">
              <h4 className="font-semibold text-green-100 mb-2">{t.joinUs}</h4>
              <p className="text-sm text-green-200 mb-3">{t.joinDescription}</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={t.emailPlaceholder} 
                  className="px-3 py-2 bg-green-900/50 text-white rounded-l-lg border border-green-600 focus:outline-none focus:ring-1 focus:ring-green-400 flex-grow" 
                />
                <button className="bg-green-600 hover:bg-green-500 px-3 py-2 rounded-r-lg text-white border border-green-600 transition-colors">
                  {t.subscribe}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-700/50 mt-8 pt-8 text-center">
          <div className="flex flex-wrap justify-center gap-5 mb-6 text-sm">
            <Link href="#" className="text-green-300 hover:text-white hover:underline">{t.footerLinks.aboutUs}</Link>
            <Link href="#landowner-form" className="text-green-300 hover:text-white hover:underline">{t.footerLinks.landowners}</Link>
            <Link href="#company-form" className="text-green-300 hover:text-white hover:underline">{t.footerLinks.solarCompanies}</Link>
            <Link href="#" className="text-green-300 hover:text-white hover:underline">{t.footerLinks.privacyPolicy}</Link>
            <Link href="#" className="text-green-300 hover:text-white hover:underline">{t.footerLinks.contactUs}</Link>
            <Link href="/admin" className="text-green-300 hover:text-white hover:underline">{t.footerLinks.adminLogin}</Link>
          </div>
          
          <p className="text-green-200" dangerouslySetInnerHTML={{ __html: t.copyright(new Date().getFullYear()) }}></p>
          
          <div className="flex justify-center mt-6 gap-4 text-xs text-green-300">
            <p>{t.bridgeText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 