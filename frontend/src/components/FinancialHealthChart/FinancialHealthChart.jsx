import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const FinancialHealthChart = ({ userData }) => {
  const nonSecuredDebtPayments = userData?.nonSecuredDebtPayments ?? 0;
  const monthlyHousingPayment = userData?.monthlyHousingPayment ?? 0;
  const monthlyCarPayment = userData?.monthlyCarPayment ?? 0;
  const monthlyIncome = userData?.monthlyIncome ?? 0;

  const totalMonthlyDebt =
    monthlyHousingPayment + monthlyCarPayment + nonSecuredDebtPayments;
  const dtiRatio = monthlyIncome ? (totalMonthlyDebt / monthlyIncome) * 100 : 0;

  // Round the DTI ratio to two decimal places for display
  const roundedDTIRatio = dtiRatio.toFixed(2);

  const effectiveDTIRatio = dtiRatio > 100 ? 100 : dtiRatio;
  const remainingPercentage = dtiRatio >= 100 ? 0 : 100 - dtiRatio;

  const data = {
    labels: ["DTI Ratio", "Remaining"],
    datasets: [
      {
        data: [effectiveDTIRatio, remainingPercentage],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255,99,132,1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `DTI Ratio: ${roundedDTIRatio}%`,
        font: {
          size: 24,
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default FinancialHealthChart;
