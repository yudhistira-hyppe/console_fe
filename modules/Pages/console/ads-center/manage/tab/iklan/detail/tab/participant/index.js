import React, { useEffect, useState } from 'react';
import { Stack, Tooltip } from '@mui/material';
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
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { CSVLink } from 'react-csv';

const TableRewardsParticipant = ({ idAds }) => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    age: '',
    area: [],
    labelTanggal: '',
    createdAt: [null, null],
    gender: [],
    similarity: [],
  });
  const [filterList, setFilterList] = useState([]);
  const [isExport, setExport] = useState(false);

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      sorting: filter.descending === 'true' ? true : false,
      adsId: idAds || '',
    });
    filter.search !== '' && Object.assign(params, { name: filter.search });
    filter.createdAt[0] && Object.assign(params, { startdate: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { enddate: filter.createdAt[1] });
    filter.area.length >= 1 && Object.assign(params, { areas: filter.area.map((item) => item?._id) });
    filter.age !== '' &&
      Object.assign(params, {
        age: [
          filter.age === '< 14'
            ? 'show_smaller_than_14'
            : filter.age === '14 - 28'
            ? 'show_14_smaller_than_28'
            : filter.age === '29 - 43'
            ? 'show_29_smaller_than_43'
            : filter.age === '> 44'
            ? 'show_greater_than_43'
            : 'other',
        ],
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
    filter.similarity.length >= 1 &&
      Object.assign(params, {
        similarity: filter.similarity.map((item) => {
          if (item === '< 25%') {
            return 'show_smaller_than_25';
          } else if (item === '25 - 50%') {
            return 'show_25_smaller_than_50';
          } else if (item === '50 - 75%') {
            return 'show_50_smaller_than_75';
          } else if (item === '75 - 100%') {
            return 'show_75_smaller_than_100';
          }
        }),
      });

    return params;
  };

  const { data: listViewers, isFetching: loadingViewers } = useGetViewerAdsQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listViewers?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingViewers]);

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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Penonton (${value})` }]
              : [...prevVal, { parent: kind, value: `Penonton (${value})` }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'age':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `rentang umur (${value})` }]
              : [...prevVal, { parent: kind, value: `rentang umur (${value})` }]
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
        case 'area':
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
        return { ...prevVal, age: value, page: 0 };
      } else if (kind === 'gender') {
        return {
          ...prevVal,
          gender: filter.gender.find((item) => item === value)
            ? filter.gender.filter((item) => item !== value)
            : [...filter.gender, value],
          page: 0,
        };
      } else if (kind === 'similarity') {
        return {
          ...prevVal,
          similarity: filter.similarity.find((item) => item === value)
            ? filter.similarity.filter((item) => item !== value)
            : [...filter.similarity, value],
          page: 0,
        };
      } else if (kind === 'clearAll') {
        return {
          page: 0,
          limit: 10,
          descending: 'true',
          search: '',
          age: '',
          area: [],
          labelTanggal: '',
          createdAt: [null, null],
          gender: [],
          similarity: [],
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
    <PageContainer>
      <Stack direction="row" position="relative">
        <Stack position="absolute" top="-70px" right="0px">
          <Stack direction="row" spacing={2}>
            {loadingExport || listExport?.data?.length < 1 ? (
              <Tooltip title="Loading fetching data...">
                <span>
                  <LoadingButton color="secondary" variant="contained" disabled>
                    <Typography style={{ fontFamily: 'Lato', fontWeight: 'bold', textTransform: 'capitalize' }}>
                      Download CSV
                    </Typography>
                  </LoadingButton>
                </span>
              </Tooltip>
            ) : (
              <CSVLink data={listExport?.data} filename="List Rewards Participant.csv" onClick={() => handleExport()}>
                <LoadingButton color="secondary" variant="contained">
                  <Typography style={{ fontFamily: 'Lato', fontWeight: 'bold', textTransform: 'capitalize' }}>
                    Download CSV
                  </Typography>
                </LoadingButton>
              </CSVLink>
            )}

            <LoadingButton
              loading={loadingExport}
              color="secondary"
              variant="contained"
              onClick={handleExport}
              disabled={listViewers?.data?.length < 1 || isExport}>
              <Typography style={{ fontFamily: 'Lato', fontWeight: 'bold', textTransform: 'capitalize' }}>
                Download PDF
              </Typography>
            </LoadingButton>
          </Stack>
        </Stack>

        <Stack direction={'row'} spacing={3} width="100%">
          <SearchSection filter={filter} handleChange={handleSearchChange} />
          <TableSection
            filter={filter}
            filterList={filterList}
            loading={loadingViewers}
            listViewers={listViewers}
            handlePageChange={handlePageChange}
            handleOrder={onOrderChange}
            handleDeleteFilter={handleSearchChange}
          />
        </Stack>
      </Stack>
    </PageContainer>
  );
};

export default TableRewardsParticipant;
