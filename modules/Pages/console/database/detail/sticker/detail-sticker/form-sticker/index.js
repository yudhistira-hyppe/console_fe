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
import { useCreateStickerMutation, useGetStickerCategoryQuery, useUpdateStickerMutation } from 'api/console/database';

const FormSticker = (props) => {
  const { status, data, id } = props;
  const [inputValue, setInputValue] = useState({
    idName: data?.name || '',
    engName: data?.nameEn || '',
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
  const [createSticker, { isLoading: loadingCreate }] = useCreateStickerMutation();
  const [updateSticker, { isLoading: loadingUpdate }] = useUpdateStickerMutation();

  const { data: category, isLoading: loadingCategory } = useGetStickerCategoryQuery({ tipesticker: 'STICKER' });

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
  };

  const handleCreate = () => {
    let formData = new FormData();
    formData.append('name', inputValue?.idName);
    formData.append('kategori', inputValue?.category);
    formData.append('status', inputValue?.status === 'active' ? true : false);
    formData.append('type', 'STICKER');
    formData.append('nourut', inputValue?.indexSticker);
    formData.append('image', inputValue?.image);

    createSticker(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success('Berhasil menambahkan sticker');
        router.replace('/database/sticker');
      }
      setModal({ ...modal, save: !modal.save });
    });
  };

  const handleUpdate = () => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', inputValue?.idName);
    formData.append('nameEn', inputValue?.engName);
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

    if (
      status === 'create' &&
      (!inputValue?.idName ||
        // !inputValue?.engName ||
        !inputValue?.category ||
        !inputValue?.image ||
        !inputValue?.indexSticker ||
        !inputValue?.status)
    ) {
      disabled = true;
    } else {
      if (
        !inputValue?.idName ||
        // !inputValue?.engName ||
        !inputValue?.category ||
        !inputValue?.indexSticker ||
        (data?.name === inputValue?.idName &&
          // data?.nameEn === inputValue?.engName &&
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
                Nama Stiker (Indonesia) <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="idName"
                value={inputValue.idName}
                variant="outlined"
                placeholder="Nama Stiker Indonesia"
                onChange={handleChangeInput}
              />
            </Stack>
            {/* <Stack direction="column" gap="8px" width={'100%'}>
              <Typography style={{ fontWeight: 'bold' }}>
                Nama Stiker (Inggris) <span style={{ color: '#E61D37' }}>*</span>
              </Typography>
              <TextField
                name="engName"
                value={inputValue.engName}
                variant="outlined"
                placeholder="Nama Stiker Inggris"
                onChange={handleChangeInput}
              />
            </Stack> */}
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
                Nomor Urut Stiker per Kategori <span style={{ color: '#E61D37' }}>*</span>
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
                    if (
                      !inputValue.idName &&
                      !inputValue.engName &&
                      !inputValue.category &&
                      !inputValue.status &&
                      !inputValue.image
                    ) {
                      router.push('/database/sticker');
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
