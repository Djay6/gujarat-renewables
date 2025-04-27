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
  title = 'Gujarat Renewables | Solar Land Aggregator in Gujarat | Solar Energy Projects',
  description = 'Gujarat Renewables provides premium land acquisition and leasing services for solar projects in Gujarat. Lease or sell your land for solar energy projects with the best solar land aggregator in Gujarat.',
  keywords = 'solar land Gujarat, solar land aggregator, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, solar land investment Gujarat, gujarat renewable energy, solar project land, solar land acquisition',
  ogType = 'website',
  ogImage = '/og-image.svg',
  language = 'en',
}: SEOProps) {
  const pathname = usePathname();
  const canonicalUrl = `https://gujaratrenewables.com${pathname}`;
  
  // In App Router, we should use next/head with useEffect to avoid hydration mismatches
  useEffect(() => {
    // Update the document title
    document.title = title;
    
    // Set the document language to English for SEO
    document.documentElement.lang = 'en';
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
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Gujarat Renewables" />
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Gujarat" />
    </Head>
  );
} 