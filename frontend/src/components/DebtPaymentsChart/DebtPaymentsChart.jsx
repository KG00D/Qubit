import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "./DebtPaymentsChart.css";

const DebtPaymentsChart = ({ userData }) => {
  const canvasRef = React.useRef(null);

  const nonSecuredDebtPayments = userData?.nonSecuredDebtPayments ?? 0;
  const monthlyHousingPayment = userData?.monthlyHousingPayment ?? 0;
  const monthlyCarPayment = userData?.monthlyCarPayment ?? 0;

  useEffect(() => {
    if (!userData) return;

    const { nonSecuredDebtPayments, monthlyHousingPayment, monthlyCarPayment } =
      userData;

    const data = {
      labels: ["Car Payment", "Housing Payment", "Debt Payments"],
      datasets: [
        {
          label: "Monthly Expenses",
          data: [
            monthlyCarPayment,
            monthlyHousingPayment,
            nonSecuredDebtPayments,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

const config = {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Expenses Breakdown",
        font: {
          size: 24 
        }
      },
    },
  },
};


    const chartInstance = new Chart(canvasRef.current, config);

    return () => {
      chartInstance.destroy();
    };
  }, [userData]);

  return <canvas ref={canvasRef}></canvas>;
};

export default DebtPaymentsChart;
