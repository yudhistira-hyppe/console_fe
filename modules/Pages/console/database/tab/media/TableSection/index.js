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
import { Button, Checkbox, CircularProgress, Pagination, Stack, Switch } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import router from 'next/router';
import ModalConfirmation from '../Modal/ModalConfirmation';

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

const TableSection = ({
  filter,
  filterList,
  handleOrder,
  handlePageChange,
  handleDeleteFilter,
  order,
  loading,
  listMusic,
}) => {
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
      const newSelected = listMusic?.data?.map((n) => n._id);
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
              disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.createAcces}
            />
          </TableCell>
          {selected?.length >= 1 ? (
            <TableCell colSpan={6}>
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
                <Typography style={{ color: '#00000099' }}>{selected?.length} Musik telah dipilih</Typography>
              </Stack>
            </TableCell>
          ) : (
            <>
              <TableCell align="left">Judul</TableCell>
              <TableCell align="left">Nama Artis</TableCell>
              <TableCell align="left">Album</TableCell>
              <TableCell align="left">Tanggal Dibuat</TableCell>
              <TableCell align="left">Tanggal Diubah</TableCell>
              <TableCell align="left">Status</TableCell>
            </>
          )}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <Stack flex={1}>
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
        <Typography style={{ fontWeight: 'bold' }}>Daftar Musik</Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => router.push('/database/music/create')}
          disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.createAcces}>
          Tambah Musik
        </Button>
      </Stack>

      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mt={6} mb={3}>
        <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
          {loading ? (
            <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
          ) : (
            <Typography style={{ fontFamily: 'Normal' }}>
              Menampilkan {listMusic?.totalRow} hasil (
              {listMusic?.totalRow >= 1 ? filter.page * 10 + 1 : listMusic?.pageNumber_ * 10} -{' '}
              {listMusic?.pageRow * (filter.page + 1)} dari {listMusic?.totalRow})
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
              <MenuItem value={'desc'}>Terbaru</MenuItem>
              <MenuItem value={'asc'}>Terlama</MenuItem>
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
              if (item.parent === 'song' || item.parent === 'artist') {
                handleDeleteFilter(item.parent, '');
              } else if (item.parent === 'createdAt') {
                handleDeleteFilter(item.parent, [null, null]);
              } else if (item.parent === 'genre' || item.parent === 'theme' || item.parent === 'mood') {
                handleDeleteFilter(item.parent, JSON.stringify({ name: item.value }));
              } else {
                handleDeleteFilter(item.parent, item.value);
              }
            }}
          />
        ))}
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="basic-table">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={listMusic?.data?.length}
          />

          <TableBody>
            {loading ? (
              <TableCell colSpan={8}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <CircularProgress color="secondary" />
                  <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                </Stack>
              </TableCell>
            ) : listMusic?.data?.length >= 1 ? (
              listMusic?.data?.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  style={{ cursor: 'pointer' }}>
                  <TableCell>
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
                    onClick={() => router.push(`/database/music/${item?._id}`)}
                    className={classes.hoverCell}>
                    <Stack direction="row" alignItems="center" gap="15px">
                      <Avatar src={item?.apsaraThumnailUrl} variant="rounded" />
                      <Stack direction="column" gap="2px">
                        <Typography
                          variant="body1"
                          style={{ fontSize: '14px', color: '#00000099' }}
                          className={classes.textTruncate}>
                          {item?.musicTitle || '-'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" style={{ width: 120 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.artistName || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 120 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {item?.albumName || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 130 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment(item?.createdAt).format('DD/MM/YY')}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 130 }}>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment(item?.updatedAt).format('DD/MM/YY')}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" style={{ width: 120 }}>
                    <Switch
                      color="secondary"
                      checked={item?.isActive}
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
                  <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Daftar Musik</Typography>
                </Stack>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {listMusic?.totalRow >= 1 && (
        <Stack alignItems="center" my={3} mr={3}>
          <Pagination
            count={(Number(listMusic?.totalRow) / Number(listMusic?.pageRow)).toFixed(0) || 1}
            page={Number(filter.page) + 1}
            size="small"
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
