import React from 'react';
import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ArrowUpward } from '@material-ui/icons';
import CustomAreaChart from '../../../dashboards/CustomAreaChart';
import { fakeDb } from '../../../../FakeDb/fake-db';

const useStyles = makeStyles((theme) => ({
  titleLbl: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '16px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  infoLblFollower: {
    fontFamily: 'Lato',
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '0.3px',
    color: 'rgba(0, 0, 0, 0.38)',
  },
  infoLbl: {
    fontFamily: 'Lato',
    fontSize: '12px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: 'rgba(0, 0, 0, 0.6)',
  },
}));

const FollowerChart = ({ contentFollowers }) => {
  const classes = useStyles();
  // example json data
  const { adsStatistics } = fakeDb;

  return (
    <CmtCard className="h-full">
      <CmtCardContent>
        <div className="flex flex-row justify-content-between">
          <div className={classes.titleLbl}>Pengikut</div>
          <div className={classes.infoLblFollower}>
            Total Pengikut
            <span className="ml-1" style={{ fontWeight: 'bold', color: 'black' }}>
              {contentFollowers?.totalallfollower}
            </span>
          </div>
        </div>
        <div className="mt-4"></div>
        {/* <div className="mt-6">
          <div className={classes.titleLbl} style={{ color: '#8DCD03', fontSize: 18 }}>
            37 % <ArrowUpward style={{ fontSize: 16 }} />
          </div>
          <div className={classes.infoLbl}>Minggu ini</div>
        </div> */}
      </CmtCardContent>
      <CustomAreaChart chartData={contentFollowers?.datafollower} />
    </CmtCard>
  );
};

export default FollowerChart;
