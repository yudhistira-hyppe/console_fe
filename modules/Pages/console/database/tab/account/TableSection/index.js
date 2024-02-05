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
import { CircularProgress, Divider, IconButton, Pagination, Stack, Switch } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import router from 'next/router';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';
import ScrollBar from 'react-perfect-scrollbar';
import { useUpdateUserCreatorMutation } from 'api/console/database';
import toast from 'react-hot-toast';

const useStyles = makeStyles(() => ({
  textTruncate: {
    WebkitLineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    fontSize: 14,
    width: '100%',
    color: '#00000099',
  },
}));

const TableSection = ({ filterList, handleOrder, handlePageChange, handleDeleteFilter, filter, loading, listTickets }) => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [updateCreator] = useUpdateUserCreatorMutation();

  const handleUpdateCreator = (user, status) => {
    const formData = {
      idUser: user?.iduser,
      creator: status,
    };

    updateCreator(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success(`Berhasil mengubah status creator user`);
      }
    });
  };

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
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
                      if (item.parent === 'username' || item.parent === 'creator') {
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
              <TableRow>
                <TableCell align="left" style={{ maxWidth: 160 }}>
                  Nama
                </TableCell>
                <TableCell align="left" style={{ maxWidth: 100 }}>
                  Jenis Kelamin
                </TableCell>
                <TableCell align="left">Umur</TableCell>
                <TableCell align="left" style={{ maxWidth: 150 }}>
                  Lokasi
                </TableCell>
                <TableCell align="left">Jenis Akun</TableCell>
                <TableCell align="left">Creator</TableCell>
                <TableCell align="left" style={{ width: 150 }}>
                  Tanggal Daftar
                </TableCell>
                <TableCell align="left" style={{ maxWidth: 100 }}>
                  Terakhir Aktif
                </TableCell>
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
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                    style={{ cursor: 'pointer' }}>
                    <TableCell align="left" onClick={() => router.push(`/database/account/${item?.iduser}`)}>
                      <Stack direction="row" alignItems="center" gap="15px" width={200}>
                        <Avatar
                          src={item?.avatar?.mediaEndpoint ? getMediaUri(item?.avatar?.mediaEndpoint) : new Error()}
                          alt={item?.username}
                        />
                        <Stack gap="4px" overflow="hidden" width="100%">
                          <Typography
                            variant="body1"
                            className={classes.textTruncate}
                            title={item?.username || '-'}
                            style={{ WebkitLineClamp: 1 }}>
                            {item?.username || '-'}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ fontSize: '12px', WebkitLineClamp: 1 }}
                            className={classes.textTruncate}
                            title={item?.email || '-'}>
                            {item?.email || '-'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="left" onClick={() => router.push(`/database/account/${item?.iduser}`)}>
                      <Stack direction="row" width={120}>
                        <Typography variant="body1" className={classes.textTruncate}>
                          {(item?.gender === 'MALE' || item?.gender === 'Male' || item?.gender === 'Laki-laki') &&
                            'Laki-laki'}
                          {(item?.gender === 'FEMALE' || item?.gender === 'Female' || item?.gender === 'Perempuan') &&
                            'Perempuan'}
                          {(item?.gender === 'OTHER' || item?.gender === 'Other') && 'Lainnya'}
                          {!item?.gender && 'Lainnya'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left" onClick={() => router.push(`/database/account/${item?.iduser}`)}>
                      <Stack direction="row" width={50}>
                        <Typography variant="body1" className={classes.textTruncate}>
                          {item?.age || 0}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left" onClick={() => router.push(`/database/account/${item?.iduser}`)}>
                      <Stack direction="row" width={120}>
                        <Typography variant="body1" className={classes.textTruncate}>
                          {item?.areas || '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left" onClick={() => router.push(`/database/account/${item?.iduser}`)}>
                      <Stack direction="row" width={120}>
                        <Typography variant="body1" className={classes.textTruncate}>
                          {item?.jenis === 'PREMIUM' && 'Terverifikasi'}
                          {item?.jenis === 'BASIC' && 'Terdaftar'}
                          {item?.jenis === 'GUEST' && 'Tamu'}
                          {!item?.jenis && '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" width={120}>
                        <Switch
                          color="secondary"
                          checked={item?.creator || false}
                          onChange={(e) => handleUpdateCreator(item, e.target.checked)}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell align="left" onClick={() => router.push(`/database/account/${item?.iduser}`)}>
                      <Stack direction="row" width={160}>
                        <Typography variant="body1" className={classes.textTruncate}>
                          {moment(item?.createdAt).format('DD/MM/YY - HH:mm')} WIB
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left" onClick={() => router.push(`/database/account/${item?.iduser}`)}>
                      <Stack direction="row" width={120}>
                        <Typography variant="body1" className={classes.textTruncate}>
                          {item?.lastlogin
                            ? moment(item?.lastlogin).locale('id').startOf('minute').fromNow().replace(' yang ', ' ')
                            : '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <Typography style={{ fontFamily: 'Normal' }}>Tidak ada data</Typography>
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
