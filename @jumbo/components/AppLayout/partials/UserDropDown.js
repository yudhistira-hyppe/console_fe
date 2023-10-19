import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Box } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from '../../../../authentication';
import { useRouter } from 'next/router';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { Chip, Stack, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useGetProfileByUserEmail2Mutation } from 'api/console/getUserHyppe';

const useStyles = makeStyles((theme) => ({
  profileRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingLeft: 10,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 20,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      zIndex: 1,
      height: '50%',
      width: 1,
      backgroundColor: alpha(theme.palette.common.dark, 0.15),
    },
  },
  chipRole: {
    color: '#FF8C00D9 !important',
    backgroundColor: '#FF8C0026 !important',
    fontSize: '12px !important',
    fontFamily: 'Lato !important',
    fontWeight: 'bold',
    height: '28px !important',
    width: 'fit-content !important',
  },
}));

const actionsList = [
  {
    icon: <PersonIcon />,
    label: 'Account',
  },
  {
    icon: <ExitToAppIcon />,
    label: 'Logout',
  },
];

const UserDropDown = () => {
  const classes = useStyles();
  const { authUser, userSignOut } = useAuth();
  const router = useRouter();
  const [profileUser] = useGetProfileByUserEmail2Mutation();
  const [group, setGroup] = useState({});

  useEffect(() => {
    if (!authUser?.user?.group) {
      profileUser(authUser?.user?.email).then((res) => {
        setGroup(res?.data?.data?.[0]);
      });
    }
  }, []);

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser?.token}&x-auth-user=${authUser?.user?.email}`;
    const mediaURI = authUser?.user?.avatar?.mediaEndpoint;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  const onItemClick = (item) => {
    if (item.label === 'Logout') {
      toast.loading('loading...', { id: 'signout' });
      userSignOut({
        email: authUser.user.email,
        deviceId: authUser.user.deviceId,
      });
    }
    if (item.label === 'Account') {
      router.push('/profile-console');
    }
  };

  return (
    <Box className={clsx(classes.profileRoot, 'Cmt-profile-pic')}>
      <Stack direction="row" alignItems="center">
        <Chip label={group?.group || '-'} className={classes.chipRole} />
      </Stack>
      <CmtDropdownMenu
        onItemClick={onItemClick}
        TriggerComponent={<CmtAvatar size="small" src={getMediaUri()} />}
        items={actionsList}
      />
    </Box>
  );
};

export default UserDropDown;
