import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Typography, Box, makeStyles } from '@material-ui/core';
import { Card, Grid, Stack, Tab } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Breadcrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import CmtAvatar from '@coremat/CmtAvatar';
import { useRouter } from 'next/router';
import Insight from './insight';
import AccountInfo from './account-info';
import UserInfo from './user-info';
import Interest from './interest';
import UserPost from './user-post';
import Transaction from './transaction';
import AdsCampaign from './ads-campaign';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { useGetuserDatabaseDetailQuery } from 'api/console/database';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { CheckCircle } from '@material-ui/icons';
import UserBankInfo from './user-bank-info';
import InvitationInfo from './invitation-info';
import ReferralInfo from './referral-info';
import ProfileVisit from './profile-visit';
import ActivityPostPic from './post-activity/pic';
import ActivityPostVid from './post-activity/vid';
import ActivityPostDiary from './post-activity/diary';
import TimeSpent from './time-spent';

const breadcrumbs = [
  { label: 'Database Akun', link: '/database/account' },
  { label: 'Rincian Akun', isActive: true },
];

const useStyles = makeStyles(() => ({
  tab: {
    '&.MuiTab-root': {
      minWidth: '60px',
      padding: '8px',
      justifyContent: 'end',
      textTransform: 'capitalize',
      fontSize: '16px',
      fontFamily: 'Lato',
      fontWeight: '700',
      marginRight: 35,
      paddingBottom: 12,

      '&.Mui-selected': {
        color: '#BE31BC',
      },
    },
  },
  tabPanel: {
    '&.MuiTabPanel-root': {
      padding: '28px 0',
    },
  },
}));

const DatabaseDetailAccountComponent = (props) => {
  const { detailId } = props;
  const { authUser } = useAuth();
  const [tab, setTab] = useState('1');
  const router = useRouter();
  const classes = useStyles();
  const { data: userFriendListRes, isLoading } = useGetuserDatabaseDetailQuery(detailId);

  useEffect(() => {
    setTab(router.query?.tab ? router.query?.tab : '1');
  }, [router]);

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  const onTabChange = (_, selectedTab) => {
    setTab(selectedTab);
    router.replace({ pathname: `/database/${router.query?.slug[0]}/${router.query?.slug[1]}`, query: { tab: selectedTab } });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Rincian Akun</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/database/account')}
          gap="5px"
          style={{ width: 'fit-content', cursor: 'pointer' }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
          </Stack>
          <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
            Kembali
          </Typography>
        </Stack>
      </Stack>

      <TabContext value={tab}>
        <TabList onChange={onTabChange} sx={{ '& .MuiTabs-indicator': { backgroundColor: '#BE31BC' } }}>
          <Tab className={classes.tab} label="Info" value="1" />
          <Tab className={classes.tab} label="Aktifitas" value="2" />
          <Tab className={classes.tab} label="Postingan & Monetisasi" value="3" />
        </TabList>

        <TabPanel className={classes.tabPanel} value="1">
          {isLoading ? (
            <PageLoader />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Stack direction="column" gap={2}>
                  <Card style={{ padding: '36px 20px' }}>
                    <Stack direction="column" gap={3}>
                      <Stack direction="row" gap={2}>
                        <Box style={{ position: 'relative' }}>
                          <CmtAvatar
                            src={getMediaUri(userFriendListRes?.[0]?.avatar?.mediaEndpoint)}
                            alt={userFriendListRes?.[0]?.username}
                            style={{ borderRadius: 18, width: 56, height: 56, border: '0.5px solid #0000001F' }}
                          />

                          {userFriendListRes?.[0]?.statusUser !== 'BASIC' && (
                            <CheckCircle
                              style={{
                                color: '#BE31BC',
                                backgroundColor: 'white',
                                fontSize: 16,
                                borderRadius: 30,
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                              }}
                            />
                          )}
                        </Box>

                        <Stack direction="column" justifyContent="center">
                          <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {userFriendListRes?.[0]?.username}
                          </Typography>
                          <Box fontSize={14} color="text.secondary">
                            {userFriendListRes?.[0]?.email}
                          </Box>
                        </Stack>
                      </Stack>

                      <Insight insight={userFriendListRes?.[0]?.insights} friends={userFriendListRes?.[0]?.friend} />
                    </Stack>
                  </Card>

                  <AccountInfo data={userFriendListRes?.[0]} />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="column" gap={2}>
                  <UserInfo accountDetail={userFriendListRes?.[0]} />

                  <UserBankInfo accountDetail={userFriendListRes?.[0]} />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack direction="column" gap={2}>
                  <Interest interests={userFriendListRes?.[0]?.interests} />

                  <InvitationInfo />

                  <ReferralInfo />
                </Stack>
              </Grid>
            </Grid>
          )}
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="2">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <ProfileVisit />
            </Grid>
            <Grid item xs={12} md={3}>
              <ActivityPostPic />
            </Grid>
            <Grid item xs={12} md={3}>
              <ActivityPostVid />
            </Grid>
            <Grid item xs={12} md={3}>
              <ActivityPostDiary />
            </Grid>
            <Grid item xs={12}>
              <TimeSpent />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="3">
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <UserPost idUser={detailId} />
            </Grid>
            <Grid item xs={4}>
              <Transaction email={userFriendListRes?.[0]?.email} />
            </Grid>
            <Grid item xs={12}>
              <AdsCampaign email={userFriendListRes?.[0]?.email} />
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </>
  );
};

DatabaseDetailAccountComponent.propTypes = {
  detailId: PropTypes.string,
};

export default DatabaseDetailAccountComponent;
