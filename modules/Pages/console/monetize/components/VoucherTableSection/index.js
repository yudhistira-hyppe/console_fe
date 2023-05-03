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
import { CircularProgress, Divider, IconButton, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import moment from 'moment';
import ModalDetailTransaction from '../Modal/ModalDetailTransaction';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';

const TableSection = ({ filterList, handleDeleteFilter, listVouchers, filter, handleOrder, handlePageChange, loading }) => {
  // const [isDetail, setDetail] = React.useState(false);
  // const [selectedID, setSelectedID] = React.useState({});

  return (
    <>
      {/* <ModalDetailTransaction id={selectedID} showModal={isDetail} onCancel={() => setDetail(!isDetail)} /> */}
      <Stack flex={1} width="100%" maxWidth={956}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          style={{ gap: 12 }}>
          <Stack direction="row" gap={2} alignItems="center" width={600}>
            {filterList?.length >= 1 ? (
              <ScrollBar style={{ width: 550, height: '100%' }}>
                <Stack direction="row" gap="10px">
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
              </ScrollBar>
            ) : (
              <Typography>Belum ada filter yang diterapkan</Typography>
            )}
            {filterList?.length >= 1 && (
              <IconButton onClick={() => handleDeleteFilter('clearAll', '')}>
                <Delete />
              </IconButton>
            )}
          </Stack>

          <Divider orientation="vertical" flexItem />

          <Stack direction={'row'} spacing={2} style={{ flex: 1 }} justifyContent={'flex-end'}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
              <Typography>Urutkan berdasarkan</Typography>
            </Box>
            <FormControl sx={{ m: 1, minWidth: '30%' }} size="small">
              <Select
                value={filter.descending}
                onChange={handleOrder}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ backgroundColor: 'white' }}>
                <MenuItem value={'true'}>Terbaru</MenuItem>
                <MenuItem value={'false'}>Terlama</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <TableContainer component={Paper}>
          <ScrollBar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Waktu Transaksi</TableCell>
                  <TableCell align="left">Nama Voucher</TableCell>
                  <TableCell align="left">Jumlah Kredit</TableCell>
                  <TableCell align="left">Harga</TableCell>
                  <TableCell align="left">Masa Berlaku</TableCell>
                  <TableCell align="left">Kadaluarsa</TableCell>
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
                ) : listVouchers?.data?.length >= 1 ? (
                  listVouchers?.data?.map((item, key) =>
                    item?.vcdata?.map((vc, key) => (
                      <TableRow key={key}>
                        {key === 0 && (
                          <TableCell rowSpan={item?.vcdata?.length}>
                            <Typography variant="body1" style={{ fontSize: '12px', width: 140 }}>
                              {moment(item?.timestamp).utc().format('DD/MM/YY - HH:mm')} WIB
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                            {vc?.nameAds || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px', width: 140 }}>
                            {numberWithCommas(vc?.creditValue || 0)} Kredit
                          </Typography>
                          {vc?.creditPromo > 0 && (
                            <Typography variant="body2" style={{ fontSize: '11px', color: 'rgba(0, 0, 0, 0.6)' }}>
                              + Bonus {numberWithCommas(vc?.creditPromo || 0)} Kredit
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px', width: 160 }}>
                            Rp {numberWithCommas(vc?.amount || 0)}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px', width: 90 }}>
                            {vc?.expiredDay || 0} Hari
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px', width: 140 }}>
                            {moment(vc?.expiredAt).utc().format('DD/MM/YYYY-HH:mm')} WIB
                          </Typography>
                        </TableCell>
                        {key === 0 && (
                          <TableCell align="left" rowSpan={item?.vcdata?.length}>
                            <Stack direction="row" width={160}>
                              {item?.status === 'WAITING_PAYMENT' && (
                                <Chip
                                  label="Menunggu Pembayaran"
                                  style={{ backgroundColor: '#0356AF1A', color: '#0356AF' }}
                                />
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
                            </Stack>
                          </TableCell>
                        )}
                      </TableRow>
                    )),
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Voucher tidak ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollBar>
        </TableContainer>
        {listVouchers?.data?.length >= 1 && !loading && (
          <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
            <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
              <NavigateBefore />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handlePageChange(filter.page + 1)}
              disabled={listVouchers?.data?.length < 10}>
              <NavigateNext />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default TableSection;
