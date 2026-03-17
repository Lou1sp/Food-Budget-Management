export interface Product {
  id: string;
  name: string;
  price: string;
  unit: string;
  emoji: string;
  tag?: string | null;
}

export interface Category {
  id: string;
  icon: string;
  name: string;
  count: number;
}

export interface Store {
  id: string;
  name: string;
  tagline: string;
  initial: string;
  categories: Category[];
}