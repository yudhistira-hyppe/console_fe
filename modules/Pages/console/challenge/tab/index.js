import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import useStyles from './index.style';
import Cookies from 'js-cookie';
import { Typography } from '@material-ui/core';
import ChallengeTabMainComponent from './main';
import ChallengeTabOtherComponent from './other';
import ChallengeTabDraftComponent from './draft';

const ChallengeTabComponent = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { tab } = props;
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const onTabChange = (_, selectedTab) => {
    router.replace(`/challenge/${selectedTab}`);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database</title>
      </Head>
      <TabContext value={tab}>
        <TabList onChange={onTabChange} textColor="secondary" indicatorColor="secondary" style={{ marginTop: -20 }}>
          {access.map((item) => item?.nameModule) && <Tab className={classes.tab} label="Challenge Utama" value="main" />}
          {access.map((item) => item?.nameModule) && <Tab className={classes.tab} label="Challenge Lainnya" value="other" />}
          {access.map((item) => item?.nameModule) && <Tab className={classes.tab} label="Draft" value="draft" />}
        </TabList>
        {access.map((item) => item?.nameModule) && (
          <TabPanel className={classes.tabPanel} value="main">
            <ChallengeTabMainComponent />
          </TabPanel>
        )}
        {access.map((item) => item?.nameModule) && (
          <TabPanel className={classes.tabPanel} value="other">
            <ChallengeTabOtherComponent />
          </TabPanel>
        )}
        {access.map((item) => item?.nameModule) && (
          <TabPanel className={classes.tabPanel} value="draft">
            <ChallengeTabDraftComponent />
          </TabPanel>
        )}
      </TabContext>
    </>
  );
};

ChallengeTabComponent.propTypes = {
  tab: PropTypes.string,
};

export default ChallengeTabComponent;
