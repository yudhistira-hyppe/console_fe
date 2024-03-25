import { Typography } from '@material-ui/core';
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import { FiberManualRecord } from '@material-ui/icons';
import { useGetWebHyppeQuery } from 'api/console/utilitas/setting';
import dayjs from 'dayjs';

const Maintenance = () => {
  const { data: statusWeb, refetch: refetchWeb } = useGetWebHyppeQuery();

  setTimeout(() => {
    refetchWeb();
  }, 300000);

  return (
    <TableContainer component={Paper}>
      <ScrollBar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Last Sync</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow hover>
              <TableCell>
                <Stack direction="row" alignItems="center" gap={3}>
                  <Typography style={{ fontFamily: 'normal', fontSize: 14 }}>Website Hyppe</Typography>
                  {statusWeb?.includes('Hyppe - #ShareWhatInspiresYou') ? (
                    <Stack direction="row" alignItems="center" gap={1}>
                      <FiberManualRecord style={{ color: 'green', fontSize: 14 }} />
                      <Typography style={{ fontFamily: 'normal', fontSize: 14 }}>Online</Typography>
                    </Stack>
                  ) : (
                    <Stack direction="row" alignItems="center" gap={1}>
                      <FiberManualRecord style={{ color: 'red', fontSize: 14 }} />
                      <Typography style={{ fontFamily: 'normal', fontSize: 14 }}>Offline</Typography>
                    </Stack>
                  )}
                </Stack>
              </TableCell>
              <TableCell>
                <Typography style={{ fontFamily: 'normal', fontSize: 14 }}>
                  {dayjs().format('DD/MM/YYYY - HH:mm:ss')} WIB
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollBar>
    </TableContainer>
  );
};

export default Maintenance;
