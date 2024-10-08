import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: 'rgba(69, 93, 216, 1)',
    color: theme.palette.common.white,
  },
}));

const VoucherGraph = ({ data }) => {
  const classes = useStyles();

  return (
    <ResponsiveContainer width="100%" height={112}>
      <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload[0] ? (
              <Box className={classes.tooltip}>
                {moment(data.payload[0].payload._id).format('DD MMM YYYY')}: Rp{' '}
                {numberWithCommas(data.payload[0].payload?.totalpenjualanperhari)}
              </Box>
            ) : null;
          }}
        />
        <defs>
          <linearGradient id="color15" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(69, 93, 216, 1)" stopOpacity={1} />
            <stop offset="95%" stopColor="rgba(255, 255, 255, 0)" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="totalpenjualanperhari"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="rgba(69, 93, 216, 1)"
          fill="url(#color15)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VoucherGraph;
