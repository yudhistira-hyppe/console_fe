import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Stack } from '@mui/material';
import Breadcrumbs from '../../../../help-center/bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';
import router, { useRouter } from 'next/router';
import ModalCreate from './Modal/ModalCreate';
import CategoryCarousel from './CategoryCarousel';
import ListSticker from './ListSticker';
import { useGetStickerCategoryQuery } from 'api/console/database';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const breadcrumbs = [
  {
    label: 'Database Sticker',
    link: {
      pathname: '/database/sticker',
      query: {
        tab: 'sticker',
      },
    },
  },
  { label: 'Kelola Sticker', isActive: true },
];

const KelolaSticker = () => {
  const [modal, setModal] = useState({
    create: false,
  });
  const [tab, setTab] = useState('');
  const [tabScroll, setTabScroll] = useState('');
  const router = useRouter();

  const { data: category, isLoading: loadingCategory } = useGetStickerCategoryQuery({ tipesticker: 'STICKER' });

  useEffect(() => {
    if (!loadingCategory) {
      if (category?.data?.length >= 1) {
        setTab(category?.data?.[0]?.name);
      } else {
        setTab('');
      }
    }
  }, [loadingCategory]);

  useEffect(() => {
    if (tabScroll) {
      window.scrollTo({ top: 250, behavior: 'smooth' });
    }
  }, [tabScroll]);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Kelola Sticker</title>
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
                tab: 'sticker',
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

      {loadingCategory ? (
        <PageLoader />
      ) : (
        <>
          <Stack direction="column">
            <Stack direction="row" alignItems="center" gap={3}>
              <Typography style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Kategori Stiker</Typography>
              <Button variant="text" color="secondary" style={{ marginTop: 2 }}>
                <Typography
                  style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}
                  onClick={() => setModal({ ...modal, create: !modal.create })}>
                  Tambah Kategori
                </Typography>
              </Button>
            </Stack>
          </Stack>

          <CategoryCarousel
            data={category?.data || []}
            tab={tab}
            setTab={(val) => {
              setTab(val);
              setTabScroll(val);
            }}
          />

          {tab && <ListSticker category={category?.data?.find((item) => item.name === tab)} setTab={setTab} />}
        </>
      )}
    </>
  );
};

export default KelolaSticker;
