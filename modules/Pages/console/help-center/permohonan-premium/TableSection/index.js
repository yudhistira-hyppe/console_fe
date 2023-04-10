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
import { CircularProgress, Divider, IconButton, Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import router from 'next/router';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: 200,
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 1,
    lineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const TableSection = ({ filterList, handleDeleteFilter, handleOrder, handlePageChange, filter, loading, listTickets }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  return (
    <Stack flex={1} width="100%" maxWidth={956}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mb={5} style={{ gap: 12 }}>
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
                <TableCell>Tanggal Pengajuan</TableCell>
                <TableCell align="left">Akun Pemohon</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Jumlah</TableCell>
                <TableCell align="left">Tahapan</TableCell>
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
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      router.push({
                        pathname: '/help-center/permohonan-premium/detail',
                        query: {
                          _id: item?._id,
                        },
                      })
                    }>
                    <TableCell>
                      <Typography variant="body1" style={{ fontSize: '12px', width: 150 }}>
                        {moment(item?.createdAt).format('DD/MM/YY - HH:mm')} WIB
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap="15px" width={260}>
                        <Avatar src={getMediaUri(item?.avatar?.mediaEndpoint?.replace('.jpeg', ''))} />
                        <Stack direction="column" gap="2px">
                          <Typography
                            variant="body1"
                            style={{ fontSize: '14px', color: '#00000099' }}
                            className={classes.textTruncate}>
                            {item?.username || '-'}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ fontSize: '12px', color: '#00000099' }}
                            className={classes.textTruncate}>
                            {item?.email || '-'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack width={160} direction="row">
                        {item?.status === 'BARU' && (
                          <Chip
                            label="Permintaan Baru"
                            style={{
                              backgroundColor: '#E6094B1A',
                              color: '#E6094BD9',
                              fontWeight: 'bold',
                              fontFamily: 'Normal',
                            }}
                          />
                        )}
                        {item?.status === 'DISETUJUI' && (
                          <Chip
                            label="Disetujui Admin"
                            style={{
                              backgroundColor: '#71A5001A',
                              color: '#71A500D9',
                              fontWeight: 'bold',
                              fontFamily: 'Normal',
                            }}
                          />
                        )}
                        {item?.status === 'DITOLAK' && (
                          <Chip
                            label="Ditolak Admin"
                            style={{
                              backgroundColor: 'rgba(103, 103, 103, 0.1)',
                              color: '#676767',
                              fontWeight: 'bold',
                              fontFamily: 'Normal',
                            }}
                          />
                        )}
                        {item?.status === 'BYSYSTEM' && (
                          <Chip
                            label="Disetujui Sistem"
                            style={{
                              backgroundColor: '#71A5001A',
                              color: '#71A500D9',
                              fontWeight: 'bold',
                              fontFamily: 'Normal',
                            }}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 60 }}>
                        {item?.jumlahPermohonan || 0} Kali
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 60 }}>
                        {item?.tahapan || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" style={{ overflow: 'hidden' }}>
                      <Typography
                        variant="body1"
                        style={{ fontSize: '12px', width: 200 }}
                        title={
                          !item?.kycHandle?.[0]?.reasonValue
                            ? item?.kycHandle?.[0]?.remark || '-'
                            : item?.kycHandle?.[0]?.reasonValue || '-'
                        }>
                        {!item?.kycHandle?.[0]?.reasonValue
                          ? item?.kycHandle?.[0]?.remark || '-'
                          : item?.kycHandle?.[0]?.reasonValue || '-'}
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
