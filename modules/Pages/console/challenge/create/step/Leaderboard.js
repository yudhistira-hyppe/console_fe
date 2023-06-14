import { Typography } from '@material-ui/core';
import { Add, CloudUpload, InfoOutlined } from '@material-ui/icons';
import { Avatar, Box, Card, Stack, Switch, Tooltip } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';

const ComponentStepLeaderboard = ({ inputValue, handleInputChange }) => {
  // useEffect(() => {
  //   setinputValue?.banner_background_color(inputValue?.banner_background_color);
  //   if (inputValue?.banner_background_color) {
  //     setCustomColor(true);
  //   } else {
  //
  //   }
  // }, [handleInputChange]);

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
          handleInputChange('banner_leaderboard', { file: e.target.files[0], url: url });
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
                  Upload desain dan atur warna background leaderboard yang sesuai.
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
          <Typography>
            Banner Leaderboard<span style={{ color: 'red' }}>*</span>
          </Typography>
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
                {inputValue?.banner_leaderboard ? (
                  <Avatar
                    src={inputValue?.banner_leaderboard?.url}
                    style={{ width: '100%', height: '100%' }}
                    variant="rounded"
                  />
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
          <Typography>
            Warna Background<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Box
              style={{
                backgroundColor: '#AB22AF',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#AB22AF' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#AB22AF', custom: false });
              }}
            />
            <Box
              style={{
                backgroundColor: '#3D4C9B',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#3D4C9B' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#3D4C9B', custom: false });
              }}
            />
            <Box
              style={{
                backgroundColor: '#455DD8',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#455DD8' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#455DD8', custom: false });
              }}
            />
            <Box
              style={{
                backgroundColor: '#23ADC0',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#23ADC0' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#23ADC0', custom: false });
              }}
            />
            <Box
              style={{
                backgroundColor: '#8019D8',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#8019D8' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#8019D8', custom: false });
              }}
            />
            <Box
              style={{
                backgroundColor: '#FF8C00',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#FF8C00' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#FF8C00', custom: false });
              }}
            />
            <Box
              style={{
                backgroundColor: '#01864E',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#01864E' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#01864E', custom: false });
              }}
            />
            <Box
              style={{
                backgroundColor: '#FFC700',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#FFC700' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#FFC700', custom: false });
              }}
            />
            <Box
              style={{
                backgroundColor: '#E6094B',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#E6094B' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#E6094B', custom: false });
              }}
            />
            <Box
              style={{
                backgroundColor: '#A358E7',
                height: 40,
                width: 40,
                cursor: 'pointer',
                border: inputValue?.banner_background_color?.color === '#A358E7' ? '3px inset black' : 'none',
              }}
              onClick={() => {
                handleInputChange('banner_background_color', { color: '#A358E7', custom: false });
              }}
            />
            <label
              htmlFor="input-color"
              style={{
                height: 40,
                width: 40,
                border: inputValue?.banner_background_color?.custom ? '3px inset black' : '1px dashed #9B9B9B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: inputValue?.banner_background_color?.custom && inputValue?.banner_background_color?.color,
              }}>
              {(!inputValue?.banner_background_color?.custom || !inputValue?.banner_background_color?.color) && (
                <Add style={{ color: '#9B9B9B' }} />
              )}
              <input
                id="input-color"
                type="color"
                style={{ opacity: 0, position: 'absolute' }}
                onChange={debounce((e) => {
                  handleInputChange('banner_background_color', { color: e.target.value, custom: true });
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
