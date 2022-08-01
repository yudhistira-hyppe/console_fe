import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { dateRange, getDateBeforeToday } from 'helpers/stringHelper';

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const ActivitySizeGraph = (props) => {
  const { data: dataActivity } = props;

  const getLabels = (data) => {
    let newDaysList = [];
    if (Object.keys(data).length > 0) {
      const day = new Date().getDay();
      const tempDays = [...days];
      const lala = tempDays.splice(day, 7 - (day - 1));
      newDaysList = [...lala, ...tempDays];
    }
    return newDaysList;
  };

  const getSuggestedMaxForYAxes = (data) => {
    if (Object.keys(data).length > 0) {
      const values = Object.values(data);
      const formattedValues = values.reduce((acc, curr) => acc.concat(curr), []).map((item) => item.totalpost);
      const maxValue = Math.max(...formattedValues);
      const roundUpValue = Math.ceil(maxValue / 10) * 10;
      return roundUpValue;
    }
  };

  const formattedData = (data) => {
    return dateRange(getDateBeforeToday(6), new Date()).map((date) => {
      let filter = data.filter((item) => new Date(item.date).toLocaleDateString() === date);
      if (filter.length > 0) {
        return filter[0].totalpost;
      } else {
        return 0;
      }
    });
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
            suggestedMax: getSuggestedMaxForYAxes(dataActivity),
            beginAtZero: true,
          },
        },
      ],
    },
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
      labels: getLabels(dataActivity),
      datasets: [
        {
          label: 'HyppeStory',
          data: dataActivity && dataActivity.hyppestories ? formattedData(dataActivity.hyppestories) : [],
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
          label: 'HyppeVid',
          data: dataActivity && dataActivity.hyppevid ? formattedData(dataActivity.hyppevid) : [],
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
          label: 'HyppeDiary',
          data: dataActivity && dataActivity.hyppediaries ? formattedData(dataActivity.hyppediaries) : [],
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
        {
          label: 'HyppePic',
          data: dataActivity && dataActivity.hyppepict ? formattedData(dataActivity.hyppepict) : [],
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

  return <Line data={data} height={100} options={options} />;
};

ActivitySizeGraph.propTypes = {
  data: PropTypes.object,
};

export default ActivitySizeGraph;
