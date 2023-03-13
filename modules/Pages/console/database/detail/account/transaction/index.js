import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Typography } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useAllTransactionQuery } from 'api/console/transaction';
import moment from 'moment';
import { formatCurrency, formatTransactionStatus } from 'helpers/stringHelper';
import useStyles from './index.style';
import { LoadingButton } from '@mui/lab';
import { useGetAccountBalanceQuery } from 'api/user/user';

const TransactionComponent = (props) => {
  const classes = useStyles();
  const { email } = props;
  const [payload, setPayload] = useState({
    email: email,
    sell: true,
    buy: true,
    withdrawal: true,
    rewards: true,
    boost: true,
    page: 0,
    limit: 10,
  });
  const [transaction, setTransaction] = useState([]);

  const { data: listTransaction, isFetching: loadingMore, isLoading: loadingTransaction } = useAllTransactionQuery(payload);
  const { data: accountBalance, isFetching: loadingBalance } = useGetAccountBalanceQuery({ email: email });

  useEffect(() => {
    if (!loadingMore) {
      setTransaction((prevVal) => {
        return [...prevVal, ...listTransaction?.data];
      });
    }
  }, [listTransaction]);

  const handleLoadMore = () => {
    setPayload((prevVal) => {
      return {
        ...prevVal,
        page: prevVal.page + 1,
      };
    });
  };

  return (
    <Card sx={{ height: 'fit-content' }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" padding={3}>
          <Stack direction="row" gap={3}>
            <Typography variant="h4">Saldo</Typography>
            <Typography variant="body2">
              Rp {!loadingBalance ? formatCurrency(accountBalance?.data[0]?.totalsaldo || 0) : '-'}
            </Typography>
          </Stack>
        </Stack>
        <TableContainer component={Paper}>
          <PerfectScrollbar>
            <Stack maxHeight={370} minHeight={370}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow className={classes.tableRow}>
                    <TableCell>Waktu</TableCell>
                    <TableCell>Jenis</TableCell>
                    <TableCell>Nominal</TableCell>
                    <TableCell>Keterangan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingTransaction ? (
                    <TableRow className={classes.tableRowCustomPadding}>
                      <TableCell colSpan="100%" align="center">
                        <CircularProgress color="secondary" />
                      </TableCell>
                    </TableRow>
                  ) : transaction?.length >= 1 ? (
                    transaction?.map((item, key) => (
                      <TableRow className={classes.tableRow} key={key}>
                        <TableCell>
                          <Typography style={{ fontSize: 14 }}>
                            {moment(item?.timestamp).utc().format('DD/MM/YYYY HH:mm')}{' '}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: 14 }}>
                            {item?.type === 'Sell' && 'Pendapatan'}
                            {item?.type === 'Buy' && 'Pengeluaran'}
                            {item?.type === 'Withdraws' && 'Penarikan'}
                            {item?.type === 'Rewards' && 'Pendapatan'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: 14 }}>Rp {formatCurrency(item?.totalamount || 0)}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: 14 }}>
                            {item?.jenis === 'CONTENT'
                              ? item?.type === 'Buy'
                                ? 'Pembelian Konten'
                                : 'Penjualan Konten'
                              : ''}
                            {item?.jenis === 'Withdraws' && 'Penarikan'}
                            {item?.jenis === 'VOUCHER'
                              ? item?.type === 'Buy'
                                ? 'Pembelian Voucher'
                                : 'Penjualan Voucher'
                              : ''}
                            {item?.jenis === 'BOOST_CONTENT'
                              ? item?.type === 'Buy'
                                ? 'Pembelian Boost'
                                : 'Penjualan Boost'
                              : ''}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="100%" align="center">
                        <Stack alignItems="center" justifyContent="center" gap="16px" height={270}>
                          <img src="/images/icon-media-empty.png" alt="Icon Empty" style={{ width: 50, height: 50 }} />
                          <Typography style={{ color: '#666666' }}>Pengguna belum memiliki data apapun</Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                  {!loadingTransaction && transaction?.length < listTransaction?.totalsearch && (
                    <TableRow className={classes.tableRowCustomPadding}>
                      <TableCell colSpan="100%" align="center">
                        <LoadingButton loading={loadingMore} variant="contained" color="secondary" onClick={handleLoadMore}>
                          Muat lebih banyak
                        </LoadingButton>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Stack>
          </PerfectScrollbar>
        </TableContainer>
      </Stack>
    </Card>
  );
};

TransactionComponent.propTypes = {
  email: PropTypes.string,
};

export default TransactionComponent;
