import React from 'react';
import { Box, Button } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import clsx from 'clsx';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { fakeDb } from '../../../FakeDb/fake-db';
import { Typography } from '@material-ui/core';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import { ExpandMore } from '@material-ui/icons';
import { useUserGetInsightViewQuery } from 'api/user/insight';
import { clearConfigCache } from 'prettier';
import { useAuth } from 'authentication';

const useStyles = makeStyles((theme) => ({
  infoLabel: {
    fontFamily: 'Lato',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  precentageLabel: {
    fontFamily: 'Lato',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
  },
  balanceLabel: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  headTitle: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#202020',
  },
  summaryHistLbl: {
    fontFamily: 'Lato',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#202020',
  },
  borderInBetween: {
    borderTop: '1px solid rgba(0, 0, 0, 0.161741)',
    '&:last-child': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.161741)',
    },
  },
  labelLink: {
    fontFamily: 'Lato',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.4px',
    color: '#AB22AF',
  },
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: '#21C0E8',
    color: theme.palette.common.white,
  },
}));

const DataChart = ({ chartData }) => {
  const classes = useStyles();
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis dataKey="month" hide />
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload[0] ? (
              <Box className={classes.tooltip}>
                Week {data.payload[0].payload.month} : {data.payload[0].payload.growth}
              </Box>
            ) : null;
          }}
        />
        <defs>
          <linearGradient id="color11" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#21C0E8" stopOpacity={0.1} />
            <stop offset="40%" stopColor="#fff" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Area
          dataKey="growth"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#21C0E8"
          fill="url(#color11)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const ProfileStatstics = () => {
  const classes = useStyles();
  const { adsStatistics } = fakeDb;
  const { authUser, isLoadingUser } = useAuth();

  // console.log('adsStatistics:', adsStatistics);

  const todayDate = new Date().toISOString().slice(0, 10);

  const payload = {
    email: authUser.email,
    date: todayDate,
  };

  const { data: insightVisited } = useUserGetInsightViewQuery(payload);

  return (
    <div style={{ height: '250px' }} className="flex-auto">
      <CmtCard className="h-full w-full">
        <CmtCardContent>
          <div className={classes.headTitle}>Profile Visits</div>
          <div className="mt-7">
            <div className={classes.infoLabel}>This Week</div>
            <div className="flex flex-row">
              <div className={classes.balanceLabel}>{insightVisited?.totalnow}</div>
              {/* <div className="ml-1">
                {Number(insightVisited?.value) > 0 ? (
                  <span className={classes.precentageLabel} style={{ color: 'green' }}>
                    {insightVisited?.value}
                  </span>
                ) : (
                  <span className={classes.precentageLabel} style={{ color: 'red' }}>
                    -{insightVisited?.value}
                  </span>
                )}
              </div>
              <div className="ml-1">
                <ExpandMore style={{ fontSize: '20px' }} />
              </div> */}
            </div>
          </div>
        </CmtCardContent>
        <DataChart chartData={adsStatistics.chartData} />
      </CmtCard>
    </div>
  );
};

export default ProfileStatstics;
