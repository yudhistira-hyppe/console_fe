import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
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
          <Stack spacing={1} mb={5}>
            <Typography fontWeight={'bold'}>Kamu Akan Menyetujui Peningkatan Akun</Typography>
            <Typography variant="body2" color="#666666">
              Dengan menyetujui kamu yakin akan semua data yang dimasukan sudah benar.
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={3} justifyContent={'center'} spacing={3}>
            <LoadingButton loading={loading} variant="contained" color="secondary" onClick={onConfirm}>
              Konfirmasi
            </LoadingButton>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
