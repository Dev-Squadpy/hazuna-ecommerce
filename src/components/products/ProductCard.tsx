import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Calculate discount percentage if there's a sale price
  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  return (
    <Link 
      to={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 h-full"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay buttons */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button 
              onClick={handleAddToCart}
              className="
                p-3 rounded-full bg-white shadow-md text-gray-700 hover:text-teal-600
                transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300
              "
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
            <button 
              className="
                p-3 rounded-full bg-white shadow-md text-gray-700 hover:text-red-500
                transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300
              "
              aria-label="Add to wishlist"
              onClick={(e) => e.preventDefault()}
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
        
        {/* Sale badge */}
        {product.salePrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </span>
        )}
        
        {/* New badge */}
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded">
            Nuevo
          </span>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-gray-700 font-medium mb-1 truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-3 truncate">{product.category}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.salePrice ? (
              <>
                <span className="text-teal-600 font-bold">${product.salePrice.toFixed(2)}</span>
                <span className="text-gray-400 line-through text-sm ml-2">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-gray-800 font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-600 text-sm ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;