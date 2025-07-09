'use client';

import { useEffect } from 'react';

// Extend Window interface to include FIREBASE_CONFIG
declare global {
  interface Window {
    FIREBASE_CONFIG?: {
      projectId?: string;
      [key: string]: any;
    };
  }
}

export default function CheckFirebaseConfig() {
  useEffect(() => {
    // Check Firebase config on client side
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    
    if (!projectId) {
      console.error('Firebase Project ID is missing in client environment');
    } else {
      console.log('Firebase Project ID is correctly configured:', projectId);
    }
    
    // Log all Firebase config (without sensitive values)
    console.log('Firebase config check:', {
      apiKeyExists: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomainExists: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectIdExists: !!projectId,
      storageBucketExists: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderIdExists: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appIdExists: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    });

    // Log environment information
    console.log('Environment information:', {
      nodeEnv: process.env.NODE_ENV,
      nextPublicEnv: process.env.NEXT_PUBLIC_ENV,
      isProduction: process.env.NODE_ENV === 'production',
      isDevelopment: process.env.NODE_ENV === 'development'
    });
    
    // Check if window.FIREBASE_CONFIG exists (sometimes hosting providers inject this)
    if (typeof window !== 'undefined' && window.FIREBASE_CONFIG) {
      console.log('Found window.FIREBASE_CONFIG:', {
        exists: true,
        hasProjectId: !!window.FIREBASE_CONFIG.projectId
      });
    } else {
      console.log('No window.FIREBASE_CONFIG found');
    }
  }, []);
  
  // This component doesn't render anything
  return null;
} 