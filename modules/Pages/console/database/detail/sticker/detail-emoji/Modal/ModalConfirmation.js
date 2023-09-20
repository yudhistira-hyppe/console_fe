import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import router, { useRouter } from 'next/router';
import { useUpdateStickerStatusMutation } from 'api/console/database';
import { toast } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

export default function ModalConfirmation({ showModal, status, id, onClose }) {
  const [updateStatus, { isLoading: loadingUpdate }] = useUpdateStickerStatusMutation();
  const router = useRouter();

  const handleStatus = () => {
    const data = {
      listid: [id],
      status: status,
    };

    updateStatus(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success('Berhasil mengubah status emoji');
        router.replace({ pathname: '/database/sticker', query: { tab: router?.query?.tab } });
      }
      onClose();
    });
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center">
            {status === 'active' && <img src="/images/switch_on_media.png" style={{ width: 250, marginBottom: 30 }} />}
            {status !== 'active' && <img src="/images/switch_off_voucher.png" style={{ width: 250, marginTop: '-50px' }} />}
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
              {status === 'active' && 'Kamu Yakin Ingin Mengaktifkan Emoji ini ?'}
              {status !== 'active' && 'Kamu Yakin Ingin Mengnonaktifkan Emoji ini ?'}
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={3} justifyContent={'center'} spacing={3}>
            <LoadingButton loading={loadingUpdate} variant="contained" color="secondary" onClick={handleStatus}>
              Konfirmasi
            </LoadingButton>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
