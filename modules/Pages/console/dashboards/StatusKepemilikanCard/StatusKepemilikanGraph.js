import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const StatusKepemilikanGraph = (props) => {
  const { data } = props;

  const formattedData = (data) => {
    if (data) {
      return data.map((item) => ({
        month: item.month_name,
        pending: item.monitize.find((monetizeItem) => monetizeItem.isCertified_data === false)?.isCertified_data_count_ || 0,
        success: item.monitize.find((monetizeItem) => monetizeItem.isCertified_data === true)?.isCertified_data_count_ || 0,
      }));
    }
  };

  return (
    <ResponsiveContainer width="100%" height={134}>
      <BarChart data={formattedData(data)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          itemStyle={{ color: '#9FB2B8' }}
          labelFormatter={function (value) {
            return `Bulan: ${value}`;
          }}
          cursor={false}
        />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <Bar dataKey="pending" name="Tertunda" stackId="a" fill="#0795F4" barSize={8} />
        <Bar dataKey="success" name="Berhasil" stackId="a" fill="#9BE7FD" barSize={8} />
      </BarChart>
    </ResponsiveContainer>
  );
};

StatusKepemilikanGraph.propTypes = {
  data: PropTypes.array,
};

export default StatusKepemilikanGraph;
