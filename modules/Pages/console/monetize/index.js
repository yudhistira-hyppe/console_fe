import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Head from 'next/head';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MonetizeDashboard from './Dashboard';
import MonetizeVoucher from './voucher';
import { Stack } from '@mui/system';
import { Button } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import MonetizeKepemilikanComponent from './Kepemilikan';
import { useRouter } from 'next/router';
import MonetizeJualBeliComponent from './jual-beli';
import Cookies from 'js-cookie';

const ConsoleMonetizeComponent = () => {
  const [value, setValue] = React.useState('0');
  const router = useRouter();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Monetize</title>
      </Head>
      <PageContainer>
        <TabContext value={value}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Tabs
              className="mb-5"
              value={value}
              onChange={handleChange}
              variant="scrollable"
              aria-label="disabled scrollable auto tabs"
              indicatorColor="secondary"
              textColor="secondary">
              {access.map((item) => item?.nameModule).includes('monetize_dashboard') && (
                <Tab
                  label="Dashboard"
                  value="0"
                  style={{
                    padding: '0px',
                    marginRight: '1.5em',
                    fontWeight: 'bold',
                    fontFamily: 'Lato',
                    fontSize: 16,
                    textTransform: 'initial',
                  }}
                />
              )}
              {access.map((item) => item?.nameModule).includes('monetize_voucher') && (
                <Tab
                  label="Voucher"
                  value="1"
                  style={{
                    padding: '0px',
                    marginRight: '1.5em',
                    fontWeight: 'bold',
                    fontFamily: 'Lato',
                    fontSize: 16,
                    textTransform: 'initial',
                  }}
                />
              )}
              {access.map((item) => item?.nameModule).includes('monetize_ownership') && (
                <Tab
                  label="Kepemilikan"
                  value="2"
                  style={{
                    padding: '0px',
                    marginRight: '1.5em',
                    fontWeight: 'bold',
                    fontFamily: 'Lato',
                    fontSize: 16,
                    textTransform: 'initial',
                  }}
                />
              )}
              {access.map((item) => item?.nameModule).includes('monetize_buy/sell') && (
                <Tab
                  label="Jual-Beli Konten"
                  value="3"
                  style={{
                    padding: '0px',
                    marginRight: '1.5em',
                    fontWeight: 'bold',
                    fontFamily: 'Lato',
                    fontSize: 16,
                    textTransform: 'initial',
                  }}
                />
              )}
            </Tabs>
            {value == '1' && (
              <Stack direction={'column'} justifyContent={'center'}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/monetize/voucher')}
                    disabled={!access.map((item) => item?.nameModule).includes('monetize_manage_voucher')}>
                    Kelola voucher
                  </Button>
                </div>
              </Stack>
            )}
          </Stack>
          {access.map((item) => item?.nameModule).includes('monetize_dashboard') && (
            <TabPanel style={{ padding: 0 }} value="0">
              <MonetizeDashboard />
            </TabPanel>
          )}
          {access.map((item) => item?.nameModule).includes('monetize_voucher') && (
            <TabPanel style={{ padding: 0 }} value="1">
              <MonetizeVoucher />
            </TabPanel>
          )}
          {access.map((item) => item?.nameModule).includes('monetize_ownership') && (
            <TabPanel style={{ padding: 0 }} value="2">
              <MonetizeKepemilikanComponent />
            </TabPanel>
          )}
          {access.map((item) => item?.nameModule).includes('monetize_buy/sell') && (
            <TabPanel style={{ padding: 0 }} value="3">
              <MonetizeJualBeliComponent />
            </TabPanel>
          )}
        </TabContext>
      </PageContainer>
    </>
  );
};

export default ConsoleMonetizeComponent;
