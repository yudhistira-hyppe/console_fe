import React, { useState } from 'react';
import { Button, Card, Divider, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack } from '@mui/material';
import { TextField, Typography } from '@material-ui/core';
import ModalDelete from '../Modal/ModalDelete';
import ModalSave from '../Modal/ModalSave';
import ModalConfirmation from '../Modal/ModalConfirmation';
import router from 'next/router';
import { onMediaUpload } from 'api/console/database/mediaService';
import { onImageUpload } from 'api/console/database/imageService';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-hot-toast';
import UploadThumbnail from '../upload-thumbnail';
import ModalBatal from '../Modal/ModalBatal';

const FormGIF = (props) => {
  const { status, data, id } = props;
  const [inputValue, setInputValue] = useState({
    gifName: '',
    apsaraThumbnail: '',
    status: '',
  });
  const [modal, setModal] = useState({
    delete: false,
    save: false,
    confirmation: false,
    cancel: false,
    status: '',
  });
  const [loading, setLoading] = useState(false);

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
    router.replace({ pathname: '/database/sticker', query: { tab: 'gif' } });
  };

  const handleUpdate = () => {
    setModal({ ...modal, save: !modal.save });
    router.replace({ pathname: '/database/sticker', query: { tab: 'gif' } });
  };

  console.log(inputValue);

  return (
    <>
      <ModalDelete
        showModal={modal.delete}
        onClose={() => setModal({ ...modal, delete: !modal.delete })}
        onConfirm={() => router.replace({ pathname: '/database/sticker', query: { tab: 'gif' } })}
      />
      <ModalSave
        status={status}
        statusCreate={inputValue.status}
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
      <ModalBatal
        showModal={modal.cancel}
        onClose={() => setModal({ ...modal, cancel: !modal.cancel })}
        onConfirm={() => router.replace({ pathname: '/database/sticker', query: { tab: 'gif' } })}
      />

      <Card style={{ padding: 20 }}>
        <Stack direction={'row-reverse'} gap="36px">
          <Stack
            direction="column"
            width="100%"
            gap="12px"
            maxWidth={status !== 'create' ? 170 : '100%'}
            alignItems="flex-end">
            <UploadThumbnail thumbnail={''} status={status} setInputValue={setInputValue} inputValue={inputValue} />
          </Stack>
          <Stack direction={'column'} width="100%" gap="24px">
            <Stack direction="column" gap="8px" width={'100%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Nama GIF <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="gifName"
                value={inputValue.gifName}
                variant="outlined"
                placeholder="Nama GIF"
                onChange={handleChangeInput}
              />
            </Stack>
            {status === 'create' && (
              <Stack direction="column" gap="8px" width={'100%'}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Status <span style={{ color: '#E61D37' }}>*</span>
                </Typography>
                <Select
                  name="status"
                  value={inputValue.status}
                  placeholder="Pilih Status gif"
                  onChange={handleChangeInput}
                  color="secondary"
                  displayEmpty>
                  <MenuItem value="" disabled>
                    Pilih Status Awal
                  </MenuItem>
                  <MenuItem value="aktif">Aktif</MenuItem>
                  <MenuItem value="inaktif">Tidak Aktif</MenuItem>
                </Select>
              </Stack>
            )}
            <Stack direction="row" flexWrap="wrap" gap="12px" width="100%">
              <LoadingButton
                loading={loading}
                variant="contained"
                color="secondary"
                style={{ width: 'fit-content', fontWeight: 'bold' }}
                onClick={() => setModal({ ...modal, save: !modal.save })}
                disabled={!inputValue.gifName || !inputValue.status || !inputValue.apsaraThumbnail}>
                {status !== 'create' ? 'Terapkan' : 'Simpan'}
              </LoadingButton>
              {status === 'create' && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ width: 'fit-content', fontWeight: 'bold' }}
                  onClick={() => {
                    if (!inputValue.gifName && !inputValue.status && !inputValue.apsaraThumbnail) {
                      router.push({ pathname: '/database/sticker', query: { tab: 'gif' } });
                    } else {
                      setModal({ ...modal, cancel: !modal.cancel });
                    }
                  }}>
                  Batal
                </Button>
              )}
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
                Hapus GIF Ini?{' '}
                <span
                  style={{ color: '#AB22AF', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => setModal({ ...modal, delete: !modal.delete })}>
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

export default FormGIF;
