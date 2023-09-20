import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Stack } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetListStickerQuery } from 'api/console/database';
import { toast } from 'react-hot-toast';

const TableListSticker = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    order: 'createdAt-',
    sticker: '',
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
      sorting: filter.order,
      tipesticker: 'STICKER',
    });
    filter.sticker !== '' && Object.assign(params, { nama: filter.sticker });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.category?.length >= 1 && Object.assign(params, { kategori: filter.category.map((item) => item?.name) });
    filter.rangePenggunaan[0] && Object.assign(params, { startused: filter.rangePenggunaan[0] });
    filter.rangePenggunaan[1] && Object.assign(params, { endused: filter.rangePenggunaan[1] });
    filter.status?.length >= 1 &&
      Object.assign(params, {
        liststatus: filter.status?.map((item) => {
          if (item === 'Tidak Aktif') {
            return false;
          } else if (item === 'Aktif') {
            return true;
          }
        }),
      });

    return params;
  };

  const { data: listSticker, isFetching: loadingSticker } = useGetListStickerQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listSticker?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingSticker]);

  const onOrderChange = (e, val) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        order: e.target.value,
        page: 0,
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
        case 'sticker':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Stiker (${value})` }]
              : [...prevVal, { parent: kind, value: `Stiker (${value})` }]
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
        case 'clearAll':
          return [];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      switch (kind) {
        case 'sticker':
          return { ...prevVal, sticker: value, page: 0 };
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
        case 'clearAll':
          return {
            page: 0,
            limit: 10,
            order: 'createdAt-',
            sticker: '',
            createdAt: [null, null],
            category: [],
            labelPenggunaan: '',
            rangePenggunaan: [],
            status: [],
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
          loading={loadingSticker}
          listSticker={listSticker}
          handlePageChange={handlePageChange}
          handleOrder={onOrderChange}
        />
      </Stack>
    </PageContainer>
  );
};

export default TableListSticker;
