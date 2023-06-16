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

const steps = ['Detail', 'Leaderboard', 'Hadiah', 'Notifikasi'];

const EditChallenge = () => {
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
              onClick={() => Router.replace('/challenge')}>
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
              if (activeStep < 6) {
                handleNext();
              } else {
                setOpenModal({
                  showModal: !openModal.showModal,
                  status: 'create',
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
