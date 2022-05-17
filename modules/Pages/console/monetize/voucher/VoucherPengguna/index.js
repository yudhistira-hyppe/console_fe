import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import TablePengguna from './TablePengguna';
import CmtImage from '@coremat/CmtImage';

const iconWarning = '/images/icons/warning.png';

import { getListVoucherUser } from 'redux/actions/monetizeAction';

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  infoPermintaanVoucher: {
    backgroundColor:'#FFDE99',
    color: '#D36F1A',
    padding: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    display: 'flex',
    '& .MuiTypography-h5': {
      paddingLeft: 8
    }
  },
  infoTotalPengguna: {
    padding: 16,
  }
});

export default function VoucherPengguna() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {voucherUsers, meta} = useSelector((state) => state.monetizeReducers)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadListUsers(newPage,rowsPerPage);
  };

  const handleChangeRowsPerPage = event => {
    const perPage = +event.target.value;
    setRowsPerPage(perPage);
    setPage(0);
    loadListUsers(0,perPage);
  };
  
  const loadListUsers = (p,pp) => {
    console.log("masuk fungsi ini");
    dispatch(getListVoucherUser({page:p,rowsPerPage:pp}));
  }

  useEffect(() => {
    loadListUsers(0,10);
  }, []);
  
  return (
    <Paper>
        <Box className={classes.infoPermintaanVoucher}>
          <CmtImage src={iconWarning} /> 
          <Typography component="div" variant="h5">
            {meta ? meta.new_request: 0} Permintaan voucher
          </Typography>
        </Box>
        <Box className={classes.infoTotalPengguna}>
            <Typography component="div" variant="h4">
              {meta ? meta.premium_user : 0} Pengguna Premium
            </Typography>
        </Box>
        <TablePengguna 
          data={voucherUsers} 
          page={page} 
          rowsPerPage={rowsPerPage} 
          handleChangePage={handleChangePage} 
          handleChangeRowsPerPag={handleChangeRowsPerPage} 
        />
    </Paper>
  );
}
