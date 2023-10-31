import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React, { useEffect, useState } from 'react';
import TableSection from './TableSection';
import SearchSection from './SearchSection';
import { Stack } from '@mui/material';
import { useGetListJualBeliContentQuery } from 'api/console/monetize/jualbeli';
import { toast } from 'react-hot-toast';

const MonetizeTopUpComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    labelTanggal: '',
    createdAt: [null, null],
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

    return params;
  };

  // useEffect(() => {
  //   if (filter.page >= 1 && listTransaction?.data?.length < 1) {
  //     toast.success('Semua data sudah ditampilkan');
  //     setFilter((prevVal) => {
  //       return {
  //         ...prevVal,
  //         page: prevVal.page - 1,
  //       };
  //     });
  //   }
  // }, [filter, loadingTransaction]);

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
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
      } else if (kind === 'clearAll') {
        return {
          page: 0,
          limit: 10,
          descending: 'true',
          labelTanggal: '',
          createdAt: [null, null],
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  return (
    <>
      <PageContainer>
        <Stack direction="row" spacing={3}>
          <SearchSection filter={filter} handleChange={handleSearchChange} />
          <TableSection
            filterList={filterList}
            listTransaction={{ data: [{}, {}] }}
            filter={filter}
            loading={false}
            handleOrder={onOrderChange}
            handlePageChange={handlePageChange}
            handleDeleteFilter={handleSearchChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default MonetizeTopUpComponent;
