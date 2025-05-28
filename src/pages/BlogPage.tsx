import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre las últimas tendencias, consejos de estilo y novedades del mundo de la moda
          </p>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === ''
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article 
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-teal-50 text-teal-600 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={14} className="mr-1" />
                    {post.readTime} min lectura
                  </div>
                </div>
                
                <Link to={`/blog/${post.slug}`} className="block">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-teal-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
                      </p>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-teal-600 text-sm font-medium hover:text-teal-700"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;