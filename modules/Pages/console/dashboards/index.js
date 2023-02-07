// react and nextJS
import React from 'react';
import Head from 'next/head';

// material ui
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// template components
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';

// partials components
import StatusKepemilikan from './StatusKepemilikan';
import ActivitySize from './trashPreviousDesign/ActivitySize';
import UserActive from './UserActive';
import Unggahan from './Unggahan';
import Pendapatan from './Pendapatan';
import Voucher from './Voucher';

const useStyles = makeStyles((theme) => ({
  '& .MuiBox-root': {
    marginBottom: 0,
  },
  boxAlert: {
    backgroundColor: '#FFDE99',
    padding: 8,
  },
  desc: {
    fontSize: 14,
    color: '#D36F1A',
    paddingLeft: 10,
    paddingRight: 10,
  },
}));

const ConsoleDashboardComponent = () => {
  const classes = useStyles();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Dashboard</title>
      </Head>
      <PageContainer>
        <GridContainer>
          {access?.map((item) => item?.nameModule).includes('dashboard_active_user') && (
            <Grid item xs={12} sm={6} md={3}>
              <UserActive />
            </Grid>
          )}
          {access?.map((item) => item?.nameModule).includes('dashboard_total_post') && (
            <Grid item xs={12} sm={6} md={3}>
              <Unggahan />
            </Grid>
          )}
          {access?.map((item) => item?.nameModule).includes('dashboard_total_income') && (
            <Grid item xs={12} sm={6} md={3}>
              <Pendapatan />
            </Grid>
          )}
          {access?.map((item) => item?.nameModule).includes('dashboard_voucher') && (
            <Grid item xs={12} sm={6} md={3}>
              <Voucher />
            </Grid>
          )}
        </GridContainer>
        <GridContainer style={{ marginTop: 12 }}>
          {access?.map((item) => item?.nameModule).includes('dashboard_activity') && (
            <Grid item xs={12} sm={9} md={9}>
              <ActivitySize />
            </Grid>
          )}
          {access?.map((item) => item?.nameModule).includes('dashboard_status_ownership') && (
            <Grid item xs={12} sm={3} md={3}>
              <StatusKepemilikan />
            </Grid>
          )}
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleDashboardComponent;
