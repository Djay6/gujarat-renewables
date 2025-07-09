import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, FirestoreSettings } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check for missing project ID
if (!firebaseConfig.projectId) {
  console.error('CRITICAL: Firebase project ID is missing in environment variables');
}

// Initialize Firebase only once
let app: FirebaseApp;
let db: Firestore;

// Check if we're in a browser environment to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

try {
  // Check if Firebase is already initialized
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0]; // Use existing app if available
  }

  // Initialize Firestore with optimized settings for production
  db = getFirestore(app);
  
  // Configure Firestore settings for better performance
  if (isBrowser) {
    // Disable persistence completely in production to avoid the slow initial load
    const settings: FirestoreSettings = {
      // Use memory cache only (no persistence)
      cacheSizeBytes: 1048576 * 10, // 10 MB cache
    };
    
    // Apply settings to Firestore
    import('firebase/firestore').then(({ initializeFirestore }) => {
      // Re-initialize with optimized settings
      db = initializeFirestore(app, settings);
    }).catch(err => {
      console.error('Failed to initialize Firestore with optimized settings:', err);
    });
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