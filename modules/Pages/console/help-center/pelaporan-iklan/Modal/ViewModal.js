import * as React from 'react';
import { Avatar, Card } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '45vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '4px',
  paddingBottom: '2em',
};

export default function ViewModal({ showModal, onClose, data }) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Card style={style}>
          <Stack direction={'row'} justifyContent={'space-between'} padding={3}>
            <div>
              <Typography fontSize={'large'} fontWeight={'bold'}>
                Yang Melaporkan
              </Typography>
            </div>
            <Stack direction={'row'} spacing={2}>
              <Typography fontSize={'large'} fontWeight={'bold'}>
                Total Laporan: 20
              </Typography>
              <a onClick={onClose} style={{ cursor: 'pointer' }}>
                <CloseIcon htmlColor="#666666" fontSize="small" />
              </a>
              {/* <ToggleButton>x</ToggleButton> */}
            </Stack>
          </Stack>
          <div>
            <Grid
              container
              display={'flex'}
              justifyContent={'center'}
              width={'100%'}
              borderTop={'solid rgba(33, 33, 33, 0.08) 1px'}
              borderBottom={'solid rgba(33, 33, 33, 0.08) 1px'}
              px={3}
              py={1}>
              <Grid item xs={4}>
                <Typography fontWeight={'bold'}>Pengguna</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontWeight={'bold'}>Tanggal Pelaporan</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography fontWeight={'bold'}>Alasan Pelaporan</Typography>
              </Grid>
            </Grid>

            {data?.length > 0 &&
              data.map((el, i) => (
                // eslint-disable-next-line react/jsx-key
                <Grid
                  container
                  display={'flex'}
                  justifyContent={'center'}
                  width={'100%'}
                  borderTop={'solid rgba(33, 33, 33, 0.08) 1px'}
                  borderBottom={'solid rgba(33, 33, 33, 0.08) 1px'}
                  px={3}
                  py={1}
                  mt={0.2}>
                  <Grid item xs={4}>
                    <Stack direction={'row'} spacing={1}>
                      <Stack direction={'column'} justifyContent={'center'}>
                        <Avatar />
                      </Stack>
                      <Stack>
                        <Typography>{el.name}</Typography>
                        <Typography variant="body2">{el.email}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={3}>
                    <Stack direction={'column'} justifyContent={'center'} height={'100%'}>
                      <Typography>{el.tanggal_pelaporan}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={5}>
                    <Stack direction={'column'} justifyContent={'center'} height={'100%'}>
                      <Typography>{el.alasan}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
          </div>
        </Card>
      </Modal>
    </div>
  );
}
