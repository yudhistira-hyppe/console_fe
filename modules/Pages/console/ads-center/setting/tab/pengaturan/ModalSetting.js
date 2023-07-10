import { Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Box, Button, IconButton, InputAdornment, Modal, Stack, TextField } from '@mui/material';
import { useUpdateAdsNotificationPushMutation, useUpdateAdsSettingMutation } from 'api/console/ads';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
  borderRadius: 3,
};

const ModalSetting = ({ open, onClose, data }) => {
  const [inputValue, setInputValue] = useState({});
  const [updateSetting] = useUpdateAdsSettingMutation();

  useEffect(() => {
    setInputValue({ [data?.Jenis]: data?.Nilai });
  }, [open]);

  const handleUpdate = () => {
    updateSetting(inputValue).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        toast.success('Berhasil Mengupdate Setting Ads', { duration: 3000 });
      }
      onClose();
    });
  };

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" style={{ padding: 20 }}>
          <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>{data?.Jenis || '-'}</Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>
          <Typography>{data?.description || '-'}</Typography>

          <Stack direction="row" justifyContent="center" width="100%">
            <TextField
              color="secondary"
              value={inputValue?.[data?.Jenis] || 0}
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
              InputProps={{
                disabled: true,
                startAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setInputValue({ [data?.Jenis]: inputValue?.[data?.Jenis] - 1 })}
                      style={{
                        width: 24,
                        height: 24,
                        fontSize: 28,
                        paddingBottom: 8,
                        color: inputValue?.[data?.Jenis] < 1 ? '#C9C9C9' : '#AB22AF',
                        border: inputValue?.[data?.Jenis] < 1 ? '1px solid #C9C9C9' : '1px solid #AB22AF',
                      }}
                      disabled={inputValue?.[data?.Jenis] < 1}>
                      -
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => setInputValue({ [data?.Jenis]: inputValue?.[data?.Jenis] + 1 })}
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

          <Stack direction="row" justifyContent="center" alignItems="center" gap={2} mt="20px">
            <Button variant="outlined" color="secondary" style={{ borderRadius: 6, padding: '10px 20px' }} onClick={onClose}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Batal</Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: 6, padding: '10px 20px' }}
              onClick={handleUpdate}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Konfirmasi</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalSetting;
