import { Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
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
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const AdsPlace = () => {
  const { data: listPlace, isFetching: loadingUtility, refetch } = useGetAdsPlaceListQuery();

  return (
    <Stack direction="column" spacing={2} height="100%">
      <Typography variant='h2'>Ads Place</Typography>
      {loadingUtility ? (
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
                  <TableCell>Nama</TableCell>
                  <TableCell align="left">Deskripsi</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {listPlace?.length >= 1 ? (
                  listPlace?.map((item, i) => (
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
                      <TableCell>
                        <Stack direction="row" gap={1} width={80}>
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
        </TableContainer>
      )}
    </Stack>
  );
};

export default AdsPlace;
