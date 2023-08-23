import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab } from '@mui/material';
import useStyles from './index.style';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import AnnouncementTabNotificationComponent from './tab/notification';

const AnnouncementComponent = () => {
  const classes = useStyles();
  const router = useRouter();
  const [tab, setTab] = useState('notification');

  const onTabChange = (_, selectedTab) => {
    setTab(selectedTab);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Announcement</title>
      </Head>
      <TabContext value={tab}>
        <TabList onChange={onTabChange} textColor="secondary" indicatorColor="secondary" style={{ marginTop: -20 }}>
          <Tab className={classes.tab} label="Push Notifikasi" value="notification" />
          <Tab className={classes.tab} label="Banner" value="banner" />
        </TabList>

        <TabPanel className={classes.tabPanel} value="notification">
          <AnnouncementTabNotificationComponent />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="banner">
          <Typography>Banner page</Typography>
        </TabPanel>
      </TabContext>
    </>
  );
};

AnnouncementComponent.propTypes = {
  tab: PropTypes.string,
};

export default AnnouncementComponent;
