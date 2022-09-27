import React from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@material-ui/core';
import { Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import moment from 'moment';
import ModalDetailTransaction from '../Modal/ModalDetailTransaction';

const TableSection = ({ listVouchers, order, handleOrder, handlePageChange }) => {
  const [isDetail, setDetail] = React.useState(false);
  const [selectedID, setSelectedID] = React.useState({});

  return (
    <>
      <ModalDetailTransaction id={selectedID} showModal={isDetail} onCancel={() => setDetail(!isDetail)} />
      <Stack flex={1}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={5}>
          <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
            <Typography>
              Menampilkan {listVouchers?.total} hasil ({listVouchers?.page + 1} - {listVouchers?.total} dari{' '}
              {listVouchers?.totalallrow})
            </Typography>
          </Box>
          <Stack direction={'row'} spacing={2} style={{ flex: 1 }} justifyContent={'flex-end'}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
              <Typography>Urutkan berdasarkan</Typography>
            </Box>
            <FormControl sx={{ m: 1, minWidth: '30%' }} size="small">
              <Select
                onChange={handleOrder}
                value={order}
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ backgroundColor: '#FFFFFF' }}>
                <MenuItem value="all">Semua</MenuItem>
                <MenuItem value="desc">Terbaru</MenuItem>
                <MenuItem value="asc">Terlama</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="basic-table">
            <TableHead>
              <TableRow>
                <TableCell>Waktu Transaksi</TableCell>
                <TableCell align="left">Invoice Transaksi</TableCell>
                <TableCell align="left">Harga</TableCell>
                <TableCell align="left">Pembeli</TableCell>
                <TableCell align="left">Status Pembayaran</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listVouchers ? (
                listVouchers.data?.map((item, key) => (
                  <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{ cursor: 'pointer' }}
                    hover
                    onClick={() => {
                      setSelectedID(item._id);
                      setDetail(!isDetail);
                    }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {moment(item?.timestamp).format('lll')}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.noinvoice}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        Rp {item?.amount}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.fullName}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {item?.status === 'WAITING_PAYMENT' && (
                        <Chip label="Menunggu" style={{ backgroundColor: 'rgba(255, 140, 0, 0.15)', color: '#FF8C00D9' }} />
                      )}
                      {item?.status === 'Success' && (
                        <Chip label="Lunas" style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9' }} />
                      )}
                      {item?.status === 'Cancel' && (
                        <Chip label="Gagal" style={{ backgroundColor: 'rgba(103, 103, 103, 0.1)', color: '#676767D9' }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Tidak ada data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {listVouchers && (
          <Stack alignItems={'center'} mt={2}>
            <Pagination count={listVouchers?.totalPage} size={'small'} onChange={handlePageChange} />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default TableSection;
