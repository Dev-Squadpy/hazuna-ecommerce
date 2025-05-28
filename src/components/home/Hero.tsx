import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Nueva Colección Verano",
    subtitle: "Descubre las últimas tendencias para esta temporada",
    buttonText: "Comprar Ahora",
    buttonLink: "/products?category=summer",
    imageUrl: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    title: "Ofertas Especiales",
    subtitle: "Hasta 40% de descuento en productos seleccionados",
    buttonText: "Ver Ofertas",
    buttonLink: "/products?category=sale",
    imageUrl: "https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    title: "Colección Exclusiva",
    subtitle: "Piezas únicas para un estilo inigualable",
    buttonText: "Descubrir",
    buttonLink: "/products?category=exclusive",
    imageUrl: "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[85vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`
            absolute inset-0 transition-opacity duration-1000 
            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg ml-8 md:ml-16">
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
                >
                  {slide.title}
                </h1>
                <p 
                  className="text-xl text-white/90 mb-8 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
                >
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.buttonLink}
                  className="
                    inline-flex items-center px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 
                    text-white font-medium transition-all transform hover:translate-x-1
                    opacity-0 animate-fade-in-up
                  "
                  style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
                >
                  {slide.buttonText}
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;