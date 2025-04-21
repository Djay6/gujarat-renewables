'use client';

import Header from './components/Header';
import Benefits from './components/Benefits';
import LandForm from './components/LandForm';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
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
  );
}
