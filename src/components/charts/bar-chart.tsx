"use client";
import { Bar } from "react-chartjs-2";
import {
  ChartData as ChartJSData,
  ChartOptions as ChartJSOptions,
} from "chart.js"; // Use Chart.js types directly
import { defaultChartOptions } from "./chart-wrapper"; // Assuming ChartWrapper.tsx is in the same directory

interface BarChartProps {
  data: ChartJSData<"bar">; // Use Chart.js specific data type
  options?: ChartJSOptions<"bar">;
  titleText: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  options,
  titleText,
}) => {
  const chartOptions: ChartJSOptions<"bar"> = {
    // Ensure options type is specific
    ...defaultChartOptions,
    ...options,
    plugins: {
      ...defaultChartOptions.plugins,
      title: {
        ...defaultChartOptions.plugins.title,
        text: titleText,
        display: true,
      },
    },
  };
  return (
    <div className="h-[300px] md:h-[400px] p-4 bg-spotify-gray rounded-lg">
      <Bar data={data} options={chartOptions} />
    </div>
  );
};
