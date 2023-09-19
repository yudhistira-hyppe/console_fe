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
import { useGetStickerCategoryQuery, useUpdateStickerMutation } from 'api/console/database';

const FormSticker = (props) => {
  const { status, data, id } = props;
  const [inputValue, setInputValue] = useState({
    stickerName: data?.name || '',
    category: data?.kategori || '',
    image: data?.image || '',
    indexSticker: data?.index || '',
    status: data?.status || '',
  });
  const [modal, setModal] = useState({
    delete: false,
    save: false,
    confirmation: false,
    cancel: false,
    status: '',
  });
  const [updateSticker, { isLoading: loadingUpdate }] = useUpdateStickerMutation();

  const { data: category, isLoading: loadingCategory } = useGetStickerCategoryQuery({ tipesticker: 'STICKER' });

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
  };

  const handleCreate = () => {
    setModal({ ...modal, save: !modal.save });
    router.replace('/database/sticker');
  };

  const handleUpdate = () => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', inputValue?.stickerName);
    formData.append('kategori', inputValue?.category);
    formData.append('status', inputValue?.status ? true : false);
    formData.append('type', 'STICKER');
    formData.append('nourut', inputValue?.indexSticker);

    updateSticker(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success('Berhasil menyimpan perubahan sticker');
        router.replace('/database/sticker');
      }
      setModal({ ...modal, save: !modal.save });
    });
  };

  const checkDisable = () => {
    let disabled = false;

    if (status === 'create' && (!inputValue.stickerName || !inputValue.category || !inputValue.image)) {
      disabled = true;
    } else {
      if (
        !inputValue?.stickerName ||
        !inputValue?.category ||
        !inputValue?.indexSticker ||
        (data?.name === inputValue?.stickerName &&
          data?.kategori === inputValue?.category &&
          data?.index == inputValue?.indexSticker)
      ) {
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
        onConfirm={() => router.replace('/database/sticker')}
      />
      <ModalSave
        status={status}
        statusCreate={inputValue.status}
        showModal={modal.save}
        onClose={() => setModal({ ...modal, save: !modal.save })}
        loading={loadingUpdate}
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
        onConfirm={() => router.replace('/database/sticker')}
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
                Nama Stiker <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="stickerName"
                value={inputValue.stickerName}
                variant="outlined"
                placeholder="Nama Stiker"
                onChange={handleChangeInput}
              />
            </Stack>
            <Stack direction="column" gap="8px" width={'100%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Kategori <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <Select
                name="category"
                value={inputValue.category}
                placeholder="Pilih Kategori Stiker"
                onChange={handleChangeInput}
                color="secondary"
                displayEmpty>
                <MenuItem value="" disabled>
                  Pilih Kategori
                </MenuItem>
                {loadingCategory ? (
                  <MenuItem value="" disabled>
                    Loading data...
                  </MenuItem>
                ) : category?.data?.length >= 1 ? (
                  category?.data?.map((item, key) => (
                    <MenuItem key={key} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Tidak ada data
                  </MenuItem>
                )}
              </Select>
            </Stack>
            <Stack direction="column" gap="8px" width={'100%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Nomor Urut Stiker <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="indexSticker"
                value={inputValue.indexSticker}
                variant="outlined"
                placeholder="Nomor Urut Stiker"
                onChange={handleChangeInput}
                inputProps={{
                  onKeyPress: (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  },
                }}
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
                  placeholder="Pilih Status Stiker"
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
                loading={loadingUpdate}
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
                      router.push('/database/sticker');
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
                Hapus Stiker Ini?{' '}
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

export default FormSticker;
