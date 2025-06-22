'use client';

import Header from './components/Header';
import Benefits from './components/Benefits';
import LandForm from './components/LandForm';
import AboutUs from './components/AboutUs';
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
        
        <section id="form" className="section-padding relative">
          {/* Modern background for form section */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-subtle"></div>
            {/* Modern subtle pattern instead of vertical columns */}
            <div className="absolute inset-0">
              {/* Soft circular elements */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full opacity-5 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 right-0 w-80 h-80 bg-yellow-300 rounded-full opacity-5 blur-3xl transform translate-x-1/3"></div>
              <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-green-400 rounded-full opacity-5 blur-3xl transform translate-y-1/3"></div>
            </div>
          </div>
          
          <div className="container-content">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
                </svg>
              </div>
              <h2 className="section-title">
                {t.forms.common.submitDetails}
              </h2>
              <p className="section-subtitle">
                {t.forms.common.forBoth}
              </p>
            </div>
            
            <div className="card overflow-hidden">
              <LandForm />
            </div>
          </div>
        </section>
        
        <AboutUs />
        
        <Footer />
      </main>
    </>
  );
}
