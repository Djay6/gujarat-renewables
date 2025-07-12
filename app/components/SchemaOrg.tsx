'use client';

import React, { useState, useEffect } from 'react';
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
  title = 'Gujarat Renewables | Solar & Renewable Energy Land Aggregator in Gujarat',
  description = 'Gujarat Renewables provides premium land acquisition and leasing services for solar and renewable energy projects in Gujarat. Lease or sell your land for solar and renewable energy projects.',
  imageUrl = 'https://www.gujaratrenewables.in/og-image.svg',
  datePublished = '2023-01-01T00:00:00.000Z', // Use static date as default
  dateModified = '2023-01-01T00:00:00.000Z', // Use static date as default
  organizationName = 'Gujarat Renewables',
  siteUrl = 'https://www.gujaratrenewables.in'
}) => {
  const pathname = usePathname();
  const url = `${siteUrl}${pathname}`;
  const [schema, setSchema] = useState<string>('');

  // Generate schema in useEffect to avoid hydration mismatch
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: organizationName,
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description: 'The leading solar and renewable energy land aggregator in Gujarat specializing in land acquisition and leasing for solar and renewable energy projects',
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
      serviceType: 'Solar and Renewable Energy Land Aggregation',
      provider: {
        '@type': 'Organization',
        name: organizationName
      },
      areaServed: {
        '@type': 'State',
        name: 'Gujarat'
      },
      description: 'We aggregate land for solar and renewable energy projects in Gujarat and connect landowners with developers for optimal land acquisition and leasing solutions.',
      offers: [
        {
          '@type': 'Offer',
          description: 'Lease your land for solar and renewable energy projects in Gujarat',
          category: 'Land Leasing'
        },
        {
          '@type': 'Offer',
          description: 'Sell your land for solar and renewable energy projects in Gujarat',
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
        name: 'Solar and Renewable Energy Land Aggregation',
        description: 'Land acquisition and leasing services for solar and renewable energy projects in Gujarat'
      }
    };

    // FAQ Schema for common questions
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does solar and renewable energy land leasing work in Gujarat?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Solar and renewable energy land leasing in Gujarat typically involves signing a long-term lease agreement (20-30 years) with energy developers. Landowners receive regular rental income while the land is used for solar or other renewable power generation.'
          }
        },
        {
          '@type': 'Question',
          name: 'What type of land is suitable for solar and renewable energy projects?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The ideal land for solar and renewable energy projects is flat, non-agricultural or barren land with good solar irradiation and proximity to electrical substations (preferably within 10km). For wind energy, elevated areas with consistent wind flow are preferred. Land without obstruction or shading is most suitable for solar projects.'
          }
        },
        {
          '@type': 'Question',
          name: 'What are the benefits of leasing land for solar and renewable energy projects?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leasing land for solar and renewable energy projects provides steady, long-term income with minimal effort, makes productive use of otherwise unused land, and contributes to green energy development. Lease rates are typically higher than agricultural income for the same land, and you contribute to sustainable energy production.'
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
          name: 'Solar & Renewable Energy Land Services',
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

    // Set the schema JSON string
    setSchema(JSON.stringify(schemas));
  }, [title, description, imageUrl, datePublished, dateModified, organizationName, siteUrl, url]);

  // Only render the script tag client-side to avoid hydration mismatch
  if (typeof window === 'undefined' || !schema) {
    return null; // Return null during SSR or before schema is generated
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  );
};

export default SchemaOrg; 