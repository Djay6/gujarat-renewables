import Header from './components/Header';
import Benefits from './components/Benefits';
import LandForm from './components/LandForm';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <section id="benefits" className="py-16 px-4">
        <Benefits />
      </section>
      
      <section id="form" className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            તમારી જમીન વિગતો સબમિટ કરો
          </h2>
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
