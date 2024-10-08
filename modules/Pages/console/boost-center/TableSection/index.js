import React from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
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
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';
import clsx from 'clsx';

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

const TableSection = ({ filterList, handleOrder, handlePageChange, handleDeleteFilter, filter, loading, listTickets }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const mediaUri = mediaEndpoint?.split('.');

    return `${STREAM_URL}${mediaUri[0]}${authToken}`;
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
    <Stack flex={1} width="100%" maxWidth={956}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ gap: 12, marginBottom: 20 }}>
        <Stack direction="row" gap={2} alignItems="center" width={600}>
          {filterList?.length >= 1 ? (
            <ScrollBar style={{ width: 550, height: '100%' }}>
              <Stack direction="row" gap="10px">
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
                <TableCell align="left">Judul</TableCell>
                <TableCell align="left">Tipe Konten</TableCell>
                <TableCell align="left">Tipe Jadwal</TableCell>
                <TableCell align="left">Tanggal Mulai</TableCell>
                <TableCell align="left">Status Pengajuan</TableCell>
                <TableCell align="left">Jangkauan</TableCell>
                <TableCell align="left">Keterangan</TableCell>
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
                  <TableRow
                    key={i}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        cursor: 'pointer',
                        '& .title': {
                          color: '#AB22AF !important',
                          textDecoration: 'underline',
                        },
                      },
                    }}
                    hover
                    onClick={() => router.push({ pathname: `/boost-center/detail`, query: { _id: item?._id } })}>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap="15px" width={180}>
                        <Avatar src={getImage(item)} variant="rounded" alt="X" style={{ width: 42, height: 42 }} />
                        <Typography
                          variant="body1"
                          className={clsx(classes.textTruncate, 'title')}
                          style={{ fontSize: 14, color: '#00000099', height: '100%' }}>
                          {item?.description || '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 110 }}>
                        {item?.type || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 150 }}>
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
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        {moment(item?.start).format('DD/MM/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" width={180}>
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
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 100 }}>
                        {numberWithCommas(item?.jangkauan)}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 150 }}>
                        {item?.keterangan === 'Belum Terjual' ? '-' : item?.keterangan}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={8}>
                  <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                    <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Boost Post</Typography>
                  </Stack>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </ScrollBar>
      </TableContainer>
      {listTickets?.data?.length >= 1 && !loading && (
        <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
          <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handlePageChange(filter.page + 1)}
            disabled={listTickets?.data?.length < 10}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
