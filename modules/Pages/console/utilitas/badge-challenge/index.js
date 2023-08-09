import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { toast } from 'react-hot-toast';
import { Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useGetListBadgeQuery } from 'api/console/utilitas/badge';
import ModalBadge from '../Modal/ModalBadge';

const TableList = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    labelTanggal: '',
    createdAt: [null, null],
    name: '',
  });
  const [filterList, setFilterList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: true,
    });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.name !== '' && Object.assign(params, { search: filter.name });

    return params;
  };

  const { data: listBadge, isFetching: loadingBadge } = useGetListBadgeQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listBadge?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingBadge]);

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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Jenis (${value})` }]
              : [...prevVal, { parent: kind, value: `Jenis (${value})` }]
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
      <ModalBadge open={openModal} handleClose={() => setOpenModal(!openModal)} />

      <Stack direction="column" height="100%" gap={3}>
        <SearchSection filter={filter} handleChange={handleSearchChange} />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => setOpenModal(!openModal)}
          sx={{ height: 40 }}
          disabled={!access?.find((item) => item?.nameModule === 'utilitas_challenge_badge')?.acces?.createAcces}>
          <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
            Tambah Badge
          </Typography>
        </Button>
      </Stack>
      <TableSection
        filterList={filterList}
        filter={filter}
        loading={loadingBadge}
        listTickets={listBadge}
        handlePageChange={handlePageChange}
        handleDeleteFilter={handleSearchChange}
      />
    </Stack>
  );
};

export default TableList;
