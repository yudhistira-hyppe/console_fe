import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { Stack, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useStyles from './index.style';
import AdsSettingDashboard from './tab/dashboard';
import AdsSettingPengaturan from './tab/pengaturan';

const AdsCenterSettingComponent = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('1');
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  return (
    <Stack direction="column">
      <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Pengaturan Iklan</Typography>
      <TabContext value={tab}>
        <TabList
          onChange={(_, selectedTab) => setTab(selectedTab)}
          textColor="secondary"
          indicatorColor="secondary"
          style={{ margin: '5px 0' }}>
          {access.map((item) => item?.nameModule).includes('ads_setting_dashboard') && (
            <Tab className={classes.tab} label="Dasbor" value="1" />
          )}
          {access.map((item) => item?.nameModule).includes('ads_setting_list') && (
            <Tab className={classes.tab} label="Pengaturan" value="2" />
          )}
        </TabList>

        {access.map((item) => item?.nameModule).includes('ads_setting_dashboard') && (
          <TabPanel className={classes.tabPanel} value="1">
            <AdsSettingDashboard />
          </TabPanel>
        )}
        {access.map((item) => item?.nameModule).includes('ads_setting_list') && (
          <TabPanel className={classes.tabPanel} value="2">
            <AdsSettingPengaturan />
          </TabPanel>
        )}
      </TabContext>
    </Stack>
  );
};

export default AdsCenterSettingComponent;
