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

const SalesGraph = ({ sales }: SalesGraphProps) => {
  const labels = sales.map((sale) => sale.weekEnding);
  const retailData = sales.map((sale) => sale.retailSales);
  const retailerMarginData = sales.map((sale) => sale.retailerMargin);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Retail Sales",
        data: retailData,
        fill: false,
        tension: 0.4,
        backgroundColor: "#4BABF6",
        borderColor: "#4BABF6",
        pointStyle: false,
      },
      {
        label: "Retailer Margin",
        data: retailerMarginData,
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

  return <Line data={chartData} options={options} />;
};

export default SalesGraph;
