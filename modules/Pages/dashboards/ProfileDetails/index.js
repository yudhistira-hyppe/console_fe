import React from 'react';
import CmtAdvCard from '../../../../@coremat/CmtAdvCard';
import CmtAdvCardContent from '../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtCardMedia from '../../../../@coremat/CmtCard/CmtCardMedia';
import CmtObjectSummary from '../../../../@coremat/CmtObjectSummary';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import CmtImage from '../../../../@coremat/CmtImage';
import UserInfo from './UserInfo';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CmtProgressBar from '../../../../@coremat/CmtProgressBar';
import { useAuth } from '../../../../authentication';
import { STREAM_URL } from '../../../../authentication/auth-provider/config';
import CmtCard from '../../../../@coremat/CmtCard';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const actions = [
  {
    label: 'View Profile',
  },
  {
    label: 'Send Message',
  },
  {
    label: 'Add to Favorite',
  },
];

const useStyles = makeStyles((theme) => ({
  actionMenu: {
    '& button': {
      backgroundColor: 'transparent',
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: 'transparent',
        color: theme.palette.common.white,
      },
    },
  },
  cardMediaRoot: {
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
      width: '100%',
      height: '100%',
    },
    '& .fab-button .MuiSvgIcon-root': {
      marginLeft: 4,
    },
  },
  cardMediaContent: {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    '& .Cmt-badge-avatar': {
      border: `solid 2px ${theme.palette.success.main}`,
      padding: 5,
      borderRadius: '50%',
    },
    '& .Cmt-badge': {
      padding: 0,
      backgroundColor: 'transparent',
      marginBottom: -36,
      marginLeft: -15,
    },
    '& .Cmt-user-info': {
      marginTop: 15,
      '& .Cmt-title': {
        fontSize: 16,
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  },
  avatarRoot: {
    border: `solid 2px ${theme.palette.common.white}`,
  },
  progBarView: {
    width: 200,
    marginTop: 25,
    '& .Cmt-label-container, & .Cmt-text-container': {
      color: alpha(theme.palette.common.white, 0.74),
      fontSize: 12,
    },
    '& .Cmt-text-container': {
      marginTop: -8,
    },
  },
  labelLink: {
    fontFamily: 'Lato',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.4px',
    color: '#AB22AF',
  },
}));

const ProfileDetails = () => {
  const router = useRouter();
  const { authUser, isLoadingUser } = useAuth();
  const classes = useStyles();
  const avatar = authUser.avatar
    ? STREAM_URL + authUser.avatar.mediaEndpoint + '?x-auth-token=' + authUser.token + '&x-auth-user=' + authUser.email
    : '';

  return (
    <CmtCard className={classes.cardMediaRoot} title="User">
      <Box className={clsx(classes.cardMediaContent, 'p-3')}>
        <div className="flex flex-row align-content-start w-full">
          <CmtImage src="/images/dashboard/badge.svg" alt="Badge" />
        </div>
        <CmtObjectSummary
          avatar={<CmtAvatar className={classes.avatarRoot} size={56} src={avatar} alt={authUser.email} />}
          title={authUser.fullName}
          badge={<div style={{ backgroundColor: '#21C0E8' }}></div>}
          titleProps={{ style: { color: 'black' } }}
          subTitle={authUser.institution ? authUser.institution : 'General Manager'}
          subTitleProps={{ style: { color: 'black' } }}
          avatarProps={{ variant: 'circle' }}
          align="vertical"
        />
        <Button variant="text" onClick={() => router.push('/profile-basic')} className="min-w-0 p-0 mt-2">
          <div className={classes.labelLink}>View Profile</div>
        </Button>
      </Box>
    </CmtCard>
  );
};

export default ProfileDetails;
