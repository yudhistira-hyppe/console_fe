import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import { Stack } from '@mui/material';
import { Grid, Link, Typography } from '@material-ui/core';
import {
  AdsContentDetail,
  AdsHistoryDetail,
  AdsModalChangeStatus,
  AdsWatcherDetailComponent,
  ModalMedia,
} from '../components';
import Breadcrumbs from '../../help-center/bantuan-pengguna/BreadCrumb';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useGetDetailAdsQuery } from 'api/console/ads';
import moment from 'moment';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const breadcrumbs = [
  { label: 'Ads Center', link: '/ads-center' },
  { label: 'Rincian Iklan', isActive: true },
];

const AdsDetailComponent = () => {
  const router = useRouter();
  const [buttonColor, setButtonColor] = React.useState({ background: '#E92A63' });
  const [status, setStatus] = React.useState('Tinjau');
  const [showModal, setShowModal] = React.useState({
    show: false,
    type: 'Tayang',
    done: false,
    children1: null,
    children2: null,
  });

  const onCloseModal = () => {
    setShowModal({
      ...showModal,
      show: false,
      children1: null,
      children2: null,
    });
  };

  const { data: adsDetail, isLoading: loadingAds } = useGetDetailAdsQuery({
    id: router.query._id,
    startdate: moment().subtract(7, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Iklan Detail</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/ads-center')}
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

      {loadingAds ? (
        <PageLoader />
      ) : (
        <PageContainer>
          <GridContainer>
            <Grid item sm={12} md={12} lg={6} xl={6}>
              <AdsContentDetail
                status={status}
                showModal={showModal}
                setShowModal={setShowModal}
                buttonColor={buttonColor}
                setButtonColor={setButtonColor}
                setStatus={setStatus}
                detailAds={adsDetail?.data?.[0]}
              />
            </Grid>

            <Grid item sm={12} md={12} lg={6} xl={6}>
              <Stack direction="column" gap={4}>
                <AdsHistoryDetail />
                <AdsWatcherDetailComponent />
              </Stack>
            </Grid>
          </GridContainer>
        </PageContainer>
      )}

      <AdsModalChangeStatus
        showModal={showModal.show && showModal.type !== 'media'}
        onClose={onCloseModal}
        onConfirm={onCloseModal}
        type={showModal.type}
      />

      <ModalMedia
        showModal={showModal.show && showModal.type === 'media'}
        onClose={onCloseModal}
        idApsara={adsDetail?.data?.[0]?.apsaraId}
      />
    </>
  );
};

export default AdsDetailComponent;
