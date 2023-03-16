import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';

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

export default function ModalConfirmation({ showModal, status, onClose, onConfirm, data1, data2, isSingle }) {
  const handleStatus = () => {
    const data = {
      _id: isSingle ? [data2] : [...data1],
      status: status === 'active' ? true : false,
    };

    onConfirm();
    toast.success('toast...');
  };

  const handleDelete = () => {
    alert('deleted');
    onConfirm();
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center">
            {status === 'disactive' && (
              <img src="/images/switch_off_voucher.png" style={{ width: 250, marginTop: '-50px' }} />
            )}
            {status === 'active' && <img src="/images/switch_on_media.png" style={{ height: 220, marginBottom: 30 }} />}
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
              {status === 'disactive' && `Nonaktifkan Emoji`}
              {status === 'active' && `Aktifkan Emoji`}
              {status === 'delete' && `Hapus Emoji`}
            </Typography>
            <Typography style={{ textAlign: 'center', fontFamily: 'Lato' }}>
              {status === 'disactive' &&
                `Kamu Yakin Ingin Mengnonaktifkan ${!isSingle ? (data1?.length > 1 ? data1?.length : '') : ''} Emoji ini ?`}
              {status === 'active' &&
                `Kamu Yakin Ingin Mengaktifkan ${!isSingle ? (data1?.length > 1 ? data1?.length : '') : ''} Emoji ini ?`}
              {status === 'delete' &&
                `Kamu Yakin Ingin Menghapus ${!isSingle ? (data1?.length > 1 ? data1?.length : '') : ''} Emoji ini ?`}
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (status === 'delete' ? handleDelete() : handleStatus())}>
              Konfirmasi
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
