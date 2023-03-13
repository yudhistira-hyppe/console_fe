import React, { useState } from 'react';
import { Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetListAdsQuery } from 'api/console/ads';

const TableList = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    labelTanggal: '',
    createdAt: [null, null],
    labelCredit: '',
    rangeCredit: [],
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
    filter.rangeCredit[0] >= 0 && Object.assign(params, { mincredit: filter.rangeCredit[0] });
    filter.rangeCredit[1] && Object.assign(params, { maxcredit: filter.rangeCredit[1] });
    filter.status.length >= 1 &&
      Object.assign(params, {
        status: filter.status?.map((item) => {
          if (item === 'Dijadwalkan') {
            return 'APPROVE';
          } else if (item === 'Tinjau') {
            return 'DRAFT';
          } else if (item === 'Habis') {
            return 'FINISH';
          } else if (item === 'Ditangguhkan') {
            return 'REPORTED';
          }
        }),
      });

    return params;
  };

  const { data: listAds, isFetching: loadingAds } = useGetListAdsQuery(getParams());

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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Waktu Transaksi' }]
              : [...prevVal, { parent: kind, value: 'Waktu Transaksi' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'labelTanggal':
          return prevVal.find((item) => item.parent === 'createdAt')
            ? [...prevVal.filter((item) => item.parent !== 'createdAt'), { parent: 'createdAt', value: value }]
            : [...prevVal];
        case 'rangeCredit':
          return prevVal.find((item) => item.parent === 'rangeCredit')
            ? value === ''
              ? [...prevVal.filter((item) => item.parent !== 'rangeCredit')]
              : [...prevVal.filter((item) => item.parent !== 'rangeCredit'), { parent: 'rangeCredit', value: value }]
            : [...prevVal, { parent: kind, value: value }];
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
      } else if (kind === 'rangeCredit') {
        if (value === '<= 200 Kredit') {
          return {
            ...prevVal,
            labelCredit: value,
            rangeCredit: [0, 200],
            page: 0,
          };
        } else if (value === '201 - 500 Kredit') {
          return {
            ...prevVal,
            labelCredit: value,
            rangeCredit: [201, 500],
            page: 0,
          };
        } else if (value === '501 - 750 Kredit') {
          return {
            ...prevVal,
            labelCredit: value,
            rangeCredit: [501, 750],
            page: 0,
          };
        } else if (value === '751 - 1000 Kredit') {
          return {
            ...prevVal,
            labelCredit: value,
            rangeCredit: [751, 1000],
            page: 0,
          };
        } else {
          return { ...prevVal, labelCredit: '', rangeCredit: [], page: 0 };
        }
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
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
        loading={loadingAds}
        listTickets={listAds}
        handlePageChange={handlePageChange}
        handleOrder={onOrderChange}
        handleDeleteFilter={handleSearchChange}
      />
    </Stack>
  );
};

export default TableList;
