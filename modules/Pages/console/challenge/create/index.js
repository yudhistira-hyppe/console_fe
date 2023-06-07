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

const breadcrumbs = [
  { label: 'Challenge', link: '/challenge' },
  { label: 'Buat Challenge', isActive: true },
];
const steps = ['Detail', 'Tipe', 'Partisipan', 'Undangan', 'Leaderboard', 'Hadiah', 'Notifikasi'];

const CreateChallenge = () => {
  const [activeStep, setActiveStep] = useState(5);
  const [inputValue, setInputValue] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(inputValue);
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

  console.log(inputValue);

  return (
    <Stack direction="column" gap={3}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {activeStep === 0 && <ComponentStepDetail inputValue={inputValue} handleInputChange={handleInputChange} />}
        {activeStep === 1 && <ComponentStepType inputValue={inputValue} handleInputChange={handleInputChange} />}
        {activeStep === 2 && <ComponentStepParticipant inputValue={inputValue} handleInputChange={handleInputChange} />}
        {activeStep === 3 && <ComponentStepInvitation inputValue={inputValue} handleInputChange={handleInputChange} />}
        {activeStep === 4 && <ComponentStepLeaderboard inputValue={inputValue} handleInputChange={handleInputChange} />}
        {activeStep === 5 && <ComponentStepRewards inputValue={inputValue} handleInputChange={handleInputChange} />}
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
          <Box />
        )}
        <Button variant="contained" color="secondary" style={{ borderRadius: 6, padding: '10px 20px' }} onClick={handleNext}>
          <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Next</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreateChallenge;
