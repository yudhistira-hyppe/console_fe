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
import { useDeleteBannerSearchMutation, useUpdateStatusBannerSearchMutation } from 'api/console/announcement';

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

export default function ModalConfirmation({ showModal, type, onClose, selectedItem, handleSubmit }) {
  const [updateStatusBanner, { isLoading: loadingUpdateBanner }] = useUpdateStatusBannerSearchMutation();
  const [deleteBanner, { isLoading: loadingDeleteBanner }] = useDeleteBannerSearchMutation();

  const handleUpdateBanner = (value) => {
    const formData = {
      id: selectedItem,
      statustayang: value === 'true',
    };

    updateStatusBanner(formData).then((res) => {
      if (res?.data) {
        toast.success(value === 'true' ? 'Berhasil mengaktifkan banner' : 'Berhasil menonaktifkan banner');
      } else {
        toast.error('Banner yang aktif sudah mencapai batas maksimal');
      }
      onClose();
    });
  };

  const handleDeleteBanner = () => {
    deleteBanner(selectedItem).then((res) => {
      if (res?.data) {
        toast.success('Berhasil menghapus banner');
      } else {
        toast.error('Terjadi kesalahan dengan sistem, silahkan coba lagi');
      }
      onClose();
    });
  };

  return (
    <div>
      <Modal open={showModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center" gap={1}>
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
              {type === 'notification' && 'Hapus Push Notifikasi?'}
              {type === 'banner' && 'Hapus Banner?'}
              {type === 'create-banner' && 'Simpan Banner'}
              {type === 'update-banner' && 'Simpan Perubahan Banner'}
              {type === 'active-banner' && 'Aktifkan Banner?'}
              {type === 'inactive-banner' && 'Non Aktifkan Banner?'}
            </Typography>
            <Typography style={{ textAlign: 'center', fontSize: 16, lineHeight: 1.2 }}>
              {type === 'notification' && 'Apakah Anda yakin ingin menghapus Push Notification?'}
              {type === 'banner' && 'Apakah Anda yakin ingin menghapus Banner?'}
              {type === 'create-banner' &&
                'Banner ini akan disimpan. Pergi ke halaman dashboard banner untuk mengaktifkan banner pada aplikasi.'}
              {type === 'update-banner' && 'Dengan mengklik konfirmasi anda akan menyetujui perubahan pada banner ini.'}
              {type === 'active-banner' && 'Apakah Anda yakin ingin menayangkan Banner?'}
              {type === 'inactive-banner' && 'Apakah Anda yakin tidak ingin menayangkan Banner?'}
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
            <Button onClick={onClose} disabled={loadingUpdateBanner || loadingDeleteBanner}>
              Batal
            </Button>
            <LoadingButton
              loading={loadingUpdateBanner || loadingDeleteBanner}
              variant="contained"
              color="secondary"
              onClick={() => {
                if (type === 'banner') {
                  handleDeleteBanner();
                } else if (type === 'inactive-banner') {
                  handleUpdateBanner('false');
                } else if (type === 'active-banner') {
                  handleUpdateBanner('true');
                } else if (type === 'create-banner' || type === 'update-banner') {
                  handleSubmit();
                  onClose();
                }
              }}>
              Konfirmasi
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
