import React, { useState } from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import {
  Avatar,
  Button,
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
import ModalApprove from '../Modal/ModalApprove';
import ModalReject from '../Modal/ModalReject';
import ModalLampiran from '../Modal/ModalLampiran';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Permohonan Akun Premium', link: '/help-center/permohonan-premium' },
  { label: 'Rincian Akun', isActive: true },
];

const DetailPermohonanPremium = () => {
  const [modal, setModal] = useState({
    approve: false,
    reject: false,
    lampiran: false,
  });
  const [selectedLampiran, setSelectedLampiran] = useState({});

  return (
    <>
      <Head>
        <title key={'title'}>Hyppe-Console :: Detail Keluhan Pengguna</title>
      </Head>

      <ModalApprove showModal={modal.approve} onClose={() => setModal({ ...modal, approve: !modal.approve })} />
      <ModalReject
        showModal={modal.reject}
        onClose={() => {
          setModal({ ...modal, reject: !modal.reject });
          setSelectedLampiran({});
        }}
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
      <PageContainer heading="">
        <Stack direction="row" alignItems="center" gap="25px" mb="24px">
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
                      <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>Tempat Lahir</Typography>
                      <Typography>Jakarta</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack direction="row" alignItems="center" gap="12px" height="100%">
                    <Cake style={{ fontSize: 36, color: '#666666' }} />
                    <Stack direction="column">
                      <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>Tanggal Lahir</Typography>
                      <Typography>#000000DE</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack direction="row" alignItems="center" gap="12px" height="100%">
                    <Wc style={{ fontSize: 36, color: '#666666' }} />
                    <Stack direction="column">
                      <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>Jenis Kelamin</Typography>
                      <Typography>Perempuan</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack direction="row" alignItems="center" gap="12px" height="100%">
                    <PhoneIphone style={{ fontSize: 36, color: '#666666' }} />
                    <Stack direction="column">
                      <Typography style={{ fontSize: 12, color: '#00000099', fontWeight: 'bold' }}>Nomor Telepon</Typography>
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
              </GridContainer>
            </Stack>
          </Paper>
        </Stack>

        <Paper style={{ width: '100%' }}>
          <Stack direction="column" height="100%">
            <Typography style={{ padding: 24, fontWeight: 'bold', borderBottom: '1px solid #0000001F' }}>
              Permohonan Menjadi Akun Premium
            </Typography>
            <Stack direction="row" justifyContent="space-between" p="24px">
              <Stack direction="column" gap="5px">
                <Typography style={{ color: '#00000099' }}>Nama Sesuai KTP</Typography>
                <TextField size="small" />
              </Stack>
              <Stack direction="column" gap="5px">
                <Typography style={{ color: '#00000099' }}>Nomor KTP</Typography>
                <TextField size="small" />
              </Stack>
              <Stack direction="column" gap="5px">
                <Typography style={{ color: '#00000099' }}>Jenis Kelamin</Typography>
                <Select size="small" sx={{ width: 223 }}>
                  <MenuItem value="l">Laki - laki</MenuItem>
                  <MenuItem value="p">Perempuan</MenuItem>
                </Select>
              </Stack>
              <Stack direction="column" gap="5px">
                <Typography style={{ color: '#00000099' }}>Tanggal Lahir</Typography>
                <TextField size="small" />
              </Stack>
              <Stack direction="column" gap="5px">
                <Typography style={{ color: '#00000099' }}>Tempat Lahir</Typography>
                <TextField size="small" />
              </Stack>
            </Stack>
            <Stack direction="column" p="0 24px 24px" gap="24px">
              <Stack direction="column" gap="8px">
                <Typography style={{ fontWeight: 'bold' }}>Dokumen 1</Typography>
                <Stack direction="row" gap="8px">
                  <ImageList sx={{ width: 750 }} cols={3} rowHeight={180}>
                    {[{}, {}, {}].map((item, key) => (
                      <ImageListItem
                        key={key}
                        onClick={() => {
                          setModal({ ...modal, lampiran: !modal.lampiran });
                          setSelectedLampiran({ id: key + 1, src: '/images/dashboard/content_image.png' });
                        }}>
                        <img
                          src={`/images/dashboard/content_image.png`}
                          srcSet={`/images/dashboard/content_image.png`}
                          alt="asd"
                          loading="lazy"
                          style={{ borderRadius: 8, height: '100%' }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center" gap="8px" py="24px">
              <Button variant="contained" color="secondary" onClick={() => setModal({ ...modal, approve: !modal.approve })}>
                Setujui
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setModal({ ...modal, reject: !modal.reject })}>
                Tolak
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </PageContainer>
    </>
  );
};

export default DetailPermohonanPremium;
