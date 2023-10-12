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
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
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

const TableSection = ({ filterList, handleOrder, handlePageChange, handleDeleteFilter, loading, listViewers, filter }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getImage = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  return (
    <Stack flex={1} width="100%" maxWidth={956}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={3}>
        <Stack direction="row" gap={2} alignItems="center" width={600}>
          {filterList?.length >= 1 ? (
            <ScrollBar style={{ width: 550, height: '100%' }}>
              <Stack direction="row" gap="10px">
                {filterList?.map((item, key) => (
                  <Chip
                    key={key}
                    label={item.value}
                    onDelete={() => {
                      if (item.parent === 'createdAt') {
                        handleDeleteFilter(item.parent, []);
                      } else if (item.parent === 'search' || item.parent === 'age') {
                        handleDeleteFilter(item.parent, '');
                      } else if (item.parent === 'area') {
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
              style={{ backgroundColor: 'white' }}
              color="secondary">
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
                <TableCell align="left">Tanggal</TableCell>
                <TableCell align="left">Nama</TableCell>
                <TableCell align="left">Jenis Kelamin</TableCell>
                <TableCell align="left">Umur</TableCell>
                <TableCell align="left">Lokasi</TableCell>
                <TableCell align="left">Minat</TableCell>
                <TableCell align="left">Kesamaan Audiens</TableCell>
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
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: 14, width: 80 }}>
                        {moment(item?.timestamp).format('DD/MM/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" style={{ overflow: 'hidden' }}>
                      <Stack direction="row" alignItems="center" gap="15px">
                        <Avatar src={getImage(item?.profilePict)} />
                        <Stack direction="column" gap="2px" width={180}>
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
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: 14, width: 120, color: '#00000099' }}>
                        {item?.gender || 'Lainnya'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: 14, width: 60, color: '#00000099' }}>
                        {item?.age || 0}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: 14, width: 120, color: '#00000099' }}>
                        {item?.lokasi ? item?.lokasi : 'Lainnya'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{ fontSize: 14, width: 140 }}
                        className={classes.textTruncate}
                        title={item?.interest?.join(', ') || '-'}>
                        {item?.interest?.length >= 1 ? item?.interest?.join(', ') : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: 14, width: 120 }}>
                        {item?.commonality < 25 && '< 25%'}
                        {item?.commonality >= 25 && item?.commonality < 50 && '25 - 50%'}
                        {item?.commonality >= 50 && item?.commonality < 75 && '50 - 75%'}
                        {item?.commonality >= 75 && item?.commonality <= 100 && '75 - 100%'}
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
        </ScrollBar>
      </TableContainer>

      {listViewers?.data?.length >= 1 && !loading && (
        <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
          <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handlePageChange(filter.page + 1)}
            disabled={listViewers?.data?.length < 10}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
