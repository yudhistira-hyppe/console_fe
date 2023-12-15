import { AddPhotoAlternate } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, MenuItem, Modal, Stack, TextField, Typography } from '@mui/material';
import { useCreateCategoryEffectMutation, useUpdateCategoryEffectMutation } from 'api/console/database';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles(() => ({
  uploadBox: {
    backgroundColor: '#E8E8E8A6',
    border: '1px dashed #737373',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 12,
    height: 170,
    width: '100%',
    cursor: 'pointer',
    overflow: 'hidden',
  },
}));

const ModalCategoryEffect = ({ open, handleClose, data }) => {
  const classes = useStyles();
  const [urlImage, setUrlImage] = useState('');
  const [inputValue, setInputValue] = useState({
    name: '',
  });
  const [createCategory, { isLoading: loadingCreate }] = useCreateCategoryEffectMutation();
  const [updateCategory, { isLoading: loadingUpdate }] = useUpdateCategoryEffectMutation();

  useEffect(() => {
    setInputValue({
      name: data?.name || '',
    });
  }, [data]);

  const checkDisable = () => {
    let disable = false;

    if (isEmpty(data)) {
      if (!inputValue?.name) {
        disable = true;
      }
    } else {
      if (inputValue?.name === data?.name) {
        disable = true;
      }
    }

    return disable;
  };

  const handleSubmit = () => {
    setInputValue({
      name: data?.name || '',
    });
    handleClose();
    if (isEmpty(data)) {
      createCategory({ name: inputValue?.name, active: true }).then((res) => {
        if (res?.data) {
          toast.success('Berhasil menambahkan kategori efek');
        } else {
          toast.error(res?.error?.data?.message);
        }
      });
    } else {
      updateCategory({ id: data?._id, data: { name: inputValue?.name, active: true } }).then((res) => {
        if (res?.data) {
          toast.success('Berhasil mengupdate kategori efek');
        } else {
          toast.error(res?.error?.data?.message);
        }
      });
    }
  };

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" gap={3}>
          <Typography style={{ fontWeight: 'bold', fontSize: 24 }}>
            {!isEmpty(data) ? 'Perubahan Kategori Efek' : 'Penambahan Kategori Efek Baru'}
          </Typography>
          <Stack direction="column" gap={2}>
            <TextField
              placeholder="Input nama kategori"
              label="Nama Kategori"
              color="secondary"
              value={inputValue.name}
              onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
              inputProps={{
                maxLength: 30,
              }}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <LoadingButton
              fullWidth
              loading={loadingUpdate || loadingCreate}
              variant="contained"
              color="secondary"
              sx={{ height: 40 }}
              onClick={handleSubmit}
              disabled={checkDisable()}>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                {data ? 'Simpan Perubahan' : 'Tambah'}
              </Typography>
            </LoadingButton>
            <Button fullWidth variant="outlined" color="secondary" sx={{ height: 40 }} onClick={handleClose}>
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

export default ModalCategoryEffect;
