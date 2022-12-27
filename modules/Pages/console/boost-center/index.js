import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@mui/material';
import ChartPost from './chart-post';
import TopBoosted from './top-boosted';
import TableList from './TableList';
import Cookies from 'js-cookie';

const BoostCenter = () => {
  const access =sessionStorage.getItem('access') ? JSON.parse(sessionStorage.getItem('access')) : [];

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Boost Center</title>
      </Head>
      <PageContainer>
        <GridContainer>
          {access.map((item) => item?.nameModule).includes('boost_statistic') && (
            <Grid item xs={12} sm={4}>
              <ChartPost />
            </Grid>
          )}
          {access.map((item) => item?.nameModule).includes('boost_engagement') && (
            <Grid item xs={12} sm={8}>
              <TopBoosted />
            </Grid>
          )}
          {access.map((item) => item?.nameModule).includes('boost_table') && (
            <Grid item xs={12}>
              <TableList />
            </Grid>
          )}
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default BoostCenter;
