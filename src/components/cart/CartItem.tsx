import React from 'react';
import { Link } from 'react-router-dom';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/cart';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };
  
  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      {/* Product Image */}
      <Link to={`/products/${item.id}`} className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover object-center"
        />
      </Link>
      
      {/* Product Details */}
      <div className="ml-4 flex-grow">
        <div className="sm:flex sm:justify-between">
          <div>
            <Link 
              to={`/products/${item.id}`} 
              className="text-gray-800 font-medium hover:text-teal-600 transition-colors"
            >
              {item.name}
            </Link>
            
            {item.variant && (
              <p className="text-gray-500 text-sm mt-1">{item.variant}</p>
            )}
          </div>
          
          <div className="mt-2 sm:mt-0 text-right">
            <span className="text-gray-800 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-3 sm:flex sm:items-center sm:justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-lg w-max">
            <button 
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            
            <span className="w-8 text-center">{item.quantity}</span>
            
            <button 
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Remove Button */}
          <button 
            onClick={() => removeFromCart(item.id)}
            className="mt-3 sm:mt-0 flex items-center text-red-500 hover:text-red-700 transition-colors text-sm"
          >
            <Trash size={16} className="mr-1" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;