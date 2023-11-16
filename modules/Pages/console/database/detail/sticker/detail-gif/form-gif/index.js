import React, { useState } from 'react';
import { Button, Card, Divider, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack } from '@mui/material';
import { TextField, Typography } from '@material-ui/core';
import ModalDelete from '../Modal/ModalDelete';
import ModalSave from '../Modal/ModalSave';
import ModalConfirmation from '../Modal/ModalConfirmation';
import router from 'next/router';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-hot-toast';
import UploadThumbnail from '../upload-thumbnail';
import ModalBatal from '../Modal/ModalBatal';
import { useCreateStickerMutation, useGetStickerCategoryQuery, useUpdateStickerMutation } from 'api/console/database';

const FormGIF = (props) => {
  const { status, data, id } = props;
  const [inputValue, setInputValue] = useState({
    stickerName: data?.name || '',
    image: data?.image || '',
    status: data?.status || '',
  });
  const [modal, setModal] = useState({
    delete: false,
    save: false,
    confirmation: false,
    cancel: false,
    status: '',
  });
  const [createSticker, { isLoading: loadingCreate }] = useCreateStickerMutation();
  const [updateSticker, { isLoading: loadingUpdate }] = useUpdateStickerMutation();

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
  };

  const handleCreate = () => {
    let formData = new FormData();
    formData.append('name', inputValue?.stickerName);
    formData.append('status', inputValue?.status === 'active' ? true : false);
    formData.append('type', 'GIF');
    formData.append('image', inputValue?.image);

    createSticker(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.messages?.info?.[0]);
      } else if (res?.data) {
        toast.success('Berhasil menambahkan GIF');
        router.replace({ pathname: '/database/sticker', query: { tab: router?.query?.tab } });
      }
      setModal({ ...modal, save: !modal.save });
    });
  };

  const handleUpdate = () => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', inputValue?.stickerName);
    formData.append('status', inputValue?.status ? true : false);
    formData.append('type', 'GIF');

    updateSticker(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.messages?.info?.[0]);
      } else if (res?.data) {
        toast.success('Berhasil menyimpan perubahan GIF');
        router.replace({ pathname: '/database/sticker', query: { tab: router?.query?.tab } });
      }
      setModal({ ...modal, save: !modal.save });
    });
  };

  const checkDisable = () => {
    let disabled = false;

    if (status === 'create' && (!inputValue?.stickerName || !inputValue?.image || !inputValue?.status)) {
      disabled = true;
    } else {
      if (!inputValue?.stickerName || data?.name === inputValue?.stickerName) {
        disabled = true;
      }
    }

    return disabled;
  };

  return (
    <>
      <ModalDelete
        id={data?._id}
        showModal={modal.delete}
        onClose={() => setModal({ ...modal, delete: !modal.delete })}
        onConfirm={() => router.replace({ pathname: '/database/sticker', query: { tab: router?.query?.tab } })}
      />
      <ModalSave
        status={status}
        statusCreate={inputValue.status}
        showModal={modal.save}
        onClose={() => setModal({ ...modal, save: !modal.save })}
        loading={loadingUpdate || loadingCreate}
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
        onConfirm={() => router.replace({ pathname: '/database/sticker', query: { tab: router?.query?.tab } })}
      />

      <Card style={{ padding: 20 }}>
        <Stack direction={'row-reverse'} gap="36px">
          <Stack
            direction="column"
            width="100%"
            gap="12px"
            maxWidth={status !== 'create' ? 170 : '100%'}
            alignItems="flex-end">
            <UploadThumbnail
              thumbnail={inputValue?.image}
              status={status}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
          </Stack>
          <Stack direction={'column'} width="100%" gap="24px">
            <Stack direction="column" gap="8px" width={'100%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Nama GIF <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="stickerName"
                value={inputValue.stickerName}
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
                  placeholder="Pilih Status Emoji"
                  onChange={handleChangeInput}
                  color="secondary"
                  displayEmpty>
                  <MenuItem value="" disabled>
                    Pilih Status Awal
                  </MenuItem>
                  <MenuItem value="active">Aktif</MenuItem>
                  <MenuItem value="noneactive">Tidak Aktif</MenuItem>
                </Select>
              </Stack>
            )}
            <Stack direction="row" flexWrap="wrap" gap="12px" width="100%">
              <LoadingButton
                loading={loadingUpdate || loadingCreate}
                variant="contained"
                color="secondary"
                style={{ width: 150, fontWeight: 'bold', height: 36 }}
                onClick={() => setModal({ ...modal, save: !modal.save })}
                disabled={checkDisable()}>
                <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Simpan</Typography>
              </LoadingButton>
              {status === 'create' && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ width: 'fit-content', fontWeight: 'bold' }}
                  onClick={() => {
                    if (!inputValue.stickerName && !inputValue.category && !inputValue.status && !inputValue.image) {
                      router.push({ pathname: '/database/sticker', query: { tab: router?.query?.tab } });
                    } else {
                      setModal({ ...modal, cancel: !modal.cancel });
                    }
                  }}
                  disabled={loadingCreate}>
                  <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Batal</Typography>
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
                  value={data?.status ? 'active' : 'noneactive'}
                  style={{ gap: 40 }}
                  onChange={() =>
                    setModal({
                      ...modal,
                      confirmation: !modal.confirmation,
                      status: data?.status ? 'noneactive' : 'active',
                    })
                  }>
                  <FormControlLabel
                    value="active"
                    control={<Radio color="secondary" />}
                    label={<Typography>Aktif</Typography>}
                  />
                  <FormControlLabel
                    value="noneactive"
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
