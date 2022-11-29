import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Divider } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

export default function ModalDelete({ showModal, onClose, onConfirm, loading }) {
  const [reason, setReason] = useState('');

  return (
    <div>
      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
        disableEnforceFocus>
        <Box sx={style}>
          <div>
            <Stack spacing={1}>
              <Typography fontWeight={'bold'}>Kamu Yakin Akan Menghapus Konten Ini?</Typography>
              <Divider />
              <TextField
                multiline
                minRows={5}
                placeholder="Tulis penjelasan"
                color="secondary"
                onChange={(e) => setReason(e.target.value)}
              />
            </Stack>
          </div>

          <Stack direction={'row'} mt={3} justifyContent={'center'} spacing={3}>
            <LoadingButton
              loading={loading}
              variant="contained"
              color="secondary"
              onClick={() => onConfirm(reason)}
              disabled={reason === ''}>
              Konfirmasi
            </LoadingButton>
            <Button onClick={onClose} disabled={loading}>
              Batal
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
