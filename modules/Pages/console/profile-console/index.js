import GridContainer from '@jumbo/components/GridContainer';
import { Box, Grid } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Contact from './Contact';
import About from './About';
import Header from './Header';
import { useAuth } from 'authentication';
import { useGetProfileByUserEmailQuery } from 'api/user/user';
import { useGetGroupQuery } from 'api/console/group';
import { useState } from 'react';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
}));

const ProfileBasic = () => {
  const classes = useStyles();
  const router = useRouter();
  const [payload, setPayload] = useState({
    skip: 0,
    limit: 10,
  });
  const { authUser } = useAuth();
  const { data: dataProfile } = useGetProfileByUserEmailQuery(authUser.user.email);

  const { data: dataPosition } = useGetGroupQuery(payload);

  return (
    <>
      <GridContainer>
        <Grid item xs={12} lg={12} className={classes.profileSidebar}>
          <Box>
            <Header dataUser={dataProfile} />
          </Box>
        </Grid>

        <Grid item xs={12} lg={4} className={classes.profileSidebar}>
          <Box mb={6}>
            {/* <Contact userDetail={userDetail} /> */}
            <Contact dataUser={dataProfile} dataPosition={dataPosition} query={router.query} />
          </Box>
          <Box mb={6}>{/* <Friends friends={userDetail.friends} /> */}</Box>
          <Box mb={6}>{/* <UserPhotos /> */}</Box>
        </Grid>
        <Grid item xs={12} lg={8} className={classes.profileMainContent}>
          <Box mb={6}>
            <About dataUser={dataProfile} />
          </Box>
          {/* <Box mb={6}>
            <Biography />
          </Box> */}
          {/* <Events events={userDetail.events} /> */}
        </Grid>
      </GridContainer>
    </>
  );
};

export default ProfileBasic;
