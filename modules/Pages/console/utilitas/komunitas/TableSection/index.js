import React from 'react';
import {
  Avatar,
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
import ScrollBar from 'react-perfect-scrollbar';
import { Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';

const TableSection = ({ loading, listData }) => {
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
  const router = useRouter();
  const { authUser } = useAuth();

  const getAvatar = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  return (
    <TableContainer component={Paper} style={{ height: '100%' }}>
      <ScrollBar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Nama Jenis</TableCell>
              <TableCell align="left">Waktu Dibuat</TableCell>
              <TableCell align="left">Terakhir Diperbarui</TableCell>
              <TableCell align="left">Diajukan Oleh</TableCell>
              <TableCell align="left">Disetujui Oleh</TableCell>
              <TableCell align="left">Waktu Disetujui</TableCell>
              <TableCell align="left">Waktu Ditolak</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>

          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={8}>
                  <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                    <CircularProgress color="secondary" />
                    <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {listData?.data?.length >= 1 ? (
                listData?.data?.map((item, i) => (
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
                        {item?.name || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="column">
                        <Typography variant="body1" style={{ fontSize: 12, width: 100 }}>
                          {dayjs(item?.createdAt).format('DD/MM/YYYY')} -
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: 12, width: 100 }}>
                          {dayjs(item?.createdAt).format('HH:mm')} WIB
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="column">
                        <Typography variant="body1" style={{ fontSize: 12, width: 130 }}>
                          {dayjs(item?.updatedAt).format('DD/MM/YYYY')} -
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: 12, width: 130 }}>
                          {dayjs(item?.updatedAt).format('HH:mm')} WIB
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Avatar src={getAvatar(item?.creatorAvatar?.mediaEndpoint)} alt={item?.creatorFullname || ''} />
                        <Typography variant="body1" style={{ fontSize: 14, width: 120 }}>
                          {item?.creatorFullname || '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Avatar src={getAvatar(item?.approverAvatar?.mediaEndpoint)} alt={item?.approverFullname || ''} />
                        <Typography variant="body1" style={{ fontSize: 14, width: 120 }}>
                          {item?.approverFullname || '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      {item?.approvedAt ? (
                        <Stack direction="column">
                          <Typography variant="body1" style={{ fontSize: 12, width: 110 }}>
                            {dayjs(item?.approvedAt).format('DD/MM/YYYY')} -
                          </Typography>
                          <Typography variant="body1" style={{ fontSize: 12, width: 110 }}>
                            {dayjs(item?.approvedAt).format('HH:mm')} WIB
                          </Typography>
                        </Stack>
                      ) : (
                        <Typography variant="body1" style={{ fontSize: 12, width: 110 }}>
                          -
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {item?.rejectedAt ? (
                        <Stack direction="column">
                          <Typography variant="body1" style={{ fontSize: 12, width: 110 }}>
                            {dayjs(item?.rejectedAt).format('DD/MM/YYYY')} -
                          </Typography>
                          <Typography variant="body1" style={{ fontSize: 12, width: 110 }}>
                            {dayjs(item?.rejectedAt).format('HH:mm')} WIB
                          </Typography>
                        </Stack>
                      ) : (
                        <Typography variant="body1" style={{ fontSize: 12, width: 110 }}>
                          -
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" width={90}>
                        {item?.status === 'APPROVED' && (
                          <Chip
                            label="Live"
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              fontFamily: 'Normal',
                              color: '#71A500D9',
                              backgroundColor: '#71A5001A',
                            }}
                          />
                        )}
                        {item?.status === 'SUBMITTED' && (
                          <Chip
                            label="Diajukan"
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              fontFamily: 'Normal',
                              color: '#E6094BD9',
                              backgroundColor: '#E6094B1A',
                            }}
                          />
                        )}
                        {item?.status === 'DRAFT' && (
                          <Chip
                            label="Draft"
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              fontFamily: 'Normal',
                              color: '#FF8C00D9',
                              backgroundColor: '#FF8C0026',
                            }}
                          />
                        )}
                        {item?.status === 'REJECTED' && (
                          <Chip
                            label="Ditolak"
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              fontFamily: 'Normal',
                              color: '#676767',
                              backgroundColor: '#6767671a',
                            }}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {access?.find((item) => item?.nameModule === 'utilitas_setting')?.acces?.updateAcces && (
                        <Stack direction="row" justifyContent="flex-end" gap={1} width="100%">
                          <IconButton
                            onClick={() =>
                              router.push({ pathname: '/utilitas', query: { tab: 'community', _id: item?._id } })
                            }
                            disabled={
                              !access?.find((item) => item?.nameModule === 'community_support')?.acces?.updateAcces ||
                              item?.status === 'SUBMITTED' ||
                              item?.status === 'REJECTED'
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
                      <Typography style={{ fontFamily: 'Normal' }}>Tidak ada data</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </ScrollBar>
    </TableContainer>
  );
};

export default TableSection;
