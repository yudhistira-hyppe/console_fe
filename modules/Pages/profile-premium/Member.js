import CmtAvatar from '@coremat/CmtAvatar';
import CmtMediaObject from '@coremat/CmtMediaObject';
import { alpha, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';

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

const Member = ({ item }) => {
  const classes = useStyles();

  const formatDate = (date) => {
    return new Date(date.createdAt.split(' ')[0]).toLocaleString('en-us', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     refetch();
  //   }
  // }, [isSuccess]);

  const getTitle = () => {
    return (
      <Box color="text.primary">
        <Typography>
          {item.name} <br />
          <small>{item.id}</small>
        </Typography>
        {/* <Box component="span" color="primary.main">
          name sender
        </Box>
        <Box component="span" mx={1}>
          commented on
        </Box>
        <Box component="span" color="primary.main">
          title
        </Box> */}
      </Box>
    );
  };

  const getFooter = () => (
    <Box position="relative">
      <Stack spacing={1} direction="row">
        <Button size="small" variant="outlined" style={{ background: '#F2E7FE', color: '#AB22AF', border: 'none' }}>
          Member
        </Button>
        <Button size="small" variant="outlined" style={{ background: '#aa22af', color: '#FFFFFF', border: 'none' }}>
          Hapus
        </Button>
      </Stack>
      {/* use this box for shown when hover */}
      {/* <Box display="flex" alignItems="center" className={classes.actionButtons}> */}
      {/* <Fab color="primary" size="small">
          <DoneIcon />
          </Fab>
          <Fab size="small" className="btn-white" onClick={() => updateComment({ id: item._id, active: false })}>
          <ClearIcon />
        </Fab> */}
      {/* </Box> */}
    </Box>
  );

  const getMediaUri = () => {
    return 'image';
    //    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.email}`;
    //    const mediaURI = item.avatar.mediaEndpoint;
    //    return `${STREAM_URL}${mediaURI}${authToken}`;
  };
  return (
    <>
      <Box className={classes.itemRoot}>
        <CmtMediaObject
          // avatar={<CmtAvatar className={classes.avatarRoot} src={item.user.profile_pic} />}
          avatar={<CmtAvatar className={classes.avatarRoot} src={getMediaUri()} />}
          title={getTitle()}
          // subTitle={item.comment}
          subTitle={item.txtMessages}
          subTitleProps={{
            className: classes.subTitleRoot,
            component: 'div',
            variant: 'inherit',
            gutterBottom: false,
          }}
          footerComponent={getFooter()}
        />
      </Box>
    </>
  );
};

export default Member;
