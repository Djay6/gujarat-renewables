import { Metadata, ResolvingMetadata } from 'next';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { Blog } from '../../models/Blog';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { generateMetadata as baseGenerateMetadata } from '../../utils/generateMetadata';

// Define types
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// This function generates metadata for the page - crucial for SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch blog data from Firebase
  const decodedSlug = decodeURIComponent(params.slug);
  
  try {
    // Query for the blog post with the given slug
    const q = query(
      collection(db, 'blogs'),
      where('slug', '==', decodedSlug),
      where('isPublished', '==', true),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return baseGenerateMetadata({
        title: 'Blog Post Not Found | Gujarat Renewables',
        description: 'The requested blog post could not be found.',
        noIndex: true, // Tell search engines not to index 404 pages
      });
    }
    
    const blogDoc = snapshot.docs[0];
    const blogData = blogDoc.data();
    
    // Generate SEO-optimized metadata
    return baseGenerateMetadata({
      title: blogData.metaTitle || `${blogData.title} | Gujarat Renewables`,
      description: blogData.metaDescription || blogData.excerpt,
      keywords: blogData.focusKeyword || blogData.tags?.join(', ') || '',
      locale: 'en_US',
      pathname: `/blog/${params.slug}`,
      openGraphImage: blogData.coverImage || '/blog-placeholder.jpg',
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return baseGenerateMetadata({
      title: 'Blog | Gujarat Renewables',
      description: 'Explore our blog posts about solar and renewable energy.',
    });
  }
}

// This function generates static paths for all blog posts
export async function generateStaticParams() {
  try {
    const q = query(
      collection(db, 'blogs'),
      where('isPublished', '==', true)
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      slug: doc.data().slug,
    }));
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}

// Main component - rendered on the server
export default async function BlogPostPage({ params }: Props) {
  const decodedSlug = decodeURIComponent(params.slug);
  
  try {
    // Query for the blog post with the given slug
    const q = query(
      collection(db, 'blogs'),
      where('slug', '==', decodedSlug),
      where('isPublished', '==', true),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return (
        <div className="container-content py-12 px-4">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Blog post not found.</p>
            <Link href="/blog" className="text-green-600 hover:text-green-800">
              Back to Blogs
            </Link>
          </div>
        </div>
      );
    }
    
    const blogDoc = snapshot.docs[0];
    const blogData = blogDoc.data();
    
    // Format dates
    const publishedDate = blogData.publishedAt?.toDate() || 
                         blogData.createdAt?.toDate() || 
                         new Date();
    
    // Create a blog object
    const blog = {
      id: blogDoc.id,
      ...blogData,
      publishedAt: publishedDate,
      createdAt: blogData.createdAt?.toDate() || new Date(),
      updatedAt: blogData.updatedAt?.toDate() || new Date()
    } as Blog;
    
    // No language handling needed as we're only using English
    
    // Render the blog post
    return (
      <div className="container-content py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/blog" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </Link>
          
          {/* Blog header */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-x-6 gap-y-2">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Published on: {blog.publishedAt?.toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>By: {blog.author}</span>
            </div>
          </div>
          
          {/* Cover image with structured data */}
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
          <article className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </article>
          
          {/* Tags for better SEO */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Add JSON-LD structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: blog.title,
              description: blog.excerpt,
              image: blog.coverImage || '/blog-placeholder.jpg',
              author: {
                '@type': 'Person',
                name: blog.author
              },
              publisher: {
                '@type': 'Organization',
                name: 'Gujarat Renewables',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://gujaratrenewables.in/logo.png'
                }
              },
              datePublished: blog.publishedAt.toISOString(),
              dateModified: blog.updatedAt.toISOString(),
              keywords: blog.tags?.join(', '),
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://gujaratrenewables.in/blog/${blog.slug}`
              },
              articleBody: blog.content.substring(0, 500) + '...',
              articleSection: 'Solar and Renewable Energy',
              inLanguage: 'en'
            })
          }}
        />
        
        {/* Add breadcrumb structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://gujaratrenewables.in'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blog',
                  item: 'https://gujaratrenewables.in/blog'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: blog.title,
                  item: `https://gujaratrenewables.in/blog/${blog.slug}`
                }
              ]
            })
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return (
      <div className="container-content py-12 px-4">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Error loading blog. Please try again later.</p>
          <Link href="/blog" className="text-green-600 hover:text-green-800">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
} 