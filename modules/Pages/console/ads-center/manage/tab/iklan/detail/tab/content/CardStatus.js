import { Typography } from '@material-ui/core';
import { Button, Card, Stack } from '@mui/material';
import React, { useState } from 'react';
import ModalChangeStatus from './modal/ModalChangeStatus';
import { useApproveAdsMutation } from 'api/console/ads';
import { toast } from 'react-hot-toast';
import Router from 'next/router';

const CardStatus = ({ details }) => {
  const [showModal, setShowModal] = useState({ show: false, type: '' });
  const [approveAds, { isLoading }] = useApproveAdsMutation();

  const handleClose = () => {
    setShowModal({ show: false, type: '' });
  };

  const handleSubmit = (value) => {
    const payload =
      value?.status === 'ACTIVE'
        ? {
            _id: details?._id,
            status: value?.status,
          }
        : {
            _id: details?._id,
            status: value?.status,
            remark: value?.reason,
          };

    toast.loading('Loading...', { id: 'approve-ads' });
    approveAds(payload).then((res) => {
      if (res?.error) {
        console.log(res);
        toast.error(res?.error?.data?.messages?.info[0], { id: 'approve-ads', duration: 3000 });
      } else {
        Router.replace({ pathname: '/ads-center/manage', query: { tab: 2 } });
        toast.success(value?.status === 'ACTIVE' ? 'Berhasil menjadwalkan iklan' : 'Berhasil menolak iklan', {
          id: 'approve-ads',
          duration: 3000,
        });
      }
      handleClose();
    });
  };

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Stack direction="column" alignItems="center" justifyContent="center" height="100%" gap={2}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => setShowModal({ show: true, type: 'approve' })}
          disabled={details?.status !== 'UNDER_REVIEW'}>
          <Typography style={{ fontWeight: 'bold' }}>Setujui</Typography>
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => setShowModal({ show: true, type: 'decline' })}
          disabled={details?.status !== 'UNDER_REVIEW'}>
          <Typography style={{ fontWeight: 'bold' }}>Tidak Disetujui</Typography>
        </Button>
        <Stack direction="row" style={{ backgroundColor: '#00000005', padding: '8px 16px' }}>
          <Typography style={{ color: '#979797', fontSize: 12 }}>
            Ketika Anda memilih tidak setuju, maka iklan akan otomatis tidak aktif.
          </Typography>
        </Stack>
      </Stack>

      <ModalChangeStatus
        showModal={showModal.show && showModal.type !== 'media'}
        onClose={handleClose}
        onConfirm={handleSubmit}
        type={showModal.type}
        loading={isLoading}
      />
    </Card>
  );
};

export default CardStatus;
