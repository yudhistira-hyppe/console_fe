import React, { useState, useEffect } from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import TransactionTable from './TransactionTable';
import { fakeDb } from '../../../FakeDb/fake-db';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getTodayDate, getYesterdayDate } from '../../../../@jumbo/utils/dateHelper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { Button, Grid } from '@material-ui/core';
import { useBalanceHistoryQuery } from 'api/user/accountBalances';
import { useAuth } from 'authentication';

const actions = [
  {
    label: 'Today',
    value: getTodayDate(),
  },
  {
    label: 'Yesterday',
    value: getYesterdayDate(),
  },
  {
    label: 'This Week',
    value: 'this_week',
  },
];

const useStyles = makeStyles((theme) => ({
  cardContentRoot: {
    padding: '0 !important',
  },
  titleRoot: {
    letterSpacing: 0.15,
  },
  scrollbarRoot: {
    height: 340,
  },
  badgeRoot: {
    color: theme.palette.common.white,
    borderRadius: 30,
    fontSize: 12,
    padding: '2px 10px',
    display: 'inline-block',
  },
  buttonContainer: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const TransactionList = () => {
  const { transHistory } = fakeDb;
  console.log('transHistory:', transHistory);
  // console.log('transHistory:', transHistory);
  // const [tableData, setTableData] = useState(accountBalanceHistory);
  const { authUser } = useAuth();
  const [menu, setMenu] = useState('Today');
  const classes = useStyles();

  const payloadBalanceHistory = {
    email: authUser.email,
    startdate: '2022-06-08',
    enddate: '2022-06-09',
    skip: 0,
    limit: 10,
  };

  // useEffect(() => {
  //   setTableData(accountBalanceHistory);
  // }, [accountBalanceHistory]);

  const { data: accountBalanceHistory } = useBalanceHistoryQuery(payloadBalanceHistory);

  // const filterTableData = (event) => {
  //   setMenu(event.label);
  //   switch (event.value) {
  //     case getTodayDate(): {
  //       return setTableData(transHistory);
  //     }
  //     case getYesterdayDate(): {
  //       return setTableData(transHistory);
  //     }
  //     case 'this_week': {
  //       return setTableData(transHistory);
  //     }
  //     default:
  //       return setTableData(transHistory);
  //   }
  // };

  return (
    <CmtCard>
      <CmtCardHeader
        className="pt-4"
        title={'Transacion History'}
        titleProps={{
          variant: 'h4',
          component: 'div',
          className: classes.titleRoot,
        }}
        actionsPos="top-corner"
        actions={actions}
        // actionHandler={filterTableData}
      >
        <Box className={classes.badgeRoot} component="span" bgcolor="#FFDE99">
          {menu}
        </Box>
      </CmtCardHeader>
      <CmtCardContent className={classes.cardContentRoot}>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <TransactionTable tableData={accountBalanceHistory} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default TransactionList;
