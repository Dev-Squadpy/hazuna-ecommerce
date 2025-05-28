import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductSortProps {
  onSortChange: (option: string) => void;
}

const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'newest', label: 'Más recientes' },
  { value: 'price-low-high', label: 'Precio: menor a mayor' },
  { value: 'price-high-low', label: 'Precio: mayor a menor' },
  { value: 'rating', label: 'Mejor valorados' }
];

const ProductSort = ({ onSortChange }: ProductSortProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  
  const handleOptionSelect = (option: typeof sortOptions[0]) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSortChange(option.value);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full md:w-64 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop for closing */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <ul>
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <button
                    className={`
                      w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors
                      ${option.value === selectedOption.value ? 'bg-gray-50 text-teal-600 font-medium' : 'text-gray-700'}
                    `}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSort;