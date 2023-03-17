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
  },
}));

const TableSection = ({ filterList, handleOrder, handlePageChange, handleDeleteFilter, order, loading, listViewers }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getImage = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  return (
    <Stack flex={1}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={3}>
        <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
          {loading ? (
            <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
          ) : (
            <Typography style={{ fontFamily: 'Normal' }}>
              Menampilkan {listViewers?.totaldatainpage} hasil (
              {listViewers?.totalsearch >= 1 ? listViewers?.page * 10 + 1 : listViewers?.page * 10} -{' '}
              {listViewers?.totaldatainpage + listViewers?.page * 10} dari {listViewers?.totalsearch})
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
              style={{ backgroundColor: 'white' }}
              color="secondary">
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
              if (item.parent === 'createdAt') {
                handleDeleteFilter(item.parent, []);
              } else if (item.parent === 'rangeCredit' || item.parent === 'search') {
                handleDeleteFilter(item.parent, '');
              } else if (item.parent === 'age') {
                handleDeleteFilter('clearAge', '');
              } else if (item.parent === 'area') {
                handleDeleteFilter(item.parent, JSON.stringify({ name: item.value }));
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
              <TableCell align="left">Tanggal</TableCell>
              <TableCell align="left">Penonton</TableCell>
              <TableCell align="left">Jenis Kelamin</TableCell>
              <TableCell align="left">Umur</TableCell>
              <TableCell align="left">Area</TableCell>
              <TableCell align="left">Prioritas</TableCell>
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
            ) : listViewers?.data?.length >= 1 ? (
              listViewers?.data?.map((item, i) => (
                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                  <TableCell align="left" style={{ maxWidth: 80 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment(item?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 180, overflow: 'hidden' }}>
                    <Stack direction="row" alignItems="center" gap="15px">
                      <Avatar src={getImage(item?.avatar?.mediaEndpoint)} />
                      <Stack direction="column" gap="2px">
                        <Typography
                          variant="body1"
                          style={{ fontSize: '14px', color: '#00000099' }}
                          className={classes.textTruncate}>
                          {item?.fullName || '-'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 120 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.gender === 'OTHER' && 'Lainnya'}
                      {item?.gender === 'MALE' && 'Laki-laki'}
                      {item?.gender === 'FEMALE' && 'Perempuan'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 80 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.age || 0}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 130 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.areas === 'OTHER' ? 'Lainnya' : item?.areas}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 130 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.priority === 'LOW' && (
                        <Chip
                          label="Rendah"
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            fontFamily: 'Lato',
                            color: '#E6094BD9',
                            backgroundColor: '#E6094B1A',
                          }}
                        />
                      )}
                      {item?.priority === 'MEDIUM' && (
                        <Chip
                          label="Menengah"
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            fontFamily: 'Lato',
                            color: '#71A500D9',
                            backgroundColor: '#71A5001A',
                          }}
                        />
                      )}
                      {item?.priority === 'HIGHT' && (
                        <Chip
                          label="Tertinggi"
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            fontFamily: 'Lato',
                            color: '#FF8C00D9',
                            backgroundColor: '#FF8C0026',
                          }}
                        />
                      )}
                      {item?.priority === 'LOWEST' && (
                        <Chip
                          label="Terendah"
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            fontFamily: 'Lato',
                            color: '#676767D9',
                            backgroundColor: '#6767671A',
                          }}
                        />
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={8}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Penonton Iklan</Typography>
                </Stack>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {listViewers?.totalsearch >= 1 && !loading && (
        <Stack alignItems="center" my={3} mr={3}>
          <Pagination
            count={Number(listViewers?.totalpage) || 1}
            page={Number(listViewers?.page) + 1}
            size="small"
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
