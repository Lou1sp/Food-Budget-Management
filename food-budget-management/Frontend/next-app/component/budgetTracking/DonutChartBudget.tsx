import { Doughnut } from 'react-chartjs-2';
import { useAuth } from '@/hooks/userAuth';
import { useState, useEffect } from 'react';

export default function DonutChartBudget() {
  const { token } = useAuth();
  const [budget, setBudget] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchBudget = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/data/budgets?month=1&year=2025`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Cannot fetch budget data: ${res.status}`);
        console.log(res.status)
        const data = await res.json();
        console.log(data);
        setBudget(data.budget);
        setError(null);
      } catch (err) {
        console.error(err); 
        setError('Failed to load budget');
      }
    };

    fetchBudget();
    const interval = setInterval(fetchBudget, 5000);
    
    return () => clearInterval(interval);
  }, [token]);

  const userData = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [0, budget - 0],
        backgroundColor: ['#FF8042', '#00C49F'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      data={userData}
      options={{
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: { size: 16 },
              padding: 20,
            },
          },
        },
      }}
    />
  );
}