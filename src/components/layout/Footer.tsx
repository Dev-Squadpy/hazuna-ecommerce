import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hazuna</h3>
            <p className="text-gray-400 mb-4">
              Descubre nuestra exquisita colección de moda y accesorios. Calidad y estilo para todos los gustos.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Instagram size={20} />} href="https://instagram.com" />
              <SocialLink icon={<Facebook size={20} />} href="https://facebook.com" />
              <SocialLink icon={<Twitter size={20} />} href="https://twitter.com" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <FooterLink href="/products" label="Productos" />
              <FooterLink href="/products?category=new" label="Novedades" />
              <FooterLink href="/products?category=sale" label="Ofertas" />
              <FooterLink href="/about" label="Sobre nosotros" />
              <FooterLink href="/contact" label="Contacto" />
            </ul>
          </div>
          
          {/* Help & Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ayuda e información</h3>
            <ul className="space-y-3">
              <FooterLink href="/shipping" label="Envíos y entregas" />
              <FooterLink href="/returns" label="Devoluciones" />
              <FooterLink href="/faq" label="Preguntas frecuentes" />
              <FooterLink href="/privacy" label="Privacidad" />
              <FooterLink href="/terms" label="Términos y condiciones" />
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400">
                  Av. de las Américas 1200, Guadalajara, México
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400">+52 33 1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400">info@hazuna.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 Hazuna. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <img 
              src="https://via.placeholder.com/180x30?text=Payment+Methods" 
              alt="Payment methods" 
              className="h-6" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <li>
      <Link 
        to={href} 
        className="text-gray-400 hover:text-teal-400 transition-colors"
      >
        {label}
      </Link>
    </li>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-10 h-10 rounded-full flex items-center justify-center
        bg-gray-800 text-gray-400 hover:bg-teal-600 hover:text-white
        transition-colors
      "
    >
      {icon}
    </a>
  );
};

export default Footer;