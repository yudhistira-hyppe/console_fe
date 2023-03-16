import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
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

export default function ModalDelete({ showModal, onClose, onConfirm }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center" gap="8px">
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>Hapus Emoji</Typography>
            <Typography style={{ textAlign: 'center', fontFamily: 'Lato' }}>
              Apakah kamu yakin ingin menghapus emoji ini?
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
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
