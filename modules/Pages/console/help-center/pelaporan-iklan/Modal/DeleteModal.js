import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, Divider, FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

export default function DeleteModal({ showModal, onClose, onConfirm, type }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div>
            <Stack spacing={1}>
              <Typography fontWeight={'bold'}>Kamu Yakin Akan Menghapus Kontent Iklan Ini?</Typography>
              <Divider />
              <Card style={{ marginTop: '1em' }}>
                <TextareaAutosize minRows={10} style={{ width: '100%', border: 'none', padding: '1em' }} />
              </Card>
            </Stack>
          </div>

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
