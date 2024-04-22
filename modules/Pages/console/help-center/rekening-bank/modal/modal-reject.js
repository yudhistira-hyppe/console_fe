import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Button, Divider, Stack, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: '28px 24px',
  borderRadius: '4px',
};

export default function ModalReject({ showModal, onClose, onConfirm, loading }) {
  const [reason, setReason] = useState('');

  useEffect(() => {
    setReason('');
  }, [showModal]);

  return (
    <Modal open={showModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" disableAutoFocus>
      <Box sx={style}>
        <Stack direction="column" width={380} mx="auto">
          <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
            Kamu Akan Menolak Permohonan Akun Bank
          </Typography>
          <Typography style={{ color: '#666666', textAlign: 'center', fontSize: 14 }}>
            Kamu menolak permohonan akun bank dengan alasan
          </Typography>
        </Stack>

        <TextField
          fullWidth
          multiline
          color="secondary"
          minRows={5}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Tulis penjelasan"
          sx={{ marginTop: '8px', textarea: { fontFamily: 'Lato' } }}
        />

        <Stack direction={'row'} mt={3} mb={1} justifyContent={'center'} spacing={3}>
          <Button variant="text" color="inherit" onClick={onClose} disabled={loading}>
            Batal
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => onConfirm({ reason: reason })}
            disabled={!reason || loading}>
            Konfirmasi
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
