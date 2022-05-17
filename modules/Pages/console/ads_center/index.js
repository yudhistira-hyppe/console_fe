import React from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import AdsListing from './AdsListing';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Pusat Iklan', isActive: true },
];

const ConsoleAdsCenterComponent = () => {
  
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Iklan</title>
      </Head>
      <PageContainer heading="Pusat Iklan" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} md={12} xl={12}>
            <AdsListing/>
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  )
}

export default ConsoleAdsCenterComponent;