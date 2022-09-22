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
const dummyData = [
  {
    waktu: '22/08/05-13:29 WIB',
    tipe: 'Sponsored',
    title: 'Where is...?',
    jumlah_pelaporan: '50',
    alasan: 'Dukungan ilegal atau yang tidak semestinya',
    status: 'Dihapus',
    img: 'https://material-ui.com/static/images/avatar/4.jpg',
  },
  {
    waktu: '22/08/05-13:49 WIB',
    tipe: 'Content',
    title: 'Djarum 76 - Dugem...',
    jumlah_pelaporan: '50',
    alasan: 'Dukungan ilegal atau yang tidak semestinya',
    status: 'Tidak Ditangguhkan',
    img: 'https://material-ui.com/static/images/avatar/1.jpg',
  },
  {
    waktu: '22/08/05-13:27 WIB',
    tipe: 'Content',
    title: 'PUBG Mobile',
    jumlah_pelaporan: '49',
    alasan: 'Dukungan ilegal atau yang tidak semestinya',
    status: 'Baru',
    img: 'https://material-ui.com/static/images/avatar/5.jpg',
  },
  {
    waktu: '22/08/05-13:27 WIB',
    tipe: 'Content',
    title: 'Where is..?',
    jumlah_pelaporan: '49',
    alasan: 'Dukungan ilegal atau yang tidak semestinya',
    status: 'Ditangguhkan',
    img: 'https://material-ui.com/static/images/avatar/6.jpg',
  },
];

const TableSection = ({ onOrderChange, order, total, page, rows }) => {
  const router = useRouter();
  const onSelectData = (id) => {
    router.push('/console/help-center/pelaporan-iklan/detail');
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
              <TableCell>Waktu</TableCell>
              <TableCell align="left">Konten Iklan</TableCell>
              <TableCell align="left">Tipe</TableCell>
              <TableCell align="left">Jumlah Pelaporan</TableCell>
              <TableCell align="left">Alasan</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dummyData?.map((el, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={onSelectData}>
                <TableCell component="th" scope="row">
                  <Typography variant="body1" style={{ fontSize: '12px' }}>
                    {el.waktu}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Stack direction={'row'} spacing={1}>
                    <Avatar src={el.img} variant="rounded" />
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {el.title}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1" style={{ fontSize: '12px' }}>
                    {el.tipe}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1" style={{ fontSize: '12px' }}>
                    {el.jumlah_pelaporan} Kali
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1" style={{ fontSize: '12px' }}>
                    {el.alasan}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  {el.status.toLocaleLowerCase() === 'baru' ? (
                    <Chip
                      label={el.status}
                      style={{ backgroundColor: '#E6094B1A', color: '##E6094BD9', fontWeight: 'bold' }}
                    />
                  ) : el.status.toLocaleLowerCase() === 'ditangguhkan' ? (
                    <Chip label={el.status} style={{ backgroundColor: '#FF8C0026', color: '#FF8C00', fontWeight: 'bold' }} />
                  ) : el.status.toLocaleLowerCase() === 'dihapus' ? (
                    <Chip
                      label={el.status}
                      style={{ backgroundColor: 'rgba(103, 103, 103, 0.1)', color: '#676767', fontWeight: 'bold' }}
                    />
                  ) : (
                    <Chip
                      label={el.status}
                      style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500', fontWeight: 'bold' }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default TableSection;
