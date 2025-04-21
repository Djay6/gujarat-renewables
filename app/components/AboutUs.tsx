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
    <div className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">{t.heading}</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
              {/* Replace with an actual image of solar panels or your company */}
              <div className="w-full h-full bg-green-200 flex items-center justify-center">
                <span className="text-6xl">🌞</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-green-700 mb-4">{t.companyName}</h3>
            <p className="mb-4 text-gray-700">
              {t.paragraph1}
            </p>
            <p className="mb-4 text-gray-700">
              {t.paragraph2}
            </p>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
              <h4 className="font-bold text-green-800 mb-2">{t.valuesHeading}</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                {t.values.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.callText}</p>
                  <p className="font-bold text-gray-800">{t.phoneNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <span className="text-2xl">📧</span>
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
  );
} 