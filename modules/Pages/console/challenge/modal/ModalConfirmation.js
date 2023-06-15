import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDuplicateChallengeMutation, useUpdateChallengeMutation } from 'api/console/challenge';
import { LoadingButton } from '@mui/lab';
import { map } from 'lodash';

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

  // formData.append('', selectedItem);

  const handleCreate = () => {
    let formData = new FormData();
    formData.append('nameChallenge', selectedItem?.name);
    formData.append('jenisChallenge', selectedItem?.kind?.id);
    formData.append('description', selectedItem?.description);
    formData.append('startChallenge', selectedItem?.startdate?.format('YYYY-MM-DD'));
    formData.append('endChallenge', selectedItem?.enddate?.format('YYYY-MM-DD'));
    formData.append('durasi', ((selectedItem?.cycle ? selectedItem?.cycle : 0) + 1) * selectedItem?.cycle_day);
    formData.append('jenisDurasi', 'DAY');
    formData.append('startTime', selectedItem?.starthour);
    formData.append('tampilStatusPengguna', selectedItem?.show_status_user ? true : false);
    formData.append('objectChallenge', selectedItem?.object === 'account' ? 'AKUN' : 'KONTEN');
    selectedItem?.object === 'account' &&
      formData.append('pilihanMetrik', selectedItem?.metric === 'interaction' ? 'konten' : 'aktivitas');
    selectedItem?.with_hashtag && formData.append('konten_tagar', `#${selectedItem?.hashtag}`);

    if (selectedItem?.metric === 'activity' && selectedItem?.object === 'account') {
      selectedItem?.activity_referal >= 1 && formData.append('akun_referal', selectedItem?.activity_referal);
      selectedItem?.activity_following >= 1 && formData.append('akun_ikuti', selectedItem?.activity_following);
    }

    if (selectedItem?.metric === 'interaction' && selectedItem?.object === 'account') {
      selectedItem?.interaction_create_vid >= 1 &&
        formData.append('konten_hyppevid_createpost', selectedItem?.interaction_create_vid);
      selectedItem?.interaction_create_pic >= 1 &&
        formData.append('konten_hyppepic_createpost', selectedItem?.interaction_create_pic);
      selectedItem?.interaction_create_diary >= 1 &&
        formData.append('konten_hyppediary_createpost', selectedItem?.interaction_create_diary);

      selectedItem?.interaction_like_vid >= 1 &&
        formData.append('konten_hyppevid_likepost', selectedItem?.interaction_like_vid);
      selectedItem?.interaction_like_pic >= 1 &&
        formData.append('konten_hyppepic_likepost', selectedItem?.interaction_like_pic);
      selectedItem?.interaction_like_diary >= 1 &&
        formData.append('konten_hyppediary_likepost', selectedItem?.interaction_like_diary);

      selectedItem?.interaction_view_vid >= 1 &&
        formData.append('konten_hyppevid_viewpost', selectedItem?.interaction_view_vid);
      selectedItem?.interaction_view_diary >= 1 &&
        formData.append('konten_hyppediary_viewpost', selectedItem?.interaction_view_diary);
    }

    if (selectedItem?.object === 'content') {
      selectedItem?.content_like_vid >= 1 && formData.append('konten_hyppevid_likepost', selectedItem?.content_like_vid);
      selectedItem?.content_like_pic >= 1 && formData.append('konten_hyppepic_likepost', selectedItem?.content_like_pic);
      selectedItem?.content_like_diary >= 1 &&
        formData.append('konten_hyppediary_likepost', selectedItem?.content_like_diary);
      selectedItem?.content_view_vid >= 1 && formData.append('konten_hyppevid_viewpost', selectedItem?.content_view_vid);
      selectedItem?.content_view_diary >= 1 &&
        formData.append('konten_hyppediary_viewpost', selectedItem?.content_like_diary);
    }

    formData.append('tipeAkun', selectedItem?.account_type?.join(','));
    formData.append('rentangUmur', selectedItem?.age_range?.join(','));
    formData.append('jenis_kelamin', selectedItem?.gender?.join(','));
    formData.append('lokasi', selectedItem?.area?.map((item) => item?._id)?.join(','));
    formData.append('caraGabung', selectedItem?.type_invitation === 'all' ? 'SEMUA PENGGUNA' : 'DENGAN UNDANGAN');
    selectedItem?.type_invitation === 'invitation' &&
      formData.append('list_partisipan_challenge', selectedItem?.invited_people?.map((item) => item?.iduser)?.join(','));
    formData.append('ketentuanhadiah_tampilbadge', selectedItem?.show_badge_leaderboard ? true : false);
    formData.append('leaderboard_Height', 176);
    formData.append('leaderboard_Width', 375);
    formData.append('leaderboard_warnaBackground', selectedItem?.banner_background_color?.color);
    formData.append('leaderboard_formatFile', selectedItem?.banner_leaderboard?.file?.type?.replace('image/', ''));
    formData.append('bannerBoard', selectedItem?.banner_leaderboard?.file);
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
              {status === 'create' && 'Simpan & Buat Challenge ?'}
              {status === 'create-draft' && 'Simpan Sebagai Draft ?'}
            </Typography>
            {status !== 'create-draft' && (
              <Typography style={{ textAlign: 'center', fontSize: 16, lineHeight: 1.2 }}>
                {status === 'duplicate' &&
                  `Jika Anda melakukan duplikasi, kompetisi yang Anda buat secara otomatis akan terimpan sebagai draf.`}
                {status === 'delete' && `Jika Anda menghapus kompetisi. Challenge akan dihapus secara permanen`}
                {status === 'delete-draft' && `Apakah Anda yakin ingin menghapus draft kompetisi ini ?`}
                {status === 'create' && 'Anda akan menyimpan kompetisi ini. Challenge akan tersedia pada aplikasi Hyppe'}
              </Typography>
            )}
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
                } else if (status === 'create' || status === 'create-draft') {
                  handleCreate();
                }
              }}>
              {status === 'duplicate' && 'Duplikasi'}
              {status === 'delete' && 'Hapus'}
              {(status === 'delete-draft' || status === 'create') && 'Konfirmasi'}
              {status === 'create-draft' && 'Simpan'}
            </LoadingButton>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
