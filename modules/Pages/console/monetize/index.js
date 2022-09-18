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

const ConsoleMonetizeComponent = () => {
  const [value, setValue] = React.useState(2);

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
              <Tabs className="mb-5" value={value} onChange={handleChange} aria-label="disabled tabs example">
                <Tab label="Dashboard" value="0" />
                <Tab label="Voucher" value="1" />
                <Tab label="Kepemilikan" value="2" />
                <Tab label="Jual-Beli Konten" value="3" />
              </Tabs>
            </div>
            <Stack direction={'column'} justifyContent={'center'}>
              <div>
                <Button variant="contained" color="primary">
                  Kelola voucher
                </Button>
              </div>
            </Stack>
          </Stack>
          <TabPanel value="0">
            <MonetizeDashboard />
          </TabPanel>
          <TabPanel value="1">
            <MonetizeVoucher />
          </TabPanel>
        </TabContext>
      </PageContainer>
    </>
  );
};

export default ConsoleMonetizeComponent;
