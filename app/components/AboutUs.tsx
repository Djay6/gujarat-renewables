"use client";

import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function AboutUs() {
  const { language } = useLanguage();
  
  // Content translations
  const content = {
    gu: {
      heading: "અમારા વિશે",
      companyName: "ગુજરાત રિન્યુએબલ્સ",
      paragraph1: "અમે ગુજરાતના અગ્રણી જમીન એકત્રિકરણ સલાહકાર છીએ, જે સોલાર પ્રોજેક્ટ્સ માટે જમીન ની વ્યવસ્થા કરે છે. અમારી ટીમ 10+ વર્ષના અનુભવ સાથે, અમે 1000+ એકર જમીન ની સફળ વ્યવસ્થા કરી છે.",
      paragraph2: "અમે માનીએ છીએ કે સૌર ઊર્જા ભવિષ્ય છે, અને અમે ખેડૂતો અને જમીન માલિકોને તેમની બિનવપરાશી જમીનોનો સારો ઉપયોગ કરવામાં મદદ કરીને સ્વચ્છ ઊર્જાના વિકાસમાં ફાળો આપવા માંગીએ છીએ.",
      valuesHeading: "અમારા મૂલ્યો",
      values: [
        "પારદર્શકતા અને પ્રામાણિકતા",
        "ખેડૂતો અને જમીન માલિકોનું હિત સર્વોપરી",
        "લાંબા ગાળાના સંબંધો",
        "પર્યાવરણીય જવાબદારી"
      ],
      callText: "કૉલ કરો",
      phoneNumber: "+91 9876543210",
      emailText: "ઈમેલ",
      emailAddress: "info@gujaratrenewables.com"
    },
    en: {
      heading: "About Us",
      companyName: "Gujarat Renewables",
      paragraph1: "We are Gujarat's leading land aggregation consultants, arranging land for solar projects. With a team experienced for over 10+ years, we have successfully arranged 1000+ acres of land.",
      paragraph2: "We believe solar energy is the future, and we want to contribute to clean energy development by helping farmers and landowners make good use of their unused lands.",
      valuesHeading: "Our Values",
      values: [
        "Transparency and Honesty",
        "Interests of Farmers and Landowners First",
        "Long-term Relationships",
        "Environmental Responsibility"
      ],
      callText: "Call Us",
      phoneNumber: "+91 9876543210",
      emailText: "Email",
      emailAddress: "info@gujaratrenewables.com"
    }
  };

  // Get content for current language
  const t = content[language];

  return (
    <div className="bg-white py-16 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">{t.heading}</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-[350px]">
              {/* Use the solar image for the about section */}
              <Image 
                src="/solar_image_03.jpg"
                alt="Solar panel farm"
                fill
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{t.companyName}</h3>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                {t.paragraph1}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t.paragraph2}
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-600">
                <h4 className="font-bold text-xl text-green-800 mb-4">{t.valuesHeading}</h4>
                <ul className="space-y-3 text-gray-800">
                  {t.values.map((value, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                      </svg>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
                  <div className="bg-green-600 text-white p-3 rounded-full mr-4">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.callText}</p>
                    <p className="font-bold text-gray-800">{t.phoneNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
                  <div className="bg-green-600 text-white p-3 rounded-full mr-4">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.emailText}</p>
                    <p className="font-bold text-gray-800">{t.emailAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 