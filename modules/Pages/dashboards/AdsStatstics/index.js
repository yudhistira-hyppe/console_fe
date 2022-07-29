// react
import React from 'react';

// material ui
import { Box } from '@material-ui/core';
import CmtCard from '../../../../@coremat/CmtCard';
import makeStyles from '@material-ui/core/styles/makeStyles';

// components template
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';

// third party library
import clsx from 'clsx';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const useStyles = makeStyles((theme) => ({
  dot: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    backgroundColor: '#1CACCE',
  },
  dotPrimary: {
    backgroundColor: '#D133D7',
  },
  dotSecond: {
    backgroundColor: '#6C166F',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  headTitle: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#202020',
  },
}));

const DataChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={170}>
      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis dataKey="month" hide />
        <Tooltip />
        <defs>
          <linearGradient id="color11" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#951E99" stopOpacity={0.1} />
            <stop offset="40%" stopColor="#fff" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="color12" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D133D7" stopOpacity={0.1} />
            <stop offset="40%" stopColor="#fff" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Area
          dataKey="budget"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#D133D7"
          fill="url(#color12)"
          fillOpacity={1}
        />
        <Area
          dataKey="growth"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#951E99"
          fill="url(#color11)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const AdsStatstics = () => {
  const classes = useStyles();

  return (
    <div style={{ height: '250px' }} className="flex-auto">
      <CmtCard className="h-full w-full">
        <CmtCardContent>
          <div className={classes.headTitle}>Ads Traffic</div>
          <Box display="flex" alignItems="center" mt={2}>
            <Box component="span" display="flex" alignItems="center" mr={4}>
              <Box component="span" className={clsx(classes.dot, classes.dotPrimary)} mr={1} />
              <Box component="span" color="#E36978" fontSize={12} className={classes.textCapitalize}>
                {adsStatistics.labelBudget}
              </Box>
            </Box>
            <Box component="span" display="flex" alignItems="center">
              <Box component="span" className={clsx(classes.dot, classes.dotSecond)} mr={1} />
              <Box component="span" color="#1CACCE" fontSize={12} className={classes.textCapitalize}>
                {adsStatistics.labelGrowth}
              </Box>
            </Box>
          </Box>
        </CmtCardContent>
        <DataChart chartData={adsStatistics.chartData} />
      </CmtCard>
    </div>
  );
};

export default AdsStatstics;
