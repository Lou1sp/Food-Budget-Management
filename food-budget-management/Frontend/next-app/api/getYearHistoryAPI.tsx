import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/userAuth';

interface YearHistory {
  month: string;
  total_spent: number;
}
export default function GetYearHistoryAPI() {
  const { token } = useAuth();
  const [monthlyExpense, setMonthlyExpense] = useState<YearHistory[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchYearHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/data/monthlyExpense?year=2026`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!res.ok)
          throw new Error(`Cannot fetch year history data: ${res.status}`);
        console.log(res.status);
        const data = await res.json();
        console.log(data);
        setMonthlyExpense(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchYearHistory();
  }, [token]);
  return monthlyExpense;
}
