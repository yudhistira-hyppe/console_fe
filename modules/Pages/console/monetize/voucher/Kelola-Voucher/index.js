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

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Monetisasi', link: '/console/monetize' },
  { label: 'Voucher', isActive: true },
];

const KelolaVoucherComponent = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);
  const [status, setStatus] = React.useState(false);
  const router = useRouter();

  const onChangeStatusHandler = (e) => {
    if (e.target.checked) {
      setShowModal(true);
      setModalType('on');
    } else {
      setShowModal(true);
      setModalType('off');
    }
  };

  const onConfirmModalHandler = () => {
    setStatus((prev) => !prev);
    onCancelModalHandler();
  };

  const onCancelModalHandler = () => {
    setShowModal(false);
    setModalType(null);
  };

  const onBackHandler = (e) => {
    e.preventDefault();
    router.push('/console/monetize');
  };

  return (
    <>
      <Head>
        <title key="title">HYYPE MONETIZE</title>
      </Head>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <Link href="/" onClick={onBackHandler} style={{ cursore: 'pointer', textDecorationLine: 'none' }}>
        <Stack direction={'row'} mt={1} mb={3}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }} />
          </Stack>
          <Stack>
            <Typography variant="h1" style={{ color: 'black' }}>
              Kembali
            </Typography>
          </Stack>
        </Stack>
      </Link>

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
                  <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        VOUCHER HYYPE ASIX
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        22/07/22-13:20 WIB
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1">1.000 Kredit</Typography>
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        + Bonus 100 Kredit
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        1.000 Voucher
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        200 Voucher
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        Rp 1.500.000
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Switch onClick={onChangeStatusHandler} checked={status} />
                    </TableCell>
                    <TableCell align="left">
                      <EditIcon
                        htmlColor="#DADADA"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push('/console/monetize/voucher/1')}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
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
