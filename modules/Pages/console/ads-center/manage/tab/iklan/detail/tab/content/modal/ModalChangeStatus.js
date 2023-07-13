import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Card, TextareaAutosize, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Stack, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';

const RadioItem = ({ onChange, label, value }) => (
  <FormControlLabel
    value={value}
    control={<Radio size="small" color="secondary" />}
    onChange={onChange}
    label={<Typography style={{ color: '#666666' }}>{label}</Typography>}
  />
);

const dummyData = [
  {
    value: 'Landing Page tidak sesuai standar',
    label: 'Landing Page tidak sesuai standar',
  },
  {
    value: 'Iklan tidak konsisten',
    label: 'Iklan tidak konsisten',
  },
  {
    value: 'Penggunaan bahasa yang tidak pantas',
    label: 'Penggunaan bahasa yang tidak pantas',
  },
  {
    value: 'Masalah dengan judul, deskripsi, video atau gambar',
    label: 'Masalah dengan judul, deskripsi, video atau gambar',
  },
  {
    value: 'Menampilkan hal yang bertentangan dengan Panduan Komunitas',
    label: 'Menampilkan hal yang bertentangan dengan Panduan Komunitas',
  },
  {
    value: 'Lainnya',
    label: 'Lainnya',
  },
];

export default function ModalChangeStatus({ showModal, onClose, onConfirm, type, loading }) {
  const [showTextArea, setShowTextArea] = useState(false);
  const [reason, setReason] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: type === 'approve' ? 420 : 520,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: type === 'approve' ? 4 : 3,
    borderRadius: '4px',
  };

  useEffect(() => {
    setReason('');
    setShowTextArea(false);
  }, [showModal]);

  const onChangeHandler = (e) => {
    if (e.target.value === 'Lainnya') {
      setShowTextArea(true);
      setReason('');
    } else {
      setReason(e.target.value);
      setShowTextArea(false);
    }
  };

  return (
    <Modal open={showModal}>
      <Box sx={style}>
        {type === 'approve' ? (
          <Stack direction="column" alignItems="center" gap={1}>
            <img src="/images/119-Boost-Your-Business 1.png" style={{ width: 200, height: 200 }} />
            <Typography style={{ fontSize: 14 }}>Apakah Anda Yakin Menyetujui Penjadwalan Iklan Ini?</Typography>
          </Stack>
        ) : (
          <Stack direction="column">
            <Typography style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 24 }}>
              Mengapa Anda Menolak Penayangan Iklan Ini?
            </Typography>

            <Typography style={{ marginBottom: 12 }}>Berikan alasan penolakan</Typography>

            <FormControl>
              <RadioGroup>
                {dummyData.map((el, key) => (
                  <RadioItem key={key} label={el.label} onChange={onChangeHandler} value={el.value} />
                ))}
              </RadioGroup>
              {showTextArea && (
                <TextField
                  multiline
                  rows={[4]}
                  color="secondary"
                  placeholder="Tulis Penjelasan"
                  onChange={(e) => setReason(e.target.value)}
                  style={{ marginTop: 6 }}
                />
              )}
            </FormControl>
          </Stack>
        )}

        <Stack direction="row" width="100%" mt={5} gap={2} justifyContent="center">
          <Button onClick={onClose} disabled={loading}>
            <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Batal</Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              onConfirm({
                status: type === 'approve' ? 'ACTIVE' : 'IN_ACTIVE',
                reason: type !== 'approve' && reason,
              })
            }
            disabled={loading || (type === 'decline' && !reason)}>
            <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
              {type === 'approve' ? 'Setuju' : 'Konfirmasi'}
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
