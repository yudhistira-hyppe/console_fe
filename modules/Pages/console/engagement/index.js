import React from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GrafikTotalInstalasi from './GrafikTotalInstalasi';
import GrafikInstalasi from './GrafikInstalasi';
import EngagementUser from './EngagementUser';
import LogAktifitas from './LogAktifitas';
// import Performance from './Performance';
// import SalesStatistic from './SalesStatistic';
import { useGetLogActivityByYearQuery, useGetUserEventActivityByYearQuery } from 'api/console/engagement';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Engagement Pengguna', isActive: true },
];

const ConsoleEngagementComponent = () => {
  const currentYear = new Date().getFullYear();
  const { data: logActivityOneYear } = useGetLogActivityByYearQuery(currentYear);
  const { data: userEventActivityOneYear } = useGetUserEventActivityByYearQuery(currentYear);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Engagement Pengguna</title>
      </Head>
      <PageContainer heading="Engagement Pengguna" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} md={8} xl={8}>
            <GrafikInstalasi />
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <GrafikTotalInstalasi />
          </Grid>
          {/* <Grid item xs={12} md={12} xl={12}>
            <SiteVisitors/>
          </Grid> */}
          <Grid item xs={12} md={12} xl={12}>
            <LogAktifitas data={logActivityOneYear} />
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
            <EngagementUser data={userEventActivityOneYear} />
          </Grid>
          {/* <Grid item xs={12} md={6} xl={6}>
            <Performance />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <SalesStatistic />
          </Grid> */}
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleEngagementComponent;
