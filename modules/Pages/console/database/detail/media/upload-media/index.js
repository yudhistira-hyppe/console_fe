import React, { useEffect, useState } from 'react';
import { AddPhotoAlternate } from '@material-ui/icons';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

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

const UploadMedia = (props) => {
  const { thumbnail, dataMusic, status, setInputValue, inputValue, disabled } = props;
  const [music, setMusic] = useState(dataMusic);
  const [image, setImage] = useState(thumbnail);
  const [urlMusic, setUrlMusic] = useState(dataMusic);
  const [urlImage, setUrlImage] = useState(thumbnail);
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      const duration = document.getElementById('musicUpload')?.duration;
    }, 200);
  }, [music, urlMusic]);

  const handleUploadMedia = (e) => {
    if (e.target.files[0]?.type !== 'audio/mpeg') {
      alert('salah format woyy 🤬');
      return;
    } else {
      setMusic(e.target.files[0]);
      const blob = new Blob(e.target.files, { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setUrlMusic(url);
      setInputValue({ ...inputValue, apsaraMusic: e.target.files[0] });
    }
  };

  const handleUploadImage = (e) => {
    if (e.target.files[0]?.type !== 'image/png') {
      alert('salah format woyy 🤬');
      return;
    } else {
      setImage(e.target.files[0]);
      const blob = new Blob(e.target.files, { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setUrlImage(url);
      setInputValue({ ...inputValue, apsaraThumnail: e.target.files[0] });
    }
  };

  return (
    <>
      <label htmlFor={status === 'create' && 'upload_image'} style={{ width: '100%' }}>
        <Box className={classes.uploadBox} style={{ width: status !== 'create' ? '100%' : 170 }}>
          {image ? (
            <Avatar src={urlImage} alt="Thumbnail Music" variant="square" style={{ width: '100%', height: 'auto' }} />
          ) : (
            <>
              <AddPhotoAlternate style={{ fontSize: 64, color: '#DADADA' }} />
              <Typography style={{ fontWeight: 'bold', color: '#DADADA' }}>Upload Thumbnail</Typography>
            </>
          )}
          <input hidden id="upload_image" type="file" accept="image/png" onChange={handleUploadImage} disabled={disabled} />
        </Box>
      </label>
      <Stack direction="row" gap="12px">
        {urlMusic && <audio id="musicUpload" controls src={urlMusic} style={{ width: status !== 'create' ? 170 : 300 }} />}
        {status === 'create' && (
          <Button
            variant={urlMusic ? 'outlined' : 'contained'}
            color="secondary"
            style={{ fontWeight: 'bold', height: 54, width: status !== 'create' ? '100%' : 170 }}
            component="label"
            disabled={disabled}>
            Upload Lagu
            <input hidden id="upload" type="file" accept="audio/mpeg" onChange={handleUploadMedia} disabled={disabled} />
          </Button>
        )}
      </Stack>
    </>
  );
};

export default UploadMedia;
