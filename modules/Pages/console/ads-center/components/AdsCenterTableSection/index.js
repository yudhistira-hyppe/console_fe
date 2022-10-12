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
  Button
} from '@material-ui/core';
import { Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  ticketHover: {
    maxWidth: 180,
    '& p': {
      fontSize: 12,
    },
  },
}));

const AdsCenterTableSection = ({ order, page, handleOrder, handlePageChange, listAds, filter, onResetFilter }) => {
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
      <Stack flex={1}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={5}>
          
          <Box flex={1} flexDirection={'column'} justifyContent={'center'} display={'flex'}>
            <Typography>
              Menampilkan {listAds?.totalrow || 0} hasil ({listAds?.page + 1 | 0}-{listAds?.totalrow | 0} dari{' '}
              {listAds?.totalallrow | 0})
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
                <MenuItem value={'true'}>Terbaru</MenuItem>
                <MenuItem value={'false'}>Terlama</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <Stack className="mt-3 mb-3" direction="row" spacing={1}>
            <div>
                {
                    filter?.status &&
                    <Chip label={filter.status} onDelete={() => onResetFilter('status')} />
                }
            </div>
            <div>
                {
                    filter?.penggunaan_kredit &&
                    <Chip label={filter.penggunaan_kredit} onDelete={() => onResetFilter('penggunaan_kredit')} />
                }
            </div>
            <div>
                {
                    filter?.status || filter?.penggunaan_kredit ?
                    <Button variant="text" color="primary" onClick={() => onResetFilter('all')}>Hapus Semua</Button>
                    : null
                }
            </div>
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="basic-table">
            <TableHead>
              <TableRow>
                <TableCell width={30}>Waktu Pembuatan</TableCell>
                <TableCell width={230} align="left">
                  Iklan
                </TableCell>
                <TableCell align="left">
                  Tipe
                </TableCell>
                <TableCell align="left">
                  Penempatan
                </TableCell>
                <TableCell align="left">
                  Kredit Digunakan
                </TableCell>
                <TableCell align="left">
                  Kredit Tersisa
                </TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listAds?.data?.length >= 1 ? (
                listAds?.data?.map((item, key) => (
                  <TableRow
                    hover
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{ cursor: 'pointer' }}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.ticketHover}
                    >
                      <Typography variant="body1">{item?.createdAt}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={1}>
                        <Stack direction="column" justifyContent="center">
                          <Avatar
                            variant="rounded"
                            src={item.ads_img}
                          />
                        </Stack>
                        <Stack direction="column" justifyContent="center">
                            <Typography variant="body1" style={{ fontSize: '12px' }}>
                                {item?.ads_title || '-'}
                            </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.ads_type || '-'}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {item?.ads_placement || '-'}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {
                          item?.ads_credit_used ? 
                          `${new Intl.NumberFormat(['ban', 'id']).format(item.ads_credit_used)} Kredit`
                          :
                          '-'
                        }
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px' }}>
                        {
                          item?.ads_credit_left ? 
                          `${new Intl.NumberFormat(['ban', 'id']).format(item.ads_credit_left)} Kredit`
                          :
                          '-'
                        }
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      {
                        item?.ads_status === 'Tinjau' && (
                        <Chip
                          label={item.ads_status}
                          style={{ fontWeight: 'bold', fontFamily: 'Lato', backgroundColor: 'rgba(230, 9, 75, 0.1)', color: 'rgba(230, 9, 75, 0.85)' }}
                        />
                        )
                      }
                      {
                        item?.ads_status === 'Tayang' && (
                        <Chip
                          label={item.ads_status}
                          style={{ fontWeight: 'bold', fontFamily: 'Lato', backgroundColor: 'rgba(0, 149, 242, 0.2)', color: '#0095F2' }}
                        />
                        )
                      }
                      {
                        item?.ads_status === 'Dijadwalkan' && (
                        <Chip
                          label={item.ads_status}
                          style={{ fontWeight: 'bold', fontFamily: 'Lato', backgroundColor: 'rgba(113, 165, 0, 0.1)', color: '#71A500D9' }}
                        />
                        )
                      }
                      {
                        item?.ads_status === 'Ditolak' && (
                        <Chip
                          label={item.ads_status}
                          style={{ fontWeight: 'bold', fontFamily: 'Lato', backgroundColor: 'rgba(103, 103, 103, 0.1)', color: '#676767D9' }}
                        />
                        )
                      }
                      {
                        item?.ads_status === 'Habis' && (
                        <Chip
                          label={item.ads_status}
                          style={{ fontWeight: 'bold', fontFamily: 'Lato', backgroundColor: 'rgba(255, 140, 0, 0.15)', color: '#FF8C00D9' }}
                        />
                        )
                      }
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
        {listAds && (
          <Stack alignItems={'center'} mt={2}>
            <Pagination page={page} count={listAds?.totalpage} size={'small'} onChange={handlePageChange} />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default AdsCenterTableSection;
