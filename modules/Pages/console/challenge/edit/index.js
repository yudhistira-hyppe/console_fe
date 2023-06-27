import React, { useEffect, useState } from 'react';
import Breadcrumbs from 'modules/Pages/console/help-center/bantuan-pengguna/BreadCrumb';
import { Box, Button, Stack } from '@mui/material';
import Router from 'next/router';
import { ChevronLeft } from '@material-ui/icons';
import { Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import ScrollBar from 'react-perfect-scrollbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ComponentStepLeaderboard from './step/Leaderboard';
import ComponentStepRewards from './step/Rewards';
import ComponentStepNotification from './step/Notification';
import ComponentStepDetail from './step/Detail';
import ModalConfirmation from '../modal/ModalConfirmation';
import { useGetDetailChallengeQuery } from 'api/console/challenge';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import dayjs from 'dayjs';
import ComponentStepInvitation from './step/Invitation';
import ComponentStepType from './step/Type';
import ComponentStepParticipant from './step/Participant';
import { isEmpty } from 'lodash';

const EditChallenge = ({ detailId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [inputValue, setInputValue] = useState({});
  const [openModal, setOpenModal] = useState({
    showModal: false,
    status: '',
    selected: {},
  });

  const breadcrumbs = [
    { label: 'Challenge', link: '/challenge/huehue' },
    { label: 'Edit Challenge', isActive: true },
  ];

  const { data: detail, isLoading: loadingDetail } = useGetDetailChallengeQuery(detailId);

  const isDraft = detail?.statusChallenge === 'DRAFT';

  const steps = isDraft
    ? ['Detail', 'Tipe', 'Partisipan', 'Undangan', 'Leaderboard', 'Hadiah', 'Notifikasi']
    : ['Detail', 'Leaderboard', 'Hadiah', 'Notifikasi'];

  useEffect(() => {
    let dataBadge = [];
    let dataAge = [];
    let dataGender = [];
    let dataNotif = [];

    setInputValue({
      _id: detail?._id,
      name: detail?.nameChallenge,
      description: detail?.description,
      kind: detail?.jenisChallenge,
      startdate: detail?.startChallenge ? dayjs(detail?.startChallenge) : null,
      enddate: detail?.endChallenge ? dayjs(detail?.endChallenge) : null,
      starthour: dayjs(detail?.startTime),
      durasi: detail?.durasi,
      cycle: detail?.jumlahSiklusdurasi,
      cycle_day: detail?.durasi,

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
      winner_ranking_price: detail?.hadiahPemenang?.map((item, key) => {
        return {
          ranking: key + 1,
          price: item[`juara${key + 1}`],
        };
      }),
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

  console.log(inputValue);

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (kind, value) => {
    setInputValue((prevVal) => {
      switch (kind) {
        default:
          return { ...prevVal, [kind]: value };
      }
    });
  };

  const checkDisabled = () => {
    let disabled = false;

    if (
      activeStep == 0 &&
      (!inputValue?.name ||
        !inputValue?.kind ||
        !inputValue?.cycle ||
        !inputValue?.cycle_day ||
        !inputValue?.startdate ||
        !inputValue?.starthour ||
        !inputValue?.description)
    ) {
      disabled = true;
    } else if (
      activeStep == 1 &&
      (!inputValue?.object ||
        (inputValue?.object === 'account' &&
          inputValue?.metric === 'activity' &&
          inputValue?.activity_referal < 1 &&
          inputValue?.activity_following < 1) ||
        (inputValue?.object === 'account' &&
          inputValue?.metric === 'interaction' &&
          inputValue?.interaction_create_vid < 1 &&
          inputValue?.interaction_create_pic < 1 &&
          inputValue?.interaction_create_diary < 1 &&
          inputValue?.interaction_like_vid < 1 &&
          inputValue?.interaction_like_pic < 1 &&
          inputValue?.interaction_like_diary < 1 &&
          inputValue?.interaction_view_vid < 1 &&
          inputValue?.interaction_view_diary < 1) ||
        (inputValue?.object === 'content' &&
          inputValue?.content_like_vid < 1 &&
          inputValue?.content_like_pic < 1 &&
          inputValue?.content_like_diary < 1 &&
          inputValue?.content_view_vid < 1 &&
          inputValue?.content_view_diary < 1))
    ) {
      disabled = true;
    } else if (
      activeStep == 2 &&
      (isEmpty(inputValue?.account_type) ||
        isEmpty(inputValue?.age_range) ||
        isEmpty(inputValue?.gender) ||
        isEmpty(inputValue?.area))
    ) {
      disabled = true;
    } else if (
      activeStep == 3 &&
      (!inputValue?.type_invitation || (inputValue?.type_invitation === 'invitation' && isEmpty(inputValue?.invited_people)))
    ) {
      disabled = true;
    } else if (activeStep == 4 && (!inputValue?.banner_leaderboard || !inputValue?.banner_background_color)) {
      disabled = true;
    } else if (
      activeStep == 5 &&
      ((!inputValue?.winner_rewards && !inputValue?.winner_badges) ||
        (inputValue?.winner_rewards &&
          inputValue?.winner_rewards_type === 'ranking' &&
          isEmpty(inputValue?.winner_ranking_price)) ||
        (inputValue?.winner_rewards &&
          inputValue?.winner_rewards_type === 'ranking' &&
          inputValue?.winner_ranking_price?.map((item) => item?.price)?.filter((item) => item !== '')?.length < 1) ||
        (inputValue?.winner_rewards &&
          inputValue?.winner_rewards_type === 'poin' &&
          !inputValue?.max_reward &&
          !inputValue?.point_reward) ||
        (inputValue?.winner_badges && isEmpty(inputValue?.winner_ranking_badge)) ||
        (inputValue?.winner_badges &&
          (inputValue?.winner_ranking_badge?.map((item) => item?.profile)?.filter((item) => item !== undefined)?.length <
            1 ||
            inputValue?.winner_ranking_badge?.map((item) => item?.other)?.filter((item) => item !== undefined)?.length < 1)))
    ) {
      disabled = true;
    } else if (
      activeStep == 6 &&
      (!inputValue?.banner_search || !inputValue?.banner_popup || isEmpty(inputValue?.notification_push))
    ) {
      disabled = true;
    }
    return disabled;
  };

  return (
    <Stack direction="column" gap={3}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
        <ScrollBar style={{ width: 950 }}>
          <Stepper style={{ backgroundColor: 'transparent', padding: 0 }} activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>
                    <Typography style={{ whiteSpace: 'nowrap', fontSize: 14, fontFamily: 'normal' }}>{label}</Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </ScrollBar>
      </Stack>

      {loadingDetail ? (
        <PageLoader />
      ) : (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {isDraft ? (
              <>
                {activeStep === 0 && (
                  <ComponentStepDetail inputValue={inputValue} handleInputChange={handleInputChange} isDraft={isDraft} />
                )}
                {activeStep === 1 && (
                  <ComponentStepType inputValue={inputValue} handleInputChange={handleInputChange} isDraft={isDraft} />
                )}
                {activeStep === 2 && (
                  <ComponentStepParticipant
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    isDraft={isDraft}
                  />
                )}
                {activeStep === 3 && (
                  <ComponentStepInvitation inputValue={inputValue} handleInputChange={handleInputChange} isDraft={isDraft} />
                )}
                {activeStep === 4 && (
                  <ComponentStepLeaderboard
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    isDraft={isDraft}
                  />
                )}
                {activeStep === 5 && (
                  <ComponentStepRewards inputValue={inputValue} handleInputChange={handleInputChange} isDraft={isDraft} />
                )}
                {activeStep === 6 && (
                  <ComponentStepNotification
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    isDraft={isDraft}
                  />
                )}
              </>
            ) : (
              <>
                {activeStep === 0 && (
                  <ComponentStepDetail inputValue={inputValue} handleInputChange={handleInputChange} isDraft={isDraft} />
                )}
                {activeStep === 1 && (
                  <ComponentStepLeaderboard
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    isDraft={isDraft}
                  />
                )}
                {activeStep === 2 && (
                  <ComponentStepRewards inputValue={inputValue} handleInputChange={handleInputChange} isDraft={isDraft} />
                )}
                {activeStep === 3 && (
                  <ComponentStepNotification
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    isDraft={isDraft}
                  />
                )}
              </>
            )}
          </LocalizationProvider>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {activeStep > 0 ? (
              <Button
                variant="outlined"
                color="secondary"
                style={{ borderRadius: 6, padding: '10px 20px' }}
                onClick={handleBack}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Back</Typography>
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                style={{ borderRadius: 6, padding: '10px 20px' }}
                onClick={() => Router.replace('/challenge')}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                  Batalkan Perubahan
                </Typography>
              </Button>
            )}
            <Stack direction="row" spacing={2}>
              {activeStep > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  style={{ borderRadius: 6, padding: '10px 20px' }}
                  onClick={() => Router.back()}>
                  <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                    Batalkan Perubahan
                  </Typography>
                </Button>
              )}
              <Button
                variant="contained"
                color="secondary"
                style={{ borderRadius: 6, padding: '10px 20px' }}
                onClick={() => {
                  if (activeStep < (isDraft ? 6 : 3)) {
                    handleNext();
                  } else {
                    setOpenModal({
                      showModal: !openModal.showModal,
                      status: 'update',
                      selected: inputValue,
                    });
                  }
                }}
                disabled={isDraft ? checkDisabled() : false}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                  {activeStep === (isDraft ? 6 : 3) ? 'Simpan Challenge' : 'Next'}
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </>
      )}

      <ModalConfirmation
        showModal={openModal.showModal}
        status={openModal.status}
        selectedItem={openModal.selected}
        onClose={() => {
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

export default EditChallenge;
