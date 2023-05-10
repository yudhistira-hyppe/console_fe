import { makeStyles } from '@material-ui/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import InterestComponent from './interest';
import FormEdit from './setting';

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
      </TabList>
      <div style={{ marginTop: 30 }}>
        <TabPanel value="interest" style={{ padding: 0 }}>
          <InterestComponent />
        </TabPanel>
        <TabPanel value="setting" style={{ padding: 0 }}>
          <FormEdit />
        </TabPanel>
      </div>
    </TabContext>
  );
};

export default UtilitasComponent;
