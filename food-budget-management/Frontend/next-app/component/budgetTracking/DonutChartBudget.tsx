import { Doughnut } from 'react-chartjs-2';
import { TooltipItem, ChartOptions } from 'chart.js';
import GetCategoryAPI from '@/api/getCategoryAPI';
import GetBudgetAPI from '@/api/getBudgetAPI';

export interface ChosenYearAndMonth{
  chosenMonth: number,
  chosenYear: number
}
export default function DonutChartBudget({chosenMonth, chosenYear}: ChosenYearAndMonth) {
  const categories = GetCategoryAPI(chosenMonth, chosenYear);
  let budget = GetBudgetAPI(chosenMonth, chosenYear);
  const totalSpent = categories.reduce((sum, cat) => sum + Number(cat.total_spent), 0);
  if (budget < totalSpent) budget = totalSpent;

  const remaining = budget - totalSpent;
  const percentageSpent = budget > 0 ? ((totalSpent / budget) * 100).toFixed(1) : '0';

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  const data = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [totalSpent, remaining],
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(75, 192, 192, 0.8)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 2,
        hoverOffset: 10,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: "'Inter', 'SF Pro', system-ui, sans-serif",
            weight: 500,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#334155',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const value = Number(context.parsed || 0);
            const label = context.label || '';
            const percentage = ((value / budget) * 100).toFixed(1);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
    },
  };

  const progressColor =
    Number(percentageSpent) > 90
      ? 'bg-red-500'
      : Number(percentageSpent) > 70
      ? 'bg-yellow-500'
      : 'bg-teal-500';

  return (
    <div className="ml-5 mr-5 mb-5">
      {/* Chart */}
      <div className="relative w-70 mx-auto aspect-square mt-10">
        <Doughnut data={data} options={options} />

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-10">
          <p className="text-sm font-medium text-gray-500 mb-1">Spent</p>
          <p className="text-3xl font-bold text-gray-800">{percentageSpent}%</p>
          <p className="text-xs text-gray-400 mt-1">{formatCurrency(totalSpent)}</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl">
          <p className="text-xs font-medium text-red-600 mb-1">Total Spent</p>
          <p className="text-lg font-bold text-red-700">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl">
          <p className="text-xs font-medium text-teal-600 mb-1">Remaining</p>
          <p className="text-lg font-bold text-teal-700">{formatCurrency(remaining)}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>Budget Progress</span>
          <span className="font-semibold">{formatCurrency(budget)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`${progressColor} h-full rounded-full`}
            style={{
              width: `${Math.min(Number(percentageSpent), 100)}%`,
              transition: 'width 0.7s ease-out',
            }}
          />
        </div>
      </div>

      {/* Warning */}
      {Number(percentageSpent) > 90 && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-3 rounded">
          <p className="text-sm text-red-700 font-medium">
            ⚠️ You have used {percentageSpent}% of your budget
          </p>
        </div>
      )}
    </div>
  );
}
