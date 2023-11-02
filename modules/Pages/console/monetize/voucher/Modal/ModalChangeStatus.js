import { Box, Button, Modal } from '@material-ui/core';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  paddingTop: 0,
  borderRadius: '4px',
};

const ModalChangeStatusConfirmation = ({ showModal, modalType, onConfirm, onCancel }) => {
  return (
    <>
      <Modal open={showModal}>
        <Box sx={style}>
          {modalType === 'on' ? (
            <div>
              <Stack direction="row" justifyContent="center">
                <img src="/images/switch_on_voucher.png" alt="switch_off_voucher.png" />
              </Stack>
              <center>
                <Typography color="#666666">Kamu Akan Mengaktifkan Voucher Ini</Typography>
              </center>
            </div>
          ) : modalType === 'off' ? (
            <div>
              <img src="/images/switch_off_voucher.png" alt="switch_off_voucher.png" />
              <center>
                <Typography color="#666666">Kamu Akan Membuat Voucher ini Tidak Aktif</Typography>
              </center>
            </div>
          ) : null}
          <Stack direction="row" justifyContent="center" spacing={5} my={3}>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Konfirmasi
            </Button>
            <Button onClick={onCancel}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ModalChangeStatusConfirmation;
