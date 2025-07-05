"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Footer() {
  const { language } = useLanguage();
  
  // Add state for form fields and feedback
  const [name, setName] = useState('');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  
  // Footer translations
  const content = {
    gu: {
      contactInfo: "સંપર્ક માહિતી",
      email: "gujaratrenewables@gmail.com",
      formTitle: "સંદેશ મોકલો",
      namePlaceholder: "તમારું નામ",
      emailOrMobilePlaceholder: "તમારું ઇમેઇલ અથવા મોબાઇલ",
      messagePlaceholder: "તમારો સંદેશ લખો...",
      sendButton: "સંદેશ મોકલો",
      copyright: (year: number) => `&copy; ${year} ગુજરાત રિન્યુએબલ્સ. બધા અધિકારો સુરક્ષિત.`,
      bridgeText: "જમીન માલિકો અને સોલાર કંપનીઓ વચ્ચે સેતુ"
    },
    en: {
      contactInfo: "Contact Information",
      email: "gujaratrenewables@gmail.com",
      formTitle: "Send a Message",
      namePlaceholder: "Your Name",
      emailOrMobilePlaceholder: "Your Email or Mobile",
      messagePlaceholder: "Write your message...",
      sendButton: "Send Message",
      copyright: (year: number) => `&copy; ${year} Gujarat Renewables. All rights reserved.`,
      bridgeText: "Bridging landowners and solar companies"
    }
  };

  // Get content for current language
  const t = content[language];

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');
    setError('');
    try {
      await addDoc(collection(db, 'messages'), {
        name,
        emailOrMobile,
        message,
        createdAt: new Date(),
      });
      setFeedback(language === 'gu' ? 'તમારો સંદેશ સફળતાપૂર્વક મોકલાયો!' : 'Your message has been sent successfully!');
      setName('');
      setEmailOrMobile('');
      setMessage('');
    } catch (err) {
      setError(language === 'gu' ? 'માફ કરો, સંદેશ મોકલવામાં ભૂલ આવી.' : 'Sorry, there was an error sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-900 text-white py-12 px-4 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-yellow-300 to-green-400"></div>
      
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-800/50 p-6 rounded-xl border border-green-700/50 shadow-inner">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
              </svg>
              {t.contactInfo}
            </h3>
            
            <div className="flex items-center p-2 rounded-lg hover:bg-green-700/30 transition-colors">
              <div className="bg-green-700/50 p-2 rounded-full mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-green-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <span className="text-green-50">{t.email}</span>
            </div>
          </div>
          
          <div className="bg-green-800/50 p-6 rounded-xl border border-green-700/50 shadow-inner">
            <h3 className="text-xl font-bold mb-4">{t.formTitle}</h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-2 bg-green-900/50 text-white rounded-xl border border-green-600 focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                />
              </div>
              
              <div>
                <input
                  type="text"
                  value={emailOrMobile}
                  onChange={e => setEmailOrMobile(e.target.value)}
                  placeholder={t.emailOrMobilePlaceholder}
                  className="w-full px-4 py-2 bg-green-900/50 text-white rounded-xl border border-green-600 focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                />
              </div>
              
              <div>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  rows={3}
                  className="w-full px-4 py-2 bg-green-900/50 text-white rounded-xl border border-green-600 focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-70 border border-green-500"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  t.sendButton
                )}
              </button>
            </form>
            
            {feedback && (
              <div className="mt-4 bg-green-700/30 text-green-100 p-3 rounded-xl border-l-4 border-green-500">
                {feedback}
              </div>
            )}
            
            {error && (
              <div className="mt-4 bg-red-700/30 text-red-100 p-3 rounded-xl border-l-4 border-red-500">
                {error}
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-green-700/50 mt-8 pt-8 text-center">
          <p className="text-green-200" dangerouslySetInnerHTML={{ __html: t.copyright(new Date().getFullYear()) }}></p>
          
          <div className="flex justify-center mt-6 gap-4 text-xs text-green-300">
            <p>{t.bridgeText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 