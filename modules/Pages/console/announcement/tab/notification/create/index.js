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
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  handlePublish();
                }}>
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
                        <Typography>URL (Optional)</Typography>
                        <TextField
                          color="secondary"
                          type="url"
                          placeholder="https://example.com"
                          value={inputValue?.url}
                          onChange={(e) => setInputValue({ ...inputValue, url: e.target.value })}
                          sx={{ width: '80%', input: { fontFamily: 'Lato', color: '#9B9B9B' } }}
                          pattern="https://.*"
                        />
                      </Stack>

                      <Stack direction="column" gap={2}>
                        <Stack direction="row" gap={3}>
                          <Stack direction="column" width="40%" gap={1}>
                            <Typography style={{ fontWeight: 'bold' }}>Target Notifikasi Push</Typography>
                            <Select
                              value={inputValue?.type}
                              color="secondary"
                              onChange={(e) => setInputValue({ ...inputValue, type: e.target.value })}
                              renderValue={(val) => (
                                <Typography>
                                  {val === 'ALL' && 'Semua Pengguna'} {val === 'OPTION' && 'Pilihan Pengguna Audiens'}
                                  {val === '' && 'Pilih Target'}
                                </Typography>
                              )}
                              sx={{ width: '100%' }}
                              displayEmpty>
                              <MenuItem value="ALL">
                                <Stack direction="column" gap="4px" my="6px">
                                  <Typography>Semua Pengguna</Typography>
                                  <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>
                                    Push notifikasi akan dikirimkan ke semua pengguna
                                  </Typography>
                                </Stack>
                              </MenuItem>
                              <MenuItem value="OPTION">
                                <Stack direction="column" gap="4px" my="6px">
                                  <Typography>Pilih Target Audiens</Typography>
                                  <Typography style={{ color: '#9B9B9B', fontSize: 12 }}>
                                    Push notifikasi hanya akan dikirimkan ke pengguna yang dipilih
                                  </Typography>
                                </Stack>
                              </MenuItem>
                            </Select>
                          </Stack>

                          {inputValue?.type === 'OPTION' && (
                            <Stack direction="column" width="10%" gap={1}>
                              <Typography>
                                Total Audiens <span style={{ color: 'red' }}>*</span>
                              </Typography>
                              <Stack
                                height="57px"
                                alignItems="center"
                                justifyContent="center"
                                style={{ backgroundColor: '#EEEEEE', borderRadius: 6, cursor: 'pointer' }}
                                onClick={() => setShowModal(!showModal)}>
                                <Typography style={{ fontWeight: 'bold', color: '#666666' }}>
                                  {inputValue?.participant?.length}
                                </Typography>
                              </Stack>
                            </Stack>
                          )}
                        </Stack>

                        {inputValue?.type === 'OPTION' && (
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ height: 45, width: '52%', borderRadius: 8 }}
                            onClick={() =>
                              router.push({ pathname: '/announcement/notification/create', query: { participant: true } })
                            }>
                            <Typography style={{ fontSize: 14, textTransform: 'capitalize' }}>Pilih Audiens</Typography>
                          </Button>
                        )}
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
                      type="submit"
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
              </form>
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
