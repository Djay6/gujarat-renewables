"use client";

import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">અમારા વિશે</h2>
        
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
            <h3 className="text-2xl font-bold text-green-700 mb-4">ગુજરાત રિન્યુએબલ્સ</h3>
            <p className="mb-4 text-gray-700">
              અમે ગુજરાતના અગ્રણી જમીન એકત્રિકરણ સલાહકાર છીએ, જે સોલાર પ્રોજેક્ટ્સ માટે જમીન ની વ્યવસ્થા કરે છે. અમારી ટીમ 10+ વર્ષના અનુભવ સાથે, અમે 1000+ એકર જમીન ની સફળ વ્યવસ્થા કરી છે.
            </p>
            <p className="mb-4 text-gray-700">
              અમે માનીએ છીએ કે સૌર ઊર્જા ભવિષ્ય છે, અને અમે ખેડૂતો અને જમીન માલિકોને તેમની બિનવપરાશી જમીનોનો સારો ઉપયોગ કરવામાં મદદ કરીને સ્વચ્છ ઊર્જાના વિકાસમાં ફાળો આપવા માંગીએ છીએ.
            </p>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
              <h4 className="font-bold text-green-800 mb-2">અમારા મૂલ્યો</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                <li>પારદર્શકતા અને પ્રામાણિકતા</li>
                <li>ખેડૂતો અને જમીન માલિકોનું હિત સર્વોપરી</li>
                <li>લાંબા ગાળાના સંબંધો</li>
                <li>પર્યાવરણીય જવાબદારી</li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">કૉલ કરો</p>
                  <p className="font-bold text-gray-800">+91 9876543210</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ઈમેલ</p>
                  <p className="font-bold text-gray-800">info@gujaratrenewables.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 