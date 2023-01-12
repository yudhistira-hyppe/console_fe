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
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

const TableSection = ({ filterList, handleOrder, handlePageChange, handleDeleteFilter, order, loading, listTickets }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}/v5${endpoint?.[0]}${authToken}`;
  };

  return (
    <Stack flex={1}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={3}>
        <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
          {loading ? (
            <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
          ) : (
            <Typography style={{ fontFamily: 'Normal' }}>
              Menampilkan {listTickets?.totalfilter} hasil (
              {listTickets?.totalrow >= 1 ? listTickets?.page * 10 + 1 : listTickets?.page * 10} -{' '}
              {listTickets?.totalrow + listTickets?.page * 10} dari {listTickets?.totalfilter})
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

      <Stack direction="row" gap="10px" mb={2}>
        {filterList?.map((item, key) => (
          <Chip
            key={key}
            label={item.value}
            onDelete={() => {
              if (item.parent === 'username') {
                handleDeleteFilter(item.parent, '');
              } else if (item.parent === 'age') {
                handleDeleteFilter('clearAge', '');
              } else if (item.parent === 'area') {
                handleDeleteFilter(item.parent, JSON.stringify({ name: item.value }));
              } else if (item.parent === 'createdAt') {
                handleDeleteFilter(item.parent, [null, null]);
              } else if (item.parent === 'lastOnline') {
                handleDeleteFilter(item.parent, '');
                handleDeleteFilter('rangeOnline', []);
              } else {
                handleDeleteFilter(item.parent, item.value);
              }
            }}
          />
        ))}
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="basic-table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ maxWidth: 160 }}>
                Nama
              </TableCell>
              <TableCell align="left" style={{ maxWidth: 100 }}>
                Jenis Kelamin
              </TableCell>
              <TableCell align="left">Umur</TableCell>
              <TableCell align="left" style={{ maxWidth: 150 }}>
                Lokasi
              </TableCell>
              <TableCell align="left">Jenis Akun</TableCell>
              <TableCell align="left" style={{ width: 150 }}>
                Tanggal Daftar
              </TableCell>
              <TableCell align="left" style={{ maxWidth: 100 }}>
                Terakhir Aktif
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
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/database/account/${item?._id}`)}>
                  <TableCell align="left" style={{ maxWidth: 160 }}>
                    <Stack direction="row" alignItems="center" gap="15px">
                      <Avatar src={getMediaUri(item?.avatar?.mediaEndpoint)} />
                      <Stack gap="4px" overflow="hidden" width="100%">
                        <Typography
                          variant="body1"
                          style={{ fontSize: '14px', color: '#00000099' }}
                          className={classes.textTruncate}
                          title={item?.username || '-'}>
                          {item?.username || '-'}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontSize: '12px', color: '#00000099' }}
                          className={classes.textTruncate}
                          title={item?.email || '-'}>
                          {item?.email || '-'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 100 }}>
                    <Typography
                      variant="body1"
                      style={{ fontSize: '12px', textOverflow: 'ellipsis', width: 80, overflow: 'hidden' }}>
                      {item?.gender === 'MALE' && 'Laki-laki'}
                      {item?.gender === 'FEMALE' && 'Perempuan'}
                      {item?.gender === 'OTHER' && 'Lainnya'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.age || 0}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 150 }}>
                    <Typography
                      variant="body1"
                      style={{
                        fontSize: '12px',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}>
                      {item?.area || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.jenis || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px', maxWidth: 80 }}>
                      {moment(item?.createdAt).format('DD/MM/YY - HH:mm')} WIB
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.activity
                        ? moment(new Date(item?.activity?.createdAt))
                            .locale('id')
                            .startOf('hour')
                            .fromNow()
                            .replace(' yang ', ' ')
                        : '-'}
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
      {listTickets?.totalfilter >= 1 && !loading && (
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
