"use client";

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { Blog } from '../../models/Blog';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import ReactMarkdown from 'react-markdown';
import CheckFirebaseConfig from '../check-firebase';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug);
  const { language } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Content translations
  const content = {
    gu: {
      notFound: "બ્લોગ પોસ્ટ મળી નથી.",
      loading: "બ્લોગ લોડ થઈ રહ્યું છે...",
      backToBlogs: "બ્લોગ્સ પર પાછા જાઓ",
      publishedOn: "પ્રકાશિત:",
      by: "દ્વારા:",
      error: "બ્લોગ લોડ કરવામાં ભૂલ આવી. કૃપા કરીને પછીથી ફરી પ્રયાસ કરો.",
      configError: "સિસ્ટમ કન્ફિગરેશન ભૂલ. કૃપા કરીને એડમિનનો સંપર્ક કરો.",
    },
    en: {
      notFound: "Blog post not found.",
      loading: "Loading blog...",
      backToBlogs: "Back to Blogs",
      publishedOn: "Published on:",
      by: "By:",
      error: "Error loading blog. Please try again later.",
      configError: "System configuration error. Please contact admin.",
    }
  };

  // Get content for current language
  const t = content[language];

  useEffect(() => {
    fetchBlog();
  }, [decodedSlug, language]);

  const fetchBlog = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if Firebase is properly configured
      if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        setError(t.configError);
        return;
      }
      
      // Query for the blog post with the given slug
      const q = query(
        collection(db, 'blogs'),
        where('slug', '==', decodedSlug),
        where('isPublished', '==', true),
        limit(1)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        setError(t.notFound);
        setBlog(null);
        return;
      }
      
      const blogDoc = snapshot.docs[0];
      const blogData = blogDoc.data();
      
      // Ensure dates are properly handled
      const publishedDate = blogData.publishedAt?.toDate() || 
                           blogData.createdAt?.toDate() || 
                           new Date();
                           
      setBlog({
        id: blogDoc.id,
        ...blogData,
        publishedAt: publishedDate,
        createdAt: blogData.createdAt?.toDate() || new Date(),
        updatedAt: blogData.updatedAt?.toDate() || new Date()
      } as Blog);
      
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container-content py-12">
        <CheckFirebaseConfig />
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-center text-gray-500">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container-content py-12">
        <CheckFirebaseConfig />
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/blog" className="text-green-600 hover:text-green-700 font-medium">
            {t.backToBlogs}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-content py-12">
      <CheckFirebaseConfig />
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/blog" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t.backToBlogs}
        </Link>
        
        {/* Blog header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>
        
        <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-x-6 gap-y-2">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{t.publishedOn} {blog.publishedAt?.toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{t.by} {blog.author}</span>
          </div>
        </div>
        
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map(tag => (
              <Link 
                href={`/blog?tag=${tag}`} 
                key={tag}
                className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full hover:bg-green-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        
        {/* Cover image */}
        <div className="relative h-80 md:h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={blog.coverImage || '/blog-placeholder.jpg'}
            alt={blog.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="rounded-xl"
          />
        </div>
        
        {/* Blog content */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 