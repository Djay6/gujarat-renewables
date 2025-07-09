"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Blog } from '../models/Blog';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import CheckFirebaseConfig from './check-firebase';

export default function BlogPage() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Content translations
  const content = {
    gu: {
      title: "બ્લોગ",
      subtitle: "સૌર ઊર્જા અને અક્ષય ઊર્જા વિશે નવીનતમ અપડેટ્સ અને જાણકારી",
      noBlogs: "કોઈ બ્લોગ પોસ્ટ મળી નથી.",
      readMore: "વધુ વાંચો",
      allTags: "બધા",
      publishedOn: "પ્રકાશિત:",
      by: "દ્વારા:",
      error: "બ્લોગ લોડ કરવામાં ભૂલ આવી છે. કૃપા કરી થોડી વાર પછી ફરી પ્રયાસ કરો.",
      loading: "બ્લોગ લોડ થઈ રહ્યા છે..."
    },
    en: {
      title: "Blog",
      subtitle: "Latest updates and information about solar energy and renewables",
      noBlogs: "No blog posts found.",
      readMore: "Read More",
      allTags: "All",
      publishedOn: "Published on:",
      by: "By:",
      error: "Error loading blogs. Please try again later.",
      loading: "Loading blogs..."
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
      // Check if Firebase is properly configured
      if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        throw new Error('Firebase configuration is incomplete');
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
      
      const snapshot = await getDocs(q);
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
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get all unique tags
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags || [])));

  // Filter blogs by tag if selected
  const filteredBlogs = selectedTag
    ? blogs.filter(blog => blog.tags?.includes(selectedTag))
    : blogs;

  return (
    <div className="container-content py-12">
      {/* Include the Firebase config checker */}
      <CheckFirebaseConfig />
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Tags filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedTag === null
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {t.allTags}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1 rounded-full text-sm ${
                selectedTag === tag
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-gray-500">{t.loading}</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">{t.noBlogs}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
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
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags?.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
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