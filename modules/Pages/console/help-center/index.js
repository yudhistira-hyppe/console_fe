import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid, makeStyles } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import OverallBalance from './CardWithIndicator/OverAllBalances';
import ActionButtons from './CardWithIndicator/ActionButtons';
import PortfolioDetails from './CardWithIndicator/PortofolioDetails';
// import CardMenuHelpCenterComponent from './CardMenuHelpCenterComponent';
import CardWithIndicator from './CardWithIndicator';
import { Stack } from '@mui/material';
import AccountReport from './AccountReport';
import ContentReport from './ContentReport';
import AdsReport from './adsReport';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Pusat Bantuan', isActive: true },
];

const ConsoleHelpCenterComponent = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Bantuan</title>
      </Head>
      <PageContainer heading="Pusat Bantuan" breadcrumbs={breadcrumbs}></PageContainer>

      <GridContainer>
        <Grid item xs={12} md={6} sm={6}>
          <CardWithIndicator
            headTitle="Bantuan untuk Pengguna"
            TypeProblem="Total Masalah"
            numberOfProblem={70}
            iconLabelRight
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <CardWithIndicator headTitle="Keluhan Pengguna" TypeProblem="Total Masalah" numberOfProblem={230} iconLabelRight />
        </Grid>

        <Grid item xs={12} md={4} sm={4}>
          <CardWithIndicator
            headTitle="Laporan Akun"
            TypeProblem="Akun Dilaporkan"
            numberOfProblem={10}
            pathIconLeft={'/images/icons/account-circle.svg'}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={4}>
          <CardWithIndicator
            headTitle="Laporan Konten"
            TypeProblem="Konten Dilaporkan"
            numberOfProblem={200}
            pathIconLeft={'/images/icons/img-empty.svg'}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={4}>
          <CardWithIndicator
            headTitle="Laporan Iklan"
            TypeProblem="Iklan Dilaporkan"
            numberOfProblem={3}
            pathIconLeft={'/images/icons/ads-icon.svg'}
          />
        </Grid>

        {/* --------- card section 2 (without indicator) --------------------*/}
        <Grid item xs={12} md={4} sm={4}>
          <AccountReport />
        </Grid>
        <Grid item xs={12} md={4} sm={4}>
          <ContentReport />
        </Grid>
        <Grid item xs={12} md={4} sm={4}>
          <AdsReport />
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
