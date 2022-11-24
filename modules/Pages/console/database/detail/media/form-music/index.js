import React, { useState } from 'react';
import { Button, Card, MenuItem, Select, Stack } from '@mui/material';
import { TextField, Typography } from '@material-ui/core';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ModalDelete from '../Modal/ModalDelete';
import ModalSave from '../Modal/ModalSave';
import ModalConfirmation from '../Modal/ModalConfirmation';
import {
  useGetGenreMusicQuery,
  useGetMoodMusicQuery,
  useGetThemeMusicQuery,
  useUpdateMusicMutation,
} from 'api/console/database/media';
import moment from 'moment';
import router from 'next/router';
import UploadMedia from '../upload-media';

const FormMusic = (props) => {
  const { status, data, id } = props;
  const [inputValue, setInputValue] = useState({
    name: data?.musicTitle || '',
    artist: data?.artistName || '',
    album: data?.albumName || '',
    releasedAt: moment(data?.releaseDate) || null,
    genre: data?.genre || '',
    theme: data?.theme || '',
    mood: data?.mood || '',
  });
  const [modal, setModal] = useState({
    delete: false,
    save: false,
    confirmation: false,
    status: '',
  });

  const { data: genres } = useGetGenreMusicQuery();
  const { data: themes } = useGetThemeMusicQuery();
  const { data: moods } = useGetMoodMusicQuery();
  const [updateMusic] = useUpdateMusicMutation();

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
  };

  const handleUpdate = () => {
    let bodyData = {
      _id: id,
      musicTitle: inputValue.name,
      artistName: inputValue.artist,
      albumName: inputValue.album,
      releaseDate: inputValue.releasedAt,
      genre: inputValue.genre,
      theme: inputValue.theme,
      mood: inputValue.mood,
      apsaraMusic: data?.apsaraMusic,
      apsaraThumnail: data?.apsaraThumnail,
    };

    updateMusic(bodyData).then(() => router.replace('/database/media'));
    setModal({ ...modal, save: !modal.save });
  };

  return (
    <>
      <ModalDelete showModal={modal.delete} onClose={() => setModal({ ...modal, delete: !modal.delete })} />
      <ModalSave showModal={modal.save} onClose={() => setModal({ ...modal, save: !modal.save })} onConfirm={handleUpdate} />
      <ModalConfirmation
        showModal={modal.confirmation}
        status={modal.status}
        onClose={() => setModal({ ...modal, confirmation: !modal.confirmation, status: '' })}
      />

      <Card style={{ padding: '20px 35px 20px 20px', height: '100%' }}>
        <Stack direction={status !== 'create' ? 'row' : 'column'} gap="24px">
          <Stack direction="column" width="100%" maxWidth={status !== 'create' ? 170 : '100%'} gap="12px">
            <UploadMedia />
          </Stack>
          <Stack direction={status !== 'create' ? 'column' : 'row'} flexWrap="wrap" width="100%" gap="24px">
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Judul Musik <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="name"
                value={inputValue.name}
                variant="outlined"
                placeholder="Tulis Judul Musik"
                onChange={handleChangeInput}
              />
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Nama Artis <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="artist"
                value={inputValue.artist}
                variant="outlined"
                placeholder="Tulis Nama Artis"
                onChange={handleChangeInput}
              />
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>Nama Album</Typography>
              <TextField
                name="album"
                value={inputValue.album}
                variant="outlined"
                placeholder="Tulis Nama Album"
                onChange={handleChangeInput}
              />
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>Tanggal Liris Lagu</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: '' }}>
                <MobileDatePicker
                  value={inputValue.releasedAt}
                  onChange={(newValue) => {
                    setInputValue({ ...inputValue, releasedAt: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField name="releasedAt" variant="outlined" placeholder="Pilih Tanggal Liris Lagu" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Genre <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <Select
                name="genre"
                value={inputValue.genre}
                placeholder="Pilih Genre Musik"
                onChange={handleChangeInput}
                color="secondary"
                displayEmpty>
                <MenuItem value="" disabled>
                  Pilih Genre Musik
                </MenuItem>
                {genres?.data?.length >= 1 &&
                  genres?.data?.map((item, key) => (
                    <MenuItem key={key} value={item?._id}>
                      {item?.name || '-'}
                    </MenuItem>
                  ))}
              </Select>
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Tema <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <Select
                name="theme"
                value={inputValue.theme}
                placeholder="Pilih Tema Musik"
                onChange={handleChangeInput}
                color="secondary"
                displayEmpty>
                <MenuItem value="" disabled>
                  Pilih Tema Musik
                </MenuItem>
                {themes?.data?.length >= 1 &&
                  themes?.data?.map((item, key) => (
                    <MenuItem key={key} value={item?._id}>
                      {item?.name || '-'}
                    </MenuItem>
                  ))}
              </Select>
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Suasana Hati <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <Select
                name="mood"
                value={inputValue.mood}
                placeholder="Pilih Suasana Hati Musik"
                onChange={handleChangeInput}
                color="secondary"
                displayEmpty>
                <MenuItem value="" disabled>
                  Pilih Suasana Hati Musik
                </MenuItem>
                {moods?.data?.length >= 1 &&
                  moods?.data?.map((item, key) => (
                    <MenuItem key={key} value={item?._id}>
                      {item?.name || '-'}
                    </MenuItem>
                  ))}
              </Select>
            </Stack>
            <Stack direction="row" flexWrap="wrap" columnGap="32px" rowGap="12px" width="100%">
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 'fit-content', fontWeight: 'bold' }}
                onClick={() => setModal({ ...modal, save: !modal.save })}
                disabled={
                  !inputValue.name || !inputValue.artist || !inputValue.genre || !inputValue.theme || !inputValue.mood
                }>
                Simpan & Post
              </Button>
              {status !== 'create' && (
                <>
                  <Button
                    variant="text"
                    color="secondary"
                    style={{ width: 'fit-content', fontWeight: 'bold' }}
                    onClick={() => setModal({ ...modal, confirmation: !modal.confirmation, status: 'disactive' })}>
                    Nonaktifkan
                  </Button>
                  <Typography style={{ color: '#3f3f3f' }}>
                    Hapus Musik Ini?{' '}
                    <span
                      style={{ color: '#AB22AF', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setModal({ ...modal, delete: !modal.delete })}>
                      Klik disini
                    </span>
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default FormMusic;
