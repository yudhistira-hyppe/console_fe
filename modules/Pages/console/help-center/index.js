import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CardWithIndicator from './CardWithIndicator';
import AccountReport from './AccountReport';
import ContentReport from './ContentReport';
import AdsReport from './adsReport';

const sample3Data = [
  { reason: 'Baru', persen: 3, count: 4, color: '#E31D41' },
  { reason: 'Ditolak', persen: 10, count: 7, color: '#FF8800' },
  { reason: 'Disetujui', persen: 86, count: 61, color: '#8DCD03' },
];

const sample4Data = [
  { reason: 'Baru', persen: 3, count: 4, color: '#E31D41' },
  { reason: 'Dalam Proses', persen: 10, count: 7, color: '#FF8800' },
  { reason: 'Selesai', persen: 86, count: 61, color: '#8DCD03' },
  { reason: 'Tidak Selesai', persen: 1, count: 2, color: '#7C7C7C' },
];

const ConsoleHelpCenterComponent = () => {
  const router = useRouter();
  const [bantuanPenggunaStatus, setBantuanPenggunaStatus] = useState('Semua');
  const [premiumAkunStatus, setpremiumAkunStatus] = useState('Semua');
  const [laporanAkunStatus, setlaporanAkunStatus] = useState('Semua');
  const [laporanKontenStatus, setlaporanKontenStatus] = useState('Semua');
  const [laporanIklanStatus, setlaporanIklanStatus] = useState('Semua');
  const [fetchingList, setFetchingList] = useState({
    bantuanPengguna: true,
    premiumAkun: true,
    laporanAkun: true,
    laporanKonten: true,
    laporanIklan: true,
    listPelaporanAkun: true,
    listPelaporanIklan: true,
    listPelaporanKonten: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setFetchingList({
        bantuanPengguna: false,
        premiumAkun: false,
        laporanAkun: false,
        laporanKonten: false,
        laporanIklan: false,
        listPelaporanAkun: false,
        listPelaporanIklan: false,
        listPelaporanKonten: false,
      });
    }, 1000);
  }, []);

  const onStatusChangeHandler = (type, data) => {
    switch (type.toLowerCase()) {
      case 'bantuan pengguna':
        if (data) {
          setBantuanPenggunaStatus(data);
        }
        break;
      case 'upgrade premium':
        if (data) {
          setpremiumAkunStatus(data);
        }
        break;
      case 'laporan akun':
        if (data) {
          setlaporanAkunStatus(data);
        }
        break;
      case 'laporan konten':
        if (data) {
          setlaporanKontenStatus(data);
        }
        break;
      case 'laporan iklan':
        if (data) {
          setlaporanIklanStatus(data);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Bantuan</title>
      </Head>
      <PageContainer>
        <GridContainer>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Bantuan Pengguna"
              TypeProblem="Total Masalah"
              numberOfProblem={70}
              iconLabelRight
              data={sample4Data}
              onClick={() => router.push('/help-center/bantuan-pengguna')}
              status={bantuanPenggunaStatus}
              setStatusList={(val) => onStatusChangeHandler('bantuan pengguna', val)}
              isFetching={fetchingList.bantuanPengguna}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Permohonan Akun Premium"
              TypeProblem="Total Permohonan"
              numberOfProblem={70}
              iconLabelRight
              data={sample4Data}
              onClick={() => router.push('/help-center/permohonan-premium')}
              status={bantuanPenggunaStatus}
              setStatusList={(val) => onStatusChangeHandler('bantuan pengguna', val)}
              isFetching={fetchingList.bantuanPengguna}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Rekening Bank"
              TypeProblem="Total Permohonan"
              numberOfProblem={70}
              iconLabelRight
              data={sample4Data}
              status={premiumAkunStatus}
              onClick={() => router.push('/help-center/rekening-bank')}
              setStatusList={(val) => onStatusChangeHandler('upgrade premium', val)}
              isFetching={fetchingList.premiumAkun}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Laporan Konten"
              TypeProblem="Konten Dilaporkan"
              numberOfProblem={10}
              data={sample4Data}
              pathIconLeft={'/images/icons/img-empty.svg'}
              onClick={() => router.push('/help-center/pelaporan-konten')}
              status={laporanAkunStatus}
              setStatusList={(val) => onStatusChangeHandler('laporan akun', val)}
              isFetching={fetchingList.laporanAkun}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Banding Konten"
              TypeProblem="Permohonan Banding"
              numberOfProblem={200}
              data={sample4Data}
              status={laporanKontenStatus}
              pathIconLeft={'/images/icons/banding-konten.svg'}
              onClick={() => router.push('/help-center/banding-konten')}
              setStatusList={(val) => onStatusChangeHandler('laporan kontent', val)}
              isFetching={fetchingList.laporanKonten}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Fingerprint Combat"
              TypeProblem="Konten Serupa"
              numberOfProblem={25}
              data={sample4Data}
              status={laporanIklanStatus}
              pathIconLeft={'/images/icons/banding-konten.svg'}
              onClick={() => router.push('/help-center/konten-serupa')}
              setStatusList={(val) => onStatusChangeHandler('laporan iklan', val)}
              isFetching={fetchingList.laporanIklan}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Laporan Iklan"
              TypeProblem="Iklan Dilaporkan"
              numberOfProblem={200}
              data={sample3Data}
              status={laporanKontenStatus}
              pathIconLeft={'/images/icons/ads-icon.svg'}
              onClick={() => router.push('/help-center/pelaporan-iklan')}
              setStatusList={(val) => onStatusChangeHandler('laporan kontent', val)}
              isFetching={fetchingList.laporanKonten}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Banding Iklan Moderasi"
              TypeProblem="Permohonan Banding"
              numberOfProblem={25}
              data={sample3Data}
              status={laporanIklanStatus}
              pathIconLeft={'/images/icons/ads-banding.svg'}
              onClick={() => router.push('/help-center/banding-iklan')}
              setStatusList={(val) => onStatusChangeHandler('laporan iklan', val)}
              isFetching={fetchingList.laporanIklan}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Laporan Akun"
              TypeProblem="Akun Dilaporkan"
              numberOfProblem={200}
              data={sample3Data}
              status={laporanKontenStatus}
              pathIconLeft={'/images/icons/users.svg'}
              onClick={() => router.push('/help-center/pelaporan-akun')}
              setStatusList={(val) => onStatusChangeHandler('laporan kontent', val)}
              isFetching={fetchingList.laporanKonten}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Banding Akun Moderasi"
              TypeProblem="Permohonan"
              numberOfProblem={25}
              data={sample3Data}
              status={laporanIklanStatus}
              pathIconLeft={'/images/icons/users-banding.svg'}
              onClick={() => router.push('/help-center/banding-akun')}
              setStatusList={(val) => onStatusChangeHandler('laporan iklan', val)}
              isFetching={fetchingList.laporanIklan}
            />
          </Grid>

          {/* --------- card section 2 (without indicator) --------------------*/}
          <Grid item xs={12} md={4} sm={4}>
            <AccountReport isFetching={fetchingList.listPelaporanAkun} />
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <ContentReport isFetching={fetchingList.listPelaporanKonten} />
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <AdsReport isFetching={fetchingList.listPelaporanIklan} />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleHelpCenterComponent;
