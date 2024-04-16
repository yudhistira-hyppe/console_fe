import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: '28px 24px',
  borderRadius: '4px',
};

export default function ModalApprove({ loading, showModal, onClose, onConfirm }) {
  return (
    <div>
      <Modal open={showModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack gap="4px">
            <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>Kamu Akan Menyetujui Verifikasi Akun</Typography>
            <Typography style={{ fontSize: 14, color: '#666666' }}>Pastikan data yang ada sudah benar</Typography>
          </Stack>

          <Stack direction={'row'} mt={4} justifyContent={'center'} gap={3}>
            <Button onClick={onClose}>Batal</Button>

            <LoadingButton loading={loading} variant="contained" color="secondary" onClick={onConfirm}>
              Konfirmasi
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
