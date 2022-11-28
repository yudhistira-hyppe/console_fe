import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Divider } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chip, Stack, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 335,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

export default function ModalStatus({ showModal, onClose, onConfirm }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center" textAlign="center" spacing={1}>
            <Typography variant="h5" fontFamily="Lato" fontWeight={'bold'}>
              Status Masalah
            </Typography>
            <Typography variant="body2" color="#666666">
              Kamu akan mengubah status masalah dari{' '}
              <Chip
                label="Baru"
                style={{
                  backgroundColor: '#E6094B1A',
                  color: '#E6094BD9',
                  fontWeight: 'bold',
                  fontFamily: 'Normal',
                  width: 'fit-content',
                  padding: '0 4px',
                  height: 30,
                }}
              />{' '}
              menjadi{' '}
              <Chip
                label="Dalam Proses"
                style={{
                  backgroundColor: '#FFEED9',
                  color: '#FF9B21',
                  fontWeight: 'bold',
                  fontFamily: 'Normal',
                  width: 'fit-content',
                  padding: '0 4px',
                  height: 30,
                }}
              />
            </Typography>
          </Stack>

          <Stack direction={'row'} mt={4} justifyContent={'center'} spacing={3}>
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
