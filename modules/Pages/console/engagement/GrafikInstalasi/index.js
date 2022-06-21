import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import SummaryGraph from './SummaryGraph';
import SummaryTabs from './SummaryTabs';
import { useGetUserActivityByYearQuery } from 'api/console/engagement';
import { getMonthName } from 'helpers/stringHelper';

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
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const { data: activeUsersOneYear } = useGetUserActivityByYearQuery(currentYear);
  const [tabValue, setTabValue] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [graphAreaKey, setGraphAreaKey] = useState('');
  const [graphXAxisKey, setGraphXAxisKey] = useState('');

  useEffect(() => {
    switch (tabValue) {
      case 0:
        setGraphData([]);
        break;
      case 1:
        if (activeUsersOneYear) {
          setGraphData(
            activeUsersOneYear.map((item) => ({
              ...item,
              month_name: getMonthName(item.month, 'short'),
            })),
          );
          setGraphAreaKey('count_user');
          setGraphXAxisKey('month_name');
        }
        break;
      default:
        break;
    }
  }, [tabValue, activeUsersOneYear]);

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader>
        <SummaryTabs tabValue={tabValue} setTabValue={setTabValue} />
      </CmtCardHeader>
      <SummaryGraph graphData={graphData} graphAreaKey={graphAreaKey} graphXAxisKey={graphXAxisKey} />
    </CmtCard>
  );
};

export default GrafikInstalasi;
