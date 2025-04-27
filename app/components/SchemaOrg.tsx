'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface SchemaOrgProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  organizationName?: string;
  siteUrl?: string;
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({
  title = 'Gujarat Renewables | Solar Land Aggregator in Gujarat',
  description = 'Gujarat Renewables provides premium land acquisition and leasing services for solar projects in Gujarat. Lease or sell your land for solar energy projects.',
  imageUrl = 'https://gujaratrenewables.com/og-image.svg',
  datePublished = new Date().toISOString(),
  dateModified = new Date().toISOString(),
  organizationName = 'Gujarat Renewables',
  siteUrl = 'https://gujaratrenewables.com'
}) => {
  const pathname = usePathname();
  const url = `${siteUrl}${pathname}`;

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizationName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'The leading solar land aggregator in Gujarat specializing in land acquisition and leasing for solar energy projects',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'customer service',
      areaServed: 'Gujarat',
      availableLanguage: ['English', 'Gujarati', 'Hindi']
    },
    sameAs: [
      'https://www.facebook.com/gujaratrenewables',
      'https://www.instagram.com/gujaratrenewables',
      'https://www.linkedin.com/company/gujarat-renewables'
    ]
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: organizationName,
    description: description,
    url: siteUrl,
    telephone: '+91-XXXXXXXXXX',
    image: imageUrl,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Address',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380000',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.0225',
      longitude: '72.5714'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    areaServed: {
      '@type': 'State',
      name: 'Gujarat'
    }
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Solar Land Aggregation',
    provider: {
      '@type': 'Organization',
      name: organizationName
    },
    areaServed: {
      '@type': 'State',
      name: 'Gujarat'
    },
    description: 'We aggregate land for solar projects in Gujarat and connect landowners with solar developers for optimal land acquisition and leasing solutions.',
    offers: [
      {
        '@type': 'Offer',
        description: 'Lease your land for solar projects in Gujarat',
        category: 'Land Leasing'
      },
      {
        '@type': 'Offer',
        description: 'Sell your land for solar projects in Gujarat',
        category: 'Land Acquisition'
      }
    ]
  };

  // WebPage Schema
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: url,
    name: title,
    description: description,
    inLanguage: 'en-US',
    datePublished: datePublished,
    dateModified: dateModified,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.main-content']
    },
    isPartOf: {
      '@type': 'WebSite',
      name: organizationName,
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      contentUrl: imageUrl
    },
    mainEntity: {
      '@type': 'Service',
      name: 'Solar Land Aggregation',
      description: 'Land acquisition and leasing services for solar energy projects in Gujarat'
    }
  };

  // FAQ Schema for common questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does solar land leasing work in Gujarat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Solar land leasing in Gujarat typically involves signing a long-term lease agreement (20-30 years) with solar developers. Landowners receive regular rental income while the land is used for solar power generation.'
        }
      },
      {
        '@type': 'Question',
        name: 'What type of land is suitable for solar projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The ideal land for solar projects is flat, non-agricultural or barren land with good solar irradiation and proximity to electrical substations (preferably within 10km). Land without obstruction or shading is most suitable.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the benefits of leasing land for solar projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Leasing land for solar projects provides steady, long-term income with minimal effort, makes productive use of otherwise unused land, and contributes to green energy development. Lease rates are typically higher than agricultural income for the same land.'
        }
      }
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Solar Land Services',
        item: `${siteUrl}/services`
      }
    ]
  };

  // Combine all schemas
  const schemas = [
    organizationSchema,
    localBusinessSchema,
    serviceSchema,
    webpageSchema,
    faqSchema,
    breadcrumbSchema
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas)
      }}
    />
  );
};

export default SchemaOrg; 