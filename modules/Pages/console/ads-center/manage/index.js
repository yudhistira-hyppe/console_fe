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
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

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
          {access.map((item) => item?.nameModule).includes('ads_manage_dashboard') && (
            <Tab className={classes.tab} label="Dasbor" value="1" />
          )}
          {access.map((item) => item?.nameModule).includes('ads_manage_list') && (
            <Tab className={classes.tab} label="Iklan" value="2" />
          )}
        </TabList>

        {access.map((item) => item?.nameModule).includes('ads_manage_dashboard') && (
          <TabPanel className={classes.tabPanel} value="1">
            <AdsManageDashboard />
          </TabPanel>
        )}
        {access.map((item) => item?.nameModule).includes('ads_manage_list') && (
          <TabPanel className={classes.tabPanel} value="2">
            <AdsManageTableList />
          </TabPanel>
        )}
      </TabContext>
    </Stack>
  );
};

export default AdsCenterManageComponent;
