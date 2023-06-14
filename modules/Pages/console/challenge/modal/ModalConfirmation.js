import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDuplicateChallengeMutation, useUpdateChallengeMutation } from 'api/console/challenge';
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
  borderRadius: '12px',
};

export default function ModalConfirmation({ showModal, status, onClose, selectedItem }) {
  const [duplicateChallenge, { isLoading: loadingDuplicate }] = useDuplicateChallengeMutation();
  const [updateChallenge, { isLoading: loadingUpdate }] = useUpdateChallengeMutation();

  const handleDuplicate = () => {
    duplicateChallenge(selectedItem).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message?.info[0], { duration: 3000 });
      } else {
        toast.success('Berhasil Duplikasi Challenge', { duration: 3000 });
      }
      onClose();
    });
  };

  const handleDelete = () => {
    let formData = new FormData();
    formData.append('statusChallenge', 'NONACTIVE');

    updateChallenge({ id: selectedItem, formData }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message?.info[0], { duration: 3000 });
      } else {
        toast.success('Berhasil Menghapus Challenge', { duration: 3000 });
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
          <Stack direction="column" alignItems="center" gap={1}>
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
              {status === 'duplicate' && `Duplikasi Challenge`}
              {status === 'delete' && `Hapus Challenge`}
              {status === 'delete-draft' && `Hapus Draft Challenge ?`}
            </Typography>
            <Typography style={{ textAlign: 'center', fontSize: 16, lineHeight: 1.2 }}>
              {status === 'duplicate' &&
                `Jika Anda melakukan duplikasi, kompetisi yang Anda buat secara otomatis akan terimpan sebagai draf.`}
              {status === 'delete' && `Jika Anda menghapus kompetisi. Challenge akan dihapus secara permanen`}
              {status === 'delete-draft' && `Apakah Anda yakin ingin menghapus draft kompetisi ini ?`}
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
            <LoadingButton
              loading={loadingDuplicate || loadingUpdate}
              variant="contained"
              color="secondary"
              onClick={() => {
                if (status === 'delete' || status === 'delete-draft') {
                  handleDelete();
                } else if (status === 'duplicate') {
                  handleDuplicate();
                }
              }}>
              {status === 'duplicate' && 'Duplikasi'}
              {status === 'delete' && 'Hapus'}
              {status === 'delete-draft' && 'Konfirmasi'}
            </LoadingButton>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
