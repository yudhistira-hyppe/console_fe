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
import BreadCrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import Head from 'next/head';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';
import { useGetVouchersQuery, useUpdateVoucherMutation } from 'api/console/monetize/voucher';
import moment from 'moment';
import { Pagination } from '@mui/material';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Monetisasi', link: '/console/monetize' },
  { label: 'Voucher', isActive: true },
];

const KelolaVoucherComponent = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [updateVoucher] = useUpdateVoucherMutation();
  const [params, setParams] = React.useState({ page: 0, limit: 5 });
  const router = useRouter();
  const { data: listVouchers, refetch } = useGetVouchersQuery(params);

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
    setTimeout(() => refetch(), 500);
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
    refetch();
  };

  return (
    <>
      <Head>
        <title key="title">HYYPE MONETIZE</title>
      </Head>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <Stack
        direction={'row'}
        mt={1}
        mb={3}
        onClick={() => router.push('/monetize')}
        style={{ width: 'fit-content', cursor: 'pointer' }}>
        <Stack direction={'column'} justifyContent={'center'}>
          <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }} />
        </Stack>
        <Typography variant="h1" style={{ color: 'black' }}>
          Kembali
        </Typography>
      </Stack>

      <PageContainer>
        <Card>
          <CardHeader
            title={
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" justifyContent="center">
                  <Typography fontWeight="bold">Daftar Voucher</Typography>
                </Stack>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/console/monetize/voucher/create')}>
                    Buat Voucher
                  </Button>
                </div>
              </Stack>
            }
          />
          <CardContent style={{ padding: '0px' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="basic-table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nama Voucher</TableCell>
                    <TableCell align="left">Waktu Pembuatan</TableCell>
                    <TableCell align="left">Jumlah Kredit</TableCell>
                    <TableCell align="left">Jumlah Stok</TableCell>
                    <TableCell align="left">Telah Dibeli</TableCell>
                    <TableCell align="left">Harga Voucher</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listVouchers?.data?.map((item, key) => (
                    <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                          {item?.nameAds}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                          {moment(item?.createdAt).format('lll')}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1">{item?.creditValue} Kredit</Typography>
                        {item?.creditPromo && (
                          <Typography variant="body1" style={{ fontSize: '12px' }}>
                            + Bonus {item?.creditPromo} Kredit
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                          {item?.qty} Voucher
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                          {item?.totalUsed} Voucher
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                          Rp {item?.amount}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Switch onClick={() => onChangeStatusHandler(item)} checked={item?.isActive} />
                      </TableCell>
                      <TableCell align="left">
                        <EditIcon
                          htmlColor="#DADADA"
                          style={{ cursor: 'pointer' }}
                          onClick={() => router.push(`/monetize/voucher/${item?._id}`)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        {listVouchers && (
          <Stack alignItems={'center'} mt={2}>
            <Pagination count={Math.round(listVouchers?.totalpage)} onChange={handlePageChange} size={'small'} />
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
