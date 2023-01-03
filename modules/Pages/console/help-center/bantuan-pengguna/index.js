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
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Bantuan Pengguna', isActive: true },
];

const ConsoleBantuanPenggunaComponent = () => {
  const [filter, setFilter] = useState({
    descending: 'true',
    assignto: '',
    search: '',
    status: [],
    sumber: [],
    kategori: [],
    level: [],
    createdAt: [null, null],
    page: 0,
    limit: 10,
  });
  const [filterList, setFilterList] = useState([]);
  const router = useRouter();

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
    });
    filter.search !== '' && Object.assign(params, { search: filter.search });
    filter.assignto !== '' && Object.assign(params, { assignto: filter.assignto });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.sumber.length >= 1 && Object.assign(params, { sumber: filter.sumber.map((item) => item._id) });
    filter.status.length >= 1 && Object.assign(params, { status: filter.status });
    filter.kategori.length >= 1 && Object.assign(params, { kategori: filter.kategori.map((item) => item._id) });
    filter.level.length >= 1 && Object.assign(params, { level: filter.level.map((item) => item._id) });

    return params;
  };

  const { data: listTickets, isFetching: loadingTicket } = useGetListTicketsQuery(getParams());

  const onOrderChange = (e) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        descending: e.target.value,
        page: 0,
      };
    });
  };

  const handleSearchChange = (kind, value) => {
    setFilterList((prevVal) => {
      switch (kind) {
        case 'search':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Nomor Tiket' }]
              : [...prevVal, { parent: kind, value: 'Nomor Tiket' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'penerima':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Penerima Tugas' }]
              : [...prevVal, { parent: kind, value: 'Penerima Tugas' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Tanggal Masuk Tiket' }]
              : [...prevVal, { parent: kind, value: 'Tanggal Masuk Tiket' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'sumber':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        case 'category':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        case 'level':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
          page: 0,
        };
      } else if (kind === 'search') {
        return {
          ...prevVal,
          search: value,
          page: 0,
        };
      } else if (kind === 'penerima') {
        return {
          ...prevVal,
          assignto: value,
          page: 0,
        };
      } else if (kind === 'sumber') {
        return {
          ...prevVal,
          sumber: filter.sumber.find((item) => item?.name === JSON.parse(value)?.name)
            ? filter.sumber.filter((item) => item?.name !== JSON.parse(value)?.name)
            : [...filter.sumber, JSON.parse(value)],
          page: 0,
        };
      } else if (kind === 'category') {
        return {
          ...prevVal,
          kategori: filter.kategori.find((item) => item?.name === JSON.parse(value)?.name)
            ? filter.kategori.filter((item) => item?.name !== JSON.parse(value)?.name)
            : [...filter.kategori, JSON.parse(value)],
          page: 0,
        };
      } else if (kind === 'level') {
        return {
          ...prevVal,
          level: filter.level.find((item) => item?.name === JSON.parse(value)?.name)
            ? filter.level.filter((item) => item?.name !== JSON.parse(value)?.name)
            : [...filter.level, JSON.parse(value)],
          page: 0,
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
            page={filter.page + 1}
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

export default ConsoleBantuanPenggunaComponent;
