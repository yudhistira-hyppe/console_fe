import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fakeDb } from '../../../FakeDb/fake-db';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import clsx from 'clsx';
import { ArrowForwardIos, ArrowRight, ArrowRightAltOutlined, TrendingDown, TrendingUp } from '@material-ui/icons';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import { useAuth } from 'authentication';
import { useUserGetInsightQuery } from 'api/user/insight';

const useStyles = makeStyles((theme) => ({
  headTitle: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '22px',
    color: '#202020',
  },
  borderInBetween: {
    borderTop: '1px solid rgba(0, 0, 0, 0.161741)',
    '&:last-child': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.161741)',
    },
  },
  insightLbl: {
    fontFamily: 'Lato',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

const Insight = ({ title, number, diff, isIncreased }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.borderInBetween, 'flex flex-row p-1 justify-content-between')}>
      <div className={clsx(classes.insightLbl, 'flex-1')}>{title}</div>
      <div className={clsx(classes.insightLbl, 'flex-1 text-center')}>{number}</div>
      <div className={clsx(classes.insightLbl, 'flex flex-row justify-content-between flex-1')}>
        <div style={{ color: isIncreased ? '#8DCD03' : '#E00930' }}>{diff}</div>
        {isIncreased ? (
          <TrendingUp style={{ color: '#8DCD03', fontSize: '20px' }} />
        ) : (
          <TrendingDown style={{ color: '#E00930', fontSize: '20px' }} />
        )}
        <span>{isIncreased ? 'Up' : 'Down'}</span>
      </div>
      <div className="ml-2">
        <ArrowForwardIos style={{ fontSize: '20px' }} />
      </div>
    </div>
  );
};

const UserInfo = () => {
  const { authUser } = useAuth();

  const { data: dataInsight } = useUserGetInsightQuery(authUser.user.email);

  const classes = useStyles();
  return (
    <CmtCard className="p-0">
      <CmtCardContent className="p-2 pb-0">
        <div className={classes.headTitle}>Insight</div>
        <div className="mt-3">
          {/* why i work with that way? because data from backend is difficult to looping (i just simplefied) */}
          <Insight
            title={'Followers'}
            number={dataInsight?.data[0]?.Follower?.totalsekarang}
            diff={dataInsight?.data[0]?.Follower.followers}
            isIncreased={dataInsight?.data[0]?.Follower?.status === 'down' ? false : true}
          />
          <Insight
            title={'Following'}
            number={dataInsight?.data[0]?.Following.totalsekarang}
            diff={dataInsight?.data[0]?.Following.followings}
            isIncreased={dataInsight?.data[0]?.Following?.status === 'down' ? false : true}
          />
          <Insight
            title={'Total Likes'}
            number={dataInsight?.data[0]?.Likes.totalsekarang}
            diff={dataInsight?.data[0]?.Likes.like}
            isIncreased={dataInsight?.data[0]?.Likes?.status === 'down' ? false : true}
          />
        </div>
      </CmtCardContent>
    </CmtCard>
  );
};

export default UserInfo;
