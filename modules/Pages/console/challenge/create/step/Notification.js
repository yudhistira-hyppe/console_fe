import { Typography } from '@material-ui/core';
import { CloudUpload, InfoOutlined } from '@material-ui/icons';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import React from 'react';

let notificationItem = [
  { type: 'upcoming', label: 'Akan Datang' },
  { type: 'start', label: 'Challenge Dimulai' },
  { type: 'update', label: 'Update Leaderboard' },
  { type: 'will_end', label: 'Challenge Akan Berakhir' },
  { type: 'end', label: 'Challenge Berakhir' },
  { type: 'winner', label: 'Untuk Pemenang' },
];

const ComponentStepNotification = ({ inputValue, handleInputChange }) => {
  function formatBytes(bytes) {
    return (bytes / Math.pow(1024, 2)).toFixed(1);
  }

  const handleUploadImage = (e, kind) => {
    if (
      e.target.files[0]?.type !== 'image/png' &&
      e.target.files[0]?.type !== 'image/jpeg' &&
      e.target.files[0]?.type !== 'image/jpg'
    ) {
      alert('salah format woyy 🤬');
      return;
    } else {
      const blob = new Blob(e.target.files, { type: e.target.files[0]?.type });
      const url = URL.createObjectURL(blob);
      let img = new Image();
      img.src = url;
      img.onload = () => {
        if (img.width > 343 || img.height > 103) {
          alert('ukuran imagenya kegedean woyy 🤬');
          return;
        }
        if (formatBytes(e.target.files[0].size) >= 2) {
          alert('size filenya kegedean woyy 🤬');
        } else {
          handleInputChange(kind, {
            file: e.target.files[0],
            url: url,
          });
        }
      };
    }
  };

  const handleUploadPopup = (e, kind) => {
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
        if (img.width > 326 || img.height > 326) {
          alert('ukuran imagenya kegedean woyy 🤬');
          return;
        }
        if (formatBytes(e.target.files[0].size) >= 2) {
          alert('size filenya kegedean woyy 🤬');
        } else {
          handleInputChange(kind, {
            file: e.target.files[0],
            url: url,
          });
        }
      };
    }
  };

  return (
    <Card sx={{ padding: 3 }}>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography style={{ fontWeight: 'bold' }}>Notifikasi Challenge</Typography>
          <Tooltip
            title={
              <Stack direction="column" p="8px">
                <Typography style={{ fontSize: 12 }}>
                  Pilih jenis notifikasi challenge (banner atau pop-up). Notifikasi ini akan muncul di aplikasi Hyppe sesuai
                  dengan pilihan yang Anda tentukan
                </Typography>
              </Stack>
            }
            arrow>
            <InfoOutlined style={{ fontSize: 14 }} />
          </Tooltip>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>
              Banner Search<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Tooltip
              title={
                <Stack direction="column" p="8px">
                  <Typography style={{ fontSize: 12 }}>
                    Banner ini akan muncul pada halaman search, dan digunakan pada halaman detail challenge.
                  </Typography>
                </Stack>
              }
              arrow>
              <InfoOutlined style={{ fontSize: 14 }} />
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={3}>
            <label htmlFor="banner-search">
              <Box
                style={{
                  width: 343,
                  height: 103,
                  border: '1px dashed #9B9B9B',
                  borderRadius: 4,
                  backgroundColor: '#F0F0F0',
                  cursor: 'pointer',
                }}>
                {inputValue?.banner_search ? (
                  <Avatar src={inputValue?.banner_search?.url} style={{ width: '100%', height: '100%' }} variant="rounded" />
                ) : (
                  <Stack direction="column" alignItems="center" justifyContent="center" spacing={1} height="100%">
                    <CloudUpload style={{ fontSize: 30, color: '#9B9B9B' }} />
                    <Typography style={{ fontWeight: 'bold', color: '#9B9B9B', fontSize: 12 }}>
                      Tambahkan dari Perangkat
                    </Typography>
                  </Stack>
                )}
                <input
                  hidden
                  id="banner-search"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => handleUploadImage(e, 'banner_search')}
                />
              </Box>
            </label>
            <Stack direction="column" spacing={1}>
              <Typography style={{ fontWeight: 'bold', color: '#737373' }}>Ketentuan Gambar</Typography>
              <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran Gambar : 343px x 103px</Typography>
              <Typography style={{ color: '#737373', fontSize: 14 }}>Format Gambar : JPEG dan PNG</Typography>
              <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran File : Min 800kb - Max 2mb</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider flexItem />
        <Stack direction="column" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>
              Pop-Up<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Tooltip
              title={
                <Stack direction="column" p="8px">
                  <Typography style={{ fontSize: 12 }}>
                    Pop-Up ini akan muncul sebelum pengguna mengakses halaman beranda aplikasi Hyppe.
                  </Typography>
                </Stack>
              }
              arrow>
              <InfoOutlined style={{ fontSize: 14 }} />
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={3}>
            <label htmlFor="banner-popup">
              <Box
                style={{
                  width: 326,
                  height: 326,
                  border: '1px dashed #9B9B9B',
                  borderRadius: 4,
                  backgroundColor: '#F0F0F0',
                  cursor: 'pointer',
                }}>
                {inputValue?.banner_popup ? (
                  <Avatar src={inputValue?.banner_popup?.url} style={{ width: '100%', height: '100%' }} variant="rounded" />
                ) : (
                  <Stack direction="column" alignItems="center" justifyContent="center" spacing={1} height="100%">
                    <CloudUpload style={{ fontSize: 30, color: '#9B9B9B' }} />
                    <Typography style={{ fontWeight: 'bold', color: '#9B9B9B', fontSize: 12 }}>
                      Tambahkan dari Perangkat
                    </Typography>
                  </Stack>
                )}
                <input
                  hidden
                  id="banner-popup"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={(e) => handleUploadPopup(e, 'banner_popup')}
                />
              </Box>
            </label>
            <Stack direction="column" spacing={1}>
              <Typography style={{ fontWeight: 'bold', color: '#737373' }}>Ketentuan Gambar</Typography>
              <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran Gambar : 326px x 326px</Typography>
              <Typography style={{ color: '#737373', fontSize: 14 }}>Format Gambar : JPEG, PNG dan GIF</Typography>
              <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran File : Min 800kb - Max 2mb</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider flexItem />
        <Stack direction="column" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>
              Notifikasi Push<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Tooltip
              title={
                <Stack direction="column" p="8px">
                  <Typography style={{ fontSize: 12 }}>
                    Push notifikasi akan dikirimkan secara otomatis sesuai dengan waktu yang telah ditentukan.
                  </Typography>
                </Stack>
              }
              arrow>
              <InfoOutlined style={{ fontSize: 14 }} />
            </Tooltip>
          </Stack>
          <FormGroup>
            {notificationItem?.map((item, key) => (
              <Stack direction="column" key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type) || false}
                      onChange={() =>
                        handleInputChange(
                          'notification_push',
                          inputValue?.notification_push
                            ? inputValue?.notification_push?.find((notif) => notif?.type === item?.type)
                              ? inputValue?.notification_push?.filter((notif) => notif?.type !== item?.type)
                              : [
                                  ...inputValue?.notification_push,
                                  { type: item?.type, title: '', body: '', blast: item?.type === 'start' ? 0 : undefined },
                                ]
                            : [{ type: item?.type, title: '', body: '', blast: item?.type === 'start' ? 0 : undefined }],
                        )
                      }
                    />
                  }
                  label={item?.label}
                  style={{ width: 'fit-content' }}
                />
                <Stack direction="column" my={2}>
                  <Stack direction="row" gap={2}>
                    <Stack direction="column">
                      <TextField
                        placeholder="Tulis Judul Notifikasi (ID)"
                        color="secondary"
                        value={inputValue?.notification_push?.find((notif) => notif?.type === item?.type)?.title || ''}
                        onChange={(e) => {
                          let prevVal = inputValue?.notification_push;
                          let indexItem = prevVal?.findIndex((val) => val?.type === item?.type);
                          prevVal[indexItem].title = e.target.value;

                          handleInputChange('notification_push', prevVal);
                        }}
                        style={{
                          width: 600,
                          backgroundColor: inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)
                            ? ''
                            : '#EAEAEA',
                        }}
                        inputProps={{ maxLength: 48 }}
                        disabled={!inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)}
                      />
                      <small style={{ color: '#9B9B9B', marginTop: 6 }}>
                        {inputValue?.notification_push?.find((notif) => notif?.type === item?.type)?.title?.length || 0}/48
                        Karakter
                      </small>
                    </Stack>
                    <Stack direction="column">
                      <TextField
                        placeholder="Tulis Judul Notifikasi (EN)"
                        color="secondary"
                        value={inputValue?.notification_push?.find((notif) => notif?.type === item?.type)?.title_en || ''}
                        onChange={(e) => {
                          let prevVal = inputValue?.notification_push;
                          let indexItem = prevVal?.findIndex((val) => val?.type === item?.type);
                          prevVal[indexItem].title_en = e.target.value;

                          handleInputChange('notification_push', prevVal);
                        }}
                        style={{
                          width: 600,
                          backgroundColor: inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)
                            ? ''
                            : '#EAEAEA',
                        }}
                        inputProps={{ maxLength: 48 }}
                        disabled={!inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)}
                      />
                      <small style={{ color: '#9B9B9B', marginTop: 6 }}>
                        {inputValue?.notification_push?.find((notif) => notif?.type === item?.type)?.title_en?.length || 0}
                        /48 Karakter
                      </small>
                    </Stack>
                  </Stack>

                  <Stack direction="row" gap={2}>
                    <Stack direction="column">
                      <TextField
                        multiline
                        placeholder="Tulis Deskripsi Notifikasi (ID)"
                        color="secondary"
                        value={inputValue?.notification_push?.find((notif) => notif?.type === item?.type)?.body || ''}
                        rows={4}
                        onChange={(e) => {
                          let prevVal = inputValue?.notification_push;
                          let indexItem = prevVal?.findIndex((val) => val?.type === item?.type);
                          prevVal[indexItem].body = e.target.value;

                          handleInputChange('notification_push', prevVal);
                        }}
                        style={{
                          width: 600,
                          marginTop: 16,
                          backgroundColor: inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)
                            ? ''
                            : '#EAEAEA',
                        }}
                        inputProps={{ maxLength: 100 }}
                        disabled={!inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)}
                      />
                      <small style={{ color: '#9B9B9B', marginTop: 6 }}>
                        {inputValue?.notification_push?.find((notif) => notif?.type === item?.type)?.body?.length || 0}/100
                        Karakter
                      </small>
                    </Stack>
                    <Stack direction="column">
                      <TextField
                        multiline
                        placeholder="Tulis Deskripsi Notifikasi (EN)"
                        color="secondary"
                        value={inputValue?.notification_push?.find((notif) => notif?.type === item?.type)?.body_en || ''}
                        rows={4}
                        onChange={(e) => {
                          let prevVal = inputValue?.notification_push;
                          let indexItem = prevVal?.findIndex((val) => val?.type === item?.type);
                          prevVal[indexItem].body_en = e.target.value;

                          handleInputChange('notification_push', prevVal);
                        }}
                        style={{
                          width: 600,
                          marginTop: 16,
                          backgroundColor: inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)
                            ? ''
                            : '#EAEAEA',
                        }}
                        inputProps={{ maxLength: 100 }}
                        disabled={!inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)}
                      />
                      <small style={{ color: '#9B9B9B', marginTop: 6 }}>
                        {inputValue?.notification_push?.find((notif) => notif?.type === item?.type)?.body_en?.length || 0}
                        /100 Karakter
                      </small>
                    </Stack>
                  </Stack>

                  {item?.type !== 'start' && (
                    <Select
                      value={inputValue?.notification_push?.find((notif) => notif?.type === item?.type)?.blast || ''}
                      color="secondary"
                      onChange={(e) => {
                        let prevVal = inputValue?.notification_push;
                        let indexItem = prevVal?.findIndex((val) => val?.type === item?.type);
                        prevVal[indexItem].blast = e.target.value;

                        handleInputChange('notification_push', prevVal);
                      }}
                      style={{
                        width: 600,
                        marginTop: 16,
                        backgroundColor: inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)
                          ? ''
                          : '#EAEAEA',
                      }}
                      disabled={!inputValue?.notification_push?.map((item) => item?.type)?.includes(item?.type)}
                      displayEmpty>
                      <MenuItem value="" disabled>
                        <Typography>{item?.type === 'update' ? 'Pilih Frekuensi' : 'Atur Waktu'}</Typography>
                      </MenuItem>
                      {(item?.type === 'upcoming' || item?.type === 'will_end') && (
                        <MenuItem value="-48">
                          <Typography>48 Jam Sebelumnya</Typography>
                        </MenuItem>
                      )}
                      {(item?.type === 'upcoming' || item?.type === 'will_end') && (
                        <MenuItem value="-36">
                          <Typography>36 Jam Sebelumnya</Typography>
                        </MenuItem>
                      )}
                      {(item?.type === 'upcoming' || item?.type === 'will_end') && (
                        <MenuItem value="-24">
                          <Typography>24 Jam Sebelumnya</Typography>
                        </MenuItem>
                      )}
                      {(item?.type === 'upcoming' || item?.type === 'will_end') && (
                        <MenuItem value="-12">
                          <Typography>12 Jam Sebelumnya</Typography>
                        </MenuItem>
                      )}
                      {(item?.type === 'winner' || item?.type === 'end') && (
                        <MenuItem value="1">
                          <Typography>1 Jam Setelahnya</Typography>
                        </MenuItem>
                      )}
                      {(item?.type === 'winner' || item?.type === 'end') && (
                        <MenuItem value="2">
                          <Typography>2 Jam Setelahnya</Typography>
                        </MenuItem>
                      )}
                      {(item?.type === 'winner' || item?.type === 'end') && (
                        <MenuItem value="3">
                          <Typography>3 Jam Setelahnya</Typography>
                        </MenuItem>
                      )}
                      {item?.type === 'update' && (
                        <MenuItem value="12">
                          <Typography>1x update: 12 jam setelah jam aktif challenge</Typography>
                        </MenuItem>
                      )}
                      {item?.type === 'update' && (
                        <MenuItem value="8,16">
                          <Typography>2x update: 8 dan 16 jam setelah jam aktif challenge</Typography>
                        </MenuItem>
                      )}
                      {item?.type === 'update' && (
                        <MenuItem value="6,12,18">
                          <Typography>3x update: 6,12,&18 jam setelah jam aktif challenge</Typography>
                        </MenuItem>
                      )}
                    </Select>
                  )}
                </Stack>
              </Stack>
            ))}
          </FormGroup>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ComponentStepNotification;
