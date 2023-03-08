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
    height: 240,
    width: '100%',
    cursor: 'pointer',
    overflow: 'hidden',
  },
}));

const UploadEffect = (props) => {
  const { status, setInputValue, inputValue, disabled } = props;
  const [effect, setEffect] = useState('');
  const [urlEffect, setUrlEffect] = useState('');
  const classes = useStyles();

  const handleUploadEffect = (e) => {
    console.log('upload effect');
    if (e.target.files[0]?.type !== 'image/png') {
      alert('salah format woyy 🤬');
      return;
    } else {
      setEffect(e.target.files[0]);
      const blob = new Blob(e.target.files, { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setUrlEffect(url);
      setInputValue({ ...inputValue, apsaraThumnail: e.target.files[0] });
    }
  };

  return (
    <>
      <label htmlFor={status === 'create' && 'upload_effect'} style={{ width: '100%' }}>
        <Box className={classes.uploadBox}>
          {effect ? (
            <Avatar src={urlEffect} alt="Efek" variant="square" style={{ width: '100%', height: 'auto' }} />
          ) : (
            <>
              <CloudUpload style={{ fontSize: 64, color: '#DADADA' }} />
              <Typography style={{ fontWeight: 'bold', color: '#DADADA' }}>Upload Efek</Typography>
            </>
          )}
          <input
            hidden
            id="upload_effect"
            type="file"
            accept="image/png"
            onChange={handleUploadEffect}
            disabled={disabled}
          />
        </Box>
      </label>
    </>
  );
};

export default UploadEffect;
