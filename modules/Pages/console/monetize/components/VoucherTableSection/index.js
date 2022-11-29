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
import ModalDetailTransaction from '../Modal/ModalDetailTransaction';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const TableSection = ({ filterList, handleDeleteFilter, listVouchers, order, handleOrder, handlePageChange, loading }) => {
  // const [isDetail, setDetail] = React.useState(false);
  // const [selectedID, setSelectedID] = React.useState({});

  const dataList =
    listVouchers &&
    [...listVouchers?.data].sort(function (a, b) {
      return order === 'desc'
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp);
    });

  return (
    <>
      {/* <ModalDetailTransaction id={selectedID} showModal={isDetail} onCancel={() => setDetail(!isDetail)} /> */}
      <Stack flex={1}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={5}>
          <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
            {loading ? (
              <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
            ) : (
              <Typography style={{ fontFamily: 'Normal' }}>
                Menampilkan {listVouchers?.total} hasil (
                {listVouchers?.totalsearch >= 1 ? listVouchers?.page * 10 + 1 : listVouchers?.page * 10} -{' '}
                {listVouchers?.total + listVouchers?.page * 10} dari {listVouchers?.totalsearch})
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
                } else {
                  handleDeleteFilter(item.parent, item.value);
                }
              }}
            />
          ))}
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="basic-table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 100 }}>Waktu Transaksi</TableCell>
                <TableCell align="left">Nama Voucher</TableCell>
                <TableCell align="left">Jumlah Kredit</TableCell>
                <TableCell align="left">Harga</TableCell>
                <TableCell align="left">Masa Berlaku</TableCell>
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
              ) : dataList?.length >= 1 ? (
                dataList?.map((item, key) =>
                  item?.vcdata?.map((vc, key) => (
                    <TableRow key={key}>
                      {key === 0 && (
                        <TableCell rowSpan={item?.vcdata?.length} style={{ width: 100 }}>
                          <Typography variant="body1" style={{ fontSize: '12px' }}>
                            {moment(item?.timestamp).utc().format('DD/MM/YY-HH:mm')} WIB
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                          {vc?.nameAds || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '14px' }}>
                          {numberWithCommas(vc?.creditValue)} Kredit
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' }}>
                          + Bonus {numberWithCommas(vc?.creditPromo)} Kredit
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                          Rp {numberWithCommas(vc?.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '14px' }}>
                          {vc?.expiredDay || 0} Hari
                        </Typography>
                      </TableCell>
                      {key === 0 && (
                        <TableCell align="left" rowSpan={item?.vcdata?.length}>
                          {item?.status === 'WAITING_PAYMENT' && (
                            <Chip label="Menunggu Pembayaran" style={{ backgroundColor: '#0356AF1A', color: '#0356AF' }} />
                          )}
                          {item?.status === 'Success' && (
                            <Chip
                              label="Berhasil"
                              style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9' }}
                            />
                          )}
                          {item?.status === 'Cancel' && (
                            <Chip label="Gagal" style={{ backgroundColor: '#E61D371A', color: '#E61D37' }} />
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )),
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Voucher tidak ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {listVouchers?.totalsearch >= 1 && !loading && (
          <Stack alignItems={'center'} mt={2}>
            <Pagination
              count={Number(listVouchers?.totalpage)}
              page={listVouchers?.page + 1}
              size={'small'}
              onChange={handlePageChange}
            />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default TableSection;
