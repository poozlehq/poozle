/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import React from 'react';
import { Bar, ChartProps } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

interface BarChartProps extends Omit<ChartProps<'bar'>, 'type'> {
  max: string;
  min: string;
}

export function BarChart(props: BarChartProps) {
  return (
    <Bar
      style={{
        width: '100%',
        height: '100%',
        padding: '20px',
        paddingBottom: '40px',
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxis: {
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 15,
            },
            offsetAfterAutoskip: true,
            type: 'time',
            max: props.max,
            min: props.min,
          },
        },
        elements: {
          bar: {
            borderWidth: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      {...props}
    />
  );
}
