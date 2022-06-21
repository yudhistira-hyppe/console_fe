import React from 'react';
import PropTypes from 'prop-types';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Box } from '@material-ui/core';

const SummaryGraph = (props) => {
  const { graphData, graphAreaKey, graphXAxisKey } = props;

  return (
    <Box>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={graphData} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
          <Tooltip
            cursor={false}
            content={({ active, label, payload }) => {
              return active ? (
                <Box color="#000">
                  {payload?.map((row, index) => (
                    <Box key={index}>{`${label}: ${row.value} Pengguna`}</Box>
                  ))}
                </Box>
              ) : null;
            }}
            wrapperStyle={{
              background: '#FFF',
              padding: '5px 8px',
              border: '1px solid #803882',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          />
          <XAxis dataKey={graphXAxisKey} />
          <Area dataKey={graphAreaKey} stackId="1" stroke="#803882" fillOpacity={1} fill="#803882" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

SummaryGraph.propTypes = {
  graphData: PropTypes.array,
  graphAreaKey: PropTypes.string,
  graphXAxisKey: PropTypes.string,
};

export default SummaryGraph;
