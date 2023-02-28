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

const TableSection = ({ filterList, handleOrder, handlePageChange, handleDeleteFilter, order, loading, listTickets }) => {
  const { authUser } = useAuth();
  const classes = useStyles();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
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
    <Stack flex={1}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={3}>
        <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
          {loading ? (
            <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
          ) : (
            <Typography style={{ fontFamily: 'Normal' }}>
              Menampilkan {listTickets?.totaldatainpage} hasil (
              {listTickets?.totalsearch >= 1 ? listTickets?.page * 10 + 1 : listTickets?.page * 10} -{' '}
              {listTickets?.totaldatainpage + listTickets?.page * 10} dari {listTickets?.totalsearch})
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
              if (item.parent === 'createdAt') {
                handleDeleteFilter(item.parent, []);
              } else if (item.parent === 'rangeCredit') {
                handleDeleteFilter(item.parent, '');
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
              <TableCell align="left" style={{ width: 120 }}>
                Waktu Buat
              </TableCell>
              <TableCell align="left" style={{ width: 150 }}>
                Iklan
              </TableCell>
              <TableCell align="left" style={{ width: 120 }}>
                Tipe
              </TableCell>
              <TableCell align="left" style={{ width: 130 }}>
                Penempatan
              </TableCell>
              <TableCell align="left" style={{ width: 130 }}>
                Kredit Terpakai
              </TableCell>
              <TableCell align="left" style={{ width: 130 }}>
                Kredit Tersisa
              </TableCell>
              <TableCell align="left" style={{ width: 130 }}>
                Status
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
                  onClick={() => router.push({ pathname: `/ads-center/detail`, query: { _id: item?._id } })}>
                  <TableCell align="left" style={{ width: 120 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment(item?.timestamp).utc().format('DD/MM/YYYY - HH:mm')} WIB
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 150 }}>
                    <Stack direction="row" gap="15px">
                      <Avatar src={getImage(item)} variant="rounded" alt="X" />
                      <Stack direction="column" gap="2px">
                        <Typography
                          variant="body1"
                          style={{ fontSize: '14px', color: '#00000099' }}
                          className={classes.textTruncate}>
                          {item?.name || '-'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" style={{ width: 120 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.type_data || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 130 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.type_data === 'In App Ads'
                        ? '-'
                        : item.type_data === 'Sponsor Ads'
                        ? item.place_data
                        : item.place_data}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 130 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {numberWithCommas(item?.usedCredit + item?.usedCreditFree || 0)} Kredit
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 130 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {numberWithCommas(item?.totalUsedCredit - (item?.usedCredit + item?.usedCreditFree))} Kredit
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 130 }}>
                    {item?.status === 'DRAFT' && (
                      <Chip
                        label="Tinjau"
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          fontFamily: 'Lato',
                          color: '#E6094BD9',
                          backgroundColor: '#E6094B1A',
                        }}
                      />
                    )}
                    {item?.status === 'APPROVE' && (
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
      {listTickets?.totalsearch >= 1 && !loading && (
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
