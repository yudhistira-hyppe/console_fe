import React, { useState } from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtSearch from '@coremat/CmtSearch';
import Box from '@material-ui/core/Box';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtList from '@coremat/CmtList';
import CampaignCell from './CampaignCell';
import { fakeDb } from 'modules/FakeDb/fake-db';

const {marketingData} = fakeDb;

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    position: 'relative',
    '& .Cmt-card-content': {
      padding: 0,
      paddingBottom: 24,
    },
  },
  scrollbarRoot: {
    height: 305,
  },
  badgeRoot: {
    fontSize: 14,
    letterSpacing: 0.25,
    backgroundColor: alpha(theme.palette.warning.main, 0.15),
    color: theme.palette.warning.main,
    padding: '2px 10px',
    borderRadius: 30,
  },
  searchAction: {
    position: 'relative',
    width: 38,
    height: 38,
  },
  searchActionBar: {
    position: 'absolute',
    right: 0,
    top: 2,
    zIndex: 1,
  },
}));

const MarketingCampaign = () => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        title="Campaign">
        <Box className={classes.searchAction}>
          <Box className={classes.searchActionBar}>
            <CmtSearch onlyIcon border={false} value={searchText} />
          </Box>
        </Box>
      </CmtCardHeader>
      <CmtCardContent>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <CmtList data={marketingData} renderRow={(data, index) => <CampaignCell key={index} data={data} />} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default MarketingCampaign;
