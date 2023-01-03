import React from 'react';
import { Card, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import ScrollBar from 'react-perfect-scrollbar';

const Description = (props) => {
  const { data } = props;

  return (
    <Card style={{ padding: 24, height: '100%' }}>
      <Stack direction="column" gap="24px">
        <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>Keterangan</Typography>
        <ScrollBar style={{ maxHeight: 170 }}>{data}</ScrollBar>
      </Stack>
    </Card>
  );
};

export default Description;
