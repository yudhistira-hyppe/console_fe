import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Delete, Edit } from '@material-ui/icons';
import Router from 'next/router';
import ScrollBar from 'react-perfect-scrollbar';
import { Typography } from '@material-ui/core';

const TableSection = ({ listTickets }) => {
  return (
    <TableContainer component={Paper}>
      <ScrollBar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 160 }}>Thumbnails</TableCell>
              <TableCell align="left">Nama Bank</TableCell>
              <TableCell align="left">Kode Bank</TableCell>
              <TableCell align="left">Jumlah Digit</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {1 - 1 === 2 ? (
              <TableCell colSpan={8}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <CircularProgress color="secondary" />
                  <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                </Stack>
              </TableCell>
            ) : listTickets?.data?.length >= 1 ? (
              listTickets?.data?.map((item, i) => (
                <TableRow key={i} hover>
                  <TableCell>
                    <Stack direction="row" gap="15px" width={80}>
                      <Avatar
                        src={item?.bankIcon + '?m=' + new Date().getTime() || new Error()}
                        variant="rounded"
                        alt="X"
                        style={{ width: 40, height: 'auto', marginLeft: 12 }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                      {item?.bankname || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                      {item?.bankcode || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                      {item?.jmlDigit || 0}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" width={120}>
                      {item?.isActive ? (
                        <Chip
                          label="Aktif"
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            fontFamily: 'Lato',
                            color: '#71A500D9',
                            backgroundColor: '#71A5001A',
                          }}
                        />
                      ) : (
                        <Chip
                          label="Tidak Aktif"
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            fontFamily: 'Lato',
                            color: '#676767D9',
                            backgroundColor: '#6767671A',
                          }}
                        />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" justifyContent="flex-end">
                      <Stack direction="row">
                        <IconButton onClick={() => Router.replace(`/utilitas?tab=bank&bankcode=${item?.bankcode}`)}>
                          <Edit />
                        </IconButton>
                      </Stack>
                      <Stack direction="row">
                        <IconButton onClick={() => setSelected(item)}>
                          <Delete />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={8}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={368} spacing={2}>
                  <Typography style={{ fontFamily: 'Normal' }}>Tidak ada data.</Typography>
                </Stack>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </ScrollBar>
    </TableContainer>
  );
};

export default TableSection;
