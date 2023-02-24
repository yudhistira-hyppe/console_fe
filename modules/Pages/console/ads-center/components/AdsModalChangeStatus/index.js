import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, TextareaAutosize } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

const RadioItem = ({ onChange, label, value }) => (
  <FormControlLabel
    value={value}
    control={<Radio size="small" color="secondary" />}
    onChange={onChange}
    label={
      <Typography color="#666666" variant="body2">
        {label}
      </Typography>
    }
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

export default function AdsModalChangeStatus({ showModal, onClose, onConfirm, type, loading }) {
  const [showTextArea, setShowTextArea] = React.useState(false);
  const onChangeHandler = (val) => {
    if (val.target.value === 'Lainnya') {
      setShowTextArea(true);
    } else {
      setShowTextArea(false);
    }
    console.log(val.target.value);
  };
  return (
    <Modal open={showModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        {type === 'Dijadwalkan' ? (
          <center>
            <img src="/images/119-Boost-Your-Business 1.png" />
            <Typography variant="body" fontFamily="lato">
              Kamu Menyetujui Penjadwalan iklan ini
            </Typography>
          </center>
        ) : (
          <div>
            <Stack direction={'column'} spacing={2}>
              <Typography fontWeight={'bold'}>Kamu akan menolak Penayangan Iklan ini</Typography>
              <Typography variant="body2" color="rgba(0, 0, 0, 0.6)">
                Berikan alasan penolakan
              </Typography>
            </Stack>

            <FormControl>
              <RadioGroup aria-aria-labelledby="demo-radio-buttons-group-label">
                {dummyData.map((el, key) => (
                  <RadioItem key={key} label={el.label} onChange={onChangeHandler} value={el.value} />
                ))}
              </RadioGroup>
              {showTextArea && (
                <Card style={{ marginTop: '0.5em' }}>
                  <TextareaAutosize minRows={10} style={{ width: '100%', border: 'none' }} />
                </Card>
              )}
            </FormControl>
          </div>
        )}

        <Stack direction={'row'} mt={5} justifyContent={'space-evenly'}>
          <Button variant="contained" color="primary" onClick={onConfirm} disabled={loading}>
            Konfirmasi
          </Button>
          <Button onClick={onClose} disabled={loading}>
            Batal
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
