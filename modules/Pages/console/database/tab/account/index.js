import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Stack, Tooltip } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { toast } from 'react-hot-toast';
import { useGetAllUserQuery } from 'api/console/database';
import { CSVLink } from 'react-csv';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { saveParams } from 'redux/slice/filterParams';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

const DatabaseTabAccountComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    username: '',
    gender: [],
    age: '',
    area: [],
    rangeAge: [],
    type: [],
    labelCreated: '',
    createdAt: [null, null],
    lastOnline: '',
    rangeOnline: [null, null],
  });
  const [filterList, setFilterList] = useState([]);
  const dataParams = useSelector((state) => state.filterParams.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const getParams = useCallback(() => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
    });
    filter.username !== '' && Object.assign(params, { username: filter.username });
    filter.gender.length >= 1 &&
      Object.assign(params, { gender: filter.gender.map((item) => (item === 'Perempuan' ? 'FEMALE' : 'MALE')) });
    filter.area.length >= 1 && Object.assign(params, { lokasi: filter.area.map((item) => item?._id) });
    filter.age !== '' && Object.assign(params, { startage: filter.rangeAge[0], endage: filter.rangeAge[1] });
    filter.type.length >= 1 && Object.assign(params, { jenis: filter.type.map((item) => item) });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.rangeOnline[0] && Object.assign(params, { startlogin: filter.rangeOnline[0] });
    filter.rangeOnline[1] && Object.assign(params, { endlogin: filter.rangeOnline[1] });

    return params;
  }, [filter]);

  console.log(dataParams);

  useEffect(() => {
    if (!isEmpty(dataParams?.username)) {
      handleSearchChange('username', dataParams?.username);
    }
    if (!isEmpty(dataParams?.age)) {
      handleSearchChange('age', dataParams?.age);
    }
    if (!isEmpty(dataParams?.lastOnline)) {
      handleSearchChange('lastOnline', dataParams?.lastOnline);
    }
    if (!isEmpty(dataParams?.area)) {
      dataParams?.area?.map((item) => handleSearchChange('area', item));
    }
    if (!isEmpty(dataParams?.gender)) {
      dataParams?.gender?.map((item) => handleSearchChange('gender', item));
    }
    if (!isEmpty(dataParams?.type)) {
      dataParams?.type?.map((item) => handleSearchChange('type', item));
    }
    if (!isEmpty(dataParams?.createdAt)) {
      handleSearchChange('createdAt', dataParams?.createdAt);
      if (dataParams?.createdAt[0] !== null) {
        handleSearchChange(
          'labelCreated',
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
      username: dataParams?.username || '',
      gender: dataParams?.gender || [],
      age: dataParams?.age || '',
      area: dataParams?.area || [],
      rangeAge: dataParams?.rangeAge || [],
      type: dataParams?.type || [],
      createdAt: dataParams?.createdAt || [null, null],
      labelCreated: dataParams?.createdAt?.[0]
        ? `${dayjs(dataParams?.createdAt?.[0]).format('DD-MM-YYYY')} - ${dayjs(dataParams?.createdAt?.[1]).format(
            'DD-MM-YYYY',
          )}`
        : '',
      lastOnline: dataParams?.lastOnline || '',
      rangeOnline: dataParams?.rangeOnline || [null, null],
    });
  }, []);

  useEffect(() => {
    dispatch(saveParams({ ...filter, pathname: router.pathname }));
  }, [getParams]);

  const { data: listUser, isFetching: loadingUser } = useGetAllUserQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listUser?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter, loadingUser]);

  const {
    data: listExport,
    isFetching: loadingExport,
    isError,
  } = useGetAllUserQuery({ ...getParams(), limit: 100000000, page: 0 });

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
        case 'username':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Pencarian (${value})` }]
              : [...prevVal, { parent: kind, value: `Pencarian (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'age':
          return prevVal.find((item) => item.parent === kind)
            ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `rentang umur (${value})` }]
            : [...prevVal, { parent: kind, value: `rentang umur (${value})` }];
        case 'clearAge':
          return prevVal.filter((item) => item.parent !== 'age');
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Tanggal Daftar' }]
              : [...prevVal, { parent: kind, value: 'Tanggal Daftar' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'labelCreated':
          return prevVal.find((item) => item.parent === 'createdAt')
            ? [...prevVal.filter((item) => item.parent !== 'createdAt'), { parent: 'createdAt', value: value }]
            : [...prevVal];
        case 'lastOnline':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Terakhir Online (${value})` }]
              : [...prevVal, { parent: kind, value: `Terakhir Online (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'area':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        case 'rangeOnline':
          return [...prevVal];
        case 'clearAll':
          return [];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      switch (kind) {
        case 'username':
          return { ...prevVal, username: value };
        case 'gender':
          return {
            ...prevVal,
            gender: filter.gender.find((item) => item === value)
              ? filter.gender.filter((item) => item !== value)
              : [...filter.gender, value],
            page: 0,
          };
        case 'area':
          return {
            ...prevVal,
            area: filter.area.find((item) => item?.name === JSON.parse(value)?.name)
              ? filter.area.filter((item) => item?.name !== JSON.parse(value)?.name)
              : [...filter.area, JSON.parse(value)],
            page: 0,
          };
        case 'type':
          return {
            ...prevVal,
            type: filter.type.find((item) => item === value)
              ? filter.type.filter((item) => item !== value)
              : [...filter.type, value],
            page: 0,
          };
        case 'age':
          if (value === '< 14') {
            return {
              ...prevVal,
              age: value,
              rangeAge: [0, 14],
              page: 0,
            };
          } else if (value === '15 - 28') {
            return {
              ...prevVal,
              age: value,
              rangeAge: [15, 28],
              page: 0,
            };
          } else if (value === '29 - 43') {
            return {
              ...prevVal,
              age: value,
              rangeAge: [29, 43],
              page: 0,
            };
          } else {
            return {
              ...prevVal,
              age: value,
              rangeAge: [44, 120],
              page: 0,
            };
          }
        case 'clearAge':
          return { ...prevVal, age: '', rangeAge: [], page: 0 };
        case 'createdAt':
          return { ...prevVal, createdAt: value, page: 0 };
        case 'labelCreated':
          return { ...prevVal, labelCreated: value };
        case 'lastOnline':
          return { ...prevVal, lastOnline: value, page: 0 };
        case 'rangeOnline':
          return { ...prevVal, rangeOnline: value, page: 0 };
        case 'clearAll':
          return {
            page: 0,
            limit: 10,
            descending: 'true',
            username: '',
            gender: [],
            age: '',
            area: [],
            rangeAge: [],
            type: [],
            labelCreated: '',
            createdAt: [null, null],
            lastOnline: '',
            rangeOnline: [null, null],
          };
        default:
          return { ...prevVal };
      }
    });
  };

  const handleExport = () => {
    const toastId = toast.loading('Generate pdf...');
    if (isError) {
      toast.error('Terjadi kesalahan saat generate pdf, silahkan coba lagi.', { id: toastId, duration: 2000 });
    } else {
      toast.success('Berhasil generate pdf', { id: toastId });
    }
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Konten</title>
      </Head>
      <PageContainer heading="">
        <Stack direction={'row'} style={{ position: 'relative' }}>
          <Stack position="absolute" top="-60px" right="0px">
            {loadingExport || listExport?.data?.length < 1 ? (
              <Tooltip title="Loading fetching data...">
                <span>
                  <LoadingButton color="secondary" variant="contained" disabled>
                    <Typography style={{ fontFamily: 'Lato', fontWeight: 'bold', textTransform: 'capitalize' }}>
                      Download CSV
                    </Typography>
                  </LoadingButton>
                </span>
              </Tooltip>
            ) : (
              <CSVLink data={listExport?.data || []} filename="Database Account.csv" onClick={() => handleExport()}>
                <LoadingButton color="secondary" variant="contained">
                  <Typography style={{ fontFamily: 'Lato', fontWeight: 'bold', textTransform: 'capitalize' }}>
                    Download CSV
                  </Typography>
                </LoadingButton>
              </CSVLink>
            )}
          </Stack>
          <Stack direction={'row'} spacing={3} width="100%">
            <SearchSection filter={filter} handleChange={handleSearchChange} />
            <TableSection
              filterList={filterList}
              handleDeleteFilter={handleSearchChange}
              filter={filter}
              loading={loadingUser}
              listTickets={listUser}
              handlePageChange={handlePageChange}
              handleOrder={onOrderChange}
            />
          </Stack>
        </Stack>
      </PageContainer>
    </>
  );
};

export default DatabaseTabAccountComponent;
