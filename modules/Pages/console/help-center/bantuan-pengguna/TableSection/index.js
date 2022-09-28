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
import { Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import ModalProfilePenerima from '../Modal/ModalProfilePenerima';
import { useRouter } from 'next/router';

const TableSection = ({ order, handleOrder, handlePageChange, listTickets }) => {
  const [isModal, setModal] = React.useState(false);
  const [selectedEmail, setSelectedEmail] = React.useState('');
  const { authUser } = useAuth();
  const router = useRouter();

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
      <Stack flex={1}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={5}>
          <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
            <Typography>
              Menampilkan {listTickets?.totalrow} hasil ({listTickets?.page + 1}-{listTickets?.totalrow} dari{' '}
              {listTickets?.totalallrow})
            </Typography>
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
                <MenuItem value={'all'}>Semua</MenuItem>
                <MenuItem value={'desc'}>Terbaru</MenuItem>
                <MenuItem value={'asc'}>Terlama</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="basic-table">
            <TableHead>
              <TableRow>
                <TableCell>Nomor Tiket</TableCell>
                <TableCell align="left" style={{ maxWidth: 100 }}>
                  Sumber
                </TableCell>
                <TableCell align="left" style={{ width: 125 }}>
                  Kategori
                </TableCell>
                <TableCell align="left" style={{ maxWidth: 60 }}>
                  Level
                </TableCell>
                <TableCell align="left" style={{ maxWidth: 140 }}>
                  Status
                </TableCell>
                <TableCell align="left" style={{ maxWidth: 50 }}>
                  Penerima
                </TableCell>
                <TableCell align="right">Dibuat</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listTickets?.data?.length >= 1 ? (
                listTickets?.data?.map((item, key) => (
                  <TableRow
                    hover
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => router.push(`/console/help-center/bantuan-pengguna/detail/${item?._id}`)}
                    style={{ cursor: 'pointer' }}>
                    <TableCell component="th" scope="row" style={{ maxWidth: 180 }}>
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.nomortiket}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" style={{ maxWidth: 100 }}>
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.sourceName || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" style={{ width: 125 }}>
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.nameCategory || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" style={{ maxWidth: 60 }}>
                      <Typography variant="body1" style={{ fontSize: '12px', textAlign: 'center' }}>
                        {item?.nameLevel || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" style={{ maxWidth: 140 }}>
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
                    <TableCell align="center" style={{ display: 'flex', justifyContent: 'center' }}>
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
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {moment(item?.datetime).format('lll')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Tidak ada data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {listTickets && (
          <Stack alignItems={'center'} mt={2}>
            <Pagination count={listTickets?.totalpage} size={'small'} onChange={handlePageChange} />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default TableSection;
