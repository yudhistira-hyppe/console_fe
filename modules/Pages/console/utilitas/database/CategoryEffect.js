import { Typography } from '@material-ui/core';
import { Add, Delete, Edit, NavigateBefore, NavigateNext } from '@material-ui/icons';
import {
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
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ScrollBar from 'react-perfect-scrollbar';
import { formatNumber } from 'helpers/stringHelper';
import { useGetCategoryEffectQuery } from 'api/console/database';
import ModalCategoryEffect from '../Modal/ModalCategoryEffect';
import ModalDeleteCategoryEffect from '../Modal/ModalDeleteCategoryEffect';

const CategoryEffect = () => {
  const [payload, setPayload] = useState({ limit: 5, page: 0, ascending: false });
  const [openModal, setOpenModal] = useState({
    delete: false,
    create: false,
  });
  const [selected, setSelected] = useState({});
  const { data: listCategory, isFetching: loadingUtility } = useGetCategoryEffectQuery(payload);

  useEffect(() => {
    if (payload.page >= 1 && listCategory?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setPayload((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [payload, loadingUtility]);

  return (
    <Stack direction="column" spacing={2} height="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Kategori Efek</Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add fontSize="16px" />}
          onClick={() => {
            setOpenModal({ ...openModal, create: true });
            setSelected({});
          }}
          style={{ padding: '8px 12px' }}>
          <Typography variant="subtitle2">Tambah</Typography>
        </Button>
      </Stack>

      <ModalCategoryEffect
        open={openModal.create}
        handleClose={() => {
          setOpenModal({ ...openModal, create: false });
          setSelected({});
        }}
        data={selected}
      />

      <ModalDeleteCategoryEffect
        open={openModal.delete}
        handleClose={() => {
          setOpenModal({ ...openModal, delete: false });
          setSelected({});
        }}
        data={selected}
      />

      <TableContainer component={Paper} style={{ minHeight: 422 }}>
        {loadingUtility ? (
          <Stack direction="column" alignItems="center" justifyContent="center" height={422} spacing={2}>
            <CircularProgress color="secondary" />
            <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
          </Stack>
        ) : (
          <ScrollBar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama Kategori</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {listCategory?.data?.length >= 1 ? (
                  listCategory?.data?.map((item, i) => (
                    <TableRow key={i} hover>
                      <TableCell>
                        <Typography variant="body1" style={{ fontSize: '12px', width: 100 }}>
                          {item?.name || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" justifyContent="flex-end" gap={1}>
                          <Stack direction="row" minWidth={40}>
                            <IconButton
                              onClick={() => {
                                setSelected(item);
                                setOpenModal({ ...openModal, create: true });
                              }}>
                              <Edit />
                            </IconButton>
                          </Stack>
                          <Stack direction="row" minWidth={40}>
                            <IconButton
                              onClick={() => {
                                setSelected(item);
                                setOpenModal({ ...openModal, delete: true });
                              }}>
                              <Delete />
                            </IconButton>
                          </Stack>
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
        )}
      </TableContainer>
      {listCategory?.data?.length >= 1 && !loadingUtility && (
        <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
          <IconButton
            color="secondary"
            onClick={() =>
              setPayload((prevVal) => {
                return { ...prevVal, page: prevVal.page - 1 };
              })
            }
            disabled={payload.page < 1}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() =>
              setPayload((prevVal) => {
                return { ...prevVal, page: prevVal.page + 1 };
              })
            }
            disabled={listCategory?.data?.length < 5}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default CategoryEffect;
