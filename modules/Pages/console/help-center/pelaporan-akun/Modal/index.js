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
          {type === 'ditangguhkan' ? (
            <div>
              <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>Kamu Akan Menangguhkan Akun Ini?</Typography>
                <Typography variant="body2" color="rgba(0, 0, 0, 0.6)">
                  Penangguhan akun akan berlangsung selama 60 hari yang pulih secara otomatis atau jika ada laporan & butuh
                  peninjauan lebih lanjut.
                </Typography>
                <Divider />
              </Stack>

              <FormControl>
                <RadioGroup aria-aria-labelledby="demo-radio-buttons-group-label">
                  <FormControlLabel
                    value={'1'}
                    control={<Radio size="small" />}
                    label={
                      <Typography color="#666666" variant="body2">
                        Melanggar EULA
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={'1'}
                    control={<Radio size="small" />}
                    label={
                      <Typography color="#666666" variant="body2">
                        Berisikan konten dewasa
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={'1'}
                    control={<Radio size="small" />}
                    label={
                      <Typography color="#666666" variant="body2">
                        Mempromosikan kekerasan ekstrim dan terorisme
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={'1'}
                    control={<Radio size="small" />}
                    label={
                      <Typography color="#666666" variant="body2">
                        Memposting pelecehan dan ancaman
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={'1'}
                    control={<Radio size="small" />}
                    label={
                      <Typography color="#666666" variant="body2">
                        Memposting ujaran kebencian atau perilaku berbahaya
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={'1'}
                    control={<Radio size="small" />}
                    label={
                      <Typography color="#666666" variant="body2">
                        Dibawah 17 tahun
                      </Typography>
                    }
                  />
                  <FormControlLabel
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
            </div>
          ) : (
            <div>
              <Stack spacing={1}>
                <Typography fontWeight={'bold'}>Kamu Tidak Menangguhkan Akun Ini</Typography>
                <Typography variant="body2" color="#666666">
                  Kamu tidak menemukan kesalahan atas laporan yang masuk
                </Typography>
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
