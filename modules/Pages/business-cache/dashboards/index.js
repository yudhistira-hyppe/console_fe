// react
import React from 'react';

// material ui
import { Grid } from '@material-ui/core';

// template components
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';

// components partials
import AdsStatstics from './AdsStatstics';
import ProfileStatstics from './ProfileStatstics';
import Balances from './Balances';
import ProfileDetails from './ProfileDetails';
import ContentsListing from './ContentsListing';
import Comments from './Comments';
import LatestNotification from './Latest Notification';
import UserInfo from './ProfileDetails/UserInfo';

// request
import { useAuth } from '../../../authentication';
import { useGetAccountBalanceQuery } from 'api/user/user';

const PremiumDashboard = () => {
  const { authUser } = useAuth();
  const welcomeNote = 'Welcome ' + authUser.user.fullName;

  const { data: dataBalance } = useGetAccountBalanceQuery(authUser.user.email);

  return (
    <PageContainer heading={welcomeNote}>
      <GridContainer>
        <Grid item xs={12} md={4} xl={4}>
          <AdsStatstics />
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Balances balance={dataBalance?.data[0]?.totalsaldo} precentage={23} trend={false} />
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <ProfileStatstics />
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <ProfileDetails />
          <div className="mt-5">
            <UserInfo />
          </div>
        </Grid>
        <Grid item xs={12} md={8} xl={8}>
          <ContentsListing />
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
          <Comments />
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
          <LatestNotification />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default PremiumDashboard;
