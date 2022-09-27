import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import DatabaseAccountComponent from './account';
import useStyles from './index.style';

const ConsoleDatabaseComponent = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { queryTab } = props;

  const onTabChange = (_, selectedTab) => {
    router.replace({ query: { tab: selectedTab } });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database</title>
      </Head>
      <TabContext value={queryTab}>
        <TabList onChange={onTabChange} textColor="secondary" indicatorColor="secondary">
          <Tab className={classes.tab} label="Akun" value="account" />
          <Tab className={classes.tab} label="Konten" value="content" />
        </TabList>
        <TabPanel className={classes.tabPanel} value="account">
          <DatabaseAccountComponent />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="content" disabled>
          Konten
        </TabPanel>
      </TabContext>
    </>
  );
};

ConsoleDatabaseComponent.propTypes = {
  queryTab: PropTypes.string,
};

export default ConsoleDatabaseComponent;
