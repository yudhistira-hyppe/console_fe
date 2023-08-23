import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import {
  useCreateChallengeMutation,
  useDeleteChallengeMutation,
  useDuplicateChallengeMutation,
  useUpdateChallengeMutation,
} from 'api/console/challenge';
import { LoadingButton } from '@mui/lab';
import { map } from 'lodash';
import Router from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
};

export default function ModalConfirmation({ showModal, onClose, selectedItem }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center" gap={1}>
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
              Hapus Push Notifikasi ?
            </Typography>
            <Typography style={{ textAlign: 'center', fontSize: 16, lineHeight: 1.2 }}>
              Apakah Anda yakin ingin menghapus Push Notification?
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
            <LoadingButton loading={false} variant="contained" color="secondary" onClick={() => {}}>
              Konfirmasi
            </LoadingButton>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
