import React, { useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import Nav from './BreadCrumb';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';
import { useGetListTicketsQuery } from 'api/console/helpCenter/bantuan-pengguna';
import moment from 'moment';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Help Center', link: '/help-center' },
  { label: 'Bantuan Pengguna', isActive: true },
];

const ConsoleBantuanPenggunaComponent = () => {
  const [filter, setFilter] = useState({
    order: 'desc',
    search: '',
    status: [],
    sumber: [],
    kategori: [],
    startdate: '',
    enddate: '',
    page: 0,
    limit: 10,
  });
  const router = useRouter();

  const getParams = () => {
    let params = {};
    Object.assign(params, { page: filter.page, limit: filter.limit });
    filter.order !== '' && Object.assign(params, { order: filter.order });
    filter.search !== '' && Object.assign(params, { search: filter.search });
    filter.startdate !== '' && Object.assign(params, { startdate: filter.startdate });
    filter.enddate !== '' && Object.assign(params, { enddate: filter.enddate });
    filter.status.length >= 1 && Object.assign(params, { status: filter.status });
    filter.sumber.length >= 1 && Object.assign(params, { sumber: filter.sumber });
    filter.kategori.length >= 1 && Object.assign(params, { kategori: filter.kategori });

    return params;
  };

  const { data: listTickets } = useGetListTicketsQuery(getParams());

  const onOrderChange = (e) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        order: e.target.value,
      };
    });
  };

  const handleSearchChange = (kind, value) => {
    setFilter((prevVal) => {
      if (kind === 'ticket_date') {
        const dateFrom = moment().subtract(value, 'd').format('YYYY-MM-DD');
        const dateNow = moment().format('YYYY-MM-DD');
        return {
          ...prevVal,
          startdate: dateFrom,
          enddate: dateNow,
        };
      } else if (kind === 'ticket_range') {
        return { ...prevVal, startdate: value[0], enddate: value[1] };
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
        };
      } else if (kind === 'search') {
        return {
          ...prevVal,
          search: value,
        };
      } else if (kind === 'sumber') {
        return {
          ...prevVal,
          sumber: filter.sumber.find((item) => item === value)
            ? filter.sumber.filter((item) => item !== value)
            : [...filter.sumber, value],
        };
      } else if (kind === 'category') {
        return {
          ...prevVal,
          kategori: filter.kategori.find((item) => item === value)
            ? filter.kategori.filter((item) => item !== value)
            : [...filter.kategori, value],
        };
      }
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

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Bantuan Pengguna</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Nav breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/help-center')}
          style={{ width: 'fit-content', cursor: 'pointer' }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }} />
          </Stack>
          <Typography variant="h1" style={{ color: 'black' }}>
            Kembali
          </Typography>
        </Stack>
      </Stack>

      <PageContainer heading="">
        <Stack direction={'row'} spacing={3}>
          <SearchSection handleChange={handleSearchChange} />
          <TableSection
            order={filter.order}
            handleOrder={onOrderChange}
            handlePageChange={handlePageChange}
            listTickets={listTickets}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default ConsoleBantuanPenggunaComponent;
