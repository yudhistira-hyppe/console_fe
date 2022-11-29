import React, { useRef, useState } from 'react';
import Head from 'next/head';
import Breadcrumbs from '../../bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { Button, CardContent, CardHeader, CardMedia, Chip, Divider, Grid, Paper, Stack } from '@mui/material';
import { ClickAwayListener, Grow, MenuItem, MenuList, Popper, Typography } from '@material-ui/core';
import router from 'next/router';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { AccountCircle, ArrowForward, DateRange, Email, HowToReg, KeyboardArrowDown } from '@material-ui/icons';
import moment from 'moment';
import { GraphIndicator } from '../../components';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import ViewModal from '../Modal/ViewModal';
import ModalConfirmation from '../Modal/ModalConfirmation';
import ModalDelete from '../Modal/ModalDelete';
import {
  useDeleteTicketMutation,
  useGetDetailTicketQuery,
  useGetReportUserDetailTicketQuery,
  useUpdateDetailTicketMutation,
  useUpdateFlagingTicketMutation,
} from 'api/console/helpCenter/iklan';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Permohonan Iklan Moderasi', link: '/help-center/banding-iklan' },
  { label: 'Rincian Iklan Banding', isActive: true },
];

const DetailBandingIklan = () => {
  const { authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [modal, setModal] = useState({
    userReport: false,
    confirmation: false,
    delete: false,
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const [updateTicket] = useUpdateDetailTicketMutation();
  const [flagTicket] = useUpdateFlagingTicketMutation();
  const [deleteTicket] = useDeleteTicketMutation();

  const { data: detail, isFetching: loadingDetail } = useGetDetailTicketQuery({
    postID: router.query?._id,
    type: 'ads',
  });

  const { data: userReports } = useGetReportUserDetailTicketQuery({
    postID: router.query?._id,
    type: 'ads',
  });

  const getMediaEndpoint = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
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
        return {};
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
        return {};
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
    setLoading(true);
    if (modal.type === 'ditangguhkan' || modal.type === 'tidak ditangguhkan') {
      updateTicket({
        postID: router.query?._id,
        type: 'ads',
        reasonId: modal.type === 'ditangguhkan' ? val?._id : undefined,
        reason: modal.type === 'ditangguhkan' ? (val?.reason === 'Lainnya' ? val?.otherReason : val?.reason) : undefined,
        ditangguhkan: modal.type === 'ditangguhkan',
      }).then(() => {
        setLoading(false);
        setModal({ ...modal, confirmation: false, type: '' });
        router.push('/help-center/banding-iklan');
      });
    } else if (modal.type === 'sensitif') {
      flagTicket({ postID: router.query?._id, type: 'ads' }).then(() => {
        setLoading(false);
        setModal({ ...modal, confirmation: false, type: '' });
        router.push('/help-center/banding-iklan');
      });
    } else {
      deleteTicket({ postID: router.query?._id, type: 'ads', remark: val }).then(() => {
        setLoading(false);
        setModal({ ...modal, confirmation: false, type: '' });
        router.push('/help-center/banding-iklan');
      });
    }
  };

  return (
    <>
      <Head>
        <title key={'title'}>Hyppe-Console :: Detail Banding Konten</title>
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
        loading={loading}
      />
      <ModalDelete
        showModal={modal.delete}
        onClose={() => setModal({ ...modal, delete: !modal.delete })}
        onConfirm={onConfirmModal}
        loading={loading}
      />

      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/help-center/banding-iklan')}
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
        <PageContainer heading="">
          <GridContainer>
            <Grid item xs={12} sm={8}>
              <Typography style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
                {detail?.data[0]?.reasonLastAppeal || '-'}
              </Typography>
              <Typography style={{ fontSize: 14 }}>{detail?.data[0]?.reportedUserHandle[0]?.remark || '-'}</Typography>

              <Stack direction="column" mt={5}>
                <CardMedia component="img" height="500px" image={getImage(detail?.data[0])} style={{ borderRadius: 4 }} />
                <CardContent style={{ padding: '20px 0 0' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Chip
                      label={`${detail?.data[0]?.place}-Hyppe${detail?.data[0]?.type === 'video' ? 'Vid' : 'Pict'}`}
                      style={{ borderRadius: 4, fontFamily: 'Lato', fontSize: 12, color: '#00000099', fontWeight: 'bold' }}
                      size="small"
                    />
                    <Typography variant="body2">
                      Penggunaan Kredit: {numberWithCommas(detail?.data[0]?.totalUsedCredit)} /{' '}
                      {numberWithCommas(detail?.data[0]?.totalCredit)}
                    </Typography>
                  </Stack>
                  <Stack direction="column" gap="8px" mt={1}>
                    <Typography>{detail?.data[0]?.name || '-'}</Typography>
                    <Typography variant="caption" style={{ color: '#00000099' }}>
                      {detail?.data[0]?.name || '-'}
                    </Typography>
                    <Stack direction={'row'} spacing={1}>
                      {detail?.data[0]?.interest?.map((item, key) => (
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
                      ))}
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
                  onClick={detail?.data[0]?.reportStatusLast === 'BARU' ? () => handleToggle() : () => {}}
                  aria-haspopup="true"
                  endIcon={detail?.data[0]?.reportStatusLast === 'BARU' && <KeyboardArrowDown />}>
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
                      {moment(detail?.data[0]?.timestamp).utc().format('DD/MM/YYYY - HH:mm')} WIB
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
                    <Typography style={{ fontSize: 12 }}>{detail?.data[0]?.nameType || '-'}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography style={{ color: '#737373', fontSize: 14 }}>Tipe Pelanggaran</Typography>
                    <Typography style={{ fontSize: 12 }}>{detail?.data[0]?.reasonLastReport || '-'}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography style={{ color: '#737373', fontSize: 14 }}>Alasan Banding</Typography>
                    <Typography style={{ fontSize: 12 }}>{detail?.data[0]?.reasonLastAppeal || '-'}</Typography>
                  </Stack>
                </Stack>
              </Paper>

              <Paper style={{ padding: '20px' }}>
                <Stack direction="column" height="100%" spacing={2}>
                  <Stack direction="row" justifyContent={'space-between'}>
                    <Typography variant="h2" style={{ fontWeight: 'bold' }}>
                      Laporan
                    </Typography>
                    {/* <div style={{ padding: '2px 5px', borderRadius: '4px', border: 'solid gray 1px' }}>
                      <Typography variant="body2">Semua</Typography>
                    </div> */}
                  </Stack>

                  <Stack direction={'row'} gap="14px">
                    <Stack direction={'column'} justifyContent={'space-between'} flex={1}>
                      <Stack spacing={1}>
                        <Typography variant="h2">{detail?.dataSum?.length}</Typography>
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
                      {detail?.dataSum.length >= 1 ? (
                        <Stack height={200}>
                          <GraphIndicator data={detail?.dataSum} />
                        </Stack>
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
                </Stack>
              </Paper>

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
                        <Email style={{ color: '#666666' }} />
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
                        <AccountCircle style={{ color: '#666666' }} />
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

export default DetailBandingIklan;
