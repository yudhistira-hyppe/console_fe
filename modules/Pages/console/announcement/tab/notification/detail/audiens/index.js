import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Button, Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { toast } from 'react-hot-toast';
import Router from 'next/router';
import { useGetListNotificationAudiensQuery } from 'api/console/announcement';

const AudiensNotificationComponent = ({ templateId }) => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    ascending: 'false',
    username: '',
    gender: [],
    age: '',
    area: [],
    rangeAge: [],
    type: [],
    status: [],
  });
  const [filterList, setFilterList] = useState([]);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      ascending: filter.ascending === 'true' ? true : false,
      templateid: templateId,
    });
    filter.username !== '' && Object.assign(params, { fullname: filter.username });
    filter.gender.length >= 1 &&
      Object.assign(params, {
        gender: filter.gender.map((item) => {
          if (item === 'Laki-laki') {
            return 'L';
          } else if (item === 'Perempuan') {
            return 'P';
          } else {
            return 'O';
          }
        }),
      });
    filter.area.length >= 1 && Object.assign(params, { location: filter.area.map((item) => item?.name) });
    filter.age !== '' && Object.assign(params, { minage: filter.rangeAge[0], maxage: filter.rangeAge[1] });
    filter.type.length >= 1 && Object.assign(params, { accounttype: filter.type.map((item) => item) });
    filter.status.length >= 1 &&
      Object.assign(params, {
        sendstatus: filter.status.map((item) => {
          if (item === 'Terkirim') {
            return 'SEND';
          } else if (item === 'Tidak Terkirim') {
            return 'NOTSEND';
          }
        }),
      });

    return params;
  };

  const { data: listAudiens, isFetching: loadingAudiens } = useGetListNotificationAudiensQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listAudiens?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingAudiens]);

  const onOrderChange = (e, val) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        ascending: e.target.value,
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
        case 'username':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `username (${value})` }]
              : [...prevVal, { parent: kind, value: `username (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'age':
          return prevVal.find((item) => item.parent === kind)
            ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `rentang umur (${value})` }]
            : [...prevVal, { parent: kind, value: `rentang umur (${value})` }];
        case 'clearAge':
          return prevVal.filter((item) => item.parent !== 'age');
        case 'area':
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
        case 'username':
          return { ...prevVal, username: value };
        case 'gender':
          return {
            ...prevVal,
            gender: filter.gender.find((item) => item === value)
              ? filter.gender.filter((item) => item !== value)
              : [...filter.gender, value],
            page: 0,
          };
        case 'area':
          return {
            ...prevVal,
            area: filter.area.find((item) => item?.name === JSON.parse(value)?.name)
              ? filter.area.filter((item) => item?.name !== JSON.parse(value)?.name)
              : [...filter.area, JSON.parse(value)],
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
        case 'status':
          return {
            ...prevVal,
            status: filter.status.find((item) => item === value)
              ? filter.status.filter((item) => item !== value)
              : [...filter.status, value],
            page: 0,
          };
        case 'age':
          if (value === '< 14') {
            return {
              ...prevVal,
              age: value,
              rangeAge: [0, 14],
              page: 0,
            };
          } else if (value === '15 - 28') {
            return {
              ...prevVal,
              age: value,
              rangeAge: [15, 28],
              page: 0,
            };
          } else if (value === '29 - 43') {
            return {
              ...prevVal,
              age: value,
              rangeAge: [29, 43],
              page: 0,
            };
          } else {
            return {
              ...prevVal,
              age: value,
              rangeAge: [44, 120],
              page: 0,
            };
          }
        case 'clearAge':
          return { ...prevVal, age: '', rangeAge: [], page: 0 };
        case 'clearAll':
          return {
            page: 0,
            limit: 10,
            ascending: 'true',
            username: '',
            gender: [],
            age: '',
            area: [],
            rangeAge: [],
            type: [],
          };
        default:
          return { ...prevVal };
      }
    });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Notification Push Audiens</title>
      </Head>
      <PageContainer heading="">
        <Stack direction="row" gap={3}>
          <SearchSection filter={filter} handleChange={handleSearchChange} />

          <TableSection
            filter={filter}
            filterList={filterList}
            handleDeleteFilter={handleSearchChange}
            loading={loadingAudiens}
            listTickets={listAudiens}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default AudiensNotificationComponent;
