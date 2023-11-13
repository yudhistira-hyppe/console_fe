import React, { useState } from 'react';
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
  Chip,
} from '@material-ui/core';
import { Button, CircularProgress, Divider, IconButton, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import moment from 'moment';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import ScrollBar from 'react-perfect-scrollbar';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';
import ModalTopup from '../Modal/modal-topup';
import { useAuth } from 'authentication';

const TableSection = ({
  filter,
  handleOrder,
  handlePageChange,
  loading,
  listTransaction,
  filterList,
  handleDeleteFilter,
}) => {
  const [openModal, setOpenModal] = useState({
    open: false,
    selected: '',
    status: '',
  });
  const { authUser } = useAuth();

  return (
    <>
      <ModalTopup
        open={openModal.open}
        selected={openModal.selected}
        status={openModal.status}
        handleClose={() => setOpenModal({ open: false, selected: '', status: '' })}
      />

      <Stack flex={1} width="100%" maxWidth={956}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          style={{ gap: 12 }}>
          <Stack direction="row" gap={2} alignItems="center" width={600}>
            {filterList?.length >= 1 ? (
              <ScrollBar style={{ width: 550, height: '100%' }}>
                <Stack direction="row" gap="10px">
                  {filterList?.map((item, key) => (
                    <Chip
                      key={key}
                      label={item.value}
                      onDelete={() => {
                        if (item.parent === 'createdAt') {
                          handleDeleteFilter(item.parent, [null, null]);
                        } else if (item.parent === 'search' || item.parent === 'createdBy') {
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

          <Divider orientation="vertical" flexItem />

          <Stack direction={'row'} spacing={2} style={{ flex: 1 }} justifyContent={'flex-end'}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
              <Typography>Urutkan</Typography>
            </Box>
            <FormControl sx={{ m: 1, minWidth: '30%' }} size="small">
              <Select
                value={filter.descending}
                onChange={handleOrder}
                displayEmpty
                color="secondary"
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ backgroundColor: 'white', width: 180 }}>
                <MenuItem value={'date-true'}>Tanggal (Terbaru)</MenuItem>
                <MenuItem value={'date-false'}>Tanggal (Terlama)</MenuItem>
                <MenuItem value={'email-false'}>Email (A - Z)</MenuItem>
                <MenuItem value={'email-true'}>Email (Z - A)</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <TableContainer component={Paper}>
          <ScrollBar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tanggal Buat</TableCell>
                  <TableCell align="left">Dibuat Oleh</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">NPWP</TableCell>
                  <TableCell align="left">Jumlah Topup</TableCell>
                  <TableCell align="left">Pajak PPH</TableCell>
                  <TableCell align="left">Total</TableCell>
                  <TableCell align="left">Persetujuan Strategy</TableCell>
                  <TableCell align="left">Persetujuan Finance</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                        <CircularProgress color="secondary" />
                        <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : listTransaction?.data?.length >= 1 ? (
                  listTransaction?.data?.map((item, key) => (
                    <TableRow key={key} hover>
                      <TableCell>
                        <Typography variant="body1" style={{ fontSize: '12px', width: 140 }}>
                          {moment(item?.createdAt).utc().format('DD/MM/YY - HH:mm')} WIB
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                          {item?.createByUsername || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          variant="body1"
                          style={{
                            fontSize: '12px',
                            width: 170,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                          }}
                          title={item?.email || '-'}>
                          {item?.email || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          variant="body1"
                          style={{
                            fontSize: '12px',
                            width: 140,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                          }}
                          title={item?.username}>
                          {item?.username || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 80 }}>
                          {item?.npwp === 'YES' ? 'Ya' : 'Tidak'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                          Rp {numberWithCommas(item?.topup || 0)}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                          Rp {numberWithCommas(item?.pph || 0)}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 120 }}>
                          Rp {numberWithCommas(item?.total || 0)}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Stack width={220}>
                          {item?.status === 'DELETE' || item?.status === 'FAILED' ? (
                            <Chip
                              label="Ditolak"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                backgroundColor: 'rgba(103, 103, 103, 0.1)',
                                color: '#676767D9',
                                width: 'fit-content',
                              }}
                            />
                          ) : item?.approveByStrategy ? (
                            <Chip
                              label="Disetujui"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                color: '#71A500D9',
                                backgroundColor: '#71A5001A',
                                width: 'fit-content',
                              }}
                            />
                          ) : authUser?.user?.group === 'Head Of Strategy' ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              style={{ height: 32 }}
                              onClick={() =>
                                setOpenModal({ open: !openModal.open, selected: item?._id, status: 'strategy' })
                              }>
                              <Typography style={{ fontWeight: 'bold', fontSize: 12 }}>Tindak Lanjut</Typography>
                            </Button>
                          ) : (
                            <Chip
                              label="Menunggu Persetujuan"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                color: '#0095F2',
                                backgroundColor: '#0095F233',
                                width: 'fit-content',
                              }}
                            />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack width={220}>
                          {item?.status === 'DELETE' || item?.status === 'FAILED' ? (
                            <Chip
                              label="Ditolak"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                backgroundColor: 'rgba(103, 103, 103, 0.1)',
                                color: '#676767D9',
                                width: 'fit-content',
                              }}
                            />
                          ) : item?.approveByFinance ? (
                            <Chip
                              label="Disetujui"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                color: '#71A500D9',
                                backgroundColor: '#71A5001A',
                                width: 'fit-content',
                              }}
                            />
                          ) : authUser?.user?.group === 'Head Of Finance' ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              style={{ height: 32 }}
                              onClick={() =>
                                setOpenModal({ open: !openModal.open, selected: item?._id, status: 'finance' })
                              }>
                              <Typography style={{ fontWeight: 'bold', fontSize: 12 }}>Tindak Lanjut</Typography>
                            </Button>
                          ) : (
                            <Chip
                              label="Menunggu Persetujuan"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                color: '#0095F2',
                                backgroundColor: '#0095F233',
                                width: 'fit-content',
                              }}
                            />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack width={150}>
                          {item?.status === 'NEW' && (
                            <Chip
                              label="Baru"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                color: '#E6094BD9',
                                backgroundColor: '#E6094B1A',
                                width: 'fit-content',
                              }}
                            />
                          )}
                          {item?.status === 'PROCESS' && (
                            <Chip
                              label="Proses"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                color: '#0095F2',
                                backgroundColor: '#0095F233',
                                width: 'fit-content',
                              }}
                            />
                          )}
                          {item?.status === 'SUCCESS' && (
                            <Chip
                              label="Berhasil"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                backgroundColor: 'rgba(113, 165, 0, 0.1)',
                                color: '#71A500D9',
                                width: 'fit-content',
                              }}
                            />
                          )}
                          {item?.status === 'DELETE' && (
                            <Chip
                              label="Ditolak"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                backgroundColor: 'rgba(103, 103, 103, 0.1)',
                                color: '#676767D9',
                                width: 'fit-content',
                              }}
                            />
                          )}
                          {item?.status === 'FAILED' && (
                            <Chip
                              label="Gagal Sistem"
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'Lato',
                                backgroundColor: 'rgba(103, 103, 103, 0.1)',
                                color: '#676767D9',
                                width: 'fit-content',
                              }}
                            />
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                )}
                {listTransaction?.data?.length >= 1 && <TableRow style={{ height: 15 }}></TableRow>}
              </TableBody>
            </Table>
          </ScrollBar>
        </TableContainer>
        {listTransaction?.data?.length >= 1 && !loading && (
          <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
            <IconButton color="secondary" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page < 1}>
              <NavigateBefore />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handlePageChange(filter.page + 1)}
              disabled={listTransaction?.data?.length < 10}>
              <NavigateNext />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default TableSection;
