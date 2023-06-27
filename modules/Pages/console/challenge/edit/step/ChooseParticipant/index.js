import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetAllUserQuery } from 'api/user/user';
import { toast } from 'react-hot-toast';
import { Typography } from '@material-ui/core';
import Router from 'next/router';
import { isEmpty } from 'lodash';

const ChooseParticipant = ({ inputValue, handleInputChange }) => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    username: '',
    gender: [],
    age: '',
    area: [],
    rangeAge: [],
    type: [],
  });
  const [filterList, setFilterList] = useState([]);
  const [selected, setSelected] = useState([]);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
    });
    filter.username !== '' && Object.assign(params, { username: filter.username });
    filter.gender.length >= 1 &&
      Object.assign(params, {
        gender: filter.gender.map((item) => {
          if (item === 'Laki-laki') {
            return 'MALE';
          } else if (item === 'Perempuan') {
            return 'FEMALE';
          } else {
            return 'OTHER';
          }
        }),
      });
    filter.area.length >= 1 && Object.assign(params, { lokasi: filter.area.map((item) => item?._id) });
    filter.age !== '' && Object.assign(params, { startage: filter.rangeAge[0], endage: filter.rangeAge[1] });
    filter.type.length >= 1 && Object.assign(params, { jenis: filter.type.map((item) => item) });

    return params;
  };

  const { data: listUser, isFetching: loadingUser } = useGetAllUserQuery(getParams());

  const { data: allUser, isFetching: loadingAllUser } = useGetAllUserQuery({ ...getParams(), type: 'ALL' });

  useEffect(() => {
    if (filter.page >= 1 && listUser?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingUser]);

  useEffect(() => {
    if (!isEmpty(inputValue?.invited_people)) {
      setSelected(inputValue?.invited_people);
    }
  }, [handleInputChange]);

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
            descending: 'true',
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
        <title key="title">Hyppe-Console :: Database Konten</title>
      </Head>
      <PageContainer heading="">
        <Stack direction="column" spacing={3} style={{ position: 'relative' }}>
          <Stack direction={'row'} spacing={3} mt={3} mb={12}>
            <SearchSection filter={filter} handleChange={handleSearchChange} />
            <TableSection
              filterList={filterList}
              handleDeleteFilter={handleSearchChange}
              filter={filter}
              loading={loadingUser}
              loadingAll={loadingAllUser}
              listTickets={listUser}
              listAllUser={allUser}
              handlePageChange={handlePageChange}
              handleOrder={onOrderChange}
              selected={selected}
              setSelected={setSelected}
            />
          </Stack>

          <Box
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              backgroundColor: 'white',
              width: '100%',
              padding: 24,
            }}>
            <Stack direction="row" gap={1} maxWidth={1250} mx="auto">
              <Button
                variant="contained"
                color="secondary"
                style={{ borderRadius: 6, padding: '10px 20px' }}
                onClick={() => {
                  handleInputChange('invited_people', selected);
                  Router.back();
                }}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                  Terapkan Undangan
                </Typography>
              </Button>
              <Button
                variant="outlined"
                color="error"
                style={{ borderRadius: 6, padding: '10px 20px' }}
                onClick={() => setSelected([])}
                disabled={selected?.length < 1}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                  Reset Semua Undangan
                </Typography>
              </Button>
            </Stack>
          </Box>
        </Stack>
      </PageContainer>
    </>
  );
};

export default ChooseParticipant;
