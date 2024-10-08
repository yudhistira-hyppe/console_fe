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
  Button,
  TextField,
} from '@mui/material';
import { Typography } from '@material-ui/core';
import { CircularProgress, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from 'authentication';
import ScrollBar from 'react-perfect-scrollbar';
import dayjs from 'dayjs';
import { useGetListAdsSettingQuery } from 'api/console/ads';
import ModalSetting from './modal/ModalSetting';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import ModalCharacteristic from './modal/ModalCharacteristic';

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

const TableSettingAds = () => {
  const [payload, setPayload] = useState({
    type: 'JENIS',
    search: '',
    sort: 'A-Z',
  });
  const [showModal, setShowModal] = useState({
    open: false,
    type: '',
    data: {},
  });
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const { data: listSetting, isFetching: loadingSetting } = useGetListAdsSettingQuery(payload);

  return (
    <Stack flex={1} width="100%">
      <ModalSetting
        open={showModal.open && showModal.type === 'normal'}
        data={showModal.data}
        onClose={() => setShowModal({ open: false, data: {} })}
      />

      {showModal.open && showModal.type === 'characteristic' && (
        <ModalCharacteristic
          open={showModal.open && showModal.type === 'characteristic'}
          data={showModal.data}
          onClose={() => setShowModal({ open: false, data: {} })}
        />
      )}

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ gap: 12, marginBottom: 20 }}>
        <Stack direction="row" gap={2} width="100%">
          <Stack direction="row" widht="100%">
            <FormControl sx={{ minWidth: 150 }} size="small">
              <Select
                value={payload.type}
                onChange={(e) => setPayload({ ...payload, type: e.target.value })}
                displayEmpty
                color="secondary"
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ backgroundColor: 'white' }}>
                <MenuItem value="JENIS">Jenis</MenuItem>
                <MenuItem value="DESKRIPSI">Deskripsi</MenuItem>
              </Select>
            </FormControl>
            <DelayedTextField
              fullWidth
              size="small"
              waitForInput={true}
              placeholder="Cari Nama Iklan"
              filterValue={payload.search}
              onChange={(e) => setPayload({ ...payload, search: e.target.value })}
              sx={{ input: { backgroundColor: 'white', width: 450 } }}
              color="secondary"
            />
          </Stack>
          <Stack direction={'row'} spacing={2} style={{ flex: 1 }}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
              <Typography>Urutkan berdasarkan</Typography>
            </Box>
            <FormControl sx={{ minWidth: 100 }} size="small">
              <Select
                value={payload.sort}
                onChange={(e) => setPayload({ ...payload, sort: e.target.value })}
                displayEmpty
                color="secondary"
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ backgroundColor: 'white' }}>
                <MenuItem value="A-Z">A - Z</MenuItem>
                <MenuItem value="Z-A">Z - A</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <ScrollBar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Jenis</TableCell>
                <TableCell align="left">Nilai</TableCell>
                <TableCell align="left">Unit</TableCell>
                <TableCell align="left">Deskripsi</TableCell>
                <TableCell align="left">Aktifitas</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {access?.map((item) => item?.nameModule)?.includes('ads_setting_list') ? (
                loadingSetting ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                        <CircularProgress color="secondary" />
                        <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : listSetting?.data?.adsSetting?.filter((item) => !item?.Jenis?.toLowerCase()?.includes('weight'))
                    ?.length >= 1 ? (
                  <>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 180 }}>
                          Characteristic Weight
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 30 }}>
                          100
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 80 }}>
                          Persen
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" width="100%" justifyContent="space-between">
                          <Typography variant="body1" style={{ fontSize: '12px', width: 350 }}>
                            Bobot tiap jenis dalam karakteristik audiens
                          </Typography>
                          <Button
                            variant="contained"
                            color="inherit"
                            size="small"
                            sx={{
                              boxShadow: 'none',
                              border: '1px solid transparent',
                              '&:hover': { boxShadow: 'none', border: '1px solid #AB22AF' },
                            }}
                            onClick={() =>
                              setShowModal({
                                open: true,
                                type: 'characteristic',
                                data: listSetting?.data?.adsSetting?.filter((item) =>
                                  item?.Jenis?.toLowerCase()?.includes('weight'),
                                ),
                              })
                            }
                            disabled={!access?.find((item) => item?.nameModule === 'ads_setting_list')?.acces?.updateAcces}>
                            <Typography style={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: 12 }}>
                              Ubah Nilai
                            </Typography>
                          </Button>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="column">
                          <Typography
                            variant="body1"
                            style={{ fontSize: '14px', width: 150, color: '#AB22AF', fontWeight: 'bold' }}>
                            {listSetting?.data?.adsSetting?.find((item) => item?.Jenis === 'AgeCharacteristicWeight')
                              ?.Aktifitas || '-'}
                          </Typography>
                          <Typography variant="body1" style={{ fontSize: '12px', width: 150 }}>
                            {dayjs(
                              listSetting?.data?.adsSetting?.find((item) => item?.Jenis === 'AgeCharacteristicWeight')?.Date,
                            ).format('DD/MM/YYYY - HH:mm')}{' '}
                            WIB
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                    {listSetting?.data?.adsSetting
                      ?.filter((item) => !item?.Jenis?.toLowerCase()?.includes('weight'))
                      ?.map((item, i) => (
                        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '12px', width: 180 }}>
                              {item?.Jenis || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '12px', width: 30 }}>
                              {item?.Nilai || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '12px', width: 80 }}>
                              {item?.Unit || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Stack direction="row" width="100%" justifyContent="space-between">
                              <Typography variant="body1" style={{ fontSize: '12px', width: 350 }}>
                                {item?.Desc || '-'}
                              </Typography>
                              <Button
                                variant="contained"
                                color="inherit"
                                size="small"
                                sx={{
                                  boxShadow: 'none',
                                  border: '1px solid transparent',
                                  '&:hover': { boxShadow: 'none', border: '1px solid #AB22AF' },
                                }}
                                onClick={() => setShowModal({ open: true, type: 'normal', data: item })}
                                disabled={
                                  !access?.find((item) => item?.nameModule === 'ads_setting_list')?.acces?.updateAcces
                                }>
                                <Typography style={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: 12 }}>
                                  Ubah Nilai
                                </Typography>
                              </Button>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            <Stack direction="column">
                              <Typography
                                variant="body1"
                                style={{ fontSize: '14px', width: 150, color: '#AB22AF', fontWeight: 'bold' }}>
                                {item?.Aktifitas || '-'}
                              </Typography>
                              <Typography variant="body1" style={{ fontSize: '12px', width: 150 }}>
                                {dayjs(item?.Date).format('DD/MM/YYYY - HH:mm')} WIB
                              </Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                        <Typography style={{ fontFamily: 'Normal' }}>Tidak ada data setting ads</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <Typography style={{ fontFamily: 'Normal' }}>Kamu tidak memiliki akses untuk fitur ini!</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollBar>
      </TableContainer>
    </Stack>
  );
};

export default TableSettingAds;
