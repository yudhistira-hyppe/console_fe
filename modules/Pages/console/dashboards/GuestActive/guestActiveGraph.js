import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: '#2A8F9C',
    color: theme.palette.common.white,
  },
}));

const guestActiveGraph = ({ data }) => {
  const classes = useStyles();

  return (
    <ResponsiveContainer width="100%" height={130}>
      <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload[0] ? (
              <Box className={classes.tooltip}>
                {moment(data.payload[0].payload.date).format('DD MMM YYYY')}: {data.payload[0].payload.count} Guest
              </Box>
            ) : null;
          }}
        />
        <defs>
          <linearGradient id="color14" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#A9E8F0" stopOpacity={1} />
            <stop offset="95%" stopColor="rgba(255, 255, 255, 0.00)" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="count"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#2A8F9C"
          fill="url(#color14)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default guestActiveGraph;
