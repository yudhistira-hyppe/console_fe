import React from 'react';
import { Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Avatar, Chip } from '@mui/material';
import { Typography } from '@material-ui/core';
import { CircularProgress, Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import router from 'next/router';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: 100,
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
  },
}));

const TableSection = ({ filterList, handleOrder, handlePageChange, handleDeleteFilter, order, loading, listTickets }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getImage = (item) => {
    if (item?.apsara && item?.apsaraId) {
      if (item?.media?.ImageInfo) {
        return item?.media?.ImageInfo?.[0]?.URL || new Error();
      } else {
        return item?.media?.VideoList?.[0]?.CoverURL || new Error();
      }
    } else if (item?.mediaEndpoint) {
      return getMediaUri(item?.mediaEndpoint) || new Error();
    } else {
      return new Error();
    }
  };

  return (
    <Stack flex={1}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={3}>
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

      {filterList?.length >= 1 && (
        <Stack direction="row" gap="10px" mb={2}>
          {filterList?.map((item, key) => (
            <Chip
              key={key}
              label={item.value}
              onDelete={() => {
                if (item.parent === 'range') {
                  handleDeleteFilter('clearRange', []);
                } else if (item.parent === 'createdAt') {
                  handleDeleteFilter(item.parent, []);
                } else if (item.parent === 'jadwal') {
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
        <Table sx={{ minWidth: 650 }} aria-label="basic-table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontSize: 14, fontFamily: 'Lato' }}>
                Judul
              </TableCell>
              <TableCell align="left" style={{ fontSize: 14, fontFamily: 'Lato' }}>
                Tipe Konten
              </TableCell>
              <TableCell align="left" style={{ fontSize: 14, fontFamily: 'Lato' }}>
                Tipe Jadwal
              </TableCell>
              <TableCell align="left" style={{ fontSize: 14, fontFamily: 'Lato' }}>
                Tanggal Mulai
              </TableCell>
              <TableCell align="left" style={{ fontSize: 14, fontFamily: 'Lato' }}>
                Status Pengajuan
              </TableCell>
              <TableCell align="left" style={{ fontSize: 14, fontFamily: 'Lato' }}>
                Jangkauan
              </TableCell>
              <TableCell align="left" style={{ fontSize: 14, fontFamily: 'Lato' }}>
                Keterangan
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
            ) : listTickets?.data?.length >= 1 ? (
              listTickets?.data?.map((item, i) => (
                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                  <TableCell
                    align="left"
                    style={{ width: 120, paddingRight: 0 }}
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                        '& .MuiTypography-root': {
                          color: '#AB22AF !important',
                          textDecoration: 'underline',
                        },
                      },
                    }}
                    onClick={() => router.push({ pathname: `/boost-center/detail`, query: { _id: item?._id } })}>
                    <Stack direction="row" gap="15px">
                      <Avatar src={getImage(item)} variant="rounded" alt="X" />
                      <Typography
                        variant="body1"
                        style={{ fontSize: '14px', color: '#00000099' }}
                        className={classes.textTruncate}>
                        {item?.description || '-'}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" style={{ width: 110, paddingRight: 0 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.type || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 150, paddingRight: 0 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.sessionName === 'automatic'
                        ? 'Otomatis'
                        : item?.sessionName === 'Morning'
                        ? 'Pagi'
                        : item?.sessionName === 'Afternoon'
                        ? 'Siang'
                        : item?.sessionName === 'Night'
                        ? 'Malam'
                        : item?.sessionName}{' '}
                      <br /> ({item?.sessionStart.slice(0, 5)} - {item?.sessionEnd.slice(0, 5)} WIB)
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 120, paddingRight: 0 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment(item?.start).format('DD/MM/YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 180, paddingRight: 0 }}>
                    {item?.statusPengajuan === 'Sedang Berlangsung' && (
                      <Chip
                        label="Sedang Berlangsung"
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          fontFamily: 'Lato',
                          color: '#0095F2',
                          backgroundColor: '#0095F233',
                        }}
                      />
                    )}
                    {item?.statusPengajuan === 'Dijadwalkan' && (
                      <Chip
                        label="Dijadwalkan"
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          fontFamily: 'Lato',
                          color: '#71A500D9',
                          backgroundColor: '#71A5001A',
                        }}
                      />
                    )}
                    {item?.statusPengajuan === 'Selesai' && (
                      <Chip
                        label="Selesai"
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          fontFamily: 'Lato',
                          color: '#FF8C00D9',
                          backgroundColor: '#FF8C0026',
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="left" style={{ width: 100, paddingRight: 0 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {numberWithCommas(item?.jangkauan)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.keterangan === 'Belum Terjual' ? '-' : item?.keterangan}
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
