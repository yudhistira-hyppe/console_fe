import React, { useState } from 'react';
import { Stack } from '@mui/material';
import SearchSection from './SearchSection';
import TableSection from './TableSection';
import { useGetViewerAdsQuery } from 'api/console/ads';
import { LoadingButton } from '@mui/lab';
import { GetApp } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import jsPDF from 'jspdf';
import { toast } from 'react-hot-toast';
import { renderToString } from 'react-dom/server';
import DocumentPDF from './DocumentPDF';

const TableListPenonton = ({ idAds }) => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    age: '',
    area: [],
    rangeAge: [],
    labelTanggal: '',
    createdAt: [null, null],
    labelCredit: '',
    rangeCredit: [],
    priority: [],
    gender: [],
    status: [],
  });
  const [filterList, setFilterList] = useState([]);
  const [isExport, setExport] = useState(false);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      id: idAds,
      page: filter.page,
      limit: filter.limit,
      descending: filter.descending === 'true' ? true : false,
    });
    filter.search !== '' && Object.assign(params, { findname: filter.search });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.area.length >= 1 && Object.assign(params, { area: filter.area.map((item) => item?._id) });
    filter.age !== '' && Object.assign(params, { minage: filter.rangeAge[0], maxage: filter.rangeAge[1] });
    filter.status.length >= 1 &&
      Object.assign(params, {
        status: filter.status.map((item) => {
          if (item === 'View') {
            return 'view';
          } else if (item === 'Klik Aksi') {
            return 'click';
          }
        }),
      });
    filter.priority.length >= 1 &&
      Object.assign(params, {
        filterpriority: filter.priority.map((item) => {
          if (item === 'Tertinggi') {
            return 'HIGHT';
          } else if (item === 'Menengah') {
            return 'MEDIUM';
          } else if (item === 'Rendah') {
            return 'LOW';
          } else if (item === 'Terendah') {
            return 'LOWEST';
          }
        }),
      });
    filter.gender.length >= 1 &&
      Object.assign(params, {
        gender: filter.gender.map((item) => {
          if (item === 'Laki-laki') {
            return 'MALE';
          } else if (item === 'Perempuan') {
            return 'FEMALE';
          } else if (item === 'Lainnya') {
            return 'OTHER';
          }
        }),
      });

    return params;
  };

  const { data: listViewers, isFetching: loadingViewers } = useGetViewerAdsQuery(getParams());
  const {
    data: listExport,
    isFetching: loadingExport,
    isError,
  } = useGetViewerAdsQuery({ ...getParams(), page: 0, limit: 1000000 });

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
        case 'search':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Penonton (${value})` }]
              : [...prevVal, { parent: kind, value: `Penonton (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'age':
          return prevVal.find((item) => item.parent === kind)
            ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `rentang umur (${value})` }]
            : [...prevVal, { parent: kind, value: `rentang umur (${value})` }];
        case 'clearAge':
          return prevVal.filter((item) => item.parent !== 'age');
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
        case 'area':
          return prevVal.find((item) => item.value === JSON.parse(value)?.name)
            ? [...prevVal.filter((item) => item.value !== JSON.parse(value)?.name)]
            : [...prevVal, { parent: kind, value: JSON.parse(value)?.name }];
        default:
          return prevVal.find((item) => item.value === value)
            ? [...prevVal.filter((item) => item.value !== value)]
            : [...prevVal, { parent: kind, value: value }];
      }
    });
    setFilter((prevVal) => {
      if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'search') {
        return { ...prevVal, search: value, page: 0 };
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
      } else if (kind === 'area') {
        return {
          ...prevVal,
          area: filter.area.find((item) => item?.name === JSON.parse(value)?.name)
            ? filter.area.filter((item) => item?.name !== JSON.parse(value)?.name)
            : [...filter.area, JSON.parse(value)],
          page: 0,
        };
      } else if (kind === 'age') {
        if (value === '< 14') {
          return {
            ...prevVal,
            age: value,
            rangeAge: [0, 14],
            page: 0,
          };
        } else if (value === '15 - 28') {
          return {
            ...prevVal,
            age: value,
            rangeAge: [15, 28],
            page: 0,
          };
        } else if (value === '29 - 43') {
          return {
            ...prevVal,
            age: value,
            rangeAge: [29, 43],
            page: 0,
          };
        } else {
          return {
            ...prevVal,
            age: value,
            rangeAge: [44, 120],
            page: 0,
          };
        }
      } else if (kind === 'clearAge') {
        return { ...prevVal, age: '', rangeAge: [], page: 0 };
      } else if (kind === 'priority') {
        return {
          ...prevVal,
          priority: filter.priority.find((item) => item === value)
            ? filter.priority.filter((item) => item !== value)
            : [...filter.priority, value],
          page: 0,
        };
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
          page: 0,
        };
      } else if (kind === 'gender') {
        return {
          ...prevVal,
          gender: filter.gender.find((item) => item === value)
            ? filter.gender.filter((item) => item !== value)
            : [...filter.gender, value],
          page: 0,
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  const generatePDF = () => {
    const exportPDF = new jsPDF('p', 'px', 'a4');
    exportPDF.html(renderToString(<DocumentPDF data={listExport?.data} />), {
      callback: function (exportPDF) {
        exportPDF.setProperties({ title: `List Penonton Iklan "${listExport?.data?.[0]?.name}"` });
        exportPDF.output('dataurlnewwindow');
        setExport(false);
      },
      x: 0,
      y: 0,
    });
  };

  const handleExport = () => {
    setExport(true);
    const toastId = toast.loading('Generate pdf...');
    setTimeout(() => {
      if (isError) {
        toast.error('Terjadi kesalahan saat generate pdf, silahkan coba lagi.', { id: toastId, duration: 2000 });
        setExport(false);
      } else {
        toast.success('Berhasil generate pdf', { id: toastId });
        generatePDF();
      }
    }, 2000);
  };

  return (
    <>
      <Stack position="absolute" top="9px" right="12px">
        <LoadingButton
          loading={loadingExport}
          color="secondary"
          variant="outlined"
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          onClick={handleExport}
          disabled={listViewers?.data?.length < 1 || isExport}>
          <Typography style={{ fontFamily: 'Lato', fontWeight: 'bold', textTransform: 'capitalize' }}>Unduh</Typography>
          <GetApp style={{ fontSize: 18 }} />
        </LoadingButton>
      </Stack>

      <Stack direction={'row'} spacing={3}>
        <SearchSection filter={filter} handleChange={handleSearchChange} />
        <TableSection
          filterList={filterList}
          order={filter.descending}
          loading={loadingViewers}
          listViewers={listViewers}
          handlePageChange={handlePageChange}
          handleOrder={onOrderChange}
          handleDeleteFilter={handleSearchChange}
        />
      </Stack>
    </>
  );
};

export default TableListPenonton;
