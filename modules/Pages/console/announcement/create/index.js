import { Button, Card, Stack, TextField, Tooltip } from '@mui/material';
import Head from 'next/head';
import React, { useState } from 'react';
import Breadcrumbs from '../../help-center/bantuan-pengguna/BreadCrumb';
import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

const breadcrumbs = [
  { label: 'Notifikasi Push', link: '/announcement' },
  { label: 'Buat Notifikasi Push', isActive: true },
];

const CreateAnnouncementComponent = () => {
  const [inputValue, setInputValue] = useState({
    title_id: '',
    desc_id: '',
    title_en: '',
    desc_en: '',
    url: '',
    status: '',
    participant: [],
  });

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Buat Notifikasi Push</title>
      </Head>
      <Stack direction="column" gap={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Buat Notifikasi Push</Typography>

        <Card sx={{ p: 4 }}>
          <Stack direction="column" gap={3}>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography style={{ fontWeight: 'bold' }}>Notifikasi Push</Typography>
              <Tooltip title="comming soon">
                <InfoOutlined style={{ fontSize: 16 }} />
              </Tooltip>
            </Stack>

            <Stack direction="column" gap={3}>
              <Typography>
                Notifikasi Push (Indonesia) <span style={{ color: 'red' }}>*</span>
              </Typography>

              <Stack direction="column" gap={2}>
                <TextField
                  color="secondary"
                  placeholder="Tulis Judul"
                  value={inputValue?.title_id}
                  onChange={(e) => setInputValue({ ...inputValue, title_id: e.target.value })}
                  sx={{ width: '80%', input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                  inputProps={{ maxLength: 48 }}
                />
                <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>
                  {inputValue?.title_id?.length}/48 Karakter
                </Typography>
              </Stack>

              <Stack direction="column" gap={2}>
                <TextField
                  multiline
                  rows={4}
                  color="secondary"
                  placeholder="Tulis Deskripsi"
                  value={inputValue?.desc_id}
                  onChange={(e) => setInputValue({ ...inputValue, desc_id: e.target.value })}
                  sx={{ width: '80%', input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                  inputProps={{ maxLength: 100 }}
                />
                <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>
                  {inputValue?.desc_id?.length}/100 Karakter
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="column" gap={3}>
              <Typography>
                Notifikasi Push (English) <span style={{ color: 'red' }}>*</span>
              </Typography>

              <Stack direction="column" gap={2}>
                <TextField
                  color="secondary"
                  placeholder="Tulis Judul"
                  value={inputValue?.title_en}
                  onChange={(e) => setInputValue({ ...inputValue, title_en: e.target.value })}
                  sx={{ width: '80%', input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                  inputProps={{ maxLength: 48 }}
                />
                <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>
                  {inputValue?.title_en?.length}/48 Karakter
                </Typography>
              </Stack>

              <Stack direction="column" gap={2}>
                <TextField
                  multiline
                  rows={4}
                  color="secondary"
                  placeholder="Tulis Deskripsi"
                  value={inputValue?.desc_en}
                  onChange={(e) => setInputValue({ ...inputValue, desc_en: e.target.value })}
                  sx={{ width: '80%', input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                  inputProps={{ maxLength: 100 }}
                />
                <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>
                  {inputValue?.desc_en?.length}/100 Karakter
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="column" gap={1}>
              <Typography>URL (Optional)</Typography>
              <TextField
                color="secondary"
                placeholder="Masukkan URL"
                value={inputValue?.url}
                onChange={(e) => setInputValue({ ...inputValue, url: e.target.value })}
                sx={{ width: '80%', input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
              />
            </Stack>
          </Stack>
        </Card>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary" style={{ height: 40 }}>
            <Typography style={{ fontSize: 14 }}>Kembali</Typography>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ height: 40 }}
            disabled={
              !inputValue?.title_id ||
              !inputValue?.title_en ||
              !inputValue?.desc_id ||
              !inputValue?.desc_en ||
              !inputValue?.url
            }>
            <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Posting</Typography>
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default CreateAnnouncementComponent;
