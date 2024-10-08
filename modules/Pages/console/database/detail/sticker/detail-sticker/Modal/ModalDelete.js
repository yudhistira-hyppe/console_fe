import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useUpdateStickerStatusMutation } from 'api/console/database';
import { toast } from 'react-hot-toast';

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

export default function ModalDelete({ showModal, onClose, onConfirm, id }) {
  const [deleteSticker, { isLoading: loadingDelete }] = useUpdateStickerStatusMutation();

  const handleDelete = () => {
    const data = {
      listid: [id],
      status: 'delete',
    };

    deleteSticker(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success('Berhasil menghapus sticker');
      }
      onClose();
      onConfirm();
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
          <Stack direction="column" alignItems="center" gap="8px">
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>Hapus Stiker</Typography>
            <Typography style={{ textAlign: 'center', fontFamily: 'Lato' }}>
              Apakah kamu yakin ingin menghapus stiker ini?
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
            <LoadingButton loading={loadingDelete} variant="contained" color="secondary" onClick={handleDelete}>
              Konfirmasi
            </LoadingButton>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
