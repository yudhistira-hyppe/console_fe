import React from 'react';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const MoreInfo = (props) => {
  const { detail } = props;

  return (
    <Card style={{ height: '100%' }}>
      <CardHeader title={<Typography variant="h3">Informasi Tambahan</Typography>} />
      <CardContent style={{ paddingTop: 0 }}>
        <Stack direction={'row'}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Tag:
            </Typography>
          </Stack>
          <Stack direction={'row'} flexWrap={'wrap'} justifyContent="flex-start">
            {detail?.data[0]?.tagpeople?.length >= 1 ? (
              detail?.data[0]?.tagpeople?.map((item, key) => (
                <Typography key={key} variant="body2" color="primary" style={{ marginRight: '0.3em' }}>
                  @{item?.name}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="primary">
                -
              </Typography>
            )}
          </Stack>
        </Stack>

        <Stack direction={'row'} mt={1}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Musik:
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body2" color="textSecondary">
              {detail?.data[0]?.music || '-'}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={'row'} mt={1}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Lokasi:
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body2" color="textSecondary">
              {detail?.data[0]?.location || '-'}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={'row'} mt={1}>
          <Stack mr={1}>
            <Typography variant="body2" color="textSecondary">
              Privasi:
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body2" color="textSecondary">
              {detail?.data[0]?.visibility === 'PUBLIC' ? 'Publik' : 'Privasi'}{' '}
              {detail?.data[0]?.allowComments ? ', Komentar Diizinkan' : 'Komentar Tidak Diizinkan'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MoreInfo;
