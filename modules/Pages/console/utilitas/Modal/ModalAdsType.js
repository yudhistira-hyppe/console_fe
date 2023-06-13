import { Typography } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, Modal, Stack, TextField } from '@mui/material';
import { useCreateAdsTypeMutation, useUpdateAdsTypeMutation } from 'api/console/utilitas/ads';
import { isEmpty } from 'lodash';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const ModalAdsType = ({ open, handleClose, data }) => {
  const [inputValue, setInputValue] = useState({
    nameType: '',
    creditValue: '',
    mediaType: [],
    descType: '',
    AdsSkip: '',
    durationMax: '',
    durationMin: '',
    rewards: '',
  });
  const [createType, { isLoading: loadingCreate }] = useCreateAdsTypeMutation();
  const [updateType, { isLoading: loadingUpdate }] = useUpdateAdsTypeMutation();

  useEffect(() => {
    if (!isEmpty(data)) {
      setInputValue({
        nameType: data?.nameType || '',
        creditValue: data?.creditValue || '',
        mediaType: data?.mediaType || [],
        descType: data?.descType || '',
        AdsSkip: data?.AdsSkip || 0,
        durationMax: data?.durationMax || 0,
        durationMin: data?.durationMin || 0,
        rewards: data?.rewards || 0,
      });
    }
  }, [open]);

  const checkDisable = () => {
    let disabled = false;

    if (isEmpty(data)) {
      if (
        !inputValue.nameType ||
        !inputValue.creditValue ||
        !inputValue.descType ||
        inputValue.mediaType.length < 1 ||
        !inputValue.AdsSkip ||
        !inputValue.durationMax ||
        !inputValue.durationMin ||
        !inputValue.rewards
      ) {
        disabled = true;
      }
    } else {
      if (
        inputValue.nameType === data?.nameType &&
        inputValue.creditValue === data?.creditValue &&
        inputValue.descType === data?.descType &&
        inputValue.AdsSkip === data?.AdsSkip &&
        inputValue.durationMax === data?.durationMax &&
        inputValue.durationMin === data?.durationMin &&
        inputValue.rewards === data?.rewards
      ) {
        disabled = true;
      }
    }

    return disabled;
  };

  const handleSubmit = () => {
    if (isEmpty(data)) {
      createType(inputValue).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message?.info[0], { duration: 3000 });
        } else {
          toast.success('berhasil menambahkan tipe iklan', { duration: 3000 });
        }
        handleClose();
        setInputValue({
          nameType: '',
          creditValue: '',
          mediaType: [],
          descType: '',
          AdsSkip: '',
          durationMax: '',
          durationMin: '',
          rewards: '',
        });
      });
    } else {
      updateType({ id: data?._id, data: inputValue }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message?.info[0], { duration: 3000 });
        } else {
          toast.success('berhasil mengupdate tipe iklan', { duration: 3000 });
        }
        handleClose();
        setInputValue({
          nameType: '',
          creditValue: '',
          mediaType: [],
          descType: '',
          AdsSkip: '',
          durationMax: '',
          durationMin: '',
          rewards: '',
        });
      });
    }
  };

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" gap={3}>
          <Typography style={{ fontWeight: 'bold', fontSize: 24 }}>
            {!isEmpty(data) ? 'Perubahan Tipe Iklan' : 'Penambahan Tipe Iklan Baru'}
          </Typography>
          <Stack direction="column" gap={2}>
            <TextField
              placeholder="Input Nama Tipe"
              label="Nama Tipe"
              color="secondary"
              value={inputValue.nameType}
              onChange={(e) => setInputValue({ ...inputValue, nameType: e.target.value })}
              inputProps={{
                maxLength: 30,
              }}
            />
            <TextField
              placeholder="Input Deskripsi Tipe"
              label="Deskripsi Tipe"
              color="secondary"
              value={inputValue.descType}
              onChange={(e) => setInputValue({ ...inputValue, descType: e.target.value })}
              inputProps={{
                maxLength: 50,
              }}
            />
            <FormGroup
              onChange={(e) =>
                setInputValue((prevVal) => {
                  return {
                    ...prevVal,
                    mediaType: prevVal.mediaType.find((item) => item === e.target.value)
                      ? prevVal.mediaType.filter((item) => item !== e.target.value)
                      : [...prevVal.mediaType, e.target.value],
                  };
                })
              }>
              <Typography variant="subtitle1">Tipe Media: </Typography>
              <Stack direction="row" alignItems="center" gap={2}>
                <FormControlLabel
                  label="Image"
                  value="image"
                  control={
                    <Checkbox defaultChecked={false} checked={inputValue.mediaType.includes('image')} color="secondary" />
                  }
                />
                <FormControlLabel
                  label="Video"
                  value="video"
                  control={
                    <Checkbox defaultChecked={false} checked={inputValue.mediaType.includes('video')} color="secondary" />
                  }
                />
              </Stack>
            </FormGroup>
            <TextField
              placeholder="Input Kredit Iklan"
              label="Kredit Iklan"
              color="secondary"
              value={inputValue.creditValue}
              onChange={(e) => setInputValue({ ...inputValue, creditValue: e.target.value })}
              inputProps={{
                min: 0,
                onKeyPress: (event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                },
              }}
            />
            <TextField
              placeholder="Input Lama Durasi Skip"
              label="Lama Durasi Skip"
              color="secondary"
              value={inputValue.AdsSkip}
              onChange={(e) => setInputValue({ ...inputValue, AdsSkip: e.target.value })}
              inputProps={{
                min: 0,
                onKeyPress: (event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                },
              }}
            />
            <TextField
              placeholder="Input Minimal Durasi"
              label="Minimal Durasi"
              color="secondary"
              value={inputValue.durationMin}
              onChange={(e) => setInputValue({ ...inputValue, durationMin: e.target.value })}
              inputProps={{
                min: 0,
                onKeyPress: (event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                },
              }}
            />
            <TextField
              placeholder="Input Maksimal Durasi"
              label="Maksimal Durasi"
              color="secondary"
              value={inputValue.durationMax}
              onChange={(e) => setInputValue({ ...inputValue, durationMax: e.target.value })}
              inputProps={{
                min: 0,
                onKeyPress: (event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                },
              }}
            />
            <TextField
              placeholder="Input Hadiah Iklan"
              label="Hadiah Iklan"
              color="secondary"
              value={inputValue.rewards}
              onChange={(e) => setInputValue({ ...inputValue, rewards: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography>Rp</Typography>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                min: 0,
                onKeyPress: (event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                },
              }}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <LoadingButton
              loading={loadingCreate || loadingUpdate}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ height: 40 }}
              onClick={handleSubmit}
              disabled={checkDisable()}>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                {isEmpty(data) ? 'Tambah' : 'Simpan'}
              </Typography>
            </LoadingButton>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ height: 40 }}
              onClick={() => {
                handleClose();
                setInputValue({
                  nameType: '',
                  creditValue: '',
                  mediaType: [],
                  descType: '',
                  AdsSkip: '',
                  durationMax: '',
                  durationMin: '',
                  rewards: '',
                });
              }}>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                Batal
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalAdsType;
