import React from 'react';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const MoreInfo = (props) => {
  const { data } = props;

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
            {data?.tagPeople?.length >= 1 ? (
              data?.tagPeople?.map((item, key) => (
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
            <Typography variant="body2" color="primary" style={{ fontWeight: 'bold' }}>
              {data?.musicTitle ? `${data?.musicTitle} - ${data?.albumName}` : '-'}
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
              {data?.location || '-'}
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
              {data?.visibility === 'PUBLIC' ? 'Publik' : 'Privasi'}{' '}
              {data?.allowComments ? ', Komentar Diizinkan' : 'Komentar Tidak Diizinkan'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MoreInfo;
