import React from 'react';
import { Typography } from '@material-ui/core';
import { Grid, Stack } from '@mui/material';
import Head from 'next/head';
import router from 'next/router';
import Breadcrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import GridContainer from '@jumbo/components/GridContainer';
import CardWithDivider from './card-with-divider';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import CardWithIndicator from './card-with-indicator';
import Interest from './interest';
import FormMusic from './form-music';
import { useGetDetailMusicQuery } from 'api/console/database/media';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

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

const DatabaseDetailMediaComponent = (props) => {
  const { detailId } = props;

  const breadcrumbs = [
    { label: 'Database Musik', link: '/database/music' },
    { label: detailId === 'create' ? 'Tambah Musik' : 'Rincian Musik', isActive: true },
  ];

  const { data: detailMusic, isFetching: loadingDetail } = detailId !== 'create' ? useGetDetailMusicQuery(detailId) : {};

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Create Media</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/database/music')}
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

      {loadingDetail ? (
        <PageLoader />
      ) : (
        <GridContainer>
          <Grid item xs={12} sm={detailId !== 'create' ? 6 : 12}>
            <FormMusic status={detailId !== 'create' ? 'detail' : 'create'} data={detailMusic?.data[0]} id={detailId} />
          </Grid>
          {detailId !== 'create' && (
            <Grid item xs={12} sm={6}>
              <GridContainer>
                <Grid item xs={12} sm={6}>
                  <CardWithDivider
                    title="Dilihat"
                    value={numberWithCommas(detailMusic?.data[0]?.view || 0)}
                    description="Kali"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithDivider
                    title="Digunakan"
                    value={numberWithCommas(detailMusic?.data[0]?.used || 0)}
                    description="Kali"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Jenis Kelamin Penonton" data={detailMusic?.data[0]?.gender} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Rentang Umur Penonton" data={detailMusic?.data[0]?.age} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Wilayah Penonton" data={detailMusic?.data[0]?.wilayah} />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <Interest data={[]} />
                </Grid> */}
              </GridContainer>
            </Grid>
          )}
        </GridContainer>
      )}
    </>
  );
};

export default DatabaseDetailMediaComponent;
