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
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const { data: dataNotif, isFetching: loadingData } = useGetNotificationAdsQuery();

  return (
    <Card sx={{ padding: '18px 24px', width: '100%', height: '100%' }}>
      <Stack direction="column" gap={2}>
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Notifikasi</Typography>

        {access?.map((item) => item?.nameModule)?.includes('ads_setting_notif') ? (
          <Stack direction="column" height={200}>
            {loadingData ? (
              <Stack direction="column" alignItems="center" justifyContent="center" height="100%" spacing={2}>
                <CircularProgress color="secondary" size={28} />
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
                    }
                    disabled={!access?.find((item) => item?.nameModule === 'ads_setting_notif')?.acces?.updateAcces}>
                    <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Kelola</Typography>
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        ) : (
          <Stack direction="column" alignItems="center" justifyContent="center" height={200}>
            <Typography style={{ fontWeight: 'bold' }}>Kamu tidak memiliki akses untuk fitur ini!</Typography>
          </Stack>
        )}

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
