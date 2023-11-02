import React from 'react';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import GraphChart from './CardChart';
import TotalSemuaPendapatan from './CardChart/TotalSemuaPendapatan';
import PendapatanVoucherGraph from './Voucher';
import PendapatanJualBeliGraph from './JualBeli';

const MonetizeDashboardComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GridContainer>
          <Grid item xs={12} sm={12} md={4}>
            <GraphChart title={'Total Semua Pendapatan'} content={<TotalSemuaPendapatan />} cardStyle={{ height: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PendapatanVoucherGraph />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PendapatanJualBeliGraph />
          </Grid>
        </GridContainer>
      </Grid>
    </Grid>
  );
};

export default MonetizeDashboardComponent;
