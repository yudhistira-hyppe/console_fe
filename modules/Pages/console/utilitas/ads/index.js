import { Stack } from '@mui/material';
import React from 'react';
import AdsPlace from './AdsPlace';
import AdsType from './AdsType';

const UtilityAds = () => {
  return (
    <Stack direction="column" spacing={4}>
      <AdsType />
      <AdsPlace />
    </Stack>
  );
};

export default UtilityAds;
