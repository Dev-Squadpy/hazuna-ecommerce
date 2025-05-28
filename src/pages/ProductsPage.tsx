import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import ProductSort from '../components/products/ProductSort';
import { Product } from '../types/product';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const location = useLocation();
  
  // Parse URL query parameters for initial filter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let filtered = [...products];
    
    // Filter by category if provided
    if (category) {
      filtered = filtered.filter(product => {
        if (category === 'new' && product.isNew) return true;
        if (category === 'sale' && product.salePrice) return true;
        return product.category.toLowerCase() === category.toLowerCase() || 
               product.tags.includes(category.toLowerCase());
      });
    }
    
    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredProducts(filtered);
  }, [location.search]);
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];
    
    // Apply each filter
    Object.entries(filters).forEach(([sectionId, selectedOptions]) => {
      if (selectedOptions.length === 0) return;
      
      switch (sectionId) {
        case 'categories':
          filtered = filtered.filter(product => 
            selectedOptions.some(option => 
              product.category.toLowerCase() === option || 
              product.tags.includes(option)
            )
          );
          break;
        case 'prices':
          filtered = filtered.filter(product => {
            const price = product.salePrice || product.price;
            return selectedOptions.some(range => {
              if (range === '0-25') return price < 25;
              if (range === '25-50') return price >= 25 && price < 50;
              if (range === '50-100') return price >= 50 && price < 100;
              if (range === '100-200') return price >= 100 && price < 200;
              if (range === '200-plus') return price >= 200;
              return false;
            });
          });
          break;
        // Additional filter types can be handled here
      }
    });
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered = filtered.filter(product => product.isNew).concat(filtered.filter(product => !product.isNew));
        break;
      case 'price-low-high':
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [filters, sortBy]);
  
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Productos</h1>
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button 
            onClick={() => setIsMobileFilterOpen(true)} 
            className="w-full py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-center font-medium text-gray-700"
          >
            <Filter size={18} className="mr-2" />
            Filtrar Productos
          </button>
        </div>
        
        {/* Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="mb-4 sm:mb-0 text-gray-600">
            Mostrando {filteredProducts.length} productos
          </div>
          <ProductSort onSortChange={setSortBy} />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilter onFilterChange={setFilters} />
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 text-center rounded-lg shadow">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-4">No hay productos que coincidan con los filtros seleccionados.</p>
                <button 
                  onClick={() => setFilters({})} 
                  className="text-teal-600 font-medium hover:text-teal-800"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Drawer */}
      <div className={`
        fixed inset-0 z-50 transform transition-transform duration-300 lg:hidden
        ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileFilterOpen(false)}
        ></div>
        
        {/* Drawer Content */}
        <div className="absolute top-0 left-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-bold text-gray-900">Filtros</h3>
            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ProductFilter 
              onFilterChange={setFilters} 
              isMobile={true} 
              onClose={() => setIsMobileFilterOpen(false)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;