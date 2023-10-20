import React, { useCallback, useEffect, useState } from 'react';
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
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { saveParams } from 'redux/slice/filterParams';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Bantuan Pengguna', isActive: true },
];

const ConsoleBantuanPenggunaComponent = () => {
  const [filterList, setFilterList] = useState([]);
  const router = useRouter();
  const dataParams = useSelector((state) => state.filterParams.value);
  const [filter, setFilter] = useState({
    descending: 'true',
    assignto: '',
    search: '',
    status: [],
    sumber: [],
    kategori: [],
    level: [],
    labelTanggal: '',
    createdAt: [null, null],
    page: 0,
    limit: 10,
  });
  const dispatch = useDispatch();

  const getParams = useCallback(() => {
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
    filter.status.length >= 1 &&
      Object.assign(params, {
        status: filter.status?.map((item) => {
          if (item === 'Baru') {
            return 'new';
          } else if (item === 'Dalam Proses') {
            return 'onprogress';
          } else if (item === 'Selesai') {
            return 'close';
          }
        }),
      });
    filter.kategori.length >= 1 && Object.assign(params, { kategori: filter.kategori.map((item) => item._id) });
    filter.level.length >= 1 && Object.assign(params, { level: filter.level.map((item) => item._id) });

    return params;
  }, [filter]);

  useEffect(() => {
    if (!isEmpty(dataParams?.search)) {
      handleSearchChange('search', dataParams?.search);
    }
    if (!isEmpty(dataParams?.assignto)) {
      handleSearchChange('penerima', dataParams?.assignto);
    }
    if (!isEmpty(dataParams?.status)) {
      dataParams?.status?.map((item) => handleSearchChange('status', item));
    }
    if (!isEmpty(dataParams?.sumber)) {
      dataParams?.sumber?.map((item) => handleSearchChange('sumber', JSON.stringify({ _id: item?._id, name: item?.name })));
    }
    if (!isEmpty(dataParams?.kategori)) {
      dataParams?.kategori?.map((item) =>
        handleSearchChange('category', JSON.stringify({ _id: item?._id, name: item?.name })),
      );
    }
    if (!isEmpty(dataParams?.level)) {
      dataParams?.level?.map((item) => handleSearchChange('level', JSON.stringify({ _id: item?._id, name: item?.name })));
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
      assignto: dataParams?.assignto || '',
      createdAt: dataParams?.createdAt || [null, null],
      labelTanggal: dataParams?.createdAt?.[0]
        ? `${dayjs(dataParams?.createdAt?.[0]).format('DD-MM-YYYY')} - ${dayjs(dataParams?.createdAt?.[1]).format(
            'DD-MM-YYYY',
          )}`
        : '',
      status: dataParams?.status || [],
      sumber: dataParams?.sumber || [],
      kategori: dataParams?.kategori || [],
      level: dataParams?.level || [],
    });
  }, []);

  useEffect(() => {
    dispatch(saveParams({ ...filter, pathname: router.pathname }));
  }, [getParams]);

  const { data: listTickets, isFetching: loadingTicket } = useGetListTicketsQuery(getParams());

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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Nomor Tiket (${value})` }]
              : [...prevVal, { parent: kind, value: `Nomor Tiket (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'penerima':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Penerima (${value})` }]
              : [...prevVal, { parent: kind, value: `Penerima (${value})` }]
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
      } else if (kind === 'clearAll') {
        return {
          descending: 'true',
          assignto: '',
          search: '',
          status: [],
          sumber: [],
          kategori: [],
          level: [],
          labelTanggal: '',
          createdAt: [null, null],
          page: 0,
          limit: 10,
        };
      }
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
            filter={filter}
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
