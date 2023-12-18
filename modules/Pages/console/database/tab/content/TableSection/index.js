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
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';
import ScrollBar from 'react-perfect-scrollbar';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: 160,
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

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getImage = (item) => {
    if (item?.apsara && item?.apsaraId) {
      if (item?.media?.ImageInfo) {
        return item?.media?.ImageInfo?.[0]?.URL;
      } else {
        return item?.media?.VideoList?.[0]?.CoverURL;
      }
    } else if (item?.mediaEndpoint) {
      return getMediaUri(item?.mediaEndpoint);
    } else {
      return '/images/dashboard/content_image.png';
    }
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
                        item.parent === 'description' ||
                        item.parent === 'pemilik' ||
                        item.parent === 'min_price' ||
                        item.parent === 'max_price'
                      ) {
                        handleDeleteFilter(item.parent, '');
                      } else if (item.parent === 'category') {
                        handleDeleteFilter(item.parent, JSON.stringify({ name: item.value }));
                      } else if (item.parent === 'createdAt') {
                        handleDeleteFilter(item.parent, [null, null]);
                      } else if (item.parent === 'hashtag') {
                        handleDeleteFilter('clearHashtag', []);
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
                <TableCell align="left">Tanggal Post</TableCell>
                <TableCell align="left">Konten</TableCell>
                <TableCell align="left">Pemilik</TableCell>
                <TableCell align="left">Tipe</TableCell>
                <TableCell align="left">Kategori</TableCell>
                <TableCell align="left">Hashtag</TableCell>
                <TableCell align="left">Kepemilikan</TableCell>
                <TableCell align="left">Penjualan</TableCell>
                <TableCell align="left">Harga</TableCell>
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
                    onClick={() => router.push(`/database/content/${item?._id}`)}>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 150 }}>
                        {moment(item?.createdAt).format('DD/MM/YY - HH:mm')} WIB
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap="15px" width={220}>
                        <Avatar src={getImage(item)} variant="rounded" />
                        <Typography
                          variant="body1"
                          style={{ fontSize: '14px', color: '#00000099' }}
                          className={classes.textTruncate}
                          title={item?.description || '-'}>
                          {item?.description || '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="column" gap={1}>
                        <Typography
                          variant="body1"
                          style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textOverflow: 'ellipsis',
                            width: 100,
                            overflow: 'hidden',
                          }}>
                          {item?.username || '-'}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontSize: '12px', textOverflow: 'ellipsis', width: 170, overflow: 'hidden' }}>
                          {item?.email || '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 100 }}>
                        {item?.type || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        className={classes.textTruncate}
                        style={{ fontSize: '12px' }}
                        title={item?.kategori?.map((item) => item?.interestName).join(', ')}>
                        {item?.kategori?.map((item) => item?.interestName).join(', ') || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        className={classes.textTruncate}
                        style={{ fontSize: '12px' }}
                        title={item?.tags?.map((item) => item).join(', ')}>
                        {item?.tags?.map((item) => item).join(', ') || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        {item?.kepemilikan === 'TIDAK' ? 'Tidak Terdaftar' : 'Terdaftar'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        {item?.statusJual === 'TIDAK' ? 'Tidak Dijual' : 'Dijual'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{ fontSize: '12px', textOverflow: 'ellipsis', width: 100, overflow: 'hidden' }}>
                        Rp {numberWithCommas(item?.saleAmount || 0)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={8}>
                  <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                    <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Pembuatan Konten</Typography>
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
