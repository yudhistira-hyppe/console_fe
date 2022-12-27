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
import Engagement from './Engagement';
import Comment from './Comment';
import CardWithIndicator from './card-with-indicator';
import Interest from './interest';

const breadcrumbs = [
  { label: 'Boost Post Center', link: '/boost-center' },
  { label: 'Rincian Boost Post', isActive: true },
];

const dummyData = [
  {
    label: '<14 tahun',
    rate: 10,
    value: 10,
  },
  {
    label: '14 - 24 tahun',
    rate: 70,
    value: 70,
  },
  {
    label: '25 - 34 tahun',
    rate: 20,
    value: 20,
  },
  {
    label: '35 - 44 tahun',
    rate: 0,
    value: 0,
  },
  {
    label: 'Indonesia',
    rate: 0,
    value: 0,
  },
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
          <Grid item xs={12} sm={6}>
            <Engagement />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Comment />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CardWithIndicator title="Rentang Umur Penonton" data={dummyData} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CardWithIndicator title="Jenis Kelamin Penonton" data={dummyData} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CardWithIndicator title="Wilayah Penonton" data={dummyData} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Interest />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default DetailBoostCenter;
