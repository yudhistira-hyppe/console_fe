import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Button, Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useUpdateEffectStatusMutation } from 'api/console/database';
import { LoadingButton } from '@mui/lab';

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
  const [updateStatus, { isLoading: loadingUpdate }] = useUpdateEffectStatusMutation();

  const handleStatus = () => {
    const data = {
      list: isSingle ? [data2] : [...data1],
      status: status === 'active' ? 'active' : 'nonactive',
    };

    updateStatus(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        isSingle
          ? toast.success('Berhasil mengubah status efek')
          : toast.success(`Berhasil mengubah ${data1?.length} status efek`);
      }
      onConfirm();
    });
  };

  const handleDelete = () => {
    const data = {
      list: isSingle ? [data2] : [...data1],
      status: 'delete',
    };

    updateStatus(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        isSingle ? toast.success('Berhasil menghapus efek') : toast.success(`Berhasil menghapus ${data1?.length} efek`);
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
            {status === 'active' && <img src="/images/switch_on_media.png" style={{ height: 220, marginBottom: 30 }} />}
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
              {status === 'disactive' && `Nonaktifkan Efek`}
              {status === 'active' && `Aktifkan Efek`}
              {status === 'delete' && `Hapus Efek`}
            </Typography>
            <Typography style={{ textAlign: 'center', fontFamily: 'Lato' }}>
              {status === 'disactive' &&
                `Kamu Yakin Ingin Mengnonaktifkan ${!isSingle ? (data1?.length > 1 ? data1?.length : '') : ''} Efek ini ?`}
              {status === 'active' &&
                `Kamu Yakin Ingin Mengaktifkan ${!isSingle ? (data1?.length > 1 ? data1?.length : '') : ''} Efek ini ?`}
              {status === 'delete' &&
                `Kamu Yakin Ingin Menghapus ${!isSingle ? (data1?.length > 1 ? data1?.length : '') : ''} Efek ini ?`}
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
            <LoadingButton
              loading={loadingUpdate}
              variant="contained"
              color="secondary"
              onClick={() => (status === 'delete' ? handleDelete() : handleStatus())}>
              Konfirmasi
            </LoadingButton>
            <Button variant="text" color="secondary" onClick={onClose} disabled={loadingUpdate}>
              Batal
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
