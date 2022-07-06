/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import PageHeader from '../../../@jumbo/components/PageComponents/PageHeader';
import ContentDataCard from './ContentDataCard';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { Box, Grid, makeStyles, Tab, Tabs } from '@material-ui/core';
import RegionViews from './RegionViews';
import { useUserContentsManagementQuery } from 'api/user/content/management';
import { useAuth } from 'authentication';
import SpinnerLoading from 'components/common/spinner';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Analytic from './analytic';
import Monetize from './monetize';
import ContentList from './ContentList';
import ContentManagement from './dashboard';

const tabHeight = '40px'; // default: '48px'
const useStyles = makeStyles((theme) => ({
  indicator: {
    // if you want to get it at the top
    // top: '0px',
    maxWidth: '70px',
    marginLeft: '4%',
  },
  tabsRoot: {
    // minHeight: tabHeight,
    // height: tabHeight,
    // border: '1px solid black',
  },
  tabRoot: {
    minHeight: tabHeight,
    height: tabHeight,
    textAlign: 'center',
    fontSize: '0.8em',
    fontWeight: '900',
    margin: '0 -20px',
    letterSpacing: '2px',
  },
}));

const Content = ({}) => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <>
      {/* <PageHeader heading={'Content Management'} /> */}
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          classes={{
            root: classes.tabsRoot,
            indicator: classes.indicator,
          }}>
          <Tab
            label="Dashboard"
            value="1"
            classes={{
              root: classes.tabRoot,
            }}
          />
          <Tab
            label="Konten"
            value="2"
            classes={{
              root: classes.tabRoot,
            }}
          />
          <Tab
            label="Analytic"
            value="3"
            classes={{
              root: classes.tabRoot,
            }}
          />
          <Tab
            label="Monetize"
            value="4"
            classes={{
              root: classes.tabRoot,
            }}
          />
        </TabList>

        <TabPanel value="1">
          <ContentManagement />
        </TabPanel>
        <TabPanel value="2">
          <Analytic />
        </TabPanel>
        <TabPanel value="3">
          <Monetize />
        </TabPanel>
        <TabPanel value="4">
          <ContentList />
        </TabPanel>
      </TabContext>
    </>
  );
};
export default Content;
