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
import { formatCurrency } from 'helpers/stringHelper';
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
        setBalance(res.totalsaldo[0]);
        const formattedTransactions = res.fData
          .filter((data) => {
            if ((data.type.toLowerCase() === 'sell' || data.type.toLowerCase() === 'buy') && data.status !== 'Success') {
              return false;
            }
            return true;
          })
          .map((filteredData) => {
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
        };
        break;
      case 'sell':
        formatted = {
          ...formatted,
          type: 'Pendapatan',
          amount: transaction.amount || 0,
          desc: 'Penjualan Konten',
        };
        break;
      case 'withdrawal':
        formatted = {
          ...formatted,
          type: 'Penarikan',
          amount: transaction.amount || 0,
          desc: 'Penarikan',
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
            <Typography variant="body2">Rp {formatCurrency(balance.totalsaldo || 0)}</Typography>
          </Stack>
        </Stack>
        <TableContainer component={Paper}>
          <PerfectScrollbar>
            {isFetching ? (
              <Stack alignItems="center" padding="24px">
                <CircularProgress color="secondary" />
              </Stack>
            ) : (
              <Stack maxHeight={270}>
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
                    {transactions.length > 0 &&
                      transactions.map((transaction) => (
                        <TableRow className={classes.tableRow} key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>Rp {formatCurrency(transaction.amount)}</TableCell>
                          <TableCell>{transaction.desc}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                {showLoadMoreBtn && (
                  <Stack alignItems="center" padding="16px">
                    <Button variant="contained" color="secondary" onClick={() => getTransactions()}>
                      Muat lebih banyak
                    </Button>
                  </Stack>
                )}
              </Stack>
            )}
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
