import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { toast } from 'react-hot-toast';
import { Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useGetListMasterBankQuery } from 'api/console/utilitas/bank';
import Router from 'next/router';

const TableList = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    labelTanggal: '',
    createdAt: [null, null],
    name: '',
  });
  const [filterList, setFilterList] = useState([]);
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      activestatus: true,
    });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.name !== '' && Object.assign(params, { bankname: filter.name });

    return params;
  };

  const { data: listMasterBank, isFetching: loadingMasterBank } = useGetListMasterBankQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listMasterBank?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingMasterBank]);

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
        case 'name':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Nama Bank (${value})` }]
              : [...prevVal, { parent: kind, value: `Nama Bank (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Waktu Transaksi' }]
              : [...prevVal, { parent: kind, value: 'Waktu Transaksi' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'labelTanggal':
          return prevVal.find((item) => item.parent === 'createdAt')
            ? [...prevVal.filter((item) => item.parent !== 'createdAt'), { parent: 'createdAt', value: value }]
            : [...prevVal];
        case 'clearAll':
          return [];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'name') {
        return { ...prevVal, name: value, page: 0 };
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
      } else if (kind === 'clearAll') {
        return {
          page: 0,
          limit: 10,
          descending: 'true',
          labelTanggal: '',
          createdAt: [null, null],
          jadwal: [],
          status: [],
          name: '',
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  return (
    <Stack direction={'row'} spacing={3}>
      <Stack direction="column" height="100%" gap={3}>
        <SearchSection filter={filter} handleChange={handleSearchChange} />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => Router.replace('/utilitas?tab=bank&create=true')}
          sx={{ height: 40 }}
          disabled={!access?.find((item) => item?.nameModule === 'utilitas_bank')?.acces?.createAcces}>
          <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
            Tambah Bank
          </Typography>
        </Button>
      </Stack>
      <TableSection
        filterList={filterList}
        filter={filter}
        loading={loadingMasterBank}
        listTickets={listMasterBank}
        handlePageChange={handlePageChange}
        handleDeleteFilter={handleSearchChange}
      />
    </Stack>
  );
};

export default TableList;
