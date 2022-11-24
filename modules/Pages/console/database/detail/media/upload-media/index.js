import { Audiotrack } from '@material-ui/icons';
import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
    gap: 6,
    height: 170,
    width: '100%',
    cursor: 'pointer',
  },
}));

const UploadMedia = (props) => {
  const { thumbnail, dataMusic, status } = props;
  const [music, setMusic] = useState(dataMusic);
  const [urlMusic, setUrlMusic] = useState(dataMusic);
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      const duration = document.getElementById('musicUpload')?.duration;
    }, 200);
  }, [music, urlMusic]);

  const handleUpload = (e) => {
    if (e.target.files[0]?.type !== 'audio/mpeg') {
      alert('salah format woyy 🤬');
      return;
    } else {
      setMusic(e.target.files[0]);
      const blob = new Blob(e.target.files, { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setUrlMusic(url);
    }

    console.log(e.target.files[0]);
  };

  return (
    <>
      <label htmlFor="upload">
        <Box className={classes.uploadBox}>
          {thumbnail ? (
            <Avatar src={thumbnail} alt="Thumbnail Music" variant="square" style={{ width: '100%', height: 'auto' }} />
          ) : (
            <>
              <Audiotrack style={{ fontSize: 64, color: '#DADADA' }} />
              <Typography style={{ fontWeight: 'bold', color: '#DADADA' }}>Upload Lagu</Typography>
            </>
          )}
        </Box>
        <input hidden id="upload" type="file" accept="audio/mpeg" onChange={handleUpload} />
      </label>
      {urlMusic && <audio id="musicUpload" controls src={urlMusic} style={{ width: status !== 'create' ? 170 : '100%' }} />}
    </>
  );
};

export default UploadMedia;
