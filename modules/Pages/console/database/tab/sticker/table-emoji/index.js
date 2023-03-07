import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Stack } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import SearchSection from './SearchSection';
import TableSection from './TableSection';

const TableListEmoji = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    order: 'desc',
    emoji: '',
    createdAt: [null, null],
    category: [],
    labelPenggunaan: '',
    rangePenggunaan: [],
    status: [],
  });
  const [filterList, setFilterList] = useState([]);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      sort: filter.order,
    });
    filter.emoji !== '' && Object.assign(params, { name: filter.emoji });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.category?.length >= 1 && Object.assign(params, { category: filter.category.join(', ') });
    filter.status?.length >= 1 && Object.assign(params, { status: filter.status.join(', ') });
  };

  const onOrderChange = (e, val) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        order: e.target.value,
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
        case 'emoji':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Emoji (${value})` }]
              : [...prevVal, { parent: kind, value: `Emoji (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [
                  ...prevVal.filter((item) => item.parent !== kind),
                  {
                    parent: kind,
                    value: `Tanggal Diunggah (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
                  },
                ]
              : [
                  ...prevVal,
                  {
                    parent: kind,
                    value: `Tanggal Diunggah (${value.map((item) => moment(item)?.format('DD-MM-YYYY')).join('-')})`,
                  },
                ]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'category':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        case 'rangePenggunaan':
          return prevVal.find((item) => item.parent === 'rangePenggunaan')
            ? value === ''
              ? [...prevVal.filter((item) => item.parent !== 'rangePenggunaan')]
              : [...prevVal.filter((item) => item.parent !== 'rangePenggunaan'), { parent: 'rangePenggunaan', value: value }]
            : [...prevVal, { parent: kind, value: value }];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      switch (kind) {
        case 'emoji':
          return { ...prevVal, emoji: value, page: 0 };
        case 'createdAt':
          return { ...prevVal, createdAt: value, page: 0 };
        case 'category':
          return {
            ...prevVal,
            category: filter.category.find((item) => item?.name === JSON.parse(value)?.name)
              ? filter.category.filter((item) => item?.name !== JSON.parse(value)?.name)
              : [...filter.category, JSON.parse(value)],
            page: 0,
          };
        case 'rangePenggunaan':
          if (value === '<= 200') {
            return {
              ...prevVal,
              labelPenggunaan: value,
              rangePenggunaan: [0, 200],
              page: 0,
            };
          } else if (value === '201 - 500') {
            return {
              ...prevVal,
              labelPenggunaan: value,
              rangePenggunaan: [201, 500],
              page: 0,
            };
          } else if (value === '501 - 750') {
            return {
              ...prevVal,
              labelPenggunaan: value,
              rangePenggunaan: [501, 750],
              page: 0,
            };
          } else if (value === '751 - 1000') {
            return {
              ...prevVal,
              labelPenggunaan: value,
              rangePenggunaan: [751, 1000],
              page: 0,
            };
          } else {
            return { ...prevVal, labelPenggunaan: '', rangePenggunaan: [], page: 0 };
          }
        case 'status':
          return {
            ...prevVal,
            status: filter.status.find((item) => item === value)
              ? filter.status.filter((item) => item !== value)
              : [...filter.status, value],
            page: 0,
          };
        default:
          return { ...prevVal, page: 0 };
      }
    });
  };

  return (
    <PageContainer>
      <Stack direction="row" spacing={3}>
        <SearchSection filter={filter} handleChange={handleSearchChange} />
        <TableSection
          filter={filter}
          filterList={filterList}
          handleDeleteFilter={handleSearchChange}
          order={filter.order}
          loading={false}
          listEmoji={{ data: [{}] }}
          handlePageChange={handlePageChange}
          handleOrder={onOrderChange}
        />
      </Stack>
    </PageContainer>
  );
};

export default TableListEmoji;
