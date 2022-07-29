// react
import React, { useState } from 'react';

// material ui
import { makeStyles, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

// partials components
// note: register your component here to add new tabs
import { Tabs, TabPanelsComponents } from './tabsComponents';

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: 'rgb(170, 34, 175)',
  },
  tabRoot: {
    minHeight: '40px',
    textAlign: 'center',
    fontSize: '0.8em',
    fontWeight: '900',
    letterSpacing: '2px',
  },
}));

const Content = ({}) => {
  // default value tabs
  const [value, setValue] = useState('dashboard');
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* dont do anything with the code below */}
      {/* if you want add new components please open TabsComponents (which imported at the top) */}
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          variant="scrollable"
          classes={{
            indicator: classes.indicator,
          }}>
          {Tabs.map((tab) => {
            return (
              <Tab
                label={tab.label}
                value={tab.value}
                classes={{
                  root: classes.tabRoot,
                }}
              />
            );
          })}
        </TabList>

        {TabPanelsComponents.map((panel) => {
          return <TabPanel value={panel.value}>{panel.component}</TabPanel>;
        })}
      </TabContext>
    </>
  );
};
export default Content;
