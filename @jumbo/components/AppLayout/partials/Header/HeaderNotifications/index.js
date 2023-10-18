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
import { Notifications } from '@material-ui/icons';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  feedItemRoot: {
    padding: '15px 24px',
    position: 'relative',
    flexDirection: 'row !important',
    gap: 15,
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
    '& .Cmt-card-content': {
      padding: '0 !important',
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
    display: 'flex',
    flexDirection: 'column',
  },
  popoverRoot: {
    '& .MuiPopover-paper': {
      width: 375,
    },
  },
  iconNotif: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 100,
    padding: 10,
    height: 45,
    width: 45,
  },
  textTruncate: {
    fontSize: '16px',
    fontFamily: 'Lato !important',
    fontWeight: 'bold !important',
    letterSpacing: '0.15px',
    lineHeight: '1.3em !important',
    color: '#202020',
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
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
            title="Notifikasi"
            actionsPos="top-corner"
            separator={{
              color: theme.palette.borderColor.dark,
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          />
          <CmtCardContent>
            {notification?.data?.length >= 1 ? (
              <>
                <PerfectScrollbar className={classes.scrollbarRoot}>
                  {notification?.data?.map(
                    (item, key) =>
                      key < 5 && (
                        <Stack key={key} className={classes.feedItemRoot}>
                          <Box className={classes.iconNotif}>
                            <Notifications style={{ color: '#666666' }} />
                          </Box>
                          <Stack direction="column" gap="8px" width="100%">
                            <CmtMediaObject
                              subTitle={
                                <Typography className={classes.textTruncate}>
                                  {item?.notification?.title} {''}
                                  {item?.notification?.body}
                                </Typography>
                              }
                              style={{ width: '100%', flexGrow: 1 }}
                            />
                            <Typography fontSize={12} fontFamily="Lato" color="rgba(0, 0, 0, 0.38)">
                              {moment().diff(moment(item?.created_at), 'minutes') === 0
                                ? 'Baru saja'
                                : `${moment().diff(moment(item?.created_at), 'minutes')} menit lalu`}
                            </Typography>
                          </Stack>
                        </Stack>
                      ),
                  )}
                </PerfectScrollbar>
                <Box style={{ display: 'flex', borderTop: '1px solid', borderColor: theme.palette.borderColor.dark }}>
                  <Button
                    color="secondary"
                    style={{
                      width: '100%',
                      height: 60,
                      fontFamily: 'Lato',
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#AB22AF',
                    }}
                    onClick={() => router.push('/notification')}>
                    Lihat semua
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                style={{
                  padding: '20px 24px',
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Typography fontWeight="bold" fontFamily="Lato" color="rgba(0, 0, 0, 0.38)">
                  Tidak ada notifikasi baru
                </Typography>
              </Box>
            )}
          </CmtCardContent>
        </CmtCard>
      </Popover>
    </Box>
  );
};

export default HeaderNotifications;
