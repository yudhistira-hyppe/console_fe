import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { useGetReportReasonQuery } from 'api/console/helpCenter/konten';
import { LoadingButton } from '@mui/lab';

const reportReason = {
  data: [
    {
      _id: '',
      reason: 'Nomor KTP/ID sudah terdaftar pada akun lain',
    },
    {
      _id: '',
      reason: 'Foto KTP/ID berbeda dengan foto selfie (ada perubahan warna rambut/mata, bentuk wajah, dll)',
    },
    {
      _id: '',
      reason: 'Foto selfie terlalu buram sulit diidentifikasi',
    },
    {
      _id: '',
      reason: 'Foto KTP/ID tampak buram sulit diidentifikasi dengan foto selfie',
    },
  ],
};

export default function ModalReject({ showModal, onClose, onConfirm, loading }) {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  // const { data: reportReason } = useGetReportReasonQuery({ type: 'kyc' });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: '28px 24px',
    borderRadius: '4px',
  };

  useEffect(() => {
    setReason('');
    setOtherReason('');
  }, [showModal]);

  const onChangeHandler = (e) => {
    setReason(e.target.value);
    JSON.parse(e.target.value)?.reason !== 'Lainnya' && setOtherReason('');
  };

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus>
      <Box sx={style}>
        <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>Kamu Menolak Verifikasi Akun</Typography>
        <Divider style={{ margin: '8px 0' }} />
        <Typography style={{ fontSize: 14, color: '#666666', marginBottom: 10 }}>Berikan alasan penangguhan</Typography>
        <FormControl style={{ width: '100%' }}>
          <RadioGroup value={reason} style={{ gap: 12 }}>
            {reportReason?.data?.map((item, key) => (
              <FormControlLabel
                key={key}
                value={JSON.stringify({ _id: item?._id, reason: item?.reason })}
                control={<Radio color="secondary" />}
                onChange={onChangeHandler}
                label={<Typography style={{ color: '#666666', fontSize: 14 }}>{item?.reason || '-'}</Typography>}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  '& .MuiRadio-root': { padding: '0 12px 0 8px' },
                }}
              />
            ))}
          </RadioGroup>

          {reason !== '' && JSON.parse(reason)?.reason === 'Lainnya' && (
            <TextField
              multiline
              minRows={5}
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Tulis penjelasan"
            />
          )}
        </FormControl>

        <Stack direction={'row'} mt={3} mb={1} justifyContent={'center'} spacing={3}>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="secondary"
            onClick={() => onConfirm({ ...JSON.parse(reason), otherReason: otherReason })}
            disabled={reason === '' || (JSON.parse(reason)?.reason === 'Lainnya' && otherReason === '')}>
            Konfirmasi
          </LoadingButton>
          <Button color="secondary" onClick={onClose}>
            Batal
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
