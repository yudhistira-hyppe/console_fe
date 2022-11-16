import React from 'react';
import Box from '@mui/material/Box';
import { Button, Divider } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 335,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

export default function ModalConfirmation({ showModal, type, onClose, onConfirm }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center" textAlign="center" spacing={1}>
            {type === 'pulih' && <img src="/images/success.png" style={{ marginTop: -20 }} />}
            {type === 'sensitif' && <img src="/images/disable.png" style={{ marginTop: -20 }} />}

            <Typography fontWeight={'bold'}>
              {type === 'pulih' && 'Konten User Dipulihkan'}
              {type === 'sensitif' && 'Konten Tetap Sensitif'}
            </Typography>
            <Typography variant="body2" color="#666666">
              {type === 'pulih' && 'Kamu memilih untuk memulihkan konten'}
              {type === 'sensitif' && 'Kamu memilih konten user tetap sensitif'}
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={4} justifyContent={'center'} spacing={3}>
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
