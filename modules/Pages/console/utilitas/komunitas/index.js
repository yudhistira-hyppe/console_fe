import { Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import TableSection from './TableSection';
import { useRouter } from 'next/router';
import SearchSection from './SearchSection';
import { useGetListCommunityQuery } from 'api/console/utilitas/community';

const TableList = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: true,
    name: '',
    isActive: true,
  });
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
  const router = useRouter();

  const { data: listData, isFetching: loadingList } = useGetListCommunityQuery(filter);

  const handleChange = (name, val) => {
    setFilter((prevVal) => ({ ...prevVal, [name]: val }));
  };

  return (
    <Stack flex={1} direction="row" spacing={3}>
      <Stack direction="column" height="100%" gap={3}>
        <SearchSection filter={filter} handleChange={handleChange} />

        <Button
          variant="contained"
          endIcon={<Add />}
          color="secondary"
          onClick={() => router.push({ pathname: '/utilitas', query: { tab: 'community', create: true } })}
          sx={{ height: 40 }}
          disabled={!access?.find((item) => item?.nameModule === 'utilitas_setting')?.acces?.createAcces}>
          <Typography
            style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize', marginBottom: 3 }}>
            Tambah Data
          </Typography>
        </Button>
      </Stack>

      <TableSection loading={loadingList} listData={listData} />
    </Stack>
  );
};

export default TableList;
