import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetListContentQuery } from 'api/console/database/content';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { toast } from 'react-hot-toast';

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
    hashtag: [],
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
    filter.status.length >= 1 &&
      Object.assign(params, { kepemilikan: filter.status.map((item) => (item === 'terdaftar' ? 'YA' : 'TIDAK')) });
    filter.type.length >= 1 && Object.assign(params, { postType: filter.type });
    filter.category.length >= 1 && Object.assign(params, { kategori: filter.category.map((item) => item?._id) });
    filter.is_sell.length >= 1 &&
      Object.assign(params, { statusjual: filter.is_sell.map((item) => (item === 'dijual' ? 'YA' : 'TIDAK')) });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.min_price && Object.assign(params, { startmount: Number(filter.min_price) });
    filter.max_price && Object.assign(params, { endmount: Number(filter.max_price) });
    filter.hashtag.length >= 1 && Object.assign(params, { hashtag: filter.hashtag });

    return params;
  };

  const { data: listContent, isFetching: loadingContent } = useGetListContentQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listContent?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingContent]);

  const {
    data: listExport,
    isFetching: loadingExport,
    isError,
  } = useGetListContentQuery({
    ...getParams(),
    limit: 100000000,
    page: 0,
  });

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
    setFilter((prevVal) => {
      switch (kind) {
        case 'description':
          return { ...prevVal, description: value, page: 0 };
        case 'pemilik':
          return { ...prevVal, pemilik: value, page: 0 };
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
          return { ...prevVal, min_price: value, page: 0 };
        case 'max_price':
          return { ...prevVal, max_price: value, page: 0 };
        case 'createdAt':
          return { ...prevVal, createdAt: value, page: 0 };
        case 'ownedAt':
          return { ...prevVal, ownedAt: value, page: 0 };
        case 'hashtag':
          return {
            ...prevVal,
            hashtag: filter.hashtag?.find((item) => item === value)
              ? filter.hashtag?.filter((item) => item !== value)
              : [...filter.hashtag, value],
            page: 0,
          };
        case 'clearHashtag':
          return {
            ...prevVal,
            hashtag: value,
            page: 0,
          };
        case 'clearAll':
          return {
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
            hashtag: [],
          };
        default:
          return { ...prevVal };
      }
    });
    setFilterList((prevVal) => {
      switch (kind) {
        case 'description':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Deskripsi (${value})` }]
              : [...prevVal, { parent: kind, value: `Deskripsi (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'pemilik':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Pemilik (${value})` }]
              : [...prevVal, { parent: kind, value: `Pemilik (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'min_price':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Minimal Harga (${value})` }]
              : [...prevVal, { parent: kind, value: `Minimal Harga (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'max_price':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Maksimal Harga (${value})` }]
              : [...prevVal, { parent: kind, value: `Maksimal Harga (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [
                  ...prevVal.filter((item) => item.parent !== kind),
                  {
                    parent: kind,
                    value: `Tanggal Pembuatan (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
                  },
                ]
              : [
                  ...prevVal,
                  {
                    parent: kind,
                    value: `Tanggal Pembuatan (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
                  },
                ]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'category':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        case 'clearAll':
          return [];
        case 'hashtag':
          return value.length >= 1
            ? prevVal?.find((item) => item.parent === kind)
              ? [...prevVal]
              : [...prevVal, { parent: kind, value: 'Hashtag' }]
            : [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)];
        case 'clearHashtag':
          return [...prevVal.filter((item) => item.parent !== 'hashtag')];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
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
            {!loadingExport && (
              <CSVLink
                data={listExport?.data}
                filename="History-Transaction.csv"
                onClick={() => (listExport?.data?.length < 1 ? {} : handleExport())}>
                <LoadingButton
                  color="secondary"
                  variant="outlined"
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  disabled={listExport?.data?.length < 1}>
                  <Typography style={{ fontFamily: 'Lato', fontWeight: 'bold', textTransform: 'capitalize' }}>
                    Unduh
                  </Typography>
                  <GetApp style={{ fontSize: 18 }} />
                </LoadingButton>
              </CSVLink>
            )}
          </Stack>
          <Stack direction="row" spacing={3} width="100%">
            <SearchSection filter={filter} handleChange={handleSearchChange} />
            <TableSection
              filterList={filterList}
              handleDeleteFilter={handleSearchChange}
              filter={filter}
              loading={loadingContent}
              listTickets={listContent}
              handlePageChange={handlePageChange}
              handleOrder={onOrderChange}
            />
          </Stack>
        </Stack>
      </PageContainer>
    </>
  );
};

export default DatabaseTabContentComponent;
