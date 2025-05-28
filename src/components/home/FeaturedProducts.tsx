import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = () => {
  // Get 8 featured products
  const featuredProducts = products
    .filter(product => product.featured)
    .slice(0, 8);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Productos Destacados</h2>
            <p className="text-gray-600 mt-2">Descubre nuestra selección de productos más populares</p>
          </div>
          <Link 
            to="/products" 
            className="text-teal-600 hover:text-teal-700 font-medium hidden md:block"
          >
            Ver todos los productos
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link 
            to="/products" 
            className="inline-block px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;