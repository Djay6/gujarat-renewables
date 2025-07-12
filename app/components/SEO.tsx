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
  keywords = 'solar land Gujarat, solar land aggregator, solar farm land Gujarat, sell land for solar Gujarat, lease land for solar projects, solar land investment Gujarat, gujarat renewable energy, solar project land, solar land acquisition, Kutch solar land, Banaskantha solar land, Patan solar land, North Gujarat solar land, Saurashtra solar land, Central Gujarat solar land, South Gujarat renewable land, agricultural land for solar Gujarat, barren land for solar projects, unused land for renewable energy, wasteland for solar development, non-agricultural land for solar Gujarat, industrial land for solar projects, land aggregation for solar developers, land pooling for renewable projects, long-term land lease for solar, land purchase for renewable energy, land valuation for solar projects, land due diligence for solar farms, minimum land size for solar project Gujarat, land requirements for 1MW solar plant, solar farm land specifications, ideal land for solar installation, solar land site selection criteria, land survey for renewable projects, landowner benefits from solar leasing, passive income from solar land, land monetization through renewables, land value appreciation with solar, guaranteed land rent from solar projects, how to lease land for solar in Gujarat, where to sell land for solar projects, best districts for solar land in Gujarat, how much land needed for solar farm, solar land lease rates in Gujarat, land acquisition process for solar',
  ogType = 'website',
  ogImage = '/og-image.svg',
  language = 'en',
}: SEOProps) {
  const pathname = usePathname();
  const canonicalUrl = `https://www.gujaratrenewables.in${pathname}`;
  
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