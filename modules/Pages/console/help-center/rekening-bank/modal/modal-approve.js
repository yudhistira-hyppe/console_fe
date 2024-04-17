import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Button, Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: '28px 24px',
  borderRadius: '4px',
};

export default function ModalApprove({ showModal, onClose, onConfirm, loading }) {
  return (
    <Modal open={showModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Stack spacing={1} mb={5}>
          <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
            Kamu Akan Menyetujui Permohonan Akun Bank
          </Typography>
          <Typography style={{ color: '#666666', textAlign: 'center', fontSize: 14 }}>
            Dengan menyetujui, kamu yakin akan semua data yang dimasukan oleh pengguna sudah benar.
          </Typography>
        </Stack>

        <Stack direction={'row'} mt={3} justifyContent={'center'} spacing={3}>
          <Button variant="text" color="inherit" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button variant="contained" color="secondary" onClick={onConfirm} disabled={loading}>
            Konfirmasi
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
