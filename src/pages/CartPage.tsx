import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  
  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBasket size={24} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">Parece que no has añadido ningún producto a tu carrito aún.</p>
          <Link 
            to="/products" 
            className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de compras</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Productos ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Vaciar carrito
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <Link
                  to="/products"
                  className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="w-full lg:w-96">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;