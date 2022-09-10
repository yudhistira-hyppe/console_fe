import React, { useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import Nav from './BreadCrumb';
import { Stack } from '@mui/material';
import { Box, Link, Typography } from '@material-ui/core';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Bantuan Pengguna', isActive: true },
];

const ConsoleBantuanPenggunaComponent = () => {
  const [value, setValue] = useState(null);
  const [order, setOrder] = useState('desc');
  const router = useRouter();

  const onChangeOrderHandler = (val) => {
    setOrder(val);
  };

  const onBackHandler = (e) => {
    e.preventDefault();
    router.push('/console/help-center');
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Bantuan Pengguna</title>
      </Head>

      <Stack direction={'column'} spacing={2} mb={3}>
        <Nav breadcrumbs={breadcrumbs} />
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
          <SearchSection value={value} setValue={setValue} />
          <TableSection order={order} onOrderChange={onChangeOrderHandler} total={100} page={1} rows={10} />
        </Stack>
      </PageContainer>
    </>
  );
};

export default ConsoleBantuanPenggunaComponent;
