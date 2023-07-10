import { Typography } from '@material-ui/core';
import { Box, Card, CircularProgress, Stack } from '@mui/material';
import { formatCurrency } from 'helpers/stringHelper';
import React from 'react';

const CardCredit = ({ totalSaldo, isLoading }) => {
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <Stack direction="column" style={{ padding: 24 }}>
        <Typography style={{ fontWeight: 'bold' }}>Saldo Kredit</Typography>

        <Box height={140}>
          {isLoading ? (
            <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
              <CircularProgress color="secondary" size={28} />
            </Stack>
          ) : (
            <Stack direction="column" justifyContent="flex-end" height="100%" style={{ paddingBottom: 16 }}>
              <Typography style={{ color: '#3F3F3FDE', fontSize: 32, fontWeight: 'bold' }}>
                {formatCurrency(totalSaldo || 0) || 0}
              </Typography>
              <Typography style={{ color: '#737373', fontSize: 12 }}>Total Penggunaan Kredit Iklan</Typography>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default CardCredit;
