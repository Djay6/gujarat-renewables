"use client";

import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Contact() {
  console.log('Contact component rendered');
  const { language } = useLanguage();
  
  // Contact section translations
  const content = {
    gu: {
      title: "અમારો સંપર્ક કરો",
      subtitle: "તમારા પ્રશ્નો અથવા જરૂરિયાતો સાથે અમને સંપર્ક કરો",
      contactInfo: "સંપર્ક માહિતી",
      phoneNumber: "+91 9876543210",
      email: "connect@gujaratrenewables.in",
      address: "314, ગ્રીન ટાવર, એસજી હાઈવે, અમદાવાદ, ગુજરાત 380015",
      formTitle: "સંદેશ મોકલો",
      namePlaceholder: "તમારું નામ",
      emailPlaceholder: "તમારું ઇમેઇલ",
      messagePlaceholder: "તમારો સંદેશ લખો...",
      sendButton: "સંદેશ મોકલો",
      workingHours: "કાર્ય સમય",
      weekdays: "સોમ - શુક્ર: સવારે 9 થી સાંજે 6",
      weekends: "શનિ: સવારે 10 થી બપોરે 2"
    },
    en: {
      title: "Contact Us",
      subtitle: "Reach out to us with your questions or needs",
      contactInfo: "Contact Information",
      phoneNumber: "+91 9876543210",
      email: "connect@gujaratrenewables.in",
      address: "314, Green Tower, SG Highway, Ahmedabad, Gujarat 380015",
      formTitle: "Send a Message",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Write your message...",
      sendButton: "Send Message",
      workingHours: "Working Hours",
      weekdays: "Mon - Fri: 9 AM to 6 PM",
      weekends: "Sat: 10 AM to 2 PM"
    }
  };

  // Get content for current language
  const t = content[language];

  // Add state for form fields and feedback
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Send a Message form submitted');
    e.preventDefault();
    setLoading(true);
    setFeedback('');
    setError('');
    try {
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        message,
        createdAt: new Date(),
      });
      setFeedback(language === 'gu' ? 'તમારો સંદેશ સફળતાપૂર્વક મોકલાયો!' : 'Your message has been sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(language === 'gu' ? 'માફ કરો, સંદેશ મોકલવામાં ભૂલ આવી.' : 'Sorry, there was an error sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative bg-gradient-to-b from-white to-green-50">
      <div className="container-content">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
            </svg>
          </div>
          <h2 className="section-title">
            {t.title}
          </h2>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-gradient-to-br from-green-700 to-green-900 text-white p-8 rounded-xl shadow-xl relative overflow-hidden">
            {/* Solar imagery background */}
            <div className="absolute top-0 right-0">
              <svg width="180" height="180" viewBox="0 0 24 24" fill="rgba(255,255,255,0.05)">
                <path d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.5L17.24 5.29L18.66 6.71M13 1H11V4H13M6.76 5.29L4.96 3.5L3.55 4.91L5.34 6.71M1 13H4V11H1M13 20H11V23H13" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" />
                </svg>
                {t.contactInfo}
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-green-600/50 p-2 rounded-full mr-4 mt-1">
                    <svg className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-green-200 text-sm mb-1">Phone</div>
                    <div className="font-medium">{t.phoneNumber}</div>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-green-600/50 p-2 rounded-full mr-4 mt-1">
                    <svg className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-green-200 text-sm mb-1">Email</div>
                    <div className="font-medium">{t.email}</div>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-green-600/50 p-2 rounded-full mr-4 mt-1">
                    <svg className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-green-200 text-sm mb-1">Address</div>
                    <div className="font-medium">{t.address}</div>
                  </div>
                </li>

                <li className="flex items-start pt-4 border-t border-green-600/50">
                  <div className="bg-green-600/50 p-2 rounded-full mr-4 mt-1">
                    <svg className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-green-200 text-sm mb-1">{t.workingHours}</div>
                    <div className="font-medium">{t.weekdays}</div>
                    <div className="font-medium">{t.weekends}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card p-8">
            <h3 className="text-xl font-bold mb-6 text-green-800">{t.formTitle}</h3>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-70"
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
              <div className="mt-4 bg-green-50 text-green-700 p-4 rounded-xl border-l-4 border-green-500">
                {feedback}
              </div>
            )}
            
            {error && (
              <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-xl border-l-4 border-red-500">
                {error}
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 