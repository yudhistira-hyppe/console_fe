import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@mui/material';
import React from 'react';
import CardPopular from '../card-populer';
import { useGetStickerTrendQuery } from 'api/console/database';

const StickerChart = () => {
  const { data: stickerTrend, isLoading: loadingTrend } = useGetStickerTrendQuery();

  return (
    <GridContainer>
      <Grid item xs={12} sm={4}>
        <CardPopular title="Stiker Populer" data={stickerTrend?.data?.[0]?.stiker} loading={loadingTrend} image />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardPopular title="Emoji Populer" data={stickerTrend?.data?.[0]?.emoji} loading={loadingTrend} image />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardPopular title="GIF Populer" data={stickerTrend?.data?.[0]?.gif} loading={loadingTrend} image />
      </Grid>
    </GridContainer>
  );
};

export default StickerChart;
