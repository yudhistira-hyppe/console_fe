import React, { useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetListContentQuery } from 'api/console/database/content';

const DatabaseTabContentComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    description: '',
    pemilik: '',
    status: [],
    type: [],
    category: [],
    is_sell: [],
    min_price: '',
    max_price: '',
    createdAt: [null, null],
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
    filter.pemilik !== '' && Object.assign(params, { username: filter.pemilik });
    filter.description !== '' && Object.assign(params, { description: filter.description });
    // filter.theme.length >= 1 && params.push(`theme=${filter.theme.map((item) => item._id).join(',')}`);
    // filter.genre.length >= 1 && params.push(`genre=${filter.genre.map((item) => item._id).join(',')}`);
    // filter.mood.length >= 1 && params.push(`mood=${filter.mood.map((item) => item._id).join(',')}`);
    filter.status.length >= 1 &&
      Object.assign(params, { kepemilikan: filter.status.map((item) => (item === 'terdaftar' ? 'YA' : 'TIDAK')) });
    filter.type.length >= 1 && Object.assign(params, { postType: filter.type });
    filter.category.length >= 1 && Object.assign(params, { kategori: filter.category.map((item) => item?._id) });
    filter.is_sell.length >= 1 &&
      Object.assign(params, { statusJual: filter.is_sell.map((item) => (item === 'dijual' ? 'YA' : 'TIDAK')) });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.min_price && Object.assign(params, { startmount: Number(filter.min_price) });
    filter.max_price && Object.assign(params, { endmount: Number(filter.max_price) });

    return params;
  };

  const { data: listContent, isFetching: loadingContent } = useGetListContentQuery(getParams());

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
        case 'pemilik':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'pemilik' }]
              : [...prevVal, { parent: kind, value: 'pemilik' }]
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
        case 'category':
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
      switch (kind) {
        case 'description':
          return { ...prevVal, description: value };
        case 'pemilik':
          return { ...prevVal, pemilik: value };
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
            category: filter.category.find((item) => item?.name === JSON.parse(value)?.name)
              ? filter.category.filter((item) => item?.name !== JSON.parse(value)?.name)
              : [...filter.category, JSON.parse(value)],
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
            loading={loadingContent}
            listTickets={listContent}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default DatabaseTabContentComponent;
