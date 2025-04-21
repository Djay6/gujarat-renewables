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
  title = 'ગુજરાત રિન્યુએબલ્સ | સોલાર લેન્ડ એગ્રિગેટર',
  description = 'ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ માટે તમારી જમીન ભાડે આપો અથવા વેચો. સોલાર પ્રોજેક્ટ્સ માટે અમે જમીન સંપાદન અને લીઝ સેવાઓ પ્રદાન કરીએ છીએ.',
  imageUrl = 'https://gujaratrenewables.com/og-image.jpg',
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
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'customer service',
      areaServed: 'Gujarat',
      availableLanguage: ['Gujarati', 'English', 'Hindi']
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
    description: 'We aggregate land for solar projects in Gujarat and connect landowners with solar developers.',
    offers: {
      '@type': 'Offer',
      description: 'Lease or sell your land for solar projects in Gujarat'
    }
  };

  // WebPage Schema
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: url,
    name: title,
    description: description,
    inLanguage: 'gu-IN',
    datePublished: datePublished,
    dateModified: dateModified,
    isPartOf: {
      '@type': 'WebSite',
      name: organizationName,
      url: siteUrl
    }
  };

  // Combine all schemas
  const schemas = [
    organizationSchema,
    localBusinessSchema,
    serviceSchema,
    webpageSchema
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