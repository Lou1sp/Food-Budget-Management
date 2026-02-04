import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import generateColors from '@/hooks/generateColors';
ChartJS.register(ArcElement, Tooltip, Legend);
interface Category {
  name: string;
  spent: number;
}

interface Props {
  categories: Category[];
}

export default function PieChartByCategory({ categories }: Props) {
  const COLORS = generateColors(categories.length);
  const data = {
    labels: categories.map((c) => c.name),
    datasets: [
      {
        data: categories.map((c) => c.spent),
        backgroundColor: COLORS.slice(0, categories.length),
        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: {
            position: "right",
            labels: {
            font: {
                size: 16,
            },
              color: 'white',
              padding: 20,
            },
          },
        },
      }}
    ></Pie>
  );
}
