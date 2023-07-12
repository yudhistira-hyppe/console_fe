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
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
  borderRadius: 3,
};

const ModalCharacteristic = ({ open, onClose, data }) => {
  const [inputValue, setInputValue] = useState({});
  const [updateSetting] = useUpdateAdsSettingMutation();

  useEffect(() => {
    data?.map((item) =>
      setInputValue((prevVal) => {
        return { ...prevVal, [item?.Jenis]: item?.Nilai };
      }),
    );
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
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Characteristic Weight</Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>
          <Typography style={{ fontSize: 12, marginBottom: 12 }}>Bobot tiap jenis dalam karakteristik audiens</Typography>

          {Object.keys(inputValue)?.map((item, key) => (
            <TextField
              key={key}
              color="secondary"
              value={inputValue[item] || 0}
              sx={{
                '> div': {
                  paddingLeft: 0,
                },
                input: {
                  width: 'auto',
                },
              }}
              InputProps={{
                disabled: true,
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ backgroundColor: '#E0E0E0', height: 56, maxHeight: 56, width: 300 }}>
                    <Typography style={{ width: '100%', textAlign: 'center' }}>{item}</Typography>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => {
                          let prevData = inputValue;
                          prevData[item] -= 1;

                          setInputValue({ ...prevData });
                        }}
                        size="small"
                        style={{
                          width: 24,
                          height: 24,
                          fontSize: 28,
                          paddingBottom: 8,
                          color: !inputValue[item] || inputValue[item] < 1 ? '#C9C9C9' : '#AB22AF',
                          border: !inputValue[item] || inputValue[item] < 1 ? '1px solid #C9C9C9' : '1px solid #AB22AF',
                        }}
                        disabled={!inputValue[item] || inputValue[item] < 1}>
                        -
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          let prevData = inputValue;
                          prevData[item] += 1;

                          setInputValue({ ...prevData });
                        }}
                        size="small"
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
          ))}

          {Object.keys(inputValue)
            ?.map((item) => inputValue[item])
            .reduce((a, b) => a + b, 0) < 100 && (
            <Typography style={{ color: '#E84242', fontSize: 12, marginTop: 8, fontWeight: 'bold' }}>
              Total dari keseluruhan data diatas harus mencapai 100
            </Typography>
          )}
          {Object.keys(inputValue)
            ?.map((item) => inputValue[item])
            .reduce((a, b) => a + b, 0) > 100 && (
            <Typography style={{ color: '#E84242', fontSize: 12, marginTop: 8, fontWeight: 'bold' }}>
              Total dari keseluruhan data diatas tidak boleh melebihi 100
            </Typography>
          )}

          <Stack direction="row" justifyContent="center" alignItems="center" gap={2} mt="20px">
            <Button variant="outlined" color="secondary" style={{ borderRadius: 6, padding: '10px 20px' }} onClick={onClose}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Batal</Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: 6, padding: '10px 20px' }}
              onClick={handleUpdate}
              disabled={
                Object.keys(inputValue)
                  ?.map((item) => inputValue[item])
                  .reduce((a, b) => a + b, 0) < 100 ||
                Object.keys(inputValue)
                  ?.map((item) => inputValue[item])
                  .reduce((a, b) => a + b, 0) > 100
              }>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Konfirmasi</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalCharacteristic;
