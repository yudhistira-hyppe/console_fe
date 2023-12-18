import React, { useState } from 'react';
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
import { Button, Checkbox, CircularProgress, Divider, IconButton, Pagination, Stack, Switch } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import router from 'next/router';
import ModalConfirmation from '../Modal/ModalConfirmation';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  textTruncate: {
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

const TableSection = ({ filter, filterList, handleOrder, handlePageChange, handleDeleteFilter, loading, listEffect }) => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [singleSelect, setSingleSelect] = useState('');
  const [modal, setModal] = useState({
    visible: false,
    status: 'active',
  });
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listEffect?.data?.map((n, key) => n?._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
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

  function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
      <TableHead>
        <TableRow style={{ height: 70 }}>
          <TableCell>
            <Checkbox
              color="secondary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
              // disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.createAcces}
            />
          </TableCell>
          {selected?.length >= 1 ? (
            <TableCell colSpan={6} style={{ width: 80 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" paddingRight="20px">
                <Stack direction="row" alignItems="center" gap="12px">
                  <Select
                    value={modal.status}
                    size="small"
                    color="secondary"
                    onChange={(e) => setModal({ ...modal, status: e.target.value })}>
                    <MenuItem value="active">Aktifkan</MenuItem>
                    <MenuItem value="disactive">Nonaktifkan</MenuItem>
                    <MenuItem value="delete">Hapus</MenuItem>
                  </Select>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => setModal({ ...modal, visible: !modal.visible })}
                    style={{
                      width: 'fit-content',
                      fontWeight: 700,
                      fontSize: 14,
                      fontFamily: 'Lato',
                      textTransform: 'capitalize',
                    }}>
                    Terapkan
                  </Button>
                </Stack>
                <Typography style={{ color: '#00000099' }}>{selected?.length} Efek telah dipilih</Typography>
              </Stack>
            </TableCell>
          ) : (
            <>
              <TableCell align="left" style={{ width: 320 }}>
                Nama Efek
              </TableCell>
              <TableCell align="left" style={{ width: 320 }}>
                Tanggal Unggah
              </TableCell>
              <TableCell align="left" style={{ width: 220 }}>
                Kategori
              </TableCell>
              <TableCell align="left" style={{ width: 120 }}>
                Status
              </TableCell>
            </>
          )}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <Stack flex={1} width="100%" maxWidth={956}>
      <ModalConfirmation
        showModal={modal.visible}
        onClose={() => {
          setModal({ ...modal, visible: !modal.visible, status: 'active' });
          setSingleSelect('');
        }}
        status={modal.status}
        data1={selected}
        data2={singleSelect}
        isSingle={singleSelect !== ''}
        onConfirm={() => {
          setModal({ ...modal, visible: !modal.visible, status: 'active' });
          setSingleSelect('');
          setSelected([]);
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography style={{ fontWeight: 'bold' }}>Daftar Efek</Typography>
        <Button color="secondary" variant="contained" onClick={() => router.push('/database/effect/create')}>
          Tambah Efek
        </Button>
      </Stack>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mt={5}
        mb={5}
        style={{ gap: 12 }}>
        <Stack direction="row" gap={2} alignItems="center" width={600}>
          {filterList?.length >= 1 ? (
            <ScrollBar style={{ width: 550, height: '100%' }}>
              <Stack direction="row" gap="10px">
                {filterList?.map((item, key) => (
                  <Chip
                    key={key}
                    label={item.value}
                    onDelete={() => {
                      if (item.parent === 'effect' || item.parent === 'status') {
                        handleDeleteFilter(item.parent, '');
                      } else if (item.parent === 'createdAt') {
                        handleDeleteFilter(item.parent, [null, null]);
                      } else if (item.parent === 'category') {
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
              value={filter.order}
              onChange={handleOrder}
              displayEmpty
              color="secondary"
              inputProps={{ 'aria-label': 'Without label' }}
              style={{ backgroundColor: 'white' }}>
              <MenuItem value="desc">Terbaru</MenuItem>
              <MenuItem value="asc">Terlama</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="basic-table">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={listEffect?.data?.length}
          />

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
            ) : listEffect?.data?.length >= 1 ? (
              listEffect?.data?.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  style={{ cursor: 'pointer' }}>
                  <TableCell style={{ maxWidth: 80, width: 80 }}>
                    <Checkbox
                      color="secondary"
                      checked={selected.includes(item?._id)}
                      inputProps={{
                        'aria-labelledby': 'asd',
                      }}
                      onClick={(event) => handleClick(event, item?._id)}
                      disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.createAcces}
                    />
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.hoverCell}
                    style={{ maxWidth: 320, width: 320 }}
                    onClick={() => router.push(`/database/effect/${item?._id}`)}>
                    <Stack direction="row" alignItems="center" gap="15px">
                      <Avatar src={item?.mediaThumUri + '?m=' + new Date().getTime() || ''} variant="rounded" />
                      <Typography
                        variant="body1"
                        style={{ fontSize: '14px', color: '#00000099' }}
                        className={classes.textTruncate}>
                        {item?.namafile || '-'}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 320, width: 320 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.createdAt ? `${moment(item?.createdAt).format('DD/MM/YYYY HH:mm')} WIB` : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 220, width: 220 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.namaCategory || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ maxWidth: 120, width: 120 }}>
                    <Switch
                      color="secondary"
                      checked={item?.status}
                      onChange={(e) => {
                        setModal({ ...modal, visible: !modal.visible, status: e.target.checked ? 'active' : 'disactive' });
                        setSingleSelect(item?._id);
                      }}
                      disabled={
                        selected?.length >= 1 ||
                        !access.find((item) => item?.nameModule === 'database_music')?.acces?.createAcces
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={8}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Daftar Efek</Typography>
                </Stack>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {listEffect?.data?.length >= 1 && !loading && (
        <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
          <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handlePageChange(filter.page + 1)}
            disabled={listEffect?.data?.length < 10}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
