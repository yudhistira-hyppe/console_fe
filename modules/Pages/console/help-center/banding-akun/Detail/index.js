import React, { useRef, useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Breadcrumbs from '../../bantuan-pengguna/BreadCrumb';
import { Avatar, Box, Chip, Grid, Pagination, Stack, Tab, Tabs } from '@mui/material';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Divider,
  Grow,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import router from 'next/router';
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
  ArrowForward,
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
import ModalDelete from '../Modal/ModalDelete';
import ModalConfirmation from '../Modal/ModalConfirmation';

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

const DetailBandingAkun = () => {
  const { authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [modal, setModal] = useState({
    userReport: false,
    confirmation: false,
    delete: false,
    type: '',
  });
  const classes = useStyles();
  const [updateTicket] = useUpdateDetailTicketMutation();
  const [flagTicket] = useUpdateFlagingTicketMutation();
  const [deleteTicket] = useDeleteTicketMutation();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const { data: detail, isFetching: loadingDetail } = useGetDetailTicketQuery({
    postID: router.query?._id,
    type: 'content',
  });

  const { data: userReports } = useGetReportUserDetailTicketQuery({
    postID: router.query?._id,
    type: 'content',
  });

  const getMediaEndpoint = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
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
          backgroundColor: '#E92A63',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          marginTop: 'auto',
        };
      case 'DITANGGUHKAN':
        return {
          backgroundColor: '#676767',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          marginTop: 'auto',
        };
      case 'TIDAK DITANGGUHKAN':
        return {
          backgroundColor: '#5D9405',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          marginTop: 'auto',
        };
      case 'FLAGING':
        return {
          backgroundColor: '#B457F6',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          marginTop: 'auto',
        };
      default:
        return {
          width: 'fit-content',
        };
    }
  };

  const chipStyle = (status) => {
    switch (status) {
      case 'DALAM PROSES':
        return {
          backgroundColor: '#FFEED9',
          color: '#FF9B21',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          padding: '0 8px',
          height: 30,
        };
      case 'SENSITIF':
        return {
          backgroundColor: '#B457F61A',
          color: '#B457F6D9',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          padding: '0 8px',
          height: 30,
        };
      case 'PULIH':
        return {
          backgroundColor: '#71A5001A',
          color: '#71A500D9',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          padding: '0 8px',
          height: 30,
        };
      case 'HAPUS':
        return {
          backgroundColor: '#6767671A',
          color: '#676767D9',
          fontWeight: 'bold',
          fontFamily: 'Normal',
          width: 'fit-content',
          padding: '0 8px',
          height: 30,
        };
      default:
        return {
          width: 'fit-content',
        };
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenu = (kind) => {
    setModal((prevVal) => {
      switch (kind) {
        case 'sensitif':
          return { ...prevVal, confirmation: !modal.confirmation, type: 'sensitif' };
        case 'tidak ditangguhkan':
          return { ...prevVal, confirmation: !modal.confirmation, type: 'tidak ditangguhkan' };
        case 'ditangguhkan':
          return { ...prevVal, confirmation: !modal.confirmation, type: 'ditangguhkan' };
        case 'hapus':
          return { ...prevVal, delete: !modal.delete };
        default:
      }
    });
    setOpen(false);
  };

  const onConfirmModal = (val) => {
    if (modal.type === 'ditangguhkan' || modal.type === 'tidak ditangguhkan') {
      updateTicket({
        postID: router.query?._id,
        type: 'content',
        reasonId: modal.type === 'ditangguhkan' ? val?._id : undefined,
        reason: modal.type === 'ditangguhkan' ? (val?.reason === 'Lainnya' ? val?.otherReason : val?.reason) : undefined,
        ditangguhkan: modal.type === 'ditangguhkan',
      }).then(() => {
        setModal({ ...modal, confirmation: false, type: '' });
        router.push('/help-center/banding-konten');
      });
    } else if (modal.type === 'sensitif') {
      flagTicket({ postID: router.query?._id, type: 'content' }).then(() => {
        setModal({ ...modal, confirmation: false, type: '' });
        router.push('/help-center/banding-konten');
      });
    } else {
      deleteTicket({ postID: router.query?._id, type: 'content', remark: val }).then(() => {
        setModal({ ...modal, confirmation: false, type: '' });
        router.push('/help-center/banding-konten');
      });
    }
  };

  return (
    <>
      <Head>
        <title key={'title'}>Hyppe-Console :: Detail Banding Akun</title>
      </Head>

      <ViewModal
        showModal={modal.userReport}
        userReports={userReports}
        onClose={() => setModal({ ...modal, userReport: !modal.userReport })}
      />
      <ModalConfirmation
        showModal={modal.confirmation}
        type={modal.type}
        onClose={() => setModal({ ...modal, confirmation: !modal.confirmation })}
        onConfirm={onConfirmModal}
      />
      <ModalDelete
        showModal={modal.delete}
        onClose={() => setModal({ ...modal, delete: !modal.delete })}
        onConfirm={onConfirmModal}
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
            <Grid item xs={12} sm={8} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Stack direction="row" gap="24px">
                <Stack direction="column" gap="25px" my="24px" width="100%">
                  <Stack direction="row" alignItems="center" gap="24px">
                    <Avatar sx={{ width: 70, height: 70 }} />
                    <Stack direction="column">
                      <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Mira</Typography>
                      <Typography>Mira Setiawan</Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap="30px">
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

                  <Stack direction="column" width="100%" maxWidth={320} height="100%" gap="16px">
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        borderBottom: '1px solid #0000001F',
                        paddingBottom: 14,
                        position: 'relative',
                      }}>
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
                </Stack>
                <Paper style={{ padding: '35px 24px', width: '100%', maxWidth: 320, height: '100%' }}>
                  <Stack direction={'column'} justifyContent="center" height="100%" spacing={3}>
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
                      <Typography style={{ padding: '24px 24px 12px', fontWeight: 'bold' }}>
                        Konten Yang Dilaporkan
                      </Typography>
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
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Paper style={{ padding: '25px 16px' }}>
                <Button
                  ref={anchorRef}
                  variant="contained"
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  style={buttonStyle(detail?.data[0]?.reportStatusLast)}
                  onClick={handleToggle}
                  aria-haspopup="true"
                  endIcon={detail?.data[0]?.reportStatusLast === 'BARU' && <KeyboardArrowDown />}
                  disabled={!access.find((item) => item?.nameModule === 'help_appeal_users')?.acces?.updateAcces}>
                  {detail?.data[0]?.reportStatusLast === 'FLAGING'
                    ? 'Ditandai Sensitif'
                    : detail?.data[0]?.reportStatusLast === 'TIDAK DITANGGUHKAN'
                    ? 'Dipulihkan'
                    : detail?.data[0]?.reportStatusLast === 'DITANGGUHKAN'
                    ? 'Ditangguhkan'
                    : 'Baru'}
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" transition>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}>
                      <Paper elevation={3}>
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                          <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
                            <MenuItem onClick={() => handleMenu('sensitif')}>
                              <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography style={{ fontSize: 12, width: 180 }}>Konten User Tetap Sensitif</Typography>
                                <Stack direction="row" alignItems="center" gap="15px" justifyContent="flex-start">
                                  <ArrowForward style={{ fontSize: 16 }} />
                                  <Chip label="Ditandai Sensitif" size="small" style={chipStyle('SENSITIF')} />
                                </Stack>
                              </Stack>
                            </MenuItem>
                            <MenuItem onClick={() => handleMenu('tidak ditangguhkan')}>
                              <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography style={{ fontSize: 12, width: 180 }}>Konten User Dipulihkan</Typography>
                                <Stack direction="row" alignItems="center" gap="15px" justifyContent="flex-start">
                                  <ArrowForward style={{ fontSize: 16 }} />
                                  <Chip label="Dipulihkan" size="small" style={chipStyle('PULIH')} />
                                </Stack>
                              </Stack>
                            </MenuItem>
                            <MenuItem onClick={() => handleMenu('ditangguhkan')}>
                              <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography style={{ fontSize: 12, width: 180 }}>Konten User Ditangguhkan</Typography>
                                <Stack direction="row" alignItems="center" gap="15px" justifyContent="flex-start">
                                  <ArrowForward style={{ fontSize: 16 }} />
                                  <Chip label="Ditangguhkan" size="small" style={chipStyle('HAPUS')} />
                                </Stack>
                              </Stack>
                            </MenuItem>
                            <MenuItem onClick={() => handleMenu('hapus')}>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" height={30}>
                                <Typography style={{ fontSize: 12, width: 180 }}>Konten User Dihapus</Typography>
                                <Stack direction="row" alignItems="center" gap="15px" justifyContent="flex-start">
                                  <ArrowForward style={{ fontSize: 16 }} />
                                  <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>Dihapus</Typography>
                                </Stack>
                              </Stack>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>

                <Stack direction="column" mt={3} gap="8px">
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography style={{ color: '#737373', fontSize: 14 }}>Diunggah Pada</Typography>
                    <Typography style={{ fontSize: 12 }}>
                      {moment(detail?.data[0]?.createdAt).utc().format('DD/MM/YYYY - HH:mm')} WIB
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography style={{ color: '#737373', fontSize: 14 }}>Tanggal Pengajuan</Typography>
                    <Typography style={{ fontSize: 12 }}>
                      {moment(detail?.data[0]?.createdAtAppealLast).utc().format('DD/MM/YYYY - HH:mm')} WIB
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography style={{ color: '#737373', fontSize: 14 }}>Tipe Konten</Typography>
                    <Typography style={{ fontSize: 12 }}>Hyppe{detail?.data[0]?.postType}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography style={{ color: '#737373', fontSize: 14 }}>Tipe Pelanggaran</Typography>
                    <Typography
                      style={{
                        fontSize: 12,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: 230,
                        overflow: 'hidden',
                      }}>
                      {detail?.data[0]?.reasonLastReport || '-'}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography style={{ color: '#737373', fontSize: 14 }}>Alasan Banding</Typography>
                    <Typography style={{ fontSize: 12 }}>{detail?.data[0]?.reasonLastAppeal || '-'}</Typography>
                  </Stack>
                </Stack>
              </Paper>

              <Card style={{ padding: '20px' }}>
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
                          onClick={() => setModal({ ...modal, userReport: !modal.userReport })}>
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

              <Paper style={{ width: '100%' }}>
                <Stack direction="column" height="100%">
                  <Typography style={{ padding: 24, fontWeight: 'bold', borderBottom: '1px solid #0000001F' }}>
                    Informasi Pengguna Akun
                  </Typography>
                  <GridContainer style={{ padding: 20, height: '100%', flexGrow: 1 }}>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems="center" gap="12px" height="100%">
                        <DateRange style={{ fontSize: 36, color: '#666666' }} />
                        <Stack direction="column">
                          <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                            Waktu Akan Ditangguhkan
                          </Typography>
                          <Typography>{moment().format('DD/MM/YYYY - HH:mm')} WIB</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems="center" gap="12px" height="100%">
                        <LocationCity style={{ fontSize: 36, color: '#666666' }} />
                        <Stack direction="column">
                          <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>Lokasi</Typography>
                          <Typography>Bogor, Jawa Barat, Indonesia</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems="center" gap="12px" height="100%">
                        <DateRange style={{ fontSize: 36, color: '#666666' }} />
                        <Stack direction="column">
                          <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                            Waktu Permohonan Banding
                          </Typography>
                          <Typography>{moment().format('DD/MM/YYYY - HH:mm')} WIB</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
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
            </Grid>
          </GridContainer>
        </PageContainer>
      )}
    </>
  );
};

export default DetailBandingAkun;
