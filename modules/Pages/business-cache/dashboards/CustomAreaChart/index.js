import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Box } from '@material-ui/core';

const CustomAreaChart = ({ chartData }) => {
  const tooltipClass = {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: '#21C0E8',
    color: 'white',
  };
  const month = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return (
    <ResponsiveContainer width="100%" height={100}>
      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis dataKey="month" hide />
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload[0] ? (
              <Box style={tooltipClass}>
                {console.log('asdada', data)}
                Month {month[data.payload[0].payload.month - 1]} : {data.payload[0].payload.count}
              </Box>
            ) : null;
          }}
        />
        <defs>
          <linearGradient id="color11" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#AB22AF" stopOpacity={0.1} />
            <stop offset="40%" stopColor="#fff" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Area
          dataKey="count"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#AB22AF"
          fill="url(#color11)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default CustomAreaChart;
