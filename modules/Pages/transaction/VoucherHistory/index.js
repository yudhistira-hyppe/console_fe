import React, { useState } from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import { fakeDb } from '../../../FakeDb/fake-db';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getTodayDate, getYesterdayDate } from '../../../../@jumbo/utils/dateHelper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { Button, Grid } from '@material-ui/core';
import VoucherTable from './TransactionTable';

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

const VoucherHistory = () => {
  const { voucherHistory } = fakeDb;
  const [tableData, setTableData] = useState(voucherHistory);
  const [menu, setMenu] = useState('This Week');
  const classes = useStyles();

  const filterTableData = (event) => {
    setMenu(event.label);
    switch (event.value) {
      case getTodayDate(): {
        return setTableData(voucherHistory);
      }
      case getYesterdayDate(): {
        return setTableData(voucherHistory);
      }
      case 'this_week': {
        return setTableData(voucherHistory);
      }
      default:
        return setTableData(voucherHistory);
    }
  };

  return (
    <CmtCard>
      <CmtCardHeader
        className="pt-4"
        title={'Voucher History'}
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
          <VoucherTable tableData={tableData} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default VoucherHistory;
