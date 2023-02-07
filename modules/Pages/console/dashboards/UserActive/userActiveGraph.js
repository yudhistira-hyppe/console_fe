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
    backgroundColor: 'rgba(180, 87, 246, 1)',
    color: theme.palette.common.white,
  },
}));

const userActiveGraph = ({ data }) => {
  const classes = useStyles();

  return (
    <ResponsiveContainer width="100%" height={112}>
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload[0] ? (
              <Box className={classes.tooltip}>
                {moment(data.payload[0].payload._id).format('DD MMM YYYY')}: {data.payload[0].payload.totaldata} User
              </Box>
            ) : null;
          }}
        />
        <defs>
          <linearGradient id="color12" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(180, 87, 246, 1)" stopOpacity={1} />
            <stop offset="95%" stopColor="rgba(244, 229, 246, 0)" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="totaldata"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="rgba(180, 87, 246, 1)"
          fill="url(#color12)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default userActiveGraph;
