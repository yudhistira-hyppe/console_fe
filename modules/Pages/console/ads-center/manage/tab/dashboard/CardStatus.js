import { Typography } from '@material-ui/core';
import { Box, Card, CircularProgress, Grid, Stack } from '@mui/material';
import React from 'react';

const CardStatus = ({ dataStatus, isLoading }) => {
  const findDataStatus = (status) => dataStatus?.find((item) => item?.status === status)?.count || 0;

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <Stack direction="column" style={{ padding: 24 }}>
        <Typography style={{ fontWeight: 'bold' }}>Status Iklan</Typography>

        <Box height={140}>
          {isLoading ? (
            <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
              <CircularProgress color="secondary" size={28} />
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="space-between" gap={3} height="100%" style={{ padding: '0 36px' }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="flex-end"
                height="100%"
                style={{ paddingBottom: 16 }}>
                <Typography style={{ color: '#3F3F3FDE', fontSize: 32, fontWeight: 'bold' }}>
                  {findDataStatus('DRAFT')}
                </Typography>
                <Typography style={{ color: '#737373', fontSize: 12 }}>Draft</Typography>
              </Stack>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="flex-end"
                height="100%"
                style={{ paddingBottom: 16 }}>
                <Typography style={{ color: '#3F3F3FDE', fontSize: 32, fontWeight: 'bold' }}>
                  {findDataStatus('UNDER_REVIEW')}
                </Typography>
                <Typography style={{ color: '#737373', fontSize: 12 }}>Ditinjau</Typography>
              </Stack>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="flex-end"
                height="100%"
                style={{ paddingBottom: 16 }}>
                <Typography style={{ color: '#3F3F3FDE', fontSize: 32, fontWeight: 'bold' }}>
                  {findDataStatus('ACTIVE')}
                </Typography>
                <Typography style={{ color: '#737373', fontSize: 12 }}>Aktif</Typography>
              </Stack>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="flex-end"
                height="100%"
                style={{ paddingBottom: 16 }}>
                <Typography style={{ color: '#3F3F3FDE', fontSize: 32, fontWeight: 'bold' }}>
                  {findDataStatus('IN_ACTIVE')}
                </Typography>
                <Typography style={{ color: '#737373', fontSize: 12 }}>Tidak Aktif</Typography>
              </Stack>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default CardStatus;
