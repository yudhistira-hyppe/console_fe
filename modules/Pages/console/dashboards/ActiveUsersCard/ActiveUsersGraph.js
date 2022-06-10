import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { formatDateString } from 'helpers/stringHelper';

const ActiveUsersGraph = (props) => {
  const { data, xAxisKey, lineKey } = props;

  return (
    <ResponsiveContainer width="100%" height={120}>
      <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          cursor={false}
          content={({ active, label, payload }) => {
            return active ? (
              <Box color="#fff">
                {payload.map((row, index) => (
                  <Box key={index}>{`${formatDateString(label)}: ${row.value} pengguna`}</Box>
                ))}
              </Box>
            ) : null;
          }}
          wrapperStyle={{
            background: '#0062FF',
            padding: '5px 8px',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        />
        <XAxis dataKey={xAxisKey} hide />
        <Line dataKey={lineKey} type="monotone" dot={null} strokeWidth={3} stackId="2" stroke="#0062FF" />
      </LineChart>
    </ResponsiveContainer>
  );
};

ActiveUsersGraph.propTypes = {
  data: PropTypes.array,
  xAxisKey: PropTypes.string,
  lineKey: PropTypes.string,
};

export default ActiveUsersGraph;
