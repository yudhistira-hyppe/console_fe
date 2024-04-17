import React from 'react';
import { Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Avatar, Chip } from '@mui/material';
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
import { Typography } from '@material-ui/core';

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

const TableSection = ({ filterList, handleDeleteFilter, handleOrder, handlePageChange, filter, loading, listTickets }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
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
                      if (
                        item.parent === 'search' ||
                        item.parent === 'similarity' ||
                        item.parent === 'document' ||
                        item.parent === 'source'
                      ) {
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
              <TableRow sx={{ th: { lineHeight: '1.3rem', fontSize: 14, fontFamily: 'Lato' } }}>
                <TableCell style={{ width: 102 }}>Tanggal Pengajuan</TableCell>
                <TableCell style={{ width: 212 }}>Akun</TableCell>
                <TableCell style={{ width: 122 }}>Pendaftaran Rekening</TableCell>
                <TableCell style={{ width: 142 }}>Tingkat Kesamaan Nama</TableCell>
                <TableCell style={{ width: 102 }}>Dokumen Pendukung</TableCell>
                <TableCell>Sumber Pengajuan</TableCell>
                <TableCell>Status</TableCell>
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
                  <TableRow
                    key={i}
                    hover
                    onClick={() => router.push({ pathname: '/help-center/rekening-bank/detail', query: { _id: item?._id } })}
                    sx={{ cursor: 'pointer', '& .MuiTypography-root': { color: '#00000099' } }}>
                    <TableCell>
                      <Typography style={{ fontSize: '12px' }}>
                        {moment(item?.tanggalPengajuan).utc().format('DD/MM/YY - HH:mm')} WIB
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack width={180} direction="row" alignItems="center" gap="15px" style={{ overflow: 'hidden' }}>
                        <Avatar src={getMediaUri(item?.avatar?.mediaEndpoint)} />
                        <Stack direction="column" gap="2px">
                          <Typography style={{ fontSize: 14 }} className={classes.textTruncate}>
                            {item?.username || '-'}
                          </Typography>
                          <Typography style={{ fontSize: 12 }} className={classes.textTruncate}>
                            {item?.email || '-'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontSize: '12px' }}>Bank Mandiri</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontSize: '12px' }}>{'< 50%'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontSize: '12px' }}>Tidak</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontSize: '12px' }}>Penambahan Akun Bank</Typography>
                    </TableCell>
                    <TableCell align="left">
                      {item?.statusLast === 'BARU' && (
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
                      {item?.statusLast === 'DISETUJUI' && (
                        <Chip
                          label="Disetujui"
                          style={{
                            backgroundColor: '#71A5001A',
                            color: '#71A500D9',
                            fontWeight: 'bold',
                            fontFamily: 'Normal',
                          }}
                        />
                      )}
                      {item?.statusLast === 'DITOLAK' && (
                        <Chip
                          label="Ditolak"
                          style={{
                            backgroundColor: 'rgba(103, 103, 103, 0.1)',
                            color: '#676767',
                            fontWeight: 'bold',
                            fontFamily: 'Normal',
                          }}
                        />
                      )}
                      {!item?.statusLast && '-'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={8}>
                  <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                    <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Rekening Bank</Typography>
                  </Stack>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </ScrollBar>
      </TableContainer>
      {!loading && (
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
