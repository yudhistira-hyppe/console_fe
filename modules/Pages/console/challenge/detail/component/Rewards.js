import { Typography } from '@material-ui/core';
import { Avatar, Box, Card, Stack } from '@mui/material';
import { formatCurrency } from 'helpers/stringHelper';
import { isEmpty } from 'lodash';
import React from 'react';

const RewardsComponent = ({ detail }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="column" gap={2}>
        <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Ketentuan Hadiah</Typography>
        {detail?.ketentuanHadiah?.[0]?.badgePemenang && (
          <>
            <Stack direction="row" gap={3}>
              {Object.keys(detail?.ketentuanHadiah?.[0]?.badge?.[0]).includes('juara1') && (
                <Stack direction="column" gap={2} justifyContent="center" alignItems="center">
                  <Typography style={{ fontWeight: 'bold', color: '#00000099', fontSize: 14 }}>Juara#1</Typography>
                  <Stack direction="row" gap={1}>
                    <Avatar
                      src={detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara1_profile}
                      style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                      variant="rounded"
                    />
                    <Avatar
                      src={detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara1_general}
                      style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                      variant="rounded"
                    />
                  </Stack>
                </Stack>
              )}
              {Object.keys(detail?.ketentuanHadiah?.[0]?.badge?.[0]).includes('juara2') && (
                <Stack direction="column" gap={2} justifyContent="center" alignItems="center">
                  <Typography style={{ fontWeight: 'bold', color: '#00000099', fontSize: 14 }}>Juara#2</Typography>
                  <Stack direction="row" gap={1}>
                    <Avatar
                      src={detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara2_profile}
                      style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                      variant="rounded"
                    />
                    <Avatar
                      src={detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara2_general}
                      style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                      variant="rounded"
                    />
                  </Stack>
                </Stack>
              )}
              {Object.keys(detail?.ketentuanHadiah?.[0]?.badge?.[0]).includes('juara3') && (
                <Stack direction="column" gap={2} justifyContent="center" alignItems="center">
                  <Typography style={{ fontWeight: 'bold', color: '#00000099', fontSize: 14 }}>Juara#3</Typography>
                  <Stack direction="row" gap={1}>
                    <Avatar
                      src={detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara3_profile}
                      style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                      variant="rounded"
                    />
                    <Avatar
                      src={detail?.ketentuanHadiah?.[0]?.badge?.[0]?.juara3_general}
                      style={{ width: 64, height: 64, border: '1px solid #dddddd' }}
                      variant="rounded"
                    />
                  </Stack>
                </Stack>
              )}
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography style={{ color: '#00000061', width: '100%', maxWidth: 130, fontSize: 14 }}>Penempatan:</Typography>
              <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                Profil, HyppeStory, HyppeVid, HyppePic, Direct Message, Komentar
              </Typography>
            </Stack>
          </>
        )}
        {!isEmpty(detail?.hadiahPemenang?.[0]) && (
          <>
            <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>Hadiah Pemenang</Typography>

            {detail?.hadiahPemenang?.[0]?.typeHadiah === 'RANKING' && (
              <Stack direction="column">
                <Typography style={{ color: '#00000061', fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
                  Sesuai Ranking
                </Typography>
                <Stack direction="row" gap={1}>
                  <Typography style={{ color: '#00000061', width: 130, fontSize: 14 }}>Juara 1:</Typography>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                    Rp{formatCurrency(detail?.hadiahPemenang?.[0]?.ranking?.[0]?.juara1 || 0)}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Typography style={{ color: '#00000061', width: 130, fontSize: 14 }}>Juara 2:</Typography>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                    Rp{formatCurrency(detail?.hadiahPemenang?.[0]?.ranking?.[0]?.juara2 || 0)}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Typography style={{ color: '#00000061', width: 130, fontSize: 14 }}>Juara 3:</Typography>
                  <Typography style={{ color: '#00000099', fontWeight: 'bold', fontSize: 14 }}>
                    Rp{formatCurrency(detail?.hadiahPemenang?.[0]?.ranking?.[0]?.juara3 || 0)}
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
                  {formatCurrency(detail?.hadiahPemenang?.[0]?.point?.[0]?.pointPrice || 0)} Poin [Rp
                  {formatCurrency(detail?.hadiahPemenang?.[0]?.point?.[0]?.pointPriceMax || 0)}]
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Card>
  );
};

export default RewardsComponent;
