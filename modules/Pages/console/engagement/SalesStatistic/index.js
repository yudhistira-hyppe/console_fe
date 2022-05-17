import React from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import SalesStatisticGraph from './SalesStatisticGraph';
import useStyles from './SalesStatistic.style';

const SalesStatistic = () => {
  const classes = useStyles();
  return (
    <CmtCard className={classes.cardRoot}>
    <CmtCardHeader
      title="Sales Statistic"
    />
      <SalesStatisticGraph />
    </CmtCard>
  );
};

export default SalesStatistic;
