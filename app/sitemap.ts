import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gujaratrenewables.com';
  
  // Common pages for both languages
  const commonRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  ];
  
  // Generate district-specific pages for SEO
  const districts = [
    'ahmedabad',
    'kutch',
    'banaskantha',
    'patan',
    'mehsana',
    'surendranagar',
    'rajkot',
    'jamnagar',
    'bhavnagar',
    'amreli'
  ];
  
  const districtRoutes = districts.flatMap(district => [
    {
      url: `${baseUrl}/districts/${district}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/districts/${district}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ]);
  
  // Generate service pages
  const serviceRoutes = [
    {
      url: `${baseUrl}/services/land-leasing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/land-selling`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/services/land-leasing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/services/land-selling`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  ];
  
  // Blog posts (future implementation)
  const blogRoutes = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }
  ];
  
  return [...commonRoutes, ...districtRoutes, ...serviceRoutes, ...blogRoutes];
} 