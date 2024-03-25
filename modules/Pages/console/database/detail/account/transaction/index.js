import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Chip,
  CircularProgress,
  IconButton,
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
import { formatCurrency } from 'helpers/stringHelper';
import useStyles from './index.style';
import { LoadingButton } from '@mui/lab';
import { useGetAccountBalanceQuery } from 'api/console/database';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

const TransactionComponent = (props) => {
  const classes = useStyles();
  const { email } = props;
  const [payload, setPayload] = useState({
    sell: true,
    buy: true,
    withdrawal: true,
    rewards: true,
    boost: true,
    page: 0,
    limit: 10,
    descending: true,
  });

  useEffect(() => {
    setPayload((prevState) => ({
      ...prevState,
      email: email || '',
    }));
  }, [props]);

  const { data: listTransaction, isFetching: loadingMore, isLoading: loadingTransaction } = useAllTransactionQuery(payload);
  const { data: accountBalance, isFetching: loadingBalance } = useGetAccountBalanceQuery({ email: email });

  const handleLoadMore = () => {
    setPayload((prevVal) => {
      return {
        ...prevVal,
        page: prevVal?.page + 1,
      };
    });
  };

  const handleLoadBack = () => {
    setPayload((prevVal) => {
      return {
        ...prevVal,
        page: prevVal?.page - 1,
      };
    });
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Stack direction="column">
        <Stack direction="row" justifyContent="space-between" padding={3} paddingTop="36px">
          <Stack direction="row" gap={3}>
            <Typography variant="h4">Saldo</Typography>
            <Typography variant="h4">
              Rp {!loadingBalance ? formatCurrency(accountBalance?.data[0]?.totalsaldo || 0) : '-'}
            </Typography>
          </Stack>
        </Stack>
        <TableContainer>
          <PerfectScrollbar>
            <Stack maxHeight={542} minHeight={542}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow className={classes.tableRow}>
                    <TableCell style={{ width: 101 }}>Waktu</TableCell>
                    <TableCell style={{ width: 185 }}>No</TableCell>
                    <TableCell style={{ width: 113 }}>Keterangan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingTransaction || loadingMore ? (
                    <TableRow className={classes.tableRowCustomPadding}>
                      <TableCell colSpan="100%" align="center">
                        <CircularProgress color="secondary" />
                      </TableCell>
                    </TableRow>
                  ) : listTransaction?.data?.length >= 1 ? (
                    listTransaction?.data?.map((item, key) => (
                      <TableRow key={key} className={classes.tableRow}>
                        <TableCell style={{ paddingRight: 12, borderBottom: 'none' }}>
                          <Typography style={{ width: 65, fontSize: 14 }}>
                            {moment(item?.timestamp).utc().format('DD/MM/YYYY')?.substring(0, 8)}-
                            {moment(item?.timestamp).utc().format('YY HH:mm')}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ width: '100%', borderBottom: 'none' }}>
                          <Stack direction="column">
                            <Typography style={{ fontSize: 14 }}>Rp {formatCurrency(item?.totalamount || 0)}</Typography>
                            <Typography style={{ fontSize: 14 }}>
                              {item?.type === 'Sell' && 'Pendapatan'}
                              {item?.type === 'Buy' && 'Pengeluaran'}
                              {item?.type === 'Withdraws' && 'Penarikan'}
                              {item?.type === 'Rewards' && 'Pendapatan'}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell style={{ width: 65, borderBottom: 'none' }}>
                          <Typography
                            style={{
                              fontSize: 14,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}>
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
                            {item?.jenis === 'Rewards' && (item?.description || '-')}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="100%" align="center" style={{ borderBottom: 'none' }}>
                        <Stack alignItems="center" justifyContent="center" gap="16px" height={452}>
                          <img src="/images/icon-media-empty.png" alt="Icon Empty" style={{ width: 50, height: 50 }} />
                          <Typography style={{ color: '#666666' }}>Tidak ada data transaksi</Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Stack>
          </PerfectScrollbar>
        </TableContainer>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="left"
          spacing={2}
          p={2}
          style={{ borderTop: '1px solid #0000001f' }}>
          <IconButton color="secondary" onClick={handleLoadBack} disabled={payload.page < 1 || loadingMore}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={handleLoadMore}
            disabled={listTransaction?.data?.length < payload.limit || loadingMore}>
            <NavigateNext />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

TransactionComponent.propTypes = {
  email: PropTypes.string,
};

export default TransactionComponent;
