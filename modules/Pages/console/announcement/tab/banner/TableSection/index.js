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
  Switch,
} from '@mui/material';
import { Typography } from '@material-ui/core';
import { CircularProgress, Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { useAuth } from 'authentication';
import Router from 'next/router';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, Edit, FileCopy, MoreVert, NavigateBefore, NavigateNext, Visibility } from '@material-ui/icons';
import ModalConfirmation from '../../../modal/ModalConfirmation';

const TableSection = ({ filterList, handleOrder, handlePageChange, handleDeleteFilter, filter, loading, listTickets }) => {
  const { authUser } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState({
    showModal: false,
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

  return (
    <Stack flex={1} width="100%" maxWidth={956}>
      <ModalConfirmation
        showModal={openModal.showModal}
        selectedItem={openModal.selected}
        type="banner"
        onClose={() => {
          setOpenModal({
            showModal: !openModal.showModal,
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
                      if (item.parent === 'search' || item.parent === 'status') {
                        handleDeleteFilter(item.parent, '');
                      } else if (item.parent === 'createdAt') {
                        handleDeleteFilter(item.parent, []);
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

      <TableContainer component={Paper}>
        <ScrollBar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14, width: 180 }}>Judul</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14, width: 120 }}>Tanggal Dibuat</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14, width: 220 }}>URL</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14, width: 100 }}>Dibuat Oleh</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontFamily: 'Lato', fontSize: 14, width: 100 }}>Status Tayang</Typography>
                </TableCell>
                <TableCell align="left" style={{ width: 72 }}></TableCell>
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
                      <Stack direction="row" alignItems="center" gap="15px" width={180}>
                        <Avatar src={item?.bannerLeaderboard + '?m=' + new Date().getTime()} variant="rounded" alt="X" />
                        <Typography
                          style={{
                            fontSize: '14px',
                            width: 140,
                            textTransform: 'capitalize',
                            color: '#00000099',
                            WebkitLineClamp: 2,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            display: '-webkit-box',
                          }}>
                          akodsadosak dsodk oak oskdo sakdo kasdoas kdo
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '14px', width: 120, color: '#00000099' }}>
                        {moment().format('DD/MM/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: '14px',
                          width: 220,
                          color: '#00000099',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}>
                        https://kaodkwokdoa.doawkdoadk.kdokaowkd
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{ fontSize: '14px', width: 100, textTransform: 'capitalize', color: '#00000099' }}>
                        joko
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" width={100}>
                        <Switch checked={false} color="secondary" />
                      </Stack>
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
                        <MenuItem
                          onClick={() => {
                            handleCloseMenu();
                            Router.push(`/announcement/banner/${item?._id}`);
                          }}
                          disabled={!access?.find((item) => item?.nameModule === 'challenge')?.acces?.updateAcces}>
                          <ListItemIcon>
                            <Edit />
                          </ListItemIcon>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleCloseMenu();
                            setOpenModal({
                              showModal: !openModal.showModal,
                              selected: item?._id,
                            });
                          }}
                          disabled={!access?.find((item) => item?.nameModule === 'challenge')?.acces?.deleteAcces}>
                          <ListItemIcon>
                            <Delete />
                          </ListItemIcon>
                          <ListItemText>Hapus</ListItemText>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Notifikasi Push</Typography>
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
