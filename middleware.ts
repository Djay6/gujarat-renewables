import { NextRequest, NextResponse } from 'next/server';

// Languages supported by the site
const supportedLocales = ['en', 'gu'];
const defaultLocale = 'gu';

// Function to check if the pathname starts with one of the supported locales
function pathnameHasLocale(pathname: string): boolean {
  return supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

// Get the preferred language from the request headers
function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const locales = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
  
  // Check if any of the browser's preferred languages match our supported locales
  for (const locale of locales) {
    const shortLocale = locale.substring(0, 2);
    if (supportedLocales.includes(shortLocale)) {
      return shortLocale;
    }
  }
  
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes, static files, and other special paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }
  
  // If the pathname already includes a locale, skip
  if (pathnameHasLocale(pathname)) {
    return NextResponse.next();
  }
  
  // Get the preferred locale from the user's browser settings
  const preferredLocale = getPreferredLocale(request);
  
  // Clone the URL and add the preferred locale prefix
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`;
  
  // Redirect to the localized URL
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip files with extensions like .jpg, .png, etc.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}; 