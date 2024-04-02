import React, { useState } from 'react';
import {
  Box,
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
} from '@mui/material';
import { Typography } from '@material-ui/core';
import { CircularProgress, Stack } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, Edit, NavigateBefore, NavigateNext } from '@material-ui/icons';
import Router from 'next/router';
import ModalDeleteBank from '../../Modal/ModalDeleteBank';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: 100,
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
  },
}));

const TableSection = ({ filterList, handlePageChange, handleDeleteFilter, filter, loading, listTickets }) => {
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
  const [selected, setSelected] = useState({});

  return (
    <>
      <ModalDeleteBank open={!isEmpty(selected)} handleClose={() => setSelected({})} data={selected} />

      <Stack flex={1} width="100%" maxWidth={956}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          style={{ gap: 12, marginBottom: 20 }}>
          <Stack direction="row" gap={2} alignItems="center" width="100%">
            {filterList?.length >= 1 ? (
              <ScrollBar style={{ width: '100%', height: '100%' }}>
                <Stack direction="row" gap="10px">
                  {filterList?.map((item, key) => (
                    <Chip
                      key={key}
                      label={item.value}
                      onDelete={() => {
                        if (item.parent === 'name') {
                          handleDeleteFilter(item.parent, '');
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
        </Box>

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
                {loading ? (
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
                          {access?.find((item) => item?.nameModule === 'utilitas_bank')?.acces?.updateAcces && (
                            <Stack direction="row">
                              <IconButton onClick={() => Router.replace(`/utilitas?tab=bank&bankcode=${item?.bankcode}`)}>
                                <Edit />
                              </IconButton>
                            </Stack>
                          )}
                          {access?.find((item) => item?.nameModule === 'utilitas_bank')?.acces?.deleteAcces && (
                            <Stack direction="row">
                              <IconButton onClick={() => setSelected(item)}>
                                <Delete />
                              </IconButton>
                            </Stack>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Master Bank</Typography>
                    </Stack>
                  </TableCell>
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
    </>
  );
};

export default TableSection;
