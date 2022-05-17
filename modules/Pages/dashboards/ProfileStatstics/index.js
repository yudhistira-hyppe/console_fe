import React from 'react';
import { Box } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import clsx from 'clsx';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { fakeDb } from '../../../FakeDb/fake-db';
import { Typography } from '@material-ui/core';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

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
  subTitle: {
    color: theme.palette.text.secondary,
  },
  textError: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.error.main,
    marginLeft: 8,
    marginTop: 4,
    fontWeight: theme.typography.fontWeightRegular,
  },
  graphRoot: {
    margin: '-40px 0px 0px 0px',
  },
}));

const DataChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={170}>
      <LineChart data={chartData} margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
        <XAxis dataKey="month" hide />
        <Tooltip labelStyle={{ color: 'black' }} cursor={false} />
        <Line dataKey="growth" strokeWidth={2} stroke="#F39711" dot={{ stroke: '#F39711', strokeWidth: 1 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ProfileStatstics = () => {
  const classes = useStyles();
  const { adsStatistics } = fakeDb;

  return (
    <CmtCard>
      <CmtCardHeader
        title="Profile Visits"
        subTitle={
          <div className="mb-0" style={{ marginTop: 0, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography component="div" variant="h4">
              242
            </Typography>
            <Typography component="span" variant="h4" className={classes.textError}>
              -8%
              <TrendingDownIcon fontSize="small" />
            </Typography>
          </div>
        }
      />
       <DataChart chartData={adsStatistics.chartData}   />
    </CmtCard>
  );
};

export default ProfileStatstics;
