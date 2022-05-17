import React from 'react';
import { Line } from 'react-chartjs-2';

const EngagementGraph = () => {
  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const _stroke = ctx.stroke;

    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = '#4C4C4C';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      _stroke.apply(this, arguments);
      ctx.restore();
    };

    return {
      labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli'],
      datasets: [
        {
          label: 'Dilihat',
          data: [1000, 6000, 3500, 8900, 3000, 5000, 1000],
          borderColor: '#8DCD03',
          borderWidth: 2,
          pointBackgroundColor: '#8DCD03',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#8DCD03',
          pointHoverBorderColor: '#fff',
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: 'Disukai',
          data: [1000, 3000, 5500, 3200, 5300, 4000, 1000],
          borderColor: '#7F39FB',
          borderWidth: 2,
          pointBackgroundColor: '#7F39FB',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#7F39FB',
          pointHoverBorderColor: '#fff',
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: 'Dibagikan',
          data: [1000, 2000, 1200, 2400, 1600, 2200, 1000],
          borderColor: '#FF8C00',
          borderWidth: 2,
          pointBackgroundColor: '#FF8C00',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#FF8C00',
          pointHoverBorderColor: '#fff',
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: 'Reaksi',
          data: [1000, 1500, 700, 3800, 1200, 1400, 1000],
          borderColor: '#0795F4',
          borderWidth: 2,
          pointBackgroundColor: '#0795F4',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#0795F4',
          pointHoverBorderColor: '#fff',
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: false,
        },
      ],
    };
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMax: 10000,
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Line data={data} height={100} options={options} />;
};

export default EngagementGraph;
