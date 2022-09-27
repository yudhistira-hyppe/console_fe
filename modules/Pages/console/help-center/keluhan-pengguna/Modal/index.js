import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';

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

export default function ModalConfirmation({ showModal, onClose, onConfirm, type }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {type === 'approve' ? (
            <div>
              <Typography fontWeight={'bold'}>Kamu Akan Menyetujui Peningkatan Akun</Typography>
              <Typography variant="body2">
                Dengan menyetujui kamu yakin akan semua data yang dimasukan sudah benar.
              </Typography>
            </div>
          ) : (
            <div>
              <Typography fontWeight={'bold'}>Kamu Akan Menolak Peningkatan Akun</Typography>
              <Divider />

              <Stack mt={1}>
                <Typography variant="body2" color="#666666">
                  Berikan alasan penangguhan
                </Typography>
                <FormControl>
                  <RadioGroup aria-aria-labelledby="demo-radio-buttons-group-label">
                    <FormControlLabel
                      style={{ marginTop: '0.5em' }}
                      value={'1'}
                      control={<Radio size="small" />}
                      label={
                        <Typography color="#666666" variant="body2">
                          Nomor KTP/ID berbeda dengan nomor yang ada di dokumen pendukung
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      style={{ marginTop: '0.5em' }}
                      value={'1'}
                      control={<Radio size="small" />}
                      label={
                        <Typography color="#666666" variant="body2">
                          Foto KTP/ID berbeda dengan foto selfie (ada perubahan warna rambut/mata, bentuk wajah, dll)
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      style={{ marginTop: '0.5em' }}
                      value={'1'}
                      control={<Radio size="small" />}
                      label={
                        <Typography color="#666666" variant="body2">
                          Dokumen terlalu buram sulit diidentifikasi
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      style={{ marginTop: '0.5em' }}
                      value={'1'}
                      control={<Radio size="small" />}
                      label={
                        <Typography color="#666666" variant="body2">
                          Foto KTP/ID tampak buram sulit diidentifikasi dengan foto selfie
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      style={{ marginTop: '0.5em' }}
                      value={'1'}
                      control={<Radio size="small" />}
                      label={
                        <Typography color="#666666" variant="body2">
                          Lainnya
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </div>
          )}

          <Stack direction={'row'} mt={3} justifyContent={'center'} spacing={3}>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Konfirmasi
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
