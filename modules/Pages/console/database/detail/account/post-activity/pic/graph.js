import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'relative',
    padding: '4px 12px',
    border: '1px solid #00000061',
  },
}));

const ActivityPostPicGraph = ({ data }) => {
  const classes = useStyles();

  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 6 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload?.[0] ? (
              <Stack direction="column" gap="4px" className={classes.tooltip}>
                <Typography style={{ fontSize: 12 }}>
                  {moment(data.payload?.[0].payload?.date).format('DD MMM YYYY')}:
                </Typography>
                <Typography style={{ fontSize: 12, color: '#7438CA' }}>
                  Views: {data.payload?.[0].payload?.views || 0}
                </Typography>
                <Typography style={{ fontSize: 12, color: '#CB76CD' }}>
                  Likes: {data.payload?.[0].payload?.likes || 0}
                </Typography>
              </Stack>
            ) : null;
          }}
        />
        <defs>
          <linearGradient id="color12" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7438CA" stopOpacity={1} />
            <stop offset="95%" stopColor="rgba(244, 229, 246, 0)" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="color14" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#CB76CD" stopOpacity={1} />
            <stop offset="95%" stopColor="rgba(255, 255, 255, 0.00)" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="views"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#7438CA"
          fill="url(#color12)"
          fillOpacity={1}
        />
        <Area
          dataKey="likes"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#CB76CD"
          fill="url(#color14)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ActivityPostPicGraph;
