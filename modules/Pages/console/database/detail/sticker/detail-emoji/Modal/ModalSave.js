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
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

export default function ModalSave({ showModal, onClose, onConfirm, status, statusCreate, loading }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center" gap="8px">
            {status !== 'create' ? (
              <>
                <img src="/images/save-effect.png" style={{ height: 250 }} />
                <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}>Simpan Emoji?</Typography>
                <Typography style={{ textAlign: 'center' }}>Semua perubahan yang kamu buat akan tersimpan</Typography>
              </>
            ) : (
              <>
                <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>Simpan Emoji</Typography>
                <Typography style={{ textAlign: 'center', fontFamily: 'Lato' }}>
                  Kamu akan <strong>menyimpan & {statusCreate === 'active' ? 'mengaktifkan' : 'tidak mengaktifkan'}</strong>{' '}
                  emoji ini. Emoji akan tersedia di aplikasi Hyppe
                </Typography>
              </>
            )}
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
            <LoadingButton loading={loading} variant="contained" color="secondary" onClick={onConfirm}>
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
