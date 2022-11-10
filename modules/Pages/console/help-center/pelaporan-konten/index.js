import Head from 'next/head';
import React, { useEffect, useState } from 'react';
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

const ConsolePelaporanKontenCompoent = () => {
  const [filter, setFilter] = useState({
    type: 'content',
    page: 0,
    limit: 10,
    descending: 'true',
    startdate: '',
    enddate: '',
    isBanding: '',
  });
  const router = useRouter();

  useEffect(() => {
    router?.query?.isBanding && setFilter({ ...filter, isBanding: 'true' });
  }, [router]);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
      type: filter.type,
    });
    // filter.search !== '' && Object.assign(params, { search: filter.search });
    // filter.assignto !== '' && Object.assign(params, { assignto: filter.assignto });
    filter.startdate !== '' && Object.assign(params, { startdate: filter.startdate });
    filter.enddate !== '' && Object.assign(params, { enddate: filter.enddate });
    filter.isBanding !== '' && Object.assign(params, { isBanding: filter.isBanding });
    // filter.status.length >= 1 && Object.assign(params, { status: filter.status });
    // filter.sumber.length >= 1 && Object.assign(params, { sumber: filter.sumber });
    // filter.kategori.length >= 1 && Object.assign(params, { kategori: filter.kategori });
    // filter.level.length >= 1 && Object.assign(params, { level: filter.level });

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
        };
      } else if (kind === 'ticket_range') {
        return { ...prevVal, startdate: value[0], enddate: value[1] };
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
          <SearchSection handleChange={handleSearchChange} />
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

export default ConsolePelaporanKontenCompoent;
