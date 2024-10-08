import React, { useState } from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Menu,
  Button,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Typography } from '@material-ui/core';
import { CircularProgress, Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import Router from 'next/router';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, Edit, FileCopy, MoreVert, NavigateBefore, NavigateNext } from '@material-ui/icons';
import ModalConfirmation from '../../../modal/ModalConfirmation';
import dayjs from 'dayjs';

const useStyles = makeStyles(() => ({
  textTruncate: {
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
  const [openIndex, setOpenIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState({
    showModal: false,
    status: '',
    selected: {},
  });
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const handleOpenMenu = (event, index) => {
    setAnchorEl(event.currentTarget);
    setOpenIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenIndex(null);
  };

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
    <Stack flex={1} width="100%" maxWidth={956}>
      <ModalConfirmation
        showModal={openModal.showModal}
        status={openModal.status}
        selectedItem={openModal.selected}
        onClose={() => {
          setOpenModal({
            showModal: !openModal.showModal,
            status: '',
            selected: {},
          });
        }}
      />

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ gap: 12, marginBottom: 20 }}>
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
                        handleDeleteFilter(item.parent, []);
                      } else if (item.parent === 'kind-Konten' || item.parent === 'kind-Akun') {
                        handleDeleteFilter('type', item.value?.replace('Tipe (', '').replace(')', ''));
                      } else if (
                        item.parent === 'kind-Sedang Berjalan' ||
                        item.parent === 'kind-Akan Datang' ||
                        item.parent === 'kind-Selesai'
                      ) {
                        handleDeleteFilter('status', item.value?.replace('Status (', '').replace(')', ''));
                      } else if (item.parent === 'kind-Semua Pengguna' || item.parent === 'kind-Dengan Undangan') {
                        handleDeleteFilter('join', item.value?.replace('Cara Bergabung (', '').replace(')', ''));
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
              value={filter.ascending}
              onChange={handleOrder}
              displayEmpty
              color="secondary"
              inputProps={{ 'aria-label': 'Without label' }}
              style={{ backgroundColor: 'white' }}>
              <MenuItem value={'false'}>Terbaru</MenuItem>
              <MenuItem value={'true'}>Terlama</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <ScrollBar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Tanggal Buat</TableCell>
                <TableCell align="left">Nama Challenge</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Cara Bergabung</TableCell>
                <TableCell align="left">Tipe</TableCell>
                <TableCell align="left">Tanggal Mulai</TableCell>
                <TableCell align="left">Tanggal Berakhir</TableCell>
                <TableCell align="left"></TableCell>
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
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 150 }}>
                        {dayjs(item?.createdAt).format('DD/MM/YY - HH:mm')} WIB
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        '&:hover': {
                          cursor: 'pointer',
                          '& .MuiTypography-root': {
                            color: '#AB22AF !important',
                            textDecoration: 'underline',
                          },
                        },
                      }}
                      onClick={() => Router.push(`/challenge/detail/${item?._id}`)}>
                      <Stack direction="row" alignItems="center" gap="15px" width={200}>
                        <Avatar src={item?.bannerLeaderboard + '?m=' + new Date().getTime()} variant="rounded" alt="X" />
                        <Typography
                          variant="body1"
                          style={{ fontSize: '14px', color: '#00000099' }}
                          className={classes.textTruncate}
                          title={item?.nameChallenge || 'Hyppers of The Week'}>
                          {item?.nameChallenge || 'Hyppers of The Week'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" width={130}>
                        {item?.statuscurrentChallenge === 'SEDANG BERJALAN' && (
                          <Chip
                            label="Sedang Berjalan"
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              fontFamily: 'Lato',
                              color: '#71A500D9',
                              backgroundColor: '#71A5001A',
                            }}
                          />
                        )}
                        {item?.statuscurrentChallenge === 'AKAN DATANG' && (
                          <Chip
                            label="Akan Datang"
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              fontFamily: 'Lato',
                              color: '#FF9B21',
                              backgroundColor: '#FFEED9',
                            }}
                          />
                        )}
                        {item?.statuscurrentChallenge === 'SELESAI' && (
                          <Chip
                            label="Selesai"
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
                        style={{ fontSize: '14px', width: 110, textTransform: 'capitalize', color: '#00000099' }}>
                        {item?.caragabung === 'DENGAN UNDANGAN' && 'Dengan Undangan'}
                        {item?.caragabung === 'SEMUA PENGGUNA' && 'Semua Pengguna'}
                        {!item?.caragabung && '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{ fontSize: '14px', width: 80, textTransform: 'capitalize', color: '#00000099' }}>
                        {item?.objectChallenge === 'AKUN' && 'Akun'}
                        {item?.objectChallenge === 'KONTEN' && 'Konten'}
                        {!item?.objectChallenge && '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '14px', width: 120, color: '#00000099' }}>
                        {moment(item?.startChallenge).format('DD/MM/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '14px', width: 120, color: '#00000099' }}>
                        {moment(item?.endChallenge).format('DD/MM/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
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
                        {item?.statuscurrentChallenge !== 'SEDANG BERJALAN' && (
                          <MenuItem
                            onClick={() => {
                              handleCloseMenu();
                              Router.push(`/challenge/edit/${item?._id}`);
                            }}
                            disabled={!access?.find((item) => item?.nameModule === 'challenge')?.acces?.updateAcces}>
                            <ListItemIcon>
                              <Edit />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                          </MenuItem>
                        )}
                        <MenuItem
                          onClick={() => {
                            handleCloseMenu();
                            setOpenModal({
                              showModal: !openModal.showModal,
                              status: 'duplicate',
                              selected: item?._id,
                            });
                          }}
                          disabled={!access?.find((item) => item?.nameModule === 'challenge')?.acces?.createAcces}>
                          <ListItemIcon>
                            <FileCopy />
                          </ListItemIcon>
                          <ListItemText>Duplikat</ListItemText>
                        </MenuItem>
                        {item?.statuscurrentChallenge !== 'SEDANG BERJALAN' && (
                          <MenuItem
                            onClick={() => {
                              handleCloseMenu();
                              setOpenModal({
                                showModal: !openModal.showModal,
                                status: 'delete',
                                selected: item?._id,
                              });
                            }}
                            disabled={!access?.find((item) => item?.nameModule === 'challenge')?.acces?.deleteAcces}>
                            <ListItemIcon>
                              <Delete />
                            </ListItemIcon>
                            <ListItemText>Hapus</ListItemText>
                          </MenuItem>
                        )}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Challenge</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
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
