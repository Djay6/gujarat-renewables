'use client';

import { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, limit, query } from 'firebase/firestore';

// Hardcoded fallback config for production
const FALLBACK_CONFIG = {
  apiKey: "AIzaSyCqTybmRZa7h9kTJZJTj5gKd6lCojbkdE0",
  authDomain: "gujarat-renewable.firebaseapp.com",
  projectId: "gujarat-renewable",
  storageBucket: "gujarat-renewable.appspot.com",
  messagingSenderId: "582418360010",
  appId: "1:582418360010:web:7b5355f08677c035f37633"
};

export default function CheckFirebaseConfigPage() {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runTests = async () => {
      const testResults = [];
      setIsLoading(true);
      setError(null);

      try {
        // 1. Check environment variables
        const envCheck = {
          test: 'Environment Variables Check',
          results: {
            NODE_ENV: process.env.NODE_ENV,
            hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            projectIdValue: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '(not set)',
            hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          }
        };
        testResults.push(envCheck);

        // 2. Check Firebase initialization
        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || FALLBACK_CONFIG.apiKey,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || FALLBACK_CONFIG.authDomain,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || FALLBACK_CONFIG.projectId,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || FALLBACK_CONFIG.storageBucket,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || FALLBACK_CONFIG.messagingSenderId,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || FALLBACK_CONFIG.appId
        };

        const initCheck = {
          test: 'Firebase Initialization Check',
          results: {
            configUsed: {
              projectId: firebaseConfig.projectId,
              usingFallback: !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
            }
          }
        };
        
        // Try to initialize Firebase
        let app;
        if (!getApps().length) {
          app = initializeApp(firebaseConfig);
          initCheck.results.initStatus = 'New app initialized';
        } else {
          app = getApps()[0];
          initCheck.results.initStatus = 'Using existing app';
        }
        
        initCheck.results.success = true;
        testResults.push(initCheck);

        // 3. Try to fetch data from Firestore
        const db = getFirestore(app);
        const firestoreCheck = {
          test: 'Firestore Connection Check',
          results: {}
        };

        try {
          const q = query(collection(db, 'blogs'), limit(1));
          const snapshot = await getDocs(q);
          
          firestoreCheck.results.success = true;
          firestoreCheck.results.docsFound = snapshot.size;
          firestoreCheck.results.empty = snapshot.empty;
          
          if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            firestoreCheck.results.sampleDocId = doc.id;
            firestoreCheck.results.sampleDocFields = Object.keys(doc.data());
          }
        } catch (firestoreError: any) {
          firestoreCheck.results.success = false;
          firestoreCheck.results.error = firestoreError.message;
          firestoreCheck.results.errorCode = firestoreError.code;
        }
        
        testResults.push(firestoreCheck);

      } catch (err: any) {
        setError(`Error running tests: ${err.message}`);
      } finally {
        setResults(testResults);
        setIsLoading(false);
      }
    };

    runTests();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Firebase Configuration Diagnostic</h1>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mr-3"></div>
          <p>Running diagnostic tests...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {results.map((test, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{test.test}</h2>
              <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-64">
                {JSON.stringify(test.results, null, 2)}
              </pre>
            </div>
          ))}
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Recommendations</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ensure all Firebase environment variables are set in your production environment</li>
              <li>Check that your hosting provider is properly loading the .env variables</li>
              <li>Consider using runtime configuration instead of build-time environment variables</li>
              <li>Verify that your Firebase project is properly set up and accessible</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 