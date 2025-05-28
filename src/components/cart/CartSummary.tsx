import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
  const { cartItems } = useCart();
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.16; // 16% tax
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de tu orden</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Impuestos</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Envío</span>
          {shipping > 0 ? (
            <span>${shipping.toFixed(2)}</span>
          ) : (
            <span className="text-green-600">Gratis</span>
          )}
        </div>
        
        {subtotal < 100 && (
          <div className="text-sm text-gray-500 pt-1">
            Añade ${(100 - subtotal).toFixed(2)} más para obtener envío gratis.
          </div>
        )}
        
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button 
        className="
          w-full mt-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 
          text-white font-medium transition-colors flex items-center justify-center
        "
      >
        Proceder al pago
        <ArrowRight size={18} className="ml-2" />
      </button>
      
      {/* Accepted Payment Methods */}
      <div className="mt-6">
        <p className="text-gray-500 text-xs text-center mb-2">Aceptamos:</p>
        <div className="flex justify-center space-x-2">
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;