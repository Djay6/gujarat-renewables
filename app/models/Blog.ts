export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  author: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  tags: string[];
  language?: string; // Default is English
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  focusKeyword?: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  author: string;
  tags: string;
  language?: string;
  isPublished: boolean;
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  focusKeyword?: string;
} 