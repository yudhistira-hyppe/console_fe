import * as React from 'react';
import { Avatar, Card } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '4px',
  paddingBottom: '2em',
};

export default function ViewModal({ showModal, onClose, userReports }) {
  const { authUser } = useAuth();

  const getMediaUri = (mediaUri) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}/profilepict/${mediaUri}${authToken}`;
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus>
        <Card style={style}>
          <Stack direction={'row'} justifyContent={'space-between'} padding={3}>
            <div>
              <Typography fontSize={'large'} fontWeight={'bold'}>
                Yang Melaporkan
              </Typography>
            </div>
            <Stack direction={'row'} alignItems="center" spacing={2}>
              <Typography fontSize={'large'} fontWeight={'bold'}>
                Total Laporan: {userReports?.totalReport}
              </Typography>
              <CloseIcon htmlColor="#666666" fontSize="small" onClick={onClose} style={{ cursor: 'pointer' }} />
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
              <Grid item xs={5}>
                <Typography fontWeight={'bold'}>Pengguna</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontWeight={'bold'}>Tanggal Pelaporan</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={'bold'}>Alasan Pelaporan</Typography>
              </Grid>
            </Grid>

            {userReports?.data?.length > 0 &&
              userReports?.data.map((item, i) => (
                <Grid
                  container
                  display={'flex'}
                  justifyContent={'center'}
                  width={'100%'}
                  borderTop={'solid rgba(33, 33, 33, 0.08) 1px'}
                  borderBottom={'solid rgba(33, 33, 33, 0.08) 1px'}
                  px={3}
                  py={1}
                  mt={0.2}
                  key={i}>
                  <Grid item xs={5}>
                    <Stack direction={'row'} alignItems="center" spacing={2}>
                      <Avatar src={getMediaUri(item?.avatar?.mediaUri)} />
                      <Stack>
                        <Typography style={{ fontSize: 14 }}>{item?.fullName || '-'}</Typography>
                        <Typography style={{ fontSize: 12, color: '#00000099' }}>{item?.email || '-'}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={3}>
                    <Stack direction={'column'} justifyContent={'center'} height={'100%'}>
                      <Typography>{moment(item?.createdAt)?.format('DD/MM/YY-HH:mm')} WIB</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction={'column'} justifyContent={'center'} height={'100%'}>
                      <Typography>{item?.description || '-'}</Typography>
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
