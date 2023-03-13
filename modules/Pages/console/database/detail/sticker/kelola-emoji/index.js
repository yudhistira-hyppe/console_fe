import React from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import Breadcrumbs from '../../../../help-center/bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';
import router from 'next/router';

const breadcrumbs = [
  {
    label: 'Database Emoji',
    link: {
      pathname: '/database/sticker',
      query: {
        tab: 'emoji',
      },
    },
  },
  { label: 'Kelola Emoji', isActive: true },
];

const KelolaEmoji = () => {
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Kelola Emoji</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() =>
            router.replace({
              pathname: '/database/sticker',
              query: {
                tab: 'emoji',
              },
            })
          }
          gap="5px"
          style={{ width: 'fit-content', cursor: 'pointer' }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
          </Stack>
          <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
            Kembali
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default KelolaEmoji;
