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
import { CircularProgress, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import moment from 'moment';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const TableSection = ({
  order,
  handleOrder,
  handlePageChange,
  loading,
  listTransaction,
  filterList,
  handleDeleteFilter,
  kind,
}) => {
  return (
    <Stack flex={1}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={5}>
        <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
          {loading ? (
            <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
          ) : (
            <Typography style={{ fontFamily: 'Normal' }}>
              Menampilkan {listTransaction?.total} hasil (
              {listTransaction?.totalsearch >= 1 ? listTransaction?.page * 10 + 1 : listTransaction?.page * 10} -{' '}
              {listTransaction?.total + listTransaction?.page * 10} dari {listTransaction?.totalsearch})
            </Typography>
          )}
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
              <MenuItem value="true">Terbaru</MenuItem>
              <MenuItem value="false">Terlama</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {filterList?.length >= 1 && (
        <Stack direction="row" gap="10px" mb={2}>
          {filterList?.map((item, key) => (
            <Chip
              key={key}
              label={item.value}
              onDelete={() => {
                if (item.parent === 'search') {
                  handleDeleteFilter(item.parent, '');
                } else if (item.parent === 'createdAt') {
                  handleDeleteFilter(item.parent, [null, null]);
                } else if (item.parent === 'period') {
                  handleDeleteFilter('clearRange', []);
                } else if (item.parent === 'payment_status') {
                  handleDeleteFilter(item.parent, JSON.stringify({ name: item.value }));
                } else {
                  handleDeleteFilter(item.parent, item.value);
                }
              }}
            />
          ))}
        </Stack>
      )}

      <TableContainer component={Paper}>
        <Typography
          variant="h3"
          style={{ fontFamily: 'Lato', padding: '20px 16px', boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.161741)' }}>
          {kind === 'sell' ? 'Penjualan' : 'Pembelian'}
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="basic-table">
          <TableHead>
            <TableRow>
              <TableCell>Waktu Transaksi</TableCell>
              <TableCell align="left">Invoice Transaksi</TableCell>
              <TableCell align="left" style={{ maxWidth: 200 }}>
                Konten
              </TableCell>
              <TableCell align="left">Harga</TableCell>
              <TableCell align="left">{kind === 'sell' ? 'Penjual' : 'Pembeli'}</TableCell>
              <TableCell align="left">Status Pembayaran</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableCell colSpan={8}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <CircularProgress color="secondary" />
                  <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                </Stack>
              </TableCell>
            ) : listTransaction?.data?.length >= 1 ? (
              listTransaction?.data?.map((item, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
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
                  <TableCell align="left" style={{ maxWidth: 200 }}>
                    <Typography
                      variant="body1"
                      style={{
                        fontSize: '12px',
                        width: '100%',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                      title={item?.descriptionContent}>
                      {item?.descriptionContent}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      Rp {numberWithCommas(item?.totalamount || 0)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {'-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {item?.status === 'WAITING_PAYMENT' && (
                      <Chip label="Menunggu Pembayaran" style={{ backgroundColor: '#0356AF1A', color: '#0356AF' }} />
                    )}
                    {item?.status === 'Success' && (
                      <Chip label="Berhasil" style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9' }} />
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
      {listTransaction?.totalsearch >= 1 && !loading && (
        <Stack alignItems={'center'} mt={2}>
          <Pagination
            count={Number(listTransaction?.totalpage)}
            page={listTransaction?.page + 1}
            size={'small'}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
