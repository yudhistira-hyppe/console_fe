import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { useGetReportReasonQuery } from 'api/console/helpCenter/konten';
import { LoadingButton } from '@mui/lab';

export default function ModalConfirmation({ showModal, onClose, onConfirm, type, loading }) {
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
    p: type === 'ditangguhkan' ? 4 : 2,
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
    <Modal
      open={showModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
      disableEnforceFocus>
      <Box sx={style}>
        {type === 'ditangguhkan' ? (
          <div>
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
          </div>
        ) : type === 'tidak ditangguhkan' ? (
          <Stack spacing={1} mb={5}>
            <Typography fontWeight={'bold'}>Kamu Tidak Menangguhkan Konten Ini</Typography>
            <Typography variant="body2" color="#666666">
              Kamu tidak menemukan kesalahan atas laporan yang masuk
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={1} mb={5}>
            <Typography fontWeight={'bold'}>Tandai konten sensitif</Typography>
            <Typography variant="body2" color="#666666">
              Kamu akan menandai konten ini sebagai konten sensitif
            </Typography>
          </Stack>
        )}

        <Stack direction={'row'} mt={3} mb={1} justifyContent={'center'} spacing={3}>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="secondary"
            onClick={() =>
              type === 'ditangguhkan' ? onConfirm({ ...JSON.parse(reason), otherReason: otherReason }) : onConfirm()
            }
            disabled={
              type !== 'ditangguhkan'
                ? false
                : reason === '' || (JSON.parse(reason)?.reason === 'Lainnya' && otherReason === '')
            }>
            Konfirmasi
          </LoadingButton>
          <Button onClick={onClose} disabled={loading}>
            Batal
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
