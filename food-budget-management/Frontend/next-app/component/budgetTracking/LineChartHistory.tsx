import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, // ✅ bắt buộc cho trục X dạng label
  LinearScale, // trục Y số liệu
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

interface History {
  date: string;
  spent: number;
}

interface Props {
  history: History[];
}

export default function LineChartHistory({ history }: Props) {
  const data = {
    labels: history.map((h) => h.date),
    datasets: [
      {
        label: 'Spent',
        data: history.map((h) => h.spent),
        fill: false,
        borderColor: '#8884d8',
        tension: 0.1,
      },
    ],
  };
  return (
    <Line
      data={data}
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
