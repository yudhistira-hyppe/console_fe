import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CmtObjectSummary from '@coremat/CmtObjectSummary';
import CmtAvatar from '@coremat/CmtAvatar';
import { useRouter } from 'next/router';
import PostListing from './PostListing';
import RecentOrders from './RecentOrders';
import ProjectWorkedHours from './ProjectWorkedHours';
import MarketingCampaign from './MarketingCampaign';
import Contact from './Contact';
import About from './About';
import Insight from './Insight';
import VerificationCode from './VerificationCode';
import { getMediaUri } from 'helpers/stringHelper';
//import { fakeDb } from 'modules/FakeDb/fake-db';

const ProfilePicture = '/images/pp.png';
//const {akunPengguna} = fakeDb;

import { getListUsers } from 'redux/actions/userActions';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Database Akun Pengguna', link: '/console/pengguna' },
  { label: 'Detail', isActive: true },
];

const useRowStyles = makeStyles({
  profilePicture: {
    '& .makeStyles-medium-64': {
      width: 80,
      height: 80
    },
    '& .Cmt-title': {
      fontSize: 22
    },
    '& .Cmt-sub-title': {
      fontSize: 18
    }
  }
});


const ConsolePenggunaDetailComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const classes = useRowStyles();
  const { id } = router.query
  const userStore = useSelector((state) => state.userReducers)


  // const pengguna = akunPengguna.filter((akun) => akun.id == id);

  // if(pengguna.length == 0) {
  //   location.href = '/console/pengguna';
  // }

  useEffect(() => {
    console.log("masuk fungsi ini")
    console.log(id)
    dispatch(getListUsers({
      page: 0,
      rowsPerPage: 1,
      search: id
    }))
  }, []);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pengguna</title>
      </Head>
      <PageContainer heading="Pengguna" breadcrumbs={breadcrumbs}>
        {
          userStore.users && userStore.users.length > 0 && 
          <GridContainer>
          <Grid item xs={12} lg={3} className={classes.profilePicture}>
            <CmtObjectSummary
              avatar={<CmtAvatar src={userStore.users[0].avatar ? getMediaUri(userStore.users[0].avatar) : ProfilePicture} alt={userStore.users[0].fullName} />}
              title={userStore.users[0].fullName}
              subTitle={userStore.users[0].username}
              showItemBadge={false}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              align={'horizontal'}
            />
          </Grid>
          <Grid item xs={12} lg={7}>
            <Box style={{height:'100%'}}>
              <VerificationCode />
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box style={{height:'100%'}}>
                <Contact userDetail={userStore.users[0]} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Box style={{height:'100%'}}>
                <About userDetail={userStore.users[0]} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Insight insight={userStore.users[0].insight} interest={userStore.users[0].interest}/>
          </Grid>
          <Grid item xs={12} lg={9}>
            <PostListing email={id}/>
          </Grid>
          <Grid item xs={12} lg={7}>
            <RecentOrders/>
          </Grid>
          <Grid item xs={12} lg={5}>
            <ProjectWorkedHours/>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MarketingCampaign/>
          </Grid>
        </GridContainer>
        }
      </PageContainer>
    </>
  )
}

export default ConsolePenggunaDetailComponent;