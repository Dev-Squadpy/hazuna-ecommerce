import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronRight, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/products/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  
  // Set default selected image when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);
  
  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Producto no encontrado</h1>
        <p className="text-gray-600 mb-8">El producto que buscas no existe o ha sido removido.</p>
        <Link 
          to="/products" 
          className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700"
        >
          Ver todos los productos
        </Link>
      </div>
    );
  }
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };
  
  // Find related products (same category or tags)
  const relatedProducts = products
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || 
        p.tags.some(tag => product.tags.includes(tag)))
    )
    .slice(0, 4);
  
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-teal-600">Inicio</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/products" className="hover:text-teal-600">Productos</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to={`/products?category=${product.category.toLowerCase()}`} className="hover:text-teal-600">
              {product.category}
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-6">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`
                    aspect-square rounded-lg overflow-hidden border-2
                    ${selectedImage === image ? 'border-teal-500' : 'border-transparent'}
                  `}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.isNew && (
                <span className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded">
                  Nuevo
                </span>
              )}
              {product.salePrice && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded">
                  Oferta
                </span>
              )}
              {product.stock <= 5 && (
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded">
                  Últimas unidades
                </span>
              )}
            </div>
            
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.rating} (120 reseñas)</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900">${product.salePrice.toFixed(2)}</span>
                  <span className="ml-3 text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <span className="ml-3 text-sm font-medium text-red-600">
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% de descuento
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <div className="text-gray-700 mb-8">
              <p>{product.description}</p>
            </div>
            
            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tallas</h3>
              <div className="grid grid-cols-5 gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedVariant(size)}
                    className={`
                      py-2 px-3 border rounded-md text-sm font-medium
                      ${selectedVariant === size 
                        ? 'border-teal-600 bg-teal-50 text-teal-600' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-md w-full sm:w-32">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
              
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center transition-colors"
              >
                <ShoppingCart size={20} className="mr-2" />
                Añadir al carrito
              </button>
              
              {/* Wishlist Button */}
              <button className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            
            {/* Stock Status */}
            <div className="flex items-center text-sm mb-6">
              {product.stock > 0 ? (
                <>
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-green-600 font-medium">
                    En stock
                    {product.stock <= 10 && ` (${product.stock} disponibles)`}
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Agotado</span>
              )}
            </div>
            
            {/* Extra Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="font-medium text-gray-900 w-32">SKU:</span>
                <span>HAZ{product.id.padStart(6, '0')}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-900 w-32">Categoría:</span>
                <Link 
                  to={`/products?category=${product.category.toLowerCase()}`}
                  className="text-teal-600 hover:text-teal-700"
                >
                  {product.category}
                </Link>
              </div>
              <div className="flex flex-wrap items-center">
                <span className="font-medium text-gray-900 w-32">Etiquetas:</span>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Link 
                      key={tag}
                      to={`/products?tag=${tag}`}
                      className="text-teal-600 hover:text-teal-700"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;