import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Stack } from '@mui/material';
import Breadcrumbs from '../../../../help-center/bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';
import router from 'next/router';
import ModalCreate from './Modal/ModalCreate';
import CategoryCarousel from './CategoryCarousel';
import ListGIF from './ListGIF';

const breadcrumbs = [
  {
    label: 'Database GIF',
    link: {
      pathname: '/database/sticker',
      query: {
        tab: 'gif',
      },
    },
  },
  { label: 'Kelola GIF', isActive: true },
];

const dummyCategory = [
  {
    name: 'Hot',
    image: 'fire.png',
  },
  {
    name: 'Dekoratif',
    image: 'party.png',
  },
  {
    name: 'Teks',
    image: 'teks.png',
  },
  {
    name: 'Suasana Hati',
    image: 'smile.png',
  },
  {
    name: 'Gaya Hidup',
    image: 'coffee.png',
  },
  {
    name: 'Alam',
    image: 'plant.png',
  },
  {
    name: 'Events',
    image: 'event.png',
  },
];

const KelolaGIF = () => {
  const [modal, setModal] = useState({
    create: false,
  });
  const [tab, setTab] = useState(dummyCategory[0].name);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Kelola GIF</title>
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
                tab: 'gif',
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

      <ModalCreate showModal={modal.create} onClose={() => setModal({ ...modal, create: !modal.create })} />

      <Stack direction="column">
        <Stack direction="row" alignItems="center" gap={3}>
          <Typography style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Kategori GIF</Typography>
          <Button variant="text" color="secondary" style={{ marginTop: 2 }}>
            <Typography
              style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}
              onClick={() => setModal({ ...modal, create: !modal.create })}>
              Tambah Kategori
            </Typography>
          </Button>
        </Stack>
      </Stack>

      <CategoryCarousel data={dummyCategory} tab={tab} setTab={setTab} />

      <ListGIF category={dummyCategory.find((item) => item.name === tab)} />
    </>
  );
};

export default KelolaGIF;
