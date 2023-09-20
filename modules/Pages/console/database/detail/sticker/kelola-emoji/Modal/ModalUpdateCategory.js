import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { useUpdateStickerCategoryMutation } from 'api/console/database';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-hot-toast';

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

export default function ModalUpdateCategory({ showModal, onClose, category, setTab }) {
  const [updateStickerCategory, { isLoading: loadingUpdate }] = useUpdateStickerCategoryMutation();
  const [inputValue, setInputValue] = useState(category?.name);

  useEffect(() => {
    setInputValue(category?.name);
  }, [showModal]);

  const handleUpdate = () => {
    const formData = {
      id: category?._id,
      name: inputValue,
      tipesticker: 'EMOJI',
    };

    updateStickerCategory(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success('Berhasil menyimpan perubahan kategori emoji');
        setTab(inputValue);
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
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Ubah Nama Kategori</Typography>
            <TextField
              placeholder="Masukan nama kategori"
              inputProps={{ maxLength: 20 }}
              color="secondary"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="start">{inputValue?.length} / 20</InputAdornment>,
              }}
            />
          </Stack>

          <Stack direction={'row'} mt={4} justifyContent={'center'} spacing={3}>
            <LoadingButton
              loading={loadingUpdate}
              variant="contained"
              color="secondary"
              style={{ height: 40, width: 110 }}
              onClick={handleUpdate}
              disabled={inputValue?.length < 3 || inputValue?.includes('  ') || inputValue === category?.name}>
              <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Simpan</Typography>
            </LoadingButton>
            <Button style={{ height: 40, width: 110 }} onClick={onClose} disabled={loadingUpdate}>
              <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Batal</Typography>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
