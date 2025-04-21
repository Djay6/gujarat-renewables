"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

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
  const { language } = useLanguage();
  const t = translations[language];
  
  const [userType, setUserType] = useState('landowner'); // 'landowner' or 'company'
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    village: '',
    district: '',
    taluka: '',
    location: '',
    landSize: '',
    substationName: '',
    substationDistance: '',
    option: 'sell', // 'sell' or 'lease'
    rate: '',
    isOwner: 'yes', // 'yes' or 'no' (broker)
    // Company specific fields
    companyName: '',
    email: '',
    requirements: '',
    budget: '',
    timeline: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (type: string) => {
    setUserType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      if (userType === 'landowner') {
        await addDoc(collection(db, 'landRequests'), {
          ...formData,
          userType: 'landowner',
          createdAt: new Date()
        });
      } else {
        await addDoc(collection(db, 'companyRequests'), {
          ...formData,
          userType: 'company',
          createdAt: new Date()
        });
      }
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        mobile: '',
        village: '',
        district: '',
        taluka: '',
        location: '',
        landSize: '',
        substationName: '',
        substationDistance: '',
        option: 'sell',
        rate: '',
        isOwner: 'yes',
        // Company specific fields
        companyName: '',
        email: '',
        requirements: '',
        budget: '',
        timeline: '',
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
      <div className="flex justify-center mb-6">
        <div className="inline-block p-3 bg-green-100 rounded-full">
          <span className="text-4xl">{userType === 'landowner' ? '🌱' : '🏭'}</span>
        </div>
      </div>
      
      {/* User Type Toggle */}
      <div className="mb-8">
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => handleUserTypeChange('landowner')}
            className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
              userType === 'landowner'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.userTypes.landowner}
          </button>
          <button
            type="button"
            onClick={() => handleUserTypeChange('company')}
            className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
              userType === 'company'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.userTypes.solarCompany}
          </button>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-center text-green-700">
        {userType === 'landowner' ? t.forms.landowner.title : t.forms.company.title}
      </h2>
      <p className="text-center text-gray-600 mb-6">{t.forms.common.subtitle}</p>
      
      {userType === 'landowner' && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6 shadow-sm">
          <p className="flex items-center mb-1">
            <span className="text-xl mr-2">⚡</span>
            <span className="font-medium">{t.notices.important}:</span>
          </p>
          <p>{t.notices.substationDistance}</p>
        </div>
      )}
      
      {userType === 'company' && (
        <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 px-4 py-3 rounded-lg mb-6 shadow-sm">
          <p className="flex items-center mb-1">
            <span className="text-xl mr-2">💡</span>
            <span className="font-medium">{t.notices.important}:</span>
          </p>
          <p>{t.notices.companyHelp}</p>
        </div>
      )}
      
      {submitSuccess ? (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-6 rounded-lg mb-6 shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-2">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{t.common.thankYou}</h3>
          <p>{t.common.successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-4">
            <div className="flex items-center mb-1">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm">
                <span className="text-red-500 font-bold">*</span> {t.forms.common.requiredFields}
              </span>
            </div>
          </div>
          
          {userType === 'company' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.contactName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.forms.company.placeholders.contactName}
                  />
                </div>
                
                <div>
                  <label htmlFor="companyName" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.companyName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.forms.company.placeholders.companyName}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobile" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.mobile} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.forms.company.placeholders.mobile}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.forms.company.placeholders.email}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="district" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.district} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  >
                    <option value="">{t.forms.common.selectDistrict}</option>
                    {Object.keys(districtTalukaData).map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="taluka" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.taluka} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="taluka"
                    name="taluka"
                    value={formData.taluka}
                    onChange={handleChange}
                    required
                    disabled={!formData.district}
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 transition-colors"
                  >
                    <option value="">{t.forms.common.selectTaluka}</option>
                    {availableTalukas.map((taluka) => (
                      <option key={taluka} value={taluka}>{taluka}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="landSize" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.landSize} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="landSize"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.forms.company.placeholders.landSize}
                  />
                </div>
                
                <div>
                  <label htmlFor="requirements" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.requirements} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.forms.company.placeholders.requirements}
                  ></textarea>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.budget} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.forms.company.placeholders.budget}
                  />
                </div>
                
                <div>
                  <label htmlFor="timeline" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.timeline} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={t.forms.company.placeholders.timeline}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="option" className="block font-medium mb-1 text-gray-800">
                    {t.forms.company.fields.option} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="option"
                    name="option"
                    value={formData.option}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  >
                    <option value="buy">{t.forms.company.options.buy}</option>
                    <option value="lease">{t.forms.company.options.lease}</option>
                  </select>
                </div>
              </div>
            </>
          )}
          
          {userType === 'landowner' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder={t.forms.landowner.placeholders.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="mobile" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.mobile} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder={t.forms.landowner.placeholders.mobile}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="district" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.district} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                  >
                    <option value="">{t.forms.common.selectDistrict}</option>
                    {Object.keys(districtTalukaData).map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="taluka" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.taluka} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="taluka"
                    name="taluka"
                    value={formData.taluka}
                    onChange={handleChange}
                    required
                    disabled={!formData.district}
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:bg-gray-100 transition-colors"
                  >
                    <option value="">{t.forms.common.selectTaluka}</option>
                    {availableTalukas.map((taluka) => (
                      <option key={taluka} value={taluka}>{taluka}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="village" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.village} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="village"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder={t.forms.landowner.placeholders.village}
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.location}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder={t.forms.landowner.placeholders.location}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="substationName" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.substationName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="substationName"
                    name="substationName"
                    value={formData.substationName}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder={t.forms.landowner.placeholders.substationName}
                  />
                </div>
                
                <div>
                  <label htmlFor="substationDistance" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.substationDistance} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="substationDistance"
                    name="substationDistance"
                    value={formData.substationDistance}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder={t.forms.landowner.placeholders.substationDistance}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="landSize" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.landSize} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="landSize"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder={t.forms.landowner.placeholders.landSize}
                  />
                </div>
                
                <div>
                  <label htmlFor="option" className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.option} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="option"
                    name="option"
                    value={formData.option}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                  >
                    <option value="sell">{t.forms.landowner.options.sell}</option>
                    <option value="lease">{t.forms.landowner.options.lease}</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="rate" className="block font-medium mb-1 text-gray-800">
                    {formData.option === 'sell' ? t.forms.landowner.fields.sellRate : t.forms.landowner.fields.leaseRate} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="rate"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder={t.forms.landowner.placeholders.rate}
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-1 text-gray-800">
                    {t.forms.landowner.fields.isOwner} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center text-gray-800 bg-white p-3 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-green-50 transition-colors">
                      <input
                        type="radio"
                        name="isOwner"
                        value="yes"
                        checked={formData.isOwner === 'yes'}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-green-600"
                      />
                      {t.forms.landowner.options.yes}
                    </label>
                    <label className="inline-flex items-center text-gray-800 bg-white p-3 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-green-50 transition-colors">
                      <input
                        type="radio"
                        name="isOwner"
                        value="no"
                        checked={formData.isOwner === 'no'}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-green-600"
                      />
                      {t.forms.landowner.options.no}
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {submitError && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
              <div className="flex">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <p>{submitError}</p>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.common.processing}
              </span>
            ) : (
              userType === 'landowner' ? t.buttons.submitLandDetails : t.buttons.submitCompany
            )}
          </button>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="font-medium text-green-800">{t.notices.dataSecurity}</span>
            </div>
            <p className="text-sm text-center text-gray-600">{t.notices.dataPrivacy}</p>
          </div>
        </form>
      )}
    </div>
  );
} 