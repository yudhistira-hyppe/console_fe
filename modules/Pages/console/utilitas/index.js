import { makeStyles } from '@material-ui/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Interest from './interest';
import MasterBank from './master-bank';
import Setting from './setting';
import CreateMasterBank from './master-bank/create';
import EditMasterBank from './master-bank/edit';
import UtilityAds from './ads';

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
  const [tab, setTab] = useState('');
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (!isEmpty(router.query)) {
      setTab(router.query?.tab);
    } else {
      setTab('interest');
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
        <Tab label="Interest" value="interest" className={classes.tab} />
        <Tab label="Setting" value="setting" className={classes.tab} />
        <Tab label="Bank" value="bank" className={classes.tab} />
        <Tab label="Ads Center" value="ads" className={classes.tab} />
      </TabList>
      <div style={{ marginTop: 30, height: '100%' }}>
        <TabPanel value="interest" style={{ padding: 0, height: '100%' }}>
          <Interest />
        </TabPanel>
        <TabPanel value="setting" style={{ padding: 0, height: '100%' }}>
          <Setting />
        </TabPanel>
        <TabPanel value="bank" style={{ padding: 0, height: '100%' }}>
          {router.query?.create ? (
            <CreateMasterBank />
          ) : router.query?.bankcode ? (
            <EditMasterBank bankcode={router.query?.bankcode} />
          ) : (
            <MasterBank />
          )}
        </TabPanel>
        <TabPanel value="ads" style={{ padding: 0, height: '100%' }}>
          <UtilityAds />
        </TabPanel>
      </div>
    </TabContext>
  );
};

export default UtilitasComponent;
