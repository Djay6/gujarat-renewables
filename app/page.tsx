'use client';

import Header from './components/Header';
import Benefits from './components/Benefits';
import LandForm from './components/LandForm';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations';
import SEO from './components/SEO';
import SchemaOrg from './components/SchemaOrg';
import Image from 'next/image';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  // Always use English for SEO to optimize for English searches
  const seoTitle = 'Gujarat Renewables | Solar Land Aggregator in Gujarat | Solar Project Land';
  const seoDescription = 'Gujarat Renewables provides premium land acquisition and leasing services for solar projects in Gujarat. Lease or sell your land for solar energy projects with the best solar land aggregator in Gujarat.';
  const seoKeywords = 'solar land Gujarat, solar land aggregator, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, solar land investment Gujarat, gujarat renewable energy, solar project land, solar land acquisition, solar energy land Gujarat';

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        language='en'
        ogImage="/og-image.svg"
      />
      <SchemaOrg
        title={seoTitle}
        description={seoDescription}
        organizationName="Gujarat Renewables"
        imageUrl="https://gujaratrenewables.com/og-image.svg"
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        
        <Benefits />
        
        <section id="form" className="py-20 px-4 relative">
          {/* Background pattern for form section */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50 to-green-100"></div>
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMEwzMCA2MEwwIDYwTDAgMEwzMCAwWiIgZmlsbD0iIzEwYjk4MSIvPjwvc3ZnPg==')]"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                {t.forms.common.submitDetails}
              </h2>
              <p className="text-green-700 mb-2 max-w-2xl mx-auto text-lg">
                {t.forms.common.forBoth}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <LandForm />
            </div>
          </div>
        </section>
        
        <AboutUs />
        
        <Contact />
        
        <Footer />
      </main>
    </>
  );
}
