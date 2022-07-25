/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { makeStyles, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Analytic from './analytic';
import Monetize from './monetize';
import ContentList from './ContentList';
import ContentManagement from './dashboard';

const useStyles = makeStyles((theme) => ({
  indicator: {
    // if you want to get it at the top
    // top: '0px',
    // maxWidth: '70px',
    // marginLeft: '4%',
    // color: 'blue !important',
    backgroundColor: 'rgb(170, 34, 175)',
    // border: '2px solid black',
  },
  tabsRoot: {
    // minHeight: tabHeight,
    // height: tabHeight,
    // border: '1px solid black',
  },
  tabRoot: {
    minHeight: '40px',
    // height: '40px',
    // maxWidth: '30px',
    textAlign: 'center',
    fontSize: '0.8em',
    fontWeight: '900',
    // padding: '0 -20px',
    letterSpacing: '2px',
    // border: '1px solid black',
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
      {/* tab content is depends on value */}
      {/*NOTED: if this getting bigger need to refactor  */}
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          variant="scrollable"
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

        {/* values contents depens on the top  */}
        <TabPanel value="1">
          <ContentManagement />
        </TabPanel>
        <TabPanel value="2">
          <ContentList />
        </TabPanel>
        <TabPanel value="3">
          <Analytic />
        </TabPanel>
        <TabPanel value="4">
          <Monetize />
        </TabPanel>
      </TabContext>
    </>
  );
};
export default Content;
