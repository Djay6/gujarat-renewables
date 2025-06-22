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
    <div className="bg-white p-8 md:p-10 rounded-xl max-w-2xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
          <span className="text-4xl">{userType === 'landowner' ? '🌱' : '🏭'}</span>
        </div>
      </div>
      
      {/* User Type Toggle */}
      <div className="mb-10">
        <div className="flex justify-center space-x-4 bg-gray-50 p-1 rounded-xl shadow-sm">
          <button
            type="button"
            onClick={() => handleUserTypeChange('landowner')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
              userType === 'landowner'
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md transform scale-105'
                : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t.userTypes.landowner}
          </button>
          <button
            type="button"
            onClick={() => handleUserTypeChange('company')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
              userType === 'company'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105'
                : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t.userTypes.solarCompany}
          </button>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
        {userType === 'landowner' ? t.forms.landowner.title : t.forms.company.title}
      </h2>
      <p className="text-center text-gray-600 mb-8">{t.forms.common.subtitle}</p>
      
      {userType === 'landowner' && (
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-5 mb-8 shadow-sm border-l-4 border-yellow-400">
          <p className="flex items-center mb-2">
            <span className="flex-shrink-0 w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">⚡</span>
            </span>
            <span className="font-medium text-yellow-800">{t.notices.important}:</span>
          </p>
          <p className="text-yellow-700 ml-11">{t.notices.substationDistance}</p>
        </div>
      )}
      
      {userType === 'company' && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 mb-8 shadow-sm border-l-4 border-blue-400">
          <p className="flex items-center mb-2">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">💡</span>
            </span>
            <span className="font-medium text-blue-800">{t.notices.important}:</span>
          </p>
          <p className="text-blue-700 ml-11">{t.notices.companyHelp}</p>
        </div>
      )}
      
      {submitSuccess ? (
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 mb-6 shadow-sm text-center border border-green-200">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 p-4 shadow-inner flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-green-700">{t.common.thankYou}</h3>
          <p className="text-green-600">{t.common.successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-4 mb-6 shadow-sm flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-3 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
            <span className="text-sm text-blue-700">
                <span className="text-red-500 font-bold">*</span> {t.forms.common.requiredFields}
              </span>
          </div>
          
          {userType === 'company' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.contactName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.company.placeholders.contactName}
                  />
                </div>
                
                <div>
                  <label htmlFor="companyName" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.companyName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.company.placeholders.companyName}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="mobile" className="block font-medium mb-2 text-gray-700">
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
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.company.placeholders.mobile}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.company.placeholders.email}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="district" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.district} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm appearance-none bg-white"
                  >
                    <option value="">{t.forms.common.selectDistrict}</option>
                    {Object.keys(districtTalukaData).map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="taluka" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.taluka} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="taluka"
                    name="taluka"
                    value={formData.taluka}
                    onChange={handleChange}
                    required
                    disabled={!formData.district}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">{t.forms.common.selectTaluka}</option>
                    {availableTalukas.map((taluka) => (
                      <option key={taluka} value={taluka}>{taluka}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="landSize" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.landSize} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="landSize"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.company.placeholders.landSize}
                  />
                </div>
                
                <div>
                  <label htmlFor="option" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.option} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer transition-all bg-white hover:border-blue-400 hover:shadow-sm">
                      <input
                        type="radio"
                        name="option"
                        value="buy"
                        checked={formData.option === 'buy'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-800">{t.forms.company.options.buy}</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer transition-all bg-white hover:border-blue-400 hover:shadow-sm">
                      <input
                        type="radio"
                        name="option"
                        value="lease"
                        checked={formData.option === 'lease'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-800">{t.forms.company.options.lease}</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label htmlFor="requirements" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.requirements} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.company.placeholders.requirements}
                  ></textarea>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="budget" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.budget} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.company.placeholders.budget}
                  />
                </div>
                
                <div>
                  <label htmlFor="timeline" className="block font-medium mb-2 text-gray-700">
                    {t.forms.company.fields.timeline} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.company.placeholders.timeline}
                  />
                </div>
              </div>
            </>
          )}
          
          {userType === 'landowner' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.landowner.placeholders.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="mobile" className="block font-medium mb-2 text-gray-700">
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
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.landowner.placeholders.mobile}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="village" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.village} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="village"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.landowner.placeholders.village}
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.location}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.landowner.placeholders.location}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="district" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.district} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm appearance-none bg-white"
                  >
                    <option value="">{t.forms.common.selectDistrict}</option>
                    {Object.keys(districtTalukaData).map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="taluka" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.taluka} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="taluka"
                    name="taluka"
                    value={formData.taluka}
                    onChange={handleChange}
                    required
                    disabled={!formData.district}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">{t.forms.common.selectTaluka}</option>
                    {availableTalukas.map((taluka) => (
                      <option key={taluka} value={taluka}>{taluka}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="landSize" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.landSize} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="landSize"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.landowner.placeholders.landSize}
                  />
                </div>
                
                <div>
                  <label htmlFor="option" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.option} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer transition-all bg-white hover:border-green-400 hover:shadow-sm">
                      <input
                        type="radio"
                        name="option"
                        value="sell"
                        checked={formData.option === 'sell'}
                        onChange={handleChange}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="ml-2 text-gray-800">{t.forms.landowner.options.sell}</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer transition-all bg-white hover:border-green-400 hover:shadow-sm">
                      <input
                        type="radio"
                    name="option"
                        value="lease"
                        checked={formData.option === 'lease'}
                    onChange={handleChange}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="ml-2 text-gray-800">{t.forms.landowner.options.lease}</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="rate" className="block font-medium mb-2 text-gray-700">
                    {formData.option === 'sell' ? t.forms.landowner.fields.sellRate : t.forms.landowner.fields.leaseRate} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="rate"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.landowner.placeholders.rate}
                  />
                </div>
                
                <div>
                  <label htmlFor="isOwner" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.isOwner} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer transition-all bg-white hover:border-green-400 hover:shadow-sm">
                      <input
                        type="radio"
                        name="isOwner"
                        value="yes"
                        checked={formData.isOwner === 'yes'}
                        onChange={handleChange}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="ml-2 text-gray-800">{t.forms.landowner.options.yes}</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-xl cursor-pointer transition-all bg-white hover:border-green-400 hover:shadow-sm">
                      <input
                        type="radio"
                        name="isOwner"
                        value="no"
                        checked={formData.isOwner === 'no'}
                        onChange={handleChange}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="ml-2 text-gray-800">{t.forms.landowner.options.no}</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="substationName" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.substationName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="substationName"
                    name="substationName"
                    value={formData.substationName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.landowner.placeholders.substationName}
                  />
                </div>
                
                <div>
                  <label htmlFor="substationDistance" className="block font-medium mb-2 text-gray-700">
                    {t.forms.landowner.fields.substationDistance} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="substationDistance"
                    name="substationDistance"
                    value={formData.substationDistance}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all shadow-sm"
                    placeholder={t.forms.landowner.placeholders.substationDistance}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </>
          )}
          
          <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
                <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.common.processing}
                </div>
            ) : (
              userType === 'landowner' ? t.buttons.submitLandDetails : t.buttons.submitCompany
            )}
          </button>
          </div>
          
          {submitError && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                </svg>
                {submitError}
              </p>
            </div>
          )}
          
          <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-inner mr-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              </div>
              <span className="font-medium text-green-800">{t.notices.dataSecurity}</span>
            </div>
            <p className="text-sm text-center text-gray-600">{t.notices.dataPrivacy}</p>
          </div>
        </form>
      )}
    </div>
  );
} 