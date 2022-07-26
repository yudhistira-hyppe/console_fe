import React from 'react';
import { PageHeader } from '../../../@jumbo/components/PageComponents';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import numberWithCommas from '../../Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { TrendingDown, TrendingUp } from '@material-ui/icons';
import { Button, Grid } from '@material-ui/core';
import TransactionList from './TransactionList';
import clsx from 'clsx';
import GridContainer from '../../../@jumbo/components/GridContainer';
import MyVoucher from './MyVoucher/MyVoucher';
import VoucherHistory from './VoucherHistory';
import { useAuth } from '../../../authentication';
import { useAccountBalanceQuery, useAccountBalanceHistoryQuery } from 'api/user/accountBalances';
import { getFormattedDate } from '@jumbo/utils/dateHelper';
import { useUpgradeUserMutation } from 'api/user/auth';
import { useRouter } from 'next/router';
import { formatCurrency } from 'helpers/stringHelper';

const useStyles = makeStyles((theme) => ({
  infoLabel: {
    fontFamily: 'Lato',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  precentageLabel: {
    fontFamily: 'Lato',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
    color: '#E00930',
  },
  balanceLabel: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  headTitle: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#202020',
  },
  summaryHistLbl: {
    fontFamily: 'Lato',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#202020',
  },
  borderInBetween: {
    borderTop: '1px solid rgba(0, 0, 0, 0.161741)',
    '&:last-child': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.161741)',
    },
  },
}));

const Transcation = ({}) => {
  const { authUser } = useAuth();

  const payloadBalance = {
    email: authUser.user.email,
    // this should be dynamic but be doesnt know the pattern yet.
    startdate: '2022-06-08',
    enddate: '2022-06-09',
  };

  const { data: accountBalanceData } = useAccountBalanceQuery(payloadBalance);
  return (
    <div>
      <PageHeader heading={'Transaction'} />
      <GridContainer>
        <Grid item md={4}>
          <Balance balance={accountBalanceData?.data?.totalsaldo} precentage={23} trend={false} />
        </Grid>
        <Grid item md={4}>
          <TotalWithdraw total={accountBalanceData?.data?.totalpenarikan} />
        </Grid>
        <Grid item md={4}>
          <TransSummary date={accountBalanceData?.data || ''} />
        </Grid>
        <Grid item md={12}>
          <TransactionList />
        </Grid>
        <Grid item md={6}>
          <MyVoucher />
        </Grid>
        <Grid item md={6}>
          <VoucherHistory />
        </Grid>
      </GridContainer>
    </div>
  );
};

const Balance = ({ balance, precentage, trend }) => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const router = useRouter();

  const [upgradeUser, { isSuccess }] = useUpgradeUserMutation();

  const userPremiumCheck = () => {
    upgradeUser({ email: authUser.user.email, roles: 'ROLE_PREMIUM', status: 'CECK' }).then((res) => {
      if (res?.data?.status_user === null) {
        router.push('/premium-activation');
      } else if (res?.data?.status_user === 'ON_PROGRESS') {
        router.push('/verification-email');
      } else {
        alert('already finished (premium)');
      }
    });
  };
  return (
    <div style={{ height: '250px' }} className="flex-auto">
      <CmtCard className="h-full w-full">
        <CmtCardContent>
          <div className={classes.headTitle}>Balance</div>
          <div className="mt-7">
            <div className="flex flex-row">
              <div className={classes.balanceLabel}>
                {/* there's a issues use this function */}
                {/* Rp {numberWithCommas(balance)} */}
                Rp {formatCurrency(balance)}
              </div>
              <div className="ml-1">
                <span className={classes.precentageLabel}>{precentage}%</span>
              </div>
              <div className="ml-1">{trend ? <TrendingUp /> : <TrendingDown />}</div>
            </div>
            <div className={classes.infoLabel}>Overall Balance</div>
          </div>
          <div className="mt-7">
            <Button variant="contained" color="primary" onClick={userPremiumCheck}>
              WITHDRAW
            </Button>
          </div>
        </CmtCardContent>
      </CmtCard>
    </div>
  );
};

const TotalWithdraw = ({ total }) => {
  const classes = useStyles();
  return (
    <div style={{ height: '250px' }} className="flex-auto">
      <CmtCard className="h-full w-full">
        <CmtCardContent>
          <div className={classes.headTitle}>Total Withdraw</div>
          <div className="mt-7">
            <div className="flex flex-row">
              <div className={classes.balanceLabel}>
                {/* there's a issues use this function */}
                {/* Rp {numberWithCommas(total)} */}
                Rp {formatCurrency(total)}
              </div>
            </div>
            <div className="mt-2">
              <div className={classes.infoLabel}>This Month</div>
            </div>
          </div>
        </CmtCardContent>
      </CmtCard>
    </div>
  );
};

const TransSummary = ({ date }) => {
  const classes = useStyles();

  return (
    <div style={{ height: '250px' }} className="flex-auto">
      <CmtCard className="h-full w-full">
        <CmtCardContent>
          <div className={classes.headTitle}>Transactions Summary</div>
          <div className="mt-7">
            <Trans date={`1 - ${getFormattedDate(date?.startdate, ' DD MMM')} 2021`} />
            <Trans date={`1 - ${getFormattedDate(date?.startdate, ' DD MMM')} 2021`} />
          </div>
        </CmtCardContent>
      </CmtCard>
    </div>
  );
};

const Trans = ({ date }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.borderInBetween, 'flex flex-row justify-content-between pt-2 pb-2')}>
      <div className={classes.summaryHistLbl}>{date}</div>
      <div>
        <Button variant={'text'} className="min-w-0 p-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="vertical_align_bottom_24px">
              <path
                id="icon/editor/vertical_align_bottom_24px"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 13H16L12 17L8 13H11V3H13V13ZM4 21V19H20V21H4Z"
                fill="black"
                fill-opacity="0.38"
              />
            </g>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Transcation;
