import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid } from '@material-ui/core';
import React from 'react';
import { SearchSection, TableSection } from '../components';

const MonetizeVoucherComponent = () => {
  return (
    <>
      <PageContainer>
        <GridContainer>
          <Grid item xs={12} md={3} sm={3}>
            <SearchSection />
          </Grid>
          <Grid item xs={12} md={9} sm={9}>
            <TableSection />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default MonetizeVoucherComponent;
