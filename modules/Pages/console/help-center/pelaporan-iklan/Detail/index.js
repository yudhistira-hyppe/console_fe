import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Breadcrumbs from '../../bantuan-pengguna/BreadCrumb';
import { Stack } from '@mui/material';

import { Avatar, Button, Card, CardContent, CardHeader, Chip, Divider, Link, Paper, Typography } from '@material-ui/core';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';
import { ToggleButton } from '@material-ui/lab';
import CmtList from '@coremat/CmtList';
import PortfolioDetails from '../../CardWithIndicator/PortofolioDetails';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import UserIcon from '@material-ui/icons/PersonOutlined';
import LocationIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import WCIcon from '@material-ui/icons/Wc';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import HouseIcon from '@material-ui/icons/LocationCity';
import CircledUserIcon from '@material-ui/icons/AccountCircleRounded';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CheckCircleIcon from '@material-ui/icons/CheckCircleRounded';
import Image from 'next/image';
import CardMedia from '@material-ui/core/CardMedia';

const wallets = [
  { label: 'Mempromosikan Kekerasan Ekstrim Dan Terorisme', value: 25, rate: 5, color: '#E31D41' },
  { label: 'Melanggar EULA', value: 25, rate: 5, color: '#FF8800' },
  { label: 'Keamanan Anak Di Bawah Umur', value: 25, rate: 5, color: '#8DCD03' },
  { label: 'Tidak Selesai', value: 25, rate: 5, color: '#7C7C7C' },
];

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Pelaporan Iklan', link: '/console/pelaporan-akun' },
  { label: 'Rincian Konten', isActive: true },
];

const DetailKeluhanPengguna = () => {
  const router = useRouter();

  const onBackHandler = (e) => {
    e.preventDefault();
    router.push('/console/help-center');
  };

  return (
    <>
      <Head>
        <title key={'title'}>Hyppe-Console :: Detail Keluhan Pengguna</title>
      </Head>

      <Stack spacing={1}>
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
        <Stack direction={'row'} flex={1} spacing={3} mt={3}>
          <Card style={{ padding: '20px', flex: 3 }}>
            <Stack direction={'column'} spacing={2} flex={1} height={'100%'}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography>Laporan</Typography>
                <div>
                  <div style={{ padding: '2px 5px', borderRadius: '4px', border: 'solid gray 1px' }}>
                    <Typography variant="body2">Semua</Typography>
                  </div>
                </div>
              </Stack>

              <Stack justifyContent={'center'} flex={1}>
                <Stack direction={'row'}>
                  <Stack direction={'column'} justifyContent={'space-between'} flex={1}>
                    <Stack spacing={1}>
                      <Typography variant="h2">20</Typography>
                      <Typography variant="body2" color="primary">
                        Total Laporan
                      </Typography>
                    </Stack>

                    <Stack>
                      <div>
                        <Button variant="contained" color="primary">
                          Baru
                        </Button>
                      </div>
                    </Stack>
                  </Stack>

                  <Stack flex={3}>
                    <PortfolioDetails data={wallets} />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Card>

          <Card style={{ padding: '42px 25px', flex: 1 }}>
            <Stack spacing={4}>
              <Stack spacing={2}>
                <Button variant="outlined" color="primary">
                  Tidak Ditangguhkan
                </Button>
                <Button variant="contained" color="primary">
                  Ditangguhkan
                </Button>
              </Stack>

              <Stack direction={'column'} spacing={1} mt={5}>
                <Typography>
                  Ingin dihapus? <Link style={{ fontWeight: 'bold', cursor: 'pointer' }}>klik disini</Link>
                </Typography>

                <Paper
                  style={{ padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.02)', color: 'rgba(151, 151, 151, 1)' }}
                  elevation={0}>
                  <Typography variant="subtitle2" style={{ textAlign: 'justify' }}>
                    Ketika kamu memilih ingin dihapus data akan tetap ada dan hanya bisa dilihat di Hyppe Console
                  </Typography>
                </Paper>
              </Stack>
            </Stack>
          </Card>
        </Stack>

        <Stack mt={3} direction={'row'} flex={1} spacing={3}>
          <Card style={{ flex: 3, padding: '20px' }}>
            <CardMedia component={'img'} height={'500'} image="/images/active-premium.png" alt="green-iguana" />
            <CardContent>
              <Stack direction={'row'} spacing={1}>
                <div>
                  <Button variant="contained" disabled>
                    Pre-HyppeVid
                  </Button>
                </div>
                <Stack direction={'column'} justifyContent={'center'}>
                  <Typography variant={'body2'}>Pengguna Kredit: 100/1000</Typography>
                </Stack>
              </Stack>
              <Stack mt={1} spacing={1}>
                <Typography>Where is..?</Typography>
                <Stack spacing={1}>
                  <Typography variant="caption">Deskripsi</Typography>
                  <Stack direction={'row'} spacing={1}>
                    <div>
                      <Button variant="contained" disabled size="small">
                        Hiburan
                      </Button>
                    </div>
                    <div>
                      <Button variant="contained" disabled size="small">
                        Makanan & Minuman
                      </Button>
                    </div>
                  </Stack>
                </Stack>

                <Stack direction={'row'} spacing={1}>
                  <Stack direction={'row'} spacing={1}>
                    <Typography variant="h4">233</Typography>
                    <Typography variant="body2">Suka</Typography>
                  </Stack>
                  <Divider orientation={'vertical'} />
                  <Stack direction={'row'} spacing={1}>
                    <Typography variant="h4">233</Typography>
                    <Typography variant="body2">Komentar</Typography>
                  </Stack>
                  <Divider orientation={'vertical'} />
                  <Stack direction={'row'} spacing={1}>
                    <Typography variant="h4">233</Typography>
                    <Typography variant="body2">Dilihat</Typography>
                  </Stack>
                  <Divider orientation={'vertical'} />
                  <Stack direction={'row'} spacing={1}>
                    <Typography variant="h4">233</Typography>
                    <Typography variant="body2">Dibagikan</Typography>
                  </Stack>
                </Stack>

                <Stack>
                  <Typography variant="body2">18/07/2022 - 13:00 WIB</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <div style={{ flex: 1.16 }}>
            <Stack direction={'row'} spacing={2} mb={2}>
              <Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
              <Stack>
                <Typography variant="h3">HolyWings</Typography>
                <Typography variant="caption">Holy Wings</Typography>
              </Stack>
            </Stack>

            <Paper style={{ padding: '35px 24px' }}>
              <Stack direction={'column'} spacing={3}>
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
                    <Typography>vebby93@gmail.com</Typography>
                  </Stack>
                </Stack>

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
                    <Typography>Premium</Typography>
                  </Stack>
                </Stack>

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
                      <CircledUserIcon style={{ color: '#DADADA' }} />
                    </span>
                  </div>

                  <Stack>
                    <Typography variant="subtitle2">Nama Lengkap</Typography>
                    <Typography>Vebby Sutanto</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </div>
        </Stack>
      </PageContainer>
    </>
  );
};

export default DetailKeluhanPengguna;
