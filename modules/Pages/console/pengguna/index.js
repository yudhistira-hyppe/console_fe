import React from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TableAkunPengguna from './TableAkunPengguna';
import FilterTableAkunPengguna from './FilterTableAkunPengguna';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Database Akun Pengguna', isActive: true },
];

const ConsolePenggunaComponent = () => {
  
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Akun Pengguna</title>
      </Head>
      <PageContainer heading="Database Akun Pengguna" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} md={12} xl={12}>
            <FilterTableAkunPengguna/>
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
            <TableAkunPengguna />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  )
}

export default ConsolePenggunaComponent;