import { Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { LoadingButton } from '@mui/lab';
import { Box, Button, InputAdornment, Modal, Stack, TextField } from '@mui/material';
import {
  useApproveTopupMutation,
  useCreateTopupMutation,
  useDeleteTopupMutation,
  useUploadBulkTopupMutation,
} from 'api/console/monetize/dashboard';
import { formatCurrency } from 'helpers/stringHelper';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ModalTopup({ open, selected, status, handleClose }) {
  const [inputValue, setInputValue] = useState({
    email: '',
    topup: '',
    file: [],
  });
  const [deleteTopup, { isLoading: loadingDelete }] = useDeleteTopupMutation();
  const [approveTopup, { isLoading: loadingApprove }] = useApproveTopupMutation();
  const [createTopup, { isLoading: loadingCreate }] = useCreateTopupMutation();
  const [bulkUpload, { isLoading: loadingUpload }] = useUploadBulkTopupMutation();

  useEffect(() => {
    setInputValue({
      email: '',
      topup: '',
      file: [],
    });
  }, [open]);

  const handleDelete = () => {
    deleteTopup({ _id: selected }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        toast.success('Berhasil Menghapus Data', { duration: 3000 });
      }
    });
    handleClose();
  };

  const handleApprove = () => {
    let formData = {
      _id: selected,
      approveByFinance: status === 'finance' ? true : undefined,
      approveByStrategy: status === 'strategy' ? true : undefined,
    };

    approveTopup(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        toast.success('Berhasil Mengupdate Data', { duration: 3000 });
      }
    });

    handleClose();
  };

  const handleCreate = () => {
    createTopup(inputValue).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.messages?.info ? res?.error?.data?.messages?.info?.[0] : res?.error?.data?.message, {
          duration: 3000,
        });
      } else {
        toast.success('Berhasil Membuat Data', { duration: 3000 });
      }
    });
    handleClose();
  };

  const handleUpload = () => {
    let formData = new FormData();
    formData.append('file', inputValue?.file);

    toast.loading('Loading upload...', { id: 'loading-upload' });

    bulkUpload(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.messages?.info ? res?.error?.data?.messages?.info?.[0] : res?.error?.data?.message, {
          id: 'loading-upload',
          duration: 5000,
        });
      } else {
        toast.success(`Berhasil mengupload ${res?.data?.data?.succes} data dari ${res?.data?.data?.length} data`, {
          id: 'loading-upload',
          duration: 5000,
        });
      }
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          backgroundColor: 'white',
          boxShadow: 24,
          padding: 32,
          borderRadius: '4px',
        }}>
        <div style={{ position: 'absolute', zIndex: 100, top: 15, right: 15, cursor: 'pointer' }} onClick={handleClose}>
          <Close style={{ color: '#666666' }} />
        </div>
        <Stack direction="column" alignItems="center" gap={3} p={1} style={{ position: 'relative' }}>
          <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18, width: '90%' }}>
            {status === 'finance' && 'Kamu (Head Of Finance), ingin menyetujui topup dana ini ?'}
            {status === 'strategy' && 'Kamu (Head Of Strategy), ingin menyetujui topup dana ini ?'}
            {status === 'create' && 'Form Permintaan Topup'}
            {status === 'upload' && 'Form Upload Bulk Data Topup'}
          </Typography>
          {status === 'create' && (
            <Stack direction="column" gap={2} width="100%">
              <TextField
                color="secondary"
                value={inputValue?.email}
                placeholder="Masukan email penerima"
                onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })}
              />
              <TextField
                color="secondary"
                value={inputValue?.topup >= 1 ? formatCurrency(inputValue?.topup) : ''}
                placeholder="Masukan topup"
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    topup: Number(e.target.value?.includes('.') ? e.target.value.replaceAll('.', '') : e.target.value),
                  });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography style={{ fontWeight: 'bold' }}>Rp</Typography>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  onKeyPress: (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  },
                }}
              />
            </Stack>
          )}
          {status === 'upload' && (
            <TextField
              type="file"
              color="secondary"
              onChange={(e) => {
                if (e.target.files[0]?.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                  toast.error('Harap memasukan file dengan format excel');
                  setInputValue({ ...inputValue, file: [] });
                } else {
                  setInputValue({ ...inputValue, file: e.target.files[0] });
                }
              }}
            />
          )}
          <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
            <LoadingButton
              loading={loadingDelete || loadingApprove || loadingCreate || loadingUpload}
              type="submit"
              variant="contained"
              color="secondary"
              style={{ height: 32 }}
              onClick={() => {
                if (status === 'finance' || status === 'strategy') {
                  handleApprove();
                } else if (status === 'create') {
                  handleCreate();
                } else if (status === 'upload') {
                  handleUpload();
                }
              }}
              disabled={
                (status === 'create' &&
                  (!inputValue?.email || !inputValue?.email?.includes('@') || inputValue?.topup < 1)) ||
                (status === 'upload' && inputValue?.file?.length < 1)
              }>
              {(status === 'finance' || status === 'strategy') && 'Setujui'}
              {status === 'create' && 'Tambah'}
              {status === 'upload' && 'Upload'}
            </LoadingButton>
            <Button
              variant="text"
              color="secondary"
              style={{ height: 32 }}
              onClick={() => (status === 'create' || status === 'upload' ? handleClose() : handleDelete())}
              disabled={loadingDelete || loadingApprove || loadingCreate || loadingUpload}>
              {(status === 'finance' || status === 'strategy') && 'Tolak'}
              {(status === 'create' || status === 'upload') && 'Batal'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ModalTopup;
