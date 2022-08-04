import React, { useEffect } from 'react';
import CmtMediaObject from '@coremat/CmtMediaObject';
import Box from '@material-ui/core/Box';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtAvatar from '@coremat/CmtAvatar';
// import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { Fab, Typography } from '@material-ui/core';
import { useUserGetNewCommentQuery, useUserUpdateCommentMutation } from 'api/user/comment';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  itemRoot: {
    padding: '8px 24px',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.161741)',
    transition: 'all .2s',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.dark, 0.2)}`,
      '& $actionButtons': {
        visibility: 'visible',
        opacity: 1,
      },
    },

    '& .Cmt-media-image': {
      marginTop: 0,
    },
  },
  subTitleRoot: {
    fontSize: 14,
    color: theme.palette.text.disabled,
    marginTop: 4,
  },
  avatarRoot: {
    marginRight: 16,
    [theme.breakpoints.up('lg')]: {
      width: 56,
      height: 56,
    },
  },
  actionButtons: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
    visibility: 'hidden',
    opacity: 0,
    transition: 'all 0.2s',
    '& .btn-white': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },

    '& .MuiFab-root:not(:last-child)': {
      marginRight: 12,
    },
  },
}));

const CommentItem = ({ item }) => {
  const { authUser } = useAuth();

  const classes = useStyles();

  const formatDate = (date) => {
    const format = moment(date?.createdAt).lang('id').format('dddd, D/M/YYYY k:mm');

    return `${format} WIB`;
  };

  const getTitle = () => {
    return (
      <Box color="text.primary">
        {/* <Box component="span" color="primary.main"> */}
        <Box component="div">
          <Typography component="span" variant="h6">
            Viral Bentrok Antar Gank
          </Typography>
        </Box>
        <Box component="div" fontSize={13} mt={1}>
          <Typography component="span" variant="h7">
            Alasan : Kekerasan tidak baik buat hati dan jiwa
          </Typography>
        </Box>
      </Box>
    );
  };

  const getFooter = () => (
    <Box position="relative" mt={1}>
      <Box fontSize={12} color="text.disabled">
        {formatDate(item)}
      </Box>
    </Box>
  );

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const mediaURI = item.avatar.mediaEndpoint;
    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  return (
    <Box className={classes.itemRoot}>
      <CmtMediaObject
        // avatar={<CmtAvatar className={classes.avatarRoot} src={item.user.profile_pic} />}
        avatar={
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundImage: `url('https://i.pinimg.com/originals/cd/a3/59/cda3593f7219542f829150747906a144.jpg')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: '5px',
            }}></div>
        }
        title={getTitle()}
        // subTitle={item.comment}
        subTitle={getFooter()}
        subTitleProps={{
          className: classes.subTitleRoot,
          component: 'div',
          variant: 'inherit',
          gutterBottom: false,
        }}
        // footerComponent={getFooter()}
      />
    </Box>
  );
};
export default CommentItem;
