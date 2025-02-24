'use client';
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js';
import React, { HTMLAttributes } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { cn } from '@/lib/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps extends HTMLAttributes<HTMLDivElement> {
  labels: string[];
  data: number[];
  options?: ChartOptions<'doughnut'>;
  className?: string;
}

const PieChart = ({
  labels,
  data,
  options,
  className,
  ...props
}: PieChartProps) => {
  const defaultClassName = 'w-96';
  const combinedClassName = className
    ? cn(defaultClassName, className)
    : defaultClassName;
  const combinedData: ChartData<'doughnut'> = {
    labels,
    datasets: [
      {
        label: '총 합계: ',
        data,
        backgroundColor: ['#32e4d0', '#cb78ea', '#fff0b6'],
        borderWidth: 0,
        hoverBackgroundColor: '#93d6ce80',
        hoverBorderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };
  const combinedOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    layout: {
      padding: {
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#F0F0F0',
          font: {
            size: 14,
          },
        },
      },
    },
    ...options,
  };

  if (data.length === 0) {
    return (
      <section className="min-w-96 flex justify-center items-center rounded bg-black/50">
        데이터가 없습니다
      </section>
    );
  }

  return (
    <section
      className={combinedClassName}
      {...props}
    >
      <Doughnut
        data-testid="pie-chart"
        data={combinedData}
        options={combinedOptions}
      />
    </section>
  );
};

export default PieChart;
