import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Typography } from '@material-ui/core';
import { Card, Divider, Stack, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const ContentDetail = ({ details, inputValue }) => {
  return (
    <PageContainer>
      <Stack direction="column" gap={2}>
        <Card sx={{ p: 4 }}>
          <Stack direction="column" gap={3}>
            <Typography style={{ fontWeight: 'bold' }}>Rincian Notifikasi Push</Typography>

            <Stack direction="column" gap={1}>
              <Typography style={{ fontSize: 14, color: '#00000099' }}>
                <b>Tanggal Dibuat:</b> {dayjs(details?.createdAt).format('DD/MM/YYYY')}
              </Typography>
              <Typography style={{ fontSize: 14, color: '#00000099' }}>
                <b>Dibuat Oleh:</b> {details?.fullName || '-'}
              </Typography>
            </Stack>

            <Divider />

            <Stack direction="column" gap={3}>
              <Typography>Indonesia</Typography>

              <Stack direction="column" gap={2}>
                <TextField
                  color="secondary"
                  placeholder="Tulis Judul"
                  value={inputValue?.title_id}
                  sx={{ width: '80%', input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                  inputProps={{ maxLength: 48 }}
                  disabled
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
                  sx={{ width: '80%', textarea: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                  inputProps={{ maxLength: 100 }}
                  disabled
                />
                <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>
                  {inputValue?.desc_id?.length}/100 Karakter
                </Typography>
              </Stack>
            </Stack>

            <Divider />

            <Stack direction="column" gap={3}>
              <Typography>English</Typography>

              <Stack direction="column" gap={2}>
                <TextField
                  color="secondary"
                  placeholder="Tulis Judul"
                  value={inputValue?.title_en}
                  sx={{ width: '80%', input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                  inputProps={{ maxLength: 48 }}
                  disabled
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
                  sx={{ width: '80%', textarea: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                  inputProps={{ maxLength: 100 }}
                  disabled
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
                sx={{ width: '80%', input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                disabled
              />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </PageContainer>
  );
};

export default ContentDetail;
