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
import { formatCurrency } from 'helpers/stringHelper';
import clsx from 'clsx';

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
  hoverCell: {
    '&:hover': {
      '& .MuiTypography-body1': {
        textDecoration: 'underline',
        color: '#AB22AF !important',
      },
    },
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
    if (item?.apsara || item?.idApsara) {
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
                      if (item.parent === 'createdAt') {
                        handleDeleteFilter(item.parent, []);
                      } else if (item.parent === 'rangePlan' || item.parent === 'search') {
                        handleDeleteFilter(item.parent, '');
                      } else if (item.parent === 'type') {
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
              color="secondary"
              inputProps={{ 'aria-label': 'Without label' }}
              style={{ backgroundColor: 'white' }}>
              <MenuItem value={'true'}>Terbaru</MenuItem>
              <MenuItem value={'false'}>Terlama</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {loading ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Nama</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableCell colSpan={20}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <CircularProgress color="secondary" />
                  <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                </Stack>
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      ) : listTickets?.data?.length < 1 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Nama</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableCell colSpan={20}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Iklan yang sedang berjalan</Typography>
                </Stack>
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack direction="row">
          <TableContainer component={Paper} style={{ width: '100%', maxWidth: 350 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ paddingRight: 0 }}>
                    ID
                  </TableCell>
                  <TableCell align="left" style={{ paddingLeft: 0 }}>
                    Nama
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {listTickets?.data?.map((item, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                    style={{ cursor: 'pointer', height: 65 }}>
                    <TableCell align="left" style={{ paddingRight: 0 }}>
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: 14,
                          width: 140,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                        title={item?.campaignId || item?.adsIdNumber || '-'}>
                        {item?.campaignId || item?.adsIdNumber || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ padding: '0 16px 0 0' }}
                      className={classes.hoverCell}
                      onClick={() => router.push({ pathname: `/ads-center/manage/detail`, query: { _id: item?._id } })}>
                      <Stack direction="row" alignItems="center" gap="15px" width={150}>
                        {/* <Avatar src={getImage(item)} variant="rounded" alt="X" /> */}
                        <Stack direction="column" gap="2px">
                          <Typography
                            variant="body1"
                            style={{ fontSize: 14, color: '#00000099' }}
                            className={classes.textTruncate}>
                            {item?.name || '-'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <ScrollBar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Tanggal Buat</TableCell>
                    <TableCell align="left">Tanggal Mulai</TableCell>
                    <TableCell align="left">Tanggal Selesai</TableCell>
                    <TableCell align="left">Tipe Iklan</TableCell>
                    <TableCell align="left">Plan Tayang</TableCell>
                    <TableCell align="left">Impresi</TableCell>
                    <TableCell align="left">Jangkauan</TableCell>
                    <TableCell align="left">Klik</TableCell>
                    <TableCell align="left">Kredit</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Remark</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listTickets?.data?.map((item, i) => (
                    <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} style={{ height: 65 }}>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: 14, width: 170 }}>
                          {moment(item?.timestamp).utc().format('DD/MM/YYYY - HH:mm')} WIB
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: 14, width: 100 }}>
                          {moment(item?.liveAt).format('DD/MM/YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: 14, width: 100 }}>
                          {moment(item?.liveEnd).format('DD/MM/YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: 14, width: 130 }}>
                          {item?.adstypes || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: 14, width: 80 }}>
                          {formatCurrency(item?.tayang || 0) || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: 14, width: 80 }}>
                          {formatCurrency(item?.impresi || 0) || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: 14, width: 80 }}>
                          {formatCurrency(item?.reach || 0) || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: 14, width: 80 }}>
                          {formatCurrency(item?.CTA || 0) || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: 14, width: 80 }}>
                          {formatCurrency(item?.totalCredit || 0) || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" width={100}>
                          {item?.status === 'DRAFT' && (
                            <Chip
                              label="Draf"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                color: '#E6094BD9',
                                backgroundColor: '#E6094B1A',
                              }}
                            />
                          )}
                          {(item?.status === 'ACTIVE' || item?.status === 'APPROVE') && (
                            <Chip
                              label="Aktif"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                color: '#71A500D9',
                                backgroundColor: '#71A5001A',
                              }}
                            />
                          )}
                          {item?.status === 'UNDER_REVIEW' && (
                            <Chip
                              label="Ditinjau"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                color: '#FF8C00D9',
                                backgroundColor: '#FF8C0026',
                              }}
                            />
                          )}
                          {item?.status === 'IN_ACTIVE' && (
                            <Chip
                              label="Tidak Aktif"
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
                      <TableCell align="left">
                        <Typography
                          variant="body1"
                          style={{
                            fontSize: 14,
                            width: 220,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                          {item?.remark || '-'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollBar>
          </TableContainer>
        </Stack>
      )}

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
