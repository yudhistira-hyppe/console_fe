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

const ModalCreateVoucher = ({ showModal, onConfirm, onCancel }) => {
  return (
    <>
      <Modal open={showModal}>
        <Box sx={style}>
          <div>
            <Stack direction="row" justifyContent="center">
              <img src="/images/create_voucher.png" alt="switch_off_voucher.png" />
            </Stack>
            <center>
              <Typography color="#666666">Kamu Akan Membuat Voucher Ini</Typography>
            </center>
          </div>
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

export default ModalCreateVoucher;
