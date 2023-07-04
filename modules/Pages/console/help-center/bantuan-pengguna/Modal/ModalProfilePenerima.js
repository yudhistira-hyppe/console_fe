import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { Box, Button, Modal } from '@material-ui/core';
import { Avatar, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useGetProfileByUserEmailQuery } from 'api/console/database';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  py: 4,
  px: 8,
  borderRadius: '4px',
};

const ModalProfilePenerima = ({ showModal, email, onCancel }) => {
  const { data: profile, isLoading } = showModal ? useGetProfileByUserEmailQuery(email) : {};
  const { authUser } = useAuth();

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const mediaURI = profile?.data[0]?.avatar?.mediaEndpoint;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  return (
    <Modal open={showModal}>
      {isLoading ? (
        <PageLoader />
      ) : (
        <Box sx={style}>
          <Stack direction="row" justifyContent="center">
            <Avatar alt={profile?.data[0]?.fullName} src={getMediaUri()} sx={{ width: 250, height: 250 }} />
          </Stack>
          <Stack direction="column" spacing={1} my={3}>
            <Typography color="#666666">Nama Lengkap : {profile?.data[0]?.fullName}</Typography>
            <Typography color="#666666">Alamat Email&nbsp;&nbsp;&nbsp;&nbsp;: {profile?.data[0]?.email}</Typography>
            <Typography color="#666666">
              Jenis Kelamin&nbsp;&nbsp;&nbsp;:{' '}
              {profile?.data[0]?.gender === 'MALE'
                ? 'Laki - Laki'
                : profile?.data[0]?.gender === 'FEMALE'
                ? 'Perempuan'
                : 'Lainnya'}
            </Typography>
            <Typography color="#666666">
              Ketertarikan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
              {profile?.data[0]?.interest.map((item) => item.interestName)?.join(', ') || '-'}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}>
            <Stack direction="column" alignItems="center" width={150}>
              <Typography fontWeight="bold">POST</Typography>
              <Typography color="#666666">{profile?.data[0]?.insight?.posts}</Typography>
            </Stack>
            <Stack direction="column" alignItems="center" width={150}>
              <Typography fontWeight="bold">FOLLOWERS</Typography>
              <Typography color="#666666">{profile?.data[0]?.insight?.followers}</Typography>
            </Stack>
            <Stack direction="column" alignItems="center" width={150}>
              <Typography fontWeight="bold">FOLLOWING</Typography>
              <Typography color="#666666">{profile?.data[0]?.insight?.followings}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" mt={4}>
            <Button variant="contained" color="primary" onClick={onCancel}>
              Tutup
            </Button>
          </Stack>
        </Box>
      )}
    </Modal>
  );
};

export default ModalProfilePenerima;
