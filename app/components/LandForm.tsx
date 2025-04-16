"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

type DistrictTalukaMap = {
  [key: string]: string[];
};

const districtTalukaData: DistrictTalukaMap = {
  "અમદાવાદ": ["અમદાવાદ સીટી (પૂર્વ)", "અમદાવાદ સીટી (પશ્ચિમ)", "બાવળા", "દસ્ક્રોઇ", "દેત્રોજ-રામપુરા", "ધંધુકા", "ધોલેરા", "ધોળકા", "માંડલ", "સાણંદ", "વિરમગામ"],
  "અમરેલી": ["અમરેલી", "બાબરા", "બગસરા", "ધારી", "જાફરાબાદ", "કુંકાવાવ", "લાઠી", "રાજુલા", "સાવરકુંડલા", "લીલીયા", "ખાંભા"],
  "આણંદ": ["આણંદ", "આંકલાવ", "બોરસદ", "ખંભાત", "પેટલાદ", "સોજિત્રા", "તારાપુર", "ઉમરેઠ"],
  "અરવલ્લી": ["મોડાસા", "બાયડ", "ભિલોડા", "ધનસુરા", "માલપુર", "મેઘરજ"],
  "બનાસકાંઠા": ["પાલનપુર", "અમીરગઢ", "ભાભર", "દાંતા", "દાંતીવાડા", "ડીસા", "દિયોદર", "ધાનેરા", "કાંકરેજ", "થરાદ", "વડગામ", "વાવ", "સુઇગામ", "લાખણી"],
  "ભરૂચ": ["ભરૂચ", "આમોદ", "અંકલેશ્વર", "હાંસોટ", "જંબુસર", "ઝઘડિયા", "વાગરા", "વાલિયા", "નેત્રંગ"],
  "ભાવનગર": ["ભાવનગર", "ગારીયાધાર", "વલ્લભીપુર", "મહુવા", "ઘોઘા", "જેસર", "પાલીતાણા", "સિહોર", "તળાજા", "ઉમરાળા"],
  "બોટાદ": ["બોટાદ", "બરવાળા", "ગઢડા", "રાણપુર"],
  "છોટાઉદેપુર": ["છોટાઉદેપુર", "બોડેલી", "પાવી જેતપુર", "ક્વાંટ", "નસવાડી", "સંખેડા"],
  "દાહોદ": ["દાહોદ", "દેવગઢબારિયા", "ધાનપુર", "ફતેપુરા", "ગરબાડા", "લીમખેડા", "ઝાલોદ", "સંજેલી", "સીંગવડ"],
  "ડાંગ": ["આહવા", "સુબિર", "વઘઇ"],
  "દેવભૂમિ": ["ખંભાળિયા", "દ્વારકા", "ભાણવડ", "કલ્યાણપુર"],
  "ગાંધીનગર": ["ગાંધીનગર", "દહેગામ", "કલોલ", "માણસા"],
  "ગીર સોમનાથ": ["પાટણ-વેરાવળ", "ગીર ગઢડા", "કોડીનાર", "સુત્રાપાડા", "તાલાલા", "ઉના"],
  "જામનગર": ["જામનગર", "ધ્રોળ", "જામજોધપુર", "જોડિયા", "કાલાવડ", "લાલપુર"],
  "જુનાગઢ": ["જુનાગઢ શહેર", "જુનાગઢ ગ્રામ્ય", "ભેંસાણ", "કેશોદ", "માળિયા", "માણાવદર", "માંગરોળ", "મેંદરડા", "વંથલી", "વિસાવદર"],
  "કચ્છ": ["ભુજ", "અબડાસા", "ભચાઉ", "ગાંધીધામ", "મુન્દ્રા", "નખત્રાણા", "અંજાર", "લખપત", "માંડવી", "રાપર"],
  "ખેડા": ["ખેડા", "નડીઆદ", "ગળતેશ્વર", "કપડવંજ", "કઠલાલ", "મહુધા", "માતર", "મહેમદાવાદ", "ઠાસરા", "વસો"],
  "મહીસાગર": ["લુણાવાડા", "બાલાસિનોર", "કડાણા", "ખાનપુર", "સંતરામપુર", "વિરપુર"],
  "મહેસાણા": ["મહેસાણા", "બેચરાજી", "વડનગર", "વિજાપુર", "જોટાણા", "કડી", "ખેરાલુ", "સતલાસણા", "ઊંઝા", "વિસનગર"],
  "મોરબી": ["મોરબી", "હળવદ", "માળિયા (મિયાણા)", "ટંકારા", "વાંકાનેર"],
  "નર્મદા": ["ડેડિયાપાડા", "ગરૂડેશ્વર", "નાંદોદ", "સાગબારા", "તિલકવાડા"],
  "નવસારી": ["નવસારી", "વાંસદા", "ચિખલી", "ગણદેવી", "જલાલપોર", "ખેરગામ"],
  "પંચમહાલ": ["ગોધરા", "ઘોઘંબા", "હાલોલ", "જાંબુઘોડા", "કાલોલ", "મોરવા હડફ", "શહેરા"],
  "પાટણ": ["પાટણ", "ચાણસ્મા", "હારીજ", "રાધનપુર", "સમી", "શંખેશ્વર", "સાંતલપુર", "સરસ્વતી", "સિદ્ધપુર"],
  "પોરબંદર": ["પોરબંદર", "કુતિયાણા", "રાણાવાવ"],
  "રાજકોટ": ["રાજકોટ", "ધોરાજી", "ગોંડલ", "જામકંડોરણા", "જસદણ", "જેતપુર", "કોટડા-સાંગાણી", "લોધિકા", "પડધરી", "ઉપલેટા", "વીંછીયા"],
  "સાબરકાંઠા": ["હિંમતનગર", "ઇડર", "ખેડબ્રહ્મા", "પ્રાંતિજ", "તલોદ", "વડાલી", "વિજયનગર", "પોશિના"],
  "સુરત": ["બારડોલી", "કામરેજ", "ચોર્યાસી", "મહુવા", "માંડવી", "માંગરોળ", "ઓલપાડ", "પલસાણા", "ઉમરપાડા"],
  "સુરેન્દ્રનગર": ["ચોટીલા", "ચુડા", "દસાડા", "ધ્રાંગધ્રા", "લખતર", "લીંબડી", "મુળી", "સાયલા", "થાનગઢ", "વઢવાણ"],
  "તાપી": ["વ્યારા", "નિઝર", "સોનગઢ", "ઉચ્છલ", "વાલોડ", "ડોલવણ", "કુકરમુંડા"],
  "વડોદરા": ["વડોદરા", "ડભોઇ", "ડેસર", "કરજણ", "પાદરા", "સાવલી", "શિનોર", "વાઘોડિયા"],
  "વલસાડ": ["વલસાડ", "ધરમપુર", "કપરાડા", "પારડી", "ઉમરગામ", "વાપી"]
};

export default function LandForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    village: '',
    district: '',
    taluka: '',
    location: '',
    landSize: '',
    option: 'sell', // 'sell' or 'lease'
    rate: '',
    isOwner: 'yes', // 'yes' or 'no' (broker)
  });
  
  const [availableTalukas, setAvailableTalukas] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (formData.district) {
      setAvailableTalukas(districtTalukaData[formData.district] || []);
      // Reset taluka when district changes
      setFormData(prev => ({ ...prev, taluka: '' }));
    } else {
      setAvailableTalukas([]);
    }
  }, [formData.district]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await addDoc(collection(db, 'landRequests'), {
        ...formData,
        createdAt: new Date()
      });
      setSubmitSuccess(true);
      setFormData({
        name: '',
        mobile: '',
        village: '',
        district: '',
        taluka: '',
        location: '',
        landSize: '',
        option: 'sell',
        rate: '',
        isOwner: 'yes',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      setSubmitError('ફોર્મ સબમિટ કરવામાં ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto border-2 border-green-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">તમારી જમીનની વિગતો આપો</h2>
      
      {submitSuccess ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          <strong>આભાર!</strong> તમારી માહિતી સફળતાપૂર્વક સબમિટ થઈ ગઈ છે. અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1 text-gray-800">નામ</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="તમારું પૂરું નામ"
            />
          </div>
          
          <div>
            <label htmlFor="mobile" className="block font-medium mb-1 text-gray-800">મોબાઇલ નંબર</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="તમારો 10-અંકનો મોબાઇલ નંબર"
            />
          </div>
          
          <div>
            <label htmlFor="district" className="block font-medium mb-1 text-gray-800">જિલ્લો</label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              <option value="">જિલ્લો પસંદ કરો</option>
              {Object.keys(districtTalukaData).map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="taluka" className="block font-medium mb-1 text-gray-800">તાલુકો</label>
            <select
              id="taluka"
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              required
              disabled={!formData.district}
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:bg-gray-100"
            >
              <option value="">તાલુકો પસંદ કરો</option>
              {availableTalukas.map((taluka) => (
                <option key={taluka} value={taluka}>{taluka}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="village" className="block font-medium mb-1 text-gray-800">ગામનું નામ</label>
            <input
              type="text"
              id="village"
              name="village"
              value={formData.village}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="જમીન ક્યા ગામમાં આવેલી છે?"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block font-medium mb-1 text-gray-800">સ્થળ</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="જમીનનું ચોક્કસ સ્થાન/સરનામું"
            />
          </div>
          
          <div>
            <label htmlFor="landSize" className="block font-medium mb-1 text-gray-800">જમીનનું માપ (એકરમાં)</label>
            <input
              type="text"
              id="landSize"
              name="landSize"
              value={formData.landSize}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="ઉદાહરણ: 5.5"
            />
          </div>
          
          <div>
            <label htmlFor="option" className="block font-medium mb-1 text-gray-800">વિકલ્પ પસંદ કરો</label>
            <select
              id="option"
              name="option"
              value={formData.option}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              <option value="sell">વેચાણ</option>
              <option value="lease">ભાડે આપવી</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="rate" className="block font-medium mb-1 text-gray-800">
              {formData.option === 'sell' ? 'વેચાણ દર (રૂપિયા પ્રતિ એકર)' : 'ભાડા દર (રૂપિયા પ્રતિ એકર પ્રતિ વર્ષ)'}
            </label>
            <input
              type="text"
              id="rate"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="ઉદાહરણ: 500000"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1 text-gray-800">શું તમે જમીનના માલિક છો?</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center text-gray-800">
                <input
                  type="radio"
                  name="isOwner"
                  value="yes"
                  checked={formData.isOwner === 'yes'}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-green-600"
                />
                હા, હું માલિક છું
              </label>
              <label className="inline-flex items-center text-gray-800">
                <input
                  type="radio"
                  name="isOwner"
                  value="no"
                  checked={formData.isOwner === 'no'}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-green-600"
                />
                ના, હું દલાલ છું
              </label>
            </div>
          </div>
          
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {submitError}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {isSubmitting ? 'સબમિટ કરી રહ્યા છીએ...' : 'વિગતો સબમિટ કરો'}
          </button>
        </form>
      )}
    </div>
  );
} 