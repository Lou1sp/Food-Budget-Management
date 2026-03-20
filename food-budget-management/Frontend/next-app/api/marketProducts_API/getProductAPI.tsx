import { useState, useEffect } from "react";
import { Products } from "@/component/market/Grocery";

export default function useProductAPI(
  category: string | null,
  source: string
) {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/market/products?category=${category}&market=${source}`
        );

        if (!res.ok) {
          throw new Error(`Cannot get products: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log("Cannot find products", error);
      }
    };

    fetchProducts();
  }, [category, source]);

  return products;
}