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
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import router from 'next/router';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 1,
    lineClamp: 1,
    overflow: 'hidden',
  },
}));

const TableSection = ({ handleOrder, handlePageChange, order, loading, listTickets }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getImage = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

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
            <Typography>Urutkan berdasarkan</Typography>
          </Box>
          <FormControl sx={{ m: 1, minWidth: '30%' }} size="small">
            <Select
              value={order}
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
        <Table sx={{ minWidth: 650 }} aria-label="basic-table">
          <TableHead>
            <TableRow>
              <TableCell style={{ maxWidth: 130 }}>Tanggal Pengajuan</TableCell>
              <TableCell align="left" style={{ maxWidth: 200 }}>
                Akun Pemohon
              </TableCell>
              <TableCell align="left" style={{ maxWidth: 120 }}>
                Status
              </TableCell>
              <TableCell align="left" style={{ maxWidth: 150 }}>
                Alasan Banding
              </TableCell>
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
            ) : listTickets?.arrdata?.length >= 1 ? (
              listTickets?.arrdata?.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    router.push({
                      pathname: '/help-center/banding-akun/detail',
                      query: {
                        _id: item?._id,
                      },
                    })
                  }>
                  <TableCell style={{ maxWidth: 130 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment(item?.createdAtAppealLast).utc().format('YY/MM/DD - HH:mm')} WIB
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 200 }}>
                    <Stack direction="row" alignItems="center" gap="15px">
                      <Avatar src={getImage(item?.avatar?.mediaEndpoint)} />
                      <Stack direction="column" gap="2px" style={{ maxWidth: 180 }}>
                        <Typography
                          variant="body1"
                          style={{ fontSize: '14px', color: '#00000099' }}
                          className={classes.textTruncate}
                          title={item?.username}>
                          {item?.username || '-'}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontSize: '12px', color: '#00000099' }}
                          className={classes.textTruncate}
                          title={item?.email}>
                          {item?.email || '-'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 120 }}>
                    {item?.reportStatusLast === 'BARU' && (
                      <Chip
                        label="Baru"
                        style={{
                          backgroundColor: '#E6094B1A',
                          color: '#E6094BD9',
                          fontWeight: 'bold',
                          fontFamily: 'Normal',
                        }}
                      />
                    )}
                    {item?.reportStatusLast === 'TIDAK DITANGGUHKAN' && (
                      <Chip
                        label="Dipulihkan"
                        style={{
                          backgroundColor: '#71A5001A',
                          color: '#71A500D9',
                          fontWeight: 'bold',
                          fontFamily: 'Normal',
                        }}
                      />
                    )}
                    {item?.reportStatusLast === 'FLAGING' && (
                      <Chip
                        label="Ditandai Sensitif"
                        style={{
                          backgroundColor: '#B457F61A',
                          color: '#B457F6D9',
                          fontWeight: 'bold',
                          fontFamily: 'Normal',
                        }}
                      />
                    )}
                    {item?.reportStatusLast === 'DITANGGUHKAN' && (
                      <Chip
                        label="Ditangguhkan"
                        style={{
                          backgroundColor: 'rgba(103, 103, 103, 0.1)',
                          color: '#676767',
                          fontWeight: 'bold',
                          fontFamily: 'Normal',
                        }}
                      />
                    )}
                    {!item?.reportStatusLast && '-'}
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 150 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.reasonLastAppeal || '-'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={8}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Permohonan Akun Premium</Typography>
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
