import React, { useState } from 'react';
import Head from 'next/head';
import { Stack, Tab } from '@mui/material';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '../../../../../help-center/bantuan-pengguna/BreadCrumb';
import { useRouter } from 'next/router';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useStyles from './index.style';
import TableRewardsParticipant from './tab/participant';
import DetailAdsContentComponent from './tab/content';

const AdsDetailComponent = () => {
  const router = useRouter();
  const classes = useStyles();
  const [tab, setTab] = useState('1');

  const breadcrumbs =
    tab == 1
      ? [
          { label: 'Pusat Iklan', link: { pathname: '/ads-center/manage', query: { tab: 2 } } },
          { label: 'Detail Iklan', isActive: true },
        ]
      : [
          { label: 'Pusat Iklan', link: { pathname: '/ads-center/manage', query: { tab: 2 } } },
          { label: 'Rewards Partisipan', isActive: true },
        ];

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Iklan Detail</title>
      </Head>
      <Stack direction="column">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <TabContext value={tab}>
          <TabList
            onChange={(_, selectedTab) => setTab(selectedTab)}
            textColor="secondary"
            indicatorColor="secondary"
            style={{ margin: '5px 0' }}>
            <Tab className={classes.tab} label="Iklan" value="1" />
            <Tab className={classes.tab} label="Economy Sharing" value="2" />
          </TabList>

          <TabPanel className={classes.tabPanel} value="1">
            <DetailAdsContentComponent idAds={router.query._id} />
          </TabPanel>
          <TabPanel className={classes.tabPanel} value="2">
            <TableRewardsParticipant idAds={router.query._id} />
          </TabPanel>
        </TabContext>
      </Stack>
    </>
  );
};

export default AdsDetailComponent;
