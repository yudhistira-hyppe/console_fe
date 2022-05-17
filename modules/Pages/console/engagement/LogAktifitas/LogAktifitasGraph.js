import React from 'react';
import { Line } from 'react-chartjs-2';

const LogAktifitasGraph = () => {
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
          label: 'Aktifitas',
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

export default LogAktifitasGraph;
