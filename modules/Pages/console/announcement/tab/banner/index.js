import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Button, Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { Typography } from '@material-ui/core';
import { useGetListChallengeQuery } from 'api/console/challenge';
import Router from 'next/router';
import { useGetListBannerSearchQuery } from 'api/console/announcement';

const AnnouncementTabBannerComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    ascending: 'false',
    search: '',
    createdAt: [null, null],
    status: '',
  });
  const [filterList, setFilterList] = useState([]);
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      ascending: filter.ascending === 'true' ? true : false,
    });

    filter.search !== '' && Object.assign(params, { keyword: filter.search });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter?.status !== '' && Object.assign(params, { statustayang: filter?.status === 'TAYANG' });

    return params;
  };

  const { data: listBanner, isFetching: loadingBanner } = useGetListBannerSearchQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listBanner?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingBanner]);

  const onOrderChange = (e, val) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        ascending: e.target.value,
        page: 0,
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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Judul' }]
              : [...prevVal, { parent: kind, value: 'Judul' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'status':
          return prevVal.find((item) => item.parent === kind)
            ? value === ''
              ? [...prevVal.filter((item) => item.parent !== kind)]
              : [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: value }]
            : [...prevVal, { parent: kind, value: value }];
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
        case 'search':
          return { ...prevVal, search: value, page: 0 };
        case 'createdAt':
          return { ...prevVal, createdAt: value, page: 0 };
        case 'status':
          return { ...prevVal, status: value, page: 0 };
        case 'clearAll':
          return {
            page: 0,
            limit: 10,
            ascending: 'true',
            search: '',
            createdAt: [null, null],
            status: '',
          };
        default:
          return { ...prevVal };
      }
    });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Banner</title>
      </Head>
      <PageContainer heading="">
        <Stack direction="row" gap={3} mt="24px">
          <SearchSection filter={filter} handleChange={handleSearchChange} />

          <Stack direction="column" gap={3} width="100%">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography style={{ fontWeight: 'bold' }}>Daftar Banner</Typography>

              <Button
                variant="contained"
                color="secondary"
                style={{ height: 40 }}
                onClick={() => Router.push('/announcement/banner/create')}
                disabled={!access?.find((item) => item?.nameModule === 'announcement_banner')?.acces?.createAcces}>
                <Typography style={{ fontSize: 14 }}>Tambah Banner</Typography>
              </Button>
            </Stack>

            <TableSection
              filter={filter}
              filterList={filterList}
              handleDeleteFilter={handleSearchChange}
              loading={loadingBanner}
              listTickets={listBanner}
              handlePageChange={handlePageChange}
              handleOrder={onOrderChange}
            />
          </Stack>
        </Stack>
      </PageContainer>
    </>
  );
};

export default AnnouncementTabBannerComponent;
