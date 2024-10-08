import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Stack } from '@mui/material';
import { useDeleteMusicMutation } from 'api/console/database';
import { toast } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';

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

export default function ModalDelete({ showModal, onClose, id }) {
  const [deleteMusic, { isLoading }] = useDeleteMusicMutation();

  const handleDelete = () => {
    const data = {
      _id: [id],
    };

    deleteMusic(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success('Berhasil menghapus musik');
      }
      onClose();
    });
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack spacing={1}>
            <Typography fontWeight={'bold'} textAlign="center">
              Kamu Yakin Akan Menghapus Konten Ini?
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={3} justifyContent={'center'} spacing={3}>
            <LoadingButton loading={isLoading} variant="contained" color="secondary" onClick={handleDelete}>
              Konfirmasi
            </LoadingButton>
            <Button variant="text" color="secondary" onClick={onClose} disabled={isLoading}>
              Batal
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
