import { Typography } from '@material-ui/core';
import { Avatar, Box, Card, Stack } from '@mui/material';
import React from 'react';

const LeaderboardComponent = ({ detail }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="column" gap={2}>
        <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Leaderboard</Typography>
        <Stack direction="column" gap={2}>
          <Typography style={{ fontWeight: 'bold', color: '#00000099' }}>Banner</Typography>
          <Avatar
            src={detail?.leaderBoard?.[0]?.bannerLeaderboard + '?m=' + new Date().getTime()}
            style={{ width: 375, height: 176, border: '1px solid #dddddd' }}
            variant="rounded"
          />
          <Typography style={{ fontWeight: 'bold', color: '#00000099' }}>Warna Background</Typography>
          <Box
            style={{
              backgroundColor: detail?.leaderBoard?.[0]?.warnaBackground,
              height: 48,
              width: 48,
              border: '1px solid #dddddd',
              borderRadius: 4,
              filter: 'drop-shadow(1px 2px 8px rgba(0, 0, 0, 0.2))',
            }}
          />
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Dengan Badge:</Typography>
          <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
            {detail?.leaderBoard?.[0]?.tampilBadge ? 'Ya' : 'Tidak'}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography style={{ color: '#00000061', width: 150, fontSize: 14 }}>Maksimum Peringkat:</Typography>
          <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>10</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default LeaderboardComponent;
