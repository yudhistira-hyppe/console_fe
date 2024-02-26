import { Typography } from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const TableList = () => {
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
  const router = useRouter();

  return (
    <Stack flex={1} direction="row" alignItems="flex-start" spacing={3} height="100%">
      <Stack direction="column" width="100%" maxWidth={270}>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="secondary"
          onClick={() => router.push({ pathname: '/utilitas', query: { tab: 'community', create: true } })}
          sx={{ height: 40 }}
          disabled={!access?.find((item) => item?.nameModule === 'utilitas_setting')?.acces?.createAcces}>
          <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
            Tambah Data
          </Typography>
        </Button>
      </Stack>

      {1 + 1 === 3 ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height="100%" spacing={2}>
          <CircularProgress color="secondary" />
          <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <ScrollBar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Judul</TableCell>
                  <TableCell align="left">Terakhir Diperbarui</TableCell>
                  <TableCell align="left">Diajukan Oleh</TableCell>
                  <TableCell align="left">Disetujui Oleh</TableCell>
                  <TableCell align="left">Waktu Disetujui</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {[{}]?.length >= 1 ? (
                  [{}]?.map((item, i) => (
                    <TableRow key={i} hover style={{ height: 73 }}>
                      <TableCell>
                        <Typography
                          variant="body1"
                          style={{
                            fontSize: 14,
                            width: 200,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                          }}>
                          Panduan Komunitas
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="column">
                          <Typography variant="body1" style={{ fontSize: 12, width: 130 }}>
                            {dayjs().format('DD/MM/YYYY')} -
                          </Typography>
                          <Typography variant="body1" style={{ fontSize: 12, width: 130 }}>
                            {dayjs().format('HH:mm')} WIB
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Avatar src={''} alt="User yang mengajukan" />
                          <Typography variant="body1" style={{ fontSize: 14, width: 80 }}>
                            Paramita S
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Avatar src={''} alt="User yang menyetujui" />
                          <Typography variant="body1" style={{ fontSize: 14, width: 80 }}>
                            Pandji
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="column">
                          <Typography variant="body1" style={{ fontSize: 12, width: 110 }}>
                            {dayjs().format('DD/MM/YYYY')} -
                          </Typography>
                          <Typography variant="body1" style={{ fontSize: 12, width: 110 }}>
                            {dayjs().format('HH:mm')} WIB
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" width={80}>
                          <Chip
                            label="Live"
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              fontFamily: 'Lato',
                              color: '#71A500D9',
                              backgroundColor: '#71A5001A',
                            }}
                          />

                          {/* <Chip
                            label="Draft"
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              fontFamily: 'Lato',
                              color: '#FF8C00D9',
                              backgroundColor: '#FF8C0026',
                            }}
                          /> */}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {access?.find((item) => item?.nameModule === 'utilitas_setting')?.acces?.updateAcces && (
                          <Stack direction="row" justifyContent="flex-end" gap={1} width="100%">
                            <IconButton
                              onClick={() =>
                                router.push({ pathname: '/utilitas', query: { tab: 'community', _id: item?._id } })
                              }>
                              <Edit />
                            </IconButton>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                        <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Settings</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollBar>
        </TableContainer>
      )}
    </Stack>
  );
};

export default TableList;
