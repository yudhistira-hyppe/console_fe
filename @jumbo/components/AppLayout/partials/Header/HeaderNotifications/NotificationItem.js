import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MessageIcon from '@material-ui/icons/Message';
import ShareIcon from '@material-ui/icons/Share';
import EmailIcon from '@material-ui/icons/Email';
import CakeIcon from '@material-ui/icons/Cake';
import CmtMediaObject from '../../../../../../@coremat/CmtMediaObject';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';
import { getDateElements } from '../../../../../utils/dateHelper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { alpha } from '@material-ui/core/styles';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';

// NOTED : DONT REMOVE THE CODE BELOW IT MAYBE USE AT THE FUTURE
const useStyles = makeStyles((theme) => ({
  feedItemRoot: {
    padding: '10px 0',
    position: 'relative',
    borderBottom: `1px solid ${alpha(theme.palette.common.dark, 0.035)}`,
    '& .Cmt-media-object': {
      alignItems: 'center',
    },
    '& .Cmt-media-image': {
      alignSelf: 'flex-start',
      width: 56,
    },
    '& .Cmt-media-body': {
      width: 'calc(100% - 56px)',
      flex: 'inherit',
    },
  },
  titleRoot: {
    letterSpacing: 0.25,
    marginBottom: 6,
    cursor: 'pointer',
  },
}));

// const icons = {
//   COMMENT: <MessageIcon style={{ color: '#836AFF' }} />,
//   FOLLOWER: <ShareIcon style={{ color: '#0795F4' }} />,
//   FOLLOWING: <EmailIcon style={{ color: '#00C4B4' }} />,
//   REACTION: <CakeIcon style={{ color: '#EF933C' }} />,
// };

const getComment = (item, classes) => (
  <Typography component="div" variant="h5" className={classes.titleRoot}>
    <Box component="span" color="primary.main">
      {/* {item.user.name} */}
      {item?.title}
    </Box>
    <Box component="span" ml={1}>
      has recently comment
    </Box>
    <Box component="span" ml={1}>
      {/* {item.metaData.post.type} */}
      {item?.eventType}
    </Box>
  </Typography>
);
// NOTED : DONT REMOVE THE CODE BELOW IT MAYBE USE AT THE FUTURE

const getFollowing = (item, classes) => (
  <Typography component="div" variant="h5" className={classes.titleRoot}>
    <Box component="span" color="primary.main">
      {item?.senderOrReceiverInfo?.fullName}
    </Box>
    <Box component="span" ml={1}>
      mengikuti anda
    </Box>
    {/* <Box component="span" ml={1} color="primary.main">
      taslim halim
    </Box>
    <Box component="span" ml={1}>
      post.
    </Box> */}
  </Typography>
);

const getLike = (item, classes) => (
  <Typography component="div" variant="h5" className={classes.titleRoot}>
    <Box component="span" color="primary.main">
      {item?.title}
    </Box>
    <Box component="span" ml={1}>
      {item?.body || item?.bodyId}
    </Box>
  </Typography>
);

const getFollower = (item, classes) => (
  <Typography component="div" variant="h5" className={classes.titleRoot}>
    <Box component="span" color="primary.main">
      {item.title}
    </Box>
    {/* <Box component="span" ml={1}>
      telah mengikuti kamu
    </Box> */}
    <Box component="span" ml={1}>
      meminta untuk mengikuti anda
    </Box>
  </Typography>
);

// NOTED : DONT REMOVE THE CODE BELOW IT MAYBE USE AT THE FUTURE

const NotificationItem = ({ item }) => {
  const { authUser } = useAuth();
  console.log('item notifs:', item);
  const classes = useStyles();

  const getTitle = (item, classes) => {
    switch (item.eventType) {
      case 'COMMENT':
        // return <div>comment</div>;
        return getComment(item, classes);
      case 'FOLLOWING':
        // return <div>FOLLOWING</div>;
        return getFollowing(item, classes);
      case 'FOLLOWER':
        // return <div>FOLLOWER</div>;
        return getFollower(item, classes);
      case 'LIKE':
        return getLike(item, classes);
      default:
        return '';
    }
  };

  const getSubTitle = (item, classes) => (
    // <Box display="flex" alignItems="flex-end" border="1px solid black" fontSize={12} color="text.disabled">
    <Box textAlign="right" fontSize={12} color="text.disabled">
      {/* <Box fontSize={16}>{item?.bodyId}</Box> */}
      <Box ml={2}>{getDateElements(item?.createdAt).time}</Box>
    </Box>
  );

  // NOTED : DONT REMOVE THE CODE BELOW IT MAYBE USE AT THE FUTURE
  const getMediaUri = (path) => {
    console.log('path:', path);
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const mediaURI = path;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  return (
    <Box className={classes.feedItemRoot}>
      <CmtMediaObject
        avatarPos="center"
        avatar={<CmtAvatar size={40} src={getMediaUri(item?.senderOrReceiverInfo?.avatar?.mediaEndpoint)} alt={'icon'} />}
        title={getTitle(item, classes)}
        subTitle={getSubTitle(item, classes)}
      />
    </Box>
  );
};

export default NotificationItem;
