import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Chip, Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { toast } from 'react-hot-toast';
import { Typography } from '@material-ui/core';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import { useGetListUserChallengeQuery } from 'api/console/challenge';

const ParticipantComponent = ({ detail }) => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    username: '',
    gender: [],
    age: '',
    rangeAge: [],
    type: [],
  });
  const [filterList, setFilterList] = useState([]);
  const [session, setSession] = useState('BERLANGSUNG');

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      challengeId: detail?._id,
      page: filter.page,
      limit: filter.limit,
      ascending: filter.descending === 'true' ? true : false,
      pilihansession: session,
    });
    filter.username !== '' && Object.assign(params, { username: filter.username });
    filter.gender.length >= 1 &&
      Object.assign(params, {
        jeniskelamin: filter.gender.map((item) => {
          if (item === 'Laki-laki') {
            return 'MALE';
          } else if (item === 'Perempuan') {
            return 'FEMALE';
          } else {
            return 'OTHER';
          }
        }),
      });
    filter.age !== '' && Object.assign(params, { startage: filter.rangeAge[0], endage: filter.rangeAge[1] });
    filter.type.length >= 1 && Object.assign(params, { jenisakun: filter.type.map((item) => item) });

    return params;
  };

  const { data: listUser, isFetching: loadingUser } = useGetListUserChallengeQuery(getParams());

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
            <Stack direction="column" spacing={3}>
              {detail?.statusChallenge === 'PUBLISH' && detail?.statuscurrentChallenge !== 'AKAN DATANG' && (
                <Stack direction="row" alignItems="center" gap={2}>
                  <Chip
                    label={
                      <Typography style={{ color: session === 'BERLANGSUNG' ? '#AB22AF' : '#00000099', fontSize: 14 }}>
                        Berlangsung
                      </Typography>
                    }
                    sx={{
                      padding: '0 6px',
                      height: 40,
                      backgroundColor: session === 'BERLANGSUNG' ? '#AB22AF14' : 'transparent',
                      borderRadius: 5,
                      border: session === 'BERLANGSUNG' ? '1px solid #AB22AF' : '1px solid #0000001F',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSession('BERLANGSUNG')}
                  />
                  <Chip
                    label={
                      <Typography style={{ color: session === 'BERAKHIR' ? '#AB22AF' : '#00000099', fontSize: 14 }}>
                        Berakhir
                      </Typography>
                    }
                    sx={{
                      padding: '0 6px',
                      height: 40,
                      backgroundColor: session === 'BERAKHIR' ? '#AB22AF14' : 'transparent',
                      borderRadius: 5,
                      border: session === 'BERAKHIR' ? '1px solid #AB22AF' : '1px solid #0000001F',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSession('BERAKHIR')}
                  />
                </Stack>
              )}
              <TableSection
                filterList={filterList}
                challengeId={detail?._id}
                handleDeleteFilter={handleSearchChange}
                filter={filter}
                loading={loadingUser}
                listTickets={listUser}
                handlePageChange={handlePageChange}
                session={session}
                handleOrder={onOrderChange}
              />
            </Stack>
          </Stack>
        </Stack>
      </PageContainer>
    </>
  );
};

export default ParticipantComponent;
