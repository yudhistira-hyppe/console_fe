import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  return (
    <>
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline" style={{ background: '#FFFFFF' }}>
        <Grid item style={{ margin: '1% 5% 0 5%' }}>
          <Box>
            <img src="/images/logo.png" />
          </Box>
        </Grid>
        <Grid item style={{ margin: '1% 5% 0 5%' }}>
          <Stack direction="row" spacing={6}>
            <Button>About</Button>
            <Button>Features</Button>
            <Button
              variant="outlined"
              style={{
                background: '#AB22AF',
                borderRadius: '5.1504px',
                color: '#FDFDFD',
                padding: '0 2rem',
              }}
              onClick={() => router.push('/signin')}>
              Login
            </Button>
          </Stack>
        </Grid>

        <Grid item lg={12} style={{ marginTop: '5%' }}>
          <center>
            <img src="/images/man-on-hill.svg" width="400" />
            <Typography variant="h1" component="div" gutterBottom style={{ fontSize: '2rem', color: '#3F3F3F' }}>
              Selamat Datang di Hyppe Business
            </Typography>
            <Typography component="div" variant="h5" style={{ color: '#737373' }}>
              Kelola dan kembangkaan akun dan konten kamu
            </Typography>
          </center>
        </Grid>

        <Grid lg={12} xs={12} style={{ backgroundColor: '#FAFAFA', marginTop: '5%' }}>
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                width: 300,
                height: 300,
                marginLeft: '10%',
              }}>
              <img src="/images/woman-designer.svg" />
            </Box>
            <Box
              sx={{
                width: 400,
                // height: 300,
                backgroundColor: 'primary.dark',
              }}
              style={{ margin: '5% 0 0 3%' }}>
              <div
                style={{
                  background: 'rgba(171, 34, 175, 0.08)',
                  color: '#AB22AF',
                  width: '16rem',
                  //   padding: '10px',
                  borderRadius: '3rem',
                  textAlign: 'center',
                }}>
                <img src="/images/icons/category-box.svg" style={{ transform: 'translate(-10px,5px)' }} />
                <Typography component="span" style={{ lineHeight: '40px' }}>
                  Content Management
                </Typography>
              </div>

              <Typography
                variant="h1"
                component="div"
                style={{ margin: '1rem 0 0.8rem 0', fontSize: '1.5rem', color: '#3F3F3F' }}>
                Kelola dan kembangkan akun dan konten kamu
              </Typography>
              <Typography component="div" variant="h5" style={{ color: '#737373' }}>
                Kamu dapat mengatur atribut konten dan melihat wawasan tentang konten kamu
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid lg={6} xs={12}></Grid>

        <Grid lg={6} xs={12}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Box component="div" sx={{ width: 500 }} style={{ marginRight: '5%' }}>
              <div
                style={{
                  textAlign: 'center',
                  width: '10.5rem',
                  padding: '0',
                  float: 'right',
                  lineHeight: '40px',
                  borderRadius: '3rem',
                  background: 'rgba(171, 34, 175, 0.08)',
                  color: '#AB22AF',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}>
                <Typography component="span">Ads Manager</Typography>
                <img src="/images/icons/ads-manager-icon.svg" style={{ transform: 'translate(8px,8px)' }} />
              </div>
              <div style={{ textAlign: 'right', clear: 'both' }}>
                <Typography variant="h1" component="div" style={{ fontSize: '1.5rem', color: '#3F3F3F' }} gutterBottom>
                  Tumbuhkan bisnismu dengan <br />
                  Hyppe Ads.
                </Typography>
                <Typography component="div" variant="h5" style={{ color: '#737373' }}>
                  Buat iklan dengan target penonton yang potensial <br />
                  dari pengguna Hyppe
                </Typography>
              </div>
            </Box>

            {/* -------  */}

            <Box
              sx={{
                width: 300,
                height: 300,

                backgroundColor: 'primary.dark',
              }}
              style={{ margin: '5% 15% 0 0' }}>
              <img src="/images/woman-teacher.svg" />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
