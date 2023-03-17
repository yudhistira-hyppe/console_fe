import { Card, Stack, Typography } from '@mui/material';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const AdsDescriptionDetail = ({ detailAds }) => {
  return (
    <Stack direction="row" gap={2}>
      <Card style={{ padding: '2em', width: '55%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Pembuat Iklan:
            </Typography>

            <Typography fontFamily={'Lato'} color="secondary" fontWeight="bold">
              @{detailAds?.fullName || '-'}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Admin Bertugas:
            </Typography>

            <Typography fontFamily={'Lato'} color="secondary" fontWeight="bold">
              @{detailAds?.adminfullName || '-'}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Objektifitas:
            </Typography>

            <Typography fontFamily={'Lato'}>Lalu-lintas</Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Kredit Penayangan:
            </Typography>

            <Typography fontFamily={'Lato'}>{numberWithCommas(detailAds?.tayang || 0)} Kali</Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography fontFamily={'Lato'} color="rgba(0, 0, 0, 0.38)">
              Sisa Kredit Penayangan:
            </Typography>

            <Typography fontFamily={'Lato'}>{detailAds?.tayang - detailAds?.totalView} Kali</Typography>
          </Stack>
        </div>
      </Card>
      <Card style={{ padding: '2em', width: '45%', height: '100%' }}>
        <Stack direction="column" gap={2}>
          <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Deskripsi Iklan</Typography>
          <ScrollBar style={{ maxHeight: 120, minHeight: 120, height: '100%' }}>
            <Stack
              dangerouslySetInnerHTML={{ __html: detailAds?.description }}
              style={{ padding: detailAds?.description?.includes('<ul>') ? '0 20px' : 0, whiteSpace: 'pre-line' }}
            />
          </ScrollBar>
        </Stack>
      </Card>
    </Stack>
  );
};

export default AdsDescriptionDetail;
