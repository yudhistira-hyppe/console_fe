import { Typography } from '@material-ui/core';
import { Card, Stack } from '@mui/material';
import React from 'react';

const AreaComponent = () => {
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="column" gap={2}>
        <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Wilayah Pengguna</Typography>
        <Stack direction="column" alignItems="center" justifyContent="center" height={360} gap={2}>
          <img src="/images/icon-media-empty.png" style={{ width: 60, height: 60 }} />
          <Typography style={{ color: '#666666', width: 250, textAlign: 'center' }}>
            Anda akan melihat metrik wilayah audiens di sini.
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default AreaComponent;
