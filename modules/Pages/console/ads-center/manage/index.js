import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { Stack, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useStyles from './index.style';
import AdsManageDashboard from './tab/dashboard';
import AdsManageTableList from './tab/iklan';
import Router from 'next/router';

const AdsCenterManageComponent = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('1');

  useEffect(() => {
    if (Router.query?.tab) {
      setTab(Router.query?.tab);
    } else {
      setTab('1');
    }
  }, [Router]);

  return (
    <Stack direction="column">
      <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Kelola Advertiser</Typography>
      <TabContext value={tab}>
        <TabList
          onChange={(_, selectedTab) => {
            setTab(selectedTab);
            Router.replace({ pathname: '/ads-center/manage', query: { tab: selectedTab } });
          }}
          textColor="secondary"
          indicatorColor="secondary"
          style={{ margin: '5px 0' }}>
          <Tab className={classes.tab} label="Dasbor" value="1" />
          <Tab className={classes.tab} label="Iklan" value="2" />
        </TabList>

        <TabPanel className={classes.tabPanel} value="1">
          <AdsManageDashboard />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="2">
          <AdsManageTableList />
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default AdsCenterManageComponent;
