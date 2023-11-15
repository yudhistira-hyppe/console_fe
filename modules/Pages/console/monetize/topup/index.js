import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React, { useEffect, useState } from 'react';
import TableSection from './TableSection';
import SearchSection from './SearchSection';
import { Button, Stack, Tooltip } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useGetListTopupQuery } from 'api/console/monetize/dashboard';
import ModalTopup from './Modal/modal-topup';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@material-ui/core';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { useAuth } from 'authentication';

const MonetizeTopUpComponent = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    descending: 'date-true',
    labelTanggal: '',
    createdAt: [null, null],
    search: '',
    createdBy: '',
    status: [],
  });
  const [filterList, setFilterList] = useState([]);
  const [openModal, setOpenModal] = useState({
    open: false,
    status: '',
  });
  const [isExport, setExport] = useState(false);
  const { authUser } = useAuth();

  const getParams = () => {
    let params = {};
    Object.assign(params, {
      page: filter.page,
      limit: filter.limit,
      sorting: {
        createdAt: filter.descending === 'date-true' ? -1 : filter.descending === 'date-false' ? 1 : undefined,
        email: filter.descending === 'email-true' ? -1 : filter.descending === 'email-false' ? 1 : undefined,
      },
    });
    filter.createdAt[0] && Object.assign(params, { start_date: filter.createdAt[0] });
    filter.createdAt[1] && Object.assign(params, { end_date: filter.createdAt[1] });
    filter.search !== '' && Object.assign(params, { search: filter.search });
    filter.createdBy !== '' && Object.assign(params, { createBy: filter.createdBy });
    filter.status?.length >= 1 &&
      Object.assign(params, {
        status: filter.status?.map((item) => {
          if (item === 'Baru') {
            return 'NEW';
          } else if (item === 'Proses') {
            return 'PROCESS';
          } else if (item === 'Berhasil') {
            return 'SUCCESS';
          } else if (item === 'Ditolak') {
            return 'DELETE';
          } else if (item === 'Gagal Sistem') {
            return 'FAILED';
          }
        }),
      });

    return params;
  };

  const { data: listTopup, isFetching: loadingTopup } = useGetListTopupQuery(getParams());

  useEffect(() => {
    if (filter.page >= 1 && listTopup?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingTopup]);

  const { data: listExport, isFetching: loadingExport } = useGetListTopupQuery({ ...getParams(), limit: 1000000, page: 0 });

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
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: value }]
              : [...prevVal, { parent: kind, value: value }]
            : [...prevVal.filter((item) => item.parent !== kind)];
        case 'createdBy':
          return value.length >= 1
            ? prevVal.find((item) => item.parent === kind)
              ? [...prevVal.filter((item) => item.parent !== kind), { parent: kind, value: `Dibuat Oleh (${value})` }]
              : [...prevVal, { parent: kind, value: `Dibuat Oleh (${value})` }]
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
      } else if (kind === 'createdBy') {
        return { ...prevVal, createdBy: value, page: 0 };
      } else if (kind === 'createdAt') {
        return { ...prevVal, createdAt: value, page: 0 };
      } else if (kind === 'labelTanggal') {
        return { ...prevVal, labelTanggal: value, page: 0 };
      } else if (kind === 'status') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
          page: 0,
        };
      } else if (kind === 'clearAll') {
        return {
          page: 0,
          limit: 10,
          descending: 'date-true',
          labelTanggal: '',
          createdAt: [null, null],
          search: '',
          createdBy: '',
          status: [],
        };
      } else {
        return { ...prevVal };
      }
    });
  };

  return (
    <>
      <ModalTopup
        open={openModal.open}
        status={openModal.status}
        handleClose={() => setOpenModal({ open: false, status: '' })}
      />

      <PageContainer>
        <Stack direction="row" spacing={3}>
          <SearchSection filter={filter} handleChange={handleSearchChange} />

          <Stack direction="column" gap={3}>
            <Stack direction="row" gap={2} justifyContent="flex-end" alignItems="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => window.open(process.env.NEXT_PUBLIC_API_BASE_URL + '/topups/file/download/')}
                disabled={authUser?.user?.group !== 'Super Admin' && authUser?.user?.group !== 'Head Of Strategy'}>
                Template data bulk
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenModal({ open: true, status: 'upload' })}
                disabled={authUser?.user?.group !== 'Super Admin' && authUser?.user?.group !== 'Head Of Strategy'}>
                Upload data bulk
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenModal({ open: true, status: 'create' })}
                disabled={authUser?.user?.group !== 'Super Admin' && authUser?.user?.group !== 'Head Of Strategy'}>
                Tambah baru
              </Button>
              {loadingExport || listExport?.data?.length < 1 ? (
                <Tooltip title="Loading fetching data...">
                  <span>
                    <LoadingButton color="secondary" variant="contained" disabled>
                      Download CSV
                    </LoadingButton>
                  </span>
                </Tooltip>
              ) : (
                <CSVLink
                  data={listExport?.data?.map((item) => {
                    return {
                      'Tanggal Buat': `${moment(item?.createdAt).utc().format('DD/MM/YY - HH:mm')} WIB`,
                      'Dibuat Oleh': item?.createByUsername || '-',
                      Email: item?.email || '-',
                      Username: item?.username || '-',
                      'Jumlah Topup': `Rp ${numberWithCommas(item?.topup || 0)}`,
                      'Pajak PPH': `Rp ${numberWithCommas(item?.pph || 0)}`,
                      Total: `Rp ${numberWithCommas(item?.total || 0)}`,
                      'Persetujuan Strategy':
                        item?.status === 'DELETE' || item?.status === 'FAILED'
                          ? 'Tolak'
                          : item?.approveByStrategy
                          ? 'Disetujui'
                          : 'Menunggu Persetujuan',
                      'Persetujuan Finance':
                        item?.status === 'DELETE' || item?.status === 'FAILED'
                          ? 'Tolak'
                          : item?.approveByFinance
                          ? 'Disetujui'
                          : 'Menunggu Persetujuan',
                      Status:
                        item?.status === 'NEW'
                          ? 'Baru'
                          : item?.status === 'PROCESS'
                          ? 'Proses'
                          : item?.status === 'SUCCESS'
                          ? 'Disetujui'
                          : item?.status === 'DELETE'
                          ? 'Ditolak'
                          : item?.status === 'FAILED' && 'Gagal Sistem',
                    };
                  })}
                  filename="List Top Up.csv">
                  <LoadingButton
                    loading={loadingExport || isExport}
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      setExport(true);
                      const toastId = toast.loading('Generate csv...');
                      setTimeout(() => {
                        toast.success('Berhasil generate csv', { id: toastId });
                        setExport(false);
                      }, 2000);
                    }}
                    disabled={isExport}>
                    Download CSV
                  </LoadingButton>
                </CSVLink>
              )}
            </Stack>

            <TableSection
              filterList={filterList}
              listTransaction={listTopup}
              filter={filter}
              loading={loadingTopup}
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

export default MonetizeTopUpComponent;
