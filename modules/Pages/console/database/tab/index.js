import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import DatabaseTabAccountComponent from './account';
import DatabaseTabContentComponent from './content';
import DatabaseTabMediaComponent from './media';
import useStyles from './index.style';
import Cookies from 'js-cookie';
import DatabaseTabEffectComponent from './effect';
import DatabaseTabStickerComponent from './sticker';

const DatabaseTabComponent = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { tab } = props;
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const onTabChange = (_, selectedTab) => {
    router.replace(`/database/${selectedTab}`);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database</title>
      </Head>
      <TabContext value={tab}>
        <TabList onChange={onTabChange} textColor="secondary" indicatorColor="secondary" style={{ marginTop: -20 }}>
          {access.map((item) => item?.nameModule).includes('database_account') && (
            <Tab className={classes.tab} label="Akun" value="account" />
          )}
          {access.map((item) => item?.nameModule).includes('database_content') && (
            <Tab className={classes.tab} label="Konten" value="content" />
          )}
          {access.map((item) => item?.nameModule).includes('database_music') && (
            <Tab className={classes.tab} label="Musik" value="music" />
          )}
          <Tab className={classes.tab} label="Efek" value="effect" />
          <Tab className={classes.tab} label="Stiker" value="sticker" />
        </TabList>
        {access.map((item) => item?.nameModule).includes('database_account') && (
          <TabPanel className={classes.tabPanel} value="account">
            <DatabaseTabAccountComponent />
          </TabPanel>
        )}
        {access.map((item) => item?.nameModule).includes('database_content') && (
          <TabPanel className={classes.tabPanel} value="content">
            <DatabaseTabContentComponent />
          </TabPanel>
        )}
        {access.map((item) => item?.nameModule).includes('database_music') && (
          <TabPanel className={classes.tabPanel} value="music">
            <DatabaseTabMediaComponent />
          </TabPanel>
        )}
        <TabPanel className={classes.tabPanel} value="effect">
          <DatabaseTabEffectComponent />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="sticker">
          <DatabaseTabStickerComponent />
        </TabPanel>
      </TabContext>
    </>
  );
};

DatabaseTabComponent.propTypes = {
  tab: PropTypes.string,
};

export default DatabaseTabComponent;
