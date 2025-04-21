'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  language?: 'gu' | 'en';
}

export default function SEO({
  title = 'ગુજરાત રિન્યુએબલ્સ | સોલાર લેન્ડ એગ્રિગેટર',
  description = 'ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ માટે તમારી જમીન ભાડે આપો અથવા વેચો. સોલાર પ્રોજેક્ટ્સ માટે અમે જમીન સંપાદન અને લીઝ સેવાઓ પ્રદાન કરીએ છીએ.',
  keywords = 'solar land Gujarat, solar land aggregator, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ, solar land investment Gujarat',
  ogType = 'website',
  ogImage = '/og-image.svg',
  language = 'gu',
}: SEOProps) {
  const pathname = usePathname();
  const canonicalUrl = `https://gujaratrenewables.com${pathname}`;
  
  // In App Router, we should use next/head with useEffect to avoid hydration mismatches
  useEffect(() => {
    // Update the document title
    document.title = title;
  }, [title]);
  
  return (
    <Head>
      {/* Page-specific metadata that overrides the defaults in layout.tsx */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={language === 'gu' ? 'gu_IN' : 'en_US'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
} 