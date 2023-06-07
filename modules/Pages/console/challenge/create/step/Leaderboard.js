import { Typography } from '@material-ui/core';
import { Add, CloudUpload, InfoOutlined } from '@material-ui/icons';
import { Avatar, Box, Card, Stack, Switch, Tooltip } from '@mui/material';
import { debounce } from 'lodash';
import React, { useState } from 'react';

const ComponentStepLeaderboard = ({ inputValue, handleInputChange }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [customColor, setCustomColor] = useState(false);
  const [image, setImage] = useState();
  const [urlImage, setUrlImage] = useState();

  function formatBytes(bytes) {
    return (bytes / Math.pow(1024, 2)).toFixed(1);
  }

  const handleUploadImage = (e) => {
    if (
      e.target.files[0]?.type !== 'image/png' &&
      e.target.files[0]?.type !== 'image/jpeg' &&
      e.target.files[0]?.type !== 'image/jpg' &&
      e.target.files[0]?.type !== 'image/gif'
    ) {
      alert('salah format woyy 🤬');
      return;
    } else {
      const blob = new Blob(e.target.files, { type: e.target.files[0]?.type });
      const url = URL.createObjectURL(blob);
      let img = new Image();
      img.src = url;
      img.onload = () => {
        if (img.width > 375 && img.height > 176) {
          alert('ukuran imagenya kegedean woyy 🤬');
          return;
        }
        if (formatBytes(e.target.files[0].size) >= 2) {
          alert('size filenya kegedean woyy 🤬');
        } else {
          setImage(e.target.files[0]);
          setUrlImage(url);
          handleInputChange('banner_leaderboard', e.target.files[0]);
        }
      };
    }
  };

  return (
    <Card sx={{ padding: 3 }}>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography style={{ fontWeight: 'bold' }}>Leaderboard</Typography>
          <Tooltip
            title={
              <Stack direction="column" p="8px">
                <Typography style={{ fontSize: 12 }}>
                  <strong>Dengan Undangan</strong>: Hanya user yang diundang yang dapat mengikuti challenge
                </Typography>
                <Typography style={{ fontSize: 12 }}>
                  <strong>Semua Pengguna</strong>: Semua user dapat mengikuti challenge
                </Typography>
              </Stack>
            }
            arrow>
            <InfoOutlined style={{ fontSize: 14 }} />
          </Tooltip>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>Tampilkan Badge di Leaderboard</Typography>
          <Switch
            checked={inputValue?.show_badge_leaderboard || false}
            color="secondary"
            onChange={() => handleInputChange('show_badge_leaderboard', !inputValue?.show_badge_leaderboard)}
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>Banner Leaderboard</Typography>
          <Stack direction="row" spacing={3}>
            <label htmlFor="banner-background">
              <Box
                style={{
                  width: 375,
                  height: 176,
                  border: '1px dashed #9B9B9B',
                  borderRadius: 4,
                  backgroundColor: '#F0F0F0',
                  cursor: 'pointer',
                }}>
                {image ? (
                  <Avatar src={urlImage} style={{ width: '100%', height: '100%' }} variant="rounded" />
                ) : (
                  <Stack direction="column" alignItems="center" justifyContent="center" spacing={1} height="100%">
                    <CloudUpload style={{ fontSize: 36, color: '#9B9B9B' }} />
                    <Typography style={{ fontWeight: 'bold', color: '#9B9B9B' }}>Tambahkan dari Perangkat</Typography>
                  </Stack>
                )}
                <input
                  hidden
                  id="banner-background"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleUploadImage}
                />
              </Box>
            </label>
            <Stack direction="column" spacing={1}>
              <Typography style={{ fontWeight: 'bold', color: '#737373' }}>Ketentuan Gambar</Typography>
              <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran Gambar : 375px x 176px</Typography>
              <Typography style={{ color: '#737373', fontSize: 14 }}>Format Gambar : JPEG, PNG dan GIF</Typography>
              <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran File : Min 800kb - Max 2mb</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>Warna Background</Typography>
          <Stack direction="row" spacing={2}>
            <Box
              style={{
                backgroundColor: '#AB22AF',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#AB22AF' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#AB22AF');
                setCustomColor(false);
              }}
            />
            <Box
              style={{
                backgroundColor: '#3D4C9B',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#3D4C9B' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#3D4C9B');
                setCustomColor(false);
              }}
            />
            <Box
              style={{
                backgroundColor: '#455DD8',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#455DD8' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#455DD8');
                setCustomColor(false);
              }}
            />
            <Box
              style={{
                backgroundColor: '#23ADC0',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#23ADC0' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#23ADC0');
                setCustomColor(false);
              }}
            />
            <Box
              style={{
                backgroundColor: '#8019D8',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#8019D8' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#8019D8');
                setCustomColor(false);
              }}
            />
            <Box
              style={{
                backgroundColor: '#FF8C00',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#FF8C00' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#FF8C00');
                setCustomColor(false);
              }}
            />
            <Box
              style={{
                backgroundColor: '#01864E',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#01864E' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#01864E');
                setCustomColor(false);
              }}
            />
            <Box
              style={{
                backgroundColor: '#FFC700',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#FFC700' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#FFC700');
                setCustomColor(false);
              }}
            />
            <Box
              style={{
                backgroundColor: '#E6094B',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#E6094B' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#E6094B');
                setCustomColor(false);
              }}
            />
            <Box
              style={{
                backgroundColor: '#A358E7',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color === '#A358E7' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', '#A358E7');
                setCustomColor(false);
              }}
            />
            <label
              htmlFor="input-color"
              style={{
                height: 40,
                width: 40,
                border: customColor ? '3px inset black' : '1px dashed #9B9B9B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedColor,
              }}>
              {!selectedColor && <Add style={{ color: '#9B9B9B' }} />}
              <input
                id="input-color"
                type="color"
                style={{ opacity: 0, position: 'absolute' }}
                onChange={debounce((e) => {
                  setSelectedColor(e.target.value);
                  setCustomColor(true);
                  handleInputChange('banner_background_color', e.target.value);
                }, 200)}
              />
            </label>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ComponentStepLeaderboard;
