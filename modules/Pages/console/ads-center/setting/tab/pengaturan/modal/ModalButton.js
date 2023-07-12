import { Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Modal, Stack, TextField } from '@mui/material';
import { useUpdateAdsButtonMutation, useUpdateAdsNotificationPushMutation } from 'api/console/ads';
import { isEmpty } from 'lodash';
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

const ModalButtonCTA = ({ open, onClose, data }) => {
  const [inputValue, setInputValue] = useState([]);
  const [updateButton] = useUpdateAdsButtonMutation();

  useEffect(() => {
    setInputValue(
      data
        ?.map((item, key) => {
          if (item?.CTAButton !== '') {
            return { index: item?.CTAButtonIndex, text: item?.CTAButton };
          }
        })
        .filter((notUndefined) => notUndefined !== undefined),
    );
  }, [open]);

  const handleUpdate = () => {
    let formData = { CTAButton: [] };

    data?.map((item, key) => {
      if (inputValue?.find((iv) => iv?.index === key)) {
        formData?.CTAButton?.push(inputValue?.find((iv) => iv?.index === key)?.text);
      } else {
        return formData?.CTAButton?.push('');
      }
    });

    updateButton(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        toast.success('Berhasil Mengupdate Text Button Ads', { duration: 3000 });
      }
      onClose();
    });
  };

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" gap="20px" style={{ padding: 20 }}>
          <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Button CTA</Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>

          <Stack direction="column" gap={1}>
            {data?.map((item, key) => (
              <Stack direction="row" alignItems="flex-start" key={key}>
                <FormControlLabel
                  label={<Typography>Button {key + 1}</Typography>}
                  control={
                    <Checkbox
                      color="secondary"
                      checked={inputValue?.map((item) => item?.index)?.includes(key) || false}
                      onChange={() => {
                        let prevVal = inputValue;

                        if (inputValue?.find((item) => item?.index === key)) {
                          prevVal = prevVal?.filter((item) => item?.index !== key);
                        } else {
                          prevVal.push({ index: key, text: '' });
                        }

                        setInputValue([...prevVal]);
                      }}
                    />
                  }
                  style={{ width: '20%', paddingTop: 5 }}
                />

                {inputValue?.map((item) => item?.index)?.includes(key) && (
                  <Stack direction="column" width="80%">
                    <TextField
                      value={inputValue?.find((iv) => iv?.index === key)?.text || ''}
                      placeholder="Masukan text button"
                      color="secondary"
                      inputProps={{ maxLength: 30 }}
                      onChange={(e) => {
                        let prevVal = inputValue;
                        let changeData = prevVal.findIndex((item) => item?.index === key);

                        prevVal[changeData]['text'] = e.target.value;
                        setInputValue([...prevVal]);
                      }}
                    />
                    <small style={{ color: '#9B9B9B', textAlign: 'right' }}>0 / 30 Karakter</small>
                  </Stack>
                )}
              </Stack>
            ))}
          </Stack>

          <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
            <Button variant="outlined" color="secondary" style={{ borderRadius: 6, padding: '10px 20px' }} onClick={onClose}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Batal</Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: 6, padding: '10px 20px' }}
              onClick={handleUpdate}
              disabled={
                isEmpty(inputValue?.map((item) => item?.index)) || inputValue?.map((item) => item?.text)?.includes('')
              }>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Simpan</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalButtonCTA;
