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
  Chip,
} from '@material-ui/core';
import { Avatar, CircularProgress, Divider, IconButton, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import moment from 'moment';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';
import dayjs from 'dayjs';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';

const TableSection = ({ filterList, handleDeleteFilter, listReferral, filter, handlePageChange, loading }) => {
  const { authUser } = useAuth();

  const getAvatar = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  return (
    <>
      <Stack flex={1} width="100%" maxWidth={956}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          style={{ gap: 12 }}>
          <Stack direction="row" gap={2} alignItems="center">
            {filterList?.length >= 1 ? (
              <ScrollBar style={{ width: 896, height: '100%' }}>
                <Stack direction="row" gap="10px">
                  {filterList?.map((item, key) => (
                    <Chip
                      key={key}
                      label={item.value}
                      onDelete={() => {
                        if (item.parent === 'search') {
                          handleDeleteFilter(item.parent, '');
                        } else if (item.parent === 'createdAt') {
                          handleDeleteFilter(item.parent, [null, null]);
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
        </Box>

        <TableContainer component={Paper}>
          <ScrollBar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Waktu Penggunaan</TableCell>
                  <TableCell align="left">Pengguna</TableCell>
                  <TableCell align="left">Umur</TableCell>
                  <TableCell align="left">Jenis Kelamin</TableCell>
                  <TableCell align="left">Jenis Akun</TableCell>
                  <TableCell align="left">Lokasi</TableCell>
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
                ) : listReferral?.data?.length >= 1 ? (
                  listReferral?.data?.map((item, key) => (
                    <TableRow key={key}>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 130 }}>
                          {dayjs(item?.createdAt).format('DD/MM/YY - HH:mm')} WIB
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Avatar src={getAvatar(item?.childAvatar?.mediaEndpoint)} alt={item?.childFullName || ''} />
                          <Stack direction="column" gap="2px">
                            <Typography variant="body1" style={{ fontSize: 14, width: 120 }}>
                              {item?.childFullName || '-'}
                            </Typography>
                            <Typography
                              variant="body1"
                              style={{
                                fontSize: 12,
                                width: 120,
                                color: '#00000099',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}>
                              {item?.children || '-'}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 90 }}>
                          {item?.childAge || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 80 }}>
                          {item?.childGender === 'FEMALE' && 'Perempuan'}
                          {item?.childGender === 'MALE' && 'Laki-laki'}
                          {item?.childGender === 'OTHER' && 'Lainnya'}
                          {!item?.childGender && 'Lainnya'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 80 }}>
                          {item?.jenis === 'PREMIUM' && 'Terverifikasi'}
                          {item?.jenis === 'BASIC' && 'Terdaftar'}
                          {item?.jenis === 'GUEST' && 'Tamu'}
                          {!item?.jenis && '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 180 }}>
                          {item?.childState || '-'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Tidak ada referral.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollBar>
        </TableContainer>
        {listReferral?.data?.length >= 1 && !loading && (
          <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
            <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
              <NavigateBefore />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handlePageChange(filter.page + 1)}
              disabled={listReferral?.data?.length < 10}>
              <NavigateNext />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default TableSection;
