"use client";
import { Pie } from "react-chartjs-2";
import {
  ChartData as ChartJSData,
  ChartOptions as ChartJSOptions,
} from "chart.js";
import { defaultChartOptions } from "./chart-wrapper";

interface PieChartProps {
  data: ChartJSData<"pie">;
  options?: ChartJSOptions<"pie">;
  titleText: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  options,
  titleText,
}) => {
  const chartOptions: ChartJSOptions<"pie"> = {
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
      <Pie data={data} options={chartOptions} />
    </div>
  );
};
