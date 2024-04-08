import { Chart } from "chart.js";

const TemperatureChart = ({ temperatures }) => {
  useEffect(() => {
    const ctx = document.getElementById("temperature-chart");
    let chartInstance = null;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: temperatures.map((data) => {
          const date = new Date(data.datetime);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        }),
        datasets: [
          {
            label: "Wind Speed",
            data: temperatures.map((data) => data.wind_spd),
            backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color for wind speed bars
            yAxisID: "wind-speed-axis", // Assign wind speed data to the wind speed y-axis
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
          windSpeedAxis: {
            type: "linear",
            display: true,
            position: "right",
            id: "wind-speed-axis", // Identifier for the wind speed y-axis
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: "Wind Speed (MPH)",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [temperatures]);

  return <canvas id='temperature-chart' />;
};
