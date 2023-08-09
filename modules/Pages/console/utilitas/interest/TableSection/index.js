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
  Divider,
  Button,
} from '@mui/material';
import { Typography } from '@material-ui/core';
import { CircularProgress, Pagination, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import router from 'next/router';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, Edit, NavigateBefore, NavigateNext } from '@material-ui/icons';
import ModalInterest from '../../Modal/ModalInterest';
import ModalDeleteInterest from '../../Modal/ModalDeleteInterest';

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
  const { authUser } = useAuth();
  const [openModal, setOpenModal] = useState({
    edit: false,
    delete: false,
  });
  const [selected, setSelected] = useState({});
  const classes = useStyles();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  return (
    <>
      <ModalInterest
        open={openModal.edit}
        handleClose={() => {
          setOpenModal({ ...openModal, edit: !openModal.edit });
          setSelected({});
        }}
        data={selected}
      />
      <ModalDeleteInterest
        open={openModal.delete}
        handleClose={() => {
          setOpenModal({ ...openModal, delete: !openModal.delete });
          setSelected({});
        }}
        data={selected}
      />

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
                  <TableCell style={{ width: 160 }}>Icon Interest</TableCell>
                  <TableCell align="left">Interest (ID)</TableCell>
                  <TableCell align="left">Interest (EN)</TableCell>
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
                          <Avatar src={item?.icon} variant="rounded" alt="X" />
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                          {item?.interestNameId || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                          {item?.interestName || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        {access?.find((item) => item?.nameModule === 'utilitas_interest')?.acces?.updateAcces && (
                          <Stack direction="row" justifyContent="flex-end" gap={1} width="100%">
                            <IconButton
                              onClick={() => {
                                setOpenModal({ ...openModal, edit: !openModal.edit });
                                setSelected(item);
                              }}>
                              <Edit />
                            </IconButton>
                            {/* <IconButton
                            onClick={() => {
                              setOpenModal({ ...openModal, delete: !openModal.delete });
                              setSelected(item);
                            }}>
                            <Delete />
                          </IconButton> */}
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Interest</Typography>
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
