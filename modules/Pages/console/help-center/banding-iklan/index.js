import Head from 'next/head';
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import Breadcrumbs from '../bantuan-pengguna/BreadCrumb';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TableSection from './TableSection';
import { useGetListTicketsQuery } from 'api/console/helpCenter/iklan';
import moment from 'moment';
import SearchSection from './SearchSection';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Permohonan Iklan Moderasi', isActive: true },
];

const BandingIklan = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    createdAt: [null, null],
    status: [],
    reason: [],
  });
  const [filterList, setFilterList] = useState([]);
  const router = useRouter();

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
      type: 'ads',
      jenis: 'appeal',
    });
    filter.search !== '' && Object.assign(params, { username: filter.search });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.status.length >= 1 && Object.assign(params, { status: filter.status });
    filter.reason.length >= 1 && Object.assign(params, { reasonAppeal: filter.reason });

    return params;
  };

  const { data: listTickets, isFetching: loadingTicket } = useGetListTicketsQuery(getParams());

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

  const handleSearchChange = (kind, value) => {
    setFilterList((prevVal) => {
      switch (kind) {
        case 'search':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Pemohon' }]
              : [...prevVal, { parent: kind, value: 'Pemohon' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Tanggal Pembuatan' }]
              : [...prevVal, { parent: kind, value: 'Tanggal Pembuatan' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'search') {
        return { ...prevVal, search: value, page: 0 };
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
          page: 0,
        };
      } else if (kind === 'reason') {
        return {
          ...prevVal,
          reason: filter.reason.find((item) => item === value)
            ? filter.reason.filter((item) => item !== value)
            : [...filter.reason, value],
          page: 0,
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Permohonan Iklan Moderasi</title>
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
            filterList={filterList}
            order={filter.descending}
            loading={loadingTicket}
            listTickets={listTickets}
            handleOrder={onOrderChange}
            handlePageChange={handlePageChange}
            handleDeleteFilter={handleSearchChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default BandingIklan;
