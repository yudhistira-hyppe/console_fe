import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CardInfoSaldoComponent from './CardInfoSaldo';
import CardMenuMonetizeComponent from './CardMenuMonetize';
const iconVideo = '/images/icons/icon_video.png';
const iconContent = '/images/icons/icon_content.png';
const iconVoucher = '/images/icons/icon_voucher.png';
import { fromatMoney } from 'helpers/stringHelper';
import { getDashboardData } from 'redux/actions/monetizeAction';

const breadcrumbs = [
    { label: 'Home', link: '/console' },
    { label: 'Monetize', isActive: true },
  ];

const ConsoleMonetizeComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {dashboard} = useSelector((state) => state.monetizeReducers);
  const clickedComponent = () => {
    console.log("clicked")
  }
  
  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  const registeredContentCount = dashboard ? dashboard.new_registered_content + " Pendaftaran Baru" : "0 Pendaftaran Baru";
  const newContentCount = dashboard ? dashboard.new_content + " Konten Baru" : "0 Konten Baru";
  const newVoucherCount = dashboard ? dashboard.new_voucher + " Permintaan Voucher" : "0 Permintaan Voucher";
  const balance = dashboard ? fromatMoney(dashboard.balance) : 0;
  const debt = dashboard ? fromatMoney(dashboard.debt) : 0;

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Monetize</title>
      </Head>
      <PageContainer heading="Monetize" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} sm={6} md={6}>
            <CardInfoSaldoComponent saldo={"Rp " + balance} title="Total Saldo Hyppe" backgroundColor="#FFFFFF"/>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CardInfoSaldoComponent saldo={"Rp " + debt} title="Total Penarikan Saldo Hyppe" backgroundColor="#FFFFFF"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardMenuMonetizeComponent clickedElement={() => router.push('/console/monetize/pendaftaran_konten')} icon={iconVideo} title="Pendaftaran Konten" subtitle={registeredContentCount} backgroundColor="#8E49F0"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardMenuMonetizeComponent clickedElement={() => router.push('/console/monetize/konten')} icon={iconContent} title="Konten" subtitle={newContentCount} backgroundColor="#5AB9FE"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardMenuMonetizeComponent clickedElement={() => router.push('/console/monetize/voucher')} icon={iconVoucher} title="Voucher Campaign" subtitle={newVoucherCount} backgroundColor="#C076FB"/>
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleMonetizeComponent;
