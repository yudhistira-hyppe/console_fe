import React, { useRef, useState } from 'react';
import Head from 'next/head';
import Breadcrumbs from '../../bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { Button, CardContent, CardHeader, CardMedia, Chip, Grid, Paper, Stack } from '@mui/material';
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
import ModalStatus from '../Modal/ModalStatus';
import ModalConfirmation from '../Modal/ModalConfirmation';
import ModalDelete from '../Modal/ModalDelete';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Permohonan Banding Konten', link: '/help-center/banding-konten' },
  { label: 'Rincian Banding Konten', isActive: true },
];

const DetailBandingKonten = () => {
  const { authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [modal, setModal] = useState({
    userReport: false,
    status: false,
    confirmation: false,
    delete: false,
    type: '',
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
      case 'DALAM PROSES':
        return {
          backgroundColor: '#FF8C00',
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
        case 'status':
          return { ...prevVal, status: !modal.status };
        case 'sensitif':
          return { ...prevVal, confirmation: !modal.confirmation, type: 'sensitif' };
        case 'pulih':
          return { ...prevVal, confirmation: !modal.confirmation, type: 'pulih' };
        case 'hapus':
          return { ...prevVal, delete: !modal.delete };
        default:
      }
    });
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title key={'title'}>Hyppe-Console :: Detail Banding Konten</title>
      </Head>

      <ViewModal
        showModal={modal.userReport}
        userReports={[]}
        onClose={() => setModal({ ...modal, userReport: !modal.userReport })}
      />
      <ModalStatus showModal={modal.status} onClose={() => setModal({ ...modal, status: !modal.status })} />
      <ModalConfirmation
        showModal={modal.confirmation}
        type={modal.type}
        onClose={() => setModal({ ...modal, confirmation: !modal.confirmation })}
      />
      <ModalDelete showModal={modal.delete} onClose={() => setModal({ ...modal, delete: !modal.delete })} />

      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/help-center/banding-konten')}
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
        <GridContainer>
          <Grid item xs={12} sm={8}>
            <Typography style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
              Konten tidak berisi hal sensitif
            </Typography>
            <Typography style={{ fontSize: 14 }}>
              Konten-konten saya tidak ada yang sensitif atau mengandung unsur yang tidak pantas
            </Typography>

            <Stack direction="column" mt={5}>
              <CardMedia component="img" height="500px" image={getImage('')} style={{ borderRadius: 4 }} />
              <CardContent style={{ padding: '20px 0 0' }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="caption">Post ID: wkoakwoa</Typography>
                  <Chip
                    label={`HyppeVid`}
                    style={{ borderRadius: 4, fontFamily: 'Lato', fontSize: 12, color: '#00000099', fontWeight: 'bold' }}
                    size="small"
                  />
                </Stack>
                <Stack direction="column" gap="8px" mt={1}>
                  <Typography>Title</Typography>
                  <Typography variant="caption" style={{ color: '#00000099' }}>
                    Description
                  </Typography>
                  <Stack direction={'row'} spacing={1}>
                    <Chip
                      label="Berita"
                      style={{ borderRadius: 4, fontFamily: 'Lato', fontSize: 12, color: '#00000099', fontWeight: 'bold' }}
                    />
                  </Stack>
                </Stack>
                <Stack direction="column" spacing={2} mt={3}>
                  <Typography style={{ fontSize: 14, fontFamily: 'Lato' }}>
                    {0} <span style={{ color: '#00000061' }}>Suka |</span> {0}{' '}
                    <span style={{ color: '#00000061' }}>Komentar |</span> {0}{' '}
                    <span style={{ color: '#00000061' }}>Dilihat |</span> {0}{' '}
                    <span style={{ color: '#00000061' }}>Dibagikan</span>
                  </Typography>
                  <Typography variant="body2" style={{ fontFamily: 'bold', fontFamily: 'Lato', color: '#00000061' }}>
                    18/07/2022 - 13:00 WIB
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
                style={buttonStyle('BARU')}
                onClick={handleToggle}
                aria-haspopup="true"
                endIcon={<KeyboardArrowDown />}>
                Baru
              </Button>
              <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" transition>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}>
                    <Paper elevation={3}>
                      <ClickAwayListener onClickAway={() => setOpen(false)}>
                        <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
                          <MenuItem onClick={() => handleMenu('status')}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                              <Typography style={{ fontSize: 12, width: 180 }}>Konten Dalam Proses</Typography>
                              <Stack direction="row" alignItems="center" gap="15px" justifyContent="flex-start">
                                <ArrowForward style={{ fontSize: 16 }} />
                                <Chip label="Dalam Proses" size="small" style={chipStyle('DALAM PROSES')} />
                              </Stack>
                            </Stack>
                          </MenuItem>
                          <MenuItem onClick={() => handleMenu('sensitif')}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                              <Typography style={{ fontSize: 12, width: 180 }}>Konten User Tetap Sensitif</Typography>
                              <Stack direction="row" alignItems="center" gap="15px" justifyContent="flex-start">
                                <ArrowForward style={{ fontSize: 16 }} />
                                <Chip label="Ditandai Sensitif" size="small" style={chipStyle('SENSITIF')} />
                              </Stack>
                            </Stack>
                          </MenuItem>
                          <MenuItem onClick={() => handleMenu('pulih')}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                              <Typography style={{ fontSize: 12, width: 180 }}>Konten User Dipulihkan</Typography>
                              <Stack direction="row" alignItems="center" gap="15px" justifyContent="flex-start">
                                <ArrowForward style={{ fontSize: 16 }} />
                                <Chip label="Dipulihkan" size="small" style={chipStyle('PULIH')} />
                              </Stack>
                            </Stack>
                          </MenuItem>
                          <MenuItem onClick={() => handleMenu('hapus')}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                              <Typography style={{ fontSize: 12, width: 180 }}>Konten User Dihapus</Typography>
                              <Stack direction="row" alignItems="center" gap="15px" justifyContent="flex-start">
                                <ArrowForward style={{ fontSize: 16 }} />
                                <Chip label="Dihapus" size="small" style={chipStyle('HAPUS')} />
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
                  <Typography style={{ color: '#737373', fontSize: 14 }}>Nomor Tiket</Typography>
                  <Typography style={{ fontSize: 12 }}>123/08/09/22</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography style={{ color: '#737373', fontSize: 14 }}>Diunggah Pada</Typography>
                  <Typography style={{ fontSize: 12 }}>{moment().format('DD/MM/YYYY - HH:mm')} WIB</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography style={{ color: '#737373', fontSize: 14 }}>Tanggal Pengajuan</Typography>
                  <Typography style={{ fontSize: 12 }}>{moment().format('DD/MM/YYYY - HH:mm')} WIB</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography style={{ color: '#737373', fontSize: 14 }}>Tipe Konten</Typography>
                  <Typography style={{ fontSize: 12 }}>HyppeVid</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography style={{ color: '#737373', fontSize: 14 }}>Tipe Pelanggaran</Typography>
                  <Typography style={{ fontSize: 12 }}>Ketelanjangan dan aktivitas seksual</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography style={{ color: '#737373', fontSize: 14 }}>Alasan Banding</Typography>
                  <Typography style={{ fontSize: 12 }}>Konten tidak mengandung hal sensitif</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography style={{ color: '#737373', fontSize: 14 }}>Deskripsi Isu</Typography>
                  <Typography style={{ fontSize: 12 }}>-</Typography>
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

                <Stack direction={'row'}>
                  <Stack direction={'column'} justifyContent={'space-between'} flex={1}>
                    <Stack spacing={1}>
                      <Typography variant="h2">0</Typography>
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
                    {[].length >= 1 ? (
                      <GraphIndicator data={[]} />
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
                    <Typography>{moment().format('DD/MM/YYYY - HH:mm')} WIB</Typography>
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
                      Nama Sesuai KTP
                    </Typography>
                    <Typography>Megan Alexandra</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>

            <Paper>
              <CardHeader title={<Typography variant="h3">{`Kepemilikan & Penjualan`}</Typography>} />
              <CardContent style={{ paddingTop: 0, display: 'flex', flexDirection: 'column', height: '100%', gap: 8 }}>
                <Stack direction={'row'}>
                  <Stack mr={1}>
                    <Typography variant="body2" color="textSecondary">
                      Kepemilikan:
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
                    <Typography variant="body2" color="primary">
                      @amanda2
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={'row'}>
                  <Stack mr={1}>
                    <Typography variant="body2" color="textSecondary">
                      Nomor Sertifikasi:
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
                    <Typography
                      variant="body2"
                      style={{
                        width: 240,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}>
                      wkoakwoak
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={'row'}>
                  <Stack mr={1}>
                    <Typography variant="body2" color="textSecondary">
                      Dijual:
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
                    <Typography variant="body2">{0 > 0 ? 'Ya' : 'Tidak'}</Typography>
                  </Stack>
                </Stack>
                <Stack direction={'row'}>
                  <Stack mr={1}>
                    <Typography variant="body2" color="textSecondary">
                      Harga:
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
                    <Typography variant="body2">Rp {numberWithCommas(0)}</Typography>
                  </Stack>
                </Stack>
                <Stack direction={'row'}>
                  <Stack mr={1}>
                    <Typography variant="body2" color="textSecondary">
                      Terms:
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
                    <Typography variant="body2">
                      {/* {detail?.data[0]?.saleView && 'Views'} {detail?.data[0]?.saleLike && 'Likes'}
                      {!detail?.data[0]?.saleView && !detail?.data[0]?.saleLike && '-'} */}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Paper>

            <Paper>
              <CardHeader title={<Typography variant="h3">Riwayat</Typography>} />
              <CardContent style={{ paddingTop: 5, height: '100%' }}>
                <Stack spacing={1} height="100%">
                  {0 > 0 && (
                    <>
                      <Typography variant="caption">
                        Dijual oleh <span style={{ color: '#AB22AF', fontWeight: 'bold' }}>@rizal</span> seharga Rp.
                        1.500.000 kepada
                        <span style={{ color: '#AB22AF', fontWeight: 'bold' }}> @amanda2</span>
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        12/08/22 - 13:10 WIB
                      </Typography>
                      <Divider style={{ margin: 'auto 0' }} />
                    </>
                  )}
                  <Typography variant="caption" style={{ color: '#737373' }}>
                    Kepemilikan didaftarkan oleh <span style={{ color: '#AB22AF', fontWeight: 'bold' }}>@amanda2</span>
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {moment().format('DD/MM/YYYY - HH:mm')} WIB
                  </Typography>
                </Stack>
              </CardContent>
            </Paper>
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default DetailBandingKonten;
