import React, { useState } from 'react';
import { Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useRouter } from 'next/router';
import moment from 'moment';

const TableList = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    type: [],
    status: [],
    createdAt: [null, null],
  });
  const [filterList, setFilterList] = useState([]);
  const router = useRouter();

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

  const handleSearchChange = (kind, value) => {
    setFilterList((prevVal) => {
      switch (kind) {
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Tanggal Pembuatan' }]
              : [...prevVal, { parent: kind, value: 'Tanggal Pembuatan' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      switch (kind) {
        case 'createdAt':
          return { ...prevVal, createdAt: value, page: 0 };
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
        default:
          return { ...prevVal };
      }
    });
  };

  return (
    <Stack direction={'row'} spacing={3}>
      <SearchSection filter={filter} handleChange={handleSearchChange} />
      <TableSection
        filterList={filterList}
        handleDeleteFilter={handleSearchChange}
        order={filter.descending}
        loading={false}
        listTickets={{ arrdata: [{}] }}
        handlePageChange={handlePageChange}
        handleOrder={onOrderChange}
      />
    </Stack>
  );
};

export default TableList;
