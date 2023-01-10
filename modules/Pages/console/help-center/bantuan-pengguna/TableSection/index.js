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
import { CircularProgress, Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import ModalProfilePenerima from '../Modal/ModalProfilePenerima';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  ticketHover: {
    width: 180,
    '&:hover': {
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

const TableSection = ({
  filterList,
  handleDeleteFilter,
  order,
  page,
  handleOrder,
  handlePageChange,
  listTickets,
  loading,
}) => {
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
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={5}>
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
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ backgroundColor: '#FFFFFF' }}>
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>Nomor Tiket</TableCell>
                <TableCell align="left" style={{ width: 120 }}>
                  Tanggal Tiket
                </TableCell>
                <TableCell align="left" style={{ width: 80 }}>
                  Sumber
                </TableCell>
                <TableCell align="left" style={{ width: 140 }}>
                  Kategori
                </TableCell>
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
                  <TableRow
                    hover
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{ cursor: 'pointer' }}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.ticketHover}
                      onClick={() => router.push(`/help-center/bantuan-pengguna/detail/${item?._id}`)}
                      style={{ maxWidth: 150 }}
                      title={item?.nomortiket}>
                      <Typography variant="body1" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item?.nomortiket}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 80 }}>
                        {moment(item?.datetime).utc().format('DD/MM/YY - HH:mm')} WIB
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 80 }}>
                        {item?.sourceName || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 140 }}>
                        {item?.nameCategory || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', textAlign: 'center' }}>
                        {item?.nameLevel || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {item?.status === 'onprogress' && (
                        <Chip
                          label="Dalam Proses"
                          style={{ backgroundColor: 'rgba(255, 140, 0, 0.15)', color: '#FF8C00D9' }}
                        />
                      )}
                      {item?.status === 'close' && (
                        <Chip label="Selesai" style={{ backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9' }} />
                      )}
                      {item?.status === 'new' && (
                        <Chip label="Baru" style={{ backgroundColor: '#E6094B1A', color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      {item?.penerima ? (
                        <Avatar
                          src={getMediaUri(item?.avatar?.mediaEndpoint)}
                          onClick={() => {
                            setSelectedEmail(item?.penerima);
                            setModal(!isModal);
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <Avatar />
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
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={7} align="center">
                  Tidak ada data.
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {listTickets?.totalsearch >= 1 && (
          <Stack alignItems={'center'} mt={2}>
            <Pagination page={page} count={listTickets?.totalpage} size={'small'} onChange={handlePageChange} />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default TableSection;
