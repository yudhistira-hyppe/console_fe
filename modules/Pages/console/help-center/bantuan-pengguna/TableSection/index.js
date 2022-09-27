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
  Avatar,
  Chip,
} from '@material-ui/core';
import { Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';

const TableSection = ({ order, handleOrder, handlePageChange, listTickets }) => {
  return (
    <Stack flex={1}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={5}>
        <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
          <Typography>
            Menampilkan {listTickets?.totalrow} hasil ({listTickets?.page + 1}-{listTickets?.totalrow} dari{' '}
            {listTickets?.totalallrow})
          </Typography>
        </Box>
        <Stack direction={'row'} spacing={2} style={{ flex: 1 }} justifyContent={'flex-end'}>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
            <Typography>Urutkan berdasarkan</Typography>
          </Box>
          <FormControl sx={{ m: 1, minWidth: '30%' }} size="small">
            <Select
              value={order}
              onChange={handleOrder}
              inputProps={{ 'aria-label': 'Without label' }}
              style={{ backgroundColor: '#FFFFFF' }}>
              <MenuItem value={'all'}>Semua</MenuItem>
              <MenuItem value={'desc'}>Terbaru</MenuItem>
              <MenuItem value={'asc'}>Terlama</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="basic-table">
          <TableHead>
            <TableRow>
              <TableCell>Nomor Tiket</TableCell>
              <TableCell align="left" style={{ maxWidth: 100 }}>
                Sumber
              </TableCell>
              <TableCell align="left" style={{ maxWidth: 100 }}>
                Kategori
              </TableCell>
              <TableCell align="left">Level</TableCell>
              <TableCell align="left">Status</TableCell>
              {/* <TableCell align="left">Petugas</TableCell> */}
              <TableCell align="left">Tanggal Dibuat</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listTickets?.data?.length >= 1 ? (
              listTickets?.data?.map((item, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.nomortiket}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 100 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.sourceName || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 100 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.nameCategory || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.nameLevel || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {item?.status === 'onprogress' && (
                      <Chip
                        label="Dalam Proses"
                        style={{ backgroundColor: 'rgba(255, 140, 0, 0.15)', color: '#FF8C00D9' }}
                      />
                    )}
                    {item?.status === 'close' && (
                      <Chip label="Selesai" style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9' }} />
                    )}
                    {item?.status === 'new' && <Chip label="Baru" style={{ backgroundColor: '#E6094B1A', color: 'red' }} />}
                  </TableCell>
                  {/* <TableCell align="left">
                    <Stack direction={'row'} spacing={1}>
                      <Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
                      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Typography variant="h5">Rizal</Typography>
                      </Box>
                    </Stack>
                  </TableCell> */}
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment(item?.datetime).format('lll')}
                    </Typography>
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
      {listTickets && (
        <Stack alignItems={'center'} mt={2}>
          <Pagination count={listTickets?.totalpage} size={'small'} onChange={handlePageChange} />
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
