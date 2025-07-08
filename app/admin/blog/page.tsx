"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, Timestamp, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { Blog, BlogFormData } from '../../models/Blog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AddDummyBlogs from './add-dummy-blogs';

export default function BlogAdmin() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    coverImage: '',
    author: '',
    tags: '',
    language: 'en',
    isPublished: false
  });
  const [formError, setFormError] = useState('');
  const [showDummyBlogCreator, setShowDummyBlogCreator] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    router.push('/admin');
  };

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthChecking(true);
      // Check if the user is logged in based on localStorage
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      setIsLoggedIn(isAdmin);
      
      if (!isAdmin) {
        // Store the current URL to redirect back after login
        localStorage.setItem('redirectAfterLogin', '/admin/blog');
        router.push('/admin');
      }
      setIsAuthChecking(false);
    };
    
    checkAuth();
  }, [router]);

  // Fetch blogs
  useEffect(() => {
    if (isLoggedIn && !isAuthChecking) {
      fetchBlogs();
    }
  }, [isLoggedIn, isAuthChecking]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      // Limit initial fetch to improve performance
      const q = query(
        collection(db, 'blogs'), 
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const blogList: Blog[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        blogList.push({
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt?.toDate(),
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as Blog);
      });
      
      setBlogs(blogList);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (blog?: Blog) => {
    if (blog) {
      // Edit mode
      setIsEditing(true);
      setCurrentBlogId(blog.id);
      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        slug: blog.slug,
        coverImage: blog.coverImage,
        author: blog.author,
        tags: blog.tags.join(', '),
        language: blog.language,
        isPublished: blog.isPublished
      });
    } else {
      // Create mode
      setIsEditing(false);
      setCurrentBlogId(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        coverImage: '',
        author: '',
        tags: '',
        language: 'en',
        isPublished: false
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isPublished' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setFormData(prev => ({
      ...prev,
      slug
    }));
  };

  const validateForm = () => {
    if (!formData.title) return 'Title is required';
    if (!formData.content) return 'Content is required';
    if (!formData.slug) return 'Slug is required';
    if (!formData.excerpt) return 'Excerpt is required';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }
    
    setIsLoading(true);
    try {
      const now = Timestamp.now();
      
      // Always ensure publishedAt is set correctly based on isPublished status
      const blogData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        slug: formData.slug,
        coverImage: formData.coverImage || '/blog-placeholder.jpg',
        author: formData.author || 'Gujarat Renewables',
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        language: formData.language,
        isPublished: formData.isPublished,
        updatedAt: now,
        // Always set publishedAt when isPublished is true
        publishedAt: formData.isPublished ? now : null
      };
      
      if (isEditing && currentBlogId) {
        // Update existing blog
        await updateDoc(doc(db, 'blogs', currentBlogId), blogData);
      } else {
        // Create new blog
        const newBlogData = {
          ...blogData,
          createdAt: now
        };
        
        await addDoc(collection(db, 'blogs'), newBlogData);
      }
      
      closeModal();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      setFormError('Failed to save blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setIsLoading(true);
      try {
        await deleteDoc(doc(db, 'blogs', id));
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isAuthChecking) {
    return <div className="p-8 text-center">Checking authentication...</div>;
  }

  if (!isLoggedIn) {
    return <div className="p-8 text-center">Redirecting to login...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Back to Admin
          </Link>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
          <button 
            onClick={() => setShowDummyBlogCreator(!showDummyBlogCreator)} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {showDummyBlogCreator ? 'Hide Dummy Blog Creator' : 'Add Dummy Blogs'}
          </button>
          <button 
            onClick={() => openModal()} 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create New Post
          </button>
        </div>
      </div>

      {showDummyBlogCreator && (
        <div className="mb-8">
          <AddDummyBlogs />
        </div>
      )}

      {isLoading && !isModalOpen ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No blog posts found. Create your first post!
                  </td>
                </tr>
              ) : (
                blogs.map(blog => (
                  <tr key={blog.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                      <div className="text-sm text-gray-500">Slug: {blog.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {blog.language === 'en' ? 'English' : 'Gujarati'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        blog.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {blog.publishedAt 
                        ? new Date(blog.publishedAt).toLocaleDateString() 
                        : 'Not published'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => openModal(blog)} 
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteBlog(blog.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                        {blog.isPublished && (
                          <Link 
                            href={`/blog/${encodeURIComponent(blog.slug)}`}
                            target="_blank" 
                            className="text-green-600 hover:text-green-900"
                          >
                            View
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Blog Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {formError && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title*
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug*
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={generateSlug}
                        className="bg-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-300"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt* (Short summary)
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content*
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports Markdown formatting. Use # for headings, ** for bold, * for italic, etc.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleInputChange}
                      placeholder="/blog-placeholder.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Gujarat Renewables"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="solar, renewable, energy"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="en">English</option>
                      <option value="gu">Gujarati</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Publish immediately</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 