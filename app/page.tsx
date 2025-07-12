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
  const seoTitle = 'Gujarat Renewables | Solar & Renewable Energy Land Aggregator in Gujarat';
  const seoDescription = 'Gujarat Renewables provides premium land acquisition and leasing services for solar and renewable energy projects in Gujarat. Lease or sell your land for solar and renewable energy projects with the leading land aggregator in Gujarat.';
  const seoKeywords = 'solar land Gujarat, solar land aggregator, renewable land aggregator, renewable energy Gujarat, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, solar project land, solar land investment Gujarat, gujarat renewable energy, solar land acquisition, solar energy land Gujarat, land for renewable projects, sell land to solar companies, lease land to solar developers, renewable energy land investment, solar power plant land Gujarat, solar panel farm land, renewable energy project land, solar energy investment Gujarat, land leasing for solar farms, Kutch solar land, Banaskantha solar land, Patan solar land, North Gujarat solar land, Saurashtra solar land, Central Gujarat solar land, South Gujarat renewable land, agricultural land for solar Gujarat, barren land for solar projects, unused land for renewable energy, wasteland for solar development, non-agricultural land for solar Gujarat, industrial land for solar projects, land aggregation for solar developers, land pooling for renewable projects, long-term land lease for solar, land purchase for renewable energy, land valuation for solar projects, land due diligence for solar farms, minimum land size for solar project Gujarat, land requirements for 1MW solar plant, solar farm land specifications, ideal land for solar installation, solar land site selection criteria, land survey for renewable projects, landowner benefits from solar leasing, passive income from solar land, land monetization through renewables, land value appreciation with solar, guaranteed land rent from solar projects, how to lease land for solar in Gujarat, where to sell land for solar projects, best districts for solar land in Gujarat, how much land needed for solar farm, solar land lease rates in Gujarat, land acquisition process for solar';

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
        imageUrl="https://gujaratrenewables.in/og-image.svg"
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
