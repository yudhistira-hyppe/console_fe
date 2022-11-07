import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Typography, Box } from '@material-ui/core';
import { Grid, Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CmtAvatar from '@coremat/CmtAvatar';
import { useRouter } from 'next/router';
import Insight from './insight';
import AccountInfo from './account-info';
import UserInfo from './user-info';
import Interest from './interest';
import UserPost from './user-post';
import Transaction from './transaction';
import { useGetProfileByUserEmailQuery, useGetUserBasicsQuery } from 'api/user/user';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import { useUserListFriendQuery } from 'api/user/friend';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Database Akun Pengguna', link: '/database/account' },
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
      setAccountDetail({ ...accountDetail, ...userProfileRes.data[0] });
    }
  }, [userProfileRes]);

  useEffect(() => {
    if (userFriendListRes) {
      setAccountDetail({
        ...accountDetail,
        insight: { ...accountDetail.insight, totalFriends: userFriendListRes.count_friend },
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
      <PageContainer breadcrumbs={breadcrumbs}>
        {isSuccess && (
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
                <Stack justifyContent="center">
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
              <Grid item xs={12} md={7}>
                <Transaction email={accountDetail.email} />
              </Grid>
            </Grid>
          </Stack>
        )}
      </PageContainer>
    </>
  );
};

DatabaseDetailAccountComponent.propTypes = {
  detailId: PropTypes.string,
};

export default DatabaseDetailAccountComponent;
