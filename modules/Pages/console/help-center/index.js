import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CardWithIndicator from './CardWithIndicator';
import AccountReport from './AccountReport';
import ContentReport from './ContentReport';
import AdsReport from './adsReport';

const sample3Data = [
  { reason: 'Baru', persen: 3, count: 4, color: '#E31D41' },
  { reason: 'Ditolak', persen: 10, count: 7, color: '#FF8800' },
  { reason: 'Disetujui', persen: 86, count: 61, color: '#8DCD03' },
];

const sample4Data = [
  { reason: 'Baru', persen: 3, count: 4, color: '#E31D41' },
  { reason: 'Dalam Proses', persen: 10, count: 7, color: '#FF8800' },
  { reason: 'Selesai', persen: 86, count: 61, color: '#8DCD03' },
  { reason: 'Tidak Selesai', persen: 1, count: 2, color: '#7C7C7C' },
];

const ConsoleHelpCenterComponent = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Bantuan</title>
      </Head>
      <PageContainer>
        <GridContainer>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Bantuan Pengguna"
              TypeProblem="Total Masalah"
              numberOfProblem={70}
              data={sample4Data}
              onClick={() => router.push('/help-center/bantuan-pengguna')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Permohonan Akun Premium"
              TypeProblem="Total Permohonan"
              numberOfProblem={70}
              data={sample4Data}
              onClick={() => router.push('/help-center/permohonan-premium')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Rekening Bank"
              TypeProblem="Total Permohonan"
              numberOfProblem={70}
              data={sample4Data}
              onClick={() => router.push('/help-center/rekening-bank')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Laporan Konten"
              TypeProblem="Konten Dilaporkan"
              numberOfProblem={10}
              data={sample4Data}
              pathIconLeft={'/images/icons/img-empty.svg'}
              onClick={() => router.push('/help-center/pelaporan-konten')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Banding Konten"
              TypeProblem="Permohonan Banding"
              numberOfProblem={200}
              data={sample4Data}
              pathIconLeft={'/images/icons/banding-konten.svg'}
              onClick={() => router.push('/help-center/banding-konten')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Fingerprint Combat"
              TypeProblem="Konten Serupa"
              numberOfProblem={25}
              data={sample4Data}
              pathIconLeft={'/images/icons/banding-konten.svg'}
              onClick={() => router.push('/help-center/konten-serupa')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Laporan Iklan"
              TypeProblem="Iklan Dilaporkan"
              numberOfProblem={200}
              data={sample3Data}
              pathIconLeft={'/images/icons/ads-icon.svg'}
              onClick={() => router.push('/help-center/pelaporan-iklan')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Banding Iklan Moderasi"
              TypeProblem="Permohonan Banding"
              numberOfProblem={25}
              data={sample3Data}
              pathIconLeft={'/images/icons/ads-banding.svg'}
              onClick={() => router.push('/help-center/banding-iklan')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Laporan Akun"
              TypeProblem="Akun Dilaporkan"
              numberOfProblem={200}
              data={sample3Data}
              pathIconLeft={'/images/icons/users.svg'}
              onClick={() => router.push('/help-center/pelaporan-akun')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Banding Akun Moderasi"
              TypeProblem="Permohonan"
              numberOfProblem={25}
              data={sample3Data}
              pathIconLeft={'/images/icons/users-banding.svg'}
              onClick={() => router.push('/help-center/banding-akun')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={false}
            />
          </Grid>

          {/* --------- card section 2 (without indicator) --------------------*/}
          <Grid item xs={12} md={4} sm={4}>
            <AccountReport isFetching={false} />
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <ContentReport />
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <AdsReport />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleHelpCenterComponent;
