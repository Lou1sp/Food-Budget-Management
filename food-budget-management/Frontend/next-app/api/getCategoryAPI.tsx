import { useAuth } from '@/hooks/userAuth';
import { useState, useEffect } from 'react';
interface Categories {
  id: number;
  name: string;
  user_id: number;
  total_spent: number;
}

export default function GetCategoryAPI() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/data/categories?month=2&year=2026`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!res.ok)
          throw new Error(`Cannot fetch transaction data: ${res.status}`);
        const data = await res.json();
        console.log(data);
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [token]);
  return categories;
}
