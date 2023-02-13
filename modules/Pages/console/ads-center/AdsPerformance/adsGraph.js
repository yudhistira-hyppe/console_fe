import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '8px 12px',
    backgroundColor: 'rgb(157 143 167)',
    color: theme.palette.common.white,
  },
}));

const AdsGraph = ({ data }) => {
  const classes = useStyles();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload?.[0] ? (
              <Stack className={classes.tooltip}>
                <Typography style={{ fontSize: 12 }}>
                  {moment(data.payload?.[0].payload.createdAt).format('DD MMM YYYY')}
                </Typography>
                <Typography style={{ fontSize: 12 }}>
                  Impresi: {numberWithCommas(data.payload?.[0].payload?.totalview)}
                </Typography>
                <Typography style={{ fontSize: 12 }}>
                  CTA: {numberWithCommas(data.payload?.[0].payload?.totalclick)}
                </Typography>
              </Stack>
            ) : null;
          }}
        />
        <Area
          dataKey="totalclick"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#CB76CD"
          fill="url(#color13)"
          fillOpacity={1}
        />
        <Area
          dataKey="totalview"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#455DD8"
          fill="url(#color13)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AdsGraph;
