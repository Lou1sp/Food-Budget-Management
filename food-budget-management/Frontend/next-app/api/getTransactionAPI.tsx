import { useAuth } from '@/hooks/userAuth';
import { useState, useEffect } from 'react';

interface Transaction {
  id: number;
  amount: number;
  spent_at: string;
  note?: string;
  total_amount: number;
  category: {
    name: string;
  };
}

interface TransactionGroupByDate {
  date: Date,
  total_amount: number
}
export default function GetTransactionAPI(
  monthAttribute: number | undefined,
  yearAttribute: number | undefined,
  checkPoint: number,
) {
  const { token } = useAuth();
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchTransaction = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/data/transactions?month=${monthAttribute}&year=${yearAttribute}`,
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
  }, [token, monthAttribute, yearAttribute, checkPoint]);
  return transaction;
}

export function GetTransactionGroupByDayAPI(
  monthAttribute: number | undefined,
  yearAttribute: number | undefined,
  checkPoint: number,
) {
  const { token } = useAuth();
  const [transaction, setTransaction] = useState<TransactionGroupByDate[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchTransaction = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/data/transactionsgroupbyday?month=${monthAttribute}&year=${yearAttribute}`,
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
  }, [token, monthAttribute, yearAttribute, checkPoint]);
  return transaction;
}
