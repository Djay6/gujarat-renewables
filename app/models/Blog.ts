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
  language: 'en' | 'gu'; // English or Gujarati
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  author: string;
  tags: string;
  language: 'en' | 'gu';
  isPublished: boolean;
} 