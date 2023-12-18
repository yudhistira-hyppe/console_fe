import React, { useCallback, useEffect, useState } from 'react';
import EffectChart from './effect-chart';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import moment from 'moment';
import { useGetEffectQuery } from 'api/console/database';
import toast from 'react-hot-toast';

const DatabaseTabEffectComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    order: 'desc',
    effect: '',
    createdAt: [null, null],
    category: [],
    status: '',
  });
  const [filterList, setFilterList] = useState([]);
  const [initial, setInitial] = useState(true);

  const getParams = useCallback(() => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      ascending: filter.order === 'desc' ? false : true,
    });
    filter.effect !== '' && Object.assign(params, { keyword: filter.effect });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.category?.length >= 1 && Object.assign(params, { kategori: filter.category?.map((item) => item?._id) });
    filter.status !== '' && Object.assign(params, { status: [filter.status === 'Aktif' ? true : false] });

    return params;
  }, [filter]);

  const { data: listEffect, isFetching: loadingList } = useGetEffectQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listEffect?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
    setInitial(false);
  }, [filter, loadingList]);

  useEffect(() => {
    if (!initial) {
      setTimeout(() => {
        window.scrollTo({ top: 610, behavior: 'smooth' });
      }, 150);
    }
  }, [filter, setInitial]);

  const onOrderChange = (e, val) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        order: e.target.value,
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
        case 'effect':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Efek (${value})` }]
              : [...prevVal, { parent: kind, value: `Efek (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'status':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: value }]
              : [...prevVal, { parent: kind, value: value }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [
                  ...prevVal.filter((item) => item.parent !== kind),
                  {
                    parent: kind,
                    value: `Tanggal Diunggah (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
                  },
                ]
              : [
                  ...prevVal,
                  {
                    parent: kind,
                    value: `Tanggal Diunggah (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
                  },
                ]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'category':
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
      switch (kind) {
        case 'effect':
          return { ...prevVal, effect: value, page: 0 };
        case 'createdAt':
          return { ...prevVal, createdAt: value, page: 0 };
        case 'category':
          return {
            ...prevVal,
            category: filter.category.find((item) => item?.name === JSON.parse(value)?.name)
              ? filter.category.filter((item) => item?.name !== JSON.parse(value)?.name)
              : [...filter.category, JSON.parse(value)],
            page: 0,
          };
        case 'status':
          return { ...prevVal, status: value, page: 0 };
        case 'clearAll':
          return {
            page: 0,
            limit: 10,
            order: 'desc',
            effect: '',
            createdAt: [null, null],
            category: [],
            status: '',
          };
        default:
          return { ...prevVal, page: 0 };
      }
    });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe Console :: Database Effect</title>
      </Head>

      <PageContainer heading="">
        <EffectChart />

        <Stack direction="row" spacing={3} mt="24px">
          <SearchSection filter={filter} handleChange={handleSearchChange} />
          <TableSection
            filter={filter}
            filterList={filterList}
            handleDeleteFilter={handleSearchChange}
            loading={loadingList}
            listEffect={listEffect}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default DatabaseTabEffectComponent;
