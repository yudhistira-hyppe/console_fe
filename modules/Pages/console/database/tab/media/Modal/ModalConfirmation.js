import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { useDeleteMusicMutation, useUpdateStatusMusicMutation } from 'api/console/database';
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
  const [updateStatus] = useUpdateStatusMusicMutation();
  const [deleteMusic] = useDeleteMusicMutation();

  const handleStatus = () => {
    const data = {
      _id: isSingle ? [data2] : [...data1],
      status: status === 'active' ? true : false,
    };

    updateStatus(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        isSingle
          ? toast.success('Berhasil mengubah status musik')
          : toast.success(`Berhasil mengubah ${data1?.length} status musik`);
      }
      onConfirm();
    });
  };

  const handleDelete = () => {
    const data = {
      _id: isSingle ? [data2] : [...data1],
    };

    deleteMusic(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        isSingle
          ? toast.success('Berhasil menghapus musik')
          : toast.success(`Berhasil menghapus ${data1?.length} status musik`);
      }
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
          <Stack direction="column" alignItems="center">
            {status === 'disactive' && (
              <img src="/images/switch_off_voucher.png" style={{ width: 250, marginTop: '-50px' }} />
            )}
            {status === 'active' && <img src="/images/switch_on_media.png" style={{ width: 250, marginBottom: 30 }} />}
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
              {status === 'disactive' &&
                `Kamu Yakin Ingin Mengnonaktifkan ${!isSingle ? (data1?.length > 1 ? data1?.length : '') : ''} Musik ini ?`}
              {status === 'active' &&
                `Kamu Yakin Ingin Mengaktifkan ${!isSingle ? (data1?.length > 1 ? data1?.length : '') : ''} Musik ini ?`}
              {status === 'delete' &&
                `Kamu Yakin Ingin Menghapus ${!isSingle ? (data1?.length > 1 ? data1?.length : '') : ''} Musik ini ?`}
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={3} justifyContent={'center'} spacing={3}>
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
