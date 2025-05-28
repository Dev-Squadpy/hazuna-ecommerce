import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import MobileMenu from './MobileMenu';
import SearchBar from '../ui/SearchBar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-md py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center transition-colors"
          >
            <span className={`${isScrolled ? 'text-teal-600' : 'text-white'}`}>
              Hazuna
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Inicio" isScrolled={isScrolled} />
            <NavLink to="/products" label="Productos" isScrolled={isScrolled} />
            <NavLink to="/blog" label="Blog" isScrolled={isScrolled} />
            <NavLink to="/products?category=new" label="Novedades" isScrolled={isScrolled} />
            <NavLink to="/products?category=sale" label="Ofertas" isScrolled={isScrolled} />
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link 
              to="/cart" 
              className={`p-2 rounded-full transition-colors relative ${
                isScrolled 
                  ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
              aria-label="View cart"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`md:hidden p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-white/20'
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className={`
          overflow-hidden transition-all duration-300 bg-white
          ${isSearchOpen ? 'max-h-24 py-4 shadow-md' : 'max-h-0 py-0'}
        `}>
          <div className="container mx-auto px-4">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="h-20"></div>
    </>
  );
};

const NavLink = ({ to, label, isScrolled }: { to: string; label: string; isScrolled: boolean }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname + location.search === to;
  
  return (
    <Link 
      to={to} 
      className={`font-medium transition-colors ${
        isScrolled
          ? `${isActive ? 'text-teal-600' : 'text-gray-800'} hover:text-teal-600`
          : `${isActive ? 'text-white' : 'text-white/90'} hover:text-white`
      }`}
    >
      {label}
    </Link>
  );
};

export default Header;