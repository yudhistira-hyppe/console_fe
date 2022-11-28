import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Stack, TextField } from '@mui/material';
import { useGetReportReasonQuery } from 'api/console/helpCenter/konten';

export default function ModalReject({ showModal, onClose, onConfirm, type }) {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const { data: reportReason } = useGetReportReasonQuery();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
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
        <Typography fontWeight={'bold'}>Kamu Akan Menolak Peningkatan Akun</Typography>
        <Divider style={{ margin: '8px 0' }} />
        <Typography variant="body2" color="#666666" style={{ marginBottom: 10 }}>
          Berikan alasan penangguhan
        </Typography>
        <FormControl style={{ width: '100%' }}>
          <RadioGroup value={reason} style={{ gap: 10 }}>
            <FormControlLabel
              value={JSON.stringify({ reason: 'Nomor KTP/ID berbeda dengan nomor yang ada di dokumen pendukung' })}
              control={<Radio size="small" color="primary" />}
              onChange={onChangeHandler}
              label={
                <Typography color="#666666" variant="body2">
                  Nomor KTP/ID berbeda dengan nomor yang ada di dokumen pendukung
                </Typography>
              }
            />
            <FormControlLabel
              value={JSON.stringify({
                reason: 'Foto KTP/ID berbeda dengan foto selfie (ada perubahan warna rambut/mata, bentuk wajah, dll)',
              })}
              control={<Radio size="small" color="primary" />}
              onChange={onChangeHandler}
              label={
                <Typography color="#666666" variant="body2">
                  Foto KTP/ID berbeda dengan foto selfie (ada perubahan warna rambut/mata, bentuk wajah, dll)
                </Typography>
              }
            />
            <FormControlLabel
              value={JSON.stringify({ reason: 'Dokumen terlalu buram sulit diidentifikasi' })}
              control={<Radio size="small" color="primary" />}
              onChange={onChangeHandler}
              label={
                <Typography color="#666666" variant="body2">
                  Dokumen terlalu buram sulit diidentifikasi
                </Typography>
              }
            />
            <FormControlLabel
              value={JSON.stringify({ reason: 'Foto KTP/ID tampak buram sulit diidentifikasi dengan foto selfie' })}
              control={<Radio size="small" color="primary" />}
              onChange={onChangeHandler}
              label={
                <Typography color="#666666" variant="body2">
                  Foto KTP/ID tampak buram sulit diidentifikasi dengan foto selfie
                </Typography>
              }
            />
            <FormControlLabel
              value={JSON.stringify({ reason: 'Lainnya' })}
              control={<Radio size="small" color="primary" />}
              onChange={onChangeHandler}
              label={
                <Typography color="#666666" variant="body2">
                  Lainnya
                </Typography>
              }
            />
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
          <Button
            variant="contained"
            color="primary"
            onClick={onConfirm}
            disabled={reason === '' || (JSON.parse(reason)?.reason === 'Lainnya' && otherReason === '')}>
            Konfirmasi
          </Button>
          <Button onClick={onClose}>Batal</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
