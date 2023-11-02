import React from 'react';
import GridContainer from '@jumbo/components/GridContainer';
import CardChart from './CardChart';
import { Grid } from '@material-ui/core';
import TotalSemuaPendapatan from './CardChart/TotalSemuaPendapatan';
import Voucher from './Voucher';
import JualBeli from './JualBeli';

const MonetizeDashboardComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GridContainer>
          <Grid item xs={12} sm={12} md={4}>
            <CardChart title={'Total Semua Pendapatan'} content={<TotalSemuaPendapatan />} cardStyle={{ height: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Voucher />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <JualBeli />
          </Grid>
        </GridContainer>
      </Grid>
    </Grid>
  );
};

export default MonetizeDashboardComponent;
