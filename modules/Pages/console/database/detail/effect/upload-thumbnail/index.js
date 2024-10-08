import React, { useEffect, useState } from 'react';
import { CloudUpload } from '@material-ui/icons';
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

const UploadThumbnail = (props) => {
  const { thumbnail, status, setInputValue, inputValue, disabled } = props;
  const [image, setImage] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (status !== 'create') {
      setImage(thumbnail);
      setUrlImage(thumbnail);
    }
  }, []);

  const handleUploadImage = (e) => {
    if (e.target.files[0]?.type !== 'image/png') {
      alert('salah format woyy 🤬');
      return;
    } else {
      setImage(e.target.files[0]);
      const blob = new Blob(e.target.files, { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setUrlImage(url);
      setInputValue({ ...inputValue, imageFile: e.target.files[0] });
    }
  };

  return (
    <>
      <label htmlFor={status === 'create' && 'upload_thumbnail'} style={{ width: '100%' }}>
        <Box className={classes.uploadBox}>
          {image ? (
            <Avatar src={urlImage} alt="Thumbnail Efek" variant="square" style={{ width: 'auto', height: '100%' }} />
          ) : (
            <>
              <CloudUpload style={{ fontSize: 64, color: '#DADADA' }} />
              <Typography style={{ fontWeight: 'bold', color: '#DADADA' }}>Upload Thumbnail</Typography>
            </>
          )}
          <input
            hidden
            id="upload_thumbnail"
            type="file"
            accept="image/png"
            onChange={handleUploadImage}
            disabled={disabled}
          />
        </Box>
      </label>
    </>
  );
};

export default UploadThumbnail;
