import { Box, Button, Card, MenuItem, Select, Stack, TextField, Tooltip } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../../help-center/bantuan-pengguna/BreadCrumb';
import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ChooseParticipant from './ChooseParticipant';
import { usePublishNotificationMutation } from 'api/console/announcement';
import { useAuth } from 'authentication';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-hot-toast';
import ModalSelectedPeople from '../../../modal/ModalSelectedPeople';

const CreateNotificationComponent = () => {
  const [inputValue, setInputValue] = useState({
    title_id: '',
    desc_id: '',
    title_en: '',
    desc_en: '',
    url: '',
    type: '',
    participant: [],
  });
  const [refreshContainer, setRefreshContainer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [publishNotif, { isLoading: loadingPublish }] = usePublishNotificationMutation();
  const router = useRouter();
  const { authUser } = useAuth();

  const breadcrumbs = router?.query?.participant
    ? [
        { label: 'Notifikasi Push', link: '/announcement/notification' },
        { label: 'Buat Notifikasi Push', link: { pathname: '/announcement/notification/create', query: {} } },
        { label: 'Pilih Partisipan', isActive: true },
      ]
    : [
        { label: 'Notifikasi Push', link: '/announcement/notification' },
        { label: 'Buat Notifikasi Push', isActive: true },
      ];

  const handlePublish = () => {
    const formData = {
      email: authUser?.user?.email,
      titleIN: inputValue?.title_id,
      bodyIN: inputValue?.desc_id,
      titleEN: inputValue?.title_en,
      bodyEN: inputValue?.desc_en,
      type: inputValue?.type,
      url: inputValue?.url,
      emailuser: inputValue?.participant?.map((item) => item?.email),
    };

    publishNotif(formData).then((res) => {
      if (res?.data?.data) {
        toast.success('Berhasil memposting push notifikasi');
        router.replace('/announcement/notification');
      } else {
        toast.error('Gagal memposting push notifikasi');
      }
    });
  };

  useEffect(() => {
    setRefreshContainer(true);
    setTimeout(() => setRefreshContainer(false), 100);
  }, [router]);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Buat Notifikasi Push</title>
      </Head>
      <Stack direction="column" gap={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        {!refreshContainer && (
          <PageContainer>
            {router?.query?.participant ? (
              <ChooseParticipant
                inputValue={inputValue?.participant}
                handleInputChange={(val) => setInputValue({ ...inputValue, participant: val })}
              />
            ) : (
              <Stack direction="column" gap={2}>
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
                          sx={{ width: '80%', textarea: { fontFamily: 'Lato', color: '#9B9B9B' } }}
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
                          sx={{ width: '80%', textarea: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                          inputProps={{ maxLength: 100 }}
                        />
                        <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>
                          {inputValue?.desc_en?.length}/100 Karakter
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="column" gap={1}>
                      <Typography>Target Notifikasi Push</Typography>
                      <Stack direction="row" width="80%" gap={1} alignItems="center">
                        <Select
                          value={inputValue?.type}
                          color="secondary"
                          onChange={(e) => setInputValue({ ...inputValue, type: e.target.value })}
                          sx={{ width: inputValue?.type === 'OPTION' ? '90%' : '100%' }}
                          displayEmpty>
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
                            style={{ backgroundColor: '#CECECE', color: 'white', borderRadius: 6, cursor: 'pointer' }}
                            onClick={() => setShowModal(!showModal)}>
                            <Typography style={{ fontWeight: 'bold' }}>{inputValue?.participant?.length}</Typography>
                          </Stack>
                        )}
                      </Stack>

                      {inputValue?.type === 'OPTION' && (
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ height: 40, width: '80%' }}
                          onClick={() =>
                            router.push({ pathname: '/announcement/notification/create', query: { participant: true } })
                          }>
                          <Typography style={{ fontSize: 14 }}>
                            {inputValue?.participant?.length >= 1 ? 'Edit Partisipan' : 'Pilih Partisipan'}
                          </Typography>
                        </Button>
                      )}
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
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ height: 40 }}
                    onClick={() => router.push('/announcement/notification')}>
                    <Typography style={{ fontSize: 14 }}>Kembali</Typography>
                  </Button>
                  <LoadingButton
                    loading={loadingPublish}
                    variant="contained"
                    color="secondary"
                    style={{ height: 40 }}
                    onClick={handlePublish}
                    disabled={
                      !inputValue?.title_id ||
                      !inputValue?.title_en ||
                      !inputValue?.desc_id ||
                      !inputValue?.desc_en ||
                      (inputValue?.participant?.length < 1 && inputValue?.type === 'OPTION') ||
                      !inputValue?.type
                    }>
                    <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Posting</Typography>
                  </LoadingButton>
                </Stack>
              </Stack>
            )}
          </PageContainer>
        )}

        {showModal && (
          <ModalSelectedPeople
            showModal={showModal}
            onClose={() => setShowModal(!showModal)}
            selectedItem={inputValue?.participant}
            handleInputChange={(val) => setInputValue({ ...inputValue, participant: val })}
          />
        )}
      </Stack>
    </>
  );
};

export default CreateNotificationComponent;
