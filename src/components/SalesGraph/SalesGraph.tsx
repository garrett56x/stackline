import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Sale } from "../../types/Sale";
import { formatCurrency } from "../../utils/formatters.ts";
import { movingAverage } from "../../utils/math.ts";
import "./SalesGraph.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesGraphProps {
  sales: Sale[];
}

const getTooltipLabel = (
  context: any,
  retailData: number[],
  retailerMarginData: number[]
): string => {
  const index = context.dataIndex;
  const label =
    context.dataset.label === "Retailer Margin"
      ? "Retailer Margin"
      : "Retail Sales";
  const originalValue =
    context.dataset.label === "Retailer Margin"
      ? retailerMarginData[index]
      : retailData[index];
  return `${label}: ${formatCurrency(originalValue / 100)}`;
};

const months = Array.from({ length: 12 }, (_, i) =>
  new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(0, i))
);

const SalesGraph = ({ sales }: SalesGraphProps) => {
  if (!sales.length) {
    return <p>No data available</p>;
  }

  const labels = sales.map((sale) => sale.weekEnding);
  const retailData = sales.map((sale) => sale.retailSales);
  const retailerMarginData = sales.map((sale) => sale.retailerMargin);

  // Smooth the retail and retailer margin data for nicer display
  const smoothedRetailData = movingAverage(retailData, 10); // 10-point moving average
  const smoothedRetailerMarginData = movingAverage(retailerMarginData, 10);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Retail Sales",
        data: smoothedRetailData,
        fill: false,
        tension: 0.4,
        backgroundColor: "#4BABF6",
        borderColor: "#4BABF6",
        pointStyle: false,
      },
      {
        label: "Retailer Margin",
        data: smoothedRetailerMarginData,
        fill: false,
        tension: 0.4,
        backgroundColor: "#99A4BE",
        borderColor: "#99A4BE",
        pointStyle: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            getTooltipLabel(context, retailData, retailerMarginData),
        },
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div className="salesGraph">
        <h2 className="salesGraphTitle">Retail Sales</h2>
        {/* typescript not accepting pointStyle: false (wants a string)
        pointStyle: false in chart.js docs https://www.chartjs.org/docs/latest/samples/line/point-styling.html */}
        {/* @ts-ignore */}
        <Line data={chartData} options={options} />
      </div>
      <div className="months">
        {months.map((month, i) => (
          <div key={i} className="month">
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesGraph;
