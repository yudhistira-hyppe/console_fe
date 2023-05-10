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
import { Add, Save } from '@material-ui/icons';
import { useGetListSettingsQuery, useUpdateSettingMutation } from 'api/console/utilitas/setting';
import { toast } from 'react-hot-toast';
import ModalSetting from '../Modal/ModalSetting';

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

const TableSection = () => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const { data: listSettings, isFetching: loadingSetting } = useGetListSettingsQuery();
  const [inputValue, setInputValue] = useState([]);
  const [updateSetting] = useUpdateSettingMutation();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setInputValue(listSettings?.map((item) => item));
  }, [loadingSetting]);

  const checkDisable = (item) => {
    let disable = false;

    const specificInput = inputValue?.find((input) => input?._id === item?._id);

    if (specificInput?.jenis === item?.jenis && specificInput?.value === item?.value) {
      disable = true;
    }

    return disable;
  };

  const handleUpdate = (id, jenis, value) => {
    const formData = {
      jenis,
      value,
    };

    updateSetting({ id, formData }).then((res) => {
      toast.success('Berhasil mengupdate setting');
    });
  };

  return (
    <>
      <ModalSetting open={openModal} handleClose={() => setOpenModal(!openModal)} />

      <Stack flex={1} width="100%" style={{ position: 'relative' }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => setOpenModal(!openModal)}
          sx={{ height: 40, position: 'absolute', top: -70, right: 0 }}>
          <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
            Tambah Setting
          </Typography>
        </Button>

        <TableContainer component={Paper}>
          <ScrollBar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Settings Name</TableCell>
                  <TableCell align="left">Value</TableCell>
                  <TableCell align="left">Catatan</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loadingSetting ? (
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <CircularProgress color="secondary" />
                      <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                    </Stack>
                  </TableCell>
                ) : listSettings?.length >= 1 ? (
                  listSettings?.map((item, i) => (
                    <TableRow key={i} hover>
                      <TableCell>
                        <TextField
                          id={`jenis-${item?.jenis}`}
                          defaultValue={item?.jenis || ''}
                          onChange={(e) =>
                            setInputValue([
                              ...inputValue.filter((input) => input?._id !== item?._id),
                              { ...inputValue.find((input) => input?._id === item?._id), jenis: e.target.value },
                            ])
                          }
                          size="small"
                          color="secondary"
                          placeholder="Input Jenis Setting"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          id={`value-${item?.jenis}`}
                          defaultValue={item?.value || ''}
                          onChange={(e) =>
                            setInputValue([
                              ...inputValue.filter((input) => input?._id !== item?._id),
                              { ...inputValue.find((input) => input?._id === item?._id), value: e.target.value },
                            ])
                          }
                          size="small"
                          color="secondary"
                          placeholder="Input Value Setting"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                          {item?.remark || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" gap={1} width={80}>
                          <IconButton
                            id={`button-${item?.jenis}`}
                            color="secondary"
                            onClick={() =>
                              handleUpdate(
                                item?._id,
                                document.getElementById(`jenis-${item?.jenis}`).value,
                                document.getElementById(`value-${item?.jenis}`).value,
                              )
                            }
                            disabled={checkDisable(item)}>
                            <Save />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell colSpan={8}>
                    <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                      <Typography style={{ fontFamily: 'Normal' }}>Tidak ada Riwayat Settings</Typography>
                    </Stack>
                  </TableCell>
                )}
              </TableBody>
            </Table>
          </ScrollBar>
        </TableContainer>
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
