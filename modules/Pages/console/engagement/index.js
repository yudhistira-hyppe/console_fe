import React, { useState } from 'react';
import Head from 'next/head';
import Tab from '@mui/material/Tab';
import { useGetLogActivityByYearQuery, useGetUserEventActivityByYearQuery } from 'api/console/engagement';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Metrik from './Tabs/metrik';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  tab: {
    '&.MuiTab-root': {
      minWidth: '60px',
      padding: '8px',
      justifyContent: 'end',
      textTransform: 'capitalize',
      fontSize: '16px',
      fontFamily: 'Lato',
      fontWeight: '700',
      margin: '0 50px 0 0',
    },
  },
  tabPanel: {
    '&.MuiTabPanel-root': {
      padding: '24px 0',
    },
  },
}));

const ConsoleEngagementComponent = () => {
  const [value, setValue] = useState('metrik');
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Engagement Pengguna</title>
      </Head>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          style={{ marginTop: -20 }}>
          <Tab label="Metrik" value="metrik" className={classes.tab} />
          <Tab label="Trend" value="trend" className={classes.tab} />
        </TabList>
        <TabPanel className={classes.tabPanel} value="metrik">
          <Metrik />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="trend">
          <div>trend</div>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ConsoleEngagementComponent;
