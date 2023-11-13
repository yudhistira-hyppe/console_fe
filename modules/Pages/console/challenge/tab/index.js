import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab } from '@mui/material';
import useStyles from './index.style';
import Cookies from 'js-cookie';
import { Typography } from '@material-ui/core';
import ChallengeTabMainComponent from './main';
import ChallengeTabDraftComponent from './draft';
import { useDispatch, useSelector } from 'react-redux';
import { clearParams } from 'redux/slice/filterParams';

const ChallengeTabComponent = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { tab, jenis = [] } = props;
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
  const dataParams = useSelector((state) => state.filterParams.value);
  const dispatch = useDispatch();

  const onTabChange = (_, selectedTab) => {
    router.replace(`/challenge/${selectedTab}`);
    dispatch(clearParams({ pathname: dataParams?.pathname }));
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database</title>
      </Head>
      <TabContext value={tab}>
        <TabList onChange={onTabChange} textColor="secondary" indicatorColor="secondary" style={{ marginTop: -20 }}>
          {jenis?.map((item, key) => (
            <Tab key={key} className={classes.tab} label={item?.name} value={item?.name} />
          ))}
          <Tab className={classes.tab} label="Draft" value="draft" />
        </TabList>

        {jenis?.map((item, key) => (
          <TabPanel key={key} className={classes.tabPanel} value={item?.name}>
            <ChallengeTabMainComponent kind={item?._id} />
          </TabPanel>
        ))}
        <TabPanel className={classes.tabPanel} value="draft">
          <ChallengeTabDraftComponent />
        </TabPanel>
      </TabContext>
    </>
  );
};

ChallengeTabComponent.propTypes = {
  tab: PropTypes.string,
};

export default ChallengeTabComponent;
