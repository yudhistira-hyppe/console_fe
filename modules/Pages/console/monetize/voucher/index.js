import React from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import VoucherPengguna from './VoucherPengguna';
import FilterTableAkunPengguna from '../../users/FilterTableAkunPengguna';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Monetize', link: '/console/monetize' },
  { label: 'Campaign Voucher', isActive: true },
];

const ConsoleVoucherComponent = () => {
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Campaign Voucher</title>
      </Head>
      <PageContainer heading="Campaign Voucher" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} md={12} xl={12}>
            <FilterTableAkunPengguna />
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
            <VoucherPengguna />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleVoucherComponent;
