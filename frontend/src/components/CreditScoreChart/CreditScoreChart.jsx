import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CreditScoreGauge = ({ userData }) => {
  const score = userData?.creditScore ?? 0;

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && score !== undefined) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      const normalizedScore = ((score - 300) / (800 - 300)) * 100;

      const data = {
        labels: ["Score", "Remaining"],
        datasets: [
          {
            data: [normalizedScore, 100 - normalizedScore],
            backgroundColor: ["#36a2eb", "#f2f2f2"],
            borderColor: ["white", "white"],
            borderWidth: 2,
            circumference: 270,
            rotation: 135,
          },
        ],
      };

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
          cutout: "80%",
          rotation: -1 * Math.PI * 0.25,
          animation: {
            animateRotate: false,
            animateScale: false,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function(context) {
                  if (context.label === "Score") {
                    return `Credit Score: ${score}`;
                  }
                  return null;
                }
              }
            },
            title: {
              display: true,
              text: `Credit Score: ${score}`,
              position: 'top',
              font: {
                size: 24,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [score]);

  return <canvas ref={chartRef} width={200} height={200}></canvas>;
};

export default CreditScoreGauge;
