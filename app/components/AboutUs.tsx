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
      ]
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
      ]
    }
  };

  // Get content for current language
  const t = content[language];

  return (
    <section className="section-padding bg-white" id="about">
      <div className="container-content">
        <h2 className="section-title">{t.heading}</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl h-[350px]">
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
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-600">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 