import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useCreateSettingMutation } from 'api/console/utilitas/setting';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const ModalSetting = ({ open, handleClose }) => {
  const [inputValue, setInputValue] = useState({
    jenis: '',
    value: '',
    remark: '',
  });
  const [createSetting, { isLoading }] = useCreateSettingMutation();

  const handleSubmit = () => {
    handleClose();
    setInputValue({
      jenis: '',
      value: '',
      remark: '',
    });
    createSetting(inputValue).then((res) => {
      if (res.data) {
        toast.success('Berhasil menambahkan setting');
      } else {
        toast.error(res?.error?.data?.message);
      }
    });
  };

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" gap={3}>
          <Typography style={{ fontWeight: 'bold', fontSize: 24 }}>Penambahan Setting Baru</Typography>
          <Stack direction="column" gap={2}>
            <TextField
              placeholder="Input Nama Setting"
              label="Nama Setting"
              color="secondary"
              value={inputValue.jenis}
              onChange={(e) => setInputValue({ ...inputValue, jenis: e.target.value })}
              inputProps={{
                maxLength: 30,
              }}
            />
            <TextField
              placeholder="Input Value Setting"
              label="Value Setting"
              color="secondary"
              value={inputValue.value}
              onChange={(e) => setInputValue({ ...inputValue, value: e.target.value })}
              inputProps={{
                min: 0,
                onKeyPress: (event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                },
              }}
            />
            <TextField
              placeholder="Input Remark Setting"
              label="Remark Setting"
              color="secondary"
              value={inputValue.remark}
              onChange={(e) => setInputValue({ ...inputValue, remark: e.target.value })}
              inputProps={{
                maxLength: 30,
              }}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ height: 40 }}
              onClick={handleSubmit}
              disabled={isLoading || !inputValue.jenis || !inputValue.remark || !inputValue.value}>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                Tambah
              </Typography>
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ height: 40 }}
              onClick={() => {
                handleClose();
                setInputValue({
                  jenis: '',
                  value: '',
                  remark: '',
                });
              }}>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                Batal
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalSetting;
