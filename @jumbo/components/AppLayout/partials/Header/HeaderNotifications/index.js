import React from 'react';
import { Box, IconButton, makeStyles, Popover, Tooltip, useTheme } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CmtCardHeader from '../../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../../@coremat/CmtCard/CmtCardContent';
import CmtList from '../../../../../../@coremat/CmtList';
import CmtCard from '../../../../../../@coremat/CmtCard';
import NotificationItem from './NotificationItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import { useAuth } from '../../../../../../authentication';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import CmtMediaObject from '@coremat/CmtMediaObject';
import { Stack, Typography } from '@mui/material';
import { readNotification } from 'redux/actions/Profiles';

const useStyles = makeStyles((theme) => ({
  feedItemRoot: {
    padding: '0 10px 10px',
    position: 'relative',
    flexDirection: 'column',
    gap: 5,
    borderBottom: `1px solid ${alpha(theme.palette.common.dark, 0.065)}`,
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
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 4,
      paddingBottom: 4,
    },
    '& .Cmt-card-content': {
      padding: '0 0 16px !important',
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
  iconRoot: {
    position: 'relative',
    color: alpha(theme.palette.common.white, 0.38),
    '&:hover, &.active': {
      color: theme.palette.common.white,
    },
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: theme.palette.warning.main,
    width: 20,
  },
  scrollbarRoot: {
    height: 300,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  popoverRoot: {
    '& .MuiPopover-paper': {
      width: 375,
    },
  },
}));

const actions = [
  {
    label: 'More Detail',
  },
  {
    label: 'Close',
  },
];

const HeaderNotifications = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const [counter, setCounter] = React.useState(0);
  const theme = useTheme();
  const notification = useSelector(({ profilesReducer }) => profilesReducer.notification);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setCounter(notification?.unread);
  }, [notification]);

  const onOpenPopOver = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(readNotification());
  };

  const onClosePopOver = () => {
    // alert('clicked');
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleHeaderDropDown = (objBtn) => {
    if (objBtn.label === 'More Detail') {
      router.push('/notification');
    }
    return setAnchorEl(null);
  };

  return (
    <Box pr={2}>
      <Tooltip title="Notifications">
        <IconButton
          onClick={onOpenPopOver}
          className={clsx(classes.iconRoot, 'Cmt-appIcon', {
            active: counter > 0,
          })}>
          <Badge badgeContent={counter} classes={{ badge: classes.counterRoot }}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        className={classes.popoverRoot}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClosePopOver}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <CmtCard className={classes.cardRoot}>
          <CmtCardHeader
            title="Notifications"
            actionsPos="top-corner"
            actions={actions}
            actionHandler={handleHeaderDropDown}
            separator={{
              color: theme.palette.borderColor.dark,
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          />
          <CmtCardContent>
            {/* {dataNotification?.data?.length > 0 ? (
              <>
                <PerfectScrollbar className={classes.scrollbarRoot}>
                  <CmtList
                    data={dataNotification?.data}
                    renderRow={(item, index) => <NotificationItem key={index} item={item} />}
                  />
                </PerfectScrollbar>
              </>
            ) : (
              <Box p={6}>
                <Typography variant="body2">No notifications found</Typography>
              </Box>
            )} */}
            {notification?.data?.length >= 1 ? (
              <PerfectScrollbar className={classes.scrollbarRoot}>
                {/* <CmtList
                  data={notification?.data}
                  renderRow={(item, index) => <NotificationItem key={index} item={item} />}
                /> */}
                {notification?.data?.map((item, key) => (
                  <Stack key={key} className={classes.feedItemRoot}>
                    <Typography fontSize={12} fontFamily="Lato" color="rgba(0, 0, 0, 0.38)">
                      {item?.created_at}
                    </Typography>
                    <CmtMediaObject title={item?.notification?.title} subTitle={item?.notification?.body} />
                  </Stack>
                ))}
              </PerfectScrollbar>
            ) : (
              <Box p={6}>
                <Typography variant="body2">No notifications found</Typography>
              </Box>
            )}
          </CmtCardContent>
        </CmtCard>
      </Popover>
    </Box>
  );
};

export default HeaderNotifications;
