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

const ConsoleMonetizeComponent = () => {
  const [value, setValue] = React.useState('0');
  const router = useRouter();

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
            <div>
              <Tabs
                className="mb-5"
                value={value}
                onChange={handleChange}
                aria-label="disabled tabs example"
                indicatorColor="secondary"
                textColor="secondary">
                <Tab label="Dashboard" value="0" style={{ padding: '0px', marginRight: '2em', fontWeight: 'bold' }} />
                <Tab label="Voucher" value="1" style={{ padding: '0px', marginRight: '2em', fontWeight: 'bold' }} />
                <Tab label="Kepemilikan" value="2" style={{ padding: '0px', marginRight: '2em', fontWeight: 'bold' }} />
                <Tab label="Jual-Beli Konten" value="3" style={{ padding: '0px', marginRight: '2em', fontWeight: 'bold' }} />
              </Tabs>
            </div>
            {value == '1' && (
              <Stack direction={'column'} justifyContent={'center'}>
                <div>
                  <Button variant="contained" color="primary" onClick={() => router.push('/console/monetize/voucher') }>
                    Kelola voucher
                  </Button>
                </div>
              </Stack>
            )}
          </Stack>
          <TabPanel value="0">
            <MonetizeDashboard />
          </TabPanel>
          <TabPanel value="1">
            <MonetizeVoucher />
          </TabPanel>
          <TabPanel value="2">
            <MonetizeKepemilikanComponent />
          </TabPanel>
          <TabPanel value="3">
            <MonetizeKepemilikanComponent />
          </TabPanel>
        </TabContext>
      </PageContainer>
    </>
  );
};

export default ConsoleMonetizeComponent;
