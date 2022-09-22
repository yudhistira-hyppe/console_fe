import Head from 'next/head';
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import Breadcrumbs from '../bantuan-pengguna/BreadCrumb';
import { Link, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TableSection from './TableSection';
import SearchSection from './SearchSection';

const ConsolePelaporanIklanComponent = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/console' },
    { label: 'Help Center', link: '/console/help-center' },
    { label: 'Pelaporan Iklan', isActive: true },
  ];
  const router = useRouter();
  const [value, setValue] = useState(null);
  const [order, setOrder] = useState('DESC');

  const onBackHandler = (e) => {
    e.preventDefault();
    router.push('/console/help-center');
  };

  const onChangeOrderHandler = (val) => {
    setOrder(val);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Keluhan Pengguna</title>
      </Head>

      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Link href="/" onClick={onBackHandler} style={{ cursore: 'pointer' }}>
          <Stack direction={'row'}>
            <Stack direction={'column'} justifyContent={'center'}>
              <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }} />
            </Stack>
            <Stack>
              <Typography variant="h1" style={{ color: 'black' }}>
                Kembali
              </Typography>
            </Stack>
          </Stack>
        </Link>
      </Stack>
      <PageContainer heading="">
        <Stack direction={'row'} spacing={3}>
          <SearchSection />
          <TableSection order={order} total={100} page={1} rows={10} onOrderChange={onChangeOrderHandler} />
        </Stack>
      </PageContainer>
    </>
  );
};

export default ConsolePelaporanIklanComponent;
