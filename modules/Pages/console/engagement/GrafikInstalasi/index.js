import React, { useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';

import RevenueSummaryGraph from './RevenueSummaryGraph';
import SummaryTabs from './SummaryTabs';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: '100%',
    '@media screen and (min-width: 1280px) and (max-width: 1368px)': {
      '& .Cmt-header-root': {
        flexDirection: 'column',
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& .Cmt-header-root': {
        flexDirection: 'column',
      },
    },
  },
  titleRoot: {
    marginBottom: 4,
  },
  titlePrimary: {
    color: theme.palette.primary.main,
  },
  subTitle: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
}));

const GrafikInstalasi = () => {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader>
        <SummaryTabs tabValue={tabValue} setTabValue={setTabValue} />
      </CmtCardHeader>
      <RevenueSummaryGraph value={tabValue} />
    </CmtCard>
  );
};

export default GrafikInstalasi;
