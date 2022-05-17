import React from 'react';

import { Tabs, Tab } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const tabs = [
  { id: 1, name: 'Jumlah Instalasi', slug: 'instalation_count' },
  { id: 2, name: 'Pengguna Aktif', slug: 'active_user' },
];

const useStyles = makeStyles((theme) => ({
  tabsRoot: {
    position: 'relative',
    minHeight: 10,
    '& .MuiTab-root': {
      maxWidth: 'none',
      minWidth: 10,
      fontSize: 10,
      minHeight: 10,
      letterSpacing: 1.5,
    },
  },
}));

const VisitorTabs = ({ tabValue, setTabValue }) => {
  const classes = useStyles();
  const a11yProps = (index) => {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  };

  return (
    <div>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable auto tabs example"
        className={classes.tabsRoot}>
        {tabs.map((tab, index) => {
          return <Tab key={tab.id} label={tab.name} {...a11yProps(index)} />;
        })}
      </Tabs>
    </div>
  );
};

export default VisitorTabs;
