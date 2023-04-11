import React, { useRef } from 'react';
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
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import ModalProfilePenerima from '../Modal/ModalProfilePenerima';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';
import ScrollBar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  ticketHover: {
    '&:hover': {
      cursor: 'pointer',
      '& p': {
        fontSize: 12,
        color: '#AB22AF',
        textDecoration: 'underline',
      },
    },
    '& p': {
      fontSize: 12,
    },
  },
}));

const TableSection = ({ filterList, filter, loading, listTickets, handlePageChange, handleOrder, handleDeleteFilter }) => {
  const [isModal, setModal] = React.useState(false);
  const [selectedEmail, setSelectedEmail] = React.useState('');
  const { authUser } = useAuth();
  const router = useRouter();
  const classes = useStyles();

  const getMediaUri = (urlEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const mediaURI = urlEndpoint;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  return (
    <>
      <ModalProfilePenerima
        showModal={isModal}
        email={selectedEmail}
        onCancel={() => {
          setSelectedEmail('');
          setModal(!isModal);
        }}
      />
      <Stack flex={1} width="100%" maxWidth={956}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          style={{ gap: 12 }}>
          <Stack direction="row" gap={2} alignItems="center" width={600}>
            {filterList?.length >= 1 ? (
              <ScrollBar style={{ width: 550, height: '100%' }}>
                <Stack direction="row" gap="10px" height="100%">
                  {filterList?.map((item, key) => (
                    <Chip
                      key={key}
                      label={item.value}
                      style={{ margin: 'auto 0' }}
                      onDelete={() => {
                        if (item.parent === 'search' || item.parent === 'penerima') {
                          handleDeleteFilter(item.parent, '');
                        } else if (item.parent === 'createdAt') {
                          handleDeleteFilter(item.parent, [null, null]);
                        } else if (item.parent === 'sumber' || item.parent === 'category' || item.parent === 'level') {
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
            <FormControl sx={{ m: 1, width: 125 }} size="small">
              <Select
                value={filter.descending}
                onChange={handleOrder}
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ backgroundColor: '#FFFFFF' }}>
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
                  <TableCell align="left">Tanggal Tiket</TableCell>
                  <TableCell align="left">Nomor Tiket</TableCell>
                  <TableCell align="left">Sumber</TableCell>
                  <TableCell align="left">Kategori</TableCell>
                  <TableCell align="left">Level</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Penerima</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableCell colSpan={7}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <CircularProgress color="secondary" />
                      <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                    </Stack>
                  </TableCell>
                ) : listTickets?.data?.length >= 1 ? (
                  listTickets?.data?.map((item, key) => (
                    <TableRow hover key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 140 }}>
                          {moment(item?.datetime).utc().format('DD/MM/YY - HH:mm')} WIB
                        </Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.ticketHover}
                        onClick={() => router.push(`/help-center/bantuan-pengguna/detail/${item?._id}`)}
                        title={item?.nomortiket}>
                        <Typography variant="body1" style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 200 }}>
                          {item?.nomortiket}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 80 }}>
                          {item?.sourceName || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 160 }}>
                          {item?.nameCategory || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 60 }}>
                          {item?.nameLevel || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" width={140}>
                          {item?.status === 'onprogress' && (
                            <Chip
                              label="Dalam Proses"
                              style={{
                                backgroundColor: 'rgba(255, 140, 0, 0.15)',
                                color: '#FF8C00D9',
                                fontWeight: 'bold',
                                fontFamily: 'Normal',
                              }}
                            />
                          )}
                          {item?.status === 'close' && (
                            <Chip
                              label="Selesai"
                              style={{
                                backgroundColor: '#71A5001A',
                                color: '#71A500D9',
                                fontWeight: 'bold',
                                fontFamily: 'Normal',
                              }}
                            />
                          )}
                          {item?.status === 'new' && (
                            <Chip
                              label="Baru"
                              style={{
                                backgroundColor: '#E6094B1A',
                                color: 'red',
                                fontWeight: 'bold',
                                fontFamily: 'Normal',
                              }}
                            />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" alignItems="center" gap={2} width={200}>
                          {item?.penerima ? (
                            <Avatar
                              src={getMediaUri(item?.avatar?.mediaEndpoint)}
                              onClick={() => {
                                setSelectedEmail(item?.penerima);
                                setModal(!isModal);
                              }}
                              style={{ cursor: 'pointer' }}
                              alt={item?.penerima}
                            />
                          ) : (
                            <Avatar src={new Error()} alt="X" />
                          )}
                          <Typography
                            style={{
                              fontSize: 12,
                              width: 120,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            {item?.penerima || '-'}
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Bantuan Pengguna</Typography>
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
    </>
  );
};

export default TableSection;
