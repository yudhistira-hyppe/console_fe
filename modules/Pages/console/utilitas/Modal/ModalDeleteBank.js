import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useUpdateMasterBankMutation } from 'api/console/utilitas/bank';
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

const ModalDeleteBank = ({ open, handleClose, data }) => {
  const [deleteBank, { isLoading }] = useUpdateMasterBankMutation();

  const handleDelete = () => {
    const formData = new FormData();
    formData.append('isActive', false);

    deleteBank({ id: data?._id, formData }).then((res) => {
      if (res?.data?.data) {
        toast.success('Berhasil Menghapus Bank');
      } else {
        toast.error('Gagal Menghapus Bank');
      }
      handleClose();
    });
  };

  return (
    <Modal open={open} onClose={handleClose} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" gap={3}>
          <Typography style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Lato' }}>
            Anda yakin ingin menghapus bank ini ?
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
                Hapus Bank
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

export default ModalDeleteBank;
