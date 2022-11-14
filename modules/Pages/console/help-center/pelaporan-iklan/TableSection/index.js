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
import { CircularProgress, Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useRouter } from 'next/router';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
  },
}));

const TableSection = ({ handleOrder, handlePageChange, order, page, listTickets, loading }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Stack flex={1}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={5}>
        <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
          {loading ? (
            <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
          ) : (
            <Typography style={{ fontFamily: 'Normal' }}>
              Menampilkan {listTickets?.total} hasil (
              {listTickets?.totalsearch >= 1 ? listTickets?.page * 10 + 1 : listTickets?.page * 10} -{' '}
              {listTickets?.total + listTickets?.page * 10} dari {listTickets?.totalsearch})
            </Typography>
          )}
        </Box>
        <Stack direction={'row'} spacing={2} style={{ flex: 1 }} justifyContent={'flex-end'}>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
            <Typography style={{ fontFamily: 'Normal' }}>Urutkan berdasarkan</Typography>
          </Box>
          <FormControl sx={{ m: 1, minWidth: '30%' }} size="small" style={{ backgroundColor: '#FFFFFF' }}>
            <Select value={order} onChange={handleOrder} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value={'true'}>Terbaru</MenuItem>
              <MenuItem value={'false'}>Terlama</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="basic-table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 100 }}>Waktu</TableCell>
              <TableCell align="left" style={{ maxWidth: 170 }}>
                Konten Iklan
              </TableCell>
              <TableCell align="left" style={{ width: 120 }}>
                Tipe
              </TableCell>
              <TableCell align="left" style={{ width: 150 }}>
                Jumlah Pelaporan
              </TableCell>
              <TableCell align="left" style={{ width: 230 }}>
                Alasan
              </TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableCell colSpan={6}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <CircularProgress color="secondary" />
                  <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                </Stack>
              </TableCell>
            ) : listTickets?.totalsearch >= 1 ? (
              listTickets?.arrdata?.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  onClick={() =>
                    router.push({
                      pathname: '/help-center/pelaporan-iklan/detail',
                      query: {
                        _id: item?._id,
                      },
                    })
                  }
                  style={{ cursor: 'pointer' }}>
                  <TableCell align="left" style={{ width: 100 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment(item?.createdAtReportLast).utc().format('DD/MM/YY-HH:mm')} WIB
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 170 }}>
                    <Stack direction="row" alignItems="center" gap="12px">
                      <Avatar src={item?.media?.VideoList?.[0]?.CoverURL} variant="rounded" />
                      <Typography
                        variant="body1"
                        className={classes.textTruncate}
                        title={item?.name}
                        style={{ fontSize: '12px' }}>
                        {item?.name || '-'}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" style={{ width: 120 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.tipeads || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 150 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.reportedUserCount} Kali
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 230 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.reasonLast || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {item?.reportStatusLast === 'BARU' ? (
                      <Chip label="Baru" style={{ backgroundColor: '#E6094B1A', color: '#E6094BD9', fontWeight: 700 }} />
                    ) : item?.reportStatusLast === 'DITANGGUHKAN' ? (
                      <Chip
                        label="Ditangguhkan"
                        style={{ backgroundColor: '#FF8C0026', color: '#FF8C00', fontWeight: 700 }}
                      />
                    ) : item?.reportStatusLast === 'DIHAPUS' ? (
                      <Chip
                        label="Dihapus"
                        style={{ backgroundColor: 'rgba(103, 103, 103, 0.1)', color: '#676767', fontWeight: 700 }}
                      />
                    ) : (
                      <Chip
                        label="Tidak Ditangguhkan"
                        style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9', fontWeight: 700 }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={6}>
                <Stack alignItems="center" justifyContent="center" height={468}>
                  <Typography style={{ fontFamily: 'Normal' }}>Tidak ada data pelaporan</Typography>
                </Stack>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {listTickets?.totalsearch >= 1 && (
        <Stack alignItems="center" my={3} mr={3}>
          <Pagination
            count={Number(listTickets?.totalpage) || 1}
            page={Number(listTickets?.page) + 1}
            size="small"
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
