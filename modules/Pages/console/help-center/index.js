import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer'; // import CardMenuHelpCenterComponent from './CardMenuHelpCenterComponent';
import CardWithIndicator from './CardWithIndicator';
import AccountReport from './AccountReport';
import ContentReport from './ContentReport';
import AdsReport from './adsReport';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Pusat Bantuan', isActive: true },
];

const dataBantuanPengguna = [
  { label: 'Baru', value: 3, rate: 4, color: '#E31D41' },
  { label: 'Dalam Proses', value: 10, rate: 7, color: '#FF8800' },
  { label: 'Selesai', value: 86, rate: 61, color: '#8DCD03' },
  { label: 'Tidak Selesai', value: 1, rate: 2, color: '#7C7C7C' },
];

const dataPermohonanPremium = [
  { label: 'Baru', value: 3, rate: 4, color: '#E31D41' },
  { label: 'Ditolak', value: 10, rate: 7, color: '#FF8800' },
  { label: 'Disetujui', value: 86, rate: 61, color: '#8DCD03' },
];

const dataLaporanAkun = [
  { label: 'Baru', value: 10, rate: 20, color: '#E31D41' },
  { label: 'Ditangguhkan', value: 10, rate: 10, color: '#FF8800' },
  { label: 'Tidak Ditangguhkan', value: 15, rate: 120, color: '#8DCD03' },
  { label: 'Dihapus', value: 5, rate: 120, color: '#7C7C7C' },
];

const dataLaporanKonten = [
  { label: 'Baru', value: 10, rate: 20, color: '#E31D41' },
  { label: 'Ditangguhkan', value: 10, rate: 10, color: '#FF8800' },
  { label: 'Tidak Ditangguhkan', value: 15, rate: 120, color: '#8DCD03' },
  { label: 'Dihapus', value: 5, rate: 120, color: '#7C7C7C' },
];

const dataLaporanIklan = [
  { label: 'Baru', value: 25, rate: 1, color: '#E31D41' },
  { label: 'Ditangguhkan', value: 25, rate: 1, color: '#FF8800' },
  { label: 'Tidak Ditangguhkan', value: 25, rate: 1, color: '#8DCD03' },
  { label: 'Dihapus', value: 25, rate: 1, color: '#7C7C7C' },
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
    }, 5000);
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
      <PageContainer heading="Pusat Bantuan" breadcrumbs={breadcrumbs}></PageContainer>

      <GridContainer>
        <Grid item xs={12} md={6} sm={6}>
          <CardWithIndicator
            headTitle="Bantuan Pengguna"
            TypeProblem="Total Masalah"
            numberOfProblem={70}
            iconLabelRight
            data={dataBantuanPengguna}
            onClick={() => router.push('/console/help-center/bantuan-pengguna')}
            status={bantuanPenggunaStatus}
            setStatusList={(val) => onStatusChangeHandler('bantuan pengguna', val)}
            isFetching={fetchingList.bantuanPengguna}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <CardWithIndicator
            headTitle="Permohonan Akun Premium"
            TypeProblem="Total Masalah"
            numberOfProblem={70}
            iconLabelRight
            data={dataPermohonanPremium}
            status={premiumAkunStatus}
            onClick={() => router.push('/console/help-center/keluhan-pengguna')}
            setStatusList={(val) => onStatusChangeHandler('upgrade premium', val)}
            isFetching={fetchingList.premiumAkun}
          />
        </Grid>

        <Grid item xs={12} md={4} sm={4}>
          <CardWithIndicator
            headTitle="Laporan Akun"
            TypeProblem="Akun Dilaporkan"
            numberOfProblem={10}
            data={dataLaporanAkun}
            pathIconLeft={'/images/icons/account-circle.svg'}
            onClick={() => router.push('/console/help-center/pelaporan-akun')}
            status={laporanAkunStatus}
            setStatusList={(val) => onStatusChangeHandler('laporan akun', val)}
            isFetching={fetchingList.laporanAkun}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={4}>
          <CardWithIndicator
            headTitle="Laporan Konten"
            TypeProblem="Konten Dilaporkan"
            numberOfProblem={200}
            data={dataLaporanKonten}
            status={laporanKontenStatus}
            pathIconLeft={'/images/icons/img-empty.svg'}
            onClick={() => router.push('/console/help-center/pelaporan-konten')}
            setStatusList={(val) => onStatusChangeHandler('laporan kontent', val)}
            isFetching={fetchingList.laporanKonten}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={4}>
          <CardWithIndicator
            headTitle="Laporan Iklan"
            TypeProblem="Iklan Dilaporkan"
            numberOfProblem={25}
            data={dataLaporanIklan}
            status={laporanIklanStatus}
            pathIconLeft={'/images/icons/ads-icon.svg'}
            onClick={() => router.push('/console/help-center/pelaporan-iklan')}
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

      {/* // start rewrite UI */}
      {/* <GridContainer>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent
              clickedElement={() => router.push('/console/help-center/bantuan-pengguna')}
              icon={iconHelp}
              title="Bantuan Pengguna"
              backgroundColor="#FFFFFF"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent
              clickedElement={() => router.push('/console/help-center/pemecahan-masalah')}
              icon={iconWrench}
              title="Pemecahan Masalah"
              backgroundColor="#FFFFFF"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent
              clickedElement={() => router.push('/console/help-center/faq')}
              icon={iconFaq}
              title="FAQ"
              backgroundColor="#FFFFFF"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent
              clickedElement={() => router.push('/console/help-center/pengumuman')}
              icon={iconStar}
              title="Pengumuman"
              backgroundColor="#FFFFFF"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent
              clickedElement={() => router.push('/console/help-center/info')}
              icon={iconStar}
              title="Hyppe Info"
              backgroundColor="#FFFFFF"
            />
          </Grid>
        </GridContainer> */}
      {/* // end rewrite UI */}
    </>
  );
};

export default ConsoleHelpCenterComponent;
