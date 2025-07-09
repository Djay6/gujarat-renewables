"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Blog } from '../models/Blog';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import CheckFirebaseConfig from './check-firebase';
import FirebaseErrorFallback from '../components/FirebaseErrorFallback';

export default function BlogPage() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Content translations
  const content = {
    gu: {
      title: "બ્લોગ",
      subtitle: "સૌર ઊર્જા અને અક્ષય ઊર્જા વિશે નવીનતમ અપડેટ્સ અને જાણકારી",
      noBlogs: "કોઈ બ્લોગ પોસ્ટ મળી નથી.",
      readMore: "વધુ વાંચો",
      publishedOn: "પ્રકાશિત:",
      by: "દ્વારા:",
      error: "બ્લોગ લોડ કરવામાં ભૂલ આવી છે. કૃપા કરી થોડી વાર પછી ફરી પ્રયાસ કરો.",
      loading: "બ્લોગ લોડ થઈ રહ્યા છે...",
      configError: "ફાયરબેઝ કન્ફિગરેશન ભૂલ. અમે આ સમસ્યા પર કામ કરી રહ્યા છીએ."
    },
    en: {
      title: "Blog",
      subtitle: "Latest updates and information about solar energy and renewables",
      noBlogs: "No blog posts found.",
      readMore: "Read More",
      publishedOn: "Published on:",
      by: "By:",
      error: "Error loading blogs. Please try again later.",
      loading: "Loading blogs...",
      configError: "Firebase configuration error. We're working on this issue."
    }
  };

  // Get content for current language
  const t = content[language];

  useEffect(() => {
    fetchBlogs();
  }, [language]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add the diagnostic component to check Firebase configuration
      // This will log details to the console for debugging
      
      // Check if Firebase is properly configured
      if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        console.warn('Using fallback Firebase configuration');
      }
      
      // Limit the initial query to improve performance
      const q = query(
        collection(db, 'blogs'),
        where('isPublished', '==', true),
        // Only filter by language if we have blogs in both languages
        ...(language ? [where('language', '==', language)] : []),
        // Add a limit to reduce initial load time
        limit(6)
      );
      
      const snapshot = await getDocs(q).catch(err => {
        console.error('Error in getDocs:', err);
        throw new Error(`Firebase query error: ${err.message}`);
      });
      
      const blogList: Blog[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const publishedDate = data.publishedAt?.toDate() || data.createdAt?.toDate() || new Date();
        
        blogList.push({
          id: doc.id,
          ...data,
          publishedAt: publishedDate,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Blog);
      });
      
      // Sort blogs by publishedAt or createdAt (fallback)
      blogList.sort((a, b) => {
        const dateA = a.publishedAt || a.createdAt;
        const dateB = b.publishedAt || b.createdAt;
        return dateB.getTime() - dateA.getTime();
      });
      
      setBlogs(blogList);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Check for specific Firebase errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('Firebase') || errorMessage.includes('firestore')) {
        setError(t.configError);
      } else {
        setError(t.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Show Firebase error fallback if there's a Firebase-specific error
  if (error && error === t.configError) {
    return (
      <div className="container-content py-12 px-4">
        <CheckFirebaseConfig />
        <FirebaseErrorFallback onRetry={fetchBlogs} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container-content py-12 px-4">
        <CheckFirebaseConfig />
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-center text-gray-500">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-content py-12 px-4">
      {/* Include the Firebase config checker */}
      <CheckFirebaseConfig />
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">{t.noBlogs}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <Link href={`/blog/${encodeURIComponent(blog.slug)}`} key={blog.id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={blog.coverImage || '/blog-placeholder.jpg'}
                    alt={blog.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">{blog.title}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{blog.excerpt}</p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div>
                        <span>{t.publishedOn} </span>
                        <span>{blog.publishedAt?.toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span>{t.by} {blog.author}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-green-600 font-medium hover:text-green-700">
                      {t.readMore} →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 