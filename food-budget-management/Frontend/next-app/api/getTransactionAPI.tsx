import { useAuth } from '@/hooks/userAuth';
import { useState, useEffect } from 'react';

interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  spent_at: string;
  note?: string;
}

export default function GetTransactionAPI() {
  const { token } = useAuth();
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchTransaction = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/data/transactions?month=2&year=2026`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!res.ok)
          throw new Error(`Cannot fetch transaction data: ${res.status}`);
        console.log(res.status);
        const data = await res.json();
        console.log(data);
        setTransaction(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransaction();
  }, [token]);
  return transaction;
}
