export interface Products {
  id: string;
  title: string;
  price: string;
  image: string;
  brand: string;
  url: string;
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
