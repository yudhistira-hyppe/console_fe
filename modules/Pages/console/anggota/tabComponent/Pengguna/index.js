import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Button, Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import Router from 'next/router';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetAnggotaQuery } from 'api/console/getUserHyppe';

const ChallengeTabMainComponent = ({ kind }) => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    ascending: 'false',
    search: '',
    createdAt: [null, null],
    jabatan: [],
    divisi: [],
    status: '',
  });
  const [filterList, setFilterList] = useState([]);
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      skip: filter.page,
      limit: filter.limit,
      ascending: filter.ascending === 'true' ? true : false,
      menuChallenge: kind,
    });

    filter.search !== '' && Object.assign(params, { search: filter.search });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.status !== '' && Object.assign(params, { status: filter.status === 'true' ? true : false });
    filter.jabatan?.length >= 1 && Object.assign(params, { jabatan: filter?.jabatan });
    filter.divisi?.length >= 1 && Object.assign(params, { divisi: filter?.divisi });

    return params;
  };

  const { data: listAnggota, isFetching: loadingAnggota } = useGetAnggotaQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listAnggota?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingAnggota]);

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
    console.log(value);

    setFilterList((prevVal) => {
      switch (kind) {
        case 'search':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Nama (${value})` }]
              : [...prevVal, { parent: kind, value: `Nama (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'status':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [
                  ...prevVal.filter((item) => item.parent !== kind),
                  { parent: kind, value: `Status (${value === 'true' ? 'Aktif' : 'Tidak Aktif'})` },
                ]
              : [...prevVal, { parent: kind, value: `Status (${value === 'true' ? 'Aktif' : 'Tidak Aktif'})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'jabatan':
          return prevVal.find((item) => item.value === `Jabatan (${value})`)
            ? [...prevVal.filter((item) => item.value !== `Jabatan (${value})`)]
            : [...prevVal, { parent: kind, value: `Jabatan (${value})` }];
        case 'divisi':
          return prevVal.find((item) => item.value === `Divisi (${value})`)
            ? [...prevVal.filter((item) => item.value !== `Divisi (${value})`)]
            : [...prevVal, { parent: kind, value: `Divisi (${value})` }];
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
        case 'createdAt':
          return { ...prevVal, createdAt: value, page: 0 };
        case 'jabatan':
          return {
            ...prevVal,
            jabatan: filter.jabatan.find((item) => item === value)
              ? filter.jabatan.filter((item) => item !== value)
              : [...filter.jabatan, value],
            page: 0,
          };
        case 'divisi':
          return {
            ...prevVal,
            divisi: filter.divisi.find((item) => item === value)
              ? filter.divisi.filter((item) => item !== value)
              : [...filter.divisi, value],
            page: 0,
          };
        case 'status':
          return { ...prevVal, status: value, page: 0 };
        case 'clearAll':
          return {
            page: 0,
            limit: 10,
            ascending: 'false',
            search: '',
            createdAt: [null, null],
            jabatan: [],
            divisi: [],
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
        <title key="title">Hyppe-Console :: Challenge Main</title>
      </Head>
      <PageContainer heading="">
        <Stack direction="row" spacing={3} mt="24px">
          <SearchSection filter={filter} handleChange={handleSearchChange} />
          <TableSection
            filter={filter}
            filterList={filterList}
            handleDeleteFilter={handleSearchChange}
            loading={loadingAnggota}
            listTickets={listAnggota}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default ChallengeTabMainComponent;
