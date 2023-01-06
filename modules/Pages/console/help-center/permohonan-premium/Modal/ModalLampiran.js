import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { Close } from '@material-ui/icons';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 560,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: '28px 24px',
  borderRadius: '4px',
};

export default function ModalLampiran({ showModal, onClose, data }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus>
        <Box sx={style}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mb={3}>
            <Typography fontWeight={'bold'}>Lampiran {data?.id}</Typography>
            <Close onClick={onClose} style={{ cursor: 'pointer' }} />
          </Stack>
          <Stack alignItems="center" justifyContent="center">
            <img
              src={data?.src}
              srcSet={data?.src}
              alt="asd"
              loading="lazy"
              style={{ borderRadius: 8, width: '75%', height: 'auto', objectFit: 'cover', objectPosition: 'center' }}
            />
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
