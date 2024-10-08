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

export default function ModalSave({ showModal, statusEfek, onClose, onConfirm, status, isLoading }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => (isLoading ? {} : onClose())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center" gap="8px">
            {status !== 'create' ? (
              <>
                <img src="/images/save-effect.png" style={{ height: 250 }} />
                <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}>Simpan Efek?</Typography>
                <Typography style={{ textAlign: 'center' }}>Semua perubahan yang kamu buat akan tersimpan</Typography>
              </>
            ) : (
              <>
                <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>Simpan Efek</Typography>
                <Typography style={{ textAlign: 'center', fontFamily: 'Lato' }}>
                  Kamu akan <strong>menyimpan {statusEfek === 'active' ? ' & mengaktifkan' : ''}</strong> efek ini. Efek akan
                  tersedia di aplikasi Hyppe
                </Typography>
              </>
            )}
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
            <LoadingButton loading={isLoading} variant="contained" color="secondary" onClick={onConfirm}>
              Konfirmasi
            </LoadingButton>
            <Button variant="text" onClick={onClose} disabled={isLoading}>
              Batal
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
