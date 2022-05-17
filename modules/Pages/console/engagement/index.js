import React from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GrafikTotalInstalasi from './GrafikTotalInstalasi';
import GrafikInstalasi from './GrafikInstalasi';
//import SiteVisitors from './SiteVisitors';
import EngagementUser from './EngagementUser';
import LogAktifitas from './LogAktifitas';
import Performance from './Performance';
import SalesStatistic from './SalesStatistic';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Engagement Pengguna', isActive: true },
];

const ConsoleEngagementComponent = () => {
  
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Engagement Pengguna</title>
      </Head>
      <PageContainer heading="Engagement Pengguna" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} md={8} xl={8}>
            <GrafikInstalasi/>
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <GrafikTotalInstalasi/>
          </Grid>
          {/* <Grid item xs={12} md={12} xl={12}>
            <SiteVisitors/>
          </Grid> */}
          <Grid item xs={12} md={12} xl={12}>
            <LogAktifitas/>
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
            <EngagementUser/>
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <Performance/>
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <SalesStatistic/>
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  )
}

export default ConsoleEngagementComponent;