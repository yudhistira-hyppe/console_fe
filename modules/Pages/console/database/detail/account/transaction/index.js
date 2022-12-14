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
import { useLazyAllTransactionQuery } from 'api/console/transaction';
import moment from 'moment';
import { formatCurrency, formatTransactionStatus } from 'helpers/stringHelper';
import useStyles from './index.style';

const TransactionComponent = (props) => {
  const classes = useStyles();
  const { email } = props;
  const [balance, setBalance] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [payload, setPayload] = useState({
    email: email,
    sell: true,
    buy: true,
    withdrawal: true,
    rewards: true,
    skip: 0,
    limit: 10,
  });

  const [fetchTransactions] = useLazyAllTransactionQuery();
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = () => {
    setIsFetching(true);
    fetchTransactions(payload)
      .unwrap()
      .then((res) => {
        setPayload({ ...payload, skip: payload.skip + 10 });
        setBalance(res?.totalsaldo[0]);
        const formattedTransactions = res.fData.map((filteredData) => {
          return {
            ...formattedTransaction(filteredData),
          };
        });
        setTransactions([...transactions, ...formattedTransactions]);
        setIsFetching(false);
        setShowLoadMoreBtn(res.fData.length === payload.limit);
      })
      .catch(() => {
        setIsFetching(false);
      });
  };

  const formattedTransaction = (transaction) => {
    let formatted = {
      id: transaction._id,
      date: moment(transaction.timestamp).format('DD/MM/YYYY - HH:mm'),
    };

    switch (transaction.type.toLowerCase()) {
      case 'rewards':
        formatted = {
          ...formatted,
          desc: transaction.description,
          status: formatTransactionStatus('success'),
        };
        if (transaction.debet) {
          formatted = {
            ...formatted,
            type: 'Pendapatan',
            amount: transaction.debet || 0,
          };
        }
        if (transaction.kredit) {
          formatted = {
            ...formatted,
            type: 'Pengeluaran',
            amount: transaction.kredit || 0,
          };
        }
        break;
      case 'buy':
        formatted = {
          ...formatted,
          type: 'Pengeluaran',
          amount: transaction.totalamount || 0,
          desc: 'Pembelian Konten',
          status: formatTransactionStatus(transaction.status),
        };
        break;
      case 'sell':
        formatted = {
          ...formatted,
          type: 'Pendapatan',
          amount: transaction.amount || 0,
          desc: 'Penjualan Konten',
          status: formatTransactionStatus(transaction.status),
        };
        break;
      case 'withdrawal':
        formatted = {
          ...formatted,
          type: 'Penarikan',
          amount: transaction.amount || 0,
          desc: 'Penarikan',
          status: formatTransactionStatus('success'),
        };
        break;
      default:
        break;
    }

    return formatted;
  };

  return (
    <Card sx={{ height: 'fit-content' }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" padding={3}>
          <Stack direction="row" gap={3}>
            <Typography variant="h4">Saldo</Typography>
            <Typography variant="body2">Rp {formatCurrency(balance?.totalsaldo || 0)}</Typography>
          </Stack>
        </Stack>
        <TableContainer component={Paper}>
          <PerfectScrollbar>
            <Stack maxHeight={370}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow className={classes.tableRow}>
                    <TableCell>Waktu</TableCell>
                    <TableCell>Jenis</TableCell>
                    <TableCell>Nominal</TableCell>
                    <TableCell>Keterangan</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.length > 0 &&
                    transactions.map((transaction) => (
                      <TableRow className={classes.tableRow} key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>Rp {formatCurrency(transaction.amount)}</TableCell>
                        <TableCell>{transaction.desc}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                      </TableRow>
                    ))}
                  {!isFetching && transactions.length == 0 && (
                    <TableRow>
                      <TableCell colSpan="100%" align="center">
                        <Stack alignItems="center" justifyContent="center" gap="16px" height={270}>
                          <img src="/images/icon-media-empty.png" alt="Icon Empty" style={{ width: 50, height: 50 }} />
                          <Typography style={{ color: '#666666' }}>Pengguna belum memiliki data apapun</Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                  {!isFetching && showLoadMoreBtn && (
                    <TableRow className={classes.tableRowCustomPadding}>
                      <TableCell colSpan="100%" align="center">
                        <Button variant="contained" color="secondary" onClick={() => getTransactions()}>
                          Muat lebih banyak
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                  {isFetching && (
                    <TableRow className={classes.tableRowCustomPadding}>
                      <TableCell colSpan="100%" align="center">
                        <CircularProgress color="secondary" />
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
