import React from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TablePengguna from './TablePengguna';
import FilterTableAkunPengguna from '../../../users/FilterTableAkunPengguna';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Pengumuman', link: '/console/help-center/pengumuman' },
  { label: 'Pilih Pengguna', isActive: true },
];

const ConsolePengumumanPenggunaComponent = () => {
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pilih Pengguna</title>
      </Head>
      <PageContainer heading="Pilih Pengguna" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} md={12} xl={12}>
            <FilterTableAkunPengguna />
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
            <TablePengguna />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsolePengumumanPenggunaComponent;
