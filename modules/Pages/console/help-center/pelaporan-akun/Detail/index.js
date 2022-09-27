import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Breadcrumbs from '../../bantuan-pengguna/BreadCrumb';
import { Grid, Stack } from '@mui/material';

import { Avatar, Button, Card, CardContent, CardHeader, Chip, Divider, Link, Paper, Typography } from '@material-ui/core';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';
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
import ModalConfirmation from '../Modal';
import DeleteModal from '../Modal/DeleteModal';
import ViewModal from '../Modal/ViewModal';
import GetChipColor from 'helpers/getChipColor';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import CmtList from '@coremat/CmtList';
import ProgressIndicator from '../../CardWithIndicator/ProgressIndicator';
import { GraphIndicator } from '../../components';

const wallets = [
  { label: 'Mempromosikan Kekerasan Ekstrim Dan Terorisme', value: 25, rate: 5, color: '#E31D41' },
  { label: 'Melanggar EULA', value: 25, rate: 5, color: '#FF8800' },
  { label: 'Keamanan Anak Di Bawah Umur', value: 25, rate: 5, color: '#8DCD03' },
  { label: 'Tidak Selesai', value: 25, rate: 5, color: '#7C7C7C' },
];

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Pelaporan Akun', link: '/console/pelaporan-akun' },
  { label: 'Rincian Akun', isActive: true },
];

const akunPelapor = [
  {
    name: 'Hamdani',
    email: 'hamdani@gmail.com',
    tanggal_pelaporan: '22/08/05-13:29 WIB',
    alasan: 'Akun ini mempromosikan kekerasan ekstrim dan terorisme',
  },
  {
    name: 'Bernardo',
    email: 'bernardo@gmail.com',
    tanggal_pelaporan: '22/08/05-13:49 WIB',
    alasan: 'Akun ini berisikan konten dewasa',
  },
  {
    name: 'Anna',
    email: 'anna999@gmail.com',
    tanggal_pelaporan: '22/08/05-13:27 WIB',
    alasan: 'Akun ini berisikan konten dewasa',
  },
  {
    name: 'Michael',
    email: 'Michael@gmail.com',
    tanggal_pelaporan: '22/08/05-13:21 WIB',
    alasan: 'Akun ini melanggar EULA',
  },
  {
    name: 'Clara',
    email: 'claraasik99@gmail.com',
    tanggal_pelaporan: '22/08/05-13:51 WIB',
    alasan: 'Akun ini melanggar EULA',
  },
  {
    name: 'OliviaRosalina',
    email: 'oliviarosalina@gmail.com',
    tanggal_pelaporan: '22/08/05-13:26 WIB',
    alasan: 'Keamanan anak dibawah umur',
  },
  {
    name: 'DeDeaDeasy',
    email: 'deasyc@gmail.com',
    tanggal_pelaporan: '22/08/05-13:30 WIB',
    alasan: 'Keamanan anak dibawah umur',
  },
  { name: 'Rene', email: 'irene@gmail.com', tanggal_pelaporan: '22/08/05-13:56 WIB', alasan: 'Keamanan anak dibawah umur' },
  {
    name: 'Keisya',
    email: 'keisyairvi@gmail.com',
    tanggal_pelaporan: '22/08/05-13:47 WIB',
    alasan: 'Akun ini berisikan konten dewasa',
  },
  {
    name: 'Jonathan',
    email: 'jonathan@gmail.com',
    tanggal_pelaporan: '22/08/05-13:15 WIB',
    alasan: 'Akun ini memposting ujaran kebencian atau perilaku berbahaya',
  },
];

const laporan = [
  { total: 20, status: null },
  { total: 384, status: 'Tidak Ditangguhkan' },
  { total: 40, status: 'Ditangguhkan' },
  { total: 40, status: 'Ditangguhkan' },
];

const DetailKeluhanPengguna = () => {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState({
    show: false,
    type: '',
    modalType: '',
  });
  const [tabSection, setTabSection] = React.useState('0');

  const showModalHandler = (data) => {
    setShowModal({
      show: true,
      type: data.type,
      modalType: data.modalType,
    });
  };

  const onBackHandler = (e) => {
    // e.preventDefault();
    router.push('/console/help-center');
  };

  const onConfirmModal = () => {};

  const onCloseModal = () => {
    setShowModal({
      show: false,
      type: null,
      modalType: null,
    });
  };

  const handleTabSectionChange = (event, newValue) => {
    setTabSection(newValue);
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
          <Card style={{ padding: '20px', flex: 2 }}>
            <Stack direction={'row'} flex={1} justifyContent={'space-between'}>
              <Typography variant="h3">Laporan</Typography>
              <Chip label="semua" variant="outlined" />
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} mt={3}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="h1">20</Typography>
                  <Typography color="primary" variant="subtitle2">
                    Total Laporan
                  </Typography>
                </Stack>
                <div>
                  <Button variant="contained" style={{ backgroundColor: 'rgba(233, 42, 99, 1)', color: '#FFFFFF' }}>
                    Baru
                  </Button>
                </div>
              </Stack>

              <Stack>
                <GraphIndicator data={wallets} />
                {/* <CmtList data={wallets} renderRow={(item, index) => <ProgressIndicator key={index} item={item} />} /> */}
                {/* <PortfolioDetails data={wallets} /> */}
              </Stack>
            </Stack>
          </Card>

          <Card style={{ padding: '42px 25px', flex: 1 }}>
            <Stack spacing={4}>
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => showModalHandler({ type: 'tidak ditangguhkan', modalType: 'confirmation' })}>
                  Tidak Ditangguhkan
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => showModalHandler({ type: 'ditangguhkan', modalType: 'confirmation' })}>
                  Ditangguhkan
                </Button>
              </Stack>

              <Stack direction={'column'} spacing={1} mt={5}>
                <Typography>
                  Ingin dihapus?{' '}
                  <Link
                    style={{ fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => showModalHandler({ type: '', modalType: 'delete' })}>
                    klik disini
                  </Link>
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

          <Card style={{ flex: 1 }}>
            <CardHeader title={<Typography variant="h3">Riwayat Laporan</Typography>} />
            <CardContent>
              <Grid container py={1}>
                <Grid item xs={5}>
                  <Typography variant="caption">Total Laporan</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="caption">Tindakan</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container>
                {laporan.map((el, i) => (
                  <Grid container key={i} py={2} borderBottom={'solid rgba(33, 33, 33, 0.08) 2px'}>
                    <Grid item xs={5}>
                      <Stack direction={'row'} spacing={1} alignItems={'center'} height={'100%'}>
                        <Typography variant="subtitle2">{el.total}</Typography>
                        <Typography
                          variant="subtitle2"
                          color="primary"
                          style={{ cursor: 'pointer' }}
                          onClick={() => showModalHandler({ modalType: 'view', type: '' })}>
                          laporan
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={7}>
                      {el.status ? (
                        <Chip
                          label={
                            <Typography fontWeight="bold" variant="subtitle2">
                              {el.status}
                            </Typography>
                          }
                          style={GetChipColor(el.status)}
                        />
                      ) : (
                        '-'
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Stack>

        <Stack mt={3} direction={'row'} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={2}>
            <Stack direction={'column'} justifyContent={'center'}>
              <Avatar src="https://material-ui.com/static/images/avatar/2.jpg"></Avatar>
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

        <Stack direction={'row'} spacing={3} mt={3}>
          <Paper style={{ padding: '35px 24px', height: '80%', flex: 0.3 }}>
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

          <Card style={{ flex: 1 }}>
            <CardHeader style={{ padding: '24px' }} title={<Typography variant="h3">Informasi Pengguna Akun</Typography>}>
              {' '}
            </CardHeader>

            <Divider />

            <CardContent style={{ padding: '35px 24px' }}>
              <Stack spacing={3}>
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

                <Stack direction={'column'} spacing={3}>
                  <Stack direction={'row'} spacing={14}>
                    <Stack direction={'row'} spacing={1}>
                      <Stack direction={'column'} justifyContent={'center'}>
                        <AccountBalanceIcon fontSize="large" htmlColor="#DADADA" />
                      </Stack>
                      <Stack>
                        <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                          Rekening Bank
                        </Typography>
                        <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                          <Typography variant="subtitle1">BCA *******900</Typography>
                          <CheckCircleIcon fontSize="small" htmlColor="#5D9405" />
                        </Stack>
                        <Typography variant="subtitle1">Mar****an</Typography>
                      </Stack>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                      <Stack direction={'column'} justifyContent={'center'}>
                        <AccountBalanceIcon fontSize="large" htmlColor="#DADADA" />
                      </Stack>
                      <Stack>
                        <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                          Rekening Bank
                        </Typography>
                        <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                          <Typography variant="subtitle1">Mandiri *******900</Typography>
                          <CheckCircleIcon fontSize="small" htmlColor="#5D9405" />
                        </Stack>
                        <Typography variant="subtitle1">Mar****an</Typography>
                      </Stack>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                      <Stack direction={'column'} justifyContent={'center'}>
                        <AccountBalanceIcon fontSize="large" htmlColor="#DADADA" />
                      </Stack>
                      <Stack>
                        <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                          Rekening Bank
                        </Typography>
                        <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                          <Typography variant="subtitle1">BNI *******900</Typography>
                          <CheckCircleIcon fontSize="small" htmlColor="#5D9405" />
                        </Stack>
                        <Typography variant="subtitle1">Mar****an</Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack spacing={19} direction={'row'}>
                    <Stack direction={'row'} spacing={1}>
                      <Stack direction={'column'} justifyContent={'center'}>
                        <AccountBalanceIcon fontSize="large" htmlColor="#DADADA" />
                      </Stack>
                      <Stack>
                        <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                          Rekening Bank
                        </Typography>
                        <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                          <Typography variant="subtitle1">BRI *******900</Typography>
                          {/* <CheckCircleIcon fontSize="small" htmlColor="#5D9405" /> */}
                        </Stack>
                        <Typography variant="subtitle1">Mar****an</Typography>
                      </Stack>
                    </Stack>

                    <Stack direction={'row'} spacing={1}>
                      <Stack direction={'column'} justifyContent={'center'}>
                        <AccountBalanceIcon fontSize="large" htmlColor="#DADADA" />
                      </Stack>
                      <Stack>
                        <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                          Rekening Bank
                        </Typography>
                        <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                          <Typography variant="subtitle1">Mandiri *******900</Typography>
                          {/* <CheckCircleIcon fontSize="small" htmlColor="#5D9405" /> */}
                        </Stack>
                        <Typography variant="subtitle1">Mar****an</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Stack direction={'row'} spacing={3} mt={3}>
          <Stack style={{ flex: 0.35 }} spacing={3}>
            <Stack borderBottom={'solid gray 1px'}>
              <Typography variant="h2">Minat</Typography>
            </Stack>
            <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'space-between'}>
              <Card style={{ padding: '8px', marginBottom: '1em' }}>Musik</Card>
              <Card style={{ padding: '8px', marginBottom: '1em' }}>Entertainment</Card>
              <Card style={{ padding: '8px', marginBottom: '1em' }}>Liburan</Card>
              <Card style={{ padding: '8px', marginBottom: '1em' }}>Hobi</Card>
              <Card style={{ padding: '8px', marginBottom: '1em' }}>Mode & Gaya</Card>
              <Card style={{ padding: '8px', marginBottom: '1em' }}>Kesehatan</Card>
            </Stack>
          </Stack>

          <Stack flex={1} spacing={3}>
            <Paper>
              <TabContext value={tabSection}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Stack direction={'row'}>
                    <Stack justifyContent={'center'} alignItems={'flex-start'} flex={0.5} paddingLeft={2}>
                      <Typography variant="h4">Post Pengguna</Typography>
                    </Stack>
                    <TabList
                      onChange={handleTabSectionChange}
                      aria-label="basic tabs example"
                      TabIndicatorProps={{ style: { backgroundColor: '#AB22AF', color: '#AB22AF', fontWeight: 'bold' } }}
                      textColor="secondary">
                      <Tab label="All" value="0" style={{ padding: '2em 16px', fontWeight: 'bold' }} />
                      <Tab label="HYYPEVID" value="1" style={{ padding: '2em 16px', fontWeight: 'bold' }} />
                      <Tab label="HYYPEPICT" value="2" style={{ padding: '2em 16px', fontWeight: 'bold' }} />
                      <Tab label="HYYPEDIARY" value="3" style={{ padding: '2em 16px', fontWeight: 'bold' }} />
                    </TabList>
                  </Stack>
                </Box>

                <TabPanel value="0">
                  <Stack padding={2} spacing={2}>
                    <Stack direction={'row'} spacing={2}>
                      <Stack flex={1} style={{ borderRadius: '10px', overflow: 'hidden' }}>
                        <img src="https://material-ui.com/static/images/avatar/2.jpg" style={{ objectFit: 'cover' }} />
                      </Stack>

                      <Stack flex={2} spacing={1}>
                        <div>
                          <Button disabled variant="contained" color="secondary">
                            HyppeVid
                          </Button>
                        </div>
                        <Typography>
                          Hari ini bersama keluarga tersayang liburan ke pantai indah kapuk ditemani dengan kopi kesukaan
                          saya
                        </Typography>
                        <Stack direction={'row'} spacing={1}>
                          <Stack spacing={1} direction="row">
                            <Typography variant="subtitle2">233</Typography>
                            <Typography variant="body2">Dilihat</Typography>
                          </Stack>
                          <Divider orientation="vertical" />
                          <Stack spacing={1} direction="row">
                            <Typography variant="subtitle2">233</Typography>
                            <Typography variant="body2">Disukai</Typography>
                          </Stack>
                          <Divider orientation="vertical" />
                          <Stack spacing={1} direction="row">
                            <Typography variant="subtitle2">233</Typography>
                            <Typography variant="body2">Komentar</Typography>
                          </Stack>
                          <Divider orientation="vertical" />
                          <Stack spacing={1} direction="row">
                            <Typography variant="subtitle2">233</Typography>
                            <Typography variant="body2">Dibagikan</Typography>
                          </Stack>
                        </Stack>
                      </Stack>

                      <Stack direction={'column'} justifyContent={'center'}>
                        <Stack direction={'row'} spacing={1}>
                          <Typography variant="body2">Terdaftar:</Typography>
                          <Typography variant="body2">Ya</Typography>
                        </Stack>
                        <Stack direction={'row'} spacing={1}>
                          <Typography variant="body2">Dijual:</Typography>
                          <Typography variant="body2">Tidak</Typography>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Stack direction={'row'} spacing={2}>
                      <Stack flex={1} style={{ borderRadius: '10px', overflow: 'hidden' }}>
                        <img src="https://material-ui.com/static/images/avatar/2.jpg" style={{ objectFit: 'cover' }} />
                      </Stack>

                      <Stack flex={2} spacing={1}>
                        <div>
                          <Button disabled variant="contained" color="secondary">
                            HyppeVid
                          </Button>
                        </div>
                        <Typography>
                          Hari ini bersama keluarga tersayang liburan ke pantai indah kapuk ditemani dengan kopi kesukaan
                          saya
                        </Typography>
                        <Stack direction={'row'} spacing={1}>
                          <Stack spacing={1} direction="row">
                            <Typography variant="subtitle2">233</Typography>
                            <Typography variant="body2">Dilihat</Typography>
                          </Stack>
                          <Divider orientation="vertical" />
                          <Stack spacing={1} direction="row">
                            <Typography variant="subtitle2">233</Typography>
                            <Typography variant="body2">Disukai</Typography>
                          </Stack>
                          <Divider orientation="vertical" />
                          <Stack spacing={1} direction="row">
                            <Typography variant="subtitle2">233</Typography>
                            <Typography variant="body2">Komentar</Typography>
                          </Stack>
                          <Divider orientation="vertical" />
                          <Stack spacing={1} direction="row">
                            <Typography variant="subtitle2">233</Typography>
                            <Typography variant="body2">Dibagikan</Typography>
                          </Stack>
                        </Stack>
                      </Stack>

                      <Stack direction={'column'} justifyContent={'center'}>
                        <Stack direction={'row'} spacing={1}>
                          <Typography variant="body2">Terdaftar:</Typography>
                          <Typography variant="body2">Ya</Typography>
                        </Stack>
                        <Stack direction={'row'} spacing={1}>
                          <Typography variant="body2">Dijual:</Typography>
                          <Typography variant="body2">Tidak</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </TabPanel>

                <TabPanel value="1">
                  <Stack justifyContent={'center'} direction={'row'}>
                    <Typography>NO DATA</Typography>
                  </Stack>
                </TabPanel>
                <TabPanel value="2">
                  <Stack justifyContent={'center'} direction={'row'}>
                    <Typography>NO DATA</Typography>
                  </Stack>
                </TabPanel>
                <TabPanel value="3">
                  <Stack justifyContent={'center'} direction={'row'}>
                    <Typography>NO DATA</Typography>
                  </Stack>
                </TabPanel>
              </TabContext>
            </Paper>

            <Paper>
              <Stack padding={2}>
                <Typography>Konten Yang Dilaporkan</Typography>
              </Stack>

              <Stack padding={2} flexWrap={'wrap'} direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} maxWidth={'30em'} spacing={2} mb={3}>
                  <Stack>
                    <div style={{ backgroundColor: 'gray', borderRadius: '10px', height: '100%', width: '180px' }}></div>
                  </Stack>

                  <Stack spacing={1}>
                    <div>
                      <Button disabled variant="contained">
                        Hyypevid
                      </Button>
                    </div>
                    <Typography>10 things you must know before trading in cryptocurrency</Typography>
                    <Stack direction={'row'} spacing={1}>
                      <Typography variant="body2">02/09/22</Typography>
                      <Divider orientation="vertical" />
                      <Typography variant="body2">233 Total Laporan</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction={'row'} maxWidth={'30em'} spacing={2} mb={3}>
                  <Stack>
                    <div style={{ backgroundColor: 'gray', borderRadius: '10px', height: '100%', width: '180px' }}></div>
                  </Stack>

                  <Stack spacing={1}>
                    <div>
                      <Button disabled variant="contained">
                        Hyypevid
                      </Button>
                    </div>
                    <Typography>10 things you must know before trading in cryptocurrency</Typography>
                    <Stack direction={'row'} spacing={1}>
                      <Typography variant="body2">02/09/22</Typography>
                      <Divider orientation="vertical" />
                      <Typography variant="body2">233 Total Laporan</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction={'row'} maxWidth={'30em'} spacing={2} mb={3}>
                  <Stack>
                    <div style={{ backgroundColor: 'gray', borderRadius: '10px', height: '100%', width: '180px' }}></div>
                  </Stack>

                  <Stack spacing={1}>
                    <div>
                      <Button disabled variant="contained">
                        Hyypevid
                      </Button>
                    </div>
                    <Typography>10 things you must know before trading in cryptocurrency</Typography>
                    <Stack direction={'row'} spacing={1}>
                      <Typography variant="body2">02/09/22</Typography>
                      <Divider orientation="vertical" />
                      <Typography variant="body2">233 Total Laporan</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Stack>

        <ModalConfirmation
          showModal={showModal.show && showModal.modalType === 'confirmation'}
          type={showModal.type}
          onClose={onCloseModal}
          onConfirm={onConfirmModal}
        />
        <DeleteModal
          showModal={showModal.show && showModal.modalType === 'delete'}
          onClose={onCloseModal}
          onConfirm={onConfirmModal}
        />
        <ViewModal showModal={showModal.show && showModal.modalType === 'view'} data={akunPelapor} onClose={onCloseModal} />
      </PageContainer>
    </>
  );
};

export default DetailKeluhanPengguna;
