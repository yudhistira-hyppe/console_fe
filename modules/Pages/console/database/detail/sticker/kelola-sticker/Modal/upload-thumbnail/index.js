import React, { useEffect, useState } from 'react';
import { CloudUpload } from '@material-ui/icons';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

const UploadThumbnail = (props) => {
  const { thumbnail = '', setInputValue, inputValue, disabled } = props;
  const [image, setImage] = useState(thumbnail);
  const [urlImage, setUrlImage] = useState(thumbnail);

  const handleUploadImage = (e) => {
    if (e.target.files[0]?.type !== 'image/png' && e.target.files[0]?.type !== 'image/svg+xml') {
      alert('salah format woyy 🤬');
      return;
    } else {
      setImage(e.target.files[0]);
      const blob = new Blob(e.target.files, { type: e.target.files[0]?.type });
      const url = URL.createObjectURL(blob);
      setUrlImage(url);
      setInputValue({ ...inputValue, image: e.target.files[0] });
    }
  };

  return (
    <>
      <label htmlFor="upload_thumbnail" style={{ width: 170, height: 170 }}>
        <Box
          style={{
            backgroundColor: '#E8E8E8A6',
            border: '1px dashed #737373',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 12,
            maxHeight: 170,
            maxWidth: 170,
            height: '100%',
            width: '100%',
            cursor: 'pointer',
            overflow: 'hidden',
          }}>
          {image ? (
            <Avatar src={urlImage} alt="Thumbnail Efek" variant="square" style={{ width: '100%', height: '100%' }} />
          ) : (
            <>
              <CloudUpload style={{ fontSize: 64, color: '#DADADA' }} />
              <Typography style={{ fontWeight: 'bold', color: '#DADADA', fontSize: 13, fontFamily: 'Normal' }}>
                Tambahkan dari perangkat
              </Typography>
            </>
          )}
          <input
            hidden
            id="upload_thumbnail"
            type="file"
            accept="image/png,image/svg+xml"
            onChange={handleUploadImage}
            disabled={disabled}
          />
        </Box>
      </label>
    </>
  );
};

export default UploadThumbnail;
