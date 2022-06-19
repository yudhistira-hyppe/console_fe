import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { getMonthName } from 'helpers/stringHelper';

const LogAktifitasGraph = (props) => {
  const { data: logActivity } = props;
  const [formattedLogActivity, setFormattedLogActivity] = useState([]);
  const [logActivityCount, setLogActivityCount] = useState([]);
  const [suggestedMaxForYAxes, setSuggestedMaxForYAxes] = useState(0);

  useEffect(() => {
    if (logActivity && logActivity.length > 0) {
      const temp = [...logActivity];
      temp.sort((a, b) => a.month - b.month);
      setFormattedLogActivity(temp);
    }
  }, [logActivity]);

  useEffect(() => {
    if (formattedLogActivity.length > 0) {
      const arrayLogActivityCount = formattedLogActivity.map((item) =>
        item.log.reduce((total, value) => total + value.count, 0),
      );
      const maxValue = Math.max(...arrayLogActivityCount);
      const roundUpValue = Math.ceil(maxValue / 10) * 10;
      setLogActivityCount(arrayLogActivityCount);
      setSuggestedMaxForYAxes(roundUpValue);
    }
  }, [formattedLogActivity]);

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
      labels: formattedLogActivity.map((item) => getMonthName(item.month)),
      datasets: [
        {
          label: 'Aktifitas',
          data: logActivityCount,
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
            suggestedMax: suggestedMaxForYAxes,
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Line data={data} height={100} options={options} />;
};

LogAktifitasGraph.propTypes = {
  data: PropTypes.array,
};

export default LogAktifitasGraph;
