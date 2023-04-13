import React, { useState } from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import AdsPerformaceComponents from './AdsPerformance';
import AdsDemographyComponent from './AdsDemography';
import TableList from './TableList';

const ConsoleAdsCenterComponent = () => {
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Iklan</title>
      </Head>
      <PageContainer>
        <Grid container spacing={6}>
          {access.map((item) => item?.nameModule).includes('ads_performance') && (
            <Grid item xs={4} style={{ width: '100%' }}>
              <AdsPerformaceComponents />
            </Grid>
          )}
          {access.map((item) => item?.nameModule).includes('ads_demografis') && (
            <Grid item xs={8} style={{ width: '100%' }}>
              <AdsDemographyComponent />
            </Grid>
          )}
          {access.map((item) => item?.nameModule).includes('ads_table') && (
            <Grid item xs={12} style={{ width: '100%' }}>
              <TableList />
            </Grid>
          )}
        </Grid>
      </PageContainer>
    </>
  );
};

export default ConsoleAdsCenterComponent;
