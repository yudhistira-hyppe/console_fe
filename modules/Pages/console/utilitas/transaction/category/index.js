import React from 'react';
import { Button, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import TableSection from './TableSection';

const TransactionCategory = () => {
  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Kategori</Typography>

        <Button variant="contained" color="secondary" startIcon={<Add fontSize="16px" />} style={{ padding: '8px 12px' }}>
          <Typography variant="subtitle2">Tambah</Typography>
        </Button>
      </Stack>

      <TableSection />
    </Stack>
  );
};

export default TransactionCategory;
