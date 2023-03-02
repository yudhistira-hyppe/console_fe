import React, { useState } from 'react';
import { Button, Card, MenuItem, Select, Stack } from '@mui/material';
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
} from 'api/console/database/media';
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
    effectName: '',
    category: [],
    status: '',
    apsaraThumnail: '',
  });
  const [modal, setModal] = useState({
    delete: false,
    save: false,
    confirmation: false,
    status: '',
  });
  const [loading, setLoading] = useState(false);

  const { data: genres } = useGetGenreMusicQuery();

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
    setModal({ ...modal, save: !modal.save });
  };

  const handleUpdate = () => {
    setModal({ ...modal, save: !modal.save });
  };

  return (
    <>
      <ModalDelete showModal={modal.delete} onClose={() => setModal({ ...modal, delete: !modal.delete })} />
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

      <Card style={{ padding: 34 }}>
        <Stack direction={status !== 'create' ? 'row' : 'column'} gap="24px">
          <Stack direction="column" width="100%" maxWidth={status !== 'create' ? 170 : '100%'} gap="12px">
            <UploadMedia
              thumbnail={data?.apsaraThumnailUrl}
              dataMusic={data?.music?.PlayURL}
              status={status}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
          </Stack>
          <Stack direction={status !== 'create' ? 'column' : 'row'} flexWrap="wrap" width="100%" gap="24px">
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Nama Efek <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="effectName"
                value={inputValue.effectName}
                variant="outlined"
                placeholder="Nama Efek"
                onChange={handleChangeInput}
              />
            </Stack>
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '48%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Category <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <Select
                name="category"
                value={inputValue.category}
                placeholder="Pilih Category Efek"
                onChange={handleChangeInput}
                color="secondary"
                displayEmpty>
                <MenuItem value="" disabled>
                  Pilih Category Efek
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
                Status <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <Select
                name="status"
                value={inputValue.status}
                placeholder="Pilih Status"
                onChange={handleChangeInput}
                color="secondary"
                displayEmpty>
                <MenuItem value="" disabled>
                  Pilih Status
                </MenuItem>
                <MenuItem value="aktif">Aktif</MenuItem>
                <MenuItem value="nonaktif">Tidak Aktif</MenuItem>
              </Select>
            </Stack>
            <Stack direction="column" rowGap="12px" width="100%">
              <LoadingButton
                loading={loading}
                variant="contained"
                color="secondary"
                style={{ width: 'fit-content', fontWeight: 'bold' }}
                onClick={() => setModal({ ...modal, save: !modal.save })}
                disabled={
                  !inputValue.effectName || !inputValue.category || !inputValue.status || !inputValue.apsaraThumnail
                }>
                Terapkan
              </LoadingButton>
              {status !== 'create' && (
                <Typography style={{ color: '#3f3f3f' }}>
                  Hapus Efek Ini?{' '}
                  <span
                    style={{ color: '#AB22AF', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => setModal({ ...modal, delete: !modal.delete })}>
                    Klik disini
                  </span>
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default FormMusic;
