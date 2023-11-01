import { Typography } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Modal, Stack } from '@mui/material';
import { useDeleteTopupMutation } from 'api/console/monetize/dashboard';
import React from 'react';
import toast from 'react-hot-toast';

function ModalTopup({ open, selected, status, handleClose }) {
  const [deleteTopup, { isLoading: loadingDelete }] = useDeleteTopupMutation();

  const handleDelete = () => {
    deleteTopup({ _id: selected }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        toast.success('Berhasil Menghapus Data', { duration: 3000 });
      }
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          backgroundColor: 'white',
          boxShadow: 24,
          padding: 24,
          borderRadius: '4px',
        }}>
        <Stack direction="column" alignItems="center" gap={3} style={{ position: 'relative' }}>
          <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>
            {status === 'delete' && 'Kamu yakin ingin menghapus data ini ?'}
          </Typography>
          <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
            <LoadingButton
              loading={loadingDelete}
              variant="contained"
              color="secondary"
              style={{ height: 32 }}
              onClick={() => {
                if (status === 'delete') {
                  handleDelete();
                }
              }}>
              <Typography style={{ fontWeight: 'bold', fontSize: 14, textTransform: 'capitalize' }}>Hapus</Typography>
            </LoadingButton>
            <Button variant="text" color="secondary" style={{ height: 32 }} onClick={handleClose} disabled={loadingDelete}>
              <Typography style={{ fontWeight: 'bold', fontSize: 14, textTransform: 'capitalize' }}>Batal</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ModalTopup;
