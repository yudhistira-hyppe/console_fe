import React from 'react';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const Status = (props) => {
  const { detail } = props;

  return (
    <Card style={{ height: '100%' }}>
      <CardHeader title={<Typography variant="h3">{`Status`}</Typography>} />
      <CardContent style={{ paddingTop: 0, display: 'flex', flexDirection: 'column', height: '100%', gap: 8 }}>
        <Stack direction={'row'}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Kepemilikan:
            </Typography>
          </Stack>
          <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
            <Typography variant="body2" color="primary">
              @{detail?.data[0]?.pemiliksekarang}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Nomor Sertifikasi:
            </Typography>
          </Stack>
          <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
            <Typography
              variant="body2"
              style={{
                width: 240,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}>
              {detail?.data[0]?.postID}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Dijual:
            </Typography>
          </Stack>
          <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
            <Typography variant="body2">{detail?.data[0]?.saleAmount > 0 ? 'Ya' : 'Tidak'}</Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Harga:
            </Typography>
          </Stack>
          <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
            <Typography variant="body2">{numberWithCommas(detail?.data[0]?.saleAmount || 0)}</Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Terms:
            </Typography>
          </Stack>
          <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
            <Typography variant="body2">
              {detail?.data[0]?.saleView && 'Views'} {detail?.data[0]?.saleLike && 'Likes'}
              {!detail?.data[0]?.saleView && !detail?.data[0]?.saleLike && '-'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Status;
