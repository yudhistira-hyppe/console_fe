import { AddPhotoAlternate } from '@material-ui/icons';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, Card, Grid, Stack, TextField } from '@mui/material';
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Ckeditor from 'react-ckeditor-component/lib/ckeditor';
import { makeStyles } from '@material-ui/styles';
import Router, { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useGetDetailCommunityQuery, useUpdateCommunityMutation } from 'api/console/utilitas/community';
import toast from 'react-hot-toast';

const useStyles = makeStyles(() => ({
  uploadBox: {
    backgroundColor: '#E8E8E8A6',
    border: '1px dashed #737373',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 12,
    height: 170,
    width: '100%',
    cursor: 'pointer',
    overflow: 'hidden',
  },
}));

const UpdateCommunity = ({ _id }) => {
  const [inputValue, setInputValue] = useState({
    name: '',
    title_id: '',
    title_en: '',
    value_id: '',
    value_en: '',
    remark: '',
  });
  const [updateCommunity, { isLoading: loadingUpdate }] = useUpdateCommunityMutation();
  const { data: detailCommunity, isFetching: loadingDetail } = useGetDetailCommunityQuery(_id);
  const router = useRouter();

  useEffect(() => {
    setInputValue({
      name: detailCommunity?.data?.name || '',
      title_id: detailCommunity?.data?.title_id || '',
      title_en: detailCommunity?.data?.title_en || '',
      value_id: detailCommunity?.data?.value_id || '',
      value_en: detailCommunity?.data?.value_en || '',
      remark: detailCommunity?.data?.remark || '',
    });
  }, [loadingDetail]);

  const checkDisable = () => {
    let disable = false;

    if (
      !inputValue?.name ||
      !inputValue?.title_id ||
      !inputValue?.title_en ||
      !inputValue?.value_id ||
      !inputValue?.value_en
    ) {
      disable = true;
    }

    return disable;
  };

  const checkEligibleDraft = () => {
    let disable = false;

    if (
      !inputValue?.name &&
      !inputValue?.title_id &&
      !inputValue?.title_en &&
      !inputValue?.value_id &&
      !inputValue?.value_en &&
      !inputValue?.remark
    ) {
      disable = true;
    }

    return disable;
  };

  const onCkeditorChange = (event, name) => {
    const newContent = event.editor.getData();

    setInputValue((prevVal) => {
      return { ...prevVal, [name]: newContent };
    });
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();

    let formData = {
      id: _id,
      status: type,
      redirectUrl:
        type === 'SUBMITTED'
          ? `${window.location.origin + window.location.pathname}?tab=community&approving=true&_id=`
          : undefined,
      ...inputValue,
    };

    updateCommunity(formData).then((res) => {
      if (res?.data) {
        toast.success('Berhasil memperbarui data');
        router.replace({ pathname: '/utilitas', query: { tab: 'community' } });
      } else {
        toast.error('Terjadi kesalahan, silahkan coba lagi');
      }
    });
  };

  return (
    <Stack direction="column" gap={3}>
      <Stack
        direction={'row'}
        onClick={() => Router.push('/utilitas?tab=community')}
        gap="5px"
        style={{ width: 'fit-content', cursor: 'pointer' }}>
        <Stack direction={'column'} justifyContent={'center'}>
          <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
        </Stack>
        <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
          Kembali
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit}>
        <Stack direction="column" gap={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card style={{ padding: '18px 24px 24px' }}>
                <Stack direction="column" gap={1}>
                  <Typography variant="body1">Nama Jenis</Typography>
                  <TextField
                    placeholder="Input Nama Jenis"
                    color="secondary"
                    value={inputValue.name}
                    onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                    inputProps={{ maxLength: 30 }}
                    style={{ width: 353 }}
                    required
                  />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card style={{ padding: '18px 24px 24px' }}>
                <Stack direction="row" alignItems="center" gap={3}>
                  <Stack direction="column" gap={1}>
                    <Typography variant="body1">Judul (Indonesia)</Typography>
                    <TextField
                      placeholder="Input Judul Indonesia"
                      color="secondary"
                      value={inputValue.title_id}
                      onChange={(e) => setInputValue({ ...inputValue, title_id: e.target.value })}
                      inputProps={{ maxLength: 30 }}
                      style={{ width: 353 }}
                      required
                    />
                  </Stack>

                  <Stack direction="column" gap={1}>
                    <Typography variant="body1">Judul (English)</Typography>
                    <TextField
                      placeholder="Input Judul English"
                      color="secondary"
                      value={inputValue.title_en}
                      onChange={(e) => setInputValue({ ...inputValue, title_en: e.target.value })}
                      inputProps={{ maxLength: 30 }}
                      style={{ width: 353 }}
                      required
                    />
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card style={{ padding: '18px 24px 24px' }}>
                <Stack direction="column" gap={1}>
                  <Typography variant="body1">Isi (Indonesia)</Typography>
                  <Ckeditor
                    content={inputValue.value_id}
                    events={{
                      change: (e) => onCkeditorChange(e, 'value_id'),
                    }}
                    config={{
                      toolbarLocation: 'bottom',
                      toolbarGroups: [
                        { name: 'document', groups: ['mode', 'document', 'doctools'] },
                        { name: 'clipboard', groups: ['clipboard', 'undo'] },
                        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                        { name: 'forms', groups: ['forms'] },
                        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                        { name: 'links', groups: ['links'] },
                        { name: 'insert', groups: ['Image', 'Table'] },
                        { name: 'styles', groups: ['styles'] },
                        { name: 'colors', groups: ['colors'] },
                        { name: 'tools', groups: ['tools'] },
                        { name: 'others', groups: ['others'] },
                        { name: 'about', groups: ['about'] },
                      ],
                    }}
                  />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card style={{ padding: '18px 24px 24px' }}>
                <Stack direction="column" gap={1}>
                  <Typography variant="body1">Isi (English)</Typography>
                  <Ckeditor
                    content={inputValue.value_en}
                    events={{
                      change: (e) => onCkeditorChange(e, 'value_en'),
                    }}
                    config={{
                      toolbarLocation: 'bottom',
                      toolbarGroups: [
                        { name: 'document', groups: ['mode', 'document', 'doctools'] },
                        { name: 'clipboard', groups: ['clipboard', 'undo'] },
                        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                        { name: 'forms', groups: ['forms'] },
                        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                        { name: 'links', groups: ['links'] },
                        { name: 'insert', groups: ['Image', 'Table'] },
                        { name: 'styles', groups: ['styles'] },
                        { name: 'colors', groups: ['colors'] },
                        { name: 'tools', groups: ['tools'] },
                        { name: 'others', groups: ['others'] },
                        { name: 'about', groups: ['about'] },
                      ],
                    }}
                  />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card style={{ padding: '18px 24px 24px' }}>
                <Stack direction="column" gap={1} width="100%">
                  <Typography variant="body1">Catatan</Typography>
                  <TextField
                    fullWidth
                    placeholder="Tambahkan catatan perubahan atau informasi tambahan di sini..."
                    color="secondary"
                    value={inputValue.remark}
                    onChange={(e) => setInputValue({ ...inputValue, remark: e.target.value })}
                    inputProps={{ maxLength: 30 }}
                    required
                  />
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" gap={3}>
              <LoadingButton
                loading={loadingUpdate}
                variant="contained"
                color="secondary"
                sx={{ height: 40 }}
                onClick={(e) => handleSubmit(e, 'SUBMITTED')}
                disabled={checkDisable() || loadingUpdate}>
                Ajukan
              </LoadingButton>
              <LoadingButton
                loading={loadingUpdate}
                variant="outlined"
                color="secondary"
                sx={{ height: 40 }}
                onClick={(e) => handleSubmit(e, 'DRAFT')}
                type="submit"
                disabled={checkEligibleDraft() || loadingUpdate}>
                Simpan sebagai draft
              </LoadingButton>
            </Stack>

            <Button color="secondary" onClick={() => router.replace({ pathname: '/utilitas', query: { tab: 'community' } })}>
              Batal
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default UpdateCommunity;
