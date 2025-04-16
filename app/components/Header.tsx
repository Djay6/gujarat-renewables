"use client";

import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-500 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">ગુજરાત રિન્યુએબલ્સ</h1>
        <p className="text-xl md:text-2xl max-w-3xl">
          સોલાર પ્રોજેક્ટ્સ માટે તમારી જમીનને શ્રેષ્ઠ રીતે ઉપયોગમાં લો
        </p>
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <a 
            href="#form" 
            className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-full text-lg transition-colors"
          >
            જમીન વિગતો જમા કરો
          </a>
          <a 
            href="#benefits" 
            className="bg-transparent hover:bg-green-600 border-2 border-white font-bold py-3 px-6 rounded-full text-lg transition-colors"
          >
            ફાયદા જાણો
          </a>
        </div>
      </div>
    </header>
  );
} 