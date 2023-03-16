import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { InputAdornment, Stack, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
};

export default function ModalCreate({ showModal, onClose, onConfirm }) {
  const [category, setCategory] = useState('');

  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" gap="8px" width="100%">
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Tambah Kategori Stiker</Typography>
            <TextField
              placeholder="Masukan nama kategori"
              inputProps={{ maxLength: 20 }}
              color="secondary"
              onChange={(e) => setCategory(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="start">{category.length} / 20</InputAdornment>,
              }}
            />
          </Stack>

          <Stack direction={'row'} mt={4} justifyContent={'center'} spacing={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => console.log(category)}
              disabled={category.length < 3 || category.includes('  ')}>
              Buat
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
