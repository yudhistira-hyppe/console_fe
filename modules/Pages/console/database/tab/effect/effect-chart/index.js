import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@mui/material';
import React from 'react';
import CardPopular from '../card-populer';

const EffectChart = () => {
  return (
    <GridContainer>
      <Grid item xs={12} sm={6}>
        <CardPopular title="Efek Estetis Popular" description="Efek" card="aesthetic" data={[]} loading={false} image />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardPopular title="Efek Khusus Popular" description="Efek" card="special" data={[]} loading={false} image />
      </Grid>
    </GridContainer>
  );
};

export default EffectChart;
