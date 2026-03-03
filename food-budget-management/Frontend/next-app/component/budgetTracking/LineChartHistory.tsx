'use client';
import { ChosenYearAndMonth } from './DonutChartBudget';
import GetTransactionAPI from '@/api/getTransactionAPI';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  TooltipItem,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

interface Transaction {
  id: number;
  amount: number;
  spent_at: Date;
  note?: string;
  category: {
    name: string;
  };
}

export default function LineChartHistory({
  chosenMonth,
  chosenYear,
  checkPoint,
}: ChosenYearAndMonth) {
  const transaction: Transaction[] = GetTransactionAPI(chosenMonth, chosenYear, checkPoint);
  console.log(transaction)
  // Calculate statistics
  const amounts = transaction.map((t) => t.amount);
  const totalSpent = amounts.reduce((sum, amount) => sum + Number(amount), 0);
  const avgSpent = amounts.length > 0 ? totalSpent / amounts.length : 0;
  const maxSpent = amounts.length > 0 ? Math.max(...amounts) : 0;

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  const userData = {
    labels: transaction.map((t) => {
      const date = new Date(t.spent_at + 'T00:00:00');
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }),
    datasets: [
      {
        label: 'Daily Spending',
        data: amounts,
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: 'rgb(79, 70, 229)',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', 'SF Pro', system-ui, sans-serif",
            weight: 600,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#334155',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const value = Number(context.parsed.y || 0);
            return `Spent: ${formatCurrency(value)}`;
          },
          afterLabel: (context: TooltipItem<'line'>) => {
            const value = Number(context.parsed.y || 0);
            const diff = value - avgSpent;
            const diffPercent =
              avgSpent > 0 ? ((diff / avgSpent) * 100).toFixed(1) : '0';
            if (diff > 0) return `↑ ${diffPercent}% above average`;
            if (diff < 0)
              return `↓ ${Math.abs(Number(diffPercent))}% below average`;
            return 'At average';
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', 'SF Pro', system-ui, sans-serif",
          },
          color: '#64748b',
          padding: 8,
          callback: (tickValue) => `$${Number(tickValue).toLocaleString()}`,
        },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', 'SF Pro', system-ui, sans-serif",
          },
          color: '#64748b',
          padding: 8,
          maxRotation: 45,
          minRotation: 0,
        },
        border: { display: false },
      },
    },
  };

  return (
    <div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 ml-5 mr-5 mt-5">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl min-w-0">
          <p className="text-xs font-medium text-indigo-600 mb-1 truncate">
            Total Spent
          </p>
          <p className="text-lg font-bold text-indigo-700 truncate">
            {formatCurrency(totalSpent)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl min-w-0">
          <p className="text-xs font-medium text-purple-600 mb-1 truncate">
            Average
          </p>
          <p className="text-lg font-bold text-purple-700 truncate">
            {formatCurrency(avgSpent)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl min-w-0">
          <p className="text-xs font-medium text-pink-600 mb-1 truncate">
            Highest
          </p>
          <p className="text-lg font-bold text-pink-700 truncate">
            {formatCurrency(maxSpent)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full aspect-[16/9] h-100">
        <Line data={userData} options={options} />
      </div>

      {/* Trend Indicator */}
      {amounts.length >= 2 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 mb-5">
          {amounts[amounts.length - 1] > amounts[amounts.length - 2] ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-2xl">📈</span>
              <div>
                <p className="text-xs text-red-600 font-medium">Trending Up</p>
                <p className="text-xs text-red-500">
                  Spending increased from last day
                </p>
              </div>
            </div>
          ) : amounts[amounts.length - 1] < amounts[amounts.length - 2] ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-2xl">📉</span>
              <div>
                <p className="text-xs text-green-600 font-medium">
                  Trending Down
                </p>
                <p className="text-xs text-green-500">
                  Great! Spending decreased from last day
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-2xl">➡️</span>
              <div>
                <p className="text-xs text-blue-600 font-medium">Steady</p>
                <p className="text-xs text-blue-500">
                  Spending unchanged from last day
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
