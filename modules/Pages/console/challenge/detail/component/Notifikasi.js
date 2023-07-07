import { Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Card, Stack, Tab } from '@mui/material';
import React, { useState } from 'react';
import useStyles from '../../tab/index.style';
import NotifItem from './NotifItem';
import ActivityItem from './ActivityItem';

const NotifikasiComponent = ({ detail }) => {
  const [tab, setTab] = useState('banner');
  const classes = useStyles();

  return (
    <Card sx={{ p: 3, height: 735 }}>
      <Stack direction="column" gap={2} style={{ width: '100%' }}>
        <Typography style={{ fontWeight: 'bold' }}>Pengumuman dan Notifikasi</Typography>

        <TabContext value={tab}>
          <TabList
            onChange={(e, val) => setTab(val)}
            textColor="secondary"
            indicatorColor="secondary"
            style={{ marginTop: -5 }}>
            <Tab className={classes.tab} label="Banner & Pop-Up" value="banner" style={{ padding: '0 0 16px' }} />
            <Tab className={classes.tab} label="Push Notifikasi" value="notif" style={{ padding: '0 0 16px' }} />
            <Tab className={classes.tab} label="Aktifitas Challenge" value="activity" style={{ padding: '0 0 16px' }} />
          </TabList>
          <TabPanel value="banner" style={{ padding: 0, height: '100%', width: '100%' }}>
            <Stack direction="column" gap={2} style={{ height: '100%' }}>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Banner Search</Typography>
              <Avatar
                src={detail?.bannerSearch?.[0]?.image + '?m=' + new Date().getTime()}
                style={{ width: 343, height: 103, border: '1px solid #dddddd' }}
                variant="rounded"
              />
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Pop Up</Typography>
              <Avatar
                src={detail?.popUp?.[0]?.image + '?m=' + new Date().getTime()}
                style={{ width: 326, height: 326, border: '1px solid #dddddd' }}
                variant="rounded"
              />
              <Stack direction="row" gap={1}>
                <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Frekuensi:</Typography>
                <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14 }}>
                  <span style={{ color: '#00000099' }}>1</span> Kali / <span style={{ color: '#00000099' }}>24</span> Jam
                </Typography>
              </Stack>
            </Stack>
          </TabPanel>
          <TabPanel value="notif" style={{ padding: 0, height: '100%', width: '100%' }}>
            <NotifItem listData={detail?.notifikasiPush?.[0]} />
          </TabPanel>
          <TabPanel value="activity" style={{ padding: 0, height: '100%', width: '100%' }}>
            <ActivityItem />
          </TabPanel>
        </TabContext>
      </Stack>
    </Card>
  );
};

export default NotifikasiComponent;
