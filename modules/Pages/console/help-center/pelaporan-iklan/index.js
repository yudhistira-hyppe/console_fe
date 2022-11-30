import Head from 'next/head';
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import Breadcrumbs from '../bantuan-pengguna/BreadCrumb';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TableSection from './TableSection';
import SearchSection from './SearchSection';
import { useGetListTicketsQuery } from 'api/console/helpCenter/iklan';
import moment from 'moment';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Pelaporan Iklan', isActive: true },
];

const PelaporanIklan = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    // startdate: '',
    // enddate: '',
    search: '',
    range: '',
    rangeReport: [],
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
      jenis: 'report',
    });
    filter.search !== '' && Object.assign(params, { key: filter.search });
    filter.rangeReport[0] && Object.assign(params, { startreport: filter.rangeReport[0] });
    filter.rangeReport[1] && Object.assign(params, { endreport: filter.rangeReport[1] });
    // filter.startdate !== '' && Object.assign(params, { startdate: filter.startdate });
    // filter.enddate !== '' && Object.assign(params, { enddate: filter.enddate });
    filter.status.length >= 1 && Object.assign(params, { status: filter.status });
    filter.reason.length >= 1 && Object.assign(params, { reason: filter.reason.map((item) => item?._id) });

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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Iklan' }]
              : [...prevVal, { parent: kind, value: 'Iklan' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'reason':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        case 'range':
          return prevVal.find((item) => item.parent === kind)
            ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Jumlah Pelaporan' }]
            : [...prevVal, { parent: kind, value: 'Jumlah Pelaporan' }];
        case 'clearRange':
          return [...prevVal.filter((item) => item.parent !== 'range')];
        case 'startreport':
          return prevVal.find((item) => item.parent === 'range')
            ? [...prevVal.filter((item) => item.parent !== 'range'), { parent: 'range', value: 'Jumlah Pelaporan' }]
            : [...prevVal, { parent: 'range', value: 'Jumlah Pelaporan' }];
        case 'endreport':
          return prevVal.find((item) => item.parent === 'range')
            ? [...prevVal.filter((item) => item.parent !== 'range'), { parent: 'range', value: 'Jumlah Pelaporan' }]
            : [...prevVal, { parent: 'range', value: 'Jumlah Pelaporan' }];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      if (kind === 'search') {
        return { ...prevVal, search: value, page: 0 };
      } else if (kind === 'range') {
        switch (value) {
          case '1-50':
            return {
              ...prevVal,
              range: value,
              rangeReport: [1, 50],
              page: 0,
            };
          case '51-100':
            return {
              ...prevVal,
              range: value,
              rangeReport: [51, 100],
              page: 0,
            };
          case '101-150':
            return {
              ...prevVal,
              range: value,
              rangeReport: [101, 150],
              page: 0,
            };
          case '151-200':
            return {
              ...prevVal,
              range: value,
              rangeReport: [151, 200],
              page: 0,
            };
          default:
            return { ...prevVal };
        }
      } else if (kind === 'clearRange') {
        return { ...prevVal, rangeReport: value, range: '', page: 0 };
      } else if (kind === 'startreport') {
        return { ...prevVal, rangeReport: [value, prevVal.rangeReport[1]], range: '', page: 0 };
      } else if (kind === 'endreport') {
        return { ...prevVal, rangeReport: [prevVal.rangeReport[0], value], range: '', page: 0 };
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
          reason: filter.reason.find((item) => item?.name === JSON.parse(value)?.name)
            ? filter.reason.filter((item) => item?.name !== JSON.parse(value)?.name)
            : [...filter.reason, JSON.parse(value)],
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
        <title key="title">Hyppe-Console :: Keluhan Pengguna</title>
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

export default PelaporanIklan;
