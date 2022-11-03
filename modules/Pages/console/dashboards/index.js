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

// request
import { useGetUserActivityByYearQuery, useGetUserActivityHyppeByDateQuery } from 'api/console/engagement';
import { useGetUserActivityBeforeTodayQuery, useGetMonetizeByYearQuery } from 'api/console/dashboard';

// third party modules
import moment from 'moment';

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
  const currentYear = new Date().getFullYear();
  const formattedTodayDate = moment(new Date()).format('YYYY-MM-DD');
  // const { data: activeUsersSevenDay } = useGetUserActivityBeforeTodayQuery(6);
  // const { data: activeUsersThirtyDay } = useGetUserActivityBeforeTodayQuery(29);
  // const { data: activeUsersOneYear } = useGetUserActivityByYearQuery(currentYear);
  const { data: usersActivityHyppeSevenDay } = useGetUserActivityHyppeByDateQuery(formattedTodayDate);
  const { data: usersMonetizeOneYear } = useGetMonetizeByYearQuery(currentYear);

  // const countTotal = (data, key) => {
  //   let result = 0;
  //   if (data) {
  //     result = data.reduce((total, value) => total + value[key], 0);
  //   }
  //   return result;
  // };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Dashboard</title>
      </Head>
      <PageContainer>
        <GridContainer>
          <Grid item xs={12} sm={6} md={3}>
            <UserActive title="Pengguna Aktif" secondaryTitle="Bulan ini" amount={10254} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Unggahan title="Total Post" secondaryTitle="Bulan ini" amount={33755} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Pendapatan title="Total Pendapatan" secondaryTitle="Bulan ini" amount={30000000} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Voucher title="Pendapatan Voucher" secondaryTitle="Bulan ini" amount={15015000} />
          </Grid>
        </GridContainer>
        <GridContainer style={{ marginTop: 12 }}>
          <Grid item xs={12} sm={9} md={9}>
            <ActivitySize data={usersActivityHyppeSevenDay} />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <StatusKepemilikan data={usersMonetizeOneYear} />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleDashboardComponent;
