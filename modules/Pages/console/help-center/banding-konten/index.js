import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import Breadcrumbs from '../bantuan-pengguna/BreadCrumb';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetListTicketsQuery } from 'api/console/helpCenter/konten';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { saveParams } from 'redux/slice/filterParams';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Permohonan Banding Konten', isActive: true },
];

const BandingKonten = () => {
  const [filterList, setFilterList] = useState([]);
  const router = useRouter();
  const dataParams = useSelector((state) => state.filterParams.value);
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    labelTanggal: '',
    createdAt: [null, null],
    status: [],
    reason: [],
  });
  const dispatch = useDispatch();

  const getParams = useCallback(() => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
      type: 'content',
      jenis: 'appeal',
    });
    filter.search !== '' && Object.assign(params, { username: filter.search });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.status.length >= 1 &&
      Object.assign(params, {
        status: filter.status.map((item) => {
          if (item === 'Baru') {
            return 'BARU';
          } else if (item === 'Dipulihkan') {
            return 'TIDAK DITANGGUHKAN';
          } else if (item === 'Ditangguhkan') {
            return 'DITANGGUHKAN';
          } else if (item === 'Ditandai Sensitif') {
            return 'FLAGING';
          } else if (item === 'Dihapus') {
            return 'DELETE'
          }
        }),
      });
    filter.reason.length >= 1 && Object.assign(params, { reasonAppeal: filter.reason });

    return params;
  }, [filter]);

  const { data: listTickets, isFetching: loadingTicket } = useGetListTicketsQuery(getParams());

  useEffect(() => {
    if (!isEmpty(dataParams?.search)) {
      handleSearchChange('search', dataParams?.search);
    }
    if (!isEmpty(dataParams?.status)) {
      dataParams?.status?.map((item) => {
        handleSearchChange('status', item);
      });
    }
    if (!isEmpty(dataParams?.reason)) {
      dataParams?.reason?.map((item) => {
        handleSearchChange('reason', item);
      });
    }
    if (!isEmpty(dataParams?.createdAt)) {
      handleSearchChange('createdAt', dataParams?.createdAt);
      if (dataParams?.createdAt[0] !== null) {
        handleSearchChange(
          'labelTanggal',
          `${dayjs(dataParams?.createdAt[0]).format('DD-MM-YYYY')} - ${dayjs(dataParams?.createdAt[1]).format(
            'DD-MM-YYYY',
          )}`,
        );
      }
    }

    setFilter({
      ...filter,
      page: dataParams?.page || 0,
      limit: dataParams?.limit || 10,
      descending: dataParams?.descending || 'true',
      search: dataParams?.search || '',
      createdAt: dataParams?.createdAt || [null, null],
      labelTanggal: dataParams?.createdAt?.[0]
        ? `${dayjs(dataParams?.createdAt?.[0]).format('DD-MM-YYYY')} - ${dayjs(dataParams?.createdAt?.[1]).format(
            'DD-MM-YYYY',
          )}`
        : '',
      status: dataParams?.status || [],
      reason: dataParams?.reason || [],
    });
  }, []);

  useEffect(() => {
    dispatch(saveParams({ ...filter, pathname: router.pathname }));
  }, [getParams]);

  useEffect(() => {
    if (filter.page >= 1 && listTickets?.arrdata?.length < 1) {
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
      if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
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
      } else if (kind === 'clearAll') {
        return {
          page: 0,
          limit: 10,
          descending: 'true',
          search: '',
          labelTanggal: '',
          createdAt: [null, null],
          status: [],
          reason: [],
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

export default BandingKonten;
