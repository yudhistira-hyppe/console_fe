import GridContainer from '@jumbo/components/GridContainer';
import { Box, Grid, Typography } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Contact from './Contact';
import About from './About';
import Header from './Header';
import { useAuth } from 'authentication';
import { useGetProfileByUserEmailQuery } from 'api/user/user';
import { useGetGroupQuery } from 'api/console/group';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Card, Stack } from '@mui/material';
import { STREAM_URL } from 'authentication/auth-provider/config';

const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
}));

const ProfileBasic = () => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const { data: dataProfile } = useGetProfileByUserEmailQuery(authUser.user.email);

  const getImage = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}/v4${endpoint[0]}${authToken}`;
  };

  return (
    <Card style={{ width: '65%', margin: '0 auto', padding: '24px 24px 44px' }}>
      <Stack direction="column" gap={3}>
        <Typography style={{ fontWeight: 'bold' }}>Profil</Typography>
        <Avatar
          src={getImage(dataProfile?.data[0]?.avatar?.mediaEndpoint)}
          alt="Profile Image User"
          style={{ width: 80, height: 80, objectFit: 'cover', objectPosition: 'center' }}
        />
        <Stack>
          <Typography style={{ fontSize: 12, color: '#666666' }}>Nama Lengkap</Typography>
          <Typography style={{ fontWeight: 'bold', color: '#00000099' }}>{dataProfile?.data[0]?.fullName || '-'}</Typography>
        </Stack>
        <Stack>
          <Typography style={{ fontSize: 12, color: '#666666' }}>Jabatan</Typography>
          <Typography style={{ fontWeight: 'bold', color: '#00000099' }}>{dataProfile?.data[0]?.group || '-'}</Typography>
        </Stack>
        <Stack>
          <Typography style={{ fontSize: 12, color: '#666666' }}>Divisi</Typography>
          <Typography style={{ fontWeight: 'bold', color: '#00000099' }}>{dataProfile?.data[0]?.divisi || '-'}</Typography>
        </Stack>
        <Stack>
          <Typography style={{ fontSize: 12, color: '#666666' }}>Email</Typography>
          <Typography style={{ fontWeight: 'bold', color: '#00000099' }}>{dataProfile?.data[0]?.email || '-'}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileBasic;
