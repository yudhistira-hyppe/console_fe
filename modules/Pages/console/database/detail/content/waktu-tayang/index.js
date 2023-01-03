import React from 'react';
import { Card, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const WaktuTayang = (props) => {
  const { data } = props;

  return (
    <Card style={{ height: '100%' }}>
      <Stack direction="column" height="100%">
        <Typography style={{ padding: 24, fontWeight: 'bold', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)' }}>
          Total Waktu Tayang
        </Typography>
        <Stack direction="column" alignItems="center" justifyContent="center" height="100%">
          <Typography style={{ fontWeight: 'bold', fontSize: 22 }}>{data}</Typography>
          <Typography style={{ fontSize: 14, color: '#666666' }}>Jam</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default WaktuTayang;
