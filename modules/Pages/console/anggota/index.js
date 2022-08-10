import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { makeStyles, Typography } from '@material-ui/core';
import Tab from '@mui/material/Tab';
import PenggunaComp from './tabs/PenggunaComp';
import Group from './tabs/Position';

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: 'rgb(170, 34, 175)',
  },
}));

const Anggota = () => {
  const classes = useStyles();
  const [value, setValue] = useState('pengguna');

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
  return (
    <>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          variant="scrollable"
          classes={{
            indicator: classes.indicator,
          }}>
          <Tab
            label={<LabelTab label="Pengguna" />}
            value="pengguna"
            classes={{
              root: classes.tabRoot,
            }}
          />
          <Tab
            label={<LabelTab label="Jabatan" />}
            value="jabatan"
            classes={{
              root: classes.tabRoot,
            }}
          />
        </TabList>
        <div style={{ marginTop: '10px' }}>
          <TabPanel value="pengguna">
            <PenggunaComp />
          </TabPanel>
          <TabPanel value="jabatan">
            <Group />
          </TabPanel>
        </div>
      </TabContext>
    </>
  );
};

export default Anggota;
