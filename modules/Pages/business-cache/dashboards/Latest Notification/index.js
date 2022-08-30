// react
import React from 'react';

// template components
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';

// partials components
import NotificationData from './NotificationData';

// third party libraries
import PerfectScrollbar from 'react-perfect-scrollbar';

// material ui
import makeStyles from '@material-ui/core/styles/makeStyles';

// request
import { useAuth } from 'authentication';
import { useLatestNotificationQuery } from 'api/user/notification';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    position: 'relative',
  },
  scrollbarRoot: {
    height: 300,
    marginRight: -24,
    paddingRight: 24,
    marginLeft: -24,
    paddingLeft: 24,
    marginTop: -5,
    paddingTop: 5,
  },
}));

const LatestNotification = () => {
  const { authUser } = useAuth();

  const payload = {
    email: authUser?.user?.email,
    skip: 0,
    limit: 10,
  };
  const { data: latestNotification } = useLatestNotificationQuery(payload);

  const classes = useStyles();

  const lastActivityDate = latestNotification?.data[0]?.createdAt.split(' ')[0];
  const todayDate = new Date().toISOString().slice(0, 10);

  const lastActivity = new Date(lastActivityDate);
  const today = new Date(todayDate);

  const diffTime = Math.abs(today - lastActivity);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        title="Latest Notification"
        subTitle={latestNotification?.data.length > 0 ? `Last activity was ${diffDays} Days` : 'You have no activity'}
      />
      <CmtCardContent>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <NotificationData data={latestNotification?.data} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default LatestNotification;
