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

const steps = ['Detail', 'Leaderboard', 'Hadiah', 'Notifikasi'];

const EditChallenge = ({ detailId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [inputValue, setInputValue] = useState({});
  const [openModal, setOpenModal] = useState({
    showModal: false,
    status: '',
    selected: {},
  });

  const breadcrumbs = [
    { label: 'Challenge', link: '/challenge' },
    { label: 'Edit Challenge', isActive: true },
  ];

  const { data: detail, isLoading: loadingDetail } = useGetDetailChallengeQuery(detailId);

  useEffect(() => {
    setInputValue({
      _id: detail?._id,
      name: detail?.nameChallenge,
      description: detail?.description,
      kind: detail?.jenisChallenge,
      startdate: dayjs(detail?.startChallenge).toDate(),
      enddate: dayjs(detail?.endChallenge).toDate(),
      starthour: detail?.startTime,
      durasi: detail?.durasi,
      show_status_user: detail?.tampilStatusPengguna,
      show_badge_leaderboard: detail?.leaderBoard?.[0]?.tampilBadge,
      banner_leaderboard: {
        file: detail?.leaderBoard?.[0]?.bannerLeaderboard,
        url: detail?.leaderBoard?.[0]?.bannerLeaderboard,
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
      winner_ranking_badge:
        detail?.ketentuanHadiah &&
        Object.keys(detail?.ketentuanHadiah?.[0].badge?.[0]).map((item, key) => {
          return {
            ranking: key + 1,
            profile: item,
            other: item,
          };
        }),
      banner_search: {
        file: detail?.bannerSearch?.[0]?.image,
        url: detail?.bannerSearch?.[0]?.image,
      },
      banner_popup: {
        file: detail?.popUp?.[0]?.image,
        url: detail?.popUp?.[0]?.image,
      },
    });
  }, [loadingDetail]);

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
            {activeStep === 0 && <ComponentStepDetail inputValue={inputValue} handleInputChange={handleInputChange} />}
            {activeStep === 1 && <ComponentStepLeaderboard inputValue={inputValue} handleInputChange={handleInputChange} />}
            {activeStep === 2 && <ComponentStepRewards inputValue={inputValue} handleInputChange={handleInputChange} />}
            {activeStep === 3 && <ComponentStepNotification inputValue={inputValue} handleInputChange={handleInputChange} />}
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
                  if (activeStep < 3) {
                    handleNext();
                  } else {
                    setOpenModal({
                      showModal: !openModal.showModal,
                      status: 'update',
                      selected: inputValue,
                    });
                  }
                }}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                  {activeStep === 3 ? 'Simpan Challenge' : 'Next'}
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
