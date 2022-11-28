import Head from 'next/head';
import PropTypes from 'prop-types';
import Breadcrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import router from 'next/router';
import { Grid, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import ContentDetail from './content-detail';
import Categories from './categories';
import Description from './description';
import MoreInfo from './more-info';
import Status from './status';
import History from './history';
import Engagement from './engagement';
import Comment from './comment';
import CardWithIndicator from './card-with-indicator';
import WaktuTayang from './waktu-tayang';

const breadcrumbs = [
  { label: 'Database Konten', link: '/database/content' },
  { label: 'Rincian Konten', isActive: true },
];

const dummyData = [
  {
    label: '<14 tahun',
    rate: 10,
    value: 10,
  },
  {
    label: '14 - 24 tahun',
    rate: 70,
    value: 70,
  },
  {
    label: '25 - 34 tahun',
    rate: 20,
    value: 20,
  },
  {
    label: '35 - 44 tahun',
    rate: 0,
    value: 0,
  },
  {
    label: 'Indonesia',
    rate: 0,
    value: 0,
  },
];

const DatabaseDetailContentComponent = (props) => {
  const { detailId } = props;

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Rincian Konten</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/database/content')}
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

      <GridContainer>
        <Grid item xs={12} sm={4}>
          <ContentDetail />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Description />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Categories />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MoreInfo />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Status />
        </Grid>
        <Grid item xs={12} sm={4}>
          <History />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Engagement />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Comment />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CardWithIndicator title="Rentang Umur Penonton" data={dummyData} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CardWithIndicator title="Jenis Kelamin Penonton" data={dummyData} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CardWithIndicator title="Wilayah Penonton" data={dummyData} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <WaktuTayang />
        </Grid>
      </GridContainer>
    </>
  );
};

DatabaseDetailContentComponent.propTypes = {
  detailId: PropTypes.string,
};

export default DatabaseDetailContentComponent;
