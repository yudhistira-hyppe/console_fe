import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab } from '@mui/material';
import useStyles from './index.style';
import AnnouncementTabNotificationComponent from './tab/notification';
import AnnouncementTabBannerComponent from './tab/banner';
import { isEmpty } from 'lodash';
import { Typography } from '@material-ui/core';
import CreateNotificationComponent from './tab/notification/create';
import DetailNotificationComponent from './tab/notification/detail';
import CreateBannerComponent from './tab/banner/create';
import EditBannerComponent from './tab/banner/edit';

const AnnouncementComponent = ({ tab, view, detailId }) => {
  const classes = useStyles();
  const router = useRouter();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const onTabChange = (_, selectedTab) => {
    router.push(`/announcement/${selectedTab}`);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Announcement</title>
      </Head>

      {isEmpty(view) ? (
        <TabContext value={tab}>
          <TabList onChange={onTabChange} textColor="secondary" indicatorColor="secondary" style={{ marginTop: -20 }}>
            {access?.find((item) => item?.nameModule === 'announcement_notif') && (
              <Tab className={classes.tab} label="Push Notifikasi" value="notification" />
            )}
            {access?.find((item) => item?.nameModule === 'announcement_banner') && (
              <Tab className={classes.tab} label="Banner" value="banner" />
            )}
          </TabList>

          {access?.find((item) => item?.nameModule === 'announcement_notif') && (
            <TabPanel className={classes.tabPanel} value="notification">
              <AnnouncementTabNotificationComponent />
            </TabPanel>
          )}
          {access?.find((item) => item?.nameModule === 'announcement_banner') && (
            <TabPanel className={classes.tabPanel} value="banner">
              <AnnouncementTabBannerComponent />
            </TabPanel>
          )}
        </TabContext>
      ) : view === 'create' ? (
        tab === 'notification' ? (
          <CreateNotificationComponent />
        ) : (
          <CreateBannerComponent />
        )
      ) : tab === 'notification' ? (
        <DetailNotificationComponent detailId={detailId} />
      ) : (
        <EditBannerComponent detailId={detailId} />
      )}
    </>
  );
};

AnnouncementComponent.propTypes = {
  tab: PropTypes.string,
};

export default AnnouncementComponent;
