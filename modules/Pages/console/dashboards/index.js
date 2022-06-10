import React from 'react';
import Head from 'next/head';
import { Box, Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ActiveUsersCard from './ActiveUsersCard';
import StatusKepemilikanCard from './StatusKepemilikanCard';
import ActivitySize from './ActivitySize';
import CmtImage from '@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useGetUserActivityByYearQuery } from 'api/console/engagement';
import { useGetUserActivityBeforeTodayQuery, useGetMonetizeByYearQuery } from 'api/console/dashboard';

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
  const { data: activeUsersSevenDay } = useGetUserActivityBeforeTodayQuery(6);
  const { data: activeUsersThirtyDay } = useGetUserActivityBeforeTodayQuery(29);
  const { data: activeUsersOneYear } = useGetUserActivityByYearQuery(currentYear);
  const { data: usersMonetizeOneYear } = useGetMonetizeByYearQuery(currentYear);

  const countTotal = (data, key) => {
    let result = 0;
    if (data) {
      result = data.reduce((total, value) => total + value[key], 0);
    }
    return result;
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Dashboard</title>
      </Head>
      <PageContainer heading="Beranda">
        <GridContainer>
          <Grid item xs={12} sm={5} md={5}>
            <Box display="flex" alignItems="center" className={classes.boxAlert}>
              <CmtImage src={'/images/icons/warning_sign.png'} alt="warning" />
              <Typography component="div" variant="h5" className={classes.desc}>
                Permintaan voucher baru telah dikonfirmasi!
              </Typography>
              <CmtImage src={'/images/icons/icon_link.png'} alt="link" />
            </Box>
          </Grid>
        </GridContainer>
        <GridContainer>
          <Grid item xs={12} sm={6} md={4}>
            <ActiveUsersCard
              dataGraph={activeUsersSevenDay}
              xAxisKeyGraph="date"
              lineKeyGraph="user_activity_count"
              jumlah={countTotal(activeUsersSevenDay, 'user_activity_count')}
              title="Pengguna Aktif 7 Hari"
              color="#0062FF"
              background={['#E2EEFF -18.96%', '#FFFFFF 108.17%']}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ActiveUsersCard
              dataGraph={activeUsersThirtyDay}
              xAxisKeyGraph="date"
              lineKeyGraph="user_activity_count"
              jumlah={countTotal(activeUsersThirtyDay, 'user_activity_count')}
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
              jumlah={countTotal(activeUsersOneYear, 'count_user')}
              title={`Pengguna Aktif Tahun ${new Date().getFullYear()}`}
              color="#FFA601"
              background={['#FFF2E2 -18.96%', '#FFFFFF 108.17%']}
            />
          </Grid>
          {/* <Grid item xs={12} sm={12} md={12}>
            <ActivityChart/>
          </Grid> */}
          <Grid item xs={12} sm={12} md={12}>
            <ActivitySize />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <StatusKepemilikanCard data={usersMonetizeOneYear} />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleDashboardComponent;
