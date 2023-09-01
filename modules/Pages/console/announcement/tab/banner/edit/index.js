import { Avatar, Box, Button, Card, Divider, MenuItem, Select, Stack, TextField, Tooltip } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../../help-center/bantuan-pengguna/BreadCrumb';
import { Typography } from '@material-ui/core';
import { ChevronLeft, CloudUpload, InfoOutlined } from '@material-ui/icons';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Router from 'next/router';
import ModalConfirmation from '../../../modal/ModalConfirmation';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import { useGetDetailBannerSearchQuery, useUpdateBannerSearchMutation } from 'api/console/announcement';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-hot-toast';

const EditBannerComponent = ({ detailId }) => {
  const [inputValue, setInputValue] = useState({
    title: '',
    url: '',
    banner_file: {},
  });
  const [openModal, setOpenModal] = useState(false);
  const [updateBanner, { isLoading: loadingUpdate }] = useUpdateBannerSearchMutation();

  const breadcrumbs = [
    { label: 'Banner', link: '/announcement/banner' },
    { label: 'Edit Banner', isActive: true },
  ];

  const { data: details, isLoading: loadingDetail } = useGetDetailBannerSearchQuery(detailId);

  useEffect(() => {
    setInputValue({
      title: details?.title || '',
      url: details?.url || '',
      banner_file: {
        file: null,
        url: details?.image,
      },
    });
  }, [loadingDetail]);

  function formatBytes(bytes) {
    return (bytes / Math.pow(1024, 2)).toFixed(1);
  }

  const handleUploadImage = (e) => {
    if (
      e.target.files[0]?.type !== 'image/png' &&
      e.target.files[0]?.type !== 'image/jpeg' &&
      e.target.files[0]?.type !== 'image/jpg' &&
      e.target.files[0]?.type !== 'image/svg'
    ) {
      alert('salah format woyy 🤬');
      return;
    } else {
      const blob = new Blob(e.target.files, { type: e.target.files[0]?.type });
      const url = URL.createObjectURL(blob);
      let img = new Image();
      img.src = url;
      img.onload = () => {
        if (img.width > 1125 || img.height > 611) {
          alert('ukuran imagenya kegedean woyy 🤬');
          return;
        }
        if (img.width < 1125 || img.height < 611) {
          alert('ukuran imagenya kekecilan woyy 🤬');
          return;
        }
        if (formatBytes(e.target.files[0].size) > 1) {
          alert('size filenya kegedean woyy 🤬');
        } else {
          setInputValue({ ...inputValue, banner_file: { file: e.target.files[0], url: url } });
        }
      };
    }
  };

  const handleUpdate = () => {
    let formData = new FormData();
    formData.append('id', detailId);
    formData.append('title', inputValue?.title);
    formData.append('url', inputValue?.url);
    formData.append('email', details?.email);
    if (inputValue?.banner_file?.url !== details?.image) {
      formData.append('image', inputValue?.banner_file?.file);
    }

    updateBanner(formData).then((res) => {
      if (res?.data) {
        toast.success('Berhasil menyimpan perubahan banner');
        Router.replace('/announcement/banner');
      } else {
        toast.error('Terjadi kesalahan pada sistem, silahkan coba lagi');
      }
    });
  };

  const checkDisabled = () => {
    let disabled = false;

    if (!inputValue?.title || !inputValue?.url || isEmpty(inputValue?.banner_file)) {
      disabled = true;
    }

    if (
      inputValue?.title === details?.title &&
      inputValue?.url === details?.url &&
      inputValue?.banner_file?.url === details?.image
    ) {
      disabled = true;
    }

    return disabled;
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Buat Banner</title>
      </Head>

      <ModalConfirmation
        showModal={openModal}
        onClose={() => setOpenModal(!openModal)}
        type="update-banner"
        handleSubmit={handleUpdate}
      />

      <Stack direction="column" gap={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <Stack
          mt={1}
          mb={2}
          direction="row"
          alignItems="center"
          gap={1}
          style={{ width: 'fit-content', cursor: 'pointer' }}
          onClick={() => Router.push('/announcement/banner')}>
          <ChevronLeft style={{ fontSize: 24 }} />
          <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Kembali</Typography>
        </Stack>

        <PageContainer>
          <Stack direction="column" gap={2}>
            <Card sx={{ p: 4 }}>
              <Stack direction="column" gap={3}>
                <Typography style={{ fontWeight: 'bold' }}>Edit Banner</Typography>

                <Stack direction="column" gap={1}>
                  <Typography style={{ fontSize: 14, color: '#00000099' }}>
                    <b>Tanggal Dibuat:</b> {dayjs(details?.createdAt).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography style={{ fontSize: 14, color: '#00000099' }}>
                    <b>Dibuat Oleh:</b> {details?.fullName || '-'}
                  </Typography>
                </Stack>

                <Divider />

                <Stack direction="column" gap={1}>
                  <Typography>
                    Judul Banner <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    color="secondary"
                    placeholder="Tulis Judul Banner"
                    value={inputValue?.title}
                    onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                    sx={{ width: 400, input: { fontFamily: 'Lato' } }}
                    inputProps={{ maxLength: 30 }}
                    disabled={details?.statusTayang}
                  />
                  <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>{inputValue?.title?.length}/30 Karakter</Typography>
                </Stack>

                <Stack direction="column" gap={1}>
                  <Typography>
                    URL <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    color="secondary"
                    placeholder="Masukkan URL"
                    value={inputValue?.url}
                    onChange={(e) => setInputValue({ ...inputValue, url: e.target.value })}
                    sx={{ width: 400, input: { fontFamily: 'Lato' } }}
                    disabled={details?.statusTayang}
                  />
                </Stack>

                <Stack direction="column" gap={2}>
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography>
                      Banner <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Stack>

                  <Stack direction="row" gap={3}>
                    <label htmlFor="banner-background">
                      <Box
                        style={{
                          width: 375,
                          height: 211,
                          border: '1px dashed #9B9B9B',
                          borderRadius: 4,
                          backgroundColor: '#F0F0F0',
                          cursor: details?.statusTayang ? 'default' : 'pointer',
                        }}>
                        {inputValue?.banner_file?.url ? (
                          <Avatar
                            src={inputValue?.banner_file?.url}
                            style={{ width: '100%', height: '100%' }}
                            variant="rounded"
                          />
                        ) : (
                          <Stack direction="column" alignItems="center" justifyContent="center" spacing={1} height="100%">
                            <CloudUpload style={{ fontSize: 36, color: '#9B9B9B' }} />
                            <Typography style={{ fontWeight: 'bold', color: '#9B9B9B' }}>
                              Tambahkan dari Perangkat
                            </Typography>
                          </Stack>
                        )}
                        <input
                          hidden
                          id="banner-background"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/svg"
                          onChange={handleUploadImage}
                          disabled={details?.statusTayang}
                        />
                      </Box>
                    </label>
                    <Stack direction="column" gap={1}>
                      <Typography style={{ fontWeight: 'bold', color: '#737373' }}>
                        Ketentuan Gambar <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran Gambar : 1125px x 611px </Typography>
                      <Typography style={{ color: '#737373', fontSize: 14 }}>Format Gambar : JPEG, PNG, dan SVG</Typography>
                      <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran File : Maximal 5mb</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Card>

            {!details?.statusTayang && (
              <Stack direction="row" alignItems="center" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ height: 40 }}
                  onClick={() => Router.push('/announcement/banner')}
                  disabled={loadingUpdate}>
                  <Typography style={{ fontSize: 14 }}>Batal</Typography>
                </Button>
                <LoadingButton
                  loading={loadingUpdate}
                  variant="contained"
                  color="secondary"
                  style={{ height: 40 }}
                  onClick={() => setOpenModal(!openModal)}
                  disabled={checkDisabled()}>
                  <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Simpan</Typography>
                </LoadingButton>
              </Stack>
            )}
          </Stack>
        </PageContainer>
      </Stack>
    </>
  );
};

export default EditBannerComponent;
