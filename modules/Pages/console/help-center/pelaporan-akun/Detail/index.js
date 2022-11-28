import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Breadcrumbs from '../../bantuan-pengguna/BreadCrumb';
import { Avatar, Box, Chip, Grid, Pagination, Stack, Tab, Tabs } from '@mui/material';

import { Button, Card, CardContent, CardHeader, Divider, Link, Paper, Typography } from '@material-ui/core';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';
import ModalConfirmation from '../Modal';
import DeleteModal from '../Modal/DeleteModal';
import ViewModal from '../Modal/ViewModal';
import { GraphIndicator } from '../../components';
import {
  useDeleteTicketMutation,
  useGetDetailTicketQuery,
  useGetReportUserDetailTicketQuery,
  useUpdateDetailTicketMutation,
  useUpdateFlagingTicketMutation,
} from 'api/console/helpCenter/konten';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import GridContainer from '@jumbo/components/GridContainer';
import {
  AccountBalance,
  AccountCircle,
  Cake,
  CheckCircleRounded,
  DateRange,
  Email,
  HowToReg,
  LocationCity,
  LocationOn,
  PhoneIphone,
  Wc,
} from '@material-ui/icons';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import moment from 'moment';
import ScrollBar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Pelaporan Akun', link: '/help-center/pelaporan-akun' },
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

const useStyles = makeStyles(() => ({
  scrollbar: { overflow: 'auto', maxHeight: 500, display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 20px 0' },
  textTruncate: {
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
    lineClamp: 3,
    overflow: 'hidden',
  },
}));

const DetalPelaporanAkun = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const [showModal, setShowModal] = React.useState({
    show: false,
    type: null,
    modalType: null,
  });
  const [updateTicket] = useUpdateDetailTicketMutation();
  const [flagTicket] = useUpdateFlagingTicketMutation();
  const [deleteTicket] = useDeleteTicketMutation();

  const { data: detail, isFetching: loadingDetail } = useGetDetailTicketQuery({
    postID: router.query?._id,
    type: 'content',
  });

  const { data: userReports } = useGetReportUserDetailTicketQuery({
    postID: router.query?._id,
    type: 'content',
  });

  const showModalHandler = (data) => {
    setShowModal({
      show: true,
      type: data.type,
      modalType: data.modalType,
    });
  };

  const onConfirmModal = (val) => {
    if (showModal?.type === 'ditangguhkan' || showModal?.type === 'tidak ditangguhkan') {
      updateTicket({
        postID: router.query?._id,
        type: 'content',
        reasonId: showModal?.type === 'ditangguhkan' ? val?._id : undefined,
        reason:
          showModal?.type === 'ditangguhkan' ? (val?.reason === 'Lainnya' ? val?.otherReason : val?.reason) : undefined,
        ditangguhkan: showModal?.type === 'ditangguhkan',
      }).then(() => {
        onCloseModal();
        router.push('/help-center/pelaporan-konten');
      });
    } else if (showModal?.type === 'sensitif') {
      flagTicket({ postID: router.query?._id, type: 'content' }).then(() => {
        onCloseModal();
        router.push('/help-center/pelaporan-konten');
      });
    } else {
      deleteTicket({ postID: router.query?._id, type: 'content', remark: val }).then(() => {
        onCloseModal();
        router.push('/help-center/pelaporan-konten');
      });
    }
  };

  const onCloseModal = () => {
    setShowModal({
      show: false,
      type: null,
      modalType: null,
    });
  };

  const getMediaEndpoint = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getMediaUri = (mediaUri) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}/profilepict/${mediaUri}${authToken}`;
  };

  const getImage = (item) => {
    if (item?.apsara && item?.apsaraId) {
      if (item?.media?.ImageInfo) {
        return item?.media?.ImageInfo?.[0]?.URL;
      } else {
        return item?.media?.VideoList?.[0]?.CoverURL;
      }
    } else if (item?.mediaEndpoint) {
      return getMediaEndpoint(item?.mediaEndpoint);
    } else {
      return '/images/dashboard/content_image.png';
    }
  };

  const buttonStyle = (status) => {
    switch (status) {
      case 'BARU':
        return {
          backgroundColor: '#E6094B1A',
          color: '#E6094BD9',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          marginTop: 'auto',
        };
      case 'TIDAK DITANGGUHKAN':
        return {
          backgroundColor: '#71A5001A',
          color: '#71A500D9',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          marginTop: 'auto',
        };
      case 'DITANGGUHKAN':
        return {
          backgroundColor: 'rgba(103, 103, 103, 0.1)',
          color: '#676767',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          marginTop: 'auto',
        };
      case 'FLAGING':
        return {
          backgroundColor: '#B457F61A',
          color: '#B457F6D9',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          marginTop: 'auto',
        };
      default:
        return {};
    }
  };

  return (
    <>
      <Head>
        <title key={'title'}>Hyppe-Console :: Detail Keluhan Pengguna</title>
      </Head>
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
      <ViewModal
        showModal={showModal.show && showModal.modalType === 'view'}
        userReports={userReports}
        onClose={onCloseModal}
      />

      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/help-center/pelaporan-akun')}
          gap="5px"
          style={{ width: 'fit-content', cursor: 'pointer' }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
          </Stack>
          <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
            Kembali
          </Typography>
        </Stack>
      </Stack>
      {loadingDetail ? (
        <PageLoader />
      ) : (
        <PageContainer>
          <GridContainer>
            <Grid item xs={12} sm={8}>
              <Card style={{ padding: '20px', height: '100%' }}>
                <Stack direction="column" height="100%" spacing={2}>
                  <Stack direction="row" justifyContent={'space-between'}>
                    <Typography variant="h2" style={{ fontWeight: 'bold' }}>
                      Laporan
                    </Typography>
                    {/* <div style={{ padding: '2px 5px', borderRadius: '4px', border: 'solid gray 1px' }}>
                      <Typography variant="body2">Semua</Typography>
                    </div> */}
                  </Stack>

                  <Stack direction={'row'}>
                    <Stack direction={'column'} justifyContent={'space-between'} flex={1}>
                      <Stack spacing={1}>
                        <Typography variant="h2">{detail?.totalReport || 0}</Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          style={{ cursor: 'pointer' }}
                          onClick={() => showModalHandler({ modalType: 'view' })}>
                          Total Laporan
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack flex={3}>
                      {detail?.dataSum?.length >= 1 ? (
                        <GraphIndicator data={detail?.dataSum} />
                      ) : (
                        <Stack direction="column" alignItems="center" justifyContent="center" height={200}>
                          <Typography
                            style={{ padding: '24px 24px 0', fontFamily: 'Lato', fontWeight: 'bold', color: '#737373' }}>
                            Tidak ada laporan
                          </Typography>
                        </Stack>
                      )}
                      {/* <PortfolioDetails data={wallets} /> */}
                    </Stack>
                  </Stack>

                  <Button variant="contained" style={buttonStyle(detail?.data[0]?.reportStatusLast)}>
                    {detail?.data[0]?.reportStatusLast === 'FLAGING'
                      ? 'Ditandai Sensitif'
                      : detail?.data[0]?.reportStatusLast === 'TIDAK DITANGGUHKAN'
                      ? 'Dipulihkan'
                      : detail?.data[0]?.reportStatusLast === 'DITANGGUHKAN'
                      ? 'Dihapus'
                      : 'Baru'}
                  </Button>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card style={{ padding: '32px 25px', flex: 1 }}>
                <Stack spacing={3}>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => showModalHandler({ type: 'tidak ditangguhkan', modalType: 'confirmation' })}
                      disabled={detail?.data[0]?.reportStatusLast !== 'BARU'}>
                      Tidak Ditangguhkan
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => showModalHandler({ type: 'ditangguhkan', modalType: 'confirmation' })}
                      disabled={detail?.data[0]?.reportStatusLast !== 'BARU'}>
                      Tangguhkan
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => showModalHandler({ type: 'sensitif', modalType: 'confirmation' })}
                      disabled={detail?.data[0]?.reportStatusLast !== 'BARU'}>
                      Ditandai Sensitif
                    </Button>
                  </Stack>

                  <Stack direction={'column'} spacing={2} mt={5}>
                    <Typography>
                      Ingin dihapus?{' '}
                      <Link
                        style={{ fontWeight: 'bold', cursor: 'pointer', textDecorationLine: 'none' }}
                        onClick={() => showModalHandler({ type: 'delete', modalType: 'delete' })}>
                        klik disini
                      </Link>
                    </Typography>

                    <Paper
                      style={{
                        padding: '15px',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        color: 'rgba(151, 151, 151, 1)',
                        borderRadius: 4,
                      }}
                      elevation={0}>
                      <Typography variant="subtitle2" style={{ fontWeight: 'Normal' }}>
                        Ketika kamu memilih ingin dihapus data akan tetap ada dan hanya bisa dilihat di Hyppe Console
                      </Typography>
                    </Paper>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </GridContainer>
          <Stack direction="row" alignItems="center" gap="25px" my="24px" pr="24px">
            <Avatar sx={{ width: 70, height: 70 }} />
            <Stack direction="column">
              <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Mira</Typography>
              <Typography>Mira Setiawan</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" ml="auto" gap="30px">
              <Stack direction="column" alignItems="center">
                <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>2k+</Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>Pengikut</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="column" alignItems="center">
                <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>847</Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>Mengikuti</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="column" alignItems="center">
                <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>500</Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>Teman</Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" flexWrap="nowrap" gap="24px" mb="24px">
            <Paper style={{ padding: '35px 24px', width: '100%', maxWidth: 320, height: '100%' }}>
              <Stack direction={'column'} spacing={3}>
                <Stack direction={'row'} spacing={3}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      padding: '6px 6px 0px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <span>
                      <Email style={{ color: '#666666' }} />
                    </span>
                  </div>

                  <Stack>
                    <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                      Email
                    </Typography>
                    <Typography>miraonthewall@gmail.com</Typography>
                  </Stack>
                </Stack>

                <Stack direction={'row'} spacing={3}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      padding: '6px 6px 0px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <span>
                      <DateRange style={{ color: '#666666' }} />
                    </span>
                  </div>

                  <Stack>
                    <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                      Waktu Pendaftaran
                    </Typography>
                    <Typography>21/12/2020 - 12:00 WIB</Typography>
                  </Stack>
                </Stack>

                <Stack direction={'row'} spacing={3}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      padding: '6px 6px 0px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <span>
                      <HowToReg style={{ color: '#666666' }} />
                    </span>
                  </div>

                  <Stack>
                    <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                      Status
                    </Typography>
                    <Typography>Basic</Typography>
                  </Stack>
                </Stack>

                <Stack direction={'row'} spacing={3}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      padding: '6px 6px 0px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <span>
                      <AccountCircle style={{ color: '#666666' }} />
                    </span>
                  </div>

                  <Stack>
                    <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                      Nama sesuai KTP
                    </Typography>
                    <Typography>Miraaa</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
            <Paper style={{ width: '100%' }}>
              <Stack direction="column" height="100%">
                <Typography style={{ padding: 24, fontWeight: 'bold', borderBottom: '1px solid #0000001F' }}>
                  Informasi Pengguna Akun
                </Typography>
                <GridContainer style={{ padding: 20, height: '100%', flexGrow: 1 }}>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <LocationOn style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                          Tempat Lahir
                        </Typography>
                        <Typography>Jakarta</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <Cake style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                          Tanggal Lahir
                        </Typography>
                        <Typography>#000000DE</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <Wc style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                          Jenis Kelamin
                        </Typography>
                        <Typography>Perempuan</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <PhoneIphone style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                          Nomor Telepon
                        </Typography>
                        <Typography>081234567890</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <LocationCity style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>Lokasi</Typography>
                        <Typography>Bogor, Jawa Barat, Indonesia</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4} />
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <AccountBalance style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                          Rekening Bank
                        </Typography>
                        <Stack direction="row" alignItems="center" gap="8px">
                          <Typography>BCA *******900</Typography>
                          <CheckCircleRounded style={{ fontSize: 18, color: '#5D9405' }} />
                        </Stack>
                        <Typography>Mir****an</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <AccountBalance style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                          Rekening Bank
                        </Typography>
                        <Stack direction="row" alignItems="center" gap="8px">
                          <Typography>BCA *******900</Typography>
                          <CheckCircleRounded style={{ fontSize: 18, color: '#5D9405' }} />
                        </Stack>
                        <Typography>Mir****an</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <AccountBalance style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                          Rekening Bank
                        </Typography>
                        <Stack direction="row" alignItems="center" gap="8px">
                          <Typography>BCA *******900</Typography>
                          <CheckCircleRounded style={{ fontSize: 18, color: '#5D9405' }} />
                        </Stack>
                        <Typography>Mir****an</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <AccountBalance style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                          Rekening Bank
                        </Typography>
                        <Stack direction="row" alignItems="center" gap="8px">
                          <Typography>BCA *******900</Typography>
                          <CheckCircleRounded style={{ fontSize: 18, color: '#5D9405' }} />
                        </Stack>
                        <Typography>Mir****an</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </GridContainer>
              </Stack>
            </Paper>
          </Stack>

          <Stack direction="row" flexWrap="nowrap" gap="24px" mb="24px">
            <Stack direction="column" width="100%" maxWidth={320} height="100%" gap="16px">
              <Typography
                style={{ fontWeight: 'bold', borderBottom: '1px solid #0000001F', paddingBottom: 14, position: 'relative' }}>
                Minat
                <Box style={{ height: 4, width: 40, backgroundColor: '#AB22AF', position: 'absolute', bottom: 0 }} />
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap="12px">
                {[{}, {}, {}, {}].map((item, key) => (
                  <Chip
                    key={key}
                    label="Kesehatan"
                    size="small"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 4,
                      boxShadow:
                        '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
                      height: 30,
                      padding: '0 6px',
                      fontFamily: 'Lato',
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#00000099',
                    }}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack direction="column" width="100%" gap="24px">
              <Paper>
                <Stack direction="column" height="100%">
                  <Stack direction="row" style={{ borderBottom: '1px solid #0000001F' }}>
                    <Typography style={{ padding: 24, fontWeight: 'bold' }}>Post Pengguna</Typography>
                    <Tabs
                      className="mt-4"
                      value="vid"
                      variant="scrollable"
                      aria-label="disabled scrollable auto tabs"
                      indicatorColor="secondary"
                      textColor="secondary"
                      style={{ marginLeft: 55 }}>
                      <Tab
                        label="All"
                        value="all"
                        style={{
                          padding: '0px',
                          marginRight: '1.5em',
                          fontWeight: 'bold',
                          fontFamily: 'Lato',
                          fontSize: 16,
                          textTransform: 'initial',
                        }}
                      />
                      <Tab
                        label="HyppePic"
                        value="pic"
                        style={{
                          padding: '0px',
                          marginRight: '1.5em',
                          fontWeight: 'bold',
                          fontFamily: 'Lato',
                          fontSize: 16,
                          textTransform: 'initial',
                        }}
                      />
                      <Tab
                        label="HyppeVid"
                        value="vid"
                        style={{
                          padding: '0px',
                          marginRight: '1.5em',
                          fontWeight: 'bold',
                          fontFamily: 'Lato',
                          fontSize: 16,
                          textTransform: 'initial',
                        }}
                      />
                      <Tab
                        label="HyppeDiary"
                        value="diary"
                        style={{
                          padding: '0px',
                          marginRight: '1.5em',
                          fontWeight: 'bold',
                          fontFamily: 'Lato',
                          fontSize: 16,
                          textTransform: 'initial',
                        }}
                      />
                    </Tabs>
                  </Stack>
                  <ScrollBar className={classes.scrollbar}>
                    {[{}, {}, {}, {}, {}].map((item, key) => (
                      <Stack key={key} direction="row" gap="24px">
                        <img
                          src="/images/dashboard/content_image.png"
                          alt="Gambar Konten"
                          style={{ width: '100%', maxWidth: 187, height: 140 }}
                        />
                        <Stack direction="column" justifyContent="space-between">
                          <Chip
                            label="HyppeVid"
                            size="small"
                            style={{
                              borderRadius: 4,
                              fontFamily: 'Lato',
                              fontWeight: 'bold',
                              fontSize: 12,
                              color: '#00000099',
                              width: 'fit-content',
                            }}
                          />
                          <Typography>
                            Hari ini bersama keluarga tersayang liburan ke pantai indah kapuk ditemani dengan kopi kesukaan
                            saya
                          </Typography>
                          <Typography style={{ fontSize: 14, fontFamily: 'Lato' }}>
                            {200} <span style={{ color: '#00000061' }}>Suka |</span> {17}{' '}
                            <span style={{ color: '#00000061' }}>Komentar |</span> {1200}{' '}
                            <span style={{ color: '#00000061' }}>Dilihat |</span> {40}{' '}
                            <span style={{ color: '#00000061' }}>Dibagikan</span>
                          </Typography>
                          <Typography style={{ fontFamily: 'bold', fontFamily: 'Lato', color: '#00000061', fontSize: 14 }}>
                            {moment().format('DD/MM/YYYY HH:mm')} WIB
                          </Typography>
                        </Stack>
                        <Stack direction="column" justifyContent="center" gap="4px">
                          <Typography style={{ fontSize: 12, color: '#00000061', width: 100 }}>
                            Terdaftar: <span style={{ color: 'black' }}>Ya</span>{' '}
                          </Typography>
                          <Typography style={{ fontSize: 12, color: '#00000061', width: 100 }}>
                            Dijual: <span style={{ color: 'black' }}>Tidak</span>
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </ScrollBar>
                  <Stack direction="row" padding="20px 12px" alignItems="flex-end">
                    <Pagination count={1} size="small" shape="rounded" color="secondary" />
                  </Stack>
                </Stack>
              </Paper>
              <Paper>
                <Stack direction="column" height="100%">
                  <Stack direction="row">
                    <Typography style={{ padding: '24px 24px 12px', fontWeight: 'bold' }}>Konten Yang Dilaporkan</Typography>
                  </Stack>
                  <ScrollBar className={classes.scrollbar} style={{ height: 340 }}>
                    <GridContainer>
                      {[{}, {}, {}].map((item, key) => (
                        <Grid item xs={6}>
                          <Stack key={key} direction="row" gap="24px">
                            <img
                              src="/images/dashboard/content_image.png"
                              alt="Gambar Konten"
                              style={{ width: '100%', maxWidth: 187, height: 140 }}
                            />
                            <Stack direction="column" justifyContent="space-between">
                              <Chip
                                label="HyppeVid"
                                size="small"
                                style={{
                                  borderRadius: 4,
                                  fontFamily: 'Lato',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  color: '#00000099',
                                  width: 'fit-content',
                                }}
                              />
                              <Typography className={classes.textTruncate}>
                                Hari ini bersama keluarga tersayang liburan ke pantai indah kapuk ditemani dengan kopi
                                kesukaan saya
                              </Typography>
                              <Typography
                                style={{ fontFamily: 'bold', fontFamily: 'Lato', color: '#00000061', fontSize: 12 }}>
                                <span style={{ color: 'black' }}>{moment().format('DD/MM/YY')}</span> |{' '}
                                <span style={{ color: 'black' }}>233</span> Total Laporan
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                      ))}
                    </GridContainer>
                  </ScrollBar>
                  <Stack direction="row" padding="20px 12px" alignItems="flex-end">
                    <Pagination count={1} size="small" shape="rounded" color="secondary" />
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Stack>
        </PageContainer>
      )}
    </>
  );
};

export default DetalPelaporanAkun;
