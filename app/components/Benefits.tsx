"use client";

import Image from 'next/image';

export default function Benefits() {
  const benefits = [
    {
      title: 'સ્થિર આવક',
      description: 'જમીન ભાડે આપવાથી 25-30 વર્ષ સુધી નિયમિત અને સ્થિર આવક મળે છે.',
      icon: '💰'
    },
    {
      title: 'જમીન ઉપયોગ',
      description: 'તમારી બિનઉપયોગી અથવા ઓછી ઉપજાઉ જમીનનો અસરકારક ઉપયોગ.',
      icon: '🌱'
    },
    {
      title: 'કોઈ રોકાણ નહીં',
      description: 'તમારે કોઈ રોકાણ કરવું પડશે નહીં, બધા ખર્ચ અમે ઉઠાવીએ છીએ.',
      icon: '💸'
    },
    {
      title: 'પર્યાવરણ સંરક્ષણ',
      description: 'તમે સ્વચ્છ ઊર્જા ઉત્પાદનમાં યોગદાન આપી રહ્યા છો.',
      icon: '🌞'
    },
    {
      title: 'જમીન મૂલ્યમાં વધારો',
      description: 'ઇન્ફ્રાસ્ટ્રક્ચર વિકાસને કારણે તમારી આસપાસની જમીનનું મૂલ્ય વધી શકે છે.',
      icon: '📈'
    },
    {
      title: 'સુરક્ષિત કરાર',
      description: 'અમે કાયદેસર, પારદર્શક અને લાંબા ગાળાના કરાર કરીએ છીએ.',
      icon: '📝'
    }
  ];

  return (
    <div className="bg-green-50 py-12 px-4 rounded-lg">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">સોલાર પ્રોજેક્ટ માટે તમારી જમીન આપવાના ફાયદા</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">{benefit.icon}</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">{benefit.title}</h3>
            <p className="text-gray-700">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 