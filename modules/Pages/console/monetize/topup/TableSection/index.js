import React, { useState } from 'react';
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
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';

const TableSection = ({
  filter,
  handleOrder,
  handlePageChange,
  loading,
  listTransaction,
  filterList,
  handleDeleteFilter,
}) => {
  return (
    <Stack flex={1} width="100%" maxWidth={956}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mb={5} style={{ gap: 12 }}>
        <Stack direction="row" gap={2} alignItems="center" width={600}>
          {filterList?.length >= 1 ? (
            <ScrollBar style={{ width: 550, height: '100%' }}>
              <Stack direction="row" gap="10px">
                {filterList?.map((item, key) => (
                  <Chip
                    key={key}
                    label={item.value}
                    onDelete={() => {
                      if (item.parent === 'createdAt') {
                        handleDeleteFilter(item.parent, [null, null]);
                      } else if (item.parent === 'penjual' || item.parent === 'pembeli') {
                        handleDeleteFilter(item.parent, '');
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
                <TableCell>Tanggal Buat</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Jumlah Topup</TableCell>
                <TableCell align="left">Pajak PPH</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Dibuat Oleh</TableCell>
                <TableCell align="left">Disetujui Strategy</TableCell>
                <TableCell align="left">Disetujui Finance</TableCell>
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
                    <TableCell>
                      <Typography variant="body1" style={{ fontSize: '12px', width: 140 }}>
                        {moment(item?.timestamp).utc().format('DD/MM/YY - HH:mm')} WIB
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: '12px',
                          width: 150,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                        title={'email user'}>
                        {'email user'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: '12px',
                          width: 150,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                        title={'username user'}>
                        {'username user' || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        Rp {numberWithCommas(100000000)}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        Rp {numberWithCommas(100000000)}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        Rp {numberWithCommas(100000000)}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 150 }}>
                        Pembuat
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack width={120}>
                        {item?.status === 'WAITING_PAYMENT' && (
                          <Chip
                            label="Menunggu Pembayaran"
                            style={{ backgroundColor: '#0356AF1A', color: '#0356AF', width: 'fit-content' }}
                          />
                        )}
                        {item?.status === 'Success' && (
                          <Chip
                            label="Berhasil"
                            style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9', width: 'fit-content' }}
                          />
                        )}
                        {item?.status === 'Cancel' && (
                          <Chip
                            label="Gagal"
                            style={{ backgroundColor: 'rgba(103, 103, 103, 0.1)', color: '#676767D9', width: 'fit-content' }}
                          />
                        )}
                        <Chip
                          label="Disetujui"
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            fontFamily: 'Lato',
                            color: '#71A500D9',
                            backgroundColor: '#71A5001A',
                            width: 'fit-content',
                          }}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack width={120}>
                        {item?.status === 'WAITING_PAYMENT' && (
                          <Chip
                            label="Menunggu Pembayaran"
                            style={{ backgroundColor: '#0356AF1A', color: '#0356AF', width: 'fit-content' }}
                          />
                        )}
                        {item?.status === 'Success' && (
                          <Chip
                            label="Berhasil"
                            style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9', width: 'fit-content' }}
                          />
                        )}
                        {item?.status === 'Cancel' && (
                          <Chip
                            label="Gagal"
                            style={{ backgroundColor: 'rgba(103, 103, 103, 0.1)', color: '#676767D9', width: 'fit-content' }}
                          />
                        )}
                        <Chip
                          label="Disetujui"
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            fontFamily: 'Lato',
                            color: '#71A500D9',
                            backgroundColor: '#71A5001A',
                            width: 'fit-content',
                          }}
                        />
                      </Stack>
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
        </ScrollBar>
      </TableContainer>
      {listTransaction?.data?.length >= 1 && !loading && (
        <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
          <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handlePageChange(filter.page + 1)}
            disabled={listTransaction?.data?.length < 10}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
