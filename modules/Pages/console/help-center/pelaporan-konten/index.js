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
import { useGetListTicketsQuery } from 'api/console/helpCenter/konten';
import moment from 'moment';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Pelaporan Konten', isActive: true },
];

const PelaporanKonten = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    // startdate: '',
    // enddate: '',
    search: '',
    range: '',
    startreport: null,
    endreport: null,
    status: [],
    reason: [],
  });
  const router = useRouter();

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
      type: 'content',
      jenis: 'report',
    });
    filter.search !== '' && Object.assign(params, { key: filter.search });
    filter.startreport && Object.assign(params, { startreport: filter.startreport });
    filter.endreport && Object.assign(params, { endreport: filter.endreport });
    // filter.startdate !== '' && Object.assign(params, { startdate: filter.startdate });
    // filter.enddate !== '' && Object.assign(params, { enddate: filter.enddate });
    filter.status.length >= 1 && Object.assign(params, { status: filter.status });
    filter.reason.length >= 1 && Object.assign(params, { reason: filter.reason });

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
    setFilter((prevVal) => {
      if (kind === 'ticket_date') {
        const dateFrom = moment().subtract(value, 'd').format('YYYY-MM-DD');
        const dateNow = moment().format('YYYY-MM-DD');
        return {
          ...prevVal,
          startdate: dateFrom,
          enddate: dateNow,
          page: 0,
        };
      } else if (kind === 'ticket_range') {
        return { ...prevVal, startdate: value[0], enddate: value[1], page: 0 };
      } else if (kind === 'search') {
        return { ...prevVal, search: value, page: 0 };
      } else if (kind === 'range') {
        switch (value) {
          case '1-50':
            return {
              ...prevVal,
              range: value,
              startreport: 1,
              endreport: 50,
              page: 0,
            };
          case '51-100':
            return {
              ...prevVal,
              range: value,
              startreport: 51,
              endreport: 100,
              page: 0,
            };
          case '101-150':
            return {
              ...prevVal,
              range: value,
              startreport: 101,
              endreport: 150,
              page: 0,
            };
          case '151-200':
            return {
              ...prevVal,
              range: value,
              startreport: 151,
              endreport: 200,
              page: 0,
            };
          default:
            return { ...prevVal };
        }
      } else if (kind === 'startreport') {
        return { ...prevVal, startreport: Number(value), range: '', page: 0 };
      } else if (kind === 'endreport') {
        return { ...prevVal, endreport: Number(value), range: '', page: 0 };
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
            order={filter.descending}
            loading={loadingTicket}
            listTickets={listTickets}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default PelaporanKonten;
