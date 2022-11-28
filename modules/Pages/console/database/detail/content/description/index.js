import React from 'react';
import { Card, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import ScrollBar from 'react-perfect-scrollbar';

const Description = () => {
  return (
    <Card style={{ padding: 24, height: '100%' }}>
      <Stack direction="column" gap="24px">
        <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>Keterangan</Typography>
        <ScrollBar style={{ maxHeight: 170 }}>
          Lorem ipsum dolor sit @amet @consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qu sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui #officia #deserunt #mollit
          #animidestlaborum
        </ScrollBar>
      </Stack>
    </Card>
  );
};

export default Description;
