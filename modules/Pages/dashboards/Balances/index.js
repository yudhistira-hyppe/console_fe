// react
import React from 'react';

// material ui
import makeStyles from '@material-ui/core/styles/makeStyles';

// components template
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';

// material ui
import { TrendingDown, TrendingUp } from '@material-ui/icons';
import { Button } from '@material-ui/core';

// next js
import { useRouter } from 'next/router';

// helpers
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
  labelLink: {
    fontFamily: 'Lato',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.4px',
    color: '#AB22AF',
  },
}));

const Balances = ({ balance, precentage, trend }) => {
  const router = useRouter();
  const classes = useStyles();
  return (
    <div style={{ height: '250px' }} className="flex-auto">
      <CmtCard className="h-full w-full">
        <CmtCardContent>
          <div className={classes.headTitle}>Balance</div>
          <div className="mt-8">
            <div className="flex flex-row">
              <div className={classes.balanceLabel}>Rp {formatCurrency(balance)}</div>
              <div className="ml-1">
                <span className={classes.precentageLabel}>{precentage}%</span>
              </div>
              <div className="ml-1">{trend ? <TrendingUp /> : <TrendingDown />}</div>
            </div>
            <div className={classes.infoLabel}>Overall Balance</div>
          </div>
          <div className="mt-8">
            <Button variant="text" onClick={() => router.push('/transaction')} className="min-w-0 p-0 mt-2">
              <div className={classes.labelLink}>GO TO TRANSACTION</div>
            </Button>
          </div>
        </CmtCardContent>
      </CmtCard>
    </div>
  );
};
export default Balances;
