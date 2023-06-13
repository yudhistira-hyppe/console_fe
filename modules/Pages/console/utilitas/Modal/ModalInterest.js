import { AddPhotoAlternate } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useCreateInterestMutation, useUpdateInterestMutation } from 'api/console/utilitas/interest';
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

const ModalInterest = ({ open, handleClose, data }) => {
  const classes = useStyles();
  const [urlImage, setUrlImage] = useState('');
  const [inputValue, setInputValue] = useState({
    icon: '',
    interest_id: '',
    interest_en: '',
  });
  const [createInterest, { isLoading: loadingCreate }] = useCreateInterestMutation();
  const [updateInterest, { isLoading: loadingUpdate }] = useUpdateInterestMutation();

  useEffect(() => {
    setInputValue({
      icon: '' || data?.icon,
      interest_id: data?.interestNameId || '',
      interest_en: data?.interestName || '',
    });
    setUrlImage(data?.icon);
  }, [data]);

  const handleUploadImage = (e) => {
    if (e.target.files[0]?.type !== 'image/png') {
      alert('salah format woyy 🤬');
      return;
    } else {
      const blob = new Blob(e.target.files, { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setInputValue({ ...inputValue, icon: e.target.files });
      setUrlImage(url);
    }
  };

  const checkDisable = () => {
    let disable = false;

    if (isEmpty(data)) {
      if (!inputValue?.icon || !inputValue?.interest_en || !inputValue.interest_id) {
        disable = true;
      }
    } else {
      if (
        inputValue?.icon === data?.icon &&
        inputValue?.interest_id === data?.interestNameId &&
        inputValue?.interest_en === data?.interestName
      ) {
        disable = true;
      }
    }

    return disable;
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append('interestName', inputValue?.interest_en);
    formData.append('interestNameId', inputValue?.interest_id);
    formData.append('icon_file', inputValue?.icon?.[0]);

    setInputValue({
      icon: '' || data?.icon,
      interest_id: data?.interestNameId || '',
      interest_en: data?.interestName || '',
    });
    handleClose();
    if (isEmpty(data)) {
      createInterest(formData).then((res) => {
        if (res?.data) {
          toast.success('Berhasil membuat interest');
        } else {
          toast.error(res?.error?.data?.message);
        }
      });
    } else {
      formData.append('repoID', data?._id);
      updateInterest(formData).then((res) => {
        if (res?.data) {
          toast.success('Berhasil mengupdate interest');
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
            {data ? 'Perubahan Interest' : 'Penambahan Interest Baru'}
          </Typography>

          <label htmlFor="upload_icon" style={{ width: 170 }}>
            <Box className={classes.uploadBox} style={{ width: 170 }}>
              {inputValue?.icon ? (
                <Avatar src={urlImage} alt="Thumbnail Music" variant="square" style={{ width: '100%', height: '100%' }} />
              ) : (
                <>
                  <AddPhotoAlternate style={{ fontSize: 64, color: '#DADADA' }} />
                  <Typography style={{ fontWeight: 'bold', color: '#DADADA' }}>Upload Thumbnail</Typography>
                </>
              )}
              <input hidden id="upload_icon" type="file" accept="image/png" onChange={handleUploadImage} />
            </Box>
          </label>
          <Stack direction="column" gap={2}>
            <TextField
              placeholder="Input Interest Name (ID)"
              label="Interest Name (ID)"
              color="secondary"
              value={inputValue.interest_id}
              onChange={(e) => setInputValue({ ...inputValue, interest_id: e.target.value })}
              inputProps={{
                maxLength: 30,
              }}
            />
            <TextField
              placeholder="Input Interest Name (EN)"
              label="Interest Name (EN)"
              color="secondary"
              value={inputValue.interest_en}
              onChange={(e) => setInputValue({ ...inputValue, interest_en: e.target.value })}
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
                Simpan Perubahan
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

export default ModalInterest;
