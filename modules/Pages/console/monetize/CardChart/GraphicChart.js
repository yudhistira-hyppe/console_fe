import React from 'react';
import CmtCard from '@coremat/CmtCard';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: 'rgba(180, 87, 246, 1)',
    color: theme.palette.common.white,
  },
  cardHeaderRoot: {
    paddingTop: 16,
    paddingBottom: 16,
  },
}));

const CardChartComponent = ({ dataChart, title, amount, colorGradient, colorStop1, colorStop2, strokeColor, dataKey }) => {
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
    <ResponsiveContainer width="100%" height={64}>
      <AreaChart data={dataChart} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload[0] ? <Box className={classes.tooltip}>${data.payload[0].payload.price}</Box> : null;
          }}
        />
        <defs>
          <linearGradient id={colorGradient} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colorStop1} stopOpacity={1} />
            <stop offset="95%" stopColor={colorStop2} stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          dataKey={dataKey}
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke={colorStop1}
          fill={`url(#${colorGradient})`}
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CardChartComponent;
