import React, { useEffect, useState } from 'react';
import Breadcrumbs from 'modules/Pages/console/help-center/bantuan-pengguna/BreadCrumb';
import { Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import ScrollBar from 'react-perfect-scrollbar';
import { Box, Button, Stack } from '@mui/material';
import ComponentStepDetail from './step/Detail';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ComponentStepType from './step/Type';
import ComponentStepParticipant from './step/Participant';
import ComponentStepInvitation from './step/Invitation';
import ComponentStepLeaderboard from './step/Leaderboard';
import ComponentStepRewards from './step/Rewards';
import ComponentStepNotification from './step/Notification';
import { isEmpty } from 'lodash';
import ChooseParticipant from './step/ChooseParticipant';
import { ArrowLeft, ChevronLeft } from '@material-ui/icons';
import Router from 'next/router';
import ModalConfirmation from '../modal/ModalConfirmation';

const steps = ['Detail', 'Tipe', 'Partisipan', 'Undangan', 'Leaderboard', 'Hadiah', 'Notifikasi'];

const CreateChallenge = ({ moreSlug }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [inputValue, setInputValue] = useState({});
  const breadcrumbs = moreSlug
    ? [
        { label: 'Challenge', link: '/challenge/huehue' },
        { label: 'Buat Challenge', link: '/challenge/create' },
        { label: 'Pilih Partisipan', isActive: true },
      ]
    : [
        { label: 'Challenge', link: '/challenge/huehue' },
        { label: 'Buat Challenge', isActive: true },
      ];
  const [openModal, setOpenModal] = useState({
    showModal: false,
    status: '',
    selected: {},
  });

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
      {moreSlug ? (
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          onClick={() => Router.replace('/challenge/create')}
          sx={{
            width: 'fit-content',
            '&:hover': {
              cursor: 'pointer',
            },
          }}>
          <ChevronLeft style={{ fontSize: 28 }} />
          <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>Pilih Partisipan</Typography>
        </Stack>
      ) : (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Buat Challenge</Typography>
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
      )}

      {moreSlug ? (
        <ChooseParticipant inputValue={inputValue} handleInputChange={handleInputChange} />
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {activeStep === 0 && <ComponentStepDetail inputValue={inputValue} handleInputChange={handleInputChange} />}
          {activeStep === 1 && <ComponentStepType inputValue={inputValue} handleInputChange={handleInputChange} />}
          {activeStep === 2 && <ComponentStepParticipant inputValue={inputValue} handleInputChange={handleInputChange} />}
          {activeStep === 3 && <ComponentStepInvitation inputValue={inputValue} handleInputChange={handleInputChange} />}
          {activeStep === 4 && <ComponentStepLeaderboard inputValue={inputValue} handleInputChange={handleInputChange} />}
          {activeStep === 5 && <ComponentStepRewards inputValue={inputValue} handleInputChange={handleInputChange} />}
          {activeStep === 6 && <ComponentStepNotification inputValue={inputValue} handleInputChange={handleInputChange} />}
        </LocalizationProvider>
      )}

      {!moreSlug && (
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
            <Box />
          )}
          <Stack direction="row" gap={2}>
            {activeStep === 6 && (
              <Button
                variant="outlined"
                color="secondary"
                style={{ borderRadius: 6, padding: '10px 20px' }}
                onClick={() => {
                  setOpenModal({
                    showModal: !openModal.showModal,
                    status: 'create-draft',
                    selected: inputValue,
                  });
                }}
                disabled={checkDisabled()}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                  Simpan Draft
                </Typography>
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: 6, padding: '10px 20px' }}
              onClick={() => {
                if (activeStep < 6) {
                  handleNext();
                } else {
                  setOpenModal({
                    showModal: !openModal.showModal,
                    status: 'create',
                    selected: inputValue,
                  });
                }
              }}
              disabled={checkDisabled()}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                {activeStep === 6 ? 'Buat Challenge' : 'Next'}
              </Typography>
            </Button>
          </Stack>
        </Stack>
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

export default CreateChallenge;
