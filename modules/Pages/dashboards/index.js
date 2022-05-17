//MODIFIED HYPPE
import React from 'react';
import { Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { useAuth } from '../../../authentication';
import AdsStatstics from './AdsStatstics';
import ProfileStatstics from './ProfileStatstics';
import Balances from './Balances';
import ProfileDetails from './ProfileDetails';
import ContentsListing from './ContentsListing';

const useStyles = makeStyles((theme) => ({
  orderLg2: {
    [theme.breakpoints.up('lg')]: {
      order: 2,
    },
  },
  orderLg1: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
}));

const PremiumDashboard = () => {
  const classes = useStyles();
  const { authUser, isLoadingUser } = useAuth();
  const welcomeNote = "Welcome " + authUser.fullName;
  return (
    <PageContainer heading={welcomeNote} >
      <GridContainer>
        <Grid item xs={12} md={4} xl={4}>
        <AdsStatstics />
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Balances/>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <ProfileStatstics/>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <ProfileDetails/>
        </Grid>
        <Grid item xs={12} md={8} xl={8}>
          <ContentsListing/>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default PremiumDashboard;
