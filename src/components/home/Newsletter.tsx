import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setIsError(true);
      return;
    }
    
    // In a real app, you would submit to your API here
    setIsSubmitted(true);
    setIsError(false);
    setEmail('');
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-16 bg-teal-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Únete a nuestra newsletter</h2>
        <p className="text-teal-100 mb-8 max-w-xl mx-auto">
          Recibe noticias sobre nuevas colecciones, ofertas exclusivas y consejos de moda directamente en tu email.
        </p>
        
        <form 
          onSubmit={handleSubmit} 
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-grow relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsError(false);
              }}
              placeholder="Tu correo electrónico"
              className={`
                w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300
                ${isError ? 'border-2 border-red-500' : ''}
              `}
              aria-label="Email address"
            />
            {isError && (
              <p className="absolute left-0 -bottom-6 text-sm text-white">Por favor, ingresa un email válido</p>
            )}
          </div>
          
          <button
            type="submit"
            className="
              px-6 py-3 rounded-lg bg-white text-teal-600 font-medium 
              hover:bg-teal-50 transition-colors flex items-center justify-center
              sm:whitespace-nowrap
            "
          >
            Suscribirme
            <Send size={18} className="ml-2" />
          </button>
        </form>
        
        {isSubmitted && (
          <p className="mt-6 text-white bg-teal-500 mx-auto max-w-md rounded-lg py-2 px-4 animate-fade-in">
            ¡Gracias por suscribirte! Hemos enviado un correo de confirmación.
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;