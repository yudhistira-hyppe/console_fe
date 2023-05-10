import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useDeleteInterestMutation } from 'api/console/utilitas/interest';
import React from 'react';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const ModalDeleteInterest = ({ open, handleClose, data }) => {
  const [deleteInterest, { isLoading }] = useDeleteInterestMutation();

  const handleDelete = () => {
    deleteInterest(data?._id).then((res) => {
      if (res) {
        toast.success('Berhasil Menghapus Interest');
      } else {
        toast.error('Gagal Menghapus Interest');
      }
      handleClose();
    });
  };

  return (
    <Modal open={open} onClose={handleClose} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" gap={3}>
          <Typography style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Lato' }}>
            Anda yakin ingin menghapus interest ini ?
          </Typography>

          <Stack direction="row" gap={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ height: 40 }}
              onClick={handleDelete}
              disabled={isLoading}>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                Hapus Interest
              </Typography>
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ height: 40 }}
              onClick={handleClose}
              disabled={isLoading}>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                Batal
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalDeleteInterest;
