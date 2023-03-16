import React from 'react';
import Head from 'next/head';
import { Grid, Stack } from '@mui/material';
import Breadcrumbs from '../../../../help-center/bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';
import router from 'next/router';
import GridContainer from '@jumbo/components/GridContainer';
import FormGIF from './form-gif';
import CardWithDivider from './card-with-divider';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import CardWithIndicator from './card-with-indicator';
import Interest from './interest';

const DetailGIF = ({ kind }) => {
  const breadcrumbs = [
    { label: 'Database GIF', link: { pathname: '/database/sticker', query: { tab: 'gif' } } },
    { label: kind === 'create' ? 'Tambah GIF' : 'Rincian GIF', isActive: true },
  ];

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Create GIF</title>
      </Head>
      <Stack
        direction={'column'}
        spacing={2}
        style={kind !== 'create' ? { marginBottom: 24 } : { width: '70%', margin: '0 auto 24px' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push({ pathname: '/database/sticker', query: { tab: 'gif' } })}
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

      <GridContainer style={kind !== 'create' ? {} : { width: '70%', margin: '0 auto' }}>
        <Grid item xs={12} sm={kind !== 'create' ? 6 : 12} style={kind !== 'create' ? {} : { padding: 0 }}>
          <FormGIF status={kind !== 'create' ? 'detail' : 'create'} data={{}} id={kind} />
        </Grid>
        {kind !== 'create' && (
          <Grid item xs={12} sm={6}>
            <GridContainer>
              <Grid item xs={12} sm={6}>
                <CardWithDivider title="Dicari" value={numberWithCommas(0)} description="Kali" />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <Interest data={[]} />
              </Grid>
            </GridContainer>
          </Grid>
        )}
      </GridContainer>
    </>
  );
};

export default DetailGIF;
