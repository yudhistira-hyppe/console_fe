import React, { useState } from 'react';
import Breadcrumbs from 'modules/Pages/console/help-center/bantuan-pengguna/BreadCrumb';
import { Button, Grid, Stack, Tab } from '@mui/material';
import { ChevronLeft } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import Router from 'next/router';
import { useGetDetailChallengeQuery } from 'api/console/challenge';
import DetailChallengeComponent from './component/Detail';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import LeaderboardComponent from './component/Leaderboard';
import RewardsComponent from './component/Rewards';
import AreaComponent from './component/Area';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useStyles from '../tab/index.style';
import ModalConfirmation from '../modal/ModalConfirmation';
import NotifikasiComponent from './component/Notifikasi';

const breadcrumbs = [
  { label: 'Challenge', link: '/challenge' },
  { label: 'Detail Challenge', isActive: true },
];

const DetailChallenge = ({ detailId }) => {
  const [tab, setTab] = useState('challenge');
  const [openModal, setOpenModal] = useState({
    showModal: false,
    status: '',
    selected: {},
  });
  const classes = useStyles();
  const { data: detail, isLoading: loadingDetail } = useGetDetailChallengeQuery(detailId);

  return (
    <Stack direction="column" gap={3}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt="-6px">
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          onClick={() => Router.back()}
          sx={{
            width: 'fit-content',
            '&:hover': {
              cursor: 'pointer',
            },
          }}>
          <ChevronLeft style={{ fontSize: 28 }} />
          <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>Kembali</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            style={{ borderRadius: 6, padding: '10px 20px' }}
            onClick={() => Router.push(`/challenge/edit/${detailId}`)}>
            <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Edit Challenge</Typography>
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{ borderRadius: 6, padding: '10px 20px' }}
            onClick={() =>
              setOpenModal({
                showModal: !openModal.showModal,
                status: 'delete',
                selected: detail?._id,
              })
            }>
            <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
              Hapus Challenge
            </Typography>
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ borderRadius: 6, padding: '10px 20px' }}
            onClick={() =>
              setOpenModal({
                showModal: !openModal.showModal,
                status: 'duplicate',
                selected: detail?._id,
              })
            }>
            <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Duplikasi</Typography>
          </Button>
        </Stack>
      </Stack>

      {loadingDetail ? (
        <PageLoader />
      ) : (
        <TabContext value={tab}>
          <TabList
            onChange={(e, val) => setTab(val)}
            textColor="secondary"
            indicatorColor="secondary"
            style={{ marginTop: -15 }}>
            <Tab className={classes.tab} label="Challenge" value="challenge" style={{ padding: '0 0 8px' }} />
            <Tab className={classes.tab} label="Partisipan" value="partisipan" style={{ padding: '0 0 8px' }} />
          </TabList>
          <TabPanel value="challenge" style={{ padding: 0 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Stack direction="column" gap={2} style={{ height: '100%' }}>
                  <DetailChallengeComponent detail={detail} />
                  <NotifikasiComponent detail={detail} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack direction="column" gap={2} style={{ height: '100%' }}>
                  <LeaderboardComponent detail={detail} />
                  <RewardsComponent detail={detail} />
                  <AreaComponent detail={detail} />
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="partisipan" style={{ padding: 0 }}>
            <Typography>Partisipan</Typography>
          </TabPanel>
        </TabContext>
      )}

      <ModalConfirmation
        showModal={openModal.showModal}
        status={openModal.status}
        selectedItem={openModal.selected}
        onClose={() => {
          if (openModal?.status === 'duplicate') {
            Router.replace('/challenge/draft');
          } else {
            Router.back();
          }
          setOpenModal({
            showModal: !openModal.showModal,
            status: '',
            selected: {},
          });
        }}
      />
    </Stack>
  );
};

export default DetailChallenge;
