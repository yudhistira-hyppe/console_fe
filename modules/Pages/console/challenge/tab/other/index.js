import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Button, Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { Typography } from '@material-ui/core';

const ChallengeTabOtherComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    createdAt: [null, null],
    type: [],
    status: [],
    join: [],
  });
  const [filterList, setFilterList] = useState([]);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
    });

    filter.search !== '' && Object.assign(params, { search: filter.search });
    filter.type.length >= 1 &&
      Object.assign(params, {
        type: filter.type.map((item) => {
          if (item === 'Konten') {
            return 'content';
          } else if (item === 'Akun') {
            return 'account';
          }
        }),
      });
    filter.status.length >= 1 &&
      Object.assign(params, {
        status: filter.status.map((item) => {
          if (item === 'Sedang Berjalan') {
            return 'ONGOING';
          } else if (item === 'Akan Datang') {
            return 'UPCOMING';
          } else if (item === 'Selesai') {
            return 'FINISH';
          }
        }),
      });
    filter.join.length >= 1 &&
      Object.assign(params, {
        join: filter.join.map((item) => {
          if (item === 'Semua Pengguna') {
            return 'ALL';
          } else if (item === 'Dengan Undangan') {
            return 'INVITE';
          }
        }),
      });
    filter.createdAt[0] && params.push(`startdate=${filter.createdAt[0]}`);
    filter.createdAt[1] && params.push(`enddate=${filter.createdAt[1]}`);
  };

  useEffect(() => {
    if (filter.page >= 1 && listMusic?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter]);

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
        case 'search':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Nama (${value})` }]
              : [...prevVal, { parent: kind, value: `Nama (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'type':
          return prevVal.find((item) => item.parent === `kind-${value}`)
            ? [...prevVal.filter((item) => item.parent !== `kind-${value}`)]
            : [...prevVal, { parent: `kind-${value}`, value: `Tipe (${value})` }];
        case 'status':
          return prevVal.find((item) => item.parent === `kind-${value}`)
            ? [...prevVal.filter((item) => item.parent !== `kind-${value}`)]
            : [...prevVal, { parent: `kind-${value}`, value: `Status (${value})` }];
        case 'join':
          return prevVal.find((item) => item.parent === `kind-${value}`)
            ? [...prevVal.filter((item) => item.parent !== `kind-${value}`)]
            : [...prevVal, { parent: `kind-${value}`, value: `Cara Bergabung (${value})` }];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [
                  ...prevVal.filter((item) => item.parent !== kind),
                  {
                    parent: kind,
                    value: `Terakhir Ditambahkan (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
                  },
                ]
              : [
                  ...prevVal,
                  {
                    parent: kind,
                    value: `Terakhir Ditambahkan (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
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
        case 'type':
          return {
            ...prevVal,
            type: filter.type.find((item) => item === value)
              ? filter.type.filter((item) => item !== value)
              : [...filter.type, value],
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
        case 'join':
          return {
            ...prevVal,
            join: filter.join.find((item) => item === value)
              ? filter.join.filter((item) => item !== value)
              : [...filter.join, value],
            page: 0,
          };
        case 'createdAt':
          return { ...prevVal, createdAt: value, page: 0 };
        case 'clearAll':
          return {
            page: 0,
            limit: 10,
            descending: 'true',
            search: '',
            createdAt: [null, null],
            type: [],
            status: [],
            join: [],
          };
        default:
          return { ...prevVal };
      }
    });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Challenge Main</title>
      </Head>
      <PageContainer heading="">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography style={{ fontSize: 36, fontWeight: 'bold' }}>50</Typography>
            <Typography style={{ fontWeight: 'bold' }}>Total Challenge</Typography>
          </Stack>
          <Button variant="contained" color="secondary" style={{ height: 40 }}>
            <Typography style={{ fontSize: 14 }}>Tambah Challenge Baru</Typography>
          </Button>
        </Stack>
        <Stack direction="row" spacing={3} mt="24px">
          <SearchSection filter={filter} handleChange={handleSearchChange} />
          <TableSection
            filter={filter}
            filterList={filterList}
            handleDeleteFilter={handleSearchChange}
            loading={false}
            listTickets={{
              data: [{ status: 'Sedang Berjalan' }, { status: 'Akan Datang' }, { status: 'Selesai' }],
            }}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default ChallengeTabOtherComponent;
