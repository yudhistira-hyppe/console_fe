import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { getMonthName } from 'helpers/stringHelper';

const StatusKepemilikanGraph = (props) => {
  const { data } = props;
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setFormattedData(
        data?.map((item) => ({
          month: getMonthName(item.month),
          notCertified:
            item.monitize.find((monetizeItem) => monetizeItem.isCertified_data === false)?.isCertified_data_count_ || 0,
          certified:
            item.monitize.find((monetizeItem) => monetizeItem.isCertified_data === true)?.isCertified_data_count_ || 0,
        })),
      );
    }
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={134}>
      <BarChart data={formattedData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          itemStyle={{ color: '#9FB2B8' }}
          labelFormatter={function (value) {
            return `Bulan: ${value}`;
          }}
          cursor={false}
        />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <Bar dataKey="certified" name="Bersertifikat" stackId="a" fill="#9BE7FD" barSize={8} />
        <Bar dataKey="notCertified" name="Tidak Bersertifikat" stackId="a" fill="#0795F4" barSize={8} />
      </BarChart>
    </ResponsiveContainer>
  );
};

StatusKepemilikanGraph.propTypes = {
  data: PropTypes.array,
};

export default StatusKepemilikanGraph;
