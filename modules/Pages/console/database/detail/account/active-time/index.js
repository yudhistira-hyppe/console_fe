import React from 'react';
import { Card, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const ActiveTime = () => {
  return (
    <Card style={{ height: '100%' }}>
      <Stack direction="column" height="100%">
        <Stack direction="row" justifyContent="space-between" padding={3}>
          <Typography variant="h4">Waktu Aktif</Typography>
        </Stack>
        <Stack alignItems="center" justifyContent="center" gap="16px" height="100%">
          <img src="/images/icon-media-empty.png" alt="Icon Empty" style={{ width: 50, height: 50 }} />
          <Typography style={{ color: '#666666' }}>Pengguna belum memiliki data apapun</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ActiveTime;
