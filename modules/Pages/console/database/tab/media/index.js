import React, { useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import MediaChart from './media-chart';
import { useGetListMusicQuery } from 'api/console/database/media';
import moment from 'moment';

const DatabaseTabMediaComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    order: 'desc',
    song: '',
    artist: '',
    theme: [],
    genre: [],
    mood: [],
    status: [],
    createdAt: [null, null],
  });
  const [filterList, setFilterList] = useState([]);

  const getParams = () => {
    let params = [];
    params.push(`pageNumber=${filter.page + 1}`);
    params.push(`pageRow=${filter.limit}`);
    params.push(`sort=${filter.order}`);
    filter.song !== '' && params.push(`musicTitle=${filter.song}`);
    filter.artist !== '' && params.push(`artistName=${filter.artist}`);
    filter.theme.length >= 1 && params.push(`theme=${filter.theme.map((item) => item._id).join(',')}`);
    filter.genre.length >= 1 && params.push(`genre=${filter.genre.map((item) => item._id).join(',')}`);
    filter.mood.length >= 1 && params.push(`mood=${filter.mood.map((item) => item._id).join(',')}`);
    filter.status.length >= 1 &&
      params.push(`status=${filter.status.map((item) => (item === 'Aktif' ? 'true' : 'false')).join(',')}`);
    filter.createdAt[0] && params.push(`createdAtStart=${filter.createdAt[0]}`);
    filter.createdAt[1] && params.push(`createdAtEnd=${filter.createdAt[1]}`);

    return params.join('&');
  };

  const { data: listMusic, isFetching: loadingMusic } = useGetListMusicQuery(getParams());

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
        case 'song':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Judul (${value})` }]
              : [...prevVal, { parent: kind, value: `Judul (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'artist':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Artis (${value})` }]
              : [...prevVal, { parent: kind, value: `Artis (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [
                  ...prevVal.filter((item) => item.parent !== kind),
                  {
                    parent: kind,
                    value: `Tanggal Dibuat (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
                  },
                ]
              : [
                  ...prevVal,
                  {
                    parent: kind,
                    value: `Tanggal Dibuat (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
                  },
                ]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'genre':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        case 'theme':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        case 'mood':
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
        case 'song':
          return { ...prevVal, song: value, page: 0 };
        case 'artist':
          return { ...prevVal, artist: value, page: 0 };
        case 'theme':
          return {
            ...prevVal,
            theme: filter.theme.find((item) => item?.name === JSON.parse(value)?.name)
              ? filter.theme.filter((item) => item?.name !== JSON.parse(value)?.name)
              : [...filter.theme, JSON.parse(value)],
            page: 0,
          };
        case 'genre':
          return {
            ...prevVal,
            genre: filter.genre.find((item) => item?.name === JSON.parse(value)?.name)
              ? filter.genre.filter((item) => item?.name !== JSON.parse(value)?.name)
              : [...filter.genre, JSON.parse(value)],
            page: 0,
          };
        case 'mood':
          return {
            ...prevVal,
            mood: filter.mood.find((item) => item?.name === JSON.parse(value)?.name)
              ? filter.mood.filter((item) => item?.name !== JSON.parse(value)?.name)
              : [...filter.mood, JSON.parse(value)],
            page: 0,
          };
        case 'status':
          return {
            ...prevVal,
            status: filter.status.find((item) => item === value)
              ? filter.status.filter((item) => item !== value)
              : [...filter.status, value],
            page: 0,
          };
        case 'createdAt':
          return { ...prevVal, createdAt: value, page: 0 };
        case 'clearAll':
          return {
            page: 0,
            limit: 10,
            order: 'true',
            song: '',
            artist: '',
            theme: [],
            genre: [],
            mood: [],
            status: [],
            createdAt: [null, null],
          };
        default:
          return { ...prevVal };
      }
    });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Media</title>
      </Head>
      <PageContainer heading="">
        <MediaChart />

        <Stack direction={'row'} spacing={3} mt="24px">
          <SearchSection filter={filter} handleChange={handleSearchChange} />
          <TableSection
            filter={filter}
            filterList={filterList}
            handleDeleteFilter={handleSearchChange}
            loading={loadingMusic}
            listMusic={listMusic}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default DatabaseTabMediaComponent;
