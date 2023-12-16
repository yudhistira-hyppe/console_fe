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
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import FormEffect from './form-effect';
import { useGetDetailEffectQuery } from 'api/console/database';

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

const DatabaseDetailEffectComponent = (props) => {
  const { detailId } = props;

  const breadcrumbs = [
    { label: 'Database Efek', link: '/database/effect' },
    { label: detailId === 'create' ? 'Tambah Efek' : 'Rincian Efek', isActive: true },
  ];

  const { data: details, isLoading: loadingDetail } = detailId !== 'create' ? useGetDetailEffectQuery(detailId) : {};

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Create Media</title>
      </Head>
      <Stack
        direction={'column'}
        spacing={2}
        style={detailId !== 'create' ? { marginBottom: 24 } : { width: '70%', margin: '0 auto 24px' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/database/effect')}
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
        <GridContainer style={detailId !== 'create' ? {} : { width: '70%', margin: '0 auto' }}>
          <Grid item xs={12} sm={detailId !== 'create' ? 5 : 12} style={detailId !== 'create' ? {} : { padding: 0 }}>
            <FormEffect status={detailId !== 'create' ? 'detail' : 'create'} data={details?.data?.detail} id={detailId} />
          </Grid>
          {detailId !== 'create' && (
            <Grid item xs={12} sm={7}>
              <GridContainer>
                <Grid item xs={12} sm={4}>
                  <CardWithDivider title="Disimpan" value={numberWithCommas(0)} description="Kali" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CardWithDivider title="Dikunjungi" value={numberWithCommas(0)} description="Kali" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CardWithIndicator title="Digunakan" data={[]} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Jenis Kelamin Audiens" data={[]} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Rentang Umur Audiens" data={[]} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Wilayah Audiens" data={[]} />
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

export default DatabaseDetailEffectComponent;
