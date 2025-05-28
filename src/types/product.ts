export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  stock: number;
  featured: boolean;
  isNew: boolean;
}