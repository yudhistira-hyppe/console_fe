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

const AnnouncementTabNotificationComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    createdAt: [null, null],
  });
  const [filterList, setFilterList] = useState([]);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
    });

    filter.search !== '' && Object.assign(params, { nameChallenge: filter.search });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });

    return params;
  };

  // useEffect(() => {
  //   if (filter.page >= 1 && listChallenge?.data?.length < 1) {
  //     toast.success('Semua data sudah ditampilkan');
  //     setFilter((prevVal) => {
  //       return {
  //         ...prevVal,
  //         page: prevVal.page - 1,
  //       };
  //     });
  //   }
  // }, [filter, loadingChallenge]);

  const onOrderChange = (e, val) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        descending: e.target.value,
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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Nama (${value})` }]
              : [...prevVal, { parent: kind, value: `Nama (${value})` }]
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
        case 'clearAll':
          return {
            page: 0,
            limit: 10,
            ascending: 'true',
            search: '',
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
        <title key="title">Hyppe-Console :: Notification Push</title>
      </Head>
      <PageContainer heading="">
        <Stack direction="row" gap={3} mt="24px">
          <SearchSection filter={filter} handleChange={handleSearchChange} />

          <Stack direction="column" gap={3} width="100%">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography style={{ fontWeight: 'bold' }}>Daftar Push Notifikasi</Typography>

              <Button
                variant="contained"
                color="secondary"
                style={{ height: 40 }}
                onClick={() => Router.push('/announcement/notification/create')}>
                <Typography style={{ fontSize: 14 }}>Tambah Push Notifikasi</Typography>
              </Button>
            </Stack>

            <TableSection
              filter={filter}
              filterList={filterList}
              handleDeleteFilter={handleSearchChange}
              loading={false}
              listTickets={{ data: [{}] }}
              handlePageChange={handlePageChange}
              handleOrder={onOrderChange}
            />
          </Stack>
        </Stack>
      </PageContainer>
    </>
  );
};

export default AnnouncementTabNotificationComponent;
