import React from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import { Stack, Typography } from '@mui/material';
import { Grid, Link } from '@material-ui/core';
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


const breadcrumbs = [
  { label: 'Home', link: '/' },
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

    const onBackHandler = (e) => {
      e.preventDefault();
      router.push('/ads-center');
    };

    React.useEffect(() => {
      // Fetch Data Here
      return () => {}
    }, []);

    return (
      <>
        <Head>
          <title 
            key="title"
          >
            Hyppe-Console :: Pusat Iklan Detail
          </title>  
        </Head>

        <Stack spacing={1}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Link href="/" onClick={onBackHandler} style={{ cursore: 'pointer', textDecorationLine: 'none' }}>
            <Stack direction={'row'}>
              <Stack direction={'column'} justifyContent={'center'}>
                <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }} />
              </Stack>
              <Stack>
                <Typography 
                  style={{ color: 'black', textDecorationLine: 'none' }} 
                  variant="h5" 
                  fontWeight="bold" 
                  fontFamily="Lato"
                >
                  Kembali
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Stack>

        <PageContainer className="mt-5">
          <GridContainer>
            <Grid item sm={12} md={12} lg={6} xl={6}>
              <AdsContentDetail 
                status={status}
                showModal={showModal}
                setShowModal={setShowModal}
                buttonColor={buttonColor}
                setButtonColor={setButtonColor}
                setStatus={setStatus}
              />
            </Grid>

            <Grid item sm={12} md={12} lg={6} xl={6}>
              <AdsHistoryDetail />

              <AdsWatcherDetailComponent />
            </Grid>
          </GridContainer>
        </PageContainer>

        <AdsModalChangeStatus 
          showModal={
            showModal.show && 
            showModal.type !== 'media'
          }
          onClose={onCloseModal}
          onConfirm={onCloseModal}
          type={showModal.type}
        />

        <ModalMedia 
          showModal={
            showModal.show && 
            showModal.type === 'media'
          }
          onClose={onCloseModal} 
        />
      </>
    );
};

export default AdsDetailComponent;