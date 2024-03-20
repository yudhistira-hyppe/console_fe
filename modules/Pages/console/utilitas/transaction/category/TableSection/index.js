import React, { useState } from 'react';
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
import { Delete, Edit, NavigateBefore, NavigateNext } from '@material-ui/icons';
import Router from 'next/router';
import ScrollBar from 'react-perfect-scrollbar';
import { Typography } from '@material-ui/core';
import moment from 'moment';

const TableSection = ({ listCategory, loading, handlePageChange, filter }) => {
  const [showModal, setShowModal] = useState({
    open: false,
    selected: '',
  });

  return (
    <Stack direction="column">
      <TableContainer component={Paper}>
        <ScrollBar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tanggal Dibuat</TableCell>
                <TableCell align="left">Code</TableCell>
                <TableCell align="left">COA</TableCell>
                <TableCell align="left">Tipe</TableCell>
                <TableCell align="left">User</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableCell colSpan={8}>
                  <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                    <CircularProgress color="secondary" />
                    <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                  </Stack>
                </TableCell>
              ) : listCategory?.data?.length >= 1 ? (
                listCategory?.data?.map((item, i) => (
                  <TableRow key={i} hover>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 150 }}>
                        {moment(item?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        {item?.code || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        {item?.coa || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        {item?.type?.length >= 1 ? item?.type?.join(', ') : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                        {item?.user || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" justifyContent="flex-end">
                        <Stack direction="row">
                          <IconButton onClick={() => Router.replace(`/utilitas?tab=bank&bankcode=${item?.bankcode}`)}>
                            <Edit />
                          </IconButton>
                        </Stack>
                        <Stack direction="row">
                          <IconButton
                            onClick={() => setShowModal((prevVal) => ({ ...prevVal, open: true, selected: item?._id }))}>
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

      {listCategory?.data?.length >= 1 && !loading && (
        <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
          <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handlePageChange(filter.page + 1)}
            disabled={listCategory?.data?.length < 5}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default TableSection;
