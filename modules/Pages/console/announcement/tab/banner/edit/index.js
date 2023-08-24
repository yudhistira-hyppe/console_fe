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

const EditBannerComponent = () => {
  const [inputValue, setInputValue] = useState({
    title: '',
    url: '',
    banner_file: {},
  });
  const [openModal, setOpenModal] = useState(false);

  const breadcrumbs = [
    { label: 'Banner', link: '/announcement/banner' },
    { label: 'Edit Banner', isActive: true },
  ];

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

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Buat Banner</title>
      </Head>

      <ModalConfirmation showModal={openModal} onClose={() => setOpenModal(!openModal)} type="update-banner" />

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
                    <b>Tanggal Dibuat:</b> {dayjs().format('DD/MM/YYYY')}
                  </Typography>
                  <Typography style={{ fontSize: 14, color: '#00000099' }}>
                    <b>Dibuat Oleh:</b> Paramita S
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
                    sx={{ width: 400, input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                    inputProps={{ maxLength: 30 }}
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
                    sx={{ width: 400, input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                  />
                </Stack>

                <Stack direction="column" gap={2}>
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography>
                      Banner <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Tooltip title="comming soon">
                      <InfoOutlined style={{ fontSize: 16 }} />
                    </Tooltip>
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
                          cursor: 'pointer',
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

            <Stack direction="row" alignItems="center" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                color="secondary"
                style={{ height: 40 }}
                onClick={() => Router.push('/announcement/banner')}>
                <Typography style={{ fontSize: 14 }}>Batal</Typography>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ height: 40 }}
                onClick={() => setOpenModal(!openModal)}
                disabled={!inputValue?.title || !inputValue?.url || isEmpty(inputValue?.banner_file)}>
                <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Simpan</Typography>
              </Button>
            </Stack>
          </Stack>
        </PageContainer>
      </Stack>
    </>
  );
};

export default EditBannerComponent;
