import { AddPhotoAlternate } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, MenuItem, Modal, Stack, TextField, Typography } from '@mui/material';
import { useCreateBadgeChallengeMutation, useUpdateBadgeChallengeMutation } from 'api/console/utilitas/badge';
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

const ModalBadge = ({ open, handleClose, data }) => {
  const classes = useStyles();
  const [urlImage, setUrlImage] = useState({
    profile: '',
    other: '',
  });
  const [inputValue, setInputValue] = useState({
    profile: '',
    other: '',
    name: '',
    type: '',
  });
  const [createBadge, { isLoading: loadingCreate }] = useCreateBadgeChallengeMutation();
  const [updateBadge, { isLoading: loadingUpdate }] = useUpdateBadgeChallengeMutation();

  useEffect(() => {
    setInputValue({
      profile: data?.badgeProfile || '',
      other: data?.badgeOther || '',
      name: data?.name || '',
      type: data?.type || '',
    });
    setUrlImage({
      profile: data?.badgeProfile || '',
      other: data?.badgeOther || '',
    });
  }, [data]);

  function formatBytes(bytes) {
    return (bytes / Math.pow(1024, 2)).toFixed(1);
  }

  const handleUploadImage = (e, kind) => {
    if (e.target.files[0]?.type !== 'image/png') {
      alert('salah format woyy 🤬');
      return;
    } else {
      const blob = new Blob(e.target.files, { type: e.target.files[0]?.type });
      const url = URL.createObjectURL(blob);
      let img = new Image();
      img.src = url;
      img.onload = () => {
        if (img.width > 80 && img.height > 80) {
          alert('ukuran imagenya kegedean woyy 🤬');
          return;
        }
        if (formatBytes(e.target.files[0].size) >= 2) {
          alert('size filenya kegedean woyy 🤬');
        } else {
          setInputValue({ ...inputValue, [kind]: e.target.files[0] });
          setUrlImage({
            ...urlImage,
            [kind]: url,
          });
        }
      };
    }
  };

  const checkDisable = () => {
    let disable = false;

    if (isEmpty(data)) {
      if (!inputValue?.profile || !inputValue?.other || !inputValue?.name || !inputValue?.type) {
        disable = true;
      }
    } else {
      if (
        inputValue?.name === data?.name &&
        inputValue?.type === data?.type &&
        inputValue?.profile === data?.badgeProfile &&
        inputValue?.other === data?.badgeOther
      ) {
        disable = true;
      }
    }

    return disable;
  };

  console.log(inputValue);

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append('name', inputValue?.name);
    formData.append('type', inputValue?.type);
    formData.append('badge_profile', inputValue?.profile);
    formData.append('badge_general', inputValue?.other);

    setInputValue({
      profile: data?.badgeProfile || '',
      other: data?.badgeOther || '',
      name: data?.name || '',
      type: data?.type || '',
    });
    handleClose();
    if (isEmpty(data)) {
      createBadge(formData).then((res) => {
        if (res?.data) {
          toast.success('Berhasil membuat interest');
        } else {
          toast.error(res?.error?.data?.message);
        }
      });
    } else {
      updateBadge({ id: data?._id, formData }).then((res) => {
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
            {data ? 'Perubahan Badge' : 'Penambahan Badge Baru'}
          </Typography>

          <Stack direction="row" justifyContent="space-between">
            <label htmlFor="upload_badge_profile" style={{ width: 170 }}>
              <Box className={classes.uploadBox} style={{ width: 170 }}>
                {inputValue?.profile ? (
                  <Avatar
                    src={urlImage.profile}
                    alt="Thumbnail Music"
                    variant="square"
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <>
                    <AddPhotoAlternate style={{ fontSize: 64, color: '#DADADA' }} />
                    <Typography style={{ fontWeight: 'bold', color: '#DADADA' }}>Badge Profile</Typography>
                  </>
                )}
                <input
                  hidden
                  id="upload_badge_profile"
                  type="file"
                  accept="image/png"
                  onChange={(e) => handleUploadImage(e, 'profile')}
                />
              </Box>
            </label>

            <label htmlFor="upload_badge_other" style={{ width: 170 }}>
              <Box className={classes.uploadBox} style={{ width: 170 }}>
                {inputValue?.other ? (
                  <Avatar
                    src={urlImage.other}
                    alt="Thumbnail Music"
                    variant="square"
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <>
                    <AddPhotoAlternate style={{ fontSize: 64, color: '#DADADA' }} />
                    <Typography style={{ fontWeight: 'bold', color: '#DADADA' }}>Badge Other</Typography>
                  </>
                )}
                <input
                  hidden
                  id="upload_badge_other"
                  type="file"
                  accept="image/png"
                  onChange={(e) => handleUploadImage(e, 'other')}
                />
              </Box>
            </label>
          </Stack>

          <Stack direction="column" gap={2}>
            <TextField
              placeholder="Input Nama Badge"
              label="Nama Badge"
              color="secondary"
              value={inputValue.name}
              onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
              inputProps={{
                maxLength: 30,
              }}
            />
            <TextField
              label="Tipe Badge"
              select
              color="secondary"
              value={inputValue.type}
              onChange={(e) => setInputValue({ ...inputValue, type: e.target.value })}>
              <MenuItem value="JUARA1">Juara 1</MenuItem>
              <MenuItem value="JUARA2">Juara 2</MenuItem>
              <MenuItem value="JUARA3">Juara 3</MenuItem>
            </TextField>
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
                {!isEmpty(data) ? 'Simpan Perubahan' : 'Tambah'}
              </Typography>
            </LoadingButton>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ height: 40 }}
              onClick={() => {
                handleClose();
                setUrlImage({
                  profile: '',
                  other: '',
                });
                setInputValue({
                  profile: '',
                  other: '',
                  name: '',
                  type: '',
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

export default ModalBadge;
