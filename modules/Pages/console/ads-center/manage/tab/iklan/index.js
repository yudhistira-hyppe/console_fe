import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetListAdsQuery } from 'api/console/ads';

const AdsManageTableList = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    labelTanggal: '',
    createdAt: [null, null],
    labelPlan: '',
    rangePlan: '',
    type: [],
    status: [],
  });
  const [filterList, setFilterList] = useState([]);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      sorting: filter.descending === 'true' ? true : false,
    });
    filter.search !== '' && Object.assign(params, { name_ads: filter.search });
    filter.createdAt[0] && Object.assign(params, { start_date: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { end_date: filter.createdAt[1] });
    filter.rangePlan !== '' && Object.assign(params, { plan_ads: [filter.rangePlan] });
    filter.type.length >= 1 && Object.assign(params, { type_ads: filter.type?.map((item) => item?._id) });
    filter.status.length >= 1 &&
      Object.assign(params, {
        status_list: filter.status?.map((item) => {
          if (item === 'Aktif') {
            return 'ACTIVE';
          } else if (item === 'Tidak Aktif') {
            return 'IN_ACTIVE';
          } else if (item === 'Ditinjau') {
            return 'UNDER_REVIEW';
          } else if (item === 'Draf') {
            return 'DRAFT';
          }
        }),
      });

    return params;
  };

  const { data: listAds, isFetching: loadingAds } = useGetListAdsQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listAds?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingAds]);

  const onOrderChange = (e, val) => {
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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Nama (${value})` }]
              : [...prevVal, { parent: kind, value: `Nama (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdAt':
          return value.length >= 1 && value[0]
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: 'Waktu Mulai' }]
              : [...prevVal, { parent: kind, value: 'Waktu Mulai' }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'labelTanggal':
          return prevVal.find((item) => item.parent === 'createdAt')
            ? [...prevVal.filter((item) => item.parent !== 'createdAt'), { parent: 'createdAt', value: value }]
            : [...prevVal];
        case 'rangePlan':
          return prevVal.find((item) => item.parent === 'rangePlan')
            ? value === ''
              ? [...prevVal.filter((item) => item.parent !== 'rangePlan')]
              : [...prevVal.filter((item) => item.parent !== 'rangePlan'), { parent: 'rangePlan', value: value }]
            : [...prevVal, { parent: kind, value: value }];
        case 'type':
          return prevVal.find((item) => item.value === JSON.parse(value).name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value).name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value).name }];
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
      } else if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
      } else if (kind === 'rangePlan') {
        if (value === '< 50') {
          return {
            ...prevVal,
            labelPlan: value,
            rangePlan: 'show_smaller_than_50',
            page: 0,
          };
        } else if (value === '50 - 99') {
          return {
            ...prevVal,
            labelPlan: value,
            rangePlan: 'show_50_smaller_than_90',
            page: 0,
          };
        } else if (value === '100 - 500') {
          return {
            ...prevVal,
            labelPlan: value,
            rangePlan: 'show_100_smaller_than_500',
            page: 0,
          };
        } else if (value === '> 500') {
          return {
            ...prevVal,
            labelPlan: value,
            rangePlan: 'show_greater_than_500',
            page: 0,
          };
        } else {
          return { ...prevVal, labelPlan: '', rangePlan: '', page: 0 };
        }
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
          page: 0,
        };
      } else if (kind === 'type') {
        return {
          ...prevVal,
          type: filter.type.find((item) => item?.name === JSON.parse(value)?.name)
            ? filter.type.filter((item) => item?.name !== JSON.parse(value)?.name)
            : [...filter.type, JSON.parse(value)],
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
          labelPlan: '',
          rangePlan: '',
          type: [],
          status: [],
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  return (
    <Stack direction={'row'} gap={3} overflow="hidden">
      <SearchSection filter={filter} handleChange={handleSearchChange} />
      <TableSection
        filterList={filterList}
        filter={filter}
        loading={loadingAds}
        listTickets={listAds}
        handlePageChange={handlePageChange}
        handleOrder={onOrderChange}
        handleDeleteFilter={handleSearchChange}
      />
    </Stack>
  );
};

export default AdsManageTableList;
