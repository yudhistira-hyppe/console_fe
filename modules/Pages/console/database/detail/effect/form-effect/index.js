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
import { useCreateEffectMutation, useGetCategoryEffectQuery } from 'api/console/database';

const FormEffect = (props) => {
  const { status, data, id } = props;
  const [inputValue, setInputValue] = useState({
    namafile: '',
    category_id: '',
    status: '',
    imageFile: '',
    fileAsset: '',
  });
  const [modal, setModal] = useState({
    delete: false,
    save: false,
    confirmation: false,
    cancel: false,
    status: '',
  });
  const { data: categories, isLoading: loadingCategory } = useGetCategoryEffectQuery({ page: 0 });
  const [createEffect, { isLoading: loadingCreate }] = useCreateEffectMutation();

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
  };

  const handleCreate = () => {
    let formData = new FormData();
    formData.append('namafile', inputValue?.namafile);
    formData.append('category_id', inputValue?.category_id);
    formData.append('status', inputValue?.status);
    formData.append('imageFile', inputValue?.imageFile);
    formData.append('fileAsset', inputValue?.fileAsset);

    createEffect(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success('Berhasil menambahkan efek');
        router.replace('/database/effect');
      }
      setModal({ ...modal, save: !modal.save });
    });
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
                name="namafile"
                value={inputValue.namafile}
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
                name="category_id"
                value={inputValue.category_id}
                placeholder="Pilih Kategori Efek"
                onChange={handleChangeInput}
                color="secondary"
                displayEmpty>
                <MenuItem value="" disabled>
                  {loadingCategory ? 'Loading data...' : 'Pilih Kategori Efek'}
                </MenuItem>
                {!loadingCategory &&
                  categories?.data?.map((item, key) => (
                    <MenuItem key={key} value={item?._id}>
                      {item?.name || '-'}
                    </MenuItem>
                  ))}
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
                  placeholder="Pilih status"
                  onChange={handleChangeInput}
                  color="secondary"
                  displayEmpty>
                  <MenuItem value="" disabled>
                    Pilih Status Awal
                  </MenuItem>
                  <MenuItem value="active">Aktif</MenuItem>
                  <MenuItem value="nonactive">Tidak Aktif</MenuItem>
                </Select>
              </Stack>
            )}
            <Stack direction="row" flexWrap="wrap" gap="12px" width="100%">
              <LoadingButton
                loading={loadingCreate}
                variant="contained"
                color="secondary"
                style={{ width: 'fit-content', fontWeight: 'bold' }}
                onClick={() => setModal({ ...modal, save: !modal.save })}
                disabled={
                  !inputValue.namafile ||
                  !inputValue.category_id ||
                  !inputValue.status ||
                  !inputValue.imageFile ||
                  !inputValue.fileAsset
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
                      !inputValue.namafile &&
                      !inputValue.category_id &&
                      !inputValue.status &&
                      !inputValue.imageFile &&
                      !inputValue.fileEffect
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
