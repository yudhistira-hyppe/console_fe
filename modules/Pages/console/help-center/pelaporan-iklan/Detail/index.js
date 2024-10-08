import React, { useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Breadcrumbs from '../../bantuan-pengguna/BreadCrumb';
import { Chip, Grid, Stack } from '@mui/material';

import { Avatar, Button, Card, CardContent, Divider, Link, Paper, Typography } from '@material-ui/core';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import UserIcon from '@material-ui/icons/PersonOutlined';
import CircledUserIcon from '@material-ui/icons/AccountCircleRounded';
import CardMedia from '@material-ui/core/CardMedia';
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
} from 'api/console/helpCenter/iklan';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import GridContainer from '@jumbo/components/GridContainer';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { DateRange, HowToReg } from '@material-ui/icons';
import moment from 'moment';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Pelaporan Iklan', link: '/help-center/pelaporan-iklan' },
  { label: 'Rincian Iklan', isActive: true },
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

const DetailPelaporanIklan = () => {
  const router = useRouter();
  const { authUser } = useAuth();
  const [showModal, setShowModal] = useState({
    show: false,
    type: null,
    modalType: null,
  });
  const [loading, setLoading] = useState(false);
  const [updateTicket] = useUpdateDetailTicketMutation();
  const [flagTicket] = useUpdateFlagingTicketMutation();
  const [deleteTicket] = useDeleteTicketMutation();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const { data: detail, isFetching: loadingDetail } = useGetDetailTicketQuery({
    postID: router.query?._id,
    type: 'ads',
  });

  const { data: userReports } = useGetReportUserDetailTicketQuery({
    postID: router.query?._id,
    type: 'ads',
  });

  const showModalHandler = (data) => {
    setShowModal({
      show: true,
      type: data.type,
      modalType: data.modalType,
    });
  };

  const onCloseModal = () => {
    setShowModal({
      show: false,
      type: null,
      modalType: null,
    });
  };

  const onConfirmModal = (val) => {
    setLoading(true);
    if (showModal?.type === 'ditangguhkan' || showModal?.type === 'tidak ditangguhkan') {
      updateTicket({
        postID: router.query?._id,
        type: 'ads',
        reasonId: showModal?.type === 'ditangguhkan' ? val?._id : undefined,
        reason:
          showModal?.type === 'ditangguhkan' ? (val?.reason === 'Lainnya' ? val?.otherReason : val?.reason) : undefined,
        ditangguhkan: showModal?.type === 'ditangguhkan',
      }).then(() => {
        setLoading(false);
        onCloseModal();
        router.push('/help-center/pelaporan-iklan');
      });
    } else if (showModal?.type === 'sensitif') {
      flagTicket({ postID: router.query?._id, type: 'ads' }).then(() => {
        setLoading(false);
        onCloseModal();
        router.push('/help-center/pelaporan-iklan');
      });
    } else {
      deleteTicket({ postID: router.query?._id, type: 'ads', remark: val }).then(() => {
        setLoading(false);
        onCloseModal();
        router.push('/help-center/pelaporan-iklan');
      });
    }
  };

  const getMediaEndpoint = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  const getImage = (item) => {
    if (item?.apsara || item?.apsaraId) {
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
        return { width: 'fit-content' };
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
        loading={loading}
      />
      <DeleteModal
        showModal={showModal.show && showModal.modalType === 'delete'}
        onClose={onCloseModal}
        onConfirm={onConfirmModal}
        loading={loading}
      />
      <ViewModal
        userReports={userReports}
        showModal={showModal.show && showModal.modalType === 'view'}
        onClose={onCloseModal}
      />

      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/help-center/pelaporan-iklan')}
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
                      ? 'Ditangguhkan'
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
                      disabled={
                        detail?.data[0]?.reportStatusLast !== 'BARU' ||
                        !access.find((item) => item?.nameModule === 'help_ads')?.acces?.updateAcces
                      }>
                      Tidak Ditangguhkan
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => showModalHandler({ type: 'ditangguhkan', modalType: 'confirmation' })}
                      disabled={
                        detail?.data[0]?.reportStatusLast !== 'BARU' ||
                        !access.find((item) => item?.nameModule === 'help_ads')?.acces?.updateAcces
                      }>
                      Tangguhkan
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => showModalHandler({ type: 'sensitif', modalType: 'confirmation' })}
                      disabled={
                        detail?.data[0]?.reportStatusLast !== 'BARU' ||
                        !access.find((item) => item?.nameModule === 'help_ads')?.acces?.updateAcces
                      }>
                      Ditandai Sensitif
                    </Button>
                  </Stack>

                  <Stack direction={'column'} spacing={2} mt={5}>
                    <Typography>
                      Ingin dihapus?{' '}
                      <Link
                        style={{ fontWeight: 'bold', cursor: 'pointer', textDecorationLine: 'none' }}
                        onClick={() =>
                          access.find((item) => item?.nameModule === 'help_ads')?.acces?.deleteAcces
                            ? showModalHandler({ type: 'delete', modalType: 'delete' })
                            : alert('kamu tidak memiliki akses!')
                        }>
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
            <Grid item xs={12} sm={8}>
              <Card>
                <CardMedia
                  component="img"
                  height="500px"
                  image={getImage(detail?.data[0])}
                  title="YouTube video player"
                  alt="green-iguana"
                />
                <CardContent style={{ paddingBottom: 16 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Chip
                      label={`${detail?.data[0]?.place ? detail?.data[0]?.place + '-' : ''}Hyppe${
                        detail?.data[0]?.type === 'video' ? 'Vid' : 'Pict'
                      }`}
                      style={{ borderRadius: 4, fontFamily: 'Lato', fontSize: 12, color: '#00000099', fontWeight: 'bold' }}
                      size="small"
                    />
                    <Typography variant="body2">
                      Penggunaan Kredit: {detail?.data[0]?.totalUsedCredit} / {detail?.data[0]?.totalCredit}
                    </Typography>
                  </Stack>
                  <Stack direction="column" mt={1}>
                    <Typography>{detail?.data[0]?.name}</Typography>
                    <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.18)' }}>
                      {detail?.data[0]?.name}
                    </Typography>
                    <Stack direction={'row'} spacing={1} mt={2} gap="8px" flexWrap="wrap">
                      {detail?.data[0]?.interest?.map(
                        (item, key) =>
                          key < 3 && (
                            <Chip
                              label={item?.interestName}
                              key={key}
                              style={{
                                borderRadius: 4,
                                fontFamily: 'Lato',
                                fontSize: 12,
                                color: '#00000099',
                                fontWeight: 'bold',
                              }}
                            />
                          ),
                      )}
                      {detail?.data[0]?.interest?.length - 3 > 0 && (
                        <Chip
                          label={`+ ${detail?.data[0]?.interest?.length - 3} Interest Lainnya`}
                          style={{
                            borderRadius: 4,
                            fontFamily: 'Lato',
                            fontSize: 12,
                            color: '#00000099',
                            fontWeight: 'bold',
                          }}
                        />
                      )}
                    </Stack>
                  </Stack>
                  <Stack direction="column" spacing={2} mt={3}>
                    <Typography style={{ fontSize: 14, fontFamily: 'Lato' }}>
                      {detail?.data[0]?.totalView} <span style={{ color: '#00000061' }}>Dilihat |</span>{' '}
                      {detail?.data[0]?.totalClick} <span style={{ color: '#00000061' }}>Diklik</span>
                    </Typography>
                    <Typography variant="body2" style={{ fontFamily: 'bold', fontFamily: 'Lato', color: '#00000061' }}>
                      {moment(detail?.data[0]?.timestamp).utc().format('DD/MM/YYYY - HH:mm')} WIB
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" alignItems="center" spacing={3} mb={4}>
                <Avatar src={getMediaUri(detail?.data[0]?.avatar?.mediaEndpoint)} style={{ width: 80, height: 80 }} />
                <Stack direction="column" gap="5px">
                  <Typography variant="h1">{detail?.data[0]?.fullName || '-'}</Typography>
                  <Typography variant="h5" style={{ color: '#00000099' }}>
                    {detail?.data[0]?.username || '-'}
                  </Typography>
                </Stack>
              </Stack>
              <Paper style={{ padding: '35px 24px' }}>
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
                        <EmailIcon style={{ color: '#666666' }} />
                      </span>
                    </div>

                    <Stack>
                      <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                        Email
                      </Typography>
                      <Typography>{detail?.data[0]?.email}</Typography>
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
                      <Typography>
                        {moment(detail?.data[0]?.proofpict[0]?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB
                      </Typography>
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
                      <Typography>{detail?.data[0]?.statusUser}</Typography>
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
                        <CircledUserIcon style={{ color: '#666666' }} />
                      </span>
                    </div>

                    <Stack>
                      <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                        Nama Sesuai KTP
                      </Typography>
                      <Typography>{detail?.data[0]?.proofpict[0]?.nama || detail?.data[0]?.fullName}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </GridContainer>
        </PageContainer>
      )}
    </>
  );
};

export default DetailPelaporanIklan;
