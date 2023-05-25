import { Typography } from '@material-ui/core';
import { Add, Edit, NavigateBefore, NavigateNext } from '@material-ui/icons';
import {
  Button,
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
import { useGetAdsPlaceListQuery } from 'api/console/utilitas/ads';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ScrollBar from 'react-perfect-scrollbar';

const AdsPlace = () => {
  const [payload, setPayload] = useState({ limit: 5, page: 0 });
  const { data: listPlace, isFetching: loadingUtility } = useGetAdsPlaceListQuery(payload);

  useEffect(() => {
    if (payload.page >= 1 && listPlace?.data?.length < 1) {
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
        <Typography variant="h2">Penempatan Iklan</Typography>
        <Button variant="contained" color="secondary" startIcon={<Add fontSize="16px" />} style={{ padding: '8px 12px' }}>
          <Typography variant="subtitle2">Tambah</Typography>
        </Button>
      </Stack>
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
                  <TableCell>Nama</TableCell>
                  <TableCell>Deskripsi</TableCell>
                  <TableCell>Tipe Iklan</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {listPlace?.data?.length >= 1 ? (
                  listPlace?.data?.map((item, i) => (
                    <TableRow key={i} hover>
                      <TableCell>
                        <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                          {item?.namePlace || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                          {item?.descPlace || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" style={{ fontSize: '12px', width: 200 }}>
                          {item?.nameType || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" gap={1} minWidth={80}>
                          <IconButton color="secondary" onClick={() => {}}>
                            <Edit />
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
        )}
      </TableContainer>
      {listPlace?.data?.length >= 1 && !loadingUtility && (
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
            disabled={listPlace?.data?.length < 5}>
            <NavigateNext />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default AdsPlace;
