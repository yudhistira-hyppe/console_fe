import React, { useEffect, useState } from 'react';
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
  TextField,
  InputAdornment,
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
import { Add, Delete, Edit, Save } from '@material-ui/icons';
import { useGetListSettingsQuery, useUpdateSettingMutation } from 'api/console/utilitas/setting';
import { toast } from 'react-hot-toast';
import ModalSetting from '../Modal/ModalSetting';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';

const TableSection = () => {
  const [query, setQuery] = useState('');
  const {
    data: listSettings,
    isFetching: loadingSetting,
    refetch,
  } = useGetListSettingsQuery(query !== '' ? { jenis: query } : undefined);
  const [openModal, setOpenModal] = useState(false);
  const [kind, setKind] = useState('PPN');
  const [selected, setSelected] = useState({});
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const filteredData = listSettings?.data?.filter((item) => item.jenisdata === kind);

  useEffect(() => {
    setQuery('');
  }, [kind]);

  const categorySetting = () => {
    let category = ['PPN', 'UMUM', 'PPH', 'ADS', 'SCORING', 'LANDINGPAGE'];

    return category?.filter((item) => item !== undefined);
  };

  return (
    <>
      {openModal && (
        <ModalSetting
          open={openModal}
          handleClose={() => {
            setOpenModal(!openModal);
            setSelected({});
          }}
          selected={selected}
        />
      )}

      <Stack flex={1} width="100%" style={{ height: '100%' }}>
        <Stack direction="column" spacing={3} height="100%">
          <Stack direction="row" spacing={3}>
            {categorySetting().map((item, key) => (
              <Button
                key={key}
                variant={kind === item ? 'contained' : 'outlined'}
                color="secondary"
                style={{
                  padding: '12px 4px',
                  width: '100%',
                  maxWidth: 130,
                }}
                onClick={() => {
                  setKind(item);
                  refetch();
                }}>
                <Typography style={{ fontFamily: 'Normal', fontSize: 12 }}>{item}</Typography>
              </Button>
            ))}

            <Stack direction="row" justifyContent="flex-end" height="100%" width="100%" spacing={1} ml="auto">
              <DelayedTextField
                waitForInput={true}
                filterValue={query}
                color="secondary"
                placeholder="Cari Jenis"
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  endAdornment: query?.length >= 1 && (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" edge="end" onClick={() => setQuery('')}>
                        <Delete style={{ fontSize: 20 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 200,
                  input: {
                    height: 44,
                    padding: '0px 8px',
                  },
                }}
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenModal(!openModal)}
                sx={{ height: '100%' }}
                disabled={!access?.find((item) => item?.nameModule === 'utilitas_setting')?.acces?.createAcces}>
                <Add />
              </Button>
            </Stack>
          </Stack>
          {loadingSetting ? (
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
                      <TableCell>Nama Setting</TableCell>
                      <TableCell align="left">Value</TableCell>
                      <TableCell align="left">Tipe Data</TableCell>
                      <TableCell align="left">Catatan</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredData?.length >= 1 ? (
                      filteredData?.map((item, i) => (
                        <TableRow key={i} hover style={{ height: 73 }}>
                          <TableCell>
                            <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                              {item?.jenis || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                              {item?.value?.toString() || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                              {item?.typedata || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                              {item?.remark || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {access?.find((item) => item?.nameModule === 'utilitas_setting')?.acces?.updateAcces && (
                              <Stack direction="row" justifyContent="flex-end" gap={1} width="100%">
                                <IconButton
                                  onClick={() => {
                                    setSelected(item);
                                    setOpenModal(!openModal);
                                  }}>
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

        {/* {listTickets?.data?.length >= 1 && !loading && (
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
      )} */}
      </Stack>
    </>
  );
};

export default TableSection;
