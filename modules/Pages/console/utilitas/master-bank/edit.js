import { AddPhotoAlternate } from '@material-ui/icons';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, Card, Grid, Stack, TextField } from '@mui/material';
import { Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Ckeditor from 'react-ckeditor-component/lib/ckeditor';
import { makeStyles } from '@material-ui/styles';
import Router from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { useGetDetailMasterBankQuery, useUpdateMasterBankMutation } from 'api/console/utilitas/bank';

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

const EditMasterBank = ({ bankcode }) => {
  const classes = useStyles();
  const [urlImage, setUrlImage] = useState('');
  const [inputValue, setInputValue] = useState({
    image: '',
    name: '',
    code: '',
    e_banking: '',
    atm: '',
    m_banking: '',
    i_banking: '',
  });
  const { data: detailMaster, isLoading } = useGetDetailMasterBankQuery({ bankcode });
  const [updateBank, { isLoading: loadingUpdate }] = useUpdateMasterBankMutation();

  useEffect(() => {
    setInputValue({
      image: detailMaster?.data?.bankIcon || '',
      name: detailMaster?.data?.bankname || '',
      code: detailMaster?.data?.bankcode || '',
      e_banking: detailMaster?.data?.urlEbanking || '',
      atm: detailMaster?.data?.atm || '',
      m_banking: detailMaster?.data?.mobileBanking || '',
      i_banking: detailMaster?.data?.internetBanking || '',
    });
    setUrlImage(detailMaster?.data?.bankIcon + '?m=' + new Date().getTime());
  }, [isLoading]);

  const handleUploadImage = (e) => {
    if (e.target.files[0]?.type !== 'image/png') {
      alert('salah format woyy 🤬');
      return;
    } else {
      const blob = new Blob(e.target.files, { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setInputValue({ ...inputValue, image: e.target.files });
      setUrlImage(url);
    }
  };

  const checkDisable = () => {
    let disable = false;

    if (
      inputValue?.image === detailMaster?.data?.bankIcon &&
      inputValue?.code === detailMaster?.data?.bankcode &&
      inputValue?.name === detailMaster?.data?.bankname &&
      inputValue?.e_banking === detailMaster?.data?.urlEbanking &&
      inputValue?.atm === detailMaster?.data?.atm &&
      inputValue?.i_banking === detailMaster?.data?.internetBanking &&
      inputValue?.m_banking === detailMaster?.data?.mobileBanking
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

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append('bankcode', inputValue.code);
    formData.append('bankname', inputValue.name);
    formData.append('urlEbanking', inputValue.e_banking);
    inputValue?.image === detailMaster?.data?.bankIcon
      ? formData.append('icon_bank', inputValue.image)
      : formData.append('icon_bank', inputValue.image[0]);
    formData.append('internetBanking', inputValue.i_banking);
    formData.append('mobileBanking', inputValue.m_banking);
    formData.append('atm', inputValue.atm);

    updateBank({ id: detailMaster?.data?._id, formData }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        Router.replace('/utilitas?tab=bank');
        toast.success('berhasil mengupdate bank', { duration: 3000 });
      }
    });
  };

  return (
    <Stack direction="column" gap={3}>
      <Stack
        direction={'row'}
        onClick={() => Router.push('/utilitas?tab=bank')}
        gap="5px"
        style={{ width: 'fit-content', cursor: 'pointer' }}>
        <Stack direction={'column'} justifyContent={'center'}>
          <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
        </Stack>
        <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
          Kembali
        </Typography>
      </Stack>

      <Card style={{ padding: 24 }}>
        <Stack direction="column" gap={3}>
          <label htmlFor="upload_icon" style={{ width: 170 }}>
            <Box className={classes.uploadBox} style={{ width: 170 }}>
              {inputValue?.image ? (
                <Avatar src={urlImage} alt="Thumbnail Music" variant="square" style={{ width: '100%', height: '100%' }} />
              ) : (
                <>
                  <AddPhotoAlternate style={{ fontSize: 64, color: '#DADADA' }} />
                  <Typography style={{ fontWeight: 'bold', color: '#DADADA' }}>Upload Thumbnail</Typography>
                </>
              )}
              <input hidden id="upload_icon" type="file" accept="image/png" onChange={handleUploadImage} />
            </Box>
          </label>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Stack direction="column" gap={1}>
                <Typography variant="body1">Nama Bank</Typography>
                <TextField
                  placeholder="Input Nama Bank"
                  color="secondary"
                  value={inputValue.name}
                  onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                  inputProps={{
                    maxLength: 30,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="column" gap={1}>
                <Typography variant="body1">Kode Bank</Typography>
                <TextField
                  placeholder="Input Kode Bank"
                  color="secondary"
                  value={inputValue.code}
                  onChange={(e) => setInputValue({ ...inputValue, code: e.target.value })}
                  inputProps={{
                    maxLength: 30,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="column" gap={1}>
                <Typography variant="body1">Url E-Banking</Typography>
                <TextField
                  placeholder="Input Url E-Banking"
                  color="secondary"
                  value={inputValue.e_banking}
                  onChange={(e) => setInputValue({ ...inputValue, e_banking: e.target.value })}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="column" gap={1}>
                <Typography variant="body1">Deskripsi ATM</Typography>
                <Ckeditor
                  name="atm"
                  content={inputValue.atm}
                  events={{
                    change: (e) => onCkeditorChange(e, 'atm'),
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
            </Grid>
            <Grid item xs={12}>
              <Stack direction="column" gap={1}>
                <Typography variant="body1">Deskripsi Mobile Banking</Typography>
                <Ckeditor
                  content={inputValue.m_banking}
                  events={{
                    change: (e) => onCkeditorChange(e, 'm_banking'),
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
            </Grid>
            <Grid item xs={12}>
              <Stack direction="column" gap={1}>
                <Typography variant="body1">Deskripsi Internet Banking</Typography>
                <Ckeditor
                  content={inputValue.i_banking}
                  events={{
                    change: (e) => onCkeditorChange(e, 'i_banking'),
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
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="flex-end" gap={2}>
            <LoadingButton
              loading={loadingUpdate}
              variant="contained"
              color="secondary"
              sx={{ height: 40 }}
              onClick={handleSubmit}
              disabled={checkDisable()}>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                Simpan Perubahan
              </Typography>
            </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default EditMasterBank;
