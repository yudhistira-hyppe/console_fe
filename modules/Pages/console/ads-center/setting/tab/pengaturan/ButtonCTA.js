import { Typography } from '@material-ui/core';
import { Button, Card, CircularProgress, Stack } from '@mui/material';
import { useGetButtonCTAAdsQuery } from 'api/console/ads';
import React from 'react';

const ButtonCTAComponent = () => {
  const { data: dataButton, isFetching: loadingData } = useGetButtonCTAAdsQuery();

  return (
    <Card sx={{ padding: '18px 24px', width: '100%', height: '100%' }}>
      <Stack direction="column" gap={2}>
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Button CTA</Typography>

        <Stack direction="column" height={200}>
          {loadingData ? (
            <Stack direction="column" alignItems="center" justifyContent="center" height="100%" spacing={2}>
              <CircularProgress color="secondary" />
              <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
            </Stack>
          ) : (
            <>
              <Stack direction="column" gap={1}>
                {dataButton?.data?.map((item, key) => (
                  <Stack direction="row" gap={1} key={key}>
                    <Typography style={{ fontSize: 14, color: '#00000061' }}>Button {key + 1}:</Typography>
                    <Typography style={{ fontSize: 14 }}>{item?.CTAButton || '-'}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" mt="auto">
                <Button variant="contained" color="secondary" style={{ borderRadius: 6, padding: '10px 20px' }}>
                  <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Kelola</Typography>
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ButtonCTAComponent;
