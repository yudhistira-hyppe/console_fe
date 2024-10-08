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
import { Button, Checkbox, CircularProgress, Divider, IconButton, Pagination, Stack, Tooltip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import router from 'next/router';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { Add, Check, Delete, NavigateBefore, NavigateNext, Remove } from '@material-ui/icons';
import ScrollBar from 'react-perfect-scrollbar';
import Axios from 'axios';

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
  handleOrder,
  handlePageChange,
  handleDeleteFilter,
  filter,
  loading,
  loadingAll,
  listUser,
  listAllUser,
  selected,
  setSelected,
}) => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [hoverRemove, setHoverRemove] = useState({ show: false, id: null });
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setCheckAll(false);
  }, [loadingAll]);

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected?.map((item) => item?.iduser).indexOf(id?.iduser);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setCheckAll(true);

      const allSelected = listAllUser?.data?.map((n) => n);

      const newSelected = allSelected?.filter((bot) => {
        if (!selected?.map((item) => item?._id).includes(bot?._id)) {
          return bot;
        } else {
          return;
        }
      });

      setSelected([...selected, ...newSelected]);
      return;
    }
    setCheckAll(false);

    const allSelected = listAllUser?.data?.map((n) => n);

    const newSelected = selected?.filter((bot) => {
      if (allSelected?.map((item) => item?._id).includes(bot?._id)) {
        return;
      } else {
        return bot;
      }
    });

    setSelected([...newSelected]);
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
                      if (item.parent === 'username') {
                        handleDeleteFilter(item.parent, '');
                      } else if (item.parent === 'age') {
                        handleDeleteFilter('clearAge', '');
                      } else if (item.parent === 'area') {
                        handleDeleteFilter(item.parent, JSON.stringify({ name: item.value }));
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
              <TableRow style={{ height: 70 }}>
                <TableCell colSpan={10}>
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Tooltip
                      title={
                        loadingAll
                          ? 'Loading mendapatkan data...'
                          : filterList?.length < 1
                          ? 'Hanya berlaku untuk data filter'
                          : 'Pilih Semua'
                      }>
                      <div>
                        <Checkbox
                          color="secondary"
                          indeterminate={selected.length > 0 && selected.length !== listAllUser?.data?.length && !checkAll}
                          checked={(selected.length > 0 && selected.length === listAllUser?.data?.length) || checkAll}
                          onChange={handleSelectAllClick}
                          inputProps={{
                            'aria-label': 'select all desserts',
                          }}
                          disabled={loadingAll || filterList?.length < 1}
                        />
                      </div>
                    </Tooltip>
                    <Typography style={{ fontWeight: 'bold', color: '#00000099' }}>
                      Partisipan Terpilih ({selected?.length})
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableHead>
              <TableRow>
                <TableCell align="left">Nama</TableCell>
                <TableCell align="left">Tanggal Daftar</TableCell>
                <TableCell align="left">Terakhir Aktif</TableCell>
                <TableCell align="left">Jenis Kelamin</TableCell>
                <TableCell align="left">Umur</TableCell>
                <TableCell align="left">Lokasi</TableCell>
                <TableCell align="left">Jenis Akun</TableCell>
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
              ) : listUser?.data?.length >= 1 ? (
                listUser?.data?.map((item, i) => (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap="15px" width={320}>
                        <Checkbox
                          color="secondary"
                          checked={selected?.map((item) => item?.iduser).includes(item?.iduser)}
                          inputProps={{
                            'aria-labelledby': 'asd',
                          }}
                          onClick={(event) => handleClick(event, item)}
                        />
                        <Avatar src={getMediaUri(item?.avatar?.mediaEndpoint)} />
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
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{ fontSize: '12px', textOverflow: 'ellipsis', width: 140, overflow: 'hidden' }}>
                        {moment(item?.createdAt).utc().format('DD/MM/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ width: 150, fontSize: '12px' }}>
                        {item?.lastlogin
                          ? moment(item?.lastlogin).locale('id').startOf('minute').fromNow().replace(' yang ', ' ')
                          : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{ fontSize: '12px', textOverflow: 'ellipsis', width: 120, overflow: 'hidden' }}>
                        {item?.gender === 'MALE' && 'Laki-laki'}
                        {item?.gender === 'FEMALE' && 'Perempuan'}
                        {item?.gender === 'OTHER' && 'Lainnya'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.age || 0}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: '12px',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          width: 200,
                        }}>
                        {item?.areas || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ width: 160, fontSize: '12px' }}>
                        {item?.jenis === 'BASIC' && 'Tidak Terverifikasi'}
                        {item?.jenis === 'PREMIUM' && 'Terverifikasi'}
                        {!item?.jenis && '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={selected?.map((item) => item?.iduser).includes(item?.iduser) ? 'outlined' : 'contained'}
                        color={hoverRemove.show && item?.iduser === hoverRemove?.id ? 'error' : 'secondary'}
                        endIcon={
                          selected?.map((item) => item?.iduser).includes(item?.iduser) ? (
                            hoverRemove.show && item?.iduser === hoverRemove?.id ? (
                              <Remove style={{ fontSize: 20 }} />
                            ) : (
                              <Check style={{ fontSize: 20 }} />
                            )
                          ) : (
                            <Add style={{ fontSize: 20 }} />
                          )
                        }
                        onClick={(event) => {
                          handleClick(event, item);
                          setHoverRemove({ show: false, id: null });
                        }}
                        onMouseEnter={() => {
                          if (selected?.map((item) => item?.iduser).includes(item?.iduser)) {
                            setHoverRemove({ show: true, id: item?.iduser });
                          }
                        }}
                        onMouseLeave={() => {
                          if (selected?.map((item) => item?.iduser).includes(item?.iduser)) {
                            setHoverRemove({ show: false, id: null });
                          }
                        }}
                        style={{ width: 110 }}>
                        <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                          {selected?.map((item) => item?.iduser).includes(item?.iduser)
                            ? hoverRemove.show && item?.iduser === hoverRemove?.id
                              ? 'Batalkan'
                              : 'Ditarget'
                            : 'Tambah'}
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={8}>
                  <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                    <Typography style={{ fontFamily: 'Normal' }}>Tidak ada data user</Typography>
                  </Stack>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </ScrollBar>
      </TableContainer>
      {listUser?.data?.length >= 1 && !loading && (
        <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
          <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handlePageChange(filter.page + 1)}
            disabled={listUser?.data?.length < 10}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
