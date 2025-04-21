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

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const seoTitle = language === 'gu' 
    ? 'ગુજરાત રિન્યુએબલ્સ | સોલાર લેન્ડ એગ્રિગેટર' 
    : 'Gujarat Renewables | Solar Land Aggregator';
  
  const seoDescription = language === 'gu'
    ? 'ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ માટે તમારી જમીન ભાડે આપો અથવા વેચો. સોલાર પ્રોજેક્ટ્સ માટે અમે જમીન સંપાદન અને લીઝ સેવાઓ પ્રદાન કરીએ છીએ.'
    : 'Lease or sell your land for solar projects in Gujarat. We provide land acquisition and leasing services for solar projects.';

  const seoKeywords = language === 'gu'
    ? 'solar land Gujarat, solar land aggregator, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ, solar land investment Gujarat'
    : 'solar land Gujarat, solar land aggregator, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, solar land investment Gujarat, gujarat renewable energy';

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        language={language as 'gu' | 'en'}
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
        
        <section id="benefits" className="py-16 px-4">
          <Benefits />
        </section>
        
        <section id="form" className="py-16 px-4 bg-green-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
              {t.forms.common.submitDetails}
            </h2>
            <p className="text-center text-green-700 mb-12 max-w-2xl mx-auto">
              {t.forms.common.forBoth}
            </p>
            <LandForm />
          </div>
        </section>
        
        <section id="about" className="py-16">
          <AboutUs />
        </section>
        
        <Footer />
      </main>
    </>
  );
}
