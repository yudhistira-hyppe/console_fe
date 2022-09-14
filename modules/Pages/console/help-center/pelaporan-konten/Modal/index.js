import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from '@material-ui/core';
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
  const [showTextArea, setShowTextArea] = React.useState(false);
  const onChangeHandler = (val) => {
    if (val.target.value === 'lainnya') {
      setShowTextArea(true);
    } else {
      setShowTextArea(false);
    }
    console.log(val.target.value);
  };

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
                <Typography fontWeight={'bold'}>Kamu Akan Menangguhkan Konten Ini?</Typography>
                <Typography variant="body2" color="rgba(0, 0, 0, 0.6)">
                  Berikan alasan
                </Typography>
              </Stack>

              <FormControl>
                <RadioGroup aria-aria-labelledby="demo-radio-buttons-group-label">
                  <FormControlLabel
                    value={'Menyesatkan atau scam'}
                    control={<Radio size="small" />}
                    onChange={onChangeHandler}
                    label={
                      <Typography color="#666666" variant="body2">
                        Menyesatkan atau scam
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={'Konten yang melanggar, berbahaya, atau mengandung kekerasan'}
                    control={<Radio size="small" />}
                    onChange={onChangeHandler}
                    label={
                      <Typography color="#666666" variant="body2">
                        Konten yang melanggar, berbahaya, atau mengandung kekerasan
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={'Konten seksual yang tidak pantas'}
                    control={<Radio size="small" />}
                    onChange={onChangeHandler}
                    label={
                      <Typography color="#666666" variant="body2">
                        Konten seksual yang tidak pantas
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={'Dukungan ilegal atau yang tidak semestinya'}
                    control={<Radio size="small" />}
                    onChange={onChangeHandler}
                    label={
                      <Typography color="#666666" variant="body2">
                        Dukungan ilegal atau yang tidak semestinya
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value={'lainnya'}
                    onChange={onChangeHandler}
                    control={<Radio size="small" />}
                    label={
                      <Typography color="#666666" variant="body2">
                        Lainnya
                      </Typography>
                    }
                  />
                </RadioGroup>
                {showTextArea && (
                  <Card style={{ marginTop: '0.5em' }}>
                    <TextareaAutosize minRows={10} style={{ width: '100%', border: 'none' }} />
                  </Card>
                )}
              </FormControl>
            </div>
          ) : (
            <div>
              <Stack spacing={1}>
                <Typography fontWeight={'bold'}>Kamu Tidak Menangguhkan Konten Ini</Typography>
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
