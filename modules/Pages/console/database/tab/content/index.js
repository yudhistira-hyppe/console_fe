import React, { useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import SearchSection from './SearchSection';
import TableSection from './TableSection';

const DatabaseTabContentComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    description: '',
    username: '',
    status: [],
    type: [],
    category: [],
    is_sell: [],
    min_price: '',
    max_price: '',
    createdAt: [null, null],
    ownedAt: [null, null],
  });
  const [filterList, setFilterList] = useState([]);
  const router = useRouter();

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
        case 'description':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Description' }]
              : [...prevVal, { parent: kind, value: 'Description' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'username':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Username' }]
              : [...prevVal, { parent: kind, value: 'Username' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'min_price':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Min Price' }]
              : [...prevVal, { parent: kind, value: 'Min Price' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'max_price':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Max Price' }]
              : [...prevVal, { parent: kind, value: 'Max Price' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Tanggal Pembuatan' }]
              : [...prevVal, { parent: kind, value: 'Tanggal Pembuatan' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'ownedAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Tanggal Pendaftaran' }]
              : [...prevVal, { parent: kind, value: 'Tanggal Pendaftaran' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      switch (kind) {
        case 'description':
          return { ...prevVal, description: value };
        case 'username':
          return { ...prevVal, username: value };
        case 'status':
          return {
            ...prevVal,
            status: filter.status.find((item) => item === value)
              ? filter.status.filter((item) => item !== value)
              : [...filter.status, value],
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
        case 'category':
          return {
            ...prevVal,
            category: filter.category.find((item) => item === value)
              ? filter.category.filter((item) => item !== value)
              : [...filter.category, value],
            page: 0,
          };
        case 'is_sell':
          return {
            ...prevVal,
            is_sell: filter.is_sell.find((item) => item === value)
              ? filter.is_sell.filter((item) => item !== value)
              : [...filter.is_sell, value],
            page: 0,
          };
        case 'min_price':
          return { ...prevVal, min_price: value };
        case 'max_price':
          return { ...prevVal, max_price: value };
        case 'createdAt':
          return { ...prevVal, createdAt: value };
        case 'ownedAt':
          return { ...prevVal, ownedAt: value };
        default:
          return { ...prevVal };
      }
    });
  };

  console.log(filter);
  console.log(filterList);

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
            order={filter.descending}
            loading={false}
            listTickets={{ arrdata: [{}] }}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default DatabaseTabContentComponent;
