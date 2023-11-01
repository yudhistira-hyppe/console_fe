import { Typography } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { Box, Button, InputAdornment, Modal, Stack, TextField } from '@mui/material';
import { useApproveTopupMutation, useCreateTopupMutation, useDeleteTopupMutation } from 'api/console/monetize/dashboard';
import { formatCurrency } from 'helpers/stringHelper';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ModalTopup({ open, selected, status, handleClose }) {
  const [inputValue, setInputValue] = useState({
    email: '',
    topup: '',
  });
  const [deleteTopup, { isLoading: loadingDelete }] = useDeleteTopupMutation();
  const [approveTopup, { isLoading: loadingApprove }] = useApproveTopupMutation();
  const [createTopup, { isLoading: loadingCreate }] = useCreateTopupMutation();

  useEffect(() => {
    setInputValue({
      email: '',
      topup: '',
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

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          backgroundColor: 'white',
          boxShadow: 24,
          padding: 24,
          borderRadius: '4px',
        }}>
        <Stack direction="column" alignItems="center" gap={3} style={{ position: 'relative' }}>
          <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
            {status === 'delete' && 'Kamu yakin ingin menghapus data ini ?'}
            {status === 'finance' && 'Kamu (Head Of Finance), yakin ingin menyetujui topup dana ini ?'}
            {status === 'strategy' && 'Kamu (Head Of Strategy), yakin ingin menyetujui topup dana ini ?'}
            {status === 'create' && 'Form Permintaan Topup'}
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
          <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
            <LoadingButton
              loading={loadingDelete || loadingApprove || loadingCreate}
              type="submit"
              variant="contained"
              color="secondary"
              style={{ height: 32 }}
              onClick={() => {
                if (status === 'delete') {
                  handleDelete();
                } else if (status === 'finance' || status === 'strategy') {
                  handleApprove();
                } else if (status === 'create') {
                  handleCreate();
                }
              }}
              disabled={
                status === 'create' && (!inputValue?.email || !inputValue?.email?.includes('@') || inputValue?.topup < 1)
              }>
              {status === 'delete' && 'Hapus'} {(status === 'finance' || status === 'strategy') && 'Konfirmasi'}
              {status === 'create' && 'Tambah'}
            </LoadingButton>
            <Button
              variant="text"
              color="secondary"
              style={{ height: 32 }}
              onClick={handleClose}
              disabled={loadingDelete || loadingApprove || loadingCreate}>
              Batal
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ModalTopup;
