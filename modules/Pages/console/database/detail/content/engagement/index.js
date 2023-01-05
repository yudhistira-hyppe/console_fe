import React from 'react';
import { Typography } from '@material-ui/core';
import { Card, Stack } from '@mui/material';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const Engagement = (props) => {
  const { data } = props;

  return (
    <Card style={{ padding: 24, height: '100%' }}>
      <Stack direction="column" height="100%">
        <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>Engagement</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-around" height="100%">
          <Stack direction="column" alignItems="center">
            <Typography style={{ fontWeight: 'bold', fontSize: 22 }}>{numberWithCommas(data?.views || 0)}</Typography>
            <Typography style={{ fontSize: 14, color: '#666666' }}>Total Dilihat</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography style={{ fontWeight: 'bold', fontSize: 22 }}>{numberWithCommas(data?.likes || 0)}</Typography>
            <Typography style={{ fontSize: 14, color: '#666666' }}>Disukai</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <Typography style={{ fontWeight: 'bold', fontSize: 22 }}>{numberWithCommas(data?.shares || 0)}</Typography>
            <Typography style={{ fontSize: 14, color: '#666666' }}>Dibagikan</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Engagement;
