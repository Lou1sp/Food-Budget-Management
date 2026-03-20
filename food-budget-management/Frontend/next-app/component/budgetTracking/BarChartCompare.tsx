import { Bar } from 'react-chartjs-2';
import generateColors from '@/hooks/generateColors';
import GetYearHistoryAPI from '@/api/userData_API/getYearHistoryAPI';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
  AnimationSpec,
} from 'chart.js';

interface ChosenYear {
  chosenYear: number;
  checkPoint: number
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChartByCategory({ chosenYear, checkPoint }: ChosenYear) {
  const monthlySpent = GetYearHistoryAPI(chosenYear, checkPoint);
  const COLORS = generateColors(monthlySpent.length);

  const data = {
    labels: monthlySpent.map((c) => `Month ${c.month}`),
    datasets: [
      {
        label: 'Total Spent',
        data: monthlySpent.map((c) => c.total_spent),
        backgroundColor: COLORS,
        borderColor: COLORS,
        borderWidth: 1,
        borderRadius: 10,
        barThickness: 38,
        hoverBackgroundColor: COLORS,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      // Type-safe
      duration: 800,
      easing: 'easeOutQuart' as AnimationSpec<'bar'>['easing'],
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (ctx: TooltipItem<'bar'>) => {
            const value = ctx.raw as number;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 13, weight: 500 } },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: {
          font: { size: 12 },
          callback: (value: string | number) =>
            `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="mt-15 h-72 md:h-96  ml-5 mr-5">
      <Bar data={data} options={options} />
    </div>
  );
}
