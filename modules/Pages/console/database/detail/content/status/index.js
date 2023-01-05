import React from 'react';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const Status = (props) => {
  const { data } = props;

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
              @{data?.username || '-'}
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
              {data?.postID || '-'}
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
            <Typography variant="body2">{data?.statusJual === 'YA' ? 'Ya' : 'Tidak'}</Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Harga:
            </Typography>
          </Stack>
          <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
            <Typography variant="body2">{numberWithCommas(data?.saleAmount || 0)}</Typography>
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
              {data?.saleView && 'Views'} {data?.saleLike && 'Likes'}
              {!data?.saleView && !data?.saleLike && '-'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Status;
