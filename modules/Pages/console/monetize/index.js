import React, { useEffect, useState } from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import { useGetAccountBalanceQuery } from 'api/user/user';
import { formatCurrency } from 'helpers/stringHelper';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CardInfoSaldoComponent from './CardInfoSaldo';
import CardMenuMonetizeComponent from './CardMenuMonetize';
const iconVideo = '/images/icons/icon_video.png';
const iconContent = '/images/icons/icon_content.png';
const iconVoucher = '/images/icons/icon_voucher.png';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Monetize', isActive: true },
];

const ConsoleMonetizeComponent = () => {
  // const router = useRouter();
  const { data: accountBalance } = useGetAccountBalanceQuery({});
  const [totalBalance, setTotalBalance] = useState('');
  const [totalWithdrawal, setTotalWithdrawal] = useState('');

  useEffect(() => {
    if (accountBalance) {
      setTotalBalance(`Rp ${formatCurrency(accountBalance.data[0].totalsaldo)}`);
      setTotalWithdrawal(`Rp ${formatCurrency(accountBalance.data[0].totalpenarikan)}`);
    }
  }, [accountBalance]);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Monetize</title>
      </Head>
      <PageContainer heading="Monetize" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} sm={6} md={6}>
            <CardInfoSaldoComponent saldo={totalBalance} title="Total Saldo Hyppe" backgroundColor="#FFFFFF" />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CardInfoSaldoComponent saldo={totalWithdrawal} title="Total Penarikan Saldo Hyppe" backgroundColor="#FFFFFF" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardMenuMonetizeComponent
              // clickedElement={() => router.push('/console/monetize/pendaftaran_konten')}
              icon={iconVideo}
              title="Pendaftaran Konten"
              subtitle="0 Pendaftaran Baru"
              backgroundColor="#8E49F0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardMenuMonetizeComponent
              // clickedElement={() => router.push('/console/monetize/konten')}
              icon={iconContent}
              title="Konten"
              subtitle="0 Konten Baru"
              backgroundColor="#5AB9FE"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardMenuMonetizeComponent
              // clickedElement={() => router.push('/console/monetize/voucher')}
              icon={iconVoucher}
              title="Voucher Campaign"
              subtitle="0 Permintaan Voucher"
              backgroundColor="#C076FB"
            />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleMonetizeComponent;
