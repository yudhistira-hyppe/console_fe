import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { Stack, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useStyles from './index.style';
import AdsSettingDashboard from './tab/dashboard';

const AdsCenterSettingComponent = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('1');

  return (
    <Stack direction="column">
      <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Pengaturan Iklan</Typography>
      <TabContext value={tab}>
        <TabList
          onChange={(_, selectedTab) => setTab(selectedTab)}
          textColor="secondary"
          indicatorColor="secondary"
          style={{ margin: '5px 0' }}>
          <Tab className={classes.tab} label="Dasbor" value="1" />
          <Tab className={classes.tab} label="Pengaturan" value="2" />
        </TabList>

        <TabPanel className={classes.tabPanel} value="1">
          <AdsSettingDashboard />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="2">
          <Typography>pengaturan</Typography>
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default AdsCenterSettingComponent;
