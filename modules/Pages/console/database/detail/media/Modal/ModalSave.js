import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

export default function ModalSave({ showModal, onClose, onConfirm }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center" gap="8px">
            <img src={'/images/music-media.png'} style={{ width: 150 }} />
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}>Simpan & Post Musik ?</Typography>
            <Typography style={{ textAlign: 'center' }}>
              Kamu akan menyimpan musik ini. Musik akan tersedia di aplikasi Hyppe untuk digunakan
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={6} justifyContent={'center'} spacing={3}>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Konfirmasi
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
