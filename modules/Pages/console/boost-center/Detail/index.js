import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Breadcrumbs from '../../help-center/bantuan-pengguna/BreadCrumb';
import { Grid, Stack } from '@mui/material';
import router from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PostDetail from './post-detail';
import PostStatus from './post-status';

const breadcrumbs = [
  { label: 'Boost Post Center', link: '/boost-center' },
  { label: 'Rincian Boost Post', isActive: true },
];

const DetailBoostCenter = () => {
  return (
    <>
      <Head>
        <title key="title">Hyppe Console :: Rincian Boost</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/boost-center')}
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
        <GridContainer>
          <Grid item xs={12} sm={4}>
            <PostDetail />
          </Grid>
          <Grid item xs={12} sm={8}>
            <PostStatus />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default DetailBoostCenter;
