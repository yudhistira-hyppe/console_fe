import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Typography, Box } from '@material-ui/core';
import { Grid, Stack } from '@mui/material';
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
import { useUserListFriendQuery } from 'api/user/friend';
import ActiveTime from './active-time';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { useGetuserDatabaseDetailQuery } from 'api/console/database';

const breadcrumbs = [
  { label: 'Database Akun', link: '/database/account' },
  { label: 'Rincian Akun', isActive: true },
];

const DatabaseDetailAccountComponent = (props) => {
  const { detailId } = props;
  const { authUser } = useAuth();
  const router = useRouter();
  const { data: userFriendListRes, isSuccess, isLoading } = useGetuserDatabaseDetailQuery(detailId);

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
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

      <PageContainer>
        {isLoading ? (
          <PageLoader />
        ) : (
          isSuccess && (
            <Stack spacing={3}>
              <Stack
                gap={3}
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                justifyContent={{ sm: 'space-between' }}>
                <Stack direction="row" spacing={3}>
                  <CmtAvatar
                    src={getMediaUri(userFriendListRes?.[0]?.avatar?.mediaEndpoint)}
                    alt={userFriendListRes?.[0]?.fullName}
                    phCharLength={2}
                    size={80}
                    color="random"
                  />
                  <Stack justifyContent="center" gap="4px">
                    <Typography variant="h1">{userFriendListRes?.[0]?.username}</Typography>
                    <Box fontSize={14} color="text.secondary">
                      {userFriendListRes?.[0]?.fullName}
                    </Box>
                  </Stack>
                </Stack>
                <Insight insight={userFriendListRes?.[0]?.insights} friends={userFriendListRes?.[0]?.friend} />
              </Stack>
              <Grid container gap={3}>
                <Grid item xs={12} md={3.5}>
                  <AccountInfo
                    createdAt={userFriendListRes?.[0]?.createdAt}
                    fullName={userFriendListRes?.[0]?.fullName || '-'}
                    email={userFriendListRes?.[0]?.email || '-'}
                    roles={userFriendListRes?.[0]?.statusUser || '-'}
                  />
                </Grid>
                <Grid item xs={12} md>
                  <UserInfo accountDetail={userFriendListRes?.[0]} />
                </Grid>
              </Grid>
              <Grid container gap={3}>
                <Grid item xs={12} md={3.5}>
                  <Interest interests={userFriendListRes?.[0]?.interests} />
                </Grid>
                <Grid item xs={12} md>
                  <UserPost username={userFriendListRes?.[0]?.username} />
                </Grid>
              </Grid>
              <Grid container gap={3}>
                <Grid item xs={12} md={6.5}>
                  <Transaction email={userFriendListRes?.[0]?.email} />
                </Grid>
                <Grid item xs={12} md>
                  <ActiveTime />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <AdsCampaign email={userFriendListRes?.[0]?.email} />
                </Grid>
              </Grid>
            </Stack>
          )
        )}
      </PageContainer>
    </>
  );
};

DatabaseDetailAccountComponent.propTypes = {
  detailId: PropTypes.string,
};

export default DatabaseDetailAccountComponent;
