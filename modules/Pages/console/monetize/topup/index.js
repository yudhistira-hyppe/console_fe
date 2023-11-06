import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React, { useEffect, useState } from 'react';
import TableSection from './TableSection';
import SearchSection from './SearchSection';
import { Button, Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useGetListTopupQuery } from 'api/console/monetize/dashboard';
import ModalTopup from './Modal/modal-topup';

const MonetizeTopUpComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'date-true',
    labelTanggal: '',
    createdAt: [null, null],
    search: '',
    createdBy: '',
  });
  const [filterList, setFilterList] = useState([]);
  const [openModal, setOpenModal] = useState({
    open: false,
    status: '',
  });

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      sorting: {
        createdAt: filter.descending === 'date-true' ? -1 : filter.descending === 'date-false' ? 1 : undefined,
        email: filter.descending === 'email-true' ? -1 : filter.descending === 'email-false' ? 1 : undefined,
      },
    });
    filter.createdAt[0] && Object.assign(params, { start_date: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { end_date: filter.createdAt[1] });
    filter.search !== '' && Object.assign(params, { search: filter.search });
    filter.createdBy !== '' && Object.assign(params, { createBy: filter.createdBy });

    return params;
  };

  const { data: listTopup, isFetching: loadingTopup } = useGetListTopupQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listTopup?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingTopup]);

  const onOrderChange = (e) => {
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
        case 'search':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: value }]
              : [...prevVal, { parent: kind, value: value }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdBy':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Dibuat Oleh (${value})` }]
              : [...prevVal, { parent: kind, value: `Dibuat Oleh (${value})` }]
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
      if (kind === 'search') {
        return { ...prevVal, search: value, page: 0 };
      } else if (kind === 'createdBy') {
        return { ...prevVal, createdBy: value, page: 0 };
      } else if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
      } else if (kind === 'clearAll') {
        return {
          page: 0,
          limit: 10,
          descending: 'date-true',
          labelTanggal: '',
          createdAt: [null, null],
          search: '',
          createdBy: '',
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  return (
    <>
      <ModalTopup
        open={openModal.open}
        status={openModal.status}
        handleClose={() => setOpenModal({ open: false, status: '' })}
      />

      <PageContainer>
        <Stack direction="row" spacing={3}>
          <SearchSection filter={filter} handleChange={handleSearchChange} />

          <Stack direction="column" gap={3}>
            <Stack direction="row" gap={2} justifyContent="flex-end" alignItems="center">
              <Button variant="contained" color="secondary" onClick={() => setOpenModal({ open: true, status: 'upload' })}>
                Upload data bulk
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => window.open(process.env.NEXT_PUBLIC_API_BASE_URL + '/topups/file/download/')}>
                Template data bulk
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setOpenModal({ open: true, status: 'create' })}>
                Tambah baru
              </Button>
            </Stack>

            <TableSection
              filterList={filterList}
              listTransaction={listTopup}
              filter={filter}
              loading={loadingTopup}
              handleOrder={onOrderChange}
              handlePageChange={handlePageChange}
              handleDeleteFilter={handleSearchChange}
            />
          </Stack>
        </Stack>
      </PageContainer>
    </>
  );
};

export default MonetizeTopUpComponent;
