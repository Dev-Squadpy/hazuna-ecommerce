import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, ShoppingBag, Tag, Sparkles, User, Phone, Info } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div 
      className={`
        fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      
      {/* Menu Content */}
      <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Menú</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <MobileNavItem to="/" icon={<Home size={20} />} label="Inicio" onClick={onClose} />
            <MobileNavItem to="/products" icon={<ShoppingBag size={20} />} label="Productos" onClick={onClose} />
            <MobileNavItem to="/products?category=new" icon={<Sparkles size={20} />} label="Novedades" onClick={onClose} />
            <MobileNavItem to="/products?category=sale" icon={<Tag size={20} />} label="Ofertas" onClick={onClose} />
          </ul>
          
          <div className="border-t my-4"></div>
          
          <ul className="space-y-1 px-3">
            <MobileNavItem to="/about" icon={<Info size={20} />} label="Sobre Nosotros" onClick={onClose} />
            <MobileNavItem to="/contact" icon={<Phone size={20} />} label="Contacto" onClick={onClose} />
            <MobileNavItem to="/account" icon={<User size={20} />} label="Mi Cuenta" onClick={onClose} />
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="p-6 border-t">
          <p className="text-sm text-gray-500">© 2025 Hazuna. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

interface MobileNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MobileNavItem = ({ to, icon, label, onClick }: MobileNavItemProps) => {
  return (
    <li>
      <Link 
        to={to} 
        className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        onClick={onClick}
      >
        <span className="mr-3 text-gray-500">{icon}</span>
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default MobileMenu;