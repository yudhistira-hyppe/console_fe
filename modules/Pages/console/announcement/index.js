import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab } from '@mui/material';
import useStyles from './index.style';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import AnnouncementTabNotificationComponent from './tab/notification';
import AnnouncementTabBannerComponent from './tab/banner';

const AnnouncementComponent = () => {
  const classes = useStyles();
  const router = useRouter();
  const [tab, setTab] = useState('notification');

  const onTabChange = (_, selectedTab) => {
    setTab(selectedTab);
    router.push({ pathname: router.pathname, query: { tab: selectedTab } });
  };

  useEffect(() => {
    if (router?.query?.tab) {
      setTab(router?.query?.tab);
    } else {
      setTab('notification');
    }
  }, [router]);

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
          <AnnouncementTabBannerComponent />
        </TabPanel>
      </TabContext>
    </>
  );
};

AnnouncementComponent.propTypes = {
  tab: PropTypes.string,
};

export default AnnouncementComponent;
