import { NextResponse } from 'next/server';

// This API route provides Firebase configuration at runtime
// instead of relying on build-time environment variables
export async function GET() {
  // Only expose non-sensitive configuration
  const config = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'gujarat-renewable',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'gujarat-renewable.firebaseapp.com',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'gujarat-renewable.appspot.com',
  };

  // Add cache control headers to avoid excessive requests
  return NextResponse.json(
    { config },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
} 