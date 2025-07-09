'use client';

import { useEffect } from 'react';

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
  }, []);
  
  // This component doesn't render anything
  return null;
} 