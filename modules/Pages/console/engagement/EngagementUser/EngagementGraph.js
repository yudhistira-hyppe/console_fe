import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { getMonthName } from 'helpers/stringHelper';

const EngagementGraph = (props) => {
  const { data: engagementData } = props;
  const [labels, setLabels] = useState([]);
  const [dataCount, setDataCount] = useState({});

  useEffect(() => {
    if (engagementData) {
      const resultDataCount = {};
      engagementData.forEach((item) =>
        item.eventType_activity.forEach(
          (activity) =>
            (resultDataCount[activity.eventType] = [
              ...(resultDataCount[activity.eventType] || []),
              activity.count_eventType,
            ]),
        ),
      );
      setDataCount(resultDataCount);
      setLabels(engagementData.map((item) => getMonthName(item.month_int)));
    }
  }, [engagementData]);

  const getSuggestedMaxForYAxes = (data) => {
    if (Object.keys(data).length > 0) {
      const values = Object.values(data);
      const formattedValues = values.reduce((acc, curr) => acc.concat(curr), []).map((item) => item);
      const maxValue = Math.max(...formattedValues);
      const roundUpValue = Math.ceil(maxValue / 10) * 10;
      return roundUpValue;
    }
  };

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
      labels: labels,
      datasets: [
        {
          label: 'Dilihat',
          data: dataCount['VIEW'] || [],
          borderColor: '#5D9405',
          borderWidth: 2,
          pointBackgroundColor: '#5D9405',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#5D9405',
          pointHoverBorderColor: '#fff',
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: 'Disukai',
          data: dataCount['LIKE'] || [],
          borderColor: '#E91E63',
          borderWidth: 2,
          pointBackgroundColor: '#E91E63',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#E91E63',
          pointHoverBorderColor: '#fff',
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: 'Dikomentari',
          data: dataCount['COMMENT'] || [],
          borderColor: '#0356AF',
          borderWidth: 2,
          pointBackgroundColor: '#0356AF',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#0356AF',
          pointHoverBorderColor: '#fff',
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: 'Diposting',
          data: dataCount['POST'] || [],
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
          label: 'Direaksi',
          data: dataCount['REACTION'] || [],
          borderColor: '#D36F1A',
          borderWidth: 2,
          pointBackgroundColor: '#D36F1A',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#D36F1A',
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
            suggestedMax: getSuggestedMaxForYAxes(dataCount),
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Line data={data} height={100} options={options} />;
};

EngagementGraph.propTypes = {
  data: PropTypes.array,
};

export default EngagementGraph;
