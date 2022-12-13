import { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PenggunaComp from './tabComponent/Pengguna';
import Position from './tabComponent/Position';
import Divisi from './tabComponent/divisi';
import { useRouter } from 'next/router';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';

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

const Anggota = () => {
  const classes = useStyles();
  const router = useRouter();

  const handleChange = (event, newValue) => {
    router.push(`${router.pathname}?tab=${newValue}`);
  };

  const LabelTab = ({ label }) => {
    return (
      <>
        <Typography
          component={'div'}
          style={{
            letterSpacing: '1px',
            fontSize: '12px',
            fontWeight: '900',
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '22px',
          }}>
          {label}
        </Typography>
      </>
    );
  };

  // add component here
  // note: just change here to add new Tab && component
  const Tabs = [
    {
      label: 'Pengguna',
      value: 'pengguna',
      component: <PenggunaComp />,
    },
    {
      label: 'Jabatan',
      value: 'jabatan',
      component: <Position />,
    },
    {
      label: 'Divisi',
      value: 'divisi',
      component: <Divisi />,
    },
  ];

  return (
    <>
      <TabContext value={router.query.tab === undefined ? 'pengguna' : router.query.tab}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          style={{ marginTop: -20 }}>
          {Tabs.map((tab) => {
            return <Tab label={tab.label} value={tab.value} className={classes.tab} />;
          })}
        </TabList>
        <div style={{ marginTop: '10px' }}>
          {Tabs.map((comp) => {
            return (
              <>
                <TabPanel value={comp.value} style={{ padding: 0 }}>
                  {comp.component}
                </TabPanel>
              </>
            );
          })}
        </div>
      </TabContext>
    </>
  );
};

export default Anggota;
