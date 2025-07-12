import { MetadataRoute } from 'next';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gujaratrenewables.in';
  
  // Common pages 
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
  ];

  // Fetch blog posts for the sitemap
  try {
    const blogQuery = query(
      collection(db, 'blogs'),
      where('isPublished', '==', true)
    );
    
    const blogSnapshot = await getDocs(blogQuery);
    
    const blogPages = blogSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        url: `${baseUrl}/blog/${data.slug}`,
        lastModified: data.updatedAt?.toDate() || data.publishedAt?.toDate() || new Date(),
        changeFrequency: 'monthly' as ChangeFrequency,
        priority: 0.7,
      };
    });
    
    return [...staticPages, ...blogPages];
  } catch (error) {
    console.error('Error generating sitemap for blog posts:', error);
    // Return static pages if blog fetching fails
    return staticPages;
  }
} 