import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';

// Your Firebase configuration
// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

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

  // Initialize Firestore with settings optimized for production
  db = getFirestore(app);

  // Enable offline persistence only in browser environment
  if (isBrowser) {
    // Only run in browser environment
    import('firebase/firestore').then(({ enableIndexedDbPersistence }) => {
      // Don't attempt persistence if project ID is missing
      if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        enableIndexedDbPersistence(db).catch((err) => {
          if (err.code === 'failed-precondition') {
            console.warn('Firestore persistence failed: Multiple tabs open');
          } else if (err.code === 'unimplemented') {
            console.warn('Firestore persistence not supported by browser');
          } else {
            console.error('Firestore persistence error:', err.code);
          }
        });
      } else {
        console.warn('Firebase project ID is missing - persistence disabled');
      }
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