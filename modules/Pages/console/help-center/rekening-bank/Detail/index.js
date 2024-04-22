import React, { useEffect, useState } from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import Head from 'next/head';
import Breadcrumbs from '../../bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';
import router, { useRouter } from 'next/router';
import {
  AccountBalance,
  AccountCircle,
  Cake,
  CheckCircleRounded,
  ContactMail,
  CreditCard,
  DateRange,
  Email,
  EmailOutlined,
  HowToReg,
  LocationCity,
  LocationOn,
  PhoneIphone,
  Wc,
} from '@material-ui/icons';
import GridContainer from '@jumbo/components/GridContainer';
import ModalApprove from '../modal/modal-approve';
import ModalReject from '../modal/modal-reject';
import { useGetDetailBankQuery, useUpdateStatusBankMutation } from 'api/console/helpCenter/bank';
import { useGetuserDatabaseDetailQuery } from 'api/console/database';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import moment from 'moment';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { toast } from 'react-hot-toast';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Rekening Bank', link: '/help-center/rekening-bank' },
  { label: 'Rincian Bank', isActive: true },
];

const DetailRekeningBank = () => {
  const [modal, setModal] = useState({
    approve: false,
    reject: false,
    lampiran: false,
  });
  const [selectedLampiran, setSelectedLampiran] = useState({});
  const [viewer, setViewer] = useState('');
  const [dataView, setDataView] = useState([]);
  const router = useRouter();
  const { authUser } = useAuth();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const [approvalBank, { isLoading: loadingApproval }] = useUpdateStatusBankMutation();
  const { data: detailBank, isLoading: loadingDetail } = useGetDetailBankQuery(router.query._id);
  const { data: insightUser, isLoading: loadingInsight } = useGetuserDatabaseDetailQuery(
    loadingDetail ? '' : detailBank?.data?.userId,
  );

  useEffect(() => {
    if (!loadingDetail && !loadingInsight) {
      if (detailBank?.data?.dokumenPendukung?.length >= 1) {
        setViewer(new Viewer(document.getElementById('images'), { toolbar: false, navbar: false }));
      }
    }
  }, [loadingDetail, loadingInsight]);

  useEffect(() => {
    if (isEmpty(localStorage.getItem(`approve-bank-${router.query?._id}`)) && detailBank) {
      setDataView(
        detailBank?.data?.dokumenPendukung?.map((item) => {
          return {
            name: item,
            isView: false,
          };
        }),
      );
    } else {
      setDataView(JSON.parse(localStorage.getItem(`approve-bank-${router.query?._id}`)));
    }
  }, [detailBank]);

  useEffect(() => {
    if (dataView?.length >= 1) {
      localStorage.setItem(`approve-bank-${router.query?._id}`, JSON.stringify(dataView));
    }
  }, [dataView]);

  const handleView = () => {
    return viewer.toggle();
  };

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getImage = (mediaEndpoint, key) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('/');

    return endpoint.includes('supportfile')
      ? `${STREAM_URL}/${endpoint[1]}/${endpoint[2]}/${detailBank?.data?._id}/${key}${authToken}`
      : `${STREAM_URL}/${endpoint[1]}/${detailBank?.data?._id}${authToken}`;
  };

  const blurNumberCard = (item) => {
    const number = item?.split('');
    let blurredNumber = [];

    number?.map((n, idx) => {
      if (idx < number?.length - 3) {
        blurredNumber.push('*');
      } else {
        blurredNumber.push(n);
      }
    });

    return blurredNumber.join('');
  };

  const blurUsername = (item) => {
    const name = item?.split('');
    let blurredName = [];

    name?.map((n, idx) => {
      if (idx > 2 && idx < name.length - 2) {
        blurredName.push('*');
      } else {
        blurredName.push(n);
      }
    });

    return blurredName.join('');
  };

  const handleApproval = (approve, payload) => {
    const data = {
      id: detailBank?.data?._id,
      disetujui: approve,
      iduserhandle: authUser?.user?.id,
      reason: payload ? payload.reason : undefined,
      reasonId: payload ? payload._id : undefined,
    };

    toast.loading('Loading...', { id: 'approval' });

    approvalBank(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: 'approval', duration: 3000 });
      } else {
        router.replace('/help-center/rekening-bank', { id: 'approval' });
        approve
          ? toast.success('Berhasil Menyetujui Rekening User', { id: 'approval', duration: 3000 })
          : toast.success('Berhasil Menolak Rekening User', { id: 'approval', duration: 3000 });
      }
    });
  };

  return (
    <>
      <Head>
        <title key={'title'}>Hyppe-Console :: Rincian Bank</title>
      </Head>

      <ModalApprove
        showModal={modal.approve}
        onClose={() => setModal({ ...modal, approve: !modal.approve })}
        onConfirm={() => handleApproval(true)}
        loading={loadingApproval}
      />
      <ModalReject
        showModal={modal.reject}
        onClose={() => {
          setModal({ ...modal, reject: !modal.reject });
          setSelectedLampiran({});
        }}
        onConfirm={(val) => handleApproval(false, val)}
        loading={loadingApproval}
      />

      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/help-center/rekening-bank')}
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

      {loadingDetail || loadingInsight ? (
        <PageLoader />
      ) : (
        <PageContainer heading="">
          <Stack direction="row" flexWrap="nowrap" gap="24px" mb="24px">
            <Paper style={{ width: '100%' }}>
              <Stack direction="column" height="100%">
                <Stack direction="row" alignItems="center" gap={2} borderBottom="1px solid #0000001F" padding="24px">
                  <Typography style={{ fontWeight: 'bold' }}>Informasi Bank Pengguna</Typography>
                  {detailBank?.data?.statusLast === 'BARU' && (
                    <Chip
                      label="Baru"
                      style={{
                        backgroundColor: '#E6094B1A',
                        color: '#E6094BD9',
                        fontWeight: 700,
                        fontSize: 14,
                        height: 26,
                      }}
                    />
                  )}
                  {detailBank?.data?.statusLast === 'DISETUJUI' && (
                    <Chip
                      label="Disetujui"
                      style={{
                        backgroundColor: '#71A5001A',
                        color: '#71A500D9',
                        fontWeight: 700,
                        fontSize: 14,
                        height: 26,
                      }}
                    />
                  )}
                  {detailBank?.data?.statusLast === 'DITOLAK' && (
                    <Chip
                      label="Ditolak"
                      style={{
                        backgroundColor: 'rgba(103, 103, 103, 0.1)',
                        color: '#676767',
                        fontWeight: 700,
                        fontSize: 14,
                        height: 26,
                      }}
                    />
                  )}
                </Stack>

                <Stack direction="column" justifyContent="center" spacing={3} height="100%" padding="35px 24px">
                  <Stack direction="row" spacing={3}>
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
                        <AccountBalance style={{ color: '#00000061' }} />
                      </span>
                    </div>

                    <Stack>
                      <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                        Nama Bank
                      </Typography>
                      <Typography>{detailBank?.data?.bankRek || '-'}</Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={3}>
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
                        <CreditCard style={{ color: '#00000061' }} />
                      </span>
                    </div>

                    <Stack>
                      <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                        Nomor Rekening
                      </Typography>
                      <Typography>{detailBank?.data?.noRek}</Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={3}>
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
                        <ContactMail style={{ color: '#00000061' }} />
                      </span>
                    </div>

                    <Stack>
                      <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                        Nama Pemilik Rekening
                      </Typography>
                      <Typography>{detailBank?.data?.namaRek || '-'}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>

            <Stack direction="column" width="100%">
              <Stack direction="row" alignItems="center" gap="25px" mb="24px">
                <Avatar src={getMediaUri(detailBank?.data?.avatar?.mediaEndpoint)} sx={{ width: 70, height: 70 }} />
                <Stack direction="column">
                  <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>{detailBank?.data?.username || '-'}</Typography>
                  <Typography>{detailBank?.data?.fullName || '-'}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" ml="auto" gap="30px">
                  <Stack direction="column" alignItems="center">
                    <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>
                      {numberWithCommas(insightUser?.[0]?.insights?.followers || 0)}
                    </Typography>
                    <Typography style={{ color: '#00000099', fontSize: 14 }}>Pengikut</Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack direction="column" alignItems="center">
                    <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>
                      {numberWithCommas(insightUser?.[0]?.insights?.followings || 0)}
                    </Typography>
                    <Typography style={{ color: '#00000099', fontSize: 14 }}>Mengikuti</Typography>
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack direction="column" alignItems="center">
                    <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>
                      {numberWithCommas(insightUser?.[0]?.friend || 0)}
                    </Typography>
                    <Typography style={{ color: '#00000099', fontSize: 14 }}>Teman</Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Paper style={{ padding: '35px 24px', width: '100%' }}>
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
                        <EmailOutlined style={{ color: '#666666' }} />
                      </span>
                    </div>

                    <Stack>
                      <Typography style={{ color: '#00000099', fontSize: 12 }}>Email</Typography>
                      <Typography style={{ color: 'black' }}>{detailBank?.data?.email || '-'}</Typography>
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
                      <Typography style={{ color: '#00000099', fontSize: 12 }}>Waktu Pendaftaran</Typography>
                      <Typography style={{ color: 'black' }}>
                        {moment(insightUser?.[0]?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB
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
                        <AccountCircle style={{ color: '#666666' }} />
                      </span>
                    </div>

                    <Stack>
                      <Typography style={{ color: '#00000099', fontSize: 12 }}>Nama Sesuai KTP</Typography>
                      <Typography style={{ color: 'black' }}>{detailBank?.data?.namaKTP || '-'}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Stack>

          <Stack direction="row" flexWrap="nowrap" gap="24px" mb="24px">
            <Paper style={{ width: '100%', maxWidth: 320 }}>
              <Stack direction="column" height="100%">
                <Stack direction="row" p={3} style={{ borderBottom: '1px solid #0000001F' }}>
                  <Typography style={{ fontWeight: 'bold' }}>Tingkat Kesamaan Nama</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center" height="100%" width="100%">
                  <Typography style={{ fontSize: 26, fontWeight: 'bold', color: '#666666' }}>45%</Typography>
                </Stack>
              </Stack>
            </Paper>

            <Paper style={{ width: '100%' }}>
              <Stack direction="column" height="100%">
                <Typography style={{ padding: 24, fontWeight: 'bold', borderBottom: '1px solid #0000001F' }}>
                  Informasi Pengguna Akun
                </Typography>
                <Stack direction="row" alignItems="flex-start" height={260} p={3}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                      <Stack direction="row" alignItems="center" gap="12px">
                        <LocationOn style={{ fontSize: 36, color: '#00000061' }} />
                        <Stack direction="column">
                          <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                            Tempat Lahir
                          </Typography>
                          <Typography>{insightUser?.[0]?.tempatLahir || '-'}</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack direction="row" alignItems="center" gap="12px">
                        <Cake style={{ fontSize: 36, color: '#00000061' }} />
                        <Stack direction="column">
                          <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                            Tanggal Lahir
                          </Typography>
                          <Typography>{dayjs(insightUser?.[0]?.dob).format('DD/MM/YY') || '-'}</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack direction="row" alignItems="center" gap="12px">
                        <Wc style={{ fontSize: 36, color: '#00000061' }} />
                        <Stack direction="column">
                          <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                            Jenis Kelamin
                          </Typography>
                          <Typography>
                            {insightUser?.[0]?.gender === 'MALE' && 'Laki-laki'}
                            {insightUser?.[0]?.gender === 'FEMALE' && 'Perempuan'}
                            {insightUser?.[0]?.gender === 'OTHER' && 'Lainnya'}
                            {!insightUser?.[0]?.gender && '-'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack direction="row" alignItems="center" gap="12px">
                        <PhoneIphone style={{ fontSize: 36, color: '#00000061' }} />
                        <Stack direction="column">
                          <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                            Nomor Telepon
                          </Typography>
                          <Typography>{insightUser?.[0]?.mobileNumber || '-'}</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack direction="row" alignItems="center" gap="12px">
                        <LocationCity style={{ fontSize: 36, color: '#00000061' }} />
                        <Stack direction="column">
                          <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>Lokasi</Typography>
                          <Typography>
                            {insightUser?.[0]?.states || '-'}, {insightUser?.[0]?.countries || '-'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </Paper>
          </Stack>

          <Stack direction="row" flexWrap="nowrap" gap="24px" mb="24px">
            <Paper style={{ width: '100%' }}>
              <Stack direction="column" height="100%">
                <Typography style={{ padding: 24, fontWeight: 'bold', borderBottom: '1px solid #0000001F' }}>
                  Dokumen Pendukung
                </Typography>

                <Stack direction="column" p="24px" gap="24px">
                  <div>
                    {detailBank?.data?.dokumenPendukung?.length >= 1 ? (
                      <Stack direction="row" id="images">
                        <ImageList sx={{ width: '100%' }} gap={8} cols={6} rowHeight={180}>
                          {detailBank?.data?.dokumenPendukung?.map((item, key) => (
                            <ImageListItem
                              key={key}
                              style={{
                                position: 'relative',
                                border: '1px solid #EEEEEE',
                                borderRadius: 12,
                                overflow: 'hidden',
                              }}>
                              <Avatar
                                variant="rounded"
                                src={getImage(item, key)}
                                srcSet={getImage(item, key)}
                                onClick={() => handleView(item)}
                                alt="X"
                                style={{ height: '100%', width: '100%', cursor: 'pointer' }}
                              />

                              <Box sx={{ position: 'absolute', top: '8px', left: '8px' }}>
                                <Chip
                                  label={
                                    <Typography style={{ fontSize: 12, letterSpacing: 0 }}>
                                      {dataView?.find((dw) => dw?.name === item)?.isView ? 'Dilihat' : 'Belum dilihat'}
                                    </Typography>
                                  }
                                  style={{ color: 'white', height: '26px', borderRadius: 8 }}
                                />
                              </Box>
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </Stack>
                    ) : (
                      <Stack direction="column" alignItems="center" justifyContent="center" height={180}>
                        <Typography style={{ fontSize: 14 }}>Tidak ada dokumen pendukung</Typography>
                      </Stack>
                    )}
                  </div>
                </Stack>
              </Stack>
            </Paper>
          </Stack>

          <Stack direction="row" justifyContent="flex-start" gap={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setModal({ ...modal, approve: !modal.approve })}
              disabled={
                !access.find((item) => item?.nameModule === 'help_bank')?.acces?.updateAcces ||
                dataView?.map((item) => (item?.isView ? 'true' : 'false')).includes('false') ||
                detailBank?.data?.statusLast !== 'BARU'
              }>
              Setujui
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setModal({ ...modal, reject: !modal.reject })}
              disabled={
                !access.find((item) => item?.nameModule === 'help_bank')?.acces?.updateAcces ||
                dataView?.map((item) => (item?.isView ? 'true' : 'false')).includes('false') ||
                detailBank?.data?.statusLast !== 'BARU'
              }>
              Tolak
            </Button>
          </Stack>
        </PageContainer>
      )}
    </>
  );
};

export default DetailRekeningBank;
