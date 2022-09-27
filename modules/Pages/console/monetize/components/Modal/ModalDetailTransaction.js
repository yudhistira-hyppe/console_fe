import {
  Box,
  Button,
  CardContent,
  Chip,
  CircularProgress,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useGetDetailTransactionVouchersQuery } from 'api/console/monetize/voucher';
import moment from 'moment';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 950,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

const ModalDetailTransaction = ({ id, showModal, onCancel }) => {
  const { data: transaction, isLoading } = showModal ? useGetDetailTransactionVouchersQuery({ id }) : {};

  return (
    <Modal open={showModal}>
      <Box sx={style}>
        {isLoading ? (
          <Stack my={3}>
            <center>
              <CircularProgress />
            </center>
          </Stack>
        ) : (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color="#666666" fontSize={18} fontWeight={700}>
                Detail Transaksi - {transaction?.data[0]?.noinvoice} {''}
              </Typography>
              {transaction?.data[0]?.status === 'WAITING_PAYMENT' && (
                <Chip label="Menunggu" style={{ backgroundColor: 'rgba(255, 140, 0, 0.15)', color: '#FF8C00D9' }} />
              )}
              {transaction?.data[0]?.status === 'Success' && (
                <Chip label="Lunas" style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9' }} />
              )}
              {transaction?.data[0]?.status === 'Cancel' && (
                <Chip label="Gagal" style={{ backgroundColor: 'rgba(103, 103, 103, 0.1)', color: '#676767D9' }} />
              )}
            </Stack>
            <Stack direction="column" mb={2}>
              <Typography color="#666666">Pembeli : {transaction?.data[0]?.fullName}</Typography>
            </Stack>
            <CardContent style={{ padding: '0px' }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="basic-table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Tanggal Beli</TableCell>
                      <TableCell align="left">Nama Voucher</TableCell>
                      <TableCell align="left">Jumlah Kredit</TableCell>
                      <TableCell align="left">Jumlah Beli</TableCell>
                      <TableCell align="left">Harga Voucher</TableCell>
                      <TableCell align="left">Masa Berlaku Voucher</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {transaction?.data[0]?.voucher_data?.map((item, key) => (
                      <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body1" style={{ fontSize: '12px' }}>
                            {moment(item?.createdAt).format('lll')}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px' }}>
                            {item?.nameAds}
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
                            {item?.totalUsed} Voucher
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px' }}>
                            Rp {item?.amount}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px' }}>
                            {moment(item?.expiredAt).format('lll')} ({item?.expiredDay} Hari)
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <Stack direction="row" justifyContent="right" spacing={5} mt={3}>
              <Button variant="contained" color="primary" onClick={onCancel}>
                Selesai
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ModalDetailTransaction;
