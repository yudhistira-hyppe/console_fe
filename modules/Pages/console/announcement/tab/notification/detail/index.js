import { Box, Button, Card, Divider, MenuItem, Select, Stack, TextField, Tooltip } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../../help-center/bantuan-pengguna/BreadCrumb';
import { Typography } from '@material-ui/core';
import { ChevronLeft, InfoOutlined } from '@material-ui/icons';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import dayjs from 'dayjs';
import Router from 'next/router';
import { useGetDetailNotificationQuery } from 'api/console/announcement';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const DetailNotificationComponent = ({ detailId }) => {
  const [inputValue, setInputValue] = useState({
    title_id: '',
    desc_id: '',
    title_en: '',
    desc_en: '',
    url: '',
    type: '',
    participant: [],
  });

  const { data: details, isLoading: loadingDetail } = useGetDetailNotificationQuery(detailId);

  useEffect(() => {
    setInputValue({
      title_id: details?.subject_id || '',
      desc_id: details?.body_detail_id || '',
      title_en: details?.subject || '',
      desc_en: details?.body_detail || '',
      url: details?.action_buttons || '',
      type: details?.type || '',
    });
  }, [loadingDetail]);

  const breadcrumbs = [
    { label: 'Notifikasi Push', link: '/announcement/notification' },
    { label: 'Rincian Notifikasi Push', isActive: true },
  ];

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Rincian Notifikasi Push</title>
      </Head>
      <Stack direction="column" gap={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <Stack
          mt={1}
          mb={2}
          direction="row"
          alignItems="center"
          gap={1}
          style={{ width: 'fit-content', cursor: 'pointer' }}
          onClick={() => Router.push('/announcement/notification')}>
          <ChevronLeft style={{ fontSize: 24 }} />
          <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Kembali</Typography>
        </Stack>

        {loadingDetail ? (
          <PageLoader />
        ) : (
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
                        onChange={(e) => setInputValue({ ...inputValue, title_id: e.target.value })}
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
                        onChange={(e) => setInputValue({ ...inputValue, desc_id: e.target.value })}
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
                        onChange={(e) => setInputValue({ ...inputValue, title_en: e.target.value })}
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
                        onChange={(e) => setInputValue({ ...inputValue, desc_en: e.target.value })}
                        sx={{ width: '80%', textarea: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                        inputProps={{ maxLength: 100 }}
                        disabled
                      />
                      <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>
                        {inputValue?.desc_en?.length}/100 Karakter
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider />

                  <Stack direction="column" gap={1}>
                    <Typography>Target Notifikasi Push</Typography>
                    <Stack direction="row" width="80%" gap={1} alignItems="center">
                      <Select
                        value={inputValue?.type}
                        color="secondary"
                        onChange={(e) => setInputValue({ ...inputValue, type: e.target.value })}
                        sx={{ width: inputValue?.type === 'OPTION' ? '90%' : '100%' }}
                        displayEmpty
                        disabled>
                        <MenuItem value="" disabled>
                          <Typography style={{ color: '#9B9B9B' }}>Pilih Target</Typography>
                        </MenuItem>
                        <MenuItem value="ALL">
                          <Typography style={{ color: '#9B9B9B' }}>Semua Pengguna</Typography>
                        </MenuItem>
                        <MenuItem value="OPTION">
                          <Typography style={{ color: '#9B9B9B' }}>Filter Pilihan</Typography>
                        </MenuItem>
                      </Select>
                      {inputValue?.type === 'OPTION' && (
                        <Stack
                          width="10%"
                          height="57px"
                          alignItems="center"
                          justifyContent="center"
                          style={{ backgroundColor: '#CECECE', color: 'white', borderRadius: 6 }}>
                          <Typography style={{ fontWeight: 'bold' }}>{inputValue?.participant?.length}</Typography>
                        </Stack>
                      )}
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
                      disabled
                    />
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </PageContainer>
        )}
      </Stack>
    </>
  );
};

export default DetailNotificationComponent;
