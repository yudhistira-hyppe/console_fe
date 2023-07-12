import { Typography } from '@material-ui/core';
import { Button, Card, CircularProgress, Stack } from '@mui/material';
import { useGetNotificationAdsQuery } from 'api/console/ads';
import React, { useState } from 'react';
import ModalNotifikasi from './modal/ModalNotifikasi';

const NotifikasiComponent = () => {
  const [showModal, setShowModal] = useState({
    open: false,
    data: {},
  });
  const { data: dataNotif, isFetching: loadingData } = useGetNotificationAdsQuery();

  return (
    <Card sx={{ padding: '18px 24px', width: '100%', height: '100%' }}>
      <Stack direction="column" gap={2}>
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Notifikasi</Typography>

        <Stack direction="column" height={200}>
          {loadingData ? (
            <Stack direction="column" alignItems="center" justifyContent="center" height="100%" spacing={2}>
              <CircularProgress color="secondary" />
              <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
            </Stack>
          ) : (
            <>
              <Stack direction="row" gap={1}>
                <Typography style={{ fontSize: 14, color: '#00000061' }}>Notifikasi:</Typography>
                <Typography style={{ fontSize: 14 }}>
                  <b>{dataNotif?.data?.title_id || '-'}</b> <br /> {dataNotif?.data?.body_id || '-'}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" mt="auto">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ borderRadius: 6, padding: '10px 20px' }}
                  onClick={() =>
                    setShowModal({
                      open: true,
                      data: dataNotif?.data,
                    })
                  }>
                  <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Kelola</Typography>
                </Button>
              </Stack>
            </>
          )}
        </Stack>

        <ModalNotifikasi
          open={showModal.open}
          data={showModal.data}
          onClose={() =>
            setShowModal({
              open: false,
              data: {},
            })
          }
        />
      </Stack>
    </Card>
  );
};

export default NotifikasiComponent;
