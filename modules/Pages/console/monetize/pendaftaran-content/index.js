import React from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TablePengguna from './TablePengguna';
import FilterTableAkunPengguna from '../../users/FilterTableAkunPengguna';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Monetize', link: '/console/monetize' },
  { label: 'Pendaftaran Konten', isActive: true },
];

const ConsoleMonetizeContentRegisteredComponent = () => {
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pendaftaran Konten</title>
      </Head>
      <PageContainer heading="Pendaftaran Konten" breadcrumbs={breadcrumbs}>
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

export default ConsoleMonetizeContentRegisteredComponent;
