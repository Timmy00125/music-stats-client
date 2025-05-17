"use client";
// This is a generic wrapper. You'll create specific chart components like BarChart.tsx, PieChart.tsx etc.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

// Default options for all charts to maintain Spotify aesthetic
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#B3B3B3", // spotify-lightgray
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      color: "#FFFFFF", // spotify-white
      font: {
        size: 16,
        weight: "bold" as "bold", // Explicitly cast to the literal type
      },
    },
    tooltip: {
      backgroundColor: "#282828", // spotify-gray
      titleColor: "#FFFFFF",
      bodyColor: "#B3B3B3",
      borderColor: "#1DB954", // spotify-green
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#B3B3B3", // spotify-lightgray
      },
      grid: {
        color: "rgba(179, 179, 179, 0.1)", // spotify-lightgray with alpha
      },
    },
    y: {
      ticks: {
        color: "#B3B3B3", // spotify-lightgray
      },
      grid: {
        color: "rgba(179, 179, 179, 0.1)",
      },
    },
  },
};

// Specific Chart components will import and use this.
// e.g., components/charts/BarChart.tsx
// import { Bar } from 'react-chartjs-2';
// import { ChartData, ChartOptions } from '@/types';
// import { defaultChartOptions } from './ChartWrapper';
//
// interface BarChartProps {
//   data: ChartData;
//   options?: ChartOptions;
//   titleText: string;
// }
//
// export const BarChart: React.FC<BarChartProps> = ({ data, options, titleText }) => {
//   const chartOptions = { ...defaultChartOptions, ...options, plugins: { ...defaultChartOptions.plugins, title: {...defaultChartOptions.plugins.title, text: titleText}} };
//   return <Bar data={data} options={chartOptions} />;
// };

// You would create PieChart.tsx, LineChart.tsx similarly.
