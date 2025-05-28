import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface ProductFilterProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const filterSections: FilterSection[] = [
  {
    id: 'categories',
    title: 'Categorías',
    options: [
      { id: 'clothing', label: 'Ropa' },
      { id: 'accessories', label: 'Accesorios' },
      { id: 'footwear', label: 'Calzado' },
      { id: 'jewelry', label: 'Joyería' }
    ]
  },
  {
    id: 'prices',
    title: 'Precio',
    options: [
      { id: '0-25', label: 'Menos de $25' },
      { id: '25-50', label: '$25 - $50' },
      { id: '50-100', label: '$50 - $100' },
      { id: '100-200', label: '$100 - $200' },
      { id: '200-plus', label: 'Más de $200' }
    ]
  },
  {
    id: 'sizes',
    title: 'Tallas',
    options: [
      { id: 'xs', label: 'XS' },
      { id: 's', label: 'S' },
      { id: 'm', label: 'M' },
      { id: 'l', label: 'L' },
      { id: 'xl', label: 'XL' },
      { id: 'xxl', label: 'XXL' }
    ]
  },
  {
    id: 'colors',
    title: 'Colores',
    options: [
      { id: 'black', label: 'Negro' },
      { id: 'white', label: 'Blanco' },
      { id: 'red', label: 'Rojo' },
      { id: 'blue', label: 'Azul' },
      { id: 'green', label: 'Verde' },
      { id: 'yellow', label: 'Amarillo' },
      { id: 'purple', label: 'Morado' }
    ]
  }
];

const ProductFilter = ({ onFilterChange, isMobile = false, onClose }: ProductFilterProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(filterSections.map(section => [section.id, true]))
  );
  
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  const handleCheckboxChange = (sectionId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentOptions = prev[sectionId] || [];
      
      let newOptions;
      if (checked) {
        newOptions = [...currentOptions, optionId];
      } else {
        newOptions = currentOptions.filter(id => id !== optionId);
      }
      
      const newFilters = {
        ...prev,
        [sectionId]: newOptions
      };
      
      // Notify parent of changes
      onFilterChange(newFilters);
      
      return newFilters;
    });
  };
  
  const clearFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
  };
  
  // Count total active filters
  const totalActiveFilters = Object.values(selectedFilters).reduce(
    (sum, options) => sum + options.length, 
    0
  );

  return (
    <div className={`
      bg-white h-full flex flex-col
      ${isMobile ? 'rounded-none' : 'rounded-lg shadow-md p-4'}
    `}>
      {/* Mobile Header */}
      {isMobile && onClose && (
        <div className="sticky top-0 z-10 border-b pb-4 mb-4 flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">Filtros</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
      )}
      
      {/* Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">
          {!isMobile && 'Filtros'}
          {totalActiveFilters > 0 && (
            <span className="ml-2 text-sm bg-teal-600 text-white px-2 py-0.5 rounded-full">
              {totalActiveFilters}
            </span>
          )}
        </h3>
        
        {totalActiveFilters > 0 && (
          <button 
            onClick={clearFilters}
            className="text-sm text-teal-600 hover:text-teal-800"
          >
            Limpiar todos
          </button>
        )}
      </div>
      
      {/* Filter Sections */}
      <div className="flex-grow overflow-y-auto">
        {filterSections.map((section) => (
          <div key={section.id} className="mb-6">
            <button
              className="w-full flex justify-between items-center text-left font-medium text-gray-900 mb-2"
              onClick={() => toggleSection(section.id)}
            >
              {section.title}
              {expandedSections[section.id] ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
              )}
            </button>
            
            {expandedSections[section.id] && (
              <div className="space-y-2 ml-1">
                {section.options.map((option) => {
                  const isChecked = selectedFilters[section.id]?.includes(option.id) || false;
                  
                  return (
                    <label key={option.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleCheckboxChange(section.id, option.id, e.target.checked)}
                        className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4 mr-2"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile Apply Button */}
      {isMobile && onClose && (
        <div className="mt-auto border-t pt-4">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
          >
            Aplicar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;