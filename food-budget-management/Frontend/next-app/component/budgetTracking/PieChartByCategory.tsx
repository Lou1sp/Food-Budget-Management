import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, TooltipItem } from 'chart.js';
import generateColors from '@/hooks/generateColors';
import GetCategoryAPI from '@/api/getCategoryAPI';
import { ChosenYearAndMonth } from './DonutChartBudget';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function PieChartByCategory({chosenMonth, chosenYear, checkPoint}: ChosenYearAndMonth) {
  const categories = GetCategoryAPI(chosenMonth, chosenYear, checkPoint);
  const COLORS = generateColors(categories.length);

  // Calculate statistics
  const totalSpent = categories.reduce((sum, cat) => sum + Number(cat.total_spent), 0);

  const data = {
    labels: categories.map((c) => c.name),
    datasets: [
      {
        data: categories.map((c) => c.total_spent),
        backgroundColor: COLORS.slice(0, categories.length),
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 15,
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff',
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 13,
            family: "'Inter', 'SF Pro', system-ui, sans-serif",
            weight: 500,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#334155',
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            const labels = chart.data.labels || [];
            
            return labels.map((label, i) => {
              const value = datasets[0].data[i] as number;
              const percentage = totalSpent > 0 ? ((value / totalSpent) * 100).toFixed(1) : 0;
              
              return {
                text: `${label} (${percentage}%)`,
                fillStyle: COLORS[i],
                hidden: false,
                index: i,
              };
            });
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: 14,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context: TooltipItem<'pie'>) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = totalSpent > 0 ? ((value / totalSpent) * 100).toFixed(1) : 0;
            return [
              `${label}`,
              `Amount: $${value.toLocaleString()}`,
              `Percentage: ${percentage}%`
            ];
          }
        }
      },
    },
  };

  return (
    <div className="p-6">
      {/* Summary Stats */}
      <div className="mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
          <p className="text-xs font-medium text-blue-600 mb-1">Total Categories</p>
          <p className="text-2xl font-bold text-blue-700">
            {categories.length}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6 w-full" >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}