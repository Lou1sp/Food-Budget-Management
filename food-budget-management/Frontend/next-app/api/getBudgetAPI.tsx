import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/userAuth';

export default function GetBudgetAPI() {
  const { token } = useAuth();
  const [budget, setBudget] = useState(0);
  useEffect(() => {
    if (!token) return;

    const fetchBudget = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/data/budgets?month=1&year=2025`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!res.ok) throw new Error(`Cannot fetch budget data: ${res.status}`);
        console.log(res.status);
        const data = await res.json();
        console.log(data);
        setBudget(data.budget);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBudget();
  }, [token]);

  return budget;
}
