import React from 'react';
import CmtMediaObject from '@coremat/CmtMediaObject';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  itemRoot: {
    padding: '12px 24px',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.161741)',
    transition: 'all .2s',
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
  textTruncate: {
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
  },
}));

const CommentItem = ({ item }) => {
  const classes = useStyles();
  const { authUser } = useAuth();

  const now = moment().utc();

  const formatDate = (date) => {
    return (
      <Box fontSize={12} color="#00000061" mt={2} className={classes.textTruncate}>
        {now.diff(moment(date?.createdAtReportLast).utc(), 'hours') < 12
          ? 'Hari ini'
          : now.diff(moment(date?.createdAtReportLast).utc(), 'hours') < 24
          ? 'Kemarin'
          : `${now.diff(moment(date?.createdAtReportLast).utc(), 'days')} hari lalu`}
        , {moment(item?.createdAtReportLast).utc().format('DD/MM/YYYY - HH:mm')} WIB
      </Box>
    );
  };

  const getTitle = () => {
    return (
      <Box color="text.primary">
        <Box component="div">
          <Typography component="span" variant="h6" className={classes.textTruncate} style={{ height: 50 }}>
            {item?.description || '-'}
          </Typography>
        </Box>
        <Box component="div" fontSize={13} mt={1}>
          <Typography
            component="div"
            variant="h7"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 200 }}
            title={item?.reasonLast}>
            Alasan : {item?.reasonLast || '-'}
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

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getImage = (item) => {
    if (item?.apsara || item?.apsaraId) {
      if (item?.media?.ImageInfo?.length >= 1) {
        return item?.media?.ImageInfo?.[0]?.URL;
      } else if (item?.media?.VideoList?.length >= 1) {
        return item?.media?.VideoList?.[0]?.CoverURL;
      } else {
        return '/images/dashboard/content_image.png';
      }
    } else if (item?.mediaEndpoint) {
      return getMediaUri(item?.mediaEndpoint);
    } else {
      return '/images/dashboard/content_image.png';
    }
  };

  return (
    <Box className={classes.itemRoot}>
      <CmtMediaObject
        avatar={
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundImage: `url('${getImage(item)}')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: '5px',
            }}></div>
        }
        title={getTitle()}
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
