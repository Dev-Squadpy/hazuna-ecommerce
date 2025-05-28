import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
        <p className="text-gray-600 mb-8">El artículo que buscas no existe o ha sido removido.</p>
        <Link 
          to="/blog" 
          className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700"
        >
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <button
              onClick={() => navigate(-1)}
              className="mb-8 inline-flex items-center text-white hover:text-teal-200 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Volver
            </button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm">{post.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock size={16} className="mr-2" />
                {post.readTime} min lectura
              </div>
              
              <time className="text-sm">
                {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
              </time>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 bg-teal-50 text-teal-600 text-sm font-medium rounded-full">
              {post.category}
            </span>
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{post.author.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{post.author.role}</p>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;