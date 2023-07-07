import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid } from '@mui/material';
import React from 'react';
import NotifikasiComponent from './Notifikasi';
import ButtonCTAComponent from './ButtonCTA';

const AdsSettingPengaturan = () => {
  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <NotifikasiComponent />
        </Grid>
        <Grid item xs={12} md={6}>
          <ButtonCTAComponent />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AdsSettingPengaturan;
