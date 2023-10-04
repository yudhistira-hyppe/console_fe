import React, { useEffect, useState } from 'react';
import Breadcrumbs from 'modules/Pages/console/help-center/bantuan-pengguna/BreadCrumb';
import { Button, Grid, Stack, Tab, Tooltip } from '@mui/material';
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
import ParticipantComponent from './component/participant';
import dayjs from 'dayjs';

const DetailChallenge = ({ detailId }) => {
  const [tab, setTab] = useState('challenge');
  const [inputValue, setInputValue] = useState({});
  const [openModal, setOpenModal] = useState({
    showModal: false,
    status: '',
    selected: {},
  });
  const classes = useStyles();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const { data: detail, isLoading: loadingDetail } = useGetDetailChallengeQuery(detailId);

  const breadcrumbs = [
    {
      label: 'Challenge',
      link: detail?.statusChallenge === 'DRAFT' ? '/challenge/draft' : `/challenge/${detail?.jenisChallengeName}`,
    },
    { label: 'Detail Challenge', isActive: true },
  ];

  useEffect(() => {
    let dataBadge = [];
    let dataAge = [];
    let dataGender = [];
    let dataNotif = [];
    let dataPrice = [];

    setInputValue({
      _id: detail?._id,
      name: detail?.nameChallenge,
      description: detail?.description,
      kind: detail?.jenisChallenge,
      kind_name: detail?.jenisChallengeName,
      startdate: detail?.startChallenge ? dayjs(detail?.startChallenge) : null,
      enddate: detail?.endChallenge ? dayjs(detail?.endChallenge) : null,
      starthour: dayjs(detail?.startTime),
      durasi: detail?.durasi,
      cycle: detail?.jumlahSiklusdurasi,
      cycle_day: detail?.durasi,
      statusChallenge: detail?.statusChallenge,

      object: detail?.objectChallenge === 'AKUN' ? 'account' : 'content',
      metric: detail?.metrik?.[0]?.Aktivitas ? 'activity' : 'interaction',
      activity_referal: detail?.metrik?.[0]?.AktivitasAkun?.[0]?.Referal,
      activity_following: detail?.metrik?.[0]?.AktivitasAkun?.[0]?.Ikuti,
      with_hashtag: detail?.metrik?.[0]?.InteraksiKonten?.tagar !== '' ? true : false,
      hashtag: detail?.metrik?.[0]?.InteraksiKonten?.tagar,
      interaction_create_vid: detail?.metrik?.[0]?.InteraksiKonten?.buatKonten?.[0]?.HyppeVid,
      interaction_create_pic: detail?.metrik?.[0]?.InteraksiKonten?.buatKonten?.[0]?.HyppePic,
      interaction_create_diary: detail?.metrik?.[0]?.InteraksiKonten?.buatKonten?.[0]?.HyppeDiary,
      interaction_like_vid: detail?.metrik?.[0]?.InteraksiKonten?.suka?.[0]?.HyppeVid,
      interaction_like_pic: detail?.metrik?.[0]?.InteraksiKonten?.suka?.[0]?.HyppePic,
      interaction_like_diary: detail?.metrik?.[0]?.InteraksiKonten?.suka?.[0]?.HyppeDiary,
      interaction_view_vid: detail?.metrik?.[0]?.InteraksiKonten?.tonton?.[0]?.HyppeVid,
      interaction_view_diary: detail?.metrik?.[0]?.InteraksiKonten?.tonton?.[0]?.HyppeDiary,
      content_like_vid: detail?.metrik?.[0]?.InteraksiKonten?.suka?.[0]?.HyppeVid,
      content_like_pic: detail?.metrik?.[0]?.InteraksiKonten?.suka?.[0]?.HyppePic,
      content_like_diary: detail?.metrik?.[0]?.InteraksiKonten?.suka?.[0]?.HyppeDiary,
      content_view_vid: detail?.metrik?.[0]?.InteraksiKonten?.tonton?.[0]?.HyppeVid,
      content_view_diary: detail?.metrik?.[0]?.InteraksiKonten?.tonton?.[0]?.HyppeDiary,

      account_type:
        detail?.peserta?.[0]?.tipeAkunTerverikasi === 'ALL'
          ? ['TERVERIFIKASI', 'TIDAKTERVERIFIKASI']
          : detail?.peserta?.[0]?.tipeAkunTerverikasi === 'YES'
          ? ['TERVERIFIKASI']
          : ['TIDAKTERVERIFIKASI'],
      age_range: detail?.peserta?.[0]?.rentangUmur
        ? Object.keys(detail?.peserta?.[0]?.rentangUmur?.[0]).map((item) => {
            if (detail?.peserta?.[0]?.rentangUmur?.[0][item] === 'YES') {
              dataAge.push(item);
            }

            return dataAge;
          })[0]
        : [],
      gender: detail?.peserta?.[0]?.jenisKelamin
        ? Object.keys(detail?.peserta?.[0]?.jenisKelamin?.[0]).map((item) => {
            if (detail?.peserta?.[0]?.jenisKelamin?.[0][item] === 'YES') {
              dataGender.push(item === 'LAKI-LAKI' ? 'L' : item === 'PEREMPUAN' ? 'P' : 'O');
            }

            return dataGender;
          })[0]
        : [],
      area: detail?.peserta?.[0]?.lokasiPengguna,
      type_invitation: detail?.peserta?.[0]?.caraGabung === 'SEMUA PENGGUNA' ? 'all' : 'invitation',

      show_status_user: detail?.tampilStatusPengguna,
      show_badge_leaderboard: detail?.leaderBoard?.[0]?.tampilBadge ? true : false,
      banner_leaderboard: {
        file: detail?.leaderBoard?.[0]?.bannerLeaderboard + '?m=' + new Date().getTime(),
        url: detail?.leaderBoard?.[0]?.bannerLeaderboard + '?m=' + new Date().getTime(),
      },
      banner_background_color: {
        color: detail?.leaderBoard?.[0]?.warnaBackground,
        custom: true,
      },

      winner_rewards: detail?.hadiahPemenang?.length >= 1,
      winner_rewards_type: detail?.hadiahPemenang?.[0]?.typeHadiah === 'POINT' ? 'poin' : 'ranking',
      reward_poin: detail?.hadiahPemenang?.[0]?.point?.[0]?.pointPrice,
      max_reward: detail?.hadiahPemenang?.[0]?.point?.[0]?.pointPriceMax,
      winner_ranking_price:
        detail?.hadiahPemenang?.[0]?.ranking &&
        Object.keys(detail?.hadiahPemenang?.[0]?.ranking?.[0])?.map((item, key) => {
          if (item === 'juara1') {
            dataPrice.push({
              ranking: 1,
              price: detail?.hadiahPemenang?.[0]?.ranking?.[0]['juara1'],
            });
          } else if (item === 'juara2') {
            dataPrice.push({
              ranking: 2,
              price: detail?.hadiahPemenang?.[0]?.ranking?.[0]['juara2'],
            });
          } else if (item === 'juara3') {
            dataPrice.push({
              ranking: 3,
              price: detail?.hadiahPemenang?.[0]?.ranking?.[0]['juara3'],
            });
          }

          return dataPrice;
        })[0],
      winner_badges: detail?.ketentuanHadiah?.[0]?.badgePemenang,
      winner_ranking_badge: detail?.ketentuanHadiah?.[0]?.badgePemenang
        ? Object.keys(detail?.ketentuanHadiah?.[0].badge?.[0]).map((item, key) => {
            if (item === 'juara1') {
              dataBadge.push({
                ranking: 1,
                profile: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara1,
                url_profile: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara1_profile,
                other: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara1,
                url_other: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara1_general,
              });
            } else if (item === 'juara2') {
              dataBadge.push({
                ranking: 2,
                profile: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara2,
                url_profile: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara2_profile,
                other: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara2,
                url_other: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara2_general,
              });
            } else if (item === 'juara3') {
              dataBadge.push({
                ranking: 3,
                profile: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara3,
                url_profile: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara3_profile,
                other: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara3,
                url_other: detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara3_general,
              });
            }

            return dataBadge;
          })[0]
        : [],

      banner_search: {
        file: detail?.bannerSearch?.[0]?.image + '?m=' + new Date().getTime(),
        url: detail?.bannerSearch?.[0]?.image + '?m=' + new Date().getTime(),
      },
      banner_popup: {
        file: detail?.popUp?.[0]?.image + '?m=' + new Date().getTime(),
        url: detail?.popUp?.[0]?.image + '?m=' + new Date().getTime(),
      },
      notification_push: detail?.notifikasiPush
        ? Object.keys(detail?.notifikasiPush?.[0]).map((item) => {
            if (detail?.notifikasiPush?.[0]?.[item]?.[0]?.include === 'YES') {
              dataNotif.push({
                type:
                  item === 'akanDatang'
                    ? 'upcoming'
                    : item === 'challengeDimulai'
                    ? 'start'
                    : item === 'updateLeaderboard'
                    ? 'update'
                    : item === 'challengeAkanBerakhir'
                    ? 'will_end'
                    : item === 'challengeBerakhir'
                    ? 'end'
                    : 'winner',
                title: detail?.notifikasiPush?.[0][item]?.[0]?.title,
                body: detail?.notifikasiPush?.[0][item]?.[0]?.description,
                blast: detail?.notifikasiPush?.[0][item]?.[0]?.aturWaktu,
              });
            }

            return dataNotif;
          })[0]
        : [],
    });
  }, [loadingDetail]);

  return (
    <Stack direction="column" gap={3}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Stack direction="row" height={43} justifyContent="space-between" alignItems="center" mt="-6px">
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          onClick={() =>
            detail?.statusChallenge === 'DRAFT'
              ? Router.replace('/challenge/draft')
              : Router.replace(`/challenge/${detail?.jenisChallengeName}`)
          }
          sx={{
            width: 'fit-content',
            '&:hover': {
              cursor: 'pointer',
            },
          }}>
          <ChevronLeft style={{ fontSize: 28 }} />
          <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>Kembali</Typography>
        </Stack>
        {!loadingDetail && (
          <Stack direction="row" spacing={2}>
            {(detail?.statusChallenge === 'DRAFT' || detail?.statuscurrentChallenge !== 'SEDANG BERJALAN') && (
              <Button
                variant="contained"
                color="secondary"
                style={{ borderRadius: 6, padding: '10px 20px' }}
                onClick={() => Router.push(`/challenge/edit/${detailId}`)}
                disabled={!access?.find((item) => item?.nameModule === 'challenge')?.acces?.updateAcces}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                  Edit Challenge
                </Typography>
              </Button>
            )}
            {(detail?.statusChallenge === 'DRAFT' || detail?.statuscurrentChallenge !== 'SEDANG BERJALAN') && (
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
                }
                disabled={!access?.find((item) => item?.nameModule === 'challenge')?.acces?.deleteAcces}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                  Hapus Challenge
                </Typography>
              </Button>
            )}
            {detail?.statusChallenge === 'DRAFT' ? (
              !detail?.startChallenge || dayjs(detail?.startChallenge).isBefore(dayjs()) ? (
                <Tooltip title="Tanggal Mulai Challenge sudah melewati dari batas waktu sekarang, ubah dahulu Tanggal Mulai Challenge untuk mempublikasi.">
                  <span>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{ borderRadius: 6, padding: '10px 20px' }}
                      onClick={() =>
                        setOpenModal({
                          showModal: !openModal.showModal,
                          status: 'publish',
                          selected: detail?._id,
                        })
                      }
                      disabled>
                      <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                        Publikasi
                      </Typography>
                    </Button>
                  </span>
                </Tooltip>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ borderRadius: 6, padding: '10px 20px' }}
                  onClick={() =>
                    setOpenModal({
                      showModal: !openModal.showModal,
                      status: 'publish',
                      selected: detail?._id,
                    })
                  }
                  disabled={!access?.find((item) => item?.nameModule === 'challenge')?.acces?.updateAcces}>
                  <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                    Publikasi
                  </Typography>
                </Button>
              )
            ) : (
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
                }
                disabled={!access?.find((item) => item?.nameModule === 'challenge')?.acces?.updateAcces}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Duplikasi</Typography>
              </Button>
            )}
          </Stack>
        )}
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
            {access?.map((item) => item?.nameModule)?.includes('challenge_participant') && (
              <Tab className={classes.tab} label="Partisipan" value="partisipan" style={{ padding: '0 0 8px' }} />
            )}
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
          {access?.map((item) => item?.nameModule)?.includes('challenge_participant') && (
            <TabPanel value="partisipan" style={{ padding: 0 }}>
              <ParticipantComponent detail={detail} />
            </TabPanel>
          )}
        </TabContext>
      )}

      <ModalConfirmation
        showModal={openModal.showModal}
        status={openModal.status}
        selectedItem={openModal.selected}
        onClose={(value) => {
          if (value === 'redirect') {
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
