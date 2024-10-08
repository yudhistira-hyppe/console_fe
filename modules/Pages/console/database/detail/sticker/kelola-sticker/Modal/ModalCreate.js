import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { InputAdornment, Stack, TextField } from '@mui/material';
import UploadThumbnail from './upload-thumbnail';
import { useCreateStickerCategoryMutation } from 'api/console/database';
import { toast } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: '8px',
};

export default function ModalCreate({ showModal, onClose }) {
  const [category, setCategory] = useState({
    name: '',
    image: [],
  });
  const [createCategorySticker, { isLoading: loadingCreate }] = useCreateStickerCategoryMutation();

  useEffect(() => {
    setCategory({
      name: '',
      image: [],
    });
  }, [showModal]);

  const handleCreate = () => {
    let formData = new FormData();
    formData.append('name', category?.name);
    formData.append('tipesticker', 'STICKER');
    formData.append('icon', category?.image);

    createCategorySticker(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success('Berhasil menambahkan kategori sticker');
        onClose();
      }
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
          <Stack direction="column" gap="20px" width="100%">
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Tambah Kategori Stiker</Typography>
            <TextField
              placeholder="Masukan nama kategori"
              inputProps={{ maxLength: 20 }}
              color="secondary"
              value={category?.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              InputProps={{
                endAdornment: <InputAdornment position="start">{category?.name?.length} / 20</InputAdornment>,
              }}
            />

            <UploadThumbnail inputValue={category} setInputValue={setCategory} />
          </Stack>

          <Stack direction={'row'} mt={4} justifyContent={'center'} spacing={3}>
            <LoadingButton
              loading={loadingCreate}
              variant="contained"
              color="secondary"
              style={{ height: 40, width: 110 }}
              onClick={handleCreate}
              disabled={category?.name?.length < 3 || category?.name?.includes('  ') || !category?.image}>
              <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Buat</Typography>
            </LoadingButton>
            <Button style={{ height: 40, width: 110 }} onClick={onClose} disabled={loadingCreate}>
              <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Batal</Typography>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
