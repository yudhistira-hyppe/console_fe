import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useGetTransactionVouchersQuery } from 'api/console/monetize/voucher';
import moment from 'moment';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import SearchSection from './SearchSection';
import TableSection from './TableSection';

const MonetizeVoucherComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    labelTanggal: '',
    createdAt: [null, null],
    period: '',
    periodRange: '',
    voucher_status: [],
    payment_status: [],
  });
  const [filterList, setFilterList] = useState([]);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
    });
    filter.search !== '' && Object.assign(params, { key: filter.search });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.periodRange[0] && Object.assign(params, { startday: filter.periodRange[0] });
    filter.periodRange[1] && Object.assign(params, { endday: filter.periodRange[1] });
    filter.voucher_status.includes('Digunakan') && Object.assign(params, { used: true });
    filter.voucher_status.includes('Kadaluarsa') && Object.assign(params, { expired: true });
    filter.payment_status.length >= 1 && Object.assign(params, { status: filter.payment_status.map((item) => item?._id) });

    return params;
  };

  const { data: listVouchers, isFetching: loadingVoucher } = useGetTransactionVouchersQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listVouchers?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingVoucher]);

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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Voucher (${value})` }]
              : [...prevVal, { parent: kind, value: `Voucher (${value})` }]
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
        case 'period':
          return prevVal.find((item) => item.parent === kind)
            ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `${value} Hari` }]
            : [...prevVal, { parent: kind, value: `${value} Hari` }];
        case 'clearRange':
          return [...prevVal.filter((item) => item.parent !== 'period')];
        case 'payment_status':
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
      if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
      } else if (kind === 'search') {
        return { ...prevVal, search: value, page: 0 };
      } else if (kind === 'period') {
        switch (value) {
          case '< 30':
            return {
              ...prevVal,
              period: value,
              periodRange: [1, 29],
              page: 0,
            };
          case '30-60':
            return {
              ...prevVal,
              period: value,
              periodRange: [30, 60],
              page: 0,
            };
          case '61-90':
            return {
              ...prevVal,
              period: value,
              periodRange: [61, 90],
              page: 0,
            };
          case '> 90':
            return {
              ...prevVal,
              period: value,
              periodRange: [91, 999],
              page: 0,
            };
          default:
            return { ...prevVal };
        }
      } else if (kind === 'clearRange') {
        return { ...prevVal, periodRange: value, period: '', page: 0 };
      } else if (kind === 'payment_status') {
        return {
          ...prevVal,
          payment_status: filter.payment_status.find((item) => item?.name === JSON.parse(value)?.name)
            ? filter.payment_status.filter((item) => item?.name !== JSON.parse(value)?.name)
            : [...filter.payment_status, JSON.parse(value)],
          page: 0,
        };
      } else if (kind === 'voucher_status') {
        return {
          ...prevVal,
          voucher_status: filter.voucher_status.find((item) => item === value)
            ? filter.voucher_status.filter((item) => item !== value)
            : [...filter.voucher_status, value],
          page: 0,
        };
      } else if (kind === 'clearAll') {
        return {
          page: 0,
          limit: 10,
          descending: 'true',
          search: '',
          labelTanggal: '',
          createdAt: [null, null],
          period: '',
          periodRange: '',
          voucher_status: [],
          payment_status: [],
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
            listVouchers={listVouchers}
            filter={filter}
            loading={loadingVoucher}
            handleOrder={onOrderChange}
            handlePageChange={handlePageChange}
            handleDeleteFilter={handleSearchChange}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default MonetizeVoucherComponent;
