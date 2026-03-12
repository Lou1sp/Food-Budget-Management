export interface Product {
  title: string;
  price?: string;
  pricePerUnit?: string;
  image?: string;
  id?: string;
  brand?: string;
  source: string;
  url?: string;
}

//Every scraper need to follow this parent, having a scrape() function receiver a query string
//return a Promise of an array of Product
export interface BaseScraper {
    scrape(query: string): Promise<Product[]>;
}