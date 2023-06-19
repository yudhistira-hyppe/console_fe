import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { toast } from 'react-hot-toast';
import {
  useCreateChallengeMutation,
  useDuplicateChallengeMutation,
  useUpdateChallengeMutation,
} from 'api/console/challenge';
import { LoadingButton } from '@mui/lab';
import { map } from 'lodash';
import Router from 'next/router';

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
  const [createChallenge, { isLoading: loadingCreate }] = useCreateChallengeMutation();

  const handleDuplicate = () => {
    duplicateChallenge(selectedItem).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
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
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        toast.success('Berhasil Menghapus Challenge', { duration: 3000 });
      }
      onClose();
    });
  };

  const handleCreate = () => {
    let formData = new FormData();
    formData.append('nameChallenge', selectedItem?.name);
    formData.append('jenisChallenge', selectedItem?.kind?._id);
    formData.append('description', selectedItem?.description);
    formData.append('startChallenge', selectedItem?.startdate?.format('YYYY-MM-DD'));
    formData.append('endChallenge', selectedItem?.enddate?.format('YYYY-MM-DD'));
    formData.append('durasi', (selectedItem?.cycle ? selectedItem?.cycle : 0) * selectedItem?.cycle_day);
    formData.append('jenisDurasi', 'DAY');
    formData.append('startTime', selectedItem?.starthour?.format('HH:mm:ss'));
    formData.append('tampilStatusPengguna', selectedItem?.show_status_user ? true : false);

    formData.append('objectChallenge', selectedItem?.object === 'account' ? 'AKUN' : 'KONTEN');
    selectedItem?.object === 'account' &&
      formData.append('pilihanMetrik', selectedItem?.metric === 'interaction' ? 'konten' : 'akun');
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
    formData.append('rentangumur', selectedItem?.age_range?.join(','));
    formData.append('jenis_kelamin', selectedItem?.gender?.join(','));
    formData.append('lokasi', selectedItem?.area?.map((item) => item?._id)?.join(','));

    formData.append('caraGabung', selectedItem?.type_invitation === 'all' ? 'SEMUA PENGGUNA' : 'DENGAN UNDANGAN');
    selectedItem?.type_invitation === 'invitation' &&
      formData.append('list_partisipan_challenge', selectedItem?.invited_people?.map((item) => item?.iduser)?.join(','));

    formData.append('leaderboard_tampilbadge_dileaderboard', selectedItem?.show_badge_leaderboard ? true : false);
    formData.append('leaderboard_Height', 176);
    formData.append('leaderboard_Width', 375);
    formData.append('leaderboard_warnaBackground', selectedItem?.banner_background_color?.color);
    formData.append('leaderboard_formatFile', selectedItem?.banner_leaderboard?.file?.type?.replace('image/', ''));
    formData.append('bannerBoard', selectedItem?.banner_leaderboard?.file);

    formData.append('ketentuanhadiah_tampilbadge', selectedItem?.winner_badges ? true : false);
    formData.append('ketentuanhadiah_Height', 80);
    formData.append('ketentuanhadiah_Width', 80);
    formData.append('ketentuanhadiah_formatFile', 'png');
    if (selectedItem?.winner_ranking_badge?.length >= 1) {
      formData.append(
        'listbadge',
        selectedItem?.winner_ranking_badge?.map((item) => {
          if (typeof item?.other === 'string') {
            return item?.other;
          } else {
            return 'new';
          }
        }),
      );

      selectedItem?.winner_ranking_badge?.map((item) => {
        typeof item?.other !== 'string' && formData.append(`badge_general_${item?.ranking}`, item?.other);
        typeof item?.profile !== 'string' && formData.append(`badge_profile_${item?.ranking}`, item?.profile);
      });
    }

    formData.append('bannersearch_Height', 343);
    formData.append('bannersearch_Width', 103);
    formData.append('bannersearch_formatFile', selectedItem?.banner_search?.file?.type?.replace('image/', ''));
    formData.append('bannerSearch', selectedItem?.banner_search?.file);

    formData.append('popup_Height', 326);
    formData.append('popup_Width', 326);
    formData.append('popup_formatFile', selectedItem?.banner_popup?.file?.type?.replace('image/', ''));
    formData.append('popUpnotif', selectedItem?.banner_popup?.file);

    formData.append('hadiah_set_hadiahpemenang', selectedItem?.winner_rewards ? true : false);
    formData.append('hadiah_jenispemenang', selectedItem?.winner_rewards_type === 'ranking' ? 'RANKING' : 'POINT');
    formData.append('hadiah_currency', 'RUPIAH');
    if (selectedItem?.winner_rewards_type === 'ranking') {
      if (selectedItem?.winner_ranking_price?.length >= 1) {
        formData.append(
          'hadiah_juara',
          selectedItem?.winner_ranking_price?.map((item) => item?.price),
        );
      }
    } else {
      formData.append('point_price', Number(selectedItem?.reward_poin));
      formData.append('point_price_max', Number(selectedItem?.max_reward));
    }

    if (selectedItem?.notification_push?.length >= 1) {
      const type = selectedItem?.notification_push?.map((item) => item?.type);

      const specificNotification = (val) => {
        return selectedItem?.notification_push?.find((item) => item?.type === val);
      };

      if (type?.includes('upcoming')) {
        formData.append('notifikasiPush_akanDatang_include', 'YES');
        formData.append('notifikasiPush_akanDatang_title', specificNotification('upcoming')?.title);
        formData.append('notifikasiPush_akanDatang_description', specificNotification('upcoming')?.body);
        formData.append('notifikasiPush_akanDatang_unit', 'JAM');
        formData.append('notifikasiPush_akanDatang_aturWaktu', Number(specificNotification('upcoming')?.blast));
      }
      if (type?.includes('start')) {
        formData.append('notifikasiPush_challengeDimulai_include', 'YES');
        formData.append('notifikasiPush_challengeDimulai_title', specificNotification('start')?.title);
        formData.append('notifikasiPush_challengeDimulai_description', specificNotification('start')?.body);
        formData.append('notifikasiPush_challengeDimulai_unit', 'JAM');
        formData.append('notifikasiPush_challengeDimulai_aturWaktu', Number(specificNotification('start')?.blast));
      }
      if (type?.includes('update')) {
        formData.append('notifikasiPush_updateLeaderboard_include', 'YES');
        formData.append('notifikasiPush_updateLeaderboard_title', specificNotification('update')?.title);
        formData.append('notifikasiPush_updateLeaderboard_description', specificNotification('update')?.body);
        formData.append('notifikasiPush_updateLeaderboard_unit', 'JAM');
        formData.append(
          'notifikasiPush_updateLeaderboard_aturWaktu',
          specificNotification('update')
            ?.blast?.split(',')
            ?.map((item) => Number(item)),
        );
      }
      if (type?.includes('will_end')) {
        formData.append('notifikasiPush_challengeAkanBerakhir_include', 'YES');
        formData.append('notifikasiPush_challengeAkanBerakhir_title', specificNotification('will_end')?.title);
        formData.append('notifikasiPush_challengeAkanBerakhir_description', specificNotification('will_end')?.body);
        formData.append('notifikasiPush_challengeAkanBerakhir_unit', 'JAM');
        formData.append('notifikasiPush_challengeAkanBerakhir_aturWaktu', Number(specificNotification('will_end')?.blast));
      }
      if (type?.includes('end')) {
        formData.append('notifikasiPush_challengeBerakhir_include', 'YES');
        formData.append('notifikasiPush_challengeBerakhir_title', specificNotification('end')?.title);
        formData.append('notifikasiPush_challengeBerakhir_description', specificNotification('end')?.body);
        formData.append('notifikasiPush_challengeBerakhir_unit', 'JAM');
        formData.append('notifikasiPush_challengeBerakhir_aturWaktu', Number(specificNotification('end')?.blast));
      }
      if (type?.includes('winner')) {
        formData.append('notifikasiPush_untukPemenang_include', 'YES');
        formData.append('notifikasiPush_untukPemenang_title', specificNotification('winner')?.title);
        formData.append('notifikasiPush_untukPemenang_description', specificNotification('winner')?.body);
        formData.append('notifikasiPush_untukPemenang_unit', 'JAM');
        formData.append('notifikasiPush_untukPemenang_aturWaktu', Number(specificNotification('winner')?.blast));
      }
    }

    formData.append('statusChallenge', status === 'create-draft' ? 'DRAFT' : 'PUBLISH');

    createChallenge(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        toast.success('Berhasil Membuat Challenge', { duration: 3000 });
        Router.back();
      }
      onClose();
    });
  };

  const handleUpdate = () => {
    let formData = new FormData();
    formData.append('description', selectedItem?.description);
    if (typeof selectedItem?.banner_leaderboard?.file !== 'string') {
      formData.append('bannerBoard', selectedItem?.banner_leaderboard?.file);
    }
    if (typeof selectedItem?.banner_search?.file !== 'string') {
      formData.append('bannerSearch', selectedItem?.banner_search?.file);
    }
    if (typeof selectedItem?.banner_popup?.file !== 'string') {
      formData.append('popUpnotif', selectedItem?.banner_popup?.file);
    }

    updateChallenge({ id: selectedItem?._id, formData }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        toast.success('Berhasil Mengupdate Challenge', { duration: 3000 });
        Router.back();
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
              {(status === 'create' || status === 'update') && 'Simpan & Buat Challenge ?'}
              {status === 'create-draft' && 'Simpan Sebagai Draft ?'}
            </Typography>
            {status !== 'create-draft' && (
              <Typography style={{ textAlign: 'center', fontSize: 16, lineHeight: 1.2 }}>
                {status === 'duplicate' &&
                  `Jika Anda melakukan duplikasi, kompetisi yang Anda buat secara otomatis akan terimpan sebagai draf.`}
                {status === 'delete' && `Jika Anda menghapus kompetisi. Challenge akan dihapus secara permanen`}
                {status === 'delete-draft' && `Apakah Anda yakin ingin menghapus draft kompetisi ini ?`}
                {(status === 'create' || status === 'update') &&
                  'Anda akan menyimpan kompetisi ini. Challenge akan tersedia pada aplikasi Hyppe'}
              </Typography>
            )}
          </Stack>

          <Stack direction={'row'} mt={5} justifyContent={'center'} spacing={3}>
            <LoadingButton
              loading={loadingDuplicate || loadingUpdate || loadingCreate}
              variant="contained"
              color="secondary"
              onClick={() => {
                if (status === 'delete' || status === 'delete-draft') {
                  handleDelete();
                } else if (status === 'duplicate') {
                  handleDuplicate();
                } else if (status === 'create' || status === 'create-draft') {
                  handleCreate();
                } else if (status === 'update') {
                  handleUpdate();
                }
              }}>
              {status === 'duplicate' && 'Duplikasi'}
              {status === 'delete' && 'Hapus'}
              {(status === 'delete-draft' || status === 'create' || status === 'update') && 'Konfirmasi'}
              {status === 'create-draft' && 'Simpan'}
            </LoadingButton>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
