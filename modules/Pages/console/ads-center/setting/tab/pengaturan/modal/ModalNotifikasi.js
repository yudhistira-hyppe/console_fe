import { Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, InputAdornment, Modal, Stack, TextField } from '@mui/material';
import { useUpdateAdsNotificationPushMutation } from 'api/console/ads';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
  borderRadius: 3,
};

const ModalNotifikasi = ({ open, onClose, data }) => {
  const [inputValue, setInputValue] = useState({
    title: data?.title_id || '',
    body: data?.body_id?.replace('Rp. ${rewards}', '') || '',
  });
  const [updateNotif, { isLoading: loadingUpdate }] = useUpdateAdsNotificationPushMutation();

  console.log(data);

  useEffect(() => {
    setInputValue({
      title: data?.title_id || '',
      body: data?.body_id?.replace('Rp. ${rewards}', '') || '',
    });
  }, [open]);

  const handleUpdate = () => {
    const formData = {
      title_id: inputValue?.title,
      title_en: data?.title_en,
      body_id: inputValue?.body + ' Rp. ${rewards}',
      body_end: data?.body_end,
    };

    updateNotif(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        toast.success('Berhasil mengupdate notifikasi push', { duration: 3000 });
      }
      onClose();
    });
  };

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" gap="20px" style={{ padding: 20 }}>
          <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Notifikasi Iklan</Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>

          <Stack direction="row" gap={3}>
            <Typography style={{ width: '30%' }}>Notifikasi Push</Typography>
            <Stack direction="column" width="70%" gap={1}>
              <TextField
                value={inputValue?.title}
                placeholder="Masukan judul notifikasi push"
                color="secondary"
                onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                inputProps={{ maxLength: 30 }}
              />
              <small style={{ color: '#9B9B9B', textAlign: 'right' }}>{inputValue?.title?.length || 0} / 30 Karakter</small>
              <TextField
                value={inputValue?.body}
                placeholder="Masukan body notifikasi push"
                color="secondary"
                onChange={(e) => setInputValue({ ...inputValue, body: e.target.value })}
                inputProps={{ maxLength: 63 }}
                sx={{
                  '> div': {
                    padding: 0,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        backgroundColor: '#9b9b9b3d',
                        height: '100%',
                        maxHeight: '56px',
                        width: 'fit-content',
                        padding: '10px',
                      }}>
                      <Typography>{'Rp. ${rewards}'}</Typography>
                    </InputAdornment>
                  ),
                }}
              />
              <small style={{ color: '#9B9B9B', textAlign: 'right' }}>{inputValue?.body?.length || 0} / 63 Karakter</small>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
            <Button
              variant="outlined"
              color="secondary"
              style={{ borderRadius: 6, padding: '10px 20px' }}
              onClick={onClose}
              disabled={loadingUpdate}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Batal</Typography>
            </Button>
            <LoadingButton
              loading={loadingUpdate}
              variant="contained"
              color="secondary"
              style={{ borderRadius: 6, padding: '10px 20px' }}
              onClick={handleUpdate}
              disabled={!inputValue?.title || !inputValue?.body}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Simpan</Typography>
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalNotifikasi;
