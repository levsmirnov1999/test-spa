export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  liked?: boolean;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  liked?: boolean;
}
