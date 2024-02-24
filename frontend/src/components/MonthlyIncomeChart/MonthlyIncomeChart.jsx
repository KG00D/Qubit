import React from "react";
import { Bar } from "react-chartjs-2";

const MonthlyIncomeChart = ({ userData }) => {
  const monthlyIncome = userData?.monthlyIncome ?? 0;

  const data = {
    labels: ["Monthly Income"],
    datasets: [
      {
        label: "Income",
        data: [monthlyIncome],
        backgroundColor: ["rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MonthlyIncomeChart;
