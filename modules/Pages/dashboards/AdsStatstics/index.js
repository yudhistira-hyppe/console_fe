import React from 'react';
import { Box } from '@material-ui/core';
import CmtCard from '../../../../@coremat/CmtCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import clsx from 'clsx';
import { Area, AreaChart,Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { fakeDb } from '../../../FakeDb/fake-db';

const useStyles = makeStyles((theme) => ({
  dot: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    backgroundColor: '#1CACCE',
  },
  dotPrimary: {
    backgroundColor: '#E36978',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
}));

const DataChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={170}>
      <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis dataKey="month" hide />
        <Tooltip labelStyle={{ color: 'black' }} cursor={false} />
        <Line dataKey="growth" strokeWidth={2} stroke="#1CACCE" dot={{ stroke: '#1CACCE', strokeWidth: 1 }} />
        <Line dataKey="budget" strokeWidth={2} stroke="#E36978" dot={{ stroke: '#E36978', strokeWidth: 1 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const AdsStatstics = () => {
  const classes = useStyles();
  const { adsStatistics } = fakeDb;

  return (
    <CmtCard>
      <CmtCardHeader
        title="Ads Statstics"
        subTitle={
          <Box display="flex" alignItems="center" mt={2}>
            <Box component="span" display="flex" alignItems="center" mr={4}>
              <Box component="span" className={clsx(classes.dot, classes.dotPrimary)} mr={1} />
              <Box component="span" color="#E36978" fontSize={12} className={classes.textCapitalize}>
                {adsStatistics.labelBudget}
              </Box>
            </Box>
            <Box component="span" display="flex" alignItems="center">
              <Box component="span" className={classes.dot} mr={1} />
              <Box component="span" color="#1CACCE" fontSize={12} className={classes.textCapitalize}>
                {adsStatistics.labelGrowth}
              </Box>
            </Box>
          </Box>
        }
      />
      <DataChart chartData={adsStatistics.chartData} />
    </CmtCard>
  );
};

export default AdsStatstics;
