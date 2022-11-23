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

const TableSection = ({ filterList, handleOrder, handlePageChange, handleDeleteFilter, order, loading, listTickets }) => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [selected, setSelected] = useState([]);

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
      const newSelected = listTickets?.arrdata?.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="secondary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          <TableCell align="left">Judul</TableCell>
          <TableCell align="left">Nama Artis</TableCell>
          <TableCell align="left">Album</TableCell>
          <TableCell align="left">Tanggal Dibuat</TableCell>
          <TableCell align="left">Tanggal Diubah</TableCell>
          <TableCell align="left">Status</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  console.log(selected);

  return (
    <Stack flex={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography style={{ fontWeight: 'bold' }}>Daftar Musik</Typography>
        <Button color="secondary" variant="contained" onClick={() => router.push('/database/media/create')}>
          Tambah Musik
        </Button>
      </Stack>

      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mt={6} mb={3}>
        <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
          {loading ? (
            <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
          ) : (
            <Typography style={{ fontFamily: 'Normal' }}>
              Menampilkan {listTickets?.total} hasil (
              {listTickets?.totalsearch >= 1 ? listTickets?.page * 10 + 1 : listTickets?.page * 10} -{' '}
              {listTickets?.total + listTickets?.page * 10} dari {listTickets?.totalsearch})
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
              if (item.parent === 'song' || item.parent === 'artist') {
                handleDeleteFilter(item.parent, '');
              } else if (item.parent === 'createdAt') {
                handleDeleteFilter(item.parent, [null, null]);
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
            rowCount={listTickets?.arrdata?.length}
          />

          <TableBody>
            {loading ? (
              <TableCell colSpan={8}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <CircularProgress color="secondary" />
                  <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                </Stack>
              </TableCell>
            ) : listTickets?.arrdata?.length >= 1 ? (
              listTickets?.arrdata?.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  style={{ cursor: 'pointer' }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="secondary"
                      checked={selected.includes(item?.name)}
                      inputProps={{
                        'aria-labelledby': 'asd',
                      }}
                      onClick={(event) => handleClick(event, item?.name)}
                    />
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => router.push(`/database/media/${item?._id}`)}
                    className={classes.hoverCell}>
                    <Stack direction="row" alignItems="center" gap="15px">
                      <Avatar src={getImage(item)} variant="rounded" />
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
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      Justin Timberlek
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      Nganjuk
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment().format('DD/MM/YY')}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                      {moment().format('DD/MM/YY')}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Switch color="secondary" />
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
      {listTickets?.totalsearch >= 1 && (
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
