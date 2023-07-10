import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { Stack, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useStyles from './index.style';
import AdsManageDashboard from './tab/dashboard';

const AdsCenterManageComponent = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('1');

  return (
    <Stack direction="column">
      <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Kelola Advertiser</Typography>
      <TabContext value={tab}>
        <TabList
          onChange={(_, selectedTab) => setTab(selectedTab)}
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
          <Typography>Iklan</Typography>
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default AdsCenterManageComponent;
