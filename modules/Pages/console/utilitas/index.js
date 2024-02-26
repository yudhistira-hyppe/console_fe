import { makeStyles } from '@material-ui/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Divider, Stack, Tab } from '@mui/material';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Interest from './interest';
import MasterBank from './master-bank';
import Setting from './setting';
import CreateMasterBank from './master-bank/create';
import EditMasterBank from './master-bank/edit';
import Komunitas from './komunitas';
import JenisChallenge from './jenis-challenge';
import BadgeChallenge from './badge-challenge';
import { Typography } from '@material-ui/core';
import UtilityDatabase from './database';

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: 'rgb(170, 34, 175)',
  },
  tab: {
    '&.MuiTab-root': {
      minWidth: '60px',
      padding: '8px',
      justifyContent: 'end',
      textTransform: 'capitalize',
      fontSize: '16px',
      fontFamily: 'Lato',
      fontWeight: '700',
      marginRight: 50,
    },
  },
}));

const UtilitasComponent = () => {
  const [tab, setTab] = useState('interest');
  const classes = useStyles();
  const router = useRouter();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  useEffect(() => {
    if (!isEmpty(router.query)) {
      setTab(router.query?.tab);
    }
  }, [router]);

  const handleChange = (event, newValue) => {
    router.push(`${router.pathname}?tab=${newValue}`);
    setTab(newValue);
  };

  return (
    <TabContext value={tab}>
      <TabList
        onChange={handleChange}
        aria-label="lab API tabs example"
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        style={{ marginTop: -20 }}>
        {access?.map((item) => item?.nameModule)?.includes('utilitas_interest') && (
          <Tab label="Interest" value="interest" className={classes.tab} />
        )}
        <Tab label="Panduan Komunitas" value="community" className={classes.tab} />
        {access?.map((item) => item?.nameModule)?.includes('utilitas_setting') && (
          <Tab label="Setting" value="setting" className={classes.tab} />
        )}
        {access?.map((item) => item?.nameModule)?.includes('utilitas_bank') && (
          <Tab label="Bank" value="bank" className={classes.tab} />
        )}
        {(access?.map((item) => item?.nameModule)?.includes('utilitas_challenge_jenis') ||
          access?.map((item) => item?.nameModule)?.includes('utilitas_challenge_badge')) && (
          <Tab label="Challenge" value="challenge" className={classes.tab} />
        )}
        <Tab label="Database" value="database" className={classes.tab} />
        {/* <Tab label="Pusat Iklan" value="ads" className={classes.tab} /> */}
      </TabList>
      <div style={{ marginTop: 30, height: '100%' }}>
        {access?.map((item) => item?.nameModule)?.includes('utilitas_interest') && (
          <TabPanel value="interest" style={{ padding: 0, height: '100%' }}>
            <Interest />
          </TabPanel>
        )}
        <TabPanel value="community" style={{ padding: 0, height: '100%' }}>
          <Komunitas />
        </TabPanel>
        {access?.map((item) => item?.nameModule)?.includes('utilitas_setting') && (
          <TabPanel value="setting" style={{ padding: 0, height: '100%' }}>
            <Setting />
          </TabPanel>
        )}
        {access?.map((item) => item?.nameModule)?.includes('utilitas_bank') && (
          <TabPanel value="bank" style={{ padding: 0, height: '100%' }}>
            {router.query?.create ? (
              <CreateMasterBank />
            ) : router.query?.bankcode ? (
              <EditMasterBank bankcode={router.query?.bankcode} />
            ) : (
              <MasterBank />
            )}
          </TabPanel>
        )}
        {(access?.map((item) => item?.nameModule)?.includes('utilitas_challenge_jenis') ||
          access?.map((item) => item?.nameModule)?.includes('utilitas_challenge_badge')) && (
          <TabPanel value="challenge" style={{ padding: 0, height: '100%' }}>
            <Stack direction="column" gap={3}>
              {access?.map((item) => item?.nameModule)?.includes('utilitas_challenge_jenis') && (
                <Stack direction="column" gap={2}>
                  <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Jenis Challenge</Typography>
                  <JenisChallenge />
                </Stack>
              )}

              {access?.map((item) => item?.nameModule)?.includes('utilitas_challenge_jenis') &&
                access?.map((item) => item?.nameModule)?.includes('utilitas_challenge_badge') && <Divider flexItem />}

              {access?.map((item) => item?.nameModule)?.includes('utilitas_challenge_badge') && (
                <Stack direction="column" gap={2}>
                  <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Badge Challenge</Typography>
                  <BadgeChallenge />
                </Stack>
              )}
            </Stack>
          </TabPanel>
        )}
        <TabPanel value="database" style={{ padding: 0, height: '100%' }}>
          <UtilityDatabase />
        </TabPanel>
        {/* <TabPanel value="ads" style={{ padding: 0, height: '100%' }}>
          <UtilityAds />
        </TabPanel> */}
      </div>
    </TabContext>
  );
};

export default UtilitasComponent;
