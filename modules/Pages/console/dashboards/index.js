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
import Instalasi from './Instalasi';
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

      {/* // start change */}
      <PageContainer>
        <GridContainer>
          {/* i just recoginze, if you want to make the components reusable 
          you need to change (fill and id in linearGradient is unique) to trigger effect color */}
          {/* i'll be refactor the components to reusable. i'll be back asap! */}
          <Grid item xs={12} sm={6} md={3}>
            <UserActive title="Pengguna Aktif" secondaryTitle="Bulan ini" amount="10.254" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Instalasi title="Instalasi" secondaryTitle="Bulan ini" amount="33.7555" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Pendapatan title="Pendapatan" secondaryTitle="Bulan ini" amount="30.000.000" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Voucher title="Voucher" secondaryTitle="Bulan ini" amount="222.355" />
          </Grid>
        </GridContainer>

        {/* end change */}

        {/* <GridContainer>
          <Grid item xs={12} sm={5} md={5}>
            <Box display="flex" alignItems="center" className={classes.boxAlert}>
              <CmtImage src={'/images/icons/warning_sign.png'} alt="warning" />
              <Typography component="div" variant="h5" className={classes.desc}>
                Permintaan voucher baru telah dikonfirmasi!
              </Typography>
              <CmtImage src={'/images/icons/icon_link.png'} alt="link" />
            </Box>
          </Grid>
        </GridContainer> */}
        <GridContainer>
          {/* <ActiveUsersCard
              dataGraph={activeUsersSevenDay}
              xAxisKeyGraph="date"
              lineKeyGraph="user_activity_count"
              jumlah={countTotal(activeUsersSevenDay, 'user_activity_count').toString()}
              title="Pengguna Aktif 7 Hari"
              color="#0062FF"
              background={['#E2EEFF -18.96%', '#FFFFFF 108.17%']}
            /> */}

          {/* <Grid item xs={12} sm={6} md={4}>
            <ActiveUsersCard
              dataGraph={activeUsersThirtyDay}
              xAxisKeyGraph="date"
              lineKeyGraph="user_activity_count"
              jumlah={countTotal(activeUsersThirtyDay, 'user_activity_count').toString()}
              title="Pengguna Aktif 30 Hari"
              color="#4200FF"
              background={['#E2E3FF -18.96%', '#FFFFFF 108.17%']}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ActiveUsersCard
              dataGraph={activeUsersOneYear}
              xAxisKeyGraph="month_name"
              lineKeyGraph="count_user"
              jumlah={countTotal(activeUsersOneYear, 'count_user').toString()}
              title={`Pengguna Aktif Tahun ${new Date().getFullYear()}`}
              color="#FFA601"
              background={['#FFF2E2 -18.96%', '#FFFFFF 108.17%']}
            />
          </Grid>
           */}
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
