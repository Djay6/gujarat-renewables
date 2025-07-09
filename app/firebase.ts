/*import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, FirestoreSettings, initializeFirestore } from 'firebase/firestore';

// Hardcoded fallback config for production
const FALLBACK_CONFIG = {
  apiKey: "AIzaSyCqTybmRZa7h9kTJZJTj5gKd6lCojbkdE0",
  authDomain: "gujarat-renewable.firebaseapp.com",
  projectId: "gujarat-renewable",
  storageBucket: "gujarat-renewable.appspot.com",
  messagingSenderId: "582418360010",
  appId: "1:582418360010:web:7b5355f08677c035f37633"
};

// Log environment variables for debugging
const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  console.log('Environment check (production):', {
    isProd: process.env.NODE_ENV === 'production',
    hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    projectIdValue: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '(not set)'
  });
}

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || FALLBACK_CONFIG.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || FALLBACK_CONFIG.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || FALLBACK_CONFIG.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || FALLBACK_CONFIG.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || FALLBACK_CONFIG.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || FALLBACK_CONFIG.appId
};

// Check for missing project ID
if (!firebaseConfig.projectId) {
  console.error('CRITICAL: Firebase project ID is missing in environment variables and fallback');
} else {
  console.log('Using Firebase project ID:', firebaseConfig.projectId);
}

// Initialize Firebase only once
let app: FirebaseApp;
let db: Firestore;

// Check if we're in a browser environment to avoid SSR issues
try {
  // Configure Firestore settings for better performance
  const settings: FirestoreSettings = isBrowser ? {
    // Use memory cache only (no persistence) in browser
    cacheSizeBytes: 1048576 * 10, // 10 MB cache
  } : {};

  // Check if Firebase is already initialized
  if (!getApps().length) {
    console.log('Initializing Firebase with config:', {
      projectId: firebaseConfig.projectId,
      usingFallback: !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
    
    // Initialize Firebase app
    app = initializeApp(firebaseConfig);
    
    // Initialize Firestore with settings
    db = initializeFirestore(app, settings);
    console.log('Firestore initialized with optimized settings');
    
    // Try to fetch runtime config if we're in the browser
    if (isBrowser && process.env.NODE_ENV === 'production') {
      // Attempt to fetch runtime configuration
      fetch('/api/config')
        .then(response => response.json())
        .then(data => {
          if (data.config && data.config.projectId) {
            console.log('Using runtime config from API');
            // Update the config with runtime values
            const runtimeConfig = {
              ...firebaseConfig,
              ...data.config
            };
            
            // Re-initialize Firebase with runtime config
            try {
              const runtimeApp = initializeApp(runtimeConfig, 'runtime-config');
              console.log('Firebase reinitialized with runtime config');
            } catch (error) {
              console.error('Error reinitializing Firebase with runtime config:', error);
            }
          }
        })
        .catch(error => {
          console.error('Error fetching runtime config:', error);
        });
    }
  } else {
    app = getApps()[0]; // Use existing app if available
    console.log('Using existing Firebase app');
    
    // Get existing Firestore instance
    db = getFirestore(app);
    console.log('Using existing Firestore instance');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Provide fallback for SSR
  if (!isBrowser) {
    // @ts-ignore - Create minimal implementations for SSR context
    app = {} as FirebaseApp;
    // @ts-ignore
    db = {} as Firestore;
  }
}

// Export the Firebase services
export { db }; 
*/

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

if (!firebaseConfig.projectId) {
  console.error('CRITICAL: Firebase project ID is missing in env');
}

let app: FirebaseApp;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('Firebase & Firestore initialized');
} else {
  app = getApp();
  db = getFirestore(app);
  console.log('Using existing Firebase app');
}

export { db };
