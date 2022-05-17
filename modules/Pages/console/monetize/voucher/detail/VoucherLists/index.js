import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import VoucherTable from './VoucherTable';
import AddIcon from '@material-ui/icons/Add';

import { getListVoucherPerUser } from 'redux/actions/monetizeAction';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  infoTotalPengguna: {
    padding: 16,
    display: 'flex',
    justifyContent: 'end'
  },
  btnRoot: {
    [theme.breakpoints.down('xs')]: {
      padding: '6px 12px',
      fontSize: 11,
    },
  },
}));

export default function VoucherLists({email}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {vouchers} = useSelector((state) => state.monetizeReducers)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadListVoucher(newPage,rowsPerPage);
  };

  const handleChangeRowsPerPage = event => {
    const perPage = +event.target.value;
    setRowsPerPage(perPage);
    setPage(0);
    loadListVoucher(0,perPage);
  };
  
  const loadListVoucher = (p,pp) => {
    console.log("masuk fungsi ini");
    dispatch(getListVoucherPerUser({search:email,page:p,rowsPerPage:pp}));
  }

  const createLink = `/console/monetize/voucher/${email}/create`;

  useEffect(() => {
    loadListVoucher(0,10);
  }, []);
  
  return (
    <Paper>
        <Box className={classes.infoTotalPengguna}>
          <Button
            className={classes.btnRoot}
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push(createLink)}>
            Buat Voucher
          </Button>
        </Box>
        <VoucherTable 
          data={vouchers} 
          page={page} 
          rowsPerPage={rowsPerPage} 
          handleChangePage={handleChangePage} 
          handleChangeRowsPerPag={handleChangeRowsPerPage} 
        />
    </Paper>
  );
}
