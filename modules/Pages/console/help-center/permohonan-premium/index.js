import React, { useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import Breadcrumbs from '../bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import SearchSection from './SearchSection';
import TableSection from './TableSection';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Permohonan Akun Premium', isActive: true },
];

const PermohonanPremium = () => {
  const [filter, setFilter] = useState({
    type: 'content',
    page: 0,
    limit: 10,
    descending: 'true',
    // startdate: '',
    // enddate: '',
    search: '',
    range: '',
    from: null,
    to: null,
    status: [],
    reason: [],
  });
  const router = useRouter();

  const onOrderChange = (e, val) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        descending: e.target.value,
      };
    });
  };

  const handlePageChange = (e, value) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        page: value - 1,
      };
    });
  };

  const handleSearchChange = (kind, value) => {};

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Permohonan Akun Premium</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/help-center')}
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
      <PageContainer heading="">
        <Stack direction={'row'} spacing={3}>
          <SearchSection filter={filter} handleChange={handleSearchChange} />
          <TableSection
            order={filter.descending}
            loading={false}
            listTickets={{ arrdata: [{}] }}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default PermohonanPremium;
