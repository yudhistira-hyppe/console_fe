import React, { useState, useEffect } from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import TransactionTable from './TransactionTable';
// import { fakeDb } from '../../../FakeDb/fake-db';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getTodayDate, getYesterdayDate } from '../../../../@jumbo/utils/dateHelper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
// import { Button, Grid } from '@material-ui/core';
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
    // color: theme.palette.common.white,
    backgroundColor: 'rgba(252, 202, 70, 0.2)',
    color: 'rgba(255, 188, 32, 1)',
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
  const classes = useStyles();
  // const { transHistory } = fakeDb;
  // console.log('transHistory:', transHistory);
  const [tableData, setTableData] = useState(accountBalanceHistory);
  const { authUser } = useAuth();
  const [menu, setMenu] = useState('Today');

  // you can get date (yy/mm/dd) : 2022-03-30
  // change parameter 'minusDayFromToday' to get the date you want.
  // example : minusDayFromToday(2) is today - 2 day
  // example : minusDayFromToday(0) is today - 0 day so it will be the date you read this
  const dateFilter = (minusDayFromToday) => {
    const date = new Date();
    date.setDate(date.getDate() - minusDayFromToday);
    const temp = date.getFullYear() + '-' + 0 + (date.getMonth() + 1) + '-' + date.getDate();
    const getDay = temp.split('-')[2];
    const addZeroCondition = getDay < 10 ? `0${getDay}` : getDay;
    return date.getFullYear() + '-' + 0 + (date.getMonth() + 1) + '-' + addZeroCondition;
  };

  const [payload, setPayload] = useState({
    email: authUser.user.email,
    enddate: dateFilter(0),
    // you just need to minus startdate when filtering use 'dateFilter(minusDay)'
    startdate: dateFilter(0),
    skip: 0,
    limit: 10,
  });

  const { data: accountBalanceHistory } = useBalanceHistoryQuery(payload);

  useEffect(() => {
    setTableData(accountBalanceHistory);
  }, [accountBalanceHistory]);

  const filterTableData = (event) => {
    setMenu(event.label);
    switch (event.value) {
      case getTodayDate(): {
        setPayload({ ...payload, enddate: dateFilter(0), startdate: dateFilter(0) });
        return setTableData(accountBalanceHistory);
      }
      case getYesterdayDate(): {
        // startdate: dateFilter(40) should be startdate:datefilter(1) please change it when be ready.
        setPayload({ ...payload, enddate: dateFilter(0), startdate: dateFilter(1) });
        return setTableData(accountBalanceHistory);
      }
      case 'this_week': {
        setPayload({ ...payload, enddate: dateFilter(0), startdate: dateFilter(7) });
        return setTableData(accountBalanceHistory);
      }
      default:
        setPayload({ ...payload, startdate: dateFilter(0) });
        return setTableData(accountBalanceHistory);
    }
  };

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
        actionHandler={filterTableData}>
        <Box className={classes.badgeRoot} component="span" bgcolor="#FFDE99">
          {menu}
        </Box>
      </CmtCardHeader>
      <CmtCardContent className={classes.cardContentRoot}>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <TransactionTable tableData={tableData} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default TransactionList;
