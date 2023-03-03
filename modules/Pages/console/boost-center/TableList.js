import React, { useState } from 'react';
import { Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetListBoostPostQuery } from 'api/console/boost';

const TableList = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    labelTanggal: '',
    createdAt: [null, null],
    jadwal: [],
    status: [],
  });
  const [filterList, setFilterList] = useState([]);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
    });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.jadwal.length >= 1 && Object.assign(params, { sessionid: filter.jadwal.map((item) => item._id).flat(2) });
    filter.status.length >= 1 && Object.assign(params, { statuspengajuan: filter.status });

    return params;
  };

  const { data: listBoost, isFetching: loadingBoost } = useGetListBoostPostQuery(getParams());

  const onOrderChange = (e, val) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        descending: e.target.value,
      };
    });
  };

  const handlePageChange = (e, value) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        page: value - 1,
      };
    });
  };

  console.log(filter);

  const handleSearchChange = (kind, value) => {
    setFilterList((prevVal) => {
      switch (kind) {
        case 'jadwal':
          return prevVal.find((item) => item.value === JSON.parse(value).name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value).name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value).name }];
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
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
          page: 0,
        };
      } else if (kind === 'jadwal') {
        return {
          ...prevVal,
          jadwal: filter.jadwal.find((item) => item.name === JSON.parse(value).name)
            ? filter.jadwal.filter((item) => item.name !== JSON.parse(value).name)
            : [...filter.jadwal, JSON.parse(value)],
          page: 0,
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  return (
    <Stack direction={'row'} spacing={3}>
      <SearchSection filter={filter} handleChange={handleSearchChange} />
      <TableSection
        filterList={filterList}
        order={filter.descending}
        loading={loadingBoost}
        listTickets={listBoost}
        handlePageChange={handlePageChange}
        handleOrder={onOrderChange}
        handleDeleteFilter={handleSearchChange}
      />
    </Stack>
  );
};

export default TableList;
