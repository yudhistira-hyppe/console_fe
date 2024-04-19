import React, { useEffect, useRef, useState } from 'react';
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
import router from 'next/router';
import { Cake, DateRange, Email, HowToReg, LocationCity, LocationOn, PhoneIphone, Wc } from '@material-ui/icons';
import GridContainer from '@jumbo/components/GridContainer';
import ModalApprove from '../modal/modal-approve';
import ModalReject from '../modal/modal-reject';
import { useApproveKYCMutation, useGetDetailKYCQuery } from 'api/console/helpCenter/kyc';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import moment from 'moment/moment';
import { isEmpty } from 'lodash';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Permohonan Akun Premium', link: '/help-center/permohonan-premium' },
  { label: 'Rincian Akun', isActive: true },
];

const DetailPermohonanPremium = () => {
  const { authUser } = useAuth();
  const [modal, setModal] = useState({
    approve: false,
    reject: false,
    lampiran: false,
  });
  const [selectedLampiran, setSelectedLampiran] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({ name: '', noKtp: '', gender: '', dateBirth: null, placeBirth: '' });
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
  const [viewer, setViewer] = useState('');
  const [dataView, setDataView] = useState([]);

  const { data: detail, isFetching: loadingDetail } = useGetDetailKYCQuery({ id: router.query?._id });
  const [approveKYC] = useApproveKYCMutation();

  useEffect(() => {
    setInputValue({
      name: detail?.data[0]?.nama || '',
      noKtp: detail?.data[0]?.idcardnumber || '',
      gender: detail?.data[0]?.jenisKelamin?.toUpperCase() || '',
      dateBirth: detail?.data[0]?.tglLahir ? moment(detail?.data[0]?.tglLahir) : null,
      placeBirth: detail?.data[0]?.tempatLahir || '',
    });

    if (isEmpty(localStorage.getItem(`user-kyc-${router.query?._id}`)) && detail) {
      setDataView(
        detail?.data[0]?.FileEndpoint?.map((item) => {
          return {
            name: item,
            isView: false,
          };
        }),
      );
    } else {
      setDataView(JSON.parse(localStorage.getItem(`user-kyc-${router.query?._id}`)));
    }
  }, [detail]);

  useEffect(() => {
    if (dataView?.length >= 1) {
      localStorage.setItem(`user-kyc-${router.query?._id}`, JSON.stringify(dataView));
    }
  }, [dataView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const getImage = (mediaEndpoint, key) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint.split('/');

    return endpoint.includes('supportfile')
      ? `${STREAM_URL}/${endpoint[1]}/v2/${detail?.data[0]?._id}/${key}${authToken}`
      : `${STREAM_URL}/${endpoint[1]}/v2/${detail?.data[0]?._id}${authToken}`;
  };

  const handleConfirm = (val) => {
    setLoading(true);
    const data = {
      id: detail?.data[0]?._id,
      nama: inputValue.name,
      jenisKelamin: inputValue.gender,
      tempatLahir: inputValue.placeBirth,
      tglLahir: inputValue.dateBirth.format('YYYY-MM-DD'),
      noktp: inputValue.noKtp,
      iduserhandle: authUser?.user?.id,
      reasonId: val?._id,
      reasonValue: val?.reason !== 'Lainnya' ? val?.reason : undefined,
      remark: val?.reason === 'Lainnya' ? val?.otherReason : undefined,
      status: val?.reason ? 'DITOLAK' : 'DISETUJUI',
    };

    approveKYC(data).then(() => {
      setLoading(false);
      router.replace('/help-center/permohonan-premium');
      val?.reason ? setModal({ ...modal, reject: !modal.reject }) : setModal({ ...modal, approve: !modal.approve });
    });
  };

  const getAvatar = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  useEffect(() => {
    !loadingDetail && setViewer(new Viewer(document.getElementById('images'), { toolbar: false, navbar: false }));
  }, [loadingDetail]);

  const handleView = (item) => {
    let newDataView = dataView;

    newDataView = newDataView?.map((dw) => {
      if (dw?.name === item) {
        return { ...dw, isView: true };
      } else {
        return { ...dw };
      }
    });

    setDataView([...newDataView]);

    return viewer.toggle();
  };

  return (
    <>
      <Head>
        <title key={'title'}>Hyppe-Console :: Detail Keluhan Pengguna</title>
      </Head>

      <ModalApprove
        loading={loading}
        showModal={modal.approve}
        onClose={() => setModal({ ...modal, approve: !modal.approve })}
        onConfirm={handleConfirm}
      />
      <ModalReject
        loading={loading}
        showModal={modal.reject}
        onClose={() => {
          setModal({ ...modal, reject: !modal.reject });
        }}
        onConfirm={(val) => handleConfirm(val)}
      />

      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/help-center/permohonan-premium')}
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
          <Stack direction="row" alignItems="center" gap="25px" mb="24px">
            <Avatar
              src={getAvatar(detail?.data[0]?.avatar?.mediaEndpoint?.replace('.jpeg', ''))}
              sx={{ width: 70, height: 70 }}
            />
            <Stack direction="column">
              <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>{detail?.data[0]?.username || '-'}</Typography>
              <Typography>{detail?.data[0]?.nama || '-'}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" ml="auto" gap="30px">
              <Stack direction="column" alignItems="center">
                <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {detail?.data[0]?.insight?.followers || 0}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>Pengikut</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="column" alignItems="center">
                <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {detail?.data[0]?.insight?.followings || 0}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: 14 }}>Mengikuti</Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="column" alignItems="center">
                <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {detail?.data[0]?.insight?.friends || 0}
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
                    <Typography
                      style={{ width: 150, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                      title={detail?.data[0]?.email || '-'}>
                      {detail?.data[0]?.email || '-'}
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
                      <DateRange style={{ color: '#666666' }} />
                    </span>
                  </div>

                  <Stack>
                    <Typography variant="subtitle2" style={{ color: '#00000099' }}>
                      Tanggal Pengajuan
                    </Typography>
                    <Typography>{moment(detail?.data[0]?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB</Typography>
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
                    <Typography>{detail?.data[0]?.statusUser || '-'}</Typography>
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
                        <Typography>{detail?.data[0]?.tempatLahir || '-'}</Typography>
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
                        <Typography>
                          {detail?.data[0]?.tglLahir ? moment(detail?.data[0]?.tglLahir).format('DD/MM/YYYY') : '-'}
                        </Typography>
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
                        <Typography>
                          {detail?.data[0]?.jenisKelamin?.toUpperCase() === 'MALE' && 'Laki-laki'}
                          {detail?.data[0]?.jenisKelamin?.toUpperCase() === 'FEMALE' && 'Perempuan'}
                          {detail?.data[0]?.jenisKelamin?.toUpperCase() === 'LAKI-LAKI' && 'Laki-laki'}
                          {detail?.data[0]?.jenisKelamin?.toUpperCase() === 'PEREMPUAN' && 'Perempuan'}
                          {!detail?.data[0]?.jenisKelamin && '-'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <PhoneIphone style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography
                          style={{
                            fontSize: 12,
                            color: '#00000099',
                            fontWeight: 'bold',
                          }}>
                          Nomor Telepon
                        </Typography>
                        <Typography
                          style={{ width: 150, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {detail?.data[0]?.mobileNumber || '-'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Stack direction="row" alignItems="center" gap="12px" height="100%">
                      <LocationCity style={{ fontSize: 36, color: '#666666' }} />
                      <Stack direction="column">
                        <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>Lokasi</Typography>
                        {detail?.data[0]?.cities ? (
                          <Typography>
                            {detail?.data[0]?.cities}, {detail?.data[0]?.area}
                          </Typography>
                        ) : (
                          <Typography>-</Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Grid>
                </GridContainer>
              </Stack>
            </Paper>
          </Stack>

          <Paper style={{ width: '100%' }}>
            <Stack direction="column" height="100%">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="1px solid #0000001F"
                p="24px">
                <Typography style={{ fontWeight: 'bold' }}>Permohonan Menjadi Akun Premium</Typography>
                {detail?.data[0]?.status === 'BARU' && (
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
                {detail?.data[0]?.status === 'DISETUJUI' && (
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
                {detail?.data[0]?.status === 'DITOLAK' && (
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
              <Stack direction="row" justifyContent="space-between" p="24px 24px 0">
                <Stack direction="column" gap="5px">
                  <Typography style={{ color: '#00000099' }}>Nama Sesuai KTP</Typography>
                  <TextField
                    name="name"
                    size="small"
                    placeholder="Masukan nama sesuai KTP anda"
                    color="secondary"
                    value={inputValue.name}
                    onChange={handleInputChange}
                    disabled={
                      detail?.data[0]?.status !== 'BARU' ||
                      !access.find((item) => item?.nameModule === 'help_kyc')?.acces?.updateAcces
                    }
                  />
                </Stack>
                <Stack direction="column" gap="5px">
                  <Typography style={{ color: '#00000099' }}>Nomor KTP</Typography>
                  <TextField
                    name="noKtp"
                    type="text"
                    size="small"
                    placeholder="Masukan nomor KTP"
                    color="secondary"
                    value={inputValue.noKtp}
                    onChange={handleInputChange}
                    disabled={
                      detail?.data[0]?.status !== 'BARU' ||
                      !access.find((item) => item?.nameModule === 'help_kyc')?.acces?.updateAcces
                    }
                    inputProps={{
                      min: 0,
                      onKeyPress: (event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      },
                      maxLength: 16,
                    }}
                  />
                </Stack>
                <Stack direction="column" gap="5px">
                  <Typography style={{ color: '#00000099' }}>Jenis Kelamin</Typography>
                  <Select
                    name="gender"
                    size="small"
                    sx={{ width: 223 }}
                    color="secondary"
                    value={inputValue.gender}
                    onChange={handleInputChange}
                    disabled={
                      detail?.data[0]?.status !== 'BARU' ||
                      !access.find((item) => item?.nameModule === 'help_kyc')?.acces?.updateAcces
                    }
                    displayEmpty>
                    <MenuItem value="" disabled>
                      Pilih Jenis Kelamin
                    </MenuItem>
                    <MenuItem value={'MALE'}>Laki - laki</MenuItem>
                    <MenuItem value="FEMALE">Perempuan</MenuItem>
                    <MenuItem
                      value={'LAKI-LAKI'}
                      style={{ display: detail?.data[0]?.status === 'DISETUJUI' ? 'block' : 'none' }}>
                      Laki - laki
                    </MenuItem>
                    <MenuItem
                      value="PEREMPUAN"
                      style={{ display: detail?.data[0]?.status === 'DISETUJUI' ? 'block' : 'none' }}>
                      Perempuan
                    </MenuItem>
                  </Select>
                </Stack>
                <Stack direction="column" gap="5px">
                  <Typography style={{ color: '#00000099' }}>Tanggal Lahir</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      value={inputValue.dateBirth}
                      onChange={(newValue) => {
                        setInputValue({ ...inputValue, dateBirth: newValue });
                      }}
                      renderInput={(params) => (
                        <TextField size="small" placeholder="Pilih tanggal lahir" color="secondary" {...params} />
                      )}
                      disabled={
                        detail?.data[0]?.status !== 'BARU' ||
                        !access.find((item) => item?.nameModule === 'help_kyc')?.acces?.updateAcces
                      }
                    />
                  </LocalizationProvider>
                </Stack>
                <Stack direction="column" gap="5px">
                  <Typography style={{ color: '#00000099' }}>Tempat Lahir</Typography>
                  <TextField
                    name="placeBirth"
                    size="small"
                    placeholder="Masukan tempat lahir"
                    color="secondary"
                    value={inputValue.placeBirth}
                    onChange={handleInputChange}
                    disabled={
                      detail?.data[0]?.status !== 'BARU' ||
                      !access.find((item) => item?.nameModule === 'help_kyc')?.acces?.updateAcces
                    }
                  />
                </Stack>
              </Stack>
              <Stack direction="column" p="24px" gap="24px">
                <div>
                  <Stack direction="row" id="images">
                    <ImageList sx={{ width: '100%' }} gap={8} cols={6} rowHeight={180}>
                      {detail?.data[0]?.FileEndpoint?.map((item, key) => (
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
                </div>
              </Stack>
              {detail?.data[0]?.status === 'BARU' && (
                <Stack direction="row" justifyContent="center" gap="8px" pb="24px">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setModal({ ...modal, reject: !modal.reject })}
                    disabled={
                      !inputValue.name ||
                      !inputValue.dateBirth ||
                      !inputValue.gender ||
                      !inputValue.noKtp ||
                      !inputValue.placeBirth ||
                      !access.find((item) => item?.nameModule === 'help_kyc')?.acces?.updateAcces ||
                      dataView?.map((item) => (item?.isView ? 'true' : 'false')).includes('false')
                    }>
                    Tolak
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setModal({ ...modal, approve: !modal.approve })}
                    disabled={
                      !inputValue.name ||
                      !inputValue.dateBirth ||
                      !inputValue.gender ||
                      !inputValue.noKtp ||
                      !inputValue.placeBirth ||
                      !access.find((item) => item?.nameModule === 'help_kyc')?.acces?.updateAcces ||
                      dataView?.map((item) => (item?.isView ? 'true' : 'false')).includes('false')
                    }>
                    Setujui
                  </Button>
                </Stack>
              )}
            </Stack>
          </Paper>
        </PageContainer>
      )}
    </>
  );
};

export default DetailPermohonanPremium;
