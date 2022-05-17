import React from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { fakeDb } from 'modules/FakeDb/fake-db';
import PerformanceGraph from './PerformanceGraph';

const {performance} = fakeDb;

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: '100%',
    '& .MuiTypography-h4' : {
      paddingBottom: 10,
    },
  }
}));


const Performance = () => {
  const classes = useStyles();

  const getTitle = () => (
    <>
      <Typography component="div" variant="h4">
        Performa
      </Typography>
      <Typography component="div" variant="h3">
        48548
      </Typography>
    </>
  );

  return (
    <CmtCard className={classes.cardRoot}>
    <CmtCardHeader
      title={getTitle()}
      subTitle="Rata-rata konversi"
    />
      <PerformanceGraph performanceData={performance} />
    </CmtCard>
  );
};

export default Performance;
