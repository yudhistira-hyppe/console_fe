import React, { useEffect, useState } from 'react';
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
import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Pagination,
  Stack,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import router from 'next/router';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { Add, Check, Delete, MoreVert, NavigateBefore, NavigateNext, Remove } from '@material-ui/icons';
import ScrollBar from 'react-perfect-scrollbar';
import Axios from 'axios';
import dayjs from 'dayjs';
import ModalKickUser from './ModalKickUser';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

const TableSection = ({
  filterList,
  challengeId,
  handleOrder,
  handlePageChange,
  handleDeleteFilter,
  filter,
  loading,
  listTickets,
  session,
}) => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [periode, setPeriode] = useState('');
  const [rerenderTable, setRerenderTable] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState({
    open: false,
    data: {},
  });

  const handleOpenMenu = (event, index) => {
    setAnchorEl(event.currentTarget);
    setOpenIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenIndex(null);
  };

  useEffect(() => {
    setRerenderTable(true);
    setTimeout(() => setRerenderTable(false), 200);
    handlePageChange(0);
  }, [periode]);

  useEffect(() => {
    if (session === 'BERAKHIR') {
      setPeriode(1);
    }
  }, [session]);

  const listUserChallenge =
    session === 'BERAKHIR'
      ? listTickets?.data?.find((item) => item?.session === Number(periode))?.userChallenge_data
      : listTickets?.data?.[0]?.userChallenge_data;

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  return (
    <Stack flex={1} width="100%" maxWidth={956}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mb={5} style={{ gap: 12 }}>
        <Stack direction="row" gap={2} alignItems="center" width={560}>
          {filterList?.length >= 1 ? (
            <ScrollBar style={{ width: 550, height: '100%' }}>
              <Stack direction="row" gap="10px">
                {filterList?.map((item, key) => (
                  <Chip
                    key={key}
                    label={item.value}
                    onDelete={() => {
                      if (item.parent === 'username') {
                        handleDeleteFilter(item.parent, '');
                      } else if (item.parent === 'age') {
                        handleDeleteFilter('clearAge', '');
                      } else if (item.parent === 'createdAt') {
                        handleDeleteFilter(item.parent, [null, null]);
                      } else if (item.parent === 'lastOnline') {
                        handleDeleteFilter(item.parent, '');
                        handleDeleteFilter('rangeOnline', []);
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
              color="secondary"
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style={{ backgroundColor: 'white', width: 190 }}>
              <MenuItem value={'true'}>Peringkat Tertinggi</MenuItem>
              <MenuItem value={'false'}>Peringkat Terendah</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <ScrollBar>
          <Table>
            {session === 'BERAKHIR' && !loading && (
              <TableHead>
                <TableRow style={{ height: 70 }}>
                  <TableCell colSpan={5}>
                    <Select
                      value={periode}
                      onChange={(e) => setPeriode(e.target.value)}
                      color="secondary"
                      displayEmpty
                      renderValue={(selected) => (
                        <Typography>
                          {selected === '' ? 'Pilih Periode Challenge' : `Challenge Periode ${selected}`}
                        </Typography>
                      )}
                      inputProps={{ 'aria-label': 'Without label' }}
                      style={{ backgroundColor: 'white', width: 230 }}>
                      {listTickets?.data?.length >= 1 ? (
                        listTickets?.data?.map((item, key) => (
                          <MenuItem value={item?.session} key={key}>
                            <Stack direction="column">
                              <Typography>Challenge Periode {item?.session}</Typography>
                              <Typography style={{ fontSize: 12, color: '#9B9B9B' }}>
                                {dayjs(item?.startDatetime).format('DD/MM/YYYY')} -{' '}
                                {dayjs(item?.endDatetime).format('DD/MM/YYYY')}
                              </Typography>
                            </Stack>
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          Sesi sedang berlangsung
                        </MenuItem>
                      )}
                    </Select>
                  </TableCell>
                </TableRow>
              </TableHead>
            )}

            <TableHead>
              <TableRow>
                <TableCell align="left">Peringkat</TableCell>
                <TableCell align="left">Jenis Kelamin</TableCell>
                <TableCell align="left">Umur</TableCell>
                <TableCell align="left">Jenis Akun</TableCell>
                <TableCell align="left">Poin Referal</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading || rerenderTable ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <CircularProgress color="secondary" />
                      <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : listUserChallenge?.length >= 1 ? (
                listUserChallenge?.map((item, i) => (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center">
                        <Typography style={{ fontWeight: 'bold', color: '#00000061', width: 60 }}>
                          #{item?.ranking}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap="15px" width={240}>
                          <Avatar src={getMediaUri(item?.profilePict?.mediaEndpoint)} />
                          <Stack gap="4px" overflow="hidden" width="100%">
                            <Typography
                              style={{ fontSize: '14px', color: '#00000099' }}
                              className={classes.textTruncate}
                              title={item?.username || '-'}>
                              {item?.username || '-'}
                            </Typography>
                            <Typography
                              style={{ fontSize: '12px', color: '#00000099' }}
                              className={classes.textTruncate}
                              title={item?.email || '-'}>
                              {item?.email || '-'}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{ fontSize: '12px', textOverflow: 'ellipsis', width: 80, overflow: 'hidden' }}>
                        {item?.gender === 'MALE' && 'Laki-laki'}
                        {item?.gender === 'FEMALE' && 'Perempuan'}
                        {item?.gender === 'OTHER' && 'Lainnya'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.dob || 0}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.statusKyc === 'unverified' && 'Tidak Terverifikasi'}
                        {item?.statusKyc === 'verified' && 'Terverifikasi'}
                        {!item?.statusKyc && '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                          {item?.score || 0}
                        </Typography>

                        {session === 'BERLANGSUNG' && (
                          <>
                            <IconButton id={`basic-button-${i}`} onClick={(e) => handleOpenMenu(e, i)}>
                              <MoreVert />
                            </IconButton>
                            <Menu
                              id={`basic-menu-${i}`}
                              open={openIndex === i}
                              anchorEl={anchorEl}
                              onClose={handleCloseMenu}
                              MenuListProps={{
                                'aria-labelledby': `basic-button-${i}`,
                              }}>
                              <MenuItem
                                onClick={() => {
                                  handleCloseMenu();
                                  setOpenModal({
                                    open: true,
                                    data: { ...item, challengeId: challengeId },
                                  });
                                }}>
                                <ListItemIcon>
                                  <Delete />
                                </ListItemIcon>
                                <ListItemText>Hapus Peserta</ListItemText>
                              </MenuItem>
                            </Menu>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={8}>
                  <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                    <Typography style={{ fontFamily: 'Normal' }}>
                      Belum ada informasi yang tersedia terkait adanya pemenang challenge.
                    </Typography>
                  </Stack>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </ScrollBar>
      </TableContainer>

      <ModalKickUser
        open={openModal.open}
        data={openModal.data}
        handleClose={() => setOpenModal({ open: false, data: {} })}
      />

      {listUserChallenge?.length >= 1 && !loading && (
        <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
          <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handlePageChange(filter.page + 1)}
            disabled={listUserChallenge?.length < 10}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
