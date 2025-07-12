import { Metadata } from 'next';
import { collection, getDocs, query, where, limit, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Blog } from '../models/Blog';
import Link from 'next/link';
import Image from 'next/image';
import { generateMetadata as baseGenerateMetadata } from '../utils/generateMetadata';

// Generate metadata for the blog listing page
export async function generateMetadata(): Promise<Metadata> {
  return baseGenerateMetadata({
    title: 'Blog | Gujarat Renewables | Solar & Renewable Energy Insights',
    description: 'Explore our blog for the latest insights on solar energy, renewable projects, and land investments in Gujarat. Expert articles on solar and renewable energy trends.',
    keywords: 'solar blog, renewable energy blog, gujarat solar news, solar land investment, renewable energy insights, solar project guides, land leasing blog, solar energy articles',
    locale: 'en_US',
    pathname: '/blog',
  });
}

// Main component - rendered on the server
export default async function BlogPage() {
  try {
    // Limit the initial query to improve performance
    const q = query(
      collection(db, 'blogs'),
      where('isPublished', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(9)
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
    
    return (
      <div className="container-content py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Latest updates and information about solar energy and renewables</p>
        </div>

        {blogList.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No blog posts found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogList.map(blog => (
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
                          <span>Published on: </span>
                          <span>{blog.publishedAt?.toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span>By: {blog.author}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-green-600 font-medium hover:text-green-700">
                        Read More →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Add JSON-LD structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              headline: 'Gujarat Renewables Blog',
              description: 'Latest updates and information about solar energy and renewables in Gujarat',
              publisher: {
                '@type': 'Organization',
                name: 'Gujarat Renewables',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://gujaratrenewables.in/logo.png'
                }
              },
              blogPosts: blogList.map(blog => ({
                '@type': 'BlogPosting',
                headline: blog.title,
                description: blog.excerpt,
                datePublished: blog.publishedAt.toISOString(),
                dateModified: blog.updatedAt.toISOString(),
                author: {
                  '@type': 'Person',
                  name: blog.author
                },
                url: `https://gujaratrenewables.in/blog/${blog.slug}`
              }))
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
                }
              ]
            })
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return (
      <div className="container-content py-12 px-4">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Error loading blogs. Please try again later.</p>
        </div>
      </div>
    );
  }
} 