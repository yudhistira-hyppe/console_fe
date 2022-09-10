import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Breadcrumbs from '../../bantuan-pengguna/BreadCrumb';
import { Stack } from '@mui/material';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import UserIcon from '@material-ui/icons/PersonOutlined';
import LocationIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import WCIcon from '@material-ui/icons/Wc';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import HouseIcon from '@material-ui/icons/LocationCity';
import { styled } from '@material-ui/styles';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Keluhan Pengguna', link: '/console/keluhan-pengguna' },
  { label: 'Rincian Akun', isActive: true },
];

const DetailKeluhanPengguna = () => {
  const router = useRouter();

  const onBackHandler = (e) => {
    e.preventDefault();
    router.push('/console/help-center');
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(5),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#fffff',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  return (
    <>
      <Head>
        <title key={'title'}>Hyppe-Console :: Detail Keluhan Pengguna</title>
      </Head>

      <Stack>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Link href="/" onClick={onBackHandler} style={{ cursore: 'pointer' }}>
          <Stack direction={'row'}>
            <Stack direction={'column'} justifyContent={'center'}>
              <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }} />
            </Stack>
            <Stack>
              <Typography variant="h1" style={{ color: 'black' }}>
                Kembali
              </Typography>
            </Stack>
          </Stack>
        </Link>
      </Stack>

      <PageContainer>
        <Stack mt={3} direction={'row'} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={2}>
            <Stack direction={'column'} justifyContent={'center'}>
              <Avatar></Avatar>
            </Stack>
            <Stack>
              <Typography>Mira</Typography>
              <Typography>Mira Setiawan</Typography>
            </Stack>
          </Stack>

          <Stack direction={'row'} spacing={2}>
            <Stack>
              <Typography variant="h1" style={{ textAlign: 'center' }}>
                2k+
              </Typography>
              <Typography variant="subtitle2" style={{ color: 'black', opacity: '0.6' }}>
                Pengikut
              </Typography>
            </Stack>
            <Divider orientation="vertical" />
            <Stack>
              <Typography variant="h1" style={{ textAlign: 'center' }}>
                847
              </Typography>
              <Typography variant="subtitle2" style={{ color: 'black', opacity: '0.6' }}>
                Mengikuti
              </Typography>
            </Stack>
            <Divider orientation="vertical" />
            <Stack>
              <Typography variant="h1" style={{ textAlign: 'center' }}>
                500
              </Typography>
              <Typography variant="subtitle2" style={{ color: 'black', opacity: '0.6' }}>
                Teman
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack mt={3} direction={'row'} spacing={3}>
          <Card style={{ padding: '35px 24px' }}>
            <Stack direction={'column'} spacing={3}>
              <Stack>
                <Stack direction={'row'} spacing={2}>
                  <div
                    style={{
                      padding: '6px 6px 0px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <span>
                      <EmailIcon style={{ color: '#DADADA' }} />
                    </span>
                  </div>

                  <Stack>
                    <Typography variant="subtitle2">Email</Typography>
                    <Typography>miraonthewall@gmail.com</Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stack>
                <Stack direction={'row'} spacing={2}>
                  <div
                    style={{
                      padding: '6px 6px 0px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <span>
                      <CalendarIcon style={{ color: '#DADADA' }} />
                    </span>
                  </div>

                  <Stack>
                    <Typography variant="subtitle2">Waktu Pendaftaran</Typography>
                    <Typography>21/12/2020 - 12:00 WIB</Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stack>
                <Stack direction={'row'} spacing={2}>
                  <div
                    style={{
                      padding: '6px 6px 0px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <span>
                      <UserIcon style={{ color: '#DADADA' }} />
                    </span>
                  </div>

                  <Stack>
                    <Typography variant="subtitle2">Status</Typography>
                    <Typography>Basic</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Card>

          <Card style={{ flex: 1 }}>
            <CardHeader style={{ padding: '24px' }} title={<Typography variant="h3">Informasi Pengguna Akun</Typography>}>
              {' '}
            </CardHeader>

            <Divider />

            <CardContent style={{ padding: '35px 24px' }}>
              <Stack direction={'column'} spacing={3}>
                <Stack direction={'row'} spacing={24}>
                  <Stack direction={'row'} spacing={1}>
                    <Stack direction={'column'} justifyContent={'center'}>
                      <LocationIcon fontSize="large" htmlColor="#DADADA" />
                    </Stack>
                    <Stack>
                      <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                        Tempat Lahir
                      </Typography>
                      <Typography variant="subtitle1">Jakarta</Typography>
                    </Stack>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <Stack direction={'column'} justifyContent={'center'}>
                      <CakeIcon fontSize="large" htmlColor="#DADADA" />
                    </Stack>
                    <Stack>
                      <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                        Tanggal Lahir
                      </Typography>
                      <Typography variant="subtitle1">25/10/91</Typography>
                    </Stack>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <Stack direction={'column'} justifyContent={'center'}>
                      <WCIcon fontSize="large" htmlColor="#DADADA" />
                    </Stack>
                    <Stack>
                      <Typography variant="caption">Jenis Kelamin</Typography>
                      <Typography variant="subtitle1">Wanita</Typography>
                    </Stack>
                  </Stack>
                </Stack>

                <Stack spacing={18} direction={'row'}>
                  <Stack direction={'row'} spacing={1}>
                    <Stack direction={'column'} justifyContent={'center'}>
                      <PhoneIcon fontSize="large" htmlColor="#DADADA" />
                    </Stack>
                    <Stack>
                      <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                        Nomor Telepon
                      </Typography>
                      <Typography variant="subtitle1">081234567890</Typography>
                    </Stack>
                  </Stack>

                  <Stack direction={'row'} spacing={1}>
                    <Stack direction={'column'} justifyContent={'center'}>
                      <HouseIcon fontSize="large" htmlColor="#DADADA" />
                    </Stack>
                    <Stack>
                      <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                        Lokasi
                      </Typography>
                      <Typography variant="subtitle1">Bogor, Jawa Barat, Indonesia</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Stack mt={3}>
          <Card>
            <CardHeader
              style={{ padding: '24px' }}
              title={<Typography variant="h3">Permohonan Menjadi Akun Premium</Typography>}
            />
            <CardContent style={{ padding: '24px' }}>
              <Stack direction={'row'} spacing={1}>
                <FormControl variant="standard">
                  <InputLabel shrink htmlFor="nama">
                    Nama Lengkap
                  </InputLabel>
                  <BootstrapInput id="nama" />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel shrink htmlFor="nama">
                    Nomor E-KTP
                  </InputLabel>
                  <BootstrapInput id="nama" />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel shrink htmlFor="nama">
                    Jenis Kelamin
                  </InputLabel>
                  <BootstrapInput id="nama" />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel shrink htmlFor="nama">
                    Tanggal Lahir
                  </InputLabel>
                  <BootstrapInput id="nama" />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel shrink htmlFor="nama">
                    Tempat Lahir
                  </InputLabel>
                  <BootstrapInput id="nama" />
                </FormControl>
              </Stack>

              <Stack>
                <div>
                    <img />
                </div>
              </Stack>

              <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                <Button disabled variant="contained">Setujui</Button>
                <Button variant="outlined">Tolak</Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </PageContainer>
    </>
  );
};

export default DetailKeluhanPengguna;
