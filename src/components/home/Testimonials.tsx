import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "María López",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "Increíble calidad en todos los productos que he comprado. El servicio al cliente es excelente y las entregas son rápidas. ¡Sin duda mi tienda favorita!"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "Me encanta la variedad de productos y la atención al detalle. Siempre encuentro algo único para cada ocasión. Las prendas son duraderas y de gran calidad."
  },
  {
    id: 3,
    name: "Ana Martínez",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
    text: "La relación calidad-precio es inmejorable. Cada vez que necesito renovar mi armario, Hazuna es mi primera opción. El diseño de las prendas es moderno y atemporal."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Descubre por qué nuestros clientes confían en nosotros para sus compras</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <div className="flex mt-1">
                      {Array(5).fill(0).map((_, index) => (
                        <Star 
                          key={index} 
                          size={16} 
                          className={`${
                            index < testimonial.rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;