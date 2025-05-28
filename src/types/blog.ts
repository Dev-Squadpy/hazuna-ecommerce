export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: Author;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}