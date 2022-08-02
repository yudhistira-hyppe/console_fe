import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: 'rgba(229, 157, 30, 1)',
    color: theme.palette.common.white,
  },
}));

const PendapatanGraph = () => {
  const classes = useStyles();
  const ripple = [
    { month: 'Jan', price: 1500 },
    { month: '', price: 400 },
    { month: 'Feb', price: 2000 },
    { month: 'Mar', price: 1200 },
    { month: 'Apr', price: 2200 },
    { month: 'May', price: 2600 },
    { month: 'Jun', price: 4300 },
    { month: 'July', price: 2900 },
    { month: 'Aug', price: 3800 },
    { month: 'Sep', price: 1500 },
  ];
  return (
    <ResponsiveContainer width="100%" height={112}>
      <AreaChart data={ripple} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload[0] ? <Box className={classes.tooltip}>${data.payload[0].payload.price}</Box> : null;
          }}
        />
        <defs>
          <linearGradient id="color18" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(229, 157, 30, 1)" stopOpacity={1} />
            <stop offset="95%" stopColor="rgba(217, 217, 217, 0)" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="price"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="rgba(229, 157, 30, 1)"
          fill="url(#color18)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PendapatanGraph;
