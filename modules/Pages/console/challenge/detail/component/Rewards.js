import { Typography } from '@material-ui/core';
import { Avatar, Box, Card, Stack } from '@mui/material';
import { formatCurrency } from 'helpers/stringHelper';
import React from 'react';

const RewardsComponent = ({ detail }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="column" gap={2}>
        <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Ketentuan Hadiah</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column" gap={2} justifyContent="center" alignItems="center">
            <Typography style={{ fontWeight: 'bold', color: '#00000099', fontSize: 14 }}>Juara#1</Typography>
            <Stack direction="row" gap={1}>
              <Avatar
                src={detail?.leaderBoard?.[0]?.bannerLeaderboard}
                style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                variant="rounded"
              />
              <Avatar
                src={detail?.leaderBoard?.[0]?.bannerLeaderboard}
                style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                variant="rounded"
              />
            </Stack>
          </Stack>
          <Stack direction="column" gap={2} justifyContent="center" alignItems="center">
            <Typography style={{ fontWeight: 'bold', color: '#00000099', fontSize: 14 }}>Juara#2</Typography>
            <Stack direction="row" gap={1}>
              <Avatar
                src={detail?.leaderBoard?.[0]?.bannerLeaderboard}
                style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                variant="rounded"
              />
              <Avatar
                src={detail?.leaderBoard?.[0]?.bannerLeaderboard}
                style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                variant="rounded"
              />
            </Stack>
          </Stack>
          <Stack direction="column" gap={2} justifyContent="center" alignItems="center">
            <Typography style={{ fontWeight: 'bold', color: '#00000099', fontSize: 14 }}>Juara#3</Typography>
            <Stack direction="row" gap={1}>
              <Avatar
                src={detail?.leaderBoard?.[0]?.bannerLeaderboard}
                style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                variant="rounded"
              />
              <Avatar
                src={detail?.leaderBoard?.[0]?.bannerLeaderboard}
                style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                variant="rounded"
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography style={{ color: '#00000061', width: '100%', maxWidth: 130, fontSize: 14 }}>Penempatan:</Typography>
          <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
            Profil, HyppeStory, HyppeVid, HyppePic, HyppeDiary, Direct Message, Komentar
          </Typography>
        </Stack>
        <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Hadiah Pemenang</Typography>
        {detail?.hadiahPemenang?.[0]?.typeHadiah === 'RANKING' && (
          <Stack direction="column">
            <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
              Sesuai Ranking
            </Typography>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 130, fontSize: 14 }}>Juara 1:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                Rp{formatCurrency(100000000)}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 130, fontSize: 14 }}>Juara 2:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                Rp{formatCurrency(75000000)}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: 130, fontSize: 14 }}>Juara 3:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                Rp{formatCurrency(50000000)}
              </Typography>
            </Stack>
          </Stack>
        )}
        {detail?.hadiahPemenang?.[0]?.typeHadiah === 'POINT' && (
          <Stack direction="row" gap={1}>
            <Typography style={{ color: '#00000061', fontWeight: 'bold', width: 130, fontSize: 14 }}>
              Sesuai Poin:
            </Typography>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
              {formatCurrency(detail?.hadiahPemenang?.[0]?.point?.point_reward || 0)} Poin [Rp
              {formatCurrency(detail?.hadiahPemenang?.[0]?.point?.max_reward || 0)}]
            </Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default RewardsComponent;
