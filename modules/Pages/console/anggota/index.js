import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { makeStyles, Typography } from '@material-ui/core';
import Tab from '@mui/material/Tab';
import PenggunaComp from './tabComponent/Pengguna';
import Position from './tabComponent/Position';
import Divisi from './tabComponent/divisi';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: 'rgb(170, 34, 175)',
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
      <TabContext value={router.query.tab}>
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
                label={<LabelTab label={tab.label} />}
                value={tab.value}
                classes={{
                  root: classes.tabRoot,
                }}
              />
            );
          })}
        </TabList>
        <div style={{ marginTop: '10px' }}>
          {Tabs.map((comp) => {
            return (
              <>
                <TabPanel value={comp.value}>{comp.component}</TabPanel>
              </>
            );
          })}
        </div>
      </TabContext>
    </>
  );
};

export default Anggota;
