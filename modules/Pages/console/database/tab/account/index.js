import React, { useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetAllUserQuery } from 'api/user/user';

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

  const getParams = () => {
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
  };

  const { data: listUser, isFetching: loadingUser } = useGetAllUserQuery(getParams());

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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `username (${value})` }]
              : [...prevVal, { parent: kind, value: `username (${value})` }]
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
            ? [
                ...prevVal.filter((item) => item.parent !== 'createdAt'),
                { parent: 'createdAt', value: `Tanggal Daftar (${value})` },
              ]
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
        default:
          return { ...prevVal };
      }
    });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Konten</title>
      </Head>
      <PageContainer heading="">
        <Stack direction={'row'} spacing={3}>
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
      </PageContainer>
    </>
  );
};

export default DatabaseTabAccountComponent;
