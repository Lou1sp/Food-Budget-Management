import { useAuth } from '@/hooks/userAuth';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale, 
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  spent_at: string; // Postgres DATEONLY trả về string
  note?: string;
}

export default function LineChartHistory() {
  const { token } = useAuth();
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchTransaction = async () => {
      try{
        const res = await fetch(`http://localhost:5000/api/data/transactions?month=2&year=2026`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if(!res.ok) throw new Error(`Cannot fetch transaction data: ${res.status}`);
        console.log(res.status);
        const data = await res.json();
        console.log(data);
        setTransaction(data);
        setError(null)
      } catch (err) {
        console.error(err);
        setError('Failed to load budget');
      }
    };
    fetchTransaction();
    const interval = setInterval(fetchTransaction, 2000);
    return () => clearInterval(interval);
  }, [token])
  
  
  const userData = {
    labels: transaction.map((t) => t.spent_at),
    datasets: [
      {
        label: 'Spent',
        data: transaction.map((h) => h.amount),
        fill: false,
        borderColor: '#8884d8',
        tension: 0.1,
      },
    ],
  };
  return (
    <Line
      data={userData}
      options={{
        plugins: {
          legend: {
            labels: {
              font: {
                size: 15,
              },
            },
          },
        },
      }}
    ></Line>
  );
}
