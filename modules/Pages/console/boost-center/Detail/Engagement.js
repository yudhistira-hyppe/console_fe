import React from 'react';
import { Card, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { Lens } from '@material-ui/icons';

const Engagement = () => {
  return (
    <Card style={{ padding: '18px 24px', height: '100%' }}>
      <Stack direction="column" height="100%">
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Engagement</Typography>

        <Stack direction="row" gap="24px" mt="12px">
          <Stack direction="row" alignItems="center" gap="8px">
            <Lens style={{ color: '#212121', fontSize: 12 }} />
            <Typography variant="caption">Total Sebelum</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Lens style={{ color: '#AB22AF', fontSize: 12 }} />
            <Typography variant="caption">Total Penambahan</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-evenly" alignItems="center" height="100%">
          <Stack direction="column" alignItems="center">
            <Typography style={{ color: '#AB22AF', fontSize: 24, fontWeight: 'bold', lineHeight: '1.2em' }}>
              {numberWithCommas(40962)}
            </Typography>
            <Typography style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 8 }}>
              {numberWithCommas(40642)} <span style={{ color: '#979797' }}>(+ 320)</span>
            </Typography>
            <Typography style={{ color: '#737373' }}>Dilihat</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography style={{ color: '#AB22AF', fontSize: 24, fontWeight: 'bold', lineHeight: '1.2em' }}>
              {numberWithCommas(1330)}
            </Typography>
            <Typography style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 8 }}>
              {numberWithCommas(1180)} <span style={{ color: '#979797' }}>(+ 150)</span>
            </Typography>
            <Typography style={{ color: '#737373' }}>Disukai</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography style={{ color: '#AB22AF', fontSize: 24, fontWeight: 'bold', lineHeight: '1.2em' }}>
              {numberWithCommas(570)}
            </Typography>
            <Typography style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 8 }}>
              {numberWithCommas(570)} <span style={{ color: '#979797' }}>(+ 0)</span>
            </Typography>
            <Typography style={{ color: '#737373' }}>Dibagikan</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography style={{ color: '#AB22AF', fontSize: 24, fontWeight: 'bold', lineHeight: '1.2em' }}>
              {numberWithCommas(523)}
            </Typography>
            <Typography style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 8 }}>
              {numberWithCommas(503)} <span style={{ color: '#979797' }}>(+ 20)</span>
            </Typography>
            <Typography style={{ color: '#737373' }}>Dikomentari</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Engagement;
