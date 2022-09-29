import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React from 'react';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import SearchSection from '../components/KepemilikianSearchSection';
import TableSection from '../components/KepemilikanTableSection';

const MonetizeKepemilikanComponent = () => {
  return (
    <>
      <PageContainer>
        <GridContainer>
          <Grid item xs={12} md={3} sm={3}>
            <SearchSection />
          </Grid>
          <Grid item xs={12} md={9} sm={9}>
            <TableSection order="desc" />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default MonetizeKepemilikanComponent;
