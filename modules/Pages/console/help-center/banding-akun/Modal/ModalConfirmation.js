import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { useGetReportReasonQuery } from 'api/console/helpCenter/konten';

export default function ModalConfirmation({ showModal, type, onClose, onConfirm }) {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const { data: reportReason } = useGetReportReasonQuery({ type: 'content' });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: type === 'ditangguhkan' ? 500 : 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '4px',
  };

  useEffect(() => {
    setReason('');
    setOtherReason('');
  }, [showModal]);

  const onChangeHandler = (e) => {
    setReason(e.target.value);
    JSON.parse(e.target.value)?.reason !== 'Lainnya' && setOtherReason('');
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
            <>
              <Typography fontWeight={'bold'}>Kamu Yakin Akan Menangguhkan Konten Ini?</Typography>
              <Typography variant="body2" color="#666666" style={{ margin: '18px 0 4px' }}>
                Berikan alasan
              </Typography>

              <FormControl style={{ width: '100%' }}>
                <RadioGroup value={reason}>
                  {reportReason?.data?.map((item, key) => (
                    <FormControlLabel
                      key={key}
                      value={JSON.stringify({ _id: item?._id, reason: item?.reason })}
                      control={<Radio size="small" color="primary" />}
                      onChange={onChangeHandler}
                      label={
                        <Typography color="#666666" variant="body2">
                          {item?.reason}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
                {reason !== '' && JSON.parse(reason)?.reason === 'Lainnya' && (
                  <TextField
                    multiline
                    minRows={5}
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Tulis penjelasan"
                  />
                )}
              </FormControl>
            </>
          ) : (
            <Stack direction="column" alignItems="center" textAlign="center" spacing={1}>
              {type === 'tidak ditangguhkan' && <img src="/images/success.png" style={{ marginTop: -20 }} />}
              {type === 'sensitif' && <img src="/images/disable.png" style={{ marginTop: -20 }} />}

              <Typography fontWeight={'bold'}>
                {type === 'tidak ditangguhkan' && 'Konten User Dipulihkan'}
                {type === 'sensitif' && 'Konten Tetap Sensitif'}
              </Typography>
              <Typography variant="body2" color="#666666">
                {type === 'tidak ditangguhkan' && 'Kamu memilih untuk memulihkan konten'}
                {type === 'sensitif' && 'Kamu memilih konten user tetap sensitif'}
              </Typography>
            </Stack>
          )}

          <Stack direction={'row'} mt={4} justifyContent={'center'} spacing={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                type === 'ditangguhkan' ? onConfirm({ ...JSON.parse(reason), otherReason: otherReason }) : onConfirm()
              }
              disabled={
                type !== 'ditangguhkan'
                  ? false
                  : reason === '' || (JSON.parse(reason)?.reason === 'Lainnya' && otherReason === '')
              }>
              Konfirmasi
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
