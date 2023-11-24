import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
	Filler,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
	Filler,
  Tooltip,
  Legend,
)


export default function LineChart({data, labels, startColor, endColor, borderColor}) {

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        borderColor: borderColor,
        borderWidth: 4,
				fill: "start",
      	backgroundColor: (context) => {
					const ctx = context.chart.ctx;
					const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
					gradient.addColorStop(0, startColor);
					gradient.addColorStop(1, endColor);
					return gradient;
				},
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			filler: {
        propagate: false
      }
		},
		elements: {
      line: {
        tension: 0.35
      }
    },
    interaction: {
      intersect: true
    },
		scales: {
			x: {
				ticks: {
					display: false,
				},
				grid: {
					drawBorder: false,
					display: false,
				},
				border:{
					display:false
				}
			},
			y: {
				ticks: {
					display: false,
					beginAtZero: true,
				},
				grid: {
					drawBorder: false,
					display: false,
				},
				border:{
					display:false
				}
			},
		},
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}