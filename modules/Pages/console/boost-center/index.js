import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@mui/material';
import ChartPost from './chart-post';
import TopBoosted from './top-boosted';
import TableList from './TableList';

const BoostCenter = () => {
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Boost Center</title>
      </Head>
      <PageContainer>
        <GridContainer>
          <Grid item xs={12} sm={4}>
            <ChartPost />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TopBoosted />
          </Grid>
          <Grid item xs={12}>
            <TableList />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default BoostCenter;
