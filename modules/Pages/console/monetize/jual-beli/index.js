import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React, { useState } from 'react';
import TableSection from '../components/JualBeliTableSection';
import SearchSection from '../components/JualBeliSearchSection';
import { Stack } from '@mui/material';
import { useGetListJualBeliContentQuery } from 'api/console/monetize/jualbeli';

const MonetizeJualBeliComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    labelTanggal: '',
    createdAt: [null, null],
    payment_status: [],
  });
  const [filterList, setFilterList] = useState([]);
  const [kind, setKind] = useState('sell');

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
      sell: kind === 'sell',
      buy: kind === 'buy',
      boost: false,
      rewards: false,
      withdrawal: false,
      email: 'ilhamarahman97@gmail.com',
      jenis: 'CONTENT',
    });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.payment_status.length >= 1 && Object.assign(params, { status: filter.payment_status.map((item) => item?._id) });

    return params;
  };

  const { data: listTransaction, isFetching: loadingTransaction } = useGetListJualBeliContentQuery(getParams());

  const onOrderChange = (e) => {
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
      } else if (kind === 'kind') {
        setFilterList([]);
        return {
          page: 0,
          limit: 10,
          descending: 'true',
          labelTanggal: '',
          createdAt: [null, null],
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
          <SearchSection filter={filter} handleChange={handleSearchChange} kind={kind} setKind={setKind} />
          <TableSection
            filterList={filterList}
            listTransaction={listTransaction}
            order={filter.descending}
            loading={loadingTransaction}
            handleOrder={onOrderChange}
            handlePageChange={handlePageChange}
            handleDeleteFilter={handleSearchChange}
            kind={kind}
          />
        </Stack>
      </PageContainer>
    </>
  );
};

export default MonetizeJualBeliComponent;
