"use client";
import { Line } from "react-chartjs-2";
import {
  ChartData as ChartJSData,
  ChartOptions as ChartJSOptions,
} from "chart.js";
import { defaultChartOptions } from "./chart-wrapper";

interface LineChartProps {
  data: ChartJSData<"line">;
  options?: ChartJSOptions<"line">;
  titleText: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  options,
  titleText,
}) => {
  const chartOptions: ChartJSOptions<"line"> = {
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
      <Line data={data} options={chartOptions} />
    </div>
  );
};
