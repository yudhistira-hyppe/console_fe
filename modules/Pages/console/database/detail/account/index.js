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
import { useGetProfileByUserEmailQuery, useGetUserBasicsQuery } from 'api/user/user';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import { useUserListFriendQuery } from 'api/user/friend';
import ActiveTime from './active-time';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const breadcrumbs = [
  { label: 'Database Akun', link: '/database/account' },
  { label: 'Rincian Akun', isActive: true },
];

const DatabaseDetailAccountComponent = (props) => {
  const { detailId } = props;
  const router = useRouter();
  const { authUser } = useAuth();
  const [accountDetail, setAccountDetail] = useState({});
  const { data: userBasicsRes, isFetching: isFetchingUserBasics } = useGetUserBasicsQuery(detailId);
  const { data: userProfileRes } = useGetProfileByUserEmailQuery(detailId, {
    skip: Object.keys(accountDetail).length === 0,
  });
  const { data: userFriendListRes, isSuccess } = useUserListFriendQuery(detailId, { skip: !userProfileRes });

  useEffect(() => {
    if (!isFetchingUserBasics) {
      if (userBasicsRes && userBasicsRes.data) {
        const { createdAt, dob } = userBasicsRes.data;
        setAccountDetail({ createdAt, dob });
      } else {
        router.replace('/database/account');
      }
    }
  }, [userBasicsRes, isFetchingUserBasics]);

  useEffect(() => {
    if (userProfileRes) {
      setAccountDetail({ ...accountDetail, ...userProfileRes?.data[0] });
    }
  }, [userProfileRes]);

  useEffect(() => {
    if (userFriendListRes) {
      setAccountDetail({
        ...accountDetail,
        insight: { ...accountDetail?.insight, totalFriends: userFriendListRes?.count_friend },
      });
    }
  }, [userFriendListRes]);

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    if (mediaEndpoint) {
      return `${STREAM_URL}${mediaEndpoint}${authToken}`;
    }
    return '';
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
        {isFetchingUserBasics ? (
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
                    src={getMediaUri(accountDetail.avatar)}
                    alt={accountDetail.fullName}
                    phCharLength={2}
                    size={80}
                    color="random"
                  />
                  <Stack justifyContent="center" gap="4px">
                    <Typography variant="h1">{accountDetail.username}</Typography>
                    <Box fontSize={14} color="text.secondary">
                      {accountDetail.fullName}
                    </Box>
                  </Stack>
                </Stack>
                <Insight insight={accountDetail.insight} />
              </Stack>
              <Grid container gap={3}>
                <Grid item xs={12} md={3.5}>
                  <AccountInfo
                    createdAt={accountDetail.createdAt}
                    fullName={accountDetail.fullName}
                    email={accountDetail.email}
                    roles={accountDetail.roles}
                  />
                </Grid>
                <Grid item xs={12} md>
                  <UserInfo accountDetail={accountDetail} />
                </Grid>
              </Grid>
              <Grid container gap={3}>
                <Grid item xs={12} md={3.5}>
                  <Interest interests={accountDetail.interest} />
                </Grid>
                <Grid item xs={12} md>
                  <UserPost email={accountDetail.email} />
                </Grid>
              </Grid>
              <Grid container gap={3}>
                <Grid item xs={12} md={6.5}>
                  <Transaction email={accountDetail.email} />
                </Grid>
                <Grid item xs={12} md>
                  <ActiveTime />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <AdsCampaign email={accountDetail.email} />
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
