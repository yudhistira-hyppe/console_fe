import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@mui/material';
import React from 'react';
import CardPopular from '../card-populer';

const StickerChart = () => {
  return (
    <GridContainer>
      <Grid item xs={12} sm={4}>
        <CardPopular title="Stiker Populer" card="aesthetic" data={[]} loading={false} image />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardPopular title="Emoji Populer" card="special" data={[]} loading={false} image />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardPopular title="GIF Populer" card="special" data={[]} loading={false} image />
      </Grid>
    </GridContainer>
  );
};

export default StickerChart;
