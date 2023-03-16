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
import UploadEffect from '../upload-effect';
import ModalBatal from '../Modal/ModalBatal';

const FormEffect = (props) => {
  const { status, data, id } = props;
  const [inputValue, setInputValue] = useState({
    effectName: '',
    category: '',
    status: '',
    apsaraThumbnail: '',
    apsaraEffect: '',
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
  };

  const handleUpdate = () => {
    setModal({ ...modal, save: !modal.save });
  };

  console.log(inputValue);

  return (
    <>
      <ModalDelete
        showModal={modal.delete}
        onClose={() => setModal({ ...modal, delete: !modal.delete })}
        onConfirm={() => router.replace('/database/effect')}
      />
      <ModalSave
        status={status}
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
        onConfirm={() => router.replace('/database/effect')}
      />

      {status === 'create' && (
        <Stack direction="column" width="100%" gap="12px" marginBottom="24px">
          <UploadEffect status={status} setInputValue={setInputValue} inputValue={inputValue} />
        </Stack>
      )}

      <Card style={{ padding: 20 }}>
        <Stack direction={'row-reverse'} gap="24px">
          <Stack direction="column" width="100%" maxWidth={170} gap="12px">
            <UploadThumbnail thumbnail={''} status={status} setInputValue={setInputValue} inputValue={inputValue} />
          </Stack>
          <Stack direction={'column'} width="100%" gap="24px">
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '65%'}>
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
            <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '65%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Kategori <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <Select
                name="category"
                value={inputValue.category}
                placeholder="Pilih Kategori Efek"
                onChange={handleChangeInput}
                color="secondary"
                displayEmpty>
                <MenuItem value="" disabled>
                  Pilih Kategori Efek
                </MenuItem>
                <MenuItem value="estetis">Estetis</MenuItem>
                <MenuItem value="khusus">Efek Khusus</MenuItem>
              </Select>
            </Stack>
            {status === 'create' && (
              <Stack direction="column" gap="8px" width={status !== 'create' ? '100%' : '65%'}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Status <span style={{ color: '#E61D37' }}>*</span>
                </Typography>
                <Select
                  name="status"
                  value={inputValue.status}
                  placeholder="Pilih Kategori Efek"
                  onChange={handleChangeInput}
                  color="secondary"
                  displayEmpty>
                  <MenuItem value="" disabled>
                    Pilih Status Awal
                  </MenuItem>
                  <MenuItem value="estetis">Aktif</MenuItem>
                  <MenuItem value="khusus">Tidak Aktif</MenuItem>
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
                disabled={
                  !inputValue.effectName ||
                  !inputValue.category ||
                  !inputValue.status ||
                  !inputValue.apsaraThumbnail ||
                  !inputValue.apsaraEffect
                }>
                {status !== 'create' ? 'Terapkan' : 'Simpan'}
              </LoadingButton>
              {status === 'create' && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ width: 'fit-content', fontWeight: 'bold' }}
                  onClick={() => {
                    if (
                      !inputValue.effectName &&
                      !inputValue.category &&
                      !inputValue.status &&
                      !inputValue.apsaraThumbnail &&
                      !inputValue.apsaraEffect
                    ) {
                      router.replace('/database/effect');
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
                Hapus Efek Ini?{' '}
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

export default FormEffect;
