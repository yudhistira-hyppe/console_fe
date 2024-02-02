import { Typography } from '@material-ui/core';
import Link from 'next/link';
import { Button, Card, Stack } from '@mui/material';
import React from 'react';

const ReferralInfoComponent = ({}) => {
  return (
    <Card style={{ height: '100%', padding: '20px 24px 36px' }}>
      <Stack direction="column" justifyContent="center" height="100%" spacing={3}>
        <Typography style={{ fontWeight: 'bold ' }}>Referal Digunakan</Typography>

        <Stack direction="column">
          <Typography style={{ fontSize: 36, fontWeight: 'bold' }}>{20}</Typography>
          <Link href="#">
            <Typography style={{ fontWeight: 'bold', color: '#BE31BC', fontSize: 14 }}>Total Referal Digunakan</Typography>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ReferralInfoComponent;
