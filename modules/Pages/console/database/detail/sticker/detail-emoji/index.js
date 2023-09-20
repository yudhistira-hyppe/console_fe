import React from 'react';
import Head from 'next/head';
import { Grid, Stack } from '@mui/material';
import Breadcrumbs from '../../../../help-center/bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';
import router from 'next/router';
import GridContainer from '@jumbo/components/GridContainer';
import FormEmoji from './form-emoji';
import CardWithDivider from './card-with-divider';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import CardWithIndicator from './card-with-indicator';
import Interest from './interest';
import { useGetDetailStickerQuery, useGetStickerChartQuery } from 'api/console/database';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const DetailEmoji = ({ kind, idEmoji }) => {
  const breadcrumbs = [
    { label: 'Database Emoji', link: { pathname: '/database/sticker', query: { tab: 'emoji' } } },
    { label: kind === 'create' ? 'Tambah Emoji' : 'Rincian Emoji', isActive: true },
  ];
  const { data: detail, isLoading: loadingSticker } = useGetDetailStickerQuery(idEmoji);
  const { data: chart, isLoading: loadingChart } = useGetStickerChartQuery(idEmoji);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Create Emoji</title>
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
          onClick={() => router.push({ pathname: '/database/sticker', query: { tab: 'emoji' } })}
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

      {loadingSticker ? (
        <PageLoader />
      ) : (
        <GridContainer style={kind !== 'create' ? {} : { width: '70%', margin: '0 auto' }}>
          <Grid item xs={12} sm={kind !== 'create' ? 6 : 12} style={kind !== 'create' ? {} : { padding: 0 }}>
            <FormEmoji status={kind !== 'create' ? 'detail' : 'create'} data={detail} id={detail?._id} />
          </Grid>
          {kind !== 'create' && (
            <Grid item xs={12} sm={6}>
              <GridContainer>
                <Grid item xs={12} sm={6}>
                  <CardWithDivider
                    title="Dicari"
                    loading={loadingChart}
                    value={numberWithCommas(chart?.search || 0)}
                    description="Kali"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Digunakan" loading={loadingChart} data={chart?.used || []} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Jenis Kelamin Audiens" loading={loadingChart} data={chart?.gender || []} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Rentang Umur Audiens" loading={loadingChart} data={chart?.age || []} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardWithIndicator title="Wilayah Audiens" loading={loadingChart} data={chart?.area || []} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Interest loading={loadingChart} data={chart?.interest || []} />
                </Grid>
              </GridContainer>
            </Grid>
          )}
        </GridContainer>
      )}
    </>
  );
};

export default DetailEmoji;
