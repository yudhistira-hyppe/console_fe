import React from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import NotificationData from './NotificationData';
import { intranet } from '../../../FakeDb/intranet';
import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

  const { data: latestNotification } = useLatestNotificationQuery(authUser.email);
  // console.log('latestNotification:', latestNotification?.data[0].createdAt);

  const classes = useStyles();
  // const { userActivities } = intranet;

  const lastActivityDate = latestNotification?.data[0]?.createdAt.split(' ')[0];
  const todayDate = new Date().toISOString().slice(0, 10);

  const lastActivity = new Date(lastActivityDate);
  const today = new Date(todayDate);

  const diffTime = Math.abs(today - lastActivity);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // console.log(diffTime + ' milliseconds');
  // console.log(diffDays + ' days');

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title="Latest Notification" subTitle={`Last activity was ${diffDays} Days`} />
      <CmtCardContent>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          {/* <NotificationData data={userActivities} /> */}
          <NotificationData data={latestNotification?.data} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default LatestNotification;
