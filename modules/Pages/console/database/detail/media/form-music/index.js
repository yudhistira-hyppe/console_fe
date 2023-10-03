import React, { useState } from 'react';
import { Button, Card, Divider, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack } from '@mui/material';
import { TextField, Typography } from '@material-ui/core';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ModalDelete from '../Modal/ModalDelete';
import ModalSave from '../Modal/ModalSave';
import ModalConfirmation from '../Modal/ModalConfirmation';
import {
  useCreateMusicMutation,
  useGetGenreMusicQuery,
  useGetMoodMusicQuery,
  useGetThemeMusicQuery,
  useUpdateMusicMutation,
} from 'api/console/database';
import moment from 'moment';
import router from 'next/router';
import UploadMedia from '../upload-media';
import { onMediaUpload } from 'api/console/database/mediaService';
import { onImageUpload } from 'api/console/database/imageService';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-hot-toast';

const FormMusic = (props) => {
  const { status, data, id } = props;
  const [inputValue, setInputValue] = useState({
    musicTitle: data?.musicTitle || '',
    artistName: data?.artistName || '',
    albumName: data?.albumName || '',
    releaseDate: data?.releaseDate ? moment(data?.releaseDate) : null,
    genre: data?.genre || '',
    theme: data?.theme || '',
    mood: data?.mood || '',
    apsaraMusic: data?.apsaraMusic || '',
    apsaraThumnail: data?.apsaraThumnail || '',
  });
  const [modal, setModal] = useState({
    delete: false,
    save: false,
    confirmation: false,
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const { data: genres } = useGetGenreMusicQuery();
  const { data: themes } = useGetThemeMusicQuery();
  const { data: moods } = useGetMoodMusicQuery();
  const [updateMusic] = useUpdateMusicMutation();
  const [createMusic] = useCreateMusicMutation();

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
  };

  const handleApsaraMedia = async () => {
    const response = await fetch('/api/apsara-upload-media');
    const data = await response.json();

    return data;
  };

  const handleApsaraImage = async () => {
    const response = await fetch('/api/apsara-upload-image');
    const data = await response.json();

    return data;
  };

  const handleCreate = () => {
    let bodyData = inputValue;
    const uploadFileMedia = new File([inputValue.apsaraMusic], inputValue.apsaraMusic?.name, { type: 'audio/mp3' });
    const uploadFileImage = new File([inputValue.apsaraThumnail], inputValue.apsaraThumnail?.name, { type: 'image/png' });

    setLoading(true);
    const toastId = toast.loading('Loading create...', { id: 'create' });
    handleApsaraMedia().then((res) => {
      onMediaUpload(
        res,
        uploadFileMedia,
        () => {
          bodyData = { ...bodyData, apsaraMusic: res.VideoId };
          handleApsaraImage().then((res) => {
            onImageUpload(
              res,
              uploadFileImage,
              () => {
                bodyData = { ...bodyData, apsaraThumnail: res.ImageId };
                createMusic(bodyData).then((res) => {
                  if (res?.error) {
                    toast.error(res?.error?.data?.message, { id: toastId });
                  } else if (res?.data) {
                    router.push('/database/music');
                    toast.success('Berhasil membuat musik', { id: toastId });
                  }
                  setLoading(false);
                });
              },
              () => {
                toast.error('upload thumnail ke apsara gagal', { id: toastId });
                setLoading(false);
              },
            );
          });
        },
        () => {
          toast.error('upload media ke apsara gagal', { id: toastId });
          setLoading(false);
        },
      );
    });

    setModal({ ...modal, save: !modal.save });
  };

  const handleUpdate = () => {
    let bodyData = { ...inputValue, _id: id };
    const uploadFileImage = new File([inputValue.apsaraThumnail], inputValue.apsaraThumnail?.name, { type: 'image/png' });

    setLoading(true);
    const toastId = toast.loading('Loading update...', { id: 'update' });
    if (bodyData.apsaraThumnail !== data?.apsaraThumnail) {
      handleApsaraImage().then((res) => {
        onImageUpload(
          res,
          uploadFileImage,
          () => {
            bodyData = { ...bodyData, apsaraThumnail: res.ImageId };
            updateMusic(bodyData).then((res) => {
              if (res?.error) {
                toast.error(res?.error?.data?.message, { id: toastId });
              } else if (res?.data) {
                router.push('/database/music');
                toast.success('Berhasil memperbarui musik', { id: toastId });
              }
              setLoading(false);
            });
          },
          () => {
            toast.error('upload thumnail ke apsara gagal', { id: toastId });
            setLoading(false);
          },
        );
      });
    } else {
      updateMusic(bodyData).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message, { id: toastId });
        } else if (res?.data) {
          router.push('/database/music');
          toast.success('Berhasil memperbarui musik', { id: toastId });
        }
        setLoading(false);
      });
    }

    setModal({ ...modal, save: !modal.save });
  };

  return (
    <>
      <ModalDelete showModal={modal.delete} onClose={() => setModal({ ...modal, delete: !modal.delete })} id={id} />
      <ModalSave
        showModal={modal.save}
        onClose={() => setModal({ ...modal, save: !modal.save })}
        onConfirm={() => (status !== 'create' ? handleUpdate() : handleCreate())}
      />
      <ModalConfirmation
        showModal={modal.confirmation}
        status={modal.status}
        onClose={() => setModal({ ...modal, confirmation: !modal.confirmation, status: '' })}
        id={id}
      />

      <Card style={{ padding: 20, height: '100%' }}>
        <Stack direction={status !== 'create' ? 'row-reverse' : 'column'} gap="24px">
          <Stack direction="column" width="100%" maxWidth={status !== 'create' ? 170 : '100%'} gap="12px">
            <UploadMedia
              thumbnail={data?.apsaraThumnailUrl}
              dataMusic={data?.music?.PlayURL}
              status={status}
              setInputValue={setInputValue}
              inputValue={inputValue}
              disabled={
                status !== 'create'
                  ? !access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces
                  : !access.find((item) => item?.nameModule === 'database_music')?.acces?.createAcces
              }
            />
          </Stack>
          <Stack direction={status !== 'create' ? 'column' : 'row'} flexWrap="wrap" width="100%" gap="24px">
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Judul Musik <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="musicTitle"
                value={inputValue.musicTitle}
                variant="outlined"
                placeholder="Tulis Judul Musik"
                onChange={handleChangeInput}
                disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces}
              />
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Nama Artis <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="artistName"
                value={inputValue.artistName}
                variant="outlined"
                placeholder="Tulis Nama Artis"
                onChange={handleChangeInput}
                disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces}
              />
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>Nama Album</Typography>
              <TextField
                name="albumName"
                value={inputValue.albumName}
                variant="outlined"
                placeholder="Tulis Nama Album"
                onChange={handleChangeInput}
                disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces}
              />
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>Tanggal Liris Lagu</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: '' }}>
                <MobileDatePicker
                  value={inputValue.releaseDate}
                  onChange={(newValue) => {
                    setInputValue({ ...inputValue, releaseDate: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      name="releasedAt"
                      variant="outlined"
                      placeholder="Pilih Tanggal Liris Lagu"
                      disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces}
                      {...params}
                    />
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
                displayEmpty
                disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces}>
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
                displayEmpty
                disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces}>
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
                displayEmpty
                disabled={!access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces}>
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
              <LoadingButton
                loading={loading}
                variant="contained"
                color="secondary"
                style={{ width: 150, fontWeight: 'bold' }}
                onClick={() => setModal({ ...modal, save: !modal.save })}
                disabled={
                  (status !== 'create'
                    ? inputValue.musicTitle === data?.musicTitle &&
                      inputValue.artistName === data?.artistName &&
                      inputValue.genre === data?.genre &&
                      inputValue.theme === data?.theme &&
                      inputValue.mood === data?.mood &&
                      inputValue.apsaraMusic === data?.apsaraMusic &&
                      inputValue.apsaraThumnail === data?.apsaraThumnail &&
                      inputValue.albumName === data?.albumName &&
                      inputValue.releaseDate.format('DD/MM/YYYY') === moment(data?.releaseDate).format('DD/MM/YYYY')
                    : !inputValue.musicTitle ||
                      !inputValue.artistName ||
                      !inputValue.genre ||
                      !inputValue.theme ||
                      !inputValue.mood ||
                      !inputValue.apsaraMusic ||
                      !inputValue.releaseDate ||
                      !inputValue.apsaraThumnail) ||
                  !access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces
                }>
                Simpan
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
        {status !== 'create' && (
          <>
            <Divider style={{ margin: '24px 0' }} />
            <Stack direction="column" columnGap="32px" rowGap="12px" width="100%">
              <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Status <span style={{ color: '#E61D37' }}>*</span>
                </Typography>
                <RadioGroup
                  row
                  value={data?.isActive ? 'active' : 'disactive'}
                  style={{ gap: 40 }}
                  onChange={() =>
                    setModal({
                      ...modal,
                      confirmation: !modal.confirmation,
                      status: data?.isActive ? 'active' : 'disactive',
                    })
                  }>
                  <FormControlLabel
                    value="active"
                    control={<Radio color="secondary" />}
                    label={<Typography>Aktif</Typography>}
                  />
                  <FormControlLabel
                    value="disactive"
                    control={<Radio color="secondary" />}
                    label={<Typography>Tidak Aktif</Typography>}
                  />
                </RadioGroup>
              </Stack>
              <Typography style={{ color: '#3f3f3f' }}>
                Hapus Musik Ini?{' '}
                <span
                  style={{ color: '#AB22AF', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() =>
                    access.find((item) => item?.nameModule === 'database_music')?.acces?.updateAcces
                      ? setModal({ ...modal, delete: !modal.delete })
                      : alert('kamu tidak punya akses!')
                  }>
                  Klik disini
                </span>
              </Typography>
            </Stack>
          </>
        )}
      </Card>
    </>
  );
};

export default FormMusic;
