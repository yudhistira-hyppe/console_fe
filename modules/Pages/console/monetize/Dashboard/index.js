import React from 'react';
import GridContainer from '@jumbo/components/GridContainer';
import CardChart from '../CardChart';
import { Grid } from '@material-ui/core';

const MonetizeDashboardComponent = () => {
  const ripple = [
    { month: 'Jan', price: 1500 },
    { month: '', price: 400 },
    { month: 'Feb', price: 2000 },
    { month: 'Mar', price: 1200 },
    { month: 'Apr', price: 2200 },
    { month: 'May', price: 2600 },
    { month: 'Jun', price: 4300 },
    { month: 'July', price: 2900 },
    { month: 'Aug', price: 3800 },
    { month: 'Sep', price: 1500 },
  ];
  const [totalStatus, setTotalStatus] = React.useState('Semua');
  const [voucherStatus, setVoucherStatus] = React.useState('Semua');
  const [jualBeliStatus, setJualBeliStatus] = React.useState('Semua');
  const [kepemilikanStatus, setKepemilikanStatus] = React.useState('Semua');
  const [voucherTerjualStatus, setVoucherTerjualStatus] = React.useState('Semua');
  const [jualBeliKontenStatus, setJualBeliKontenStatus] = React.useState('Semua');
  const [pendapatanKepemilikanStatus, setPendapatanKepemilikanStatus] = React.useState('Semua');

  const changeStatusHandler = (newvalue, type) => {
    console.log(newvalue, type);
    if (newvalue) {
      switch (type) {
        case 'voucher':
          setVoucherStatus(newvalue);
          break;
        case 'total':
          setTotalStatus(newvalue);
          break;
        case 'jualBeli':
          setJualBeliStatus(newvalue);
          break;
        case 'jualBeliKonten':
          setJualBeliKontenStatus(newvalue);
          break;
        case 'kepemilikan':
          setKepemilikanStatus(newvalue);
          break;
        case 'voucherTerjual':
          setVoucherTerjualStatus(newvalue);
          break;
        case 'pendapatanKepemilikan':
          setPendapatanKepemilikanStatus(newvalue);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GridContainer>
          <Grid item xs={12} sm={6} md={3}>
            <CardChart
              title={'Total Semua Pendapatan'}
              amount={'Rp 48.500.000'}
              status={totalStatus}
              setStatusList={(val) => changeStatusHandler(val, 'total')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardChart
              title={'Pendapatan Voucher'}
              amount={'Rp 16.500.000'}
              dataChart={ripple}
              colorGradient={'color12'}
              colorStop1={'rgba(180, 87, 246, 1)'}
              colorStop2={'rgba(244, 229, 246, 0)'}
              dataKey={'price'}
              status={voucherStatus}
              setStatusList={(val) => changeStatusHandler(val, 'voucher')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardChart
              title={'Pendapatan Jual Beli'}
              amount={'Rp 16.500.000'}
              dataChart={ripple}
              colorGradient={'color13'}
              colorStop1={'rgba(203, 118, 205, 1)'}
              colorStop2={'rgba(244, 229, 246, 0)'}
              dataKey={'price'}
              status={jualBeliStatus}
              setStatusList={(val) => changeStatusHandler(val, 'jualBeli')}
            />
          </Grid>
        </GridContainer>
      </Grid>
    </Grid>
  );
};

export default MonetizeDashboardComponent;
