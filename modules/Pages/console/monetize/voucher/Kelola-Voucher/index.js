import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Stack } from '@mui/system';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { ModalChangeStatusConfirmation } from 'modules/Pages/console/monetize/components';
import Breadcrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import Head from 'next/head';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';
import { useGetVouchersQuery, useUpdateVoucherMutation } from 'api/console/monetize/voucher';
import moment from 'moment';
import { CircularProgress, Pagination } from '@mui/material';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const breadcrumbs = [
  { label: 'Monetisasi', link: '/monetize' },
  { label: 'Kelola Voucher', isActive: true },
];

const KelolaVoucherComponent = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [updateVoucher] = useUpdateVoucherMutation();
  const [params, setParams] = React.useState({ page: 0, limit: 10 });
  const router = useRouter();
  const { data: listVouchers, isFetching: loadingVoucher } = useGetVouchersQuery(params);
  const access = sessionStorage.getItem('access') ? JSON.parse(sessionStorage.getItem('access')) : [];

  const onChangeStatusHandler = (item) => {
    setShowModal(true);
    item?.isActive ? setModalType('off') : setModalType('on');
    setSelectedItem(item);
  };

  const onConfirmModalHandler = () => {
    const data = {
      isActive: !selectedItem.isActive,
    };

    updateVoucher({ id: selectedItem._id, data });
    onCancelModalHandler();
  };

  const onCancelModalHandler = () => {
    setShowModal(false);
    setModalType(null);
  };

  const handlePageChange = (e, value) => {
    setParams((prevVal) => {
      return { ...prevVal, page: value - 1 };
    });
  };

  return (
    <>
      <Head>
        <title key="title">HYYPE MONETIZE</title>
      </Head>

      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/monetize')}
          gap="5px"
          style={{ width: 'fit-content', cursor: 'pointer' }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
          </Stack>
          <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
            Kembali
          </Typography>
        </Stack>
      </Stack>

      <PageContainer>
        <Card>
          <CardHeader
            title={
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" justifyContent="center">
                  <Typography style={{ fontWeight: 'bold' }}>Daftar Voucher</Typography>
                </Stack>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/monetize/voucher/create')}
                    disabled={!access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces}>
                    Buat Voucher
                  </Button>
                </div>
              </Stack>
            }
            style={{ padding: 24 }}
          />
          <CardContent style={{ padding: '0px' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="basic-table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ paddingLeft: 24 }}>
                      Nama Voucher
                    </TableCell>
                    <TableCell align="left" style={{ maxWidth: 100 }}>
                      Waktu Pembuatan
                    </TableCell>
                    <TableCell align="left" style={{ maxWidth: 100 }}>
                      Waktu Kadaluarsa
                    </TableCell>
                    <TableCell align="left">Jumlah Kredit</TableCell>
                    <TableCell align="left">Jumlah Stok</TableCell>
                    <TableCell align="left">Telah Dibeli</TableCell>
                    <TableCell align="left">Harga Voucher</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loadingVoucher ? (
                    <TableCell colSpan={8}>
                      <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                        <CircularProgress color="secondary" />
                        <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                      </Stack>
                    </TableCell>
                  ) : (
                    listVouchers?.data?.map((item, key) => {
                      const now = moment();
                      const expired = moment(item.expiredAt);

                      return (
                        <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                          <TableCell component="th" scope="row" style={{ paddingLeft: 24 }}>
                            <Typography
                              variant="body1"
                              style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: expired.diff(now, 'day') >= 1 ? 'black' : 'red',
                              }}>
                              {item?.nameAds || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell align="left" style={{ maxWidth: 100 }}>
                            <Typography variant="body1" style={{ fontSize: '12px' }}>
                              {moment(item?.createdAt).utc().format('DD/MM/YYYY - HH:mm')} WIB
                            </Typography>
                          </TableCell>
                          <TableCell align="left" style={{ maxWidth: 100 }}>
                            <Typography
                              variant="body1"
                              style={{
                                fontSize: '12px',
                                fontWeight: expired.diff(now, 'day') >= 1 ? '' : 'bold',
                                color: expired.diff(now, 'day') >= 1 ? 'black' : 'red',
                              }}>
                              {moment(item?.expiredAt).utc().format('DD/MM/YYYY - HH:mm')} WIB
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '14px' }}>
                              {numberWithCommas(item?.creditValue || 0)} Kredit
                            </Typography>
                            {item?.creditPromo > 0 && (
                              <Typography variant="body1" style={{ fontSize: '12px' }}>
                                + Bonus {numberWithCommas(item?.creditPromo)} Kredit
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '14px' }}>
                              {item?.qty} Voucher
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '14px' }}>
                              {item?.totalUsed} Voucher
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '14px' }}>
                              Rp {numberWithCommas(item?.amount || 0)}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Switch
                              color="primary"
                              onClick={() => onChangeStatusHandler(item)}
                              checked={item?.isActive}
                              disabled={
                                !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                              }
                            />
                          </TableCell>
                          <TableCell align="left">
                            <EditIcon
                              htmlColor="#737373"
                              style={{ cursor: 'pointer' }}
                              onClick={() => router.push(`/monetize/voucher/${item?._id}`)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        {listVouchers?.totalsearch >= 1 && !loadingVoucher && (
          <Stack alignItems={'center'} mt={2}>
            <Pagination
              count={Math.round(listVouchers?.totalpage)}
              page={listVouchers?.page + 1}
              onChange={handlePageChange}
              size={'small'}
            />
          </Stack>
        )}
      </PageContainer>
      <ModalChangeStatusConfirmation
        showModal={showModal && modalType}
        modalType={modalType}
        onCancel={onCancelModalHandler}
        onConfirm={onConfirmModalHandler}
      />
    </>
  );
};

export default KelolaVoucherComponent;
