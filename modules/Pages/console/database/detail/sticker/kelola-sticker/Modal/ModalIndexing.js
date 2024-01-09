import { Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, InputAdornment, Modal, Stack, TextField } from '@mui/material';
import { useUpdateStickerMutation } from 'api/console/database';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
  borderRadius: 3,
};

const ModalIndexing = ({ showModal, onClose, data, onSubmit }) => {
  const [indexSticker, setIndexSticker] = useState(data?.index || '');
  const [updateSticker, { isLoading: loadingUpdate }] = useUpdateStickerMutation();

  useEffect(() => {
    setIndexSticker(data?.index || '');
  }, [showModal]);

  const handleUpdate = () => {
    let formData = new FormData();
    formData.append('id', data?._id);
    formData.append('nourut', indexSticker);
    formData.append('type', data?.type);
    formData.append('kategori', data?.kategori);
    formData.append('name', data?.name);
    formData.append('status', data?.status ? true : false);

    updateSticker(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || res?.error?.data?.messages?.info?.join(','));
      } else if (res?.data) {
        toast.success('Berhasil mengubah urutan sticker');
      }
      onSubmit();
    });
  };

  return (
    <Modal open={showModal} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" style={{ padding: 20 }} gap="20px">
          <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Ubah Urutan</Typography>
            {/* <IconButton onClick={onClose}>
              <Close />
            </IconButton> */}
          </Stack>

          <Stack direction="row" justifyContent="center" width="100%">
            <TextField
              color="secondary"
              value={indexSticker}
              placeholder="0"
              sx={{
                '> div': {
                  paddingLeft: 0,
                  outline: 'none',
                  border: 'none',
                  input: {
                    border: 'none',
                    width: 100,
                    fontSize: 24,
                    textAlign: 'center',
                  },
                  fieldset: {
                    border: 'none',
                  },
                },
              }}
              onChange={(e) => setIndexSticker(Number(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setIndexSticker(indexSticker - 1)}
                      style={{
                        width: 24,
                        height: 24,
                        fontSize: 28,
                        paddingBottom: 8,
                        color: indexSticker < 1 ? '#C9C9C9' : '#AB22AF',
                        border: indexSticker < 1 ? '1px solid #C9C9C9' : '1px solid #AB22AF',
                      }}
                      disabled={indexSticker < 1}>
                      -
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => setIndexSticker(indexSticker + 1)}
                        style={{
                          width: 24,
                          height: 24,
                          fontSize: 24,
                          color: '#AB22AF',
                          border: '1px solid #AB22AF',
                        }}>
                        +
                      </IconButton>
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack direction="row" justifyContent="center" alignItems="center" gap={2} width="100%">
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
              disabled={indexSticker < 1}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Konfirmasi</Typography>
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalIndexing;
