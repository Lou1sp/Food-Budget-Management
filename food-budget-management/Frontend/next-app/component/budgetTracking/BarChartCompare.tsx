import React from 'react';
import { Bar } from 'react-chartjs-2';
import generateColors from '@/hooks/generateColors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface monthlySpent {
  month: string;
  spent: number;
}

interface Props {
  monthlySpent: monthlySpent[];
}

export default function BarChartByCategory({ monthlySpent }: Props) {
  const COLORS = generateColors(monthlySpent.length);
  const data = {
    labels: monthlySpent.map((c) => c.month),
    datasets: [
      {
        label: 'Spent',
        data: monthlySpent.map((c) => c.spent),
        backgroundColor: COLORS.slice(0, monthlySpent.length),
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,
              },
              padding: 20,
            },
          },
        },
      }}
    />
  );
}
