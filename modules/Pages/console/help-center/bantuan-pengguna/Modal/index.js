import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Chip, Divider, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
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

export default function ModalChangeStatus({ showModal, onClose, onConfirm, done, children1, children2 }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {!done ? (
            <center>
              <Typography variant="h5" fontWeight="bold">
                Status Masalah
              </Typography>

              <Typography color="#666666">
                Kamu akan mengubah status masalah dari {children1} menjadi {children2}
              </Typography>
            </center>
          ) : (
            <div>
              <img src="/images/success.png" alt="success.png" />
              <center>
                <Typography variant="h5" fontWeight="bold">
                  Masalah Telah Selesai
                </Typography>
                <Typography color="#666666" mt={1}>
                  Kamu telah menyelesaikan masalah ini
                </Typography>
              </center>
            </div>
          )}
          <Stack direction={'row'} mt={5} justifyContent={'space-evenly'}>
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
