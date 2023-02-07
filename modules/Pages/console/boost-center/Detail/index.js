import React, { useState } from 'react';
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
import moment from 'moment';
import { useGetDetailBoostPostQuery } from 'api/console/boost';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

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
  const [payload, setPayload] = useState({
    postID: router.query?._id,
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
    page: 0,
    limit: 0,
  });

  const { data: detailBoost, isLoading: loadingDetail } = useGetDetailBoostPostQuery(payload);

  const dataWilayah = () => {
    let data = [];
    const countWilayah = detailBoost?.data[0]?.wilayah?.map((item) => item.count).reduce((a, b) => a + b);

    if (countWilayah < detailBoost?.data[0]?.total) {
      for (let i = 0; i < detailBoost?.data[0]?.wilayah?.length; i++) {
        data.push({
          _id: detailBoost?.data[0]?.wilayah[i]?._id,
          count: detailBoost?.data[0]?.wilayah[i]?.count,
          persen: Number((detailBoost?.data[0]?.wilayah[i]?.count / detailBoost?.data[0]?.total) * 100).toFixed(2),
        });
      }
      data.push({
        _id: 'Lainnya',
        count: detailBoost?.data[0]?.total - countWilayah,
        persen: Number((countWilayah / detailBoost?.data[0]?.total) * 100).toFixed(2),
      });
    }

    return data;
  };

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
        {loadingDetail ? (
          <PageLoader />
        ) : (
          <GridContainer>
            <Grid item xs={12} sm={4}>
              <PostDetail data={detailBoost?.data?.[0]?.data?.[0]} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <PostStatus data={detailBoost?.data?.[0]?.data?.[0]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Engagement
                view={detailBoost?.data?.[0]?.data?.[0]?.jangkauan}
                like={detailBoost?.data?.[0]?.data?.[0]?.likes}
                comment={detailBoost?.data?.[0]?.data?.[0]?.comments}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Comment data={detailBoost?.data?.[0]?.komentar} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CardWithIndicator title="Rentang Umur Penonton" data={detailBoost?.data?.[0]?.age} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CardWithIndicator title="Jenis Kelamin Penonton" data={detailBoost?.data?.[0]?.gender} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CardWithIndicator title="Wilayah Penonton" data={dataWilayah()} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Interest data={detailBoost?.data?.[0]?.data?.[0]?.kategori} />
            </Grid>
          </GridContainer>
        )}
      </PageContainer>
    </>
  );
};

export default DetailBoostCenter;
