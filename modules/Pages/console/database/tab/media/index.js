import React, { useState } from 'react';
import Head from 'next/head';
import { Grid, Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import GridContainer from '@jumbo/components/GridContainer';
import CardPopular from './card-populer';
import { useGetMediaChartQuery } from 'api/console/database/media';

const DatabaseTabMediaComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    song: '',
    artist: '',
    theme: [],
    genre: [],
    mood: [],
    status: [],
    createdAt: [null, null],
  });
  const [filterList, setFilterList] = useState([]);
  const router = useRouter();

  const { data: mediaChart, isFetching: loadingChart } = useGetMediaChartQuery();

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
        case 'song':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Judul Lagu' }]
              : [...prevVal, { parent: kind, value: 'Judul Lagu' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'artist':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Nama Artis' }]
              : [...prevVal, { parent: kind, value: 'Nama Artis' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Tanggal Dibuat' }]
              : [...prevVal, { parent: kind, value: 'Tanggal Dibuat' }]
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
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      switch (kind) {
        case 'song':
          return { ...prevVal, song: value };
        case 'artist':
          return { ...prevVal, artist: value };
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
          return { ...prevVal, createdAt: value };
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
        <GridContainer>
          <Grid item xs={12} sm={6}>
            <CardPopular
              title="Artis Populer"
              description="Nama Artis"
              card="artis"
              data={mediaChart?.data[0]?.artistPopuler}
              loading={loadingChart}
              image
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardPopular
              title="Musik Populer"
              description="Judul Lagu"
              card="musik"
              data={mediaChart?.data[0]?.musicPopuler}
              loading={loadingChart}
              image
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardPopular
              title="Genre Populer"
              description="Genre"
              card="genre"
              data={mediaChart?.data[0]?.genrePopuler}
              loading={loadingChart}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardPopular
              title="Tema Populer"
              description="Tema"
              card="tema"
              data={mediaChart?.data[0]?.themePopuler}
              loading={loadingChart}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardPopular
              title="Suasana Hati Populer"
              description="Suasana Hati"
              card="mood"
              data={mediaChart?.data[0]?.moodPopuler}
              loading={loadingChart}
            />
          </Grid>
        </GridContainer>

        <Stack direction={'row'} spacing={3} mt="24px">
          <SearchSection filter={filter} handleChange={handleSearchChange} />
          <TableSection
            filterList={filterList}
            handleDeleteFilter={handleSearchChange}
            order={filter.descending}
            loading={false}
            listTickets={{ arrdata: [{ name: 'Lorem 1' }, { name: 'Lorem 2' }] }}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default DatabaseTabMediaComponent;
