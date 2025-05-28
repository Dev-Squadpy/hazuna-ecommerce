import { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Las tendencias de moda que dominarán este verano",
    slug: "tendencias-moda-verano",
    excerpt: "Descubre las tendencias más hot que veremos en las calles esta temporada. Desde colores vibrantes hasta siluetas relajadas.",
    content: `
# Las tendencias de moda que dominarán este verano

El verano está a la vuelta de la esquina y con él llegan nuevas tendencias que prometen revolucionar nuestro armario. Este año, la moda se inclina hacia la comodidad sin sacrificar el estilo, con una mezcla perfecta entre lo casual y lo sofisticado.

## Colores vibrantes

Los tonos neón y los colores saturados serán protagonistas esta temporada. El verde lima, el naranja eléctrico y el fucsia se convertirán en los nuevos básicos del verano.

## Siluetas relajadas

La comodidad sigue siendo prioridad, con prendas holgadas que favorecen el movimiento. Los vestidos fluidos y los pantalones anchos serán imprescindibles.

## Accesorios statement

Los accesorios llamativos serán clave para elevar cualquier look. Collares XXL, bolsos metalizados y sandalias con plataforma dominarán las tendencias.

### Cómo incorporar estas tendencias

1. Comienza con piezas básicas en colores neutros
2. Añade un elemento statement en color vibrante
3. Complementa con accesorios que sigan la tendencia
4. No temas mezclar estilos y texturas

Recuerda que la mejor tendencia es aquella que te hace sentir cómoda y segura. ¡Encuentra tu estilo personal y diviértete experimentando con la moda!
    `,
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "María García",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Editora de Moda"
    },
    category: "Tendencias",
    tags: ["moda", "verano", "tendencias", "estilo"],
    publishedAt: "2025-03-15T10:00:00Z",
    readTime: 5
  },
  {
    id: "2",
    title: "Guía definitiva para cuidar tus prendas de diseñador",
    slug: "guia-cuidado-prendas-disenador",
    excerpt: "Aprende a mantener tus prendas favoritas en perfecto estado con estos consejos profesionales de cuidado y mantenimiento.",
    content: `
# Guía definitiva para cuidar tus prendas de diseñador

Invertir en prendas de diseñador es una decisión importante, y mantenerlas en buen estado es crucial para prolongar su vida útil. En esta guía, compartimos consejos expertos para el cuidado de tus piezas más preciadas.

## Almacenamiento adecuado

El almacenamiento correcto es fundamental para mantener la forma y calidad de tus prendas:

- Usa perchas de calidad para prendas pesadas
- Guarda los tejidos delicados en fundas de tela
- Evita la luz solar directa
- Mantén un ambiente seco y fresco

## Lavado y cuidado

Cada prenda requiere un cuidado específico:

1. Lee siempre las etiquetas de cuidado
2. Lava las prendas delicadas a mano
3. Usa detergentes suaves y específicos
4. Evita la secadora cuando sea posible

### Consejos adicionales

- Repara los daños menores inmediatamente
- Lleva las prendas a limpieza en seco cuando sea necesario
- Guarda las prendas limpias y completamente secas

Recuerda: una inversión en el cuidado adecuado es una inversión en la longevidad de tu guardarropa.
    `,
    image: "https://images.pexels.com/photos/5709667/pexels-photo-5709667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Carlos Ruiz",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Especialista en Moda Sostenible"
    },
    category: "Cuidados",
    tags: ["cuidados", "diseñador", "mantenimiento", "ropa"],
    publishedAt: "2025-03-10T14:30:00Z",
    readTime: 7
  },
  {
    id: "3",
    title: "Cómo crear un armario cápsula perfecto",
    slug: "crear-armario-capsula",
    excerpt: "Descubre cómo simplificar tu vida y maximizar tu estilo con un armario cápsula bien planificado.",
    content: `
# Cómo crear un armario cápsula perfecto

El concepto de armario cápsula ha ganado popularidad en los últimos años, y por buenas razones. Un armario bien curado no solo simplifica tu rutina diaria, sino que también promueve un consumo más consciente.

## ¿Qué es un armario cápsula?

Un armario cápsula es una colección limitada de prendas versátiles que pueden combinarse entre sí para crear múltiples looks. La clave está en la calidad sobre la cantidad.

## Piezas esenciales

### Básicos imprescindibles:
- 2-3 camisetas blancas de calidad
- 1 blazer negro o azul marino
- 1 par de jeans versátiles
- 1 vestido negro
- 1 camisa blanca

### Accesorios clave:
- 1 bolso neutro de calidad
- 2-3 pares de zapatos versátiles
- Accesorios minimalistas

## Consejos para empezar

1. Evalúa tu estilo de vida
2. Elige una paleta de colores coherente
3. Invierte en calidad
4. Prioriza la versatilidad

Recuerda: un armario cápsula debe reflejar tu estilo personal mientras mantiene la funcionalidad como prioridad.
    `,
    image: "https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Ana Martínez",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Consultora de Imagen"
    },
    category: "Estilo",
    tags: ["armario cápsula", "minimalismo", "estilo", "organización"],
    publishedAt: "2025-03-05T09:15:00Z",
    readTime: 6
  }
];