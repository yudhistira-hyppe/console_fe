import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import Breadcrumbs from '../bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import SearchSection from './search-section';
import TableSection from './table-section';
import { useGetListBankQuery } from 'api/console/helpCenter/bank';
import { toast } from 'react-hot-toast';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Rekening Bank', isActive: true },
];

const RekeningBank = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    labelTanggal: '',
    createdAt: [null, null],
    bank: [],
    similarity: '',
    document: '',
    source: '',
    status: [],
  });
  const [filterList, setFilterList] = useState([]);
  const router = useRouter();

  const getParams = () => {
    let params = {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
    };

    filter.search !== '' && Object.assign(params, { namapemohon: filter.search });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.bank.length >= 1 && Object.assign(params, { bank: filter.bank });
    filter.similarity !== '' && Object.assign(params, { similarity: filter.similarity });
    filter.document !== '' && Object.assign(params, { document: filter.document });
    filter.source !== '' && Object.assign(params, { source: filter.source });
    filter.status.length >= 1 && Object.assign(params, { statusLast: filter.status });

    return params;
  };

  const { data: listTickets, isFetching: loadingTicket } = useGetListBankQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listTickets?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingTicket]);

  const onOrderChange = (e, val) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        descending: e.target.value,
      };
    });
  };

  const handlePageChange = (value) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        page: value,
      };
    });
  };

  const handleSearchChange = (kind, value) => {
    setFilterList((prevVal) => {
      switch (kind) {
        case 'search':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Pemohon (${value})` }]
              : [...prevVal, { parent: kind, value: `Pemohon (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'similarity':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Tingkat Kesamaan (${value})` }]
              : [...prevVal, { parent: kind, value: `Tingkat Kesamaan (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'document':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Dokumen ? (${value})` }]
              : [...prevVal, { parent: kind, value: `Dokumen ? (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'source':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Sumber (${value})` }]
              : [...prevVal, { parent: kind, value: `Sumber (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Waktu Transaksi' }]
              : [...prevVal, { parent: kind, value: 'Waktu Transaksi' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'labelTanggal':
          return prevVal.find((item) => item.parent === 'createdAt')
            ? [...prevVal.filter((item) => item.parent !== 'createdAt'), { parent: 'createdAt', value: value }]
            : [...prevVal];
        case 'clearAll':
          return [];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      if (kind === 'search') {
        return { ...prevVal, search: value, page: 0 };
      } else if (kind === 'bank') {
        return {
          ...prevVal,
          bank: filter.bank.find((item) => item === value)
            ? filter.bank.filter((item) => item !== value)
            : [...filter.bank, value],
          page: 0,
        };
      } else if (kind === 'similarity') {
        return { ...prevVal, similarity: value, page: 0 };
      } else if (kind === 'document') {
        return { ...prevVal, document: value, page: 0 };
      } else if (kind === 'source') {
        return { ...prevVal, source: value, page: 0 };
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
          page: 0,
        };
      } else if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
      } else if (kind === 'clearAll') {
        return {
          page: 0,
          limit: 10,
          descending: 'true',
          search: '',
          labelTanggal: '',
          createdAt: [null, null],
          bank: [],
          similarity: '',
          document: '',
          source: '',
          status: [],
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Rekening Bank</title>
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
            filter={filter}
            loading={loadingTicket}
            listTickets={listTickets}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
            handleDeleteFilter={handleSearchChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default RekeningBank;
