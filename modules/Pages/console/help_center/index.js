import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CardMenuHelpCenterComponent from './CardMenuHelpCenterComponent';
const iconHelp = '/images/icons/icon_help.png';
const iconWrench = '/images/icons/icon_wrench.png';
const iconFaq = '/images/icons/icon_faq.png';
const iconStar = '/images/icons/icon_star.png';

const breadcrumbs = [
    { label: 'Home', link: '/console' },
    { label: 'Pusat Bantuan', isActive: true },
  ];

const ConsoleHelpCenterComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
 
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Bantuan</title>
      </Head>
      <PageContainer heading="Pusat Bantuan" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent clickedElement={() => router.push('/console/help_center/bantuan_pengguna')} icon={iconHelp} title="Bantuan Pengguna" subtitle="22 Email baru" backgroundColor="#FFFFFF"/>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent clickedElement={() => router.push('/console/help_center/pemecahan_masalah')} icon={iconWrench} title="Pemecahan Masalah" subtitle="5 Masalah baru" backgroundColor="#FFFFFF"/>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent clickedElement={() => router.push('/console/help_center/faq')} icon={iconFaq} title="FAQ" backgroundColor="#FFFFFF"/>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent clickedElement={() => router.push('/console/help_center/pengumuman')} icon={iconStar} title="Pengumuman" backgroundColor="#FFFFFF"/>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CardMenuHelpCenterComponent clickedElement={() => router.push('/console/help_center/hyppe_info')} icon={iconStar} title="Hyppe Info" backgroundColor="#FFFFFF"/>
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleHelpCenterComponent;
