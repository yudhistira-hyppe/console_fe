import { Typography } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  MenuItem,
  Modal,
  Stack,
  TextField,
} from '@mui/material';
import { useCreateAdsPlaceMutation, useGetAdsTypeListQuery, useUpdateAdsPlaceMutation } from 'api/console/utilitas/ads';
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

const ModalAdsPlace = ({ open, handleClose, data }) => {
  const [inputValue, setInputValue] = useState({
    namePlace: '',
    descPlace: '',
    adsType: '',
  });
  const [createPlace, { isLoading: loadingCreate }] = useCreateAdsPlaceMutation();
  const [updatePlace, { isLoading: loadingUpdate }] = useUpdateAdsPlaceMutation();
  const { data: listType, isFetching: loadingUtility } = useGetAdsTypeListQuery({ limit: 200, page: 0 });

  useEffect(() => {
    if (!isEmpty(data)) {
      setInputValue({
        namePlace: data?.namePlace || '',
        descPlace: data?.descPlace || '',
        adsType: listType?.data?.find((item) => item.nameType === data?.nameType) || '',
      });
    }
  }, [open]);

  const checkDisable = () => {
    let disabled = false;

    if (isEmpty(data)) {
      if (!inputValue.namePlace || !inputValue.descPlace || !inputValue.adsType) {
        disabled = true;
      }
    } else {
      if (
        inputValue.namePlace === data?.namePlace &&
        inputValue.descPlace === data?.descPlace &&
        inputValue.adsType?.nameType === data?.nameType
      ) {
        disabled = true;
      }
    }

    return disabled;
  };

  const handleSubmit = () => {
    if (isEmpty(data)) {
      createPlace({ ...inputValue, adsType: inputValue?.adsType?._id }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message?.info[0], { duration: 3000 });
        } else {
          toast.success('berhasil menambahkan penempatan iklan', { duration: 3000 });
        }
        handleClose();
        setInputValue({
          namePlace: '',
          descPlace: '',
          adsType: '',
        });
      });
    } else {
      updatePlace({ id: data?._id, data: { ...inputValue, adsType: inputValue?.adsType?._id } }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message?.info[0], { duration: 3000 });
        } else {
          toast.success('berhasil mengupdate penempatan iklan', { duration: 3000 });
        }
        handleClose();
        setInputValue({
          namePlace: '',
          descPlace: '',
          adsType: '',
        });
      });
    }
  };

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" gap={3}>
          <Typography style={{ fontWeight: 'bold', fontSize: 24 }}>Penambahan Penempatan Iklan Baru</Typography>
          <Stack direction="column" gap={2}>
            <TextField
              placeholder="Input Nama Penempatan"
              label="Nama Penempatan"
              color="secondary"
              value={inputValue.namePlace}
              onChange={(e) => setInputValue({ ...inputValue, namePlace: e.target.value })}
              inputProps={{
                maxLength: 30,
              }}
            />
            <TextField
              placeholder="Input Deskripsi Penempatan"
              label="Deskripsi Penempatan"
              color="secondary"
              value={inputValue.descPlace}
              onChange={(e) => setInputValue({ ...inputValue, descPlace: e.target.value })}
              inputProps={{
                maxLength: 50,
              }}
            />
            <TextField
              select
              label="Tipe Data Setting"
              placeholder="Pilih Tipe Data Setting"
              color="secondary"
              value={inputValue.adsType}
              onChange={(e) => setInputValue({ ...inputValue, adsType: e.target.value })}>
              {listType?.data?.map((item, key) => (
                <MenuItem key={key} value={item} color="secondary">
                  {item?.nameType || '-'}
                </MenuItem>
              ))}
            </TextField>
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
                  namePlace: '',
                  descPlace: '',
                  adsType: '',
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

export default ModalAdsPlace;
