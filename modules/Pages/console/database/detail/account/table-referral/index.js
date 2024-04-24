import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React, { useEffect, useState } from 'react';
import { Card, Stack, Tooltip } from '@mui/material';
import { toast } from 'react-hot-toast';
import TableSection from './TableSection';
import { useGetUserReferralListQuery } from 'api/console/database';
import dayjs from 'dayjs';
import SearchSection from './SearchSection';
import { Typography } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { CSVLink } from 'react-csv';

const DetailDatabaseAccountReferralList = ({ email }) => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'true',
    search: '',
    labelTanggal: '',
    createdAt: [null, null],
    type: [],
  });
  const [filterList, setFilterList] = useState([]);
  const [isExport, setExport] = useState(false);

  const getParams = () => {
    let params = { page: filter.page, limit: filter.limit, descending: filter.descending === 'true' ? true : false, email };

    filter.search !== '' && Object.assign(params, { username: filter.search });
    filter.createdAt[0] && Object.assign(params, { from: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { to: filter.createdAt[1] });
    filter.type.length >= 1 &&
      Object.assign(params, {
        jenis: filter.type.map((item) => (item === 'Tamu' ? 'GUEST' : item === 'Terdaftar' ? 'BASIC' : 'PREMIUM')),
      });

    return params;
  };

  const { data: listReferral, isFetching: loadingReferral } = useGetUserReferralListQuery(getParams());
  const { data: listExport, isFetching: loadingExport } = useGetUserReferralListQuery({ ...getParams(), limit: undefined });

  useEffect(() => {
    if (filter.page >= 1 && listReferral?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingReferral]);

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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Pencarian (${value})` }]
              : [...prevVal, { parent: kind, value: `Pencarian (${value})` }]
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
      } else if (kind === 'type') {
        return {
          ...prevVal,
          type: filter.type.find((item) => item === value)
            ? filter.type.filter((item) => item !== value)
            : [...filter.type, value],
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
          type: [],
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  const handleExport = () => {
    setExport(true);
    const toastId = toast.loading('Generate pdf...');

    setTimeout(() => {
      toast.success('Berhasil generate pdf', { id: toastId });
      setExport(false);
    }, 2000);
  };

  return (
    <>
      <PageContainer>
        <Stack direction="row" spacing={3}>
          <Stack direction="column" gap={3}>
            <Card style={{ padding: '16px 24px' }}>
              <Stack direction="column" gap={1}>
                <Typography style={{ fontSize: 16, fontWeight: 'bold' }}>Total Referal Digunakan</Typography>
                <Typography style={{ fontSize: 24, fontWeight: 'bold' }}>{listReferral?.[0]?.total || 0}</Typography>
              </Stack>
            </Card>
            <SearchSection filter={filter} handleChange={handleSearchChange} />
          </Stack>

          <Stack direction="column" width="100%" gap={2}>
            <Stack direction="row" justifyContent="flex-end">
              {loadingExport ? (
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
                <CSVLink
                  data={
                    listExport?.[0]?.data?.map((item) => {
                      return {
                        'Waktu Penggunaan': dayjs(item?.createdAt).format('DD/MM/YY - HH:mm'),
                        Pengguna: item?.childFullName || '-',
                        Email: item?.children || '-',
                        Umur: item?.childAge || 0,
                        'Jenis Kelamin':
                          item?.childGender === 'FEMALE'
                            ? 'Perempuan'
                            : item?.childGender === 'MALE'
                            ? 'Laki-laki'
                            : 'Lainnya',
                        'Jenis Akun':
                          item?.jenis === 'GUEST' ? 'Tamu' : item?.jenis === 'BASIC' ? 'Terdaftar' : 'Terverifikasi',
                        Lokasi: item?.childState || '-',
                      };
                    }) || []
                  }
                  filename={`List Referral ${email}.csv`}
                  onClick={handleExport}>
                  <LoadingButton
                    loading={isExport}
                    color="secondary"
                    variant="contained"
                    disabled={listExport?.[0]?.data.length < 1}>
                    <Typography style={{ fontFamily: 'Lato', fontWeight: 'bold', textTransform: 'capitalize' }}>
                      Download CSV
                    </Typography>
                  </LoadingButton>
                </CSVLink>
              )}
            </Stack>

            <TableSection
              filterList={filterList}
              listReferral={listReferral?.[0]}
              filter={filter}
              loading={loadingReferral}
              handleOrder={onOrderChange}
              handlePageChange={handlePageChange}
              handleDeleteFilter={handleSearchChange}
            />
          </Stack>
        </Stack>
      </PageContainer>
    </>
  );
};

export default DetailDatabaseAccountReferralList;
