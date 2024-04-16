import moment from 'moment';
import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ActivitySizeGraph = ({ data }) => {
  const fixedData = () => {
    let array = [];

    data.map((item) => {
      array.push({
        ...item,
        date: moment(item.date).format('DD/MM/YYYY'),
      });
    });

    return array;
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={fixedData()} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="date" allowDataOverflow allowDecimals={false} />
        <YAxis allowDataOverflow allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="pict" stroke="rgb(255, 140, 0)" />
        <Line type="monotone" dataKey="vid" stroke="rgb(61, 76, 155)" />
        <Line type="monotone" dataKey="story" stroke="rgb(35, 173, 192)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActivitySizeGraph;
