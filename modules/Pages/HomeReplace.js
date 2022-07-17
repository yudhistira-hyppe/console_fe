import CmtVertical from '@coremat/CmtNavigation/Vertical';
import { sidebarNavs } from '@jumbo/components/AppLayout/partials/menus';
import GridContainer from '@jumbo/components/GridContainer';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SideBar from '@jumbo/components/AppLayout/partials/SideBar';

const useStyles = makeStyles((theme) => ({
  btnLogin: {
    background: '#AB22AF',
    borderRadius: '5.1504px',
    color: '#FDFDFD',
    padding: '0 2rem',
  },
  welcomeAtHyppeText: {
    fontSize: '2rem',
    color: '#3F3F3F',
    [theme.breakpoints.down('xs')]: {
      fontSize: '23px',
    },
  },
  subText: {
    color: '#737373',
  },
  primaryColorText: {
    color: 'rgba(171, 34, 175, 1)',
  },
  sectionContentManagement: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      // background: 'yellow',
      margin: 0,
    },
  },

  bgColor: {
    background: '#FFFFFF',
    height: '100vh',
  },

  containerGap: {
    padding: '2% 4% 0 4%',
    // border: '1px solid black',
  },

  imgContentManagement: {
    // display: 'block',
    [theme.breakpoints.down('xs')]: {
      // background: 'yellow',
      textAlign: 'center',
      display: 'inline-block !important',
      // width: '100%',
      // height: 'auto',
    },
  },

  section2: {
    marginTop: '5%',
    background: '#FAFAFA',
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },

  headTextContentManagement: {
    background: 'rgba(171, 34, 175, 0.08)',
    color: '#AB22AF',
    width: '16rem',
    borderRadius: '3rem',
    textAlign: 'center',
    display: 'block',
  },

  section3: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '5%',
      display: 'block',
      textAlign: 'center',
    },
  },

  tes2: {
    [theme.breakpoints.down('xs')]: {
      border: '1px solid black',
      // display: 'block !important',
      background: 'green !important',
    },
  },
  tes: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block !important',
      background: 'green !important',
      // display: 'flex',
    },
  },
}));

const Home = () => {
  const router = useRouter();
  const classes = useStyles();

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [width, height]);

  return (
    <>
      <Grid container className={classes.bgColor}>
        <Grid item lg={6} xs={6} className={classes.containerGap}>
          <img src="/images/logo.png" />
        </Grid>

        <Grid item lg={6} xs={6} className={classes.containerGap}>
          {600 < width ? (
            <Stack direction="row" spacing={5} justifyContent="flex-end">
              <Button>About</Button>
              <Button>Features</Button>
              <Button variant="outlined" className={classes.btnLogin} onClick={() => router.push('/signin')}>
                Login
              </Button>
            </Stack>
          ) : (
            // <SideBar />
            <div>masuk mobile view</div>
          )}
        </Grid>

        <Grid item lg={12} xs={12} md={12}>
          <center>
            <img src="/images/man-on-hill.svg" />
            <Typography variant="h1" component="div" gutterBottom className={classes.welcomeAtHyppeText}>
              Selamat Datang di <span className={classes.primaryColorText}>Hyppe Business</span>
            </Typography>
            <Typography component="div" variant="h5" className={classes.subText}>
              Kelola dan kembangkaan akun dan konten kamu
            </Typography>
          </center>
        </Grid>

        {/* <Grid item lg={12} xs={12} md={12} className={classes.section2}> */}
        <Grid item lg={12} xs={12} md={12} className={classes.section2}>
          {/* <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" className={classes.tes}>
            <Box sx={{ width: 500, backgroundColor: 'red', height: 500 }} className={classes.tes2}></Box>
            <Box sx={{ width: 500, backgroundColor: 'yellow', height: 500 }} className={classes.tes3}></Box>
          </Stack> */}
          {/* --------------- */}
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            className={classes.imgContentManagement}>
            <img src="/images/woman-designer.svg" />

            <Box
              sx={{
                Width: 'auto',
                height: 'auto',
                marginTop: '5%',
              }}>
              <div className={classes.headTextContentManagement}>
                <img src="/images/icons/category-box.svg" style={{ transform: 'translate(-10px,5px)' }} />
                <Typography component="span" style={{ lineHeight: '40px' }}>
                  Content Management
                </Typography>
              </div>
              <Typography
                variant="h1"
                component="div"
                style={{ margin: '1rem 0 0.8rem 0', fontSize: '1.5rem', color: '#3F3F3F' }}>
                Kelola dan kembangkan akun <br /> dan konten kamu
              </Typography>
              <Typography component="div" variant="h5" style={{ color: '#737373' }}>
                Kamu dapat mengatur atribut konten dan melihat <br /> wawasan tentang konten kamu
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid lg={12} xs={12} md={12} className={classes.section3} style={{ background: '#FFFFFF' }}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" className={classes.imgContentManagement}>
            <Box
              sx={{
                width: 'auto',
                // height: 300,
                marginTop: '5%',
                // backgroundColor: 'blue',
              }}>
              <div className={classes.headTextContentManagement} style={{ width: '11rem' }}>
                <Typography component="span" style={{ lineHeight: '40px' }}>
                  Ads Manager
                </Typography>
                <img src="/images/icons/ads-manager-icon.svg" style={{ transform: 'translate(5px,5px)' }} />
              </div>
              <Typography
                variant="h1"
                component="div"
                style={{ margin: '1rem 0 0.8rem 0', fontSize: '1.5rem', color: '#3F3F3F' }}>
                Tumbuhkan bisnismu dengan <br />
                Hyppe Ads.
              </Typography>
              <Typography component="div" variant="h5" style={{ color: '#737373' }}>
                Buat iklan dengan target penonton yang potensial <br />
                dari pengguna Hyppe
              </Typography>
            </Box>
            <img src="/images/woman-teacher.svg" />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
