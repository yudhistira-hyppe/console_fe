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

const TableSection = ({ onOrderChange, order, total, page, rows }) => {
  const router = useRouter();
  const onSelectData = (id) => {
    router.push('/console/help-center/keluhan-pengguna/detail');
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
            <Select value={order} onChange={onOrderChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'All'}>Semua</MenuItem>
              <MenuItem value={'DESC'}>Terbaru</MenuItem>
              <MenuItem value={'ASC'}>Terlama</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="basic-table">
          <TableHead>
            <TableRow>
              <TableCell>Tanggal Pengajuan</TableCell>
              <TableCell align="left">Pemohon Akun</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Jumlah Permohonan</TableCell>
              <TableCell align="left">Tahapan Permohonan</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={onSelectData}>
              <TableCell component="th" scope="row">
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  22/07/2022-13:20 WIB
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Stack direction={'row'} spacing={1}>
                  <Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
                  <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      Rizal
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      Rizal@gmail.com
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell align="left">
                <Chip label="Baru" color="red" style={{ backgroundColor: '#E6094B1A', color: 'red' }} />
              </TableCell>
              <TableCell align="left">1 Kali</TableCell>
              <TableCell align="left">Nama Pemohon</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default TableSection;
