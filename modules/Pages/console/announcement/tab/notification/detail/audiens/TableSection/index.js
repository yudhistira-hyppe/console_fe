import React, { useState } from 'react';
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
  Menu,
  Button,
  ListItemIcon,
  ListItemText,
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
import Router from 'next/router';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, Edit, FileCopy, MoreVert, NavigateBefore, NavigateNext, Visibility } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  textTruncate: {
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
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
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
                      if (item.parent === 'search') {
                        handleDeleteFilter(item.parent, '');
                      } else if (item.parent === 'age') {
                        handleDeleteFilter('clearAge', '');
                      } else if (item.parent === 'area') {
                        handleDeleteFilter(item.parent, JSON.stringify({ name: item.value }));
                      } else if (item.parent === 'createdAt') {
                        handleDeleteFilter(item.parent, []);
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
              value={filter.ascending}
              onChange={handleOrder}
              displayEmpty
              color="secondary"
              inputProps={{ 'aria-label': 'Without label' }}
              style={{ backgroundColor: 'white', width: 120 }}>
              <MenuItem value={'false'}>A - Z</MenuItem>
              <MenuItem value={'true'}>Z - A</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <ScrollBar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14 }}>Tanggal</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14 }}>Pengguna</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14 }}>Jenis Kelamin</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14 }}>Umur</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14 }}>Lokasi</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14 }}>Jenis Akun</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14 }}>Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <CircularProgress color="secondary" />
                      <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : listTickets?.data?.length >= 1 ? (
                listTickets?.data?.map((item, i) => (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                    <TableCell style={{}}>
                      <Stack direction="column" width={120}>
                        <Typography style={{ color: '#00000099', fontSize: 14 }}>
                          {moment(item?.createdAt).format('DD/MM/YYYY')}
                        </Typography>
                        <Typography style={{ color: '#00000099', fontSize: 12 }}>
                          {moment(item?.createdAt).format('HH:mm')} WIB
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap="15px" width={250}>
                        <Avatar src={getMediaUri(item?.avatar?.[0]?.mediaEndpoint)} />
                        <Stack gap="4px" overflow="hidden" width="100%">
                          <Typography
                            style={{
                              fontSize: '14px',
                              fontWeight: 'bold',
                              color: '#00000099',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                            }}
                            title={item?.fullName || '-'}>
                            {item?.fullName || '-'}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: '12px',
                              color: '#00000099',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                            }}
                            title={`@${item?.username}` || '-'}>
                            @{item?.username || '-'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: '14px',
                          width: 120,
                          textTransform: 'capitalize',
                        }}>
                        {item?.gender === 'L' && 'Laki-laki'}
                        {item?.gender === 'P' && 'Perempuan'}
                        {item?.gender === 'O' && 'Lainnya'}
                        {!item?.gender && '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: '14px',
                          width: 80,
                        }}>
                        {item?.age || '0'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: '14px',
                          width: 140,
                          textTransform: 'capitalize',
                          WebkitLineClamp: 2,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          display: '-webkit-box',
                        }}>
                        {item?.state || '-'} {item?.city && `,`} <br /> {item?.city}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: '14px',
                          width: 120,
                        }}>
                        {item?.jenis === 'PREMIUM' && 'Premium'}
                        {item?.jenis === 'BASIC' && 'Basic'}
                        {!item?.jenis && '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" width={130}>
                        {item?.status === 'SEND' ? (
                          <Chip
                            label="Terkirim"
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              fontFamily: 'Lato',
                              color: '#71A500D9',
                              backgroundColor: '#71A5001A',
                            }}
                          />
                        ) : (
                          <Chip
                            label="Tidak Terkirim"
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              fontFamily: 'Lato',
                              color: '#676767D9',
                              backgroundColor: '#6767671A',
                            }}
                          />
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <Typography style={{ fontFamily: 'Normal' }}>Tidak ada data Audiens</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
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
