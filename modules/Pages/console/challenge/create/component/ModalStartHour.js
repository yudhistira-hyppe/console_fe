import { Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Box, Button, IconButton, Modal, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: '6px',
};

const ModalStartHour = ({ showModal, onClose, onSubmit, selectedItem }) => {
  const [startTime, setStartTime] = useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  });

  useEffect(() => {
    setStartTime({
      hour: selectedItem?.isValid() ? selectedItem?.format('HH') : new Date().getHours(),
      minute: selectedItem?.isValid() ? selectedItem?.format('mm') : new Date().getMinutes(),
    });
  }, [showModal]);

  useEffect(() => {
    if (startTime.hour >= 24) {
      setStartTime({
        hour: 23,
        minute: 59,
      });
    }
    if (startTime.minute >= 60) {
      setStartTime({ ...startTime, minute: 59 });
    }
  }, [startTime]);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" alignItems="center" gap={3}>
            <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
              <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Tentukan Jam Mulai</Typography>
              <IconButton onClick={onClose}>
                <Close style={{ fontSize: 16 }} />
              </IconButton>
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <TextField
                placeholder="00"
                color="secondary"
                size="small"
                value={startTime.hour >= 0 ? (startTime.hour >= 10 ? startTime.hour : `0${startTime.hour}`) : ''}
                onChange={(e) => setStartTime({ ...startTime, hour: Number(e.target.value) })}
                inputProps={{
                  onKeyPress: (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  },
                  max: 23,
                  maxLength: Number(startTime.hour) >= 10 ? 2 : 3,
                }}
                sx={{ '& input': { height: 70, fontSize: 64, backgroundColor: '#21212114' } }}
                style={{ width: 100 }}
                error={startTime.hour >= 24 || startTime.minute >= 60 || startTime.hour < 0 || startTime.minute < 0}
              />
              <Typography style={{ fontSize: 72, lineHeight: 1, marginBottom: 20 }}>:</Typography>
              <TextField
                placeholder="00"
                color="secondary"
                size="small"
                value={startTime.minute >= 0 ? (startTime.minute >= 10 ? startTime.minute : `0${startTime.minute}`) : ''}
                onChange={(e) => setStartTime({ ...startTime, minute: Number(e.target.value) })}
                inputProps={{
                  onKeyPress: (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  },
                  max: 59,
                  maxLength: Number(startTime.minute) >= 10 ? 2 : 3,
                }}
                sx={{ '& input': { height: 70, fontSize: 64, backgroundColor: '#21212114' } }}
                style={{ width: 100 }}
                error={startTime.hour >= 24 || startTime.minute >= 60 || startTime.hour < 0 || startTime.minute < 0}
              />
            </Stack>

            <Stack direction="row" justifyContent="flex-end" gap={2} width="100%">
              <Button variant="text" color="secondary" onClick={onClose}>
                <Typography>Batal</Typography>
              </Button>
              <Button
                variant="text"
                color="secondary"
                onClick={() => onSubmit(startTime)}
                disabled={startTime.hour >= 24 || startTime.minute >= 60 || startTime.hour < 0 || startTime.minute < 0}>
                <Typography>Oke</Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalStartHour;
