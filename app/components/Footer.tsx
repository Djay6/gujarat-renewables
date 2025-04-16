"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ગુજરાત રિન્યુએબલ્સ</h3>
            <p className="text-green-100">
              સોલાર પ્રોજેક્ટ્સ માટે જમીન એકત્રિકરણમાં અગ્રેસર.
              અમે તમારી જમીનના શ્રેષ્ઠ ઉપયોગ માટે સમર્પિત છીએ.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">સંપર્ક માહિતી</h3>
            <ul className="space-y-2 text-green-50">
              <li className="flex items-center">
                <span className="mr-2 text-white">📞</span>
                <span className="text-green-50">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-white">📧</span>
                <span className="text-green-50">info@gujaratrenewables.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-white">📍</span>
                <span className="text-green-50">314, ગ્રીન ટાવર, એસજી હાઈવે, અમદાવાદ, ગુજરાત 380015</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">અમને અનુસરો</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-green-300">
                <span className="text-2xl">📱</span>
              </a>
              <a href="#" className="text-white hover:text-green-300">
                <span className="text-2xl">💻</span>
              </a>
              <a href="#" className="text-white hover:text-green-300">
                <span className="text-2xl">📷</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} ગુજરાત રિન્યુએબલ્સ. બધા અધિકારો સુરક્ષિત.</p>
          <div className="mt-2 text-xs text-green-400">
            <Link href="/admin" className="opacity-70 hover:opacity-100 hover:underline">
              એડમિન લોગિન
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 