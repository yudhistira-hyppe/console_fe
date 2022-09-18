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
import { Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useRouter } from 'next/router';
import Pagination from '@mui/material/Pagination';

const TableSection = ({ onOrderChange, order, total, page, rows }) => {
  const router = useRouter();
  const onSelectData = () => {
    router.push('/console/help-center/bantuan-pengguna/detail');
  };
  return (
    <Stack flex={1}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={5}>
        <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
          <Typography>
            Menampilkan {total} hasil ({page}-{rows} dari {total})
          </Typography>
        </Box>
        <Stack direction={'row'} spacing={2} style={{ flex: 1 }} justifyContent={'flex-end'}>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
            <Typography>Urutkan berdasarkan</Typography>
          </Box>
          <FormControl sx={{ m: 1, minWidth: '30%' }} size="small">
            <Select
              value={order}
              onChange={onOrderChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style={{ backgroundColor: '#FFFFFF' }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
              <TableCell>Waktu Transaksi</TableCell>
              <TableCell align="left">Nama Voucher</TableCell>
              <TableCell align="left">Jumlah Kredit</TableCell>
              <TableCell align="left">Harga</TableCell>
              <TableCell align="left">Masa Berlaku</TableCell>
              <TableCell align="left">Status Pembayaran</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={onSelectData}>
              <TableCell component="th" scope="row">
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  004/22/08/22
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  22/07/22-13:20 WIB
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  Formulir
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  Akun & Verifikasi
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  4
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Chip label="Baru" color="red" style={{ backgroundColor: '#E6094B1A', color: 'red' }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack alignItems={'center'} mt={2}>
        <Pagination count={10} size={'small'} />
      </Stack>
    </Stack>
  );
};

export default TableSection;
