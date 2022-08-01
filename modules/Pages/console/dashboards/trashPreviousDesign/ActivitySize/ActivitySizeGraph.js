import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { dateRange, getDateBeforeToday } from 'helpers/stringHelper';

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const ActivitySizeGraph = (props) => {
  const { data: dataActivity } = props;
  console.log('dataActivity:', dataActivity);

  const getLabels = (data) => {
    let newDaysList = [];
    if (Object.keys(data).length > 0) {
      const day = new Date().getDay();
      const tempDays = [...days];
      const lala = tempDays.splice(day, 7 - (day - 1));
      console.log('lala:', lala);
      newDaysList = [...lala, ...tempDays];
    }
    console.log('newDaysList:', newDaysList);
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
          borderColor: 'rgba(35, 173, 192, 1)',
          borderWidth: 1,
          pointBackgroundColor: 'rgba(35, 173, 192, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: 'rgba(35, 173, 192, 1)',
          pointHoverBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: 'HyppeVid',
          data: dataActivity && dataActivity.hyppevid ? formattedData(dataActivity.hyppevid) : [],
          borderColor: 'rgba(61, 76, 155, 1)',
          borderWidth: 1,
          pointBackgroundColor: 'rgba(61, 76, 155, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: 'rgba(61, 76, 155, 1)',
          pointHoverBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: 'HyppeDiary',
          data: dataActivity && dataActivity.hyppediaries ? formattedData(dataActivity.hyppediaries) : [],
          borderColor: 'rgba(142, 73, 240, 1)',
          borderWidth: 1,
          pointBackgroundColor: 'rgba(142, 73, 240, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: 'rgba(142, 73, 240, 1)',
          pointHoverBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: 'HyppePic',
          data: dataActivity && dataActivity.hyppepict ? formattedData(dataActivity.hyppepict) : [],
          borderColor: 'rgba(255, 140, 0, 1)',
          borderWidth: 1,
          pointBackgroundColor: 'rgba(255, 140, 0, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: 'rgba(255, 140, 0, 1)',
          pointHoverBorderColor: '#fff',
          pointRadius: 4,
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
