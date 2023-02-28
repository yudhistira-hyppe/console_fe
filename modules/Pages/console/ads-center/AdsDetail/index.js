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
import { useApproveAdsMutation, useGetDetailAdsQuery } from 'api/console/ads';
import moment from 'moment';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { toast } from 'react-hot-toast';

const breadcrumbs = [
  { label: 'Pusat Iklan', link: '/ads-center' },
  { label: 'Rincian Iklan', isActive: true },
];

const AdsDetailComponent = () => {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState({
    show: false,
    type: 'Tayang',
    done: false,
    children1: null,
    children2: null,
  });
  const [approveAds, { isLoading }] = useApproveAdsMutation();

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

  const handleApproveAds = () => {
    const payload = {
      _id: adsDetail?.data[0]?._id,
    };

    toast.loading('Loading...', { id: 'approve-ads' });
    approveAds(payload).then((res) => {
      if (res?.error) {
        console.log(res);
        toast.error(res?.error?.data?.messages?.info[0], { id: 'approve-ads', duration: 3000 });
      } else {
        router.replace('/ads-center');
        toast.success('berhasil menjadwalkan ads', { id: 'approve-ads', duration: 3000 });
      }
    });
  };

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
                status={adsDetail?.data[0]?.status === 'DRAFT' ? 'Tinjau' : 'Dijadwalkan'}
                showModal={showModal}
                setShowModal={setShowModal}
                buttonColor={{ background: adsDetail?.data[0]?.status === 'DRAFT' ? '#E92A63' : '#71A500' }}
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
        onConfirm={handleApproveAds}
        type={showModal.type}
        loading={isLoading}
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
