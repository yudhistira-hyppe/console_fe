import React from 'react';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@mui/material';
import CardPopular from '../card-populer';
import { useGetMediaChartQuery } from 'api/console/database';

const MediaChart = () => {
  const { data: mediaChart, isFetching: loadingChart } = useGetMediaChartQuery();

  return (
    <GridContainer>
      <Grid item xs={12} sm={6}>
        <CardPopular
          title="Artis Populer"
          description="Nama Artis"
          card="artis"
          data={mediaChart?.data[0]?.artistPopuler || []}
          loading={loadingChart}
          image
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardPopular
          title="Musik Populer"
          description="Judul Lagu"
          card="musik"
          data={mediaChart?.data[0]?.musicPopuler || []}
          loading={loadingChart}
          image
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardPopular
          title="Genre Populer"
          description="Genre"
          card="genre"
          data={mediaChart?.data[0]?.genrePopuler || []}
          loading={loadingChart}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardPopular
          title="Tema Populer"
          description="Tema"
          card="tema"
          data={mediaChart?.data[0]?.themePopuler || []}
          loading={loadingChart}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardPopular
          title="Suasana Hati Populer"
          description="Suasana Hati"
          card="mood"
          data={mediaChart?.data[0]?.moodPopuler || []}
          loading={loadingChart}
        />
      </Grid>
    </GridContainer>
  );
};

export default MediaChart;
