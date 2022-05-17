//MODIFIED HYPPE
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import KontenListing from './KontenListing';

const breadcrumbs = [
    { label: 'Home', link: '/console' },
    { label: 'Monetize', link: '/console/monetize' },
    { label: 'Konten', isActive: true },
  ];

const ConsoleMonetizeContentComponent = () => {
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Konten</title>
      </Head>
      <PageContainer heading="Konten" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} sm={12} md={12}>
            <KontenListing/>
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleMonetizeContentComponent;
