import React, { useEffect, useState } from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import {
  Avatar,
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
  HowToReg,
  LocationCity,
  LocationOn,
  PhoneIphone,
  Wc,
} from '@material-ui/icons';
import GridContainer from '@jumbo/components/GridContainer';
import ModalApprove from '../Modal/ModalApprove';
import ModalReject from '../Modal/ModalReject';
import ModalLampiran from '../Modal/ModalLampiran';
import { useGetDetailBankQuery, useUpdateStatusBankMutation } from 'api/console/helpCenter/bank';
import { useGetuserDatabaseDetailQuery } from 'api/user/user';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import moment from 'moment';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { toast } from 'react-hot-toast';

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
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
  const router = useRouter();
  const { authUser } = useAuth();
  const [approvalBank, { isLoading: loadingApproval }] = useUpdateStatusBankMutation();

  const { data: detailBank, isLoading: loadingDetail } = useGetDetailBankQuery(router.query._id);
  const { data: insightUser, isLoading: loadingInsight } = useGetuserDatabaseDetailQuery(
    loadingDetail ? '' : detailBank?.data?.userId,
  );

  useEffect(() => {
    !loadingDetail && !loadingInsight && setViewer(new Viewer(document.getElementById('images')));
  }, [loadingDetail, loadingInsight]);

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
      <ModalLampiran
        showModal={modal.lampiran}
        data={selectedLampiran}
        onClose={() => setModal({ ...modal, lampiran: !modal.lampiran })}
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
          <Stack direction="row" alignItems="center" gap="25px" mb="24px">
            <Avatar src={getMediaUri(detailBank?.data?.avatar?.mediaEndpoint)} sx={{ width: 70, height: 70 }} />
            <Stack direction="column">
              <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>{detailBank?.data?.fullName || '-'}</Typography>
              <Typography>{detailBank?.data?.username || '-'}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" ml="auto" gap="30px">
              <Stack direction="column" alignItems="center">
                <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {numberWithCommas(insightUser?.[0]?.insights?.followers)}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>Pengikut</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="column" alignItems="center">
                <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {numberWithCommas(insightUser?.[0]?.insights?.followings)}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>Mengikuti</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="column" alignItems="center">
                <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {numberWithCommas(insightUser?.[0]?.friend)}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>Teman</Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" flexWrap="nowrap" gap="24px" mb="24px">
            <Paper style={{ padding: '35px 24px', width: '100%', maxWidth: 320 }}>
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
                    <Typography>{detailBank?.data?.email || '-'}</Typography>
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
                    <Typography>{moment(insightUser?.[0]?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB</Typography>
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
                    <Typography>{insightUser?.[0]?.statusUser}</Typography>
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
                    <Typography>{detailBank?.data?.namaKTP || '-'}</Typography>
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
                        <Typography>{insightUser?.[0]?.tempatLahir || '-'}</Typography>
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
                        <Typography>{insightUser?.[0]?.dob || '-'}</Typography>
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
                        <Typography>{insightUser?.[0]?.gender || '-'}</Typography>
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
                        <Typography>{insightUser?.[0]?.mobileNumber || '-'}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <LocationCity style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>Lokasi</Typography>
                        <Typography>
                          {insightUser?.[0]?.states || '-'}, {insightUser?.[0]?.countries || '-'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <AccountBalance style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>
                          {insightUser?.[0]?.userbankaccounts[0]?.bankname}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap="8px">
                          <Typography>BCA {blurNumberCard(insightUser?.[0]?.userbankaccounts[0]?.noRek)}</Typography>
                          {insightUser?.[0]?.userbankaccounts[0]?.active && (
                            <CheckCircleRounded style={{ fontSize: 18, color: '#5D9405' }} />
                          )}
                        </Stack>
                        <Typography>{blurUsername(insightUser?.[0]?.userbankaccounts[0]?.nama)}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </GridContainer>
              </Stack>
            </Paper>
          </Stack>

          <Stack direction="row" flexWrap="nowrap" gap="24px" mb="24px">
            <Paper style={{ width: '100%', maxWidth: 320 }}>
              <Stack direction="column" height="100%">
                <Typography style={{ padding: 24, fontWeight: 'bold', borderBottom: '1px solid #0000001F' }}>
                  Informasi Bank Pengguna
                </Typography>
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
                        <ContactMail style={{ color: '#666666' }} />
                      </span>
                    </div>

                    <Stack>
                      <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                        Nama Pemilik Rekening
                      </Typography>
                      <Typography>{detailBank?.data?.namaRek || '-'}</Typography>
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
                        <AccountBalance style={{ color: '#666666' }} />
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
                        <CreditCard style={{ color: '#666666' }} />
                      </span>
                    </div>

                    <Stack>
                      <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                        Nomor Rekening
                      </Typography>
                      <Typography>{detailBank?.data?.noRek}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>

            <Paper style={{ width: '100%' }}>
              <Stack direction="column" height="100%">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottom="1px solid #0000001F"
                  padding="24px">
                  <Typography style={{ fontWeight: 'bold' }}>Dokumen Pendukung</Typography>
                  {detailBank?.data?.statusLast === 'BARU' && (
                    <Chip
                      label="Baru"
                      style={{
                        backgroundColor: '#E6094B1A',
                        color: '#E6094BD9',
                        fontWeight: 'bold',
                        fontFamily: 'Normal',
                      }}
                    />
                  )}
                  {detailBank?.data?.statusLast === 'DISETUJUI' && (
                    <Chip
                      label="Disetujui"
                      style={{
                        backgroundColor: '#71A5001A',
                        color: '#71A500D9',
                        fontWeight: 'bold',
                        fontFamily: 'Normal',
                      }}
                    />
                  )}
                  {detailBank?.data?.statusLast === 'DITOLAK' && (
                    <Chip
                      label="Ditolak"
                      style={{
                        backgroundColor: 'rgba(103, 103, 103, 0.1)',
                        color: '#676767',
                        fontWeight: 'bold',
                        fontFamily: 'Normal',
                      }}
                    />
                  )}
                </Stack>
                <Stack direction="row" alignItems="center" gap="8px" padding="24px" height="100%">
                  <ImageList sx={{ width: 600 }} cols={3} rowHeight={180} id="images">
                    {detailBank?.data?.dokumenPendukung?.map((item, key) => (
                      <ImageListItem key={key} onClick={handleView}>
                        <Avatar
                          variant="rounded"
                          src={getImage(item, key)}
                          srcSet={getImage(item, key)}
                          alt="X"
                          style={{ borderRadius: 8, height: '100%', width: '100%', cursor: 'pointer' }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Stack>
                {detailBank?.statusLast === 'BARU' && (
                  <Stack direction="row" justifyContent="center" gap="8px" pb="24px" marginTop="auto">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setModal({ ...modal, approve: !modal.approve })}
                      disabled={!access.find((item) => item?.nameModule === 'help_bank')?.acces?.updateAcces}>
                      Setujui
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setModal({ ...modal, reject: !modal.reject })}
                      disabled={!access.find((item) => item?.nameModule === 'help_bank')?.acces?.updateAcces}>
                      Tolak
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Paper>
          </Stack>
        </PageContainer>
      )}
    </>
  );
};

export default DetailRekeningBank;
