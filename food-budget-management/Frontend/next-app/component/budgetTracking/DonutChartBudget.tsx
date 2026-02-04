import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface Props {
  spent: number;
  budget: number;
}

export default function DonutChartBudget({ spent, budget }: Props) {
  const data = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [spent, budget - spent],
        backgroundColor: ['#FF8042', '#00C49F'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={{
        plugins: {
          legend: {
            position: 'right',
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
    />
  );
}
