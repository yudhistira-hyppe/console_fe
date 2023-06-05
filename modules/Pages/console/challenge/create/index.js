import React, { useEffect, useState } from 'react';
import Breadcrumbs from 'modules/Pages/console/help-center/bantuan-pengguna/BreadCrumb';
import { Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import ScrollBar from 'react-perfect-scrollbar';
import { Box, Button, Stack } from '@mui/material';
import ComponentStepDetail from './step/Detail';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ComponentStepType from './step/Type';

const breadcrumbs = [
  { label: 'Challenge', link: '/challenge' },
  { label: 'Buat Challenge', isActive: true },
];
const steps = ['Detail', 'Tipe', 'Partisipan', 'Undangan', 'Leader Board', 'Hadiah', 'Notifikasi'];

const CreateChallenge = () => {
  const [activeStep, setActiveStep] = useState(1);
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
        case 'activity_referal':
          return {
            ...prevVal,
            activity_referal: prevVal?.activity_referal >= 1 ? undefined : 1,
          };
        case 'count_referal':
          return {
            ...prevVal,
            activity_referal: value,
          };
        case 'activity_following':
          return {
            ...prevVal,
            activity_following: prevVal?.activity_following >= 1 ? undefined : 1,
          };
        case 'count_following':
          return {
            ...prevVal,
            activity_following: value,
          };
        case 'interaction_create_vid':
          return {
            ...prevVal,
            interaction_create_vid: prevVal?.interaction_create_vid >= 1 ? undefined : 1,
          };
        case 'count_create_vid':
          return {
            ...prevVal,
            interaction_create_vid: value,
          };
        case 'interaction_create_pic':
          return {
            ...prevVal,
            interaction_create_pic: prevVal?.interaction_create_pic >= 1 ? undefined : 1,
          };
        case 'count_create_pic':
          return {
            ...prevVal,
            interaction_create_pic: value,
          };
        case 'interaction_create_diary':
          return {
            ...prevVal,
            interaction_create_diary: prevVal?.interaction_create_diary >= 1 ? undefined : 1,
          };
        case 'count_create_diary':
          return {
            ...prevVal,
            interaction_create_diary: value,
          };
        case 'interaction_like_vid':
          return {
            ...prevVal,
            interaction_like_vid: prevVal?.interaction_like_vid >= 1 ? undefined : 1,
          };
        case 'count_like_vid':
          return {
            ...prevVal,
            interaction_like_vid: value,
          };
        case 'interaction_like_pic':
          return {
            ...prevVal,
            interaction_like_pic: prevVal?.interaction_like_pic >= 1 ? undefined : 1,
          };
        case 'count_like_pic':
          return {
            ...prevVal,
            interaction_like_pic: value,
          };
        case 'interaction_like_diary':
          return {
            ...prevVal,
            interaction_like_diary: prevVal?.interaction_like_diary >= 1 ? undefined : 1,
          };
        case 'count_like_diary':
          return {
            ...prevVal,
            interaction_like_diary: value,
          };
        case 'interaction_view_vid':
          return {
            ...prevVal,
            interaction_view_vid: prevVal?.interaction_view_vid >= 1 ? undefined : 1,
          };
        case 'count_view_vid':
          return {
            ...prevVal,
            interaction_view_vid: value,
          };
        case 'interaction_view_diary':
          return {
            ...prevVal,
            interaction_view_diary: prevVal?.interaction_view_diary >= 1 ? undefined : 1,
          };
        case 'count_view_diary':
          return {
            ...prevVal,
            interaction_view_diary: value,
          };
        case 'content_like_vid':
          return {
            ...prevVal,
            content_like_vid: prevVal?.content_like_vid >= 1 ? undefined : 1,
          };
        case 'content_count_like_vid':
          return {
            ...prevVal,
            content_like_vid: value,
          };
        case 'content_like_pic':
          return {
            ...prevVal,
            content_like_pic: prevVal?.content_like_pic >= 1 ? undefined : 1,
          };
        case 'content_count_like_pic':
          return {
            ...prevVal,
            content_like_pic: value,
          };
        case 'content_like_diary':
          return {
            ...prevVal,
            content_like_diary: prevVal?.content_like_diary >= 1 ? undefined : 1,
          };
        case 'content_count_like_diary':
          return {
            ...prevVal,
            content_like_diary: value,
          };
        case 'content_view_vid':
          return {
            ...prevVal,
            content_view_vid: prevVal?.content_view_vid >= 1 ? undefined : 1,
          };
        case 'content_count_view_vid':
          return {
            ...prevVal,
            content_view_vid: value,
          };
        case 'content_view_diary':
          return {
            ...prevVal,
            content_view_diary: prevVal?.content_view_diary >= 1 ? undefined : 1,
          };
        case 'content_count_view_diary':
          return {
            ...prevVal,
            content_view_diary: value,
          };
        case 'with_hashtag':
          return {
            ...prevVal,
            with_hashtag: value,
          };
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
