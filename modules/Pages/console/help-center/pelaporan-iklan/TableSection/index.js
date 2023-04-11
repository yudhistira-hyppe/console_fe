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
import { useRouter } from 'next/router';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';

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

const TableSection = ({ filterList, handleDeleteFilter, handleOrder, handlePageChange, filter, listTickets, loading }) => {
  const classes = useStyles();
  const router = useRouter();

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
                      } else if (item.parent === 'reason') {
                        handleDeleteFilter(item.parent, JSON.stringify({ name: item.value }));
                      } else if (item.parent === 'range') {
                        handleDeleteFilter('clearRange', []);
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
                <TableCell>Waktu</TableCell>
                <TableCell align="left">Konten Iklan</TableCell>
                <TableCell align="left">Tipe</TableCell>
                <TableCell align="left">Jumlah Pelaporan</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Alasan</TableCell>
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
              ) : listTickets?.arrdata?.length >= 1 ? (
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
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 140 }}>
                        {moment(item?.createdAtReportLast).utc().format('DD/MM/YY - HH:mm')} WIB
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap="12px" width={220}>
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
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 100 }}>
                        {item?.nameType || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        {item?.reportedUserCount || 0} Kali
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" width={160}>
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
                            label="Tidak Ditangguhkan"
                            style={{
                              backgroundColor: '#71A5001A',
                              color: '#71A500D9',
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
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 230 }}>
                        {item?.reasonLast || '-'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={8}>
                  <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                    <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Pelaporan Iklan</Typography>
                  </Stack>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </ScrollBar>
      </TableContainer>
      {listTickets?.arrdata?.length >= 1 && !loading && (
        <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
          <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handlePageChange(filter.page + 1)}
            disabled={listTickets?.arrdata?.length < 10}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
